import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHashRoute, routeToHash } from '../src/routing.ts';

test('namespaced IDs survive copied links with literal or encoded colons', () => {
  const route = { kind: 'explore', entityId: 'endeavor:song-release' };
  assert.deepEqual(parseHashRoute('#/explore/endeavor:song-release'), route);
  assert.deepEqual(parseHashRoute(routeToHash(route)), route);
});

test('malformed escapes, nested paths and encoded separators cannot crash or become IDs', () => {
  for (const hash of [
    '#/explore/%',
    '#/explore/%E0%A4%A',
    '#/explore/role:one/more',
    '#/explore/role%3Aone%2Fmore',
    '#/explore/role%3Aone%3Fextra',
    '#/explore/role%3Aone%23extra',
    '#/explore/%00',
    '#/explore/%20',
    '#/explore/',
    '#/unknown',
    'https://example.com/#/explore/role:one',
  ]) {
    assert.equal(parseHashRoute(hash), null, hash);
  }
});

test('home entry points are valid and unknown entity IDs remain a data-layer concern', () => {
  for (const hash of ['', '#', '#/']) {
    assert.deepEqual(parseHashRoute(hash), { kind: 'home' });
  }
  assert.deepEqual(parseHashRoute('#/explore/role:future-role'), {
    kind: 'explore',
    entityId: 'role:future-role',
  });
});
