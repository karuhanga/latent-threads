import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCatalog } from '../scripts/load-catalog.mjs';
import { createGraph } from '../src/data/graph.ts';
import { searchDiscovery } from '../src/discovery.ts';

const catalog = await loadCatalog();
const graph = createGraph(catalog);
// Release acceptance covers shared content and every enabled domain, including new education pages.
const reviewedPacks = ['shared', 'song', 'housing', 'coffee', 'clothing', 'diagnostics', 'software'];
for (const name of reviewedPacks) {
  const pack = await loadCatalog(new URL(`../data/${name}/`, import.meta.url));
  test(`${name}: every published page has explanation and an example beyond its tile summary`, () => {
    assert.equal(pack.schemaVersion, '0.3');
    for (const item of [...pack.nodes, ...pack.contributions]) {
      const details = item.details;
      assert.ok(details?.explanation && details.example?.title && details.example?.body, `Missing depth: ${item.id}`);
      assert.notEqual(details.explanation.trim(), (item.summary ?? item.action).trim(), `Repeats summary: ${item.id}`);
      assert.ok(details.explanation.trim().split(/\s+/).length >= 20, `Bare explanation: ${item.id}`);
      assert.ok(details.example.body.trim().split(/\s+/).length >= 15, `Bare example: ${item.id}`);
    }
    for (const activity of pack.contributions) {
      for (const key of ['inputs', 'outputs', 'decision']) assert.ok(activity.details[key]?.trim(), `${activity.id} needs ${key}`);
    }
    for (const resource of pack.nodes.filter(n => n.type === 'learning_resource')) {
      assert.ok(resource.resourceKind && resource.preparation && resource.outcomes?.length, `Learning setup missing: ${resource.id}`);
    }
  });
  if (name === 'shared') continue;
  test(`${name}: study hierarchy and learning offerings are discoverable alongside the work`, () => {
    const fields = pack.nodes.filter(n => n.type === 'knowledge' && ['field', 'subject'].includes(n.kind));
    assert.ok(fields.length >= 1, `${name}: no study area`);
    assert.ok(pack.relations.some(r => r.type === 'part_of'), `${name}: no broader/narrower subject link`);
    const offerings = pack.nodes.filter(n => n.type === 'learning_resource' && n.resourceKind !== 'module');
    assert.ok(offerings.length >= 2, `${name}: needs two useful learning choices`);
    for (const item of [...fields, ...offerings]) {
      assert.ok(searchDiscovery(graph, item.label).some(n => n.id === item.id));
      assert.ok(graph.getNeighborhood(item.id).total > 0, `Orphan education: ${item.id}`);
    }
  });
}

test('prototype exposes a course with two modules and a distinct role specialization', () => {
  const modules = catalog.relations.filter(r => r.type === 'curriculum_part_of' && r.toId === 'resource:openlearn-sound');
  assert.deepEqual(modules.map(r => r.fromId).sort(), ['resource:openlearn-sinusoidal-waves', 'resource:openlearn-sound-basics']);
  for (const module of modules) {
    assert.equal(graph.getNode(module.fromId).resourceKind, 'module');
    assert.ok(catalog.relations.some(r => r.type === 'teaches' && r.fromId === module.fromId));
  }
  assert.ok(catalog.relations.some(r => r.type === 'specializes' && r.fromId === 'role:topline-songwriter' && r.toId === 'role:songwriter'));
});
