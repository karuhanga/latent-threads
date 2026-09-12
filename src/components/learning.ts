import type { Catalog, Evidence, Node, Relation, Source } from '../data/types.ts';

export interface LearningOption { resource: Node; connections: Relation[] }

/** Only explicit teaching links justify a learning card; graph proximity does not. */
export function learningFor(catalog: Catalog, conceptId: string): LearningOption[] {
  const options = new Map<string, LearningOption>();
  for (const relation of catalog.relations) {
    if (relation.type !== 'teaches' || relation.toId !== conceptId || relation.editorialStatus !== 'published') continue;
    const resource = catalog.nodes.find(node => node.id === relation.fromId && node.type === 'learning_resource' && node.editorialStatus === 'published');
    if (!resource) continue;
    const option = options.get(resource.id) ?? { resource, connections: [] };
    option.connections.push(relation);
    options.set(resource.id, option);
  }
  return [...options.values()].sort((a, b) => Number(b.resource.learnerLevel === 'beginner') - Number(a.resource.learnerLevel === 'beginner') || a.resource.label.localeCompare(b.resource.label));
}

export const accessLabels: Record<NonNullable<Node['access']>, string> = {
  free: 'Free access', audit_free: 'Free auditing', paid: 'Paid access',
  mixed: 'Mixed free and paid access', unknown: 'Access not verified',
};
export const licenseLabels: Record<NonNullable<Node['licenseStatus']>, string> = {
  open: 'Licensed reuse — conditions apply', restricted: 'Restricted reuse',
  unknown: 'Unknown — permission not established',
};

export function safeExternalUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}

export function sourceUrl(source: Source): string | undefined {
  return source.kind === 'external' ? safeExternalUrl(source.locator)
    : `https://github.com/karuhanga/latent-threads/blob/main/${source.locator.split('/').map(encodeURIComponent).join('/')}`;
}

export function evidenceLabels(item: Evidence, source: Source): string[] {
  const labels: string[] = [];
  if (item.reviewStatus === 'contested') labels.push('Contested claim');
  if (item.reviewStatus === 'pending') labels.push('Review pending');
  if (source.kind === 'internal_editorial') labels.push('Editorial framing');
  if (item.support === 'inference') labels.push('Inferred from sources');
  else if (item.support === 'illustrative') labels.push('Illustrative — not verified');
  else if (source.kind === 'external') labels.push('Direct source support');
  return labels;
}
