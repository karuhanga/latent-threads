import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCatalog } from '../scripts/load-catalog.mjs';
import { accessLabels, evidenceLabels, learningFor, licenseLabels, safeExternalUrl } from '../src/components/learning.ts';

const catalog = await loadCatalog(new URL('../data/song/', import.meta.url));

test('curated learning cards follow teaching relations across the three checked resources', () => {
  const expected = [
    ['knowledge:chords-and-harmony', 'resource:ableton-learning-music'],
    ['knowledge:sound-waves', 'resource:openlearn-sound'],
    ['capability:audio-recording', 'resource:openlearn-recording'],
  ];
  for (const [concept, resource] of expected) {
    const cards = learningFor(catalog, concept);
    assert.deepEqual(cards.map(card => card.resource.id), [resource]);
    assert.ok(cards[0].connections.every(relation => relation.toId === concept && relation.type === 'teaches'));
    assert.ok(cards[0].resource.accessReviewedAt);
  }
  assert.deepEqual(learningFor(catalog, 'role:mixing-engineer'), []);
  assert.equal(accessLabels.free, 'Free access');
  assert.match(licenseLabels.unknown, /Unknown/);
  assert.equal(learningFor(catalog, expected[0][0])[0].resource.licenseStatus, 'unknown');
});

test('nearby, reversed and draft connections cannot become learning recommendations', () => {
  const copy = structuredClone(catalog);
  const relation = copy.relations.find(item => item.id === 'relation:learn-harmony');
  relation.editorialStatus = 'draft';
  assert.deepEqual(learningFor(copy, relation.toId), []);
  relation.editorialStatus = 'published';
  relation.type = 'draws_on';
  assert.deepEqual(learningFor(copy, relation.toId), []);
  relation.type = 'teaches';
  [relation.fromId, relation.toId] = [relation.toId, relation.fromId];
  assert.deepEqual(learningFor(copy, relation.toId), []);
  assert.deepEqual(learningFor(copy, relation.fromId), []);
});

test('contested and inferred evidence stay explicit even under editorial framing', () => {
  const item = { support: 'inference', reviewStatus: 'contested' };
  const source = { kind: 'internal_editorial' };
  assert.deepEqual(evidenceLabels(item, source), ['Contested claim', 'Editorial framing', 'Inferred from sources']);
  assert.deepEqual(evidenceLabels({ support: 'illustrative', reviewStatus: 'pending' }, { kind: 'external' }), ['Review pending', 'Illustrative — not verified']);
});

test('resource links allow ordinary web URLs without executable schemes or embedded credentials', () => {
  assert.equal(safeExternalUrl('https://learningmusic.ableton.com/'), 'https://learningmusic.ableton.com/');
  for (const url of ['javascript:alert(1)', 'data:text/html,test', 'file:///tmp/test', 'https://user:secret@example.com', '/relative', undefined]) assert.equal(safeExternalUrl(url), undefined);
});
