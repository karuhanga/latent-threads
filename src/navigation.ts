import type { Graph } from './data/graph.ts';
import { parseHashRoute, routeToHash, type Route } from './routing.ts';

export type NavigationSnapshot = { version: 1; route: Route; trail: Route[] };
const HOME: Route = { kind: 'home' };
const MAX_TRAIL = 30;

/** Keep a real contribution as context, never infer universal role collaboration. */
export function normalizeRoute(route: Route, graph: Graph, inheritedContext?: string): Route {
  if (route.kind === 'home') return HOME;
  const entityId = route.entityId === 'tool:digital-audio-workstation' ? 'tool:daw' : route.entityId;
  const entity = graph.getNode(entityId);
  let contextContributionId = route.contextContributionId ?? inheritedContext;
  const context = contextContributionId ? graph.getNode(contextContributionId) : undefined;
  if (context?.type !== 'contribution') contextContributionId = undefined;
  if (entity?.type === 'contribution') contextContributionId = entity.id;
  else if (entity?.type === 'role') {
    const contributions = graph.getContributions(entity.id);
    contextContributionId = contributions.find((item) => item.id === contextContributionId)?.id
      ?? (contributions.length === 1 ? contributions[0]?.id : undefined);
  } else if (!entity || ['endeavor', 'stage', 'artifact'].includes(entity.type)) {
    contextContributionId = undefined;
  }
  return contextContributionId ? { kind: 'explore', entityId, contextContributionId } : { kind: 'explore', entityId };
}

function storedRoute(value: unknown): Route | null {
  if (!value || typeof value !== 'object') return null;
  const route = value as Record<string, unknown>;
  if (route.kind === 'home') return HOME;
  if (route.kind !== 'explore' || typeof route.entityId !== 'string') return null;
  if (route.contextContributionId !== undefined && typeof route.contextContributionId !== 'string') return null;
  try { return parseHashRoute(routeToHash(route as Route)); } catch { return null; }
}

/** The URL owns the focus; only a matching, valid history snapshot can restore a trail. */
export function restoreNavigation(hash: string, historyState: unknown, graph: Graph): NavigationSnapshot {
  const route = normalizeRoute(parseHashRoute(hash) ?? HOME, graph);
  const fallback: NavigationSnapshot = { version: 1, route, trail: [route] };
  if (!historyState || typeof historyState !== 'object') return fallback;
  const stored = (historyState as Record<string, unknown>).latentThreads;
  if (!stored || typeof stored !== 'object') return fallback;
  const candidate = stored as Record<string, unknown>;
  if (candidate.version !== 1 || !Array.isArray(candidate.trail) || !candidate.trail.length || candidate.trail.length > MAX_TRAIL) return fallback;
  const savedRoute = storedRoute(candidate.route);
  if (!savedRoute || routeToHash(normalizeRoute(savedRoute, graph)) !== routeToHash(route)) return fallback;
  const parsed = candidate.trail.map(storedRoute);
  if (parsed.some((item) => item === null)) return fallback;
  const trail = parsed.map((item) => normalizeRoute(item!, graph));
  const last = trail.at(-1);
  return last && routeToHash(last) === routeToHash(route) ? { version: 1, route, trail } : fallback;
}

export function followNavigation(current: NavigationSnapshot, target: Route, graph: Graph): NavigationSnapshot {
  const route = normalizeRoute(target, graph, current.route.kind === 'explore' ? current.route.contextContributionId : undefined);
  if (routeToHash(route) === routeToHash(current.route)) return current;
  const trail = route.kind === 'home' ? [route] : [...current.trail, route].slice(-MAX_TRAIL);
  return { version: 1, route, trail };
}

export function revisitTrail(current: NavigationSnapshot, index: number, graph: Graph): NavigationSnapshot {
  if (!Number.isInteger(index) || index < 0 || index >= current.trail.length) return current;
  const target = current.trail[index];
  if (!target) return current;
  const route = normalizeRoute(target, graph);
  return { version: 1, route, trail: [...current.trail.slice(0, index), route] };
}

export function withNavigationState(existing: unknown, snapshot: NavigationSnapshot) {
  return { ...(existing && typeof existing === 'object' && !Array.isArray(existing) ? existing : {}), latentThreads: snapshot };
}
