import type { Graph } from './data/graph.ts';
import type { Entity } from './data/types.ts';

export function discoveryPool(graph: Graph): Entity[] {
  return [...graph.catalog.nodes, ...graph.catalog.contributions]
    .filter((item) => item.editorialStatus === 'published')
    .flatMap((item) => {
      const entity = graph.getNode(item.id);
      return entity ? [entity] : [];
    });
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

export function searchDiscovery(graph: Graph, query: string): Entity[] {
  const term = query.trim().toLocaleLowerCase();
  if (!term) return [];
  return discoveryPool(graph).filter((entity) => [entity.label, ...('aliases' in entity ? entity.aliases ?? [] : [])]
    .some((label) => label.toLocaleLowerCase().includes(term)))
    .sort((a, b) => Number(b.label.toLocaleLowerCase() === term) - Number(a.label.toLocaleLowerCase() === term)
      || a.label.localeCompare(b.label) || a.id.localeCompare(b.id));
}

type TileSize = 'large' | 'wide' | 'tall' | 'small';
export type DiscoveryWall = { layout: number; tiles: { entityId: string; slot: string; size: TileSize }[] };
const SIZES: TileSize[][] = [
  ['large', 'small', 'small', 'wide', 'small', 'small', 'wide'],
  ['small', 'large', 'small', 'tall', 'small', 'small', 'wide'],
  ['wide', 'wide', 'small', 'large', 'small', 'small', 'small'],
];

function shuffled<T>(items: T[], random: () => number): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const value = random();
    const j = Math.max(0, Math.min(i, Math.floor((Number.isFinite(value) ? value : 0) * (i + 1))));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

/** Give the wall breadth without hard-coding an endeavor or fabricating a tile. */
export function makeDiscoveryWall(graph: Graph, previous?: DiscoveryWall, random = Math.random): DiscoveryWall {
  const pool = discoveryPool(graph);
  const oldIds = new Set(previous?.tiles.map((tile) => tile.entityId));
  const pickFresh = (items: Entity[]) => {
    const fresh = items.filter((entity) => !oldIds.has(entity.id));
    return pickDiscovery(fresh.length ? fresh : items, undefined, random);
  };
  const selected: Entity[] = [];
  const endeavor = pickFresh(pool.filter((entity) => entity.type === 'endeavor'));
  if (endeavor) selected.push(endeavor);
  const types = shuffled([...new Set(pool.filter((entity) => entity.type !== 'endeavor').map((entity) => entity.type))], random);
  for (const type of types) {
    if (selected.length >= 7) break;
    const entity = pickFresh(pool.filter((item) => item.type === type));
    if (entity) selected.push(entity);
  }
  const remaining = shuffled(pool.filter((entity) => !selected.some((item) => item.id === entity.id)), random);
  selected.push(...remaining.slice(0, 7 - selected.length));
  const layouts = [0, 1, 2].filter((layout) => layout !== previous?.layout);
  const layout = shuffled(layouts, random)[0] ?? 0;
  return {
    layout,
    tiles: shuffled(selected, random).map((entity, index) => ({
      entityId: entity.id, slot: String.fromCharCode(97 + index), size: SIZES[layout]?.[index] ?? 'small',
    })),
  };
}

export type WallPhase = 'idle' | 'leaving' | 'arriving';

/** Recheck interaction safety at the swap, not just when an animation starts. */
export function runWallTransition({ isSafe, onSwap, onPhase, instant = false, schedule = setTimeout, cancel = clearTimeout }: {
  isSafe: () => boolean;
  onSwap: () => void;
  onPhase: (phase: WallPhase) => void;
  instant?: boolean;
  schedule?: (callback: () => void, delay: number) => ReturnType<typeof setTimeout>;
  cancel?: (timer: ReturnType<typeof setTimeout>) => void;
}): () => void {
  let stopped = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const stop = () => { stopped = true; if (timer !== undefined) cancel(timer); onPhase('idle'); };
  if (!isSafe()) return stop;
  if (instant) { onSwap(); onPhase('idle'); return stop; }
  onPhase('leaving');
  timer = schedule(() => {
    if (stopped) return;
    if (!isSafe()) { onPhase('idle'); return; }
    onSwap();
    onPhase('arriving');
    timer = schedule(() => { if (!stopped) onPhase('idle'); }, 600);
  }, 450);
  return stop;
}
