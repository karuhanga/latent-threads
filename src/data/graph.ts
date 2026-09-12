import type { Catalog, Contribution, Entity, RelationType } from './types.ts';

export interface Connection { entity: Entity; label: string; evidenceId: string; relationId?: string }
export interface Neighborhood { items: Connection[]; total: number; offset: number; limit: number }
export const typeLabels: Record<Entity['type'], string> = {
  endeavor: 'Endeavor', stage: 'Stage', artifact: 'Artifact', service: 'Service', role: 'Role',
  contribution: 'Contribution', capability: 'Skill', knowledge: 'Knowledge', tool: 'Tool', learning_resource: 'Learning resource',
};
const wording: Record<RelationType, [string, string]> = {
  produces: ['Produces', 'Made through'], depends_on: ['Depends on', 'Supports'],
  uses: ['Uses', 'Used in this contribution'], requires_capability: ['Calls on', 'Practised in this contribution'],
  draws_on: ['Draws on', 'Helps explain'], teaches: ['Teaches', 'Learn this with'],
  hands_off_to: ['Hands work to', 'Receives work from'], coordinates_with: ['Coordinates in this endeavor with', 'Coordinates in this endeavor with'],
  specializes: ['A more specific role than', 'A more specific role'], part_of: ['Part of', 'Includes'],
};

export function createGraph(catalog: Catalog) {
  const entities = new Map<string, Entity>(catalog.nodes.map(n => [n.id, n]));
  for (const c of catalog.contributions) entities.set(c.id, {
    ...c, type: 'contribution', label: `${entities.get(c.roleId)?.label ?? 'Contributor'} at work`, summary: c.action,
  });
  const adjacency = new Map<string, Connection[]>();
  function connect(from: string, to: string, label: string, reverse: string, evidenceId: string, relationId?: string) {
    const a = entities.get(from), b = entities.get(to); if (!a || !b) return;
    adjacency.set(from, [...(adjacency.get(from) ?? []), { entity: b, label, evidenceId, relationId }]);
    adjacency.set(to, [...(adjacency.get(to) ?? []), { entity: a, label: reverse, evidenceId, relationId }]);
  }
  for (const n of catalog.nodes) if (n.type === 'stage' && n.endeavorId) connect(n.endeavorId, n.id, 'Explore this stage', 'Part of this endeavor', n.id);
  for (const c of catalog.contributions) {
    connect(c.stageId, c.id, 'Contribution in this stage', 'Happens in this stage', c.id);
    connect(c.id, c.roleId, 'A contribution by', 'Contributes in this context', c.id);
  }
  for (const r of catalog.relations) {
    const labels = wording[r.type];
    connect(r.fromId, r.toId, labels[0], labels[1], r.id, r.id);
  }
  const evidence = new Map(catalog.sources.map(s => [s.id, s]));
  function getContributions(id: string): Contribution[] {
    return catalog.contributions.filter(c => c.id === id || c.roleId === id || c.stageId === id || c.endeavorId === id);
  }
  return {
    catalog,
    getNode: (id: string) => entities.get(id),
    getStages: (id: string) => catalog.nodes.filter(n => n.type === 'stage' && n.endeavorId === id).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)),
    getContributions,
    getEvidence: (id: string) => catalog.evidence.filter(e => e.subjectId === id).map(e => ({ ...e, source: evidence.get(e.sourceId)! })),
    getPresence: (subjectId: string, placeId: string) => catalog.presenceAssessments.find(p => p.subjectId === subjectId && p.placeId === placeId) ?? { subjectId, placeId, state: 'unknown' as const, scopeNote: 'Local presence unverified' },
    getNeighborhood(id: string, { limit = 10, offset = 0 }: { limit?: number; offset?: number } = {}): Neighborhood {
      const size = Number.isFinite(limit) ? Math.max(1, Math.min(24, Math.floor(limit))) : 10;
      const start = Number.isFinite(offset) ? Math.max(0, Math.floor(offset)) : 0;
      const connections = adjacency.get(id) ?? [];
      return { items: connections.slice(start, start + size), total: connections.length, limit: size, offset: start };
    },
    searchNodes(query: string, { limit = 30 }: { limit?: number } = {}): Entity[] {
      const q = query.trim().toLocaleLowerCase(); if (!q) return [];
      const size = Math.max(1, Math.min(50, Number.isFinite(limit) ? Math.floor(limit) : 30));
      return [...entities.values()].filter(e => [e.label, ...('aliases' in e ? e.aliases ?? [] : [])].some(s => s.toLocaleLowerCase().includes(q)))
        .sort((a, b) => Number(b.label.toLocaleLowerCase() === q) - Number(a.label.toLocaleLowerCase() === q) || a.label.localeCompare(b.label) || a.id.localeCompare(b.id)).slice(0, size);
    },
  };
}
export type Graph = ReturnType<typeof createGraph>;
