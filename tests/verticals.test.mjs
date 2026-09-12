import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { loadCatalog } from '../scripts/load-catalog.mjs';
import { createGraph } from '../src/data/graph.ts';
import { discoveryPool, makeDiscoveryWall, pickDiscovery, searchDiscovery } from '../src/discovery.ts';
import { learningFor } from '../src/components/learning.ts';

const catalog = await loadCatalog();
const graph = createGraph(catalog);
const manifest = JSON.parse(await readFile(new URL('../data/catalog.json', import.meta.url)));
const shared = await loadCatalog(new URL('../data/shared/', import.meta.url));
const domains = await Promise.all(manifest.packs.filter(name => name !== 'shared').map(async name => ({
  name, pack: await loadCatalog(new URL(`../data/${name}/`, import.meta.url)),
})));

function neighbors(id) {
  const result = [];
  for (let offset = 0; ; offset += 24) {
    const page = graph.getNeighborhood(id, { offset, limit: 24 });
    result.push(...page.items.map(item => item.entity));
    if (offset + 24 >= page.total) return result;
  }
}

for (const { name, pack } of domains) test(`${name}: complete exploration and an introductory learning exit within its own work`, () => {
  const endeavor = pack.nodes.filter(node => node.type === 'endeavor');
  assert.equal(endeavor.length, 1);
  const id = endeavor[0].id;
  const outputs = pack.nodes.filter(node => ['artifact', 'service'].includes(node.type));
  assert.ok(outputs.length >= 1);
  assert.ok(outputs.some(output => catalog.relations.some(edge => edge.type === 'produces' && edge.fromId === id && edge.toId === output.id)));
  const stages = graph.getStages(id);
  assert.ok(stages.length >= 4 && stages.length <= 7);
  assert.ok(stages.every(stage => graph.getContributions(stage.id).length > 0));
  assert.ok(new Set(pack.contributions.map(activity => activity.roleId)).size >= 4);
  for (const type of ['knowledge', 'capability', 'tool']) assert.ok(pack.nodes.some(node => node.type === type), `${name} needs ${type}`);

  // A distant resource in a different vertical must not satisfy this vertical's learning promise.
  const ownIds = [...pack.nodes, ...pack.contributions].map(item => item.id);
  const allowed = new Set([...ownIds, ...shared.nodes.map(node => node.id)]);
  const reached = new Set([id]);
  const pending = [id];
  while (pending.length) for (const node of neighbors(pending.shift())) {
    if (allowed.has(node.id) && !reached.has(node.id)) { reached.add(node.id); pending.push(node.id); }
  }
  for (const ownId of ownIds) assert.ok(reached.has(ownId), `${name}: unreachable ${ownId}`);
  const learning = [...reached].flatMap(conceptId => learningFor(catalog, conceptId))
    .filter(option => allowed.has(option.resource.id));
  assert.ok(learning.some(({ resource }) => ['free', 'audit_free'].includes(resource.access)
    && /beginner|introductory/i.test(resource.learnerLevel ?? '')), `${name}: missing introductory free learning path`);
});

test('every enabled endeavor can appear in catalog search, global Surprise and the tile wall', () => {
  const pool = discoveryPool(graph);
  const endeavors = catalog.nodes.filter(node => node.type === 'endeavor');
  for (const endeavor of endeavors) {
    assert.ok(searchDiscovery(graph, endeavor.label).some(item => item.id === endeavor.id));
    const index = pool.findIndex(item => item.id === endeavor.id);
    assert.ok(index >= 0);
    assert.equal(pickDiscovery(pool, undefined, () => (index + 0.5) / pool.length).id, endeavor.id);
  }
  let seed = 73;
  const random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32);
  let wall;
  const shown = new Set();
  for (let i = 0; i < 100; i++) {
    wall = makeDiscoveryWall(graph, wall, random);
    assert.equal(new Set(wall.tiles.map(tile => tile.entityId)).size, wall.tiles.length);
    wall.tiles.forEach(tile => shown.add(tile.entityId));
  }
  for (const endeavor of endeavors) assert.ok(shown.has(endeavor.id), `Never shown: ${endeavor.label}`);
});

test('Uganda examples remain connected to their reviewed activities and never leak onto independent concepts', () => {
  assert.equal(catalog.organizationExamples.length, 3);
  for (const example of catalog.organizationExamples) {
    assert.equal(example.placeId, 'place:uganda');
    const activity = graph.getNode(example.contributionId);
    for (const id of [activity.id, activity.stageId, activity.endeavorId]) {
      assert.ok(graph.getOrganizationExamples(id).some(item => item.id === example.id));
    }
    for (const node of neighbors(activity.id).filter(node => ['knowledge', 'tool', 'role', 'capability'].includes(node.type))) {
      assert.deepEqual(graph.getOrganizationExamples(node.id), []);
    }
  }
});
