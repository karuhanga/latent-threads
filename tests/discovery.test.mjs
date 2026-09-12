import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCatalog } from '../scripts/load-catalog.mjs';
import { createGraph } from '../src/data/graph.ts';
import { discoveryPool, makeDiscoveryWall, runWallTransition, searchDiscovery } from '../src/discovery.ts';

const catalog = await loadCatalog(new URL('../data/song/', import.meta.url));
const graph = createGraph(catalog);
function seededRandom(seed = 7) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
}

test('global discovery includes every published node and activity, excluding drafts and fixtures', () => {
  const data = structuredClone(catalog);
  data.nodes.push({ ...data.nodes[0], id: 'endeavor:draft', editorialStatus: 'draft' });
  data.contributions.push({ ...data.contributions[0], id: 'contribution:fixture', editorialStatus: 'illustrative' });
  const pool = discoveryPool(createGraph(data));
  assert.equal(pool.length, catalog.nodes.length + catalog.contributions.length);
  assert.ok(pool.some((entity) => entity.type === 'learning_resource'));
  assert.ok(pool.some((entity) => entity.type === 'contribution'));
  assert.ok(pool.some((entity) => entity.type === 'stage'));
  assert.ok(pool.some((entity) => entity.type === 'artifact'));
  assert.equal(pool.some((entity) => entity.id.endsWith(':draft') || entity.id.endsWith(':fixture')), false);
});

test('successive walls have real unique mixed content and vary their large/small layout', () => {
  const random = seededRandom();
  const seen = new Set();
  let previous;
  for (let i = 0; i < 100; i++) {
    const wall = makeDiscoveryWall(graph, previous, random);
    assert.equal(wall.tiles.length, 7);
    assert.equal(new Set(wall.tiles.map((tile) => tile.entityId)).size, 7);
    assert.equal(new Set(wall.tiles.map((tile) => tile.slot)).size, 7);
    assert.ok(wall.tiles.some((tile) => tile.size === 'large'));
    assert.ok(wall.tiles.some((tile) => tile.size === 'small'));
    if (previous) assert.notEqual(wall.layout, previous.layout);
    const entities = wall.tiles.map((tile) => graph.getNode(tile.entityId));
    assert.ok(entities.every((entity) => entity?.editorialStatus === 'published'));
    assert.ok(entities.some((entity) => entity.type === 'endeavor'));
    assert.ok(new Set(entities.map((entity) => entity.type)).size >= 6);
    entities.forEach((entity) => seen.add(entity.id));
    previous = wall;
  }
  assert.equal(seen.size, discoveryPool(graph).length);
});

test('another endeavor and its connected content need no song-specific discovery code', () => {
  const data = structuredClone(catalog);
  data.nodes.push(
    { id: 'endeavor:coffee', type: 'endeavor', label: 'Coffee production', summary: 'Synthetic test endeavor.', editorialStatus: 'published' },
    { id: 'role:grower', type: 'role', label: 'Coffee grower', summary: 'Synthetic test role.', editorialStatus: 'published' },
    { id: 'stage:coffee-harvest', type: 'stage', label: 'Harvesting', endeavorId: 'endeavor:coffee', summary: 'Synthetic test stage.', editorialStatus: 'published' },
    { id: 'knowledge:soil', type: 'knowledge', label: 'Soil', aliases: ['earth'], summary: 'Synthetic test concept.', editorialStatus: 'published' },
  );
  data.contributions.push({ id: 'contribution:coffee-harvest', label: 'Harvesting', endeavorId: 'endeavor:coffee', roleId: 'role:grower', stageId: 'stage:coffee-harvest', action: 'Synthetic harvesting test.', editorialStatus: 'published' });
  data.relations.push({ id: 'relation:coffee-soil', type: 'draws_on', fromId: 'contribution:coffee-harvest', toId: 'knowledge:soil', editorialStatus: 'published' });
  const expanded = createGraph(data);
  const random = seededRandom(33);
  const first = makeDiscoveryWall(expanded, undefined, random);
  const next = makeDiscoveryWall(expanded, first, random);
  const endeavorOf = (wall) => wall.tiles.map((tile) => expanded.getNode(tile.entityId)).find((entity) => entity.type === 'endeavor').id;
  assert.notEqual(endeavorOf(first), endeavorOf(next));
  assert.ok(searchDiscovery(expanded, ' COFFEE ').some((entity) => entity.id === 'endeavor:coffee'));
  assert.ok(searchDiscovery(expanded, ' EARTH ').some((entity) => entity.id === 'knowledge:soil'));
  assert.ok(discoveryPool(expanded).some((entity) => entity.id === 'contribution:coffee-harvest'));
  const unpublished = data.nodes.find((node) => node.id === 'knowledge:soil');
  unpublished.editorialStatus = 'draft';
  assert.deepEqual(searchDiscovery(createGraph(data), 'earth'), []);
});

test('tiny or empty catalogs do not duplicate or manufacture tiles', () => {
  const single = createGraph({ ...catalog, nodes: [catalog.nodes[0]], contributions: [], relations: [] });
  assert.equal(makeDiscoveryWall(single).tiles.length, 1);
  const empty = createGraph({ ...catalog, nodes: [], contributions: [], relations: [] });
  assert.deepEqual(makeDiscoveryWall(empty).tiles, []);
  assert.deepEqual(searchDiscovery(graph, 'nothing-with-this-name'), []);
});

function clock() {
  let time = 0;
  let id = 0;
  const timers = new Map();
  return {
    schedule(callback, delay) { timers.set(++id, { callback, at: time + delay }); return id; },
    cancel(id) { timers.delete(id); },
    advance(delay) {
      const end = time + delay;
      let next;
      while ((next = [...timers.entries()].sort((a, b) => a[1].at - b[1].at)[0]) && next[1].at <= end) {
        time = next[1].at; timers.delete(next[0]); next[1].callback();
      }
      time = end;
    },
    pending() { return timers.size; },
  };
}

test('a pointer or focus arriving during the exit keeps the old tile destination', () => {
  const timer = clock();
  const events = [];
  let safe = true;
  runWallTransition({ ...timer, isSafe: () => safe, onPhase: (phase) => events.push(phase), onSwap: () => events.push('changed target') });
  timer.advance(400);
  safe = false;
  timer.advance(1_000);
  assert.deepEqual(events, ['leaving', 'idle']);
  assert.equal(timer.pending(), 0);
});

test('explicit cancellation for hover, focus, visibility or preference removes a pending swap', () => {
  const timer = clock();
  const events = [];
  const stop = runWallTransition({ ...timer, isSafe: () => true, onPhase: (phase) => events.push(phase), onSwap: () => events.push('changed target') });
  timer.advance(200);
  stop();
  timer.advance(2_000);
  assert.deepEqual(events, ['leaving', 'idle']);
  assert.equal(timer.pending(), 0);
});

test('an uninterrupted shuffle completes both motion phases, while reduced-motion manual shuffle is immediate', () => {
  const timer = clock();
  const events = [];
  runWallTransition({ ...timer, isSafe: () => true, onPhase: (phase) => events.push(phase), onSwap: () => events.push('swap') });
  timer.advance(450);
  assert.deepEqual(events, ['leaving', 'swap', 'arriving']);
  timer.advance(600);
  assert.deepEqual(events, ['leaving', 'swap', 'arriving', 'idle']);
  const instant = [];
  runWallTransition({ ...timer, instant: true, isSafe: () => true, onPhase: (phase) => instant.push(phase), onSwap: () => instant.push('swap') });
  assert.deepEqual(instant, ['swap', 'idle']);
  assert.equal(timer.pending(), 0);
});
