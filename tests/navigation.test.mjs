import assert from 'node:assert/strict';
import test from 'node:test';
import { loadCatalog } from '../scripts/load-catalog.mjs';
import { createGraph } from '../src/data/graph.ts';
import { discoveryPool, pickDiscovery, shuffleDiscovery } from '../src/discovery.ts';
import { followNavigation, normalizeRoute, restoreNavigation, revisitTrail, withNavigationState } from '../src/navigation.ts';
import { routeToHash } from '../src/routing.ts';

const graph = createGraph(await loadCatalog());
const home = () => restoreNavigation('#/', null, graph);
const explore = (entityId, contextContributionId) => ({ kind: 'explore', entityId, ...(contextContributionId ? { contextContributionId } : {}) });
const follow = (snapshot, entityId) => followNavigation(snapshot, explore(entityId), graph);

test('back and forward restore the original contribution context of a shared concept', () => {
  const mixing = follow(home(), 'contribution:song-mix');
  const skill = follow(mixing, 'capability:audio-mixing');
  const sound = follow(skill, 'knowledge:sound-waves');
  const recording = follow(sound, 'contribution:song-record');
  const soundFromRecording = follow(recording, 'knowledge:sound-waves');
  assert.equal(sound.route.contextContributionId, 'contribution:song-mix');
  assert.equal(soundFromRecording.route.contextContributionId, 'contribution:song-record');
  const back = restoreNavigation(routeToHash(sound.route), withNavigationState(null, sound), graph);
  const forward = restoreNavigation(routeToHash(soundFromRecording.route), withNavigationState(null, soundFromRecording), graph);
  assert.deepEqual(back, sound);
  assert.deepEqual(forward, soundFromRecording);
  assert.notEqual(routeToHash(back.route), routeToHash(forward.route));
});

test('a copied focal URL restores context without serializing a multi-step trail', () => {
  const sound = follow(follow(home(), 'contribution:song-mix'), 'knowledge:sound-waves');
  const hash = routeToHash(sound.route);
  assert.ok(hash.includes('?via=contribution%3Asong-mix'));
  const copied = restoreNavigation(hash, null, graph);
  assert.deepEqual(copied.route, sound.route);
  assert.deepEqual(copied.trail, [sound.route]);
  assert.deepEqual(restoreNavigation(hash, withNavigationState({ otherApp: 'preserved' }, sound), graph), sound);
});

test('revisiting an earlier trail entry truncates the branch and restores its own context', () => {
  const sound = follow(follow(home(), 'contribution:song-mix'), 'knowledge:sound-waves');
  const other = follow(follow(sound, 'contribution:song-record'), 'tool:microphone');
  assert.deepEqual(revisitTrail(other, 2, graph), sound);
  assert.equal(revisitTrail(other, -1, graph), other);
  assert.equal(revisitTrail(other, 99, graph), other);
  assert.equal(revisitTrail(other, 1.5, graph), other);
  const newBranch = follow(revisitTrail(other, 2, graph), 'resource:openlearn-sound');
  assert.equal(newBranch.route.contextContributionId, 'contribution:song-mix');
  assert.equal(newBranch.trail.some((route) => route.entityId === 'tool:microphone'), false);
});

test('a repeated focal entity remains a distinct navigation when its earlier trail link is selected', () => {
  const skill = follow(follow(home(), 'contribution:song-mix'), 'capability:audio-mixing');
  const repeatedSkill = follow(follow(skill, 'knowledge:sound-waves'), 'capability:audio-mixing');
  const earlierSkill = revisitTrail(repeatedSkill, 2, graph);
  assert.equal(routeToHash(earlierSkill.route), routeToHash(repeatedSkill.route));
  // The focus effect observes snapshots, because the removed trail anchor does
  // not produce a URL change in this real cycle through a shared concept.
  assert.notEqual(earlierSkill, repeatedSkill);
  assert.deepEqual(earlierSkill, skill);
  assert.equal(earlierSkill.trail.length, 3);
  assert.deepEqual(restoreNavigation(routeToHash(repeatedSkill.route), withNavigationState(null, repeatedSkill), graph), repeatedSkill);
});

test('new process stages clear context and role navigation binds a matching contribution', () => {
  const mixing = follow(home(), 'contribution:song-mix');
  assert.equal(follow(mixing, 'stage:song-writing').route.contextContributionId, undefined);
  assert.equal(follow(mixing, 'endeavor:song-release').route.contextContributionId, undefined);
  assert.equal(follow(mixing, 'role:songwriter').route.contextContributionId, 'contribution:song-write');
  const reset = followNavigation(mixing, { kind: 'home' }, graph);
  assert.deepEqual(reset.trail, [{ kind: 'home' }]);
  assert.equal(follow(mixing, 'contribution:song-mix'), mixing);
});

test('corrupt or stale browser state cannot override the URL or break recovery', () => {
  const sound = follow(follow(home(), 'contribution:song-mix'), 'knowledge:sound-waves');
  const expected = restoreNavigation(routeToHash(sound.route), null, graph);
  const malformed = [
    null, [], { latentThreads: { ...sound, version: 99 } },
    { latentThreads: { ...sound, trail: [null] } },
    { latentThreads: { ...sound, trail: [explore('tool:daw')] } },
    { latentThreads: { ...sound, route: explore('role:songwriter') } },
    { latentThreads: { ...sound, trail: [explore('bad/id')] } },
    { latentThreads: { ...sound, trail: [explore('bad\ud800')] } },
  ];
  for (const state of malformed) assert.deepEqual(restoreNavigation(routeToHash(sound.route), state, graph), expected);
  assert.deepEqual(normalizeRoute(explore('tool:daw', 'role:mixing-engineer'), graph), explore('tool:daw'));
  assert.deepEqual(normalizeRoute(explore('tool:daw', 'contribution:missing'), graph), explore('tool:daw'));
  assert.deepEqual(restoreNavigation('#/unknown', withNavigationState(null, sound), graph), home());
  assert.equal(withNavigationState({ otherApp: 42 }, sound).otherApp, 42);
});

test('only the known preview alias migrates; unavailable IDs retain the helpful missing state', () => {
  assert.deepEqual(restoreNavigation('#/explore/tool:digital-audio-workstation', null, graph).route, explore('tool:daw'));
  assert.deepEqual(restoreNavigation('#/explore/tool:retired', null, graph).route, explore('tool:retired'));
});

test('long sessions keep a bounded, restorable trail', () => {
  let state = home();
  for (let i = 0; i < 40; i++) state = follow(state, i % 2 ? 'knowledge:sound-waves' : 'tool:daw');
  assert.equal(state.trail.length, 30);
  assert.deepEqual(restoreNavigation(routeToHash(state.route), withNavigationState(null, state), graph), state);
});

test('discovery stays in the real mixed catalog and manual shuffle changes available choices', () => {
  const pool = discoveryPool(graph);
  assert.deepEqual([...new Set(pool.map((entity) => entity.type))].sort(), ['artifact', 'capability', 'contribution', 'endeavor', 'knowledge', 'learning_resource', 'role', 'stage', 'tool']);
  const current = ['role:mixing-engineer', 'knowledge:sound-waves', 'tool:daw'];
  const shuffled = shuffleDiscovery(graph, current, () => 0.5);
  assert.deepEqual(shuffled.map((id) => graph.getNode(id)?.type), ['role', 'knowledge', 'tool']);
  shuffled.forEach((id, index) => assert.notEqual(id, current[index]));
  for (const random of [0, 0.4, 0.99, 1, -1, NaN]) assert.ok(graph.getNode(pickDiscovery(pool, undefined, () => random)?.id));
  assert.equal(pickDiscovery([], undefined, () => 0), undefined);
  assert.notEqual(pickDiscovery(pool, pool[0].id, () => 0).id, pool[0].id);
});

test('the search entry surface finds mixed names and aliases without inventing results', () => {
  for (const [query, id] of [['sOnG', 'endeavor:song-release'], ['songwriter', 'role:songwriter'], ['waves', 'knowledge:sound-waves'], [' DAW ', 'tool:daw']]) {
    assert.ok(graph.searchNodes(query).some((entity) => entity.id === id), query);
  }
  assert.deepEqual(graph.searchNodes('coffee'), []);
  assert.deepEqual(graph.searchNodes('   '), []);
});
