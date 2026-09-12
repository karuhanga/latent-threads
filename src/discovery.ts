import type { Graph } from './data/graph.ts';
import type { Entity } from './data/types.ts';

export function discoveryPool(graph: Graph): Entity[] {
  return graph.catalog.nodes.filter((node) => ['endeavor', 'role', 'knowledge', 'tool', 'capability'].includes(node.type));
}

export function pickDiscovery(items: Entity[], previousId?: string, random = Math.random): Entity | undefined {
  const alternatives = items.filter((item) => item.id !== previousId);
  const pool = alternatives.length ? alternatives : items;
  const value = random();
  const index = Math.min(pool.length - 1, Math.max(0, Math.floor((Number.isFinite(value) ? value : 0) * pool.length)));
  return pool[index];
}

export function shuffleDiscovery(graph: Graph, current: string[], random = Math.random): string[] {
  return ['role', 'knowledge', 'tool'].flatMap((type, index) => {
    const item = pickDiscovery(discoveryPool(graph).filter((node) => node.type === type), current[index], random);
    return item ? [item.id] : [];
  });
}
