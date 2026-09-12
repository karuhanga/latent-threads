import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCatalog } from '../scripts/load-catalog.mjs';
import { createGraph } from '../src/data/graph.ts';
import { validateCatalog } from '../src/data/validate.ts';

const song = await loadCatalog(new URL('../data/song/', import.meta.url));
// Synthetic validator fixtures only. These claims are never included in release data.
function fixture() {
  const catalog = structuredClone(song);
  if (catalog.schemaVersion === '0.1') catalog.schemaVersion = '0.2';
  catalog.organizationExamples = [{
    id: 'example:recording-fixture', name: 'Synthetic recording organization',
    summary: 'A synthetic organization example for validation tests.', url: 'https://www.open.edu/',
    contributionId: 'contribution:song-record', placeId: 'place:uganda',
    placeContext: 'Synthetic fixture: recording activity in Uganda.', editorialStatus: 'published',
  }];
  catalog.sources.push({ id: 'source:organization-fixture', title: 'Synthetic source fixture', kind: 'external', locator: 'https://www.open.edu/', retrievedAt: '2026-09-12', reuseStatus: 'link_only' });
  catalog.evidence.push({ id: 'evidence:organization-fixture', subjectId: 'example:recording-fixture', sourceId: 'source:organization-fixture', claim: 'Synthetic identity, recording activity and Uganda place claim.', support: 'direct', reviewStatus: 'reviewed', reviewedAt: '2026-09-12', reviewer: 'test:fixture' });
  return catalog;
}
const errors = catalog => validateCatalog(catalog, { today: '2026-09-12' });
const hasError = (catalog, pattern) => assert.ok(errors(catalog).some(error => pattern.test(error)), `Expected ${pattern}: ${errors(catalog).join('\n')}`);

test('reviewed organization examples validate while remaining optional', () => {
  assert.deepEqual(errors(song), []);
  const legacy = structuredClone(song); delete legacy.organizationExamples;
  assert.deepEqual(errors(legacy), []);
  assert.deepEqual(errors(fixture()), []);
  const wrongVersion = fixture(); wrongVersion.schemaVersion = '0.1';
  hasError(wrongVersion, /requires schemaVersion 0.2/);
});

test('examples require exact contribution/place references and meaningful field values', () => {
  const cases = [
    ['id', 'organization:wrong', /example: namespace/],
    ['name', '', /name must be nonempty/],
    ['summary', [], /summary must be nonempty/],
    ['placeContext', ' ', /placeContext must be nonempty/],
    ['contributionId', 'role:recording-engineer', /contributionId has wrong endpoint type/],
    ['contributionId', 'contribution:missing', /contributionId is a dangling reference/],
    ['placeId', 'role:recording-engineer', /placeId has wrong endpoint type/],
    ['placeId', 'place:missing', /placeId is a dangling reference/],
    ['editorialStatus', 'draft', /release contains unpublished/],
  ];
  for (const [key, value, pattern] of cases) { const data = fixture(); data.organizationExamples[0][key] = value; hasError(data, pattern); }
  const duplicate = fixture(); duplicate.organizationExamples.push({ ...duplicate.organizationExamples[0] }); hasError(duplicate, /duplicate ID/);
  const malformed = fixture(); malformed.organizationExamples = {}; hasError(malformed, /organizationExamples: expected array/);
  const unpublishedActivity = fixture(); unpublishedActivity.contributions.find(item => item.id === 'contribution:song-record').editorialStatus = 'draft';
  hasError(unpublishedActivity, /published example needs a published contribution/);
});

test('published examples cannot use missing, internal, pending, illustrative or expired evidence', () => {
  const missing = fixture(); missing.evidence.pop(); hasError(missing, /example:recording-fixture: missing reviewed evidence/);
  const internal = fixture(); internal.evidence.at(-1).sourceId = 'source:song-editorial'; hasError(internal, /example:recording-fixture: missing reviewed evidence/);
  const pending = fixture(); pending.evidence.at(-1).reviewStatus = 'pending'; hasError(pending, /example:recording-fixture: missing reviewed evidence/);
  const illustrative = fixture(); illustrative.evidence.at(-1).support = 'illustrative'; hasError(illustrative, /example:recording-fixture: missing reviewed evidence/);
  const expired = fixture(); expired.evidence.at(-1).reviewAfter = '2020-01-01'; hasError(expired, /example:recording-fixture: evidence review has expired/);
});

test('organization URLs must be ordinary public web links without credentials', () => {
  for (const url of ['javascript:alert(1)', 'file:///tmp/org', 'data:text/html,organization', 'https://user:secret@www.open.edu/', 'https://localhost/', 'http://127.0.0.1/', 'https://192.168.1.4/', 'http://[::1]/', 'https://example.com/', 'https://private.local/']) {
    const data = fixture(); data.organizationExamples[0].url = url; hasError(data, /invalid or non-public organization URL/);
  }
  const credentials = fixture(); credentials.sources.at(-1).locator = 'https://user:secret@www.open.edu/';
  hasError(credentials, /invalid or placeholder source URL/);
});

test('examples appear only on their activity and actual parent stage/endeavor', () => {
  const data = fixture();
  const graph = createGraph(data);
  for (const id of ['contribution:song-record', 'stage:song-recording', 'endeavor:song-release']) {
    const examples = graph.getOrganizationExamples(id);
    assert.deepEqual(examples.map(example => example.id), ['example:recording-fixture']);
    assert.equal(examples[0].place.label, 'Uganda');
    assert.equal(examples[0].contribution.id, 'contribution:song-record');
  }
  for (const id of ['role:recording-engineer', 'knowledge:sound-waves', 'contribution:song-mix', 'stage:song-mixing', 'example:recording-fixture', 'missing']) assert.deepEqual(graph.getOrganizationExamples(id), []);
  assert.equal(graph.getNode('example:recording-fixture'), undefined);
  data.organizationExamples[0].editorialStatus = 'draft';
  assert.deepEqual(createGraph(data).getOrganizationExamples('endeavor:song-release'), []);
  assert.deepEqual(createGraph(song).getOrganizationExamples('endeavor:song-release'), []);
});
