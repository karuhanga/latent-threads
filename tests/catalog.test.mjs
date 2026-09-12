import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCatalog } from '../scripts/load-catalog.mjs';
import { validateCatalog } from '../src/data/validate.ts';
import { createGraph } from '../src/data/graph.ts';

const data = await loadCatalog(new URL('../data/song/', import.meta.url));
const copy = () => structuredClone(data);
const hasError = (d, pattern, options) => assert.ok(validateCatalog(d, options).some(e => pattern.test(e)), `Expected ${pattern}`);

test('actual published song catalog passes release validation', () => assert.deepEqual(validateCatalog(data), []));
test('rejects duplicate IDs and dangling references', () => {
  const d = copy(); d.nodes.push(d.nodes[0]); d.contributions[0].roleId = 'role:missing';
  hasError(d, /duplicate ID/); hasError(d, /dangling reference/);
});
test('rejects contextual mismatches and invalid typed endpoints', () => {
  const d = copy(); d.contributions[0].endeavorId = 'endeavor:other';
  d.relations[0] = { ...d.relations[0], type: 'uses', fromId: 'role:mixing-engineer', toId: 'role:recording-engineer' };
  hasError(d, /context mismatch/); hasError(d, /invalid relation endpoint/);
});
test('release blocks illustrative data, placeholders and missing evidence', () => {
  const d = copy(); d.nodes[0].editorialStatus = 'illustrative';
  d.nodes.find(n => n.type === 'learning_resource').url = 'https://example.com/lesson';
  d.evidence = [];
  hasError(d, /unpublished/); hasError(d, /placeholder resource/); hasError(d, /missing reviewed evidence/);
});
test('geography preserves sibling countries and unknown means unknown', () => {
  const d = copy(); d.places.find(p => p.id === 'place:kenya').parentIds = ['place:uganda'];
  hasError(d, /sibling/);
  const graph = createGraph(data);
  assert.equal(graph.getPresence('role:mixing-engineer', 'place:uganda').state, 'unknown');
  assert.ok(graph.getNode('role:mixing-engineer'));
  const positive = copy(); positive.presenceAssessments.push({ id: 'presence:test', subjectId: 'role:mixing-engineer', placeId: 'place:uganda', state: 'limited', reviewedAt: '2026-09-12', scopeNote: 'Unsupported positive claim' });
  hasError(positive, /missing reviewed evidence/);
});
test('rejects relation cycles and malformed or reversed time bounds', () => {
  const d = copy(); const base = { type: 'part_of', editorialStatus: 'published' };
  d.relations.push({ ...base, id: 'relation:cycle-a', fromId: 'knowledge:sound-waves', toId: 'knowledge:audio-signal-processing' }, { ...base, id: 'relation:cycle-b', fromId: 'knowledge:audio-signal-processing', toId: 'knowledge:sound-waves' });
  d.nodes[0].validTime = { start: { value: '2026-02-30', precision: 'day', qualifier: 'exact' } };
  hasError(d, /cycle/); hasError(d, /time precision/);
  d.nodes[0].validTime = { start: { value: '2026', precision: 'year', qualifier: 'exact' }, end: { value: '2020', precision: 'year', qualifier: 'approximate' } };
  hasError(d, /reversed/);
});
test('evidence review and independent license fields are enforced', () => {
  const d = copy(); const e = d.evidence[0]; e.reviewer = ''; e.reviewAfter = '2020-01-01';
  const resource = d.nodes.find(n => n.type === 'learning_resource'); resource.licenseStatus = 'open'; delete resource.licenseUrl;
  hasError(d, /reviewer/); hasError(d, /expired/); hasError(d, /license URL/);
});
test('traversal projects structural context and reverse learning edges with bounded paging', () => {
  const graph = createGraph(data);
  assert.equal(graph.getStages('endeavor:song-release').length, 6);
  assert.equal(graph.getContributions('role:mixing-engineer')[0].stageId, 'stage:song-mixing');
  assert.ok(graph.getNeighborhood('artifact:song-recording').items.some(i => i.entity.id === 'endeavor:song-release'));
  assert.ok(graph.getNeighborhood('knowledge:sound-waves').items.some(i => i.entity.type === 'learning_resource' && i.label === 'Learn this with'));
  const first = graph.getNeighborhood('endeavor:song-release', { limit: 2 });
  const next = graph.getNeighborhood('endeavor:song-release', { limit: 2, offset: 2 });
  assert.equal(first.items.length, 2); assert.ok(first.total > 2);
  assert.notEqual(first.items[0].entity.id, next.items[0].entity.id);
  assert.deepEqual(graph.getNeighborhood('missing').items, []);
});
test('search is deterministic, case insensitive and supports aliases', () => {
  const graph = createGraph(data);
  assert.equal(graph.searchNodes('DAW')[0].id, 'tool:daw');
  assert.deepEqual(graph.searchNodes(' MIX '), graph.searchNodes('mix'));
  assert.deepEqual(graph.searchNodes('unavailable-query'), []);
});

test('enum values cannot be arrays that bypass discriminated resource validation', () => {
  const d = copy(); const n = d.nodes.find(n => n.type === 'learning_resource');
  n.type = ['learning_resource'];
  for (const key of ['url', 'access', 'licenseStatus', 'provider', 'format']) delete n[key];
  hasError(d, /invalid type/);
});
test('mixed time precision rejects definite reversal but allows overlapping uncertainty', () => {
  const d = copy(); d.nodes[0].validTime = { start: { value: '2026', precision: 'year', qualifier: 'exact' }, end: { value: '2020-01-01', precision: 'day', qualifier: 'exact' } };
  hasError(d, /reversed/);
  d.nodes[0].validTime.end.value = '2026-01-01';
  assert.deepEqual(validateCatalog(d), []);
});
test('editorial output mapping cannot verify a factual contribution output', () => {
  const d = copy();
  for (const e of d.evidence.filter(e => e.subjectId === 'relation:performance-output')) e.sourceId = 'source:song-editorial';
  hasError(d, /relation:performance-output: missing reviewed evidence/);
});
