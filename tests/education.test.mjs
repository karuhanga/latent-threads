import assert from 'node:assert/strict';
import test from 'node:test';
import { validateCatalog } from '../src/data/validate.ts';
import { createGraph, entityTypeLabel } from '../src/data/graph.ts';

const detail = () => ({ explanation: 'A concise explanation.', example: { title: 'An example', body: 'An editorial scenario.' }, inputs: 'Starting material.', outputs: 'A result.', decision: 'Choose an approach.', practice: 'Try a small exercise.' });
const node = (id, type, fields = {}) => ({ id, type, label: id, summary: 'Synthetic structural-test record.', editorialStatus: 'published', ...fields });
const resource = (id, resourceKind) => node(id, 'learning_resource', { resourceKind, url: 'https://www.open.edu/openlearn/', provider: 'Test provider', format: 'Online lesson', access: 'unknown', licenseStatus: 'unknown', accessReviewedAt: '2026-09-12' });
const edge = (id, type, fromId, toId) => ({ id, type, fromId, toId, editorialStatus: 'published' });
function evidence(subjectId, sourceId = 'source:external') {
  return { id: `evidence:${subjectId.replace(':', '-')}-${sourceId.split(':')[1]}`, subjectId, sourceId, claim: 'Synthetic coverage to exercise validation, not a factual claim.', support: 'direct', reviewStatus: 'reviewed', reviewedAt: '2026-09-12', reviewer: 'test' };
}
function fixture() {
  const nodes = [
    node('knowledge:field', 'knowledge', { kind: 'field' }),
    node('knowledge:topic', 'knowledge', { kind: 'topic', details: detail() }),
    node('capability:practice', 'capability', { kind: 'skill' }),
    node('role:general', 'role'), node('role:specialist', 'role'),
    resource('resource:program', 'program'), resource('resource:course', 'course'),
    resource('resource:other-course', 'course'), resource('resource:module', 'module'), resource('resource:primer', 'tutorial'),
  ];
  Object.assign(nodes.find(n => n.id === 'resource:course'), { preparation: 'Some prior learning.', effort: 'A short session.', credential: 'Provider-stated completion outcome.', outcomes: ['Understand the example.'] });
  const relations = [
    edge('relation:subject', 'part_of', 'knowledge:topic', 'knowledge:field'),
    edge('relation:role', 'specializes', 'role:specialist', 'role:general'),
    edge('relation:course', 'curriculum_part_of', 'resource:course', 'resource:program'),
    edge('relation:module', 'curriculum_part_of', 'resource:module', 'resource:course'),
    edge('relation:shared-module', 'curriculum_part_of', 'resource:module', 'resource:other-course'),
    edge('relation:teaches', 'teaches', 'resource:module', 'knowledge:topic'),
    edge('relation:requires-resource', 'learning_requires', 'resource:course', 'resource:primer'),
    edge('relation:requires-concept', 'learning_requires', 'resource:course', 'knowledge:topic'),
    edge('relation:requires-skill', 'learning_requires', 'resource:course', 'capability:practice'),
  ];
  return {
    schemaVersion: '0.3', nodes, relations, contributions: [], places: [], presenceAssessments: [], taxonomyMappings: [], organizationExamples: [],
    sources: [
      { id: 'source:external', title: 'Synthetic external source', kind: 'external', locator: 'https://www.open.edu/openlearn/', retrievedAt: '2026-09-12', reuseStatus: 'link_only' },
      { id: 'source:editorial', title: 'Synthetic editorial rationale', kind: 'internal_editorial', locator: 'tests/education.test.mjs', retrievedAt: '2026-09-12', reuseStatus: 'unreviewed' },
    ],
    evidence: [...nodes, ...relations].map(n => evidence(n.id)).concat(evidence('knowledge:topic', 'source:editorial')),
  };
}
const fails = (catalog, pattern, options) => {
  const errors = validateCatalog(catalog, options);
  assert.ok(errors.some(error => pattern.test(error)), `Expected ${pattern}; received ${JSON.stringify(errors)}`);
};

test('v0.3 accepts depth, structured resources and shared curriculum membership', () => {
  assert.deepEqual(validateCatalog(fixture()), []);
});

test('depth requires a complete explanation/example object and rejects malformed or unknown fields', () => {
  for (const value of [null, [], '', {}, { explanation: 'Text' }, { example: { title: 'Title', body: 'Body' } },
    { ...detail(), explanation: '  ' }, { ...detail(), practice: [] }, { ...detail(), extra: 'Ignored?' },
    { ...detail(), example: [] }, { ...detail(), example: { title: 'Title', body: '' } }, { ...detail(), example: { title: 'Title', body: 'Body', url: 'Extra' } }]) {
    const c = fixture(); c.nodes[1].details = value;
    fails(c, /details/);
  }
});

test('contribution depth survives the graph projection and uses the same shape validation', () => {
  const c = fixture();
  c.nodes.push(node('endeavor:test', 'endeavor'), node('stage:test', 'stage', { endeavorId: 'endeavor:test', displayOrder: 1 }));
  const activity = { id: 'contribution:test', endeavorId: 'endeavor:test', stageId: 'stage:test', roleId: 'role:general', action: 'Do the work.', editorialStatus: 'published', details: detail() };
  c.contributions.push(activity);
  c.evidence.push(...['endeavor:test', 'stage:test', activity.id].map(id => evidence(id)), evidence(activity.id, 'source:editorial'));
  assert.deepEqual(validateCatalog(c), []);
  assert.deepEqual(createGraph(c).getNode(activity.id).details, activity.details);
  activity.details.example = [];
  fails(c, /contribution:test: details.example/);
});

test('resource kinds and practical metadata have meaningful shapes and correct owners', () => {
  for (const [key, value] of [['resourceKind', 'degree'], ['resourceKind', ['course']], ['preparation', ' '], ['effort', 2], ['credential', []], ['outcomes', []], ['outcomes', ['Good', ' ']], ['outcomes', 'One outcome']]) {
    const c = fixture(); c.nodes.find(n => n.id === 'resource:course')[key] = value;
    fails(c, new RegExp(key));
  }
  const c = fixture(); c.nodes[0].resourceKind = 'course';
  fails(c, /only supported on learning resources/);
  c.relations[0].details = detail();
  fails(c, /not supported on relations/);
});

test('curriculum relation requires structured child/parent kinds and typed endpoints', () => {
  for (const [fromId, toId] of [
    ['resource:primer', 'resource:course'], ['resource:module', 'resource:primer'],
    ['resource:program', 'resource:course'], ['knowledge:topic', 'resource:course'],
  ]) {
    const c = fixture(); Object.assign(c.relations.find(r => r.id === 'relation:module'), { fromId, toId });
    fails(c, /curriculum requires|invalid relation endpoint/);
  }
  const c = fixture(); delete c.nodes.find(n => n.id === 'resource:module').resourceKind;
  fails(c, /curriculum requires/);
});

test('curriculum cycles, duplicate membership and self-links are invalid', () => {
  const c = fixture();
  c.relations.push(edge('relation:cycle-a', 'curriculum_part_of', 'resource:course', 'resource:other-course'), edge('relation:cycle-b', 'curriculum_part_of', 'resource:other-course', 'resource:course'));
  fails(c, /curriculum_part_of cycle/);
  c.relations.push({ ...c.relations.find(r => r.id === 'relation:module'), id: 'relation:duplicate' });
  fails(c, /duplicate relation/);
  c.relations.push(edge('relation:self', 'curriculum_part_of', 'resource:course', 'resource:course'));
  fails(c, /self relation/);
});

test('learning prerequisites reject wrong endpoints and resource cycles without becoming process dependencies', () => {
  for (const [fromId, toId] of [['knowledge:topic', 'resource:course'], ['resource:course', 'role:general']]) {
    const c = fixture(); Object.assign(c.relations.find(r => r.id === 'relation:requires-resource'), { fromId, toId });
    fails(c, /invalid relation endpoint/);
  }
  const c = fixture(); c.relations.push(edge('relation:reverse-prerequisite', 'learning_requires', 'resource:primer', 'resource:course'));
  fails(c, /learning_requires cycle/);
  c.relations.find(r => r.id === 'relation:requires-resource').type = 'depends_on';
  fails(c, /invalid relation endpoint/);
});

test('new authored fields and relations require v0.3; fields and legacy resources remain compatible', () => {
  for (const version of ['0.1', '0.2']) {
    const c = fixture(); c.schemaVersion = version;
    fails(c, /require schemaVersion 0.3/);
    c.nodes.forEach(n => { for (const key of ['details', 'resourceKind', 'preparation', 'effort', 'credential', 'outcomes']) delete n[key]; });
    c.relations = c.relations.filter(r => !['curriculum_part_of', 'learning_requires'].includes(r.type));
    const subjects = new Set([...c.nodes, ...c.relations].map(n => n.id));
    c.evidence = c.evidence.filter(e => subjects.has(e.subjectId));
    assert.deepEqual(validateCatalog(c), []);
    for (const field of ['details', 'resourceKind', 'preparation', 'effort', 'credential', 'outcomes']) {
      const copy = structuredClone(c); copy.nodes.find(n => n.type === 'learning_resource')[field] = null;
      fails(copy, /require schemaVersion 0.3/);
    }
  }
});

test('expanded details need external coverage and editorial example rationale; education edges need direct provider evidence', () => {
  const c = fixture(); c.evidence = c.evidence.filter(e => e.sourceId !== 'source:editorial');
  fails(c, /details example needs reviewed editorial evidence/);
  const other = fixture(); other.evidence = other.evidence.filter(e => e.subjectId !== 'knowledge:topic' || e.sourceId === 'source:editorial');
  fails(other, /knowledge:topic: missing reviewed evidence/);
  for (const id of ['relation:module', 'relation:requires-resource']) {
    const f = fixture(); const support = f.evidence.find(e => e.subjectId === id);
    support.support = 'inference'; support.notes = 'This provider condition was inferred.';
    fails(f, /education relation needs reviewed direct external evidence/);
  }
});

test('labels distinguish study hierarchy, role specialization and curriculum without inferring teaching', () => {
  const c = fixture(); const graph = createGraph(c);
  assert.equal(entityTypeLabel(graph.getNode('knowledge:field')), 'Field of study');
  assert.equal(entityTypeLabel(graph.getNode('knowledge:topic')), 'Topic');
  assert.equal(entityTypeLabel(graph.getNode('resource:course')), 'Course');
  assert.equal(entityTypeLabel(graph.getNode('resource:module')), 'Module');
  assert.equal(entityTypeLabel(graph.getNode('role:specialist')), 'Role');
  assert.equal(entityTypeLabel({ ...graph.getNode('resource:primer'), resourceKind: undefined }), 'Learning resource');
  const links = id => graph.getNeighborhood(id, { limit: 24 }).items;
  assert.ok(links('knowledge:topic').some(x => x.entity.id === 'knowledge:field' && x.label === 'Within broader area'));
  assert.ok(links('role:specialist').some(x => x.label === 'A more specific role than'));
  assert.ok(links('resource:module').some(x => x.entity.id === 'resource:course' && x.label === 'Part of curriculum'));
  assert.ok(links('resource:program').some(x => x.entity.id === 'resource:course' && x.label === 'Includes learning unit'));
  assert.ok(links('resource:primer').some(x => x.entity.id === 'resource:course' && x.label === 'Preparation for'));
  assert.equal(links('knowledge:topic').filter(x => x.label === 'Learn this with').length, 1);
  assert.ok(!links('knowledge:field').some(x => x.entity.type === 'learning_resource'));
});
