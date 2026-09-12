export type Route =
  | { kind: 'home' }
  | { kind: 'explore'; entityId: string; contextContributionId?: string };

/** Parse URL structure only; the data layer decides whether an entity exists. */
export function parseHashRoute(hash: string): Route | null {
  if (hash === '' || hash === '#' || hash === '#/') {
    return { kind: 'home' };
  }

  const match = /^#\/explore\/([^/?#]+)(?:\?via=([^/?#&]+))?$/.exec(hash);
  if (!match?.[1]) return null;

  try {
    const entityId = decodeURIComponent(match[1]);
    // Encoded separators, whitespace and controls must not become route IDs.
    if (!entityId || /[\s/?#\u0000-\u001f\u007f]/u.test(entityId)) return null;
    if (match[2]) {
      const contextContributionId = decodeURIComponent(match[2]);
      if (!contextContributionId || /[\s/?#\u0000-\u001f\u007f]/u.test(contextContributionId)) return null;
      return { kind: 'explore', entityId, contextContributionId };
    }
    return { kind: 'explore', entityId };
  } catch {
    // Malformed percent escapes should recover to home, never crash rendering.
    return null;
  }
}

export function routeToHash(route: Route): string {
  return route.kind === 'home'
    ? '#/'
    : `#/explore/${encodeURIComponent(route.entityId)}${route.contextContributionId ? `?via=${encodeURIComponent(route.contextContributionId)}` : ''}`;
}
