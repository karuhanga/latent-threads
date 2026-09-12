import type { Catalog, Contribution, Entity, RelationType, ResourceKind } from './types.ts';

export interface Connection { entity: Entity; label: string; evidenceId: string; relationId?: string }
export interface Neighborhood { items: Connection[]; total: number; offset: number; limit: number }
export const typeLabels: Record<Entity['type'], string> = {
  endeavor: 'Endeavor', stage: 'Stage', artifact: 'Artifact', service: 'Service', role: 'Role',
  contribution: 'Activity', capability: 'Skill', knowledge: 'Concept', tool: 'Tool', learning_resource: 'Learning resource',
};
const resourceLabels: Record<ResourceKind, string> = {
  program: 'Program', course: 'Course', module: 'Module', tutorial: 'Tutorial',
  guide: 'Guide', article: 'Article', workshop: 'Workshop', apprenticeship: 'Apprenticeship',
};
export function entityTypeLabel(entity: Entity): string {
  if (entity.type === 'knowledge') {
    const labels: Record<string, string> = { field: 'Field of study', subject: 'Subject', topic: 'Topic', concept: 'Concept' };
    return labels[entity.kind ?? 'concept'] ?? typeLabels.knowledge;
  }
  if (entity.type === 'learning_resource' && entity.resourceKind) return resourceLabels[entity.resourceKind] ?? typeLabels.learning_resource;
  if (entity.type === 'capability' && entity.kind === 'capability') return 'Capability';
  return typeLabels[entity.type];
}
const wording: Record<RelationType, [string, string]> = {
  produces: ['Produces', 'Made through'], depends_on: ['Depends on', 'Supports'],
  uses: ['Uses', 'Used in'], requires_capability: ['Uses skill', 'Applied in'],
  draws_on: ['Draws on', 'Helps explain'], teaches: ['Teaches', 'Learn this with'],
  hands_off_to: ['Hands work to', 'Receives work from'], coordinates_with: ['Coordinates in this endeavor with', 'Coordinates in this endeavor with'],
  specializes: ['A more specific role than', 'A more specific role'], part_of: ['Within broader area', 'Includes narrower area'],
  curriculum_part_of: ['Part of curriculum', 'Includes learning unit'],
  learning_requires: ['Requires prior learning', 'Preparation for'],
};

export function createGraph(catalog: Catalog) {
  const entities = new Map<string, Entity>(catalog.nodes.map(n => [n.id, n]));
  for (const c of catalog.contributions) entities.set(c.id, {
    ...c, type: 'contribution', label: c.label ?? c.action, summary: c.action,
  });
  const adjacency = new Map<string, Connection[]>();
  function connect(from: string, to: string, label: string, reverse: string, evidenceId: string, relationId?: string) {
    const a = entities.get(from), b = entities.get(to); if (!a || !b) return;
    adjacency.set(from, [...(adjacency.get(from) ?? []), { entity: b, label, evidenceId, relationId }]);
    adjacency.set(to, [...(adjacency.get(to) ?? []), { entity: a, label: reverse, evidenceId, relationId }]);
  }
  for (const n of catalog.nodes) if (n.type === 'stage' && n.endeavorId) connect(n.endeavorId, n.id, 'Stage', 'Part of', n.id);
  for (const c of catalog.contributions) {
    connect(c.stageId, c.id, 'Activity', 'Stage', c.id);
    connect(c.id, c.roleId, 'Role', 'Activities', c.id);
  }
  for (const r of catalog.relations) {
    const labels = wording[r.type];
    connect(r.fromId, r.toId, labels[0], labels[1], r.id, r.id);
  }
  const evidence = new Map(catalog.sources.map(s => [s.id, s]));
  function getContributions(id: string): Contribution[] {
    return catalog.contributions.filter(c => c.id === id || c.roleId === id || c.stageId === id || c.endeavorId === id);
  }
  const places = new Map(catalog.places.map(place => [place.id, place]));
  const contributionsById = new Map(catalog.contributions.map(contribution => [contribution.id, contribution]));
  return {
    catalog,
    getNode: (id: string) => entities.get(id),
    getStages: (id: string) => catalog.nodes.filter(n => n.type === 'stage' && n.endeavorId === id).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)),
    getContributions,
    getOrganizationExamples(id: string) {
      const entity = entities.get(id);
      if (!entity || !['endeavor', 'stage', 'contribution'].includes(entity.type)) return [];
      const contributionIds = new Set(getContributions(id).map(contribution => contribution.id));
      return (catalog.organizationExamples ?? []).flatMap(example => {
        if (example.editorialStatus !== 'published' || !contributionIds.has(example.contributionId)) return [];
        const contribution = contributionsById.get(example.contributionId);
        const place = places.get(example.placeId);
        return contribution?.editorialStatus === 'published' && place ? [{ ...example, contribution, place }] : [];
      });
    },
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
