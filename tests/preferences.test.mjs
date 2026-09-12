import test from 'node:test';
import assert from 'node:assert/strict';
import { readPreferences, writePreferences, defaultPreferences, preferenceKey } from '../src/preference-storage.ts';
import { createGraph } from '../src/data/graph.ts';
import { loadCatalog } from '../scripts/load-catalog.mjs';
import { validateCatalog } from '../src/data/validate.ts';

test('display preferences remain usable with corrupt, unavailable or partial storage', () => {
  for (const raw of [null, 'broken', 'null', '[]', '{"showDetails":"true","autoShuffle":0}']) {
    assert.deepEqual(readPreferences({ getItem: () => raw }), defaultPreferences);
  }
  assert.deepEqual(readPreferences({ getItem: () => '{"showDetails":true}' }), { showDetails: true, autoShuffle: true });
  assert.deepEqual(readPreferences({ getItem: () => { throw Error('denied'); } }), defaultPreferences);
  assert.doesNotThrow(() => writePreferences({ setItem: () => { throw Error('full'); } }, defaultPreferences));
  let stored;
  writePreferences({ setItem: (key, value) => { assert.equal(key, preferenceKey); stored = value; } }, { showDetails: true, autoShuffle: false });
  assert.deepEqual(readPreferences({ getItem: () => stored }), { showDetails: true, autoShuffle: false });
});

test('conventional activity names stay distinct from professional roles and full actions', async () => {
  const catalog = await loadCatalog();
  const graph = createGraph(catalog);
  assert.equal(graph.getNode('contribution:song-produce').label, 'Production');
  assert.equal(graph.getNode('role:music-producer').label, 'Music producer');
  assert.match(graph.getNode('contribution:song-produce').summary, /recording sessions/);
  assert.ok(graph.searchNodes('Production').some(item => item.type === 'contribution'));
  catalog.contributions[0].label = [];
  assert.ok(validateCatalog(catalog).some(error => /label/.test(error)));
});
