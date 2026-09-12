import type { Catalog } from './types.ts';

type Row = Record<string, unknown>;
const collections = ['nodes', 'contributions', 'relations', 'sources', 'evidence', 'places', 'presenceAssessments', 'taxonomyMappings'] as const;
const nodeTypes = ['endeavor', 'stage', 'artifact', 'service', 'role', 'capability', 'knowledge', 'tool', 'learning_resource'];
const statuses = ['draft', 'illustrative', 'published'];
const pairs: Record<string, string[]> = {
  produces: ['endeavor:artifact', 'endeavor:service', 'contribution:artifact', 'contribution:service'],
  depends_on: ['stage:stage', 'contribution:contribution'], uses: ['contribution:tool'],
  requires_capability: ['contribution:capability'], draws_on: ['contribution:knowledge', 'capability:knowledge'],
  teaches: ['learning_resource:knowledge', 'learning_resource:capability'],
  hands_off_to: ['contribution:contribution'], coordinates_with: ['contribution:contribution'],
  specializes: ['role:role'], part_of: ['knowledge:knowledge'],
};
const obj = (x: unknown): x is Row => !!x && typeof x === 'object' && !Array.isArray(x);
const nonempty = (x: unknown): x is string => typeof x === 'string' && x.trim().length > 0;
function date(x: unknown): boolean {
  if (typeof x !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(x)) return false;
  const parsed = new Date(`${x}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === x;
}
function url(x: unknown, release: boolean): boolean {
  if (typeof x !== 'string') return false;
  try { const u = new URL(x); return ['https:', 'http:'].includes(u.protocol) && (!release || !/(^|\.)(example\.(com|org|net)|localhost)$/.test(u.hostname)); }
  catch { return false; }
}

/** Structural validation and evidence coverage. Source support still needs editorial review. */
export function validateCatalog(input: unknown, options: { release?: boolean; today?: string } = {}): string[] {
  const { release = true, today = new Date().toISOString().slice(0, 10) } = options;
  const errors: string[] = [];
  const fail = (r: Row | string, reason: string) => errors.push(`${typeof r === 'string' ? r : String(r.id ?? '(missing id)')}: ${reason}`);
  if (!obj(input)) return ['catalog: expected an object'];
  if (input.schemaVersion !== '0.1') fail('catalog', 'unsupported schemaVersion');
  const rows = {} as Record<(typeof collections)[number], Row[]>;
  for (const key of collections) {
    const value = input[key];
    if (!Array.isArray(value)) { fail(key, 'expected array'); rows[key] = []; continue; }
    rows[key] = value.filter(obj);
    if (rows[key].length !== value.length) fail(key, 'records must be objects');
  }
  const all = new Map<string, Row>(); const category = new Map<string, string>();
  for (const key of collections) for (const row of rows[key]) {
    if (!nonempty(row.id) || !/^[a-z_]+:[a-z0-9][a-z0-9-]*$/.test(row.id)) { fail(row, 'invalid namespaced ID'); continue; }
    if (all.has(row.id)) fail(row, 'duplicate ID');
    all.set(row.id, row); category.set(row.id, key === 'nodes' ? String(row.type) : key === 'contributions' ? 'contribution' : key);
  }
  function required(r: Row, fields: string[]) { for (const field of fields) if (!nonempty(r[field])) fail(r, `${field} must be nonempty text`); }
  function oneOf(r: Row, key: string, values: string[]) { if (typeof r[key] !== 'string' || !values.includes(r[key])) fail(r, `invalid ${key}`); }
  function reference(r: Row, key: string, allowed?: string[]) {
    const id = r[key];
    if (typeof id !== 'string' || !all.has(id)) fail(r, `${key} is a dangling reference`);
    else if (allowed && !allowed.includes(category.get(id)!)) fail(r, `${key} has wrong endpoint type`);
  }
  function timestamp(r: Row, key: string, optional = false) { if ((!optional || r[key] !== undefined) && !date(r[key])) fail(r, `invalid ${key} date`); }
  function temporal(r: Row) {
    if (r.validTime === undefined) return;
    if (!obj(r.validTime)) { fail(r, 'invalid validTime'); return; }
    const endpoints: Record<string, string> = {};
    for (const side of ['start', 'end']) {
      const b = r.validTime[side]; if (b === undefined || b === null) continue;
      if (!obj(b)) { fail(r, `invalid ${side} time bound`); continue; }
      const value = String(b.value); const precision = String(b.precision);
      const valid = precision === 'year' ? /^\d{4}$/.test(value) : precision === 'month' ? /^\d{4}-(0[1-9]|1[0-2])$/.test(value) : precision === 'day' && date(value);
      if (!valid || !['exact', 'approximate'].includes(String(b.qualifier))) fail(r, `invalid ${side} time precision/value`);
      if (valid) {
        const year = Number(value.slice(0, 4));
        const month = precision === 'year' ? (side === 'start' ? 1 : 12) : Number(value.slice(5, 7));
        const day = precision === 'day' ? Number(value.slice(8, 10)) : side === 'start' ? 1 : new Date(Date.UTC(year, month, 0)).getUTCDate();
        endpoints[side] = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      }
    }
    if (endpoints.start && endpoints.end && endpoints.start > endpoints.end) fail(r, 'time bounds are reversed');
  }
  for (const r of [...rows.nodes, ...rows.contributions, ...rows.relations]) {
    oneOf(r, 'editorialStatus', statuses); temporal(r);
    for (const key of ['notes', 'summary', 'learnerLevel']) if (r[key] !== undefined && !nonempty(r[key])) fail(r, `invalid ${key} text`);
    if (release && r.editorialStatus !== 'published') fail(r, 'release contains unpublished record');
  }
  for (const n of rows.nodes) {
    required(n, ['label', 'summary']); oneOf(n, 'type', nodeTypes);
    if (n.aliases !== undefined && (!Array.isArray(n.aliases) || !n.aliases.every(nonempty))) fail(n, 'aliases must be nonempty strings');
    if (n.kind !== undefined) {
      if (n.type === 'capability') oneOf(n, 'kind', ['capability', 'skill']);
      else if (n.type === 'knowledge') oneOf(n, 'kind', ['field', 'subject', 'topic', 'concept']);
      else fail(n, 'kind is only supported on knowledge/capability');
    }
    if (n.type === 'stage') {
      reference(n, 'endeavorId', ['endeavor']);
      if (typeof n.displayOrder !== 'number' || !Number.isInteger(n.displayOrder) || n.displayOrder < 0) fail(n, 'invalid displayOrder');
      if (n.editorialStatus === 'published' && !rows.contributions.some(c => c.stageId === n.id && c.editorialStatus === 'published')) fail(n, 'published stage needs a contribution');
    }
    if (n.type === 'endeavor' && n.editorialStatus === 'published' && !rows.nodes.some(s => s.type === 'stage' && s.endeavorId === n.id && s.editorialStatus === 'published')) fail(n, 'published endeavor needs a stage');
    if (n.type === 'learning_resource') {
      required(n, ['provider', 'format']); if (!url(n.url, release)) fail(n, 'invalid or placeholder resource URL');
      oneOf(n, 'access', ['free', 'audit_free', 'paid', 'mixed', 'unknown']);
      oneOf(n, 'licenseStatus', ['open', 'restricted', 'unknown']);
      timestamp(n, 'accessReviewedAt', !release);
      if (n.licenseStatus === 'open' && !url(n.licenseUrl, release)) fail(n, 'open license needs a license URL');
      if (n.licenseUrl !== undefined && !url(n.licenseUrl, release)) fail(n, 'invalid license URL');
    }
  }
  for (const c of rows.contributions) {
    required(c, ['action']); reference(c, 'endeavorId', ['endeavor']); reference(c, 'stageId', ['stage']); reference(c, 'roleId', ['role']);
    if (all.get(String(c.stageId))?.endeavorId !== c.endeavorId) fail(c, 'stage/endeavor context mismatch');
  }
  const assertions = new Set<string>();
  for (const r of rows.relations) {
    oneOf(r, 'type', Object.keys(pairs));
    reference(r, 'fromId'); reference(r, 'toId');
    const from = String(r.fromId), to = String(r.toId), type = String(r.type);
    if (!pairs[type]?.includes(`${category.get(from)}:${category.get(to)}`)) fail(r, 'invalid relation endpoint pair');
    if (from === to) fail(r, 'self relation');
    const signature = `${type}/${from}/${to}`;
    if (assertions.has(signature)) fail(r, 'duplicate relation'); assertions.add(signature);
    if (type === 'coordinates_with' && from >= to) fail(r, 'symmetric relation must use canonical ID order');
    if (['coordinates_with', 'hands_off_to', 'depends_on'].includes(type) && all.get(from)?.endeavorId !== all.get(to)?.endeavorId) fail(r, 'relation crosses endeavor context');
  }
  function checkCycles(edges: Array<[string, string]>, label: string) {
    const adj = new Map<string, string[]>();
    for (const [a, b] of edges) adj.set(a, [...(adj.get(a) ?? []), b]);
    const active = new Set<string>(), done = new Set<string>();
    function visit(id: string): void {
      if (active.has(id)) { fail(id, `${label} cycle`); return; }
      if (done.has(id)) return;
      active.add(id); for (const n of adj.get(id) ?? []) visit(n); active.delete(id); done.add(id);
    }
    for (const id of adj.keys()) visit(id);
  }
  for (const type of ['specializes', 'part_of', 'depends_on']) checkCycles(rows.relations.filter(r => r.type === type).map(r => [String(r.fromId), String(r.toId)]), type);
  for (const p of rows.places) {
    required(p, ['label']); oneOf(p, 'kind', ['world', 'continent', 'country', 'region', 'city']);
    if (!Array.isArray(p.parentIds) || !p.parentIds.every(nonempty)) { fail(p, 'invalid place parents'); continue; }
    for (const parent of p.parentIds) if (category.get(parent) !== 'places') fail(p, 'dangling place parent');
    if (p.kind === 'world' && p.parentIds.length !== 0) fail(p, 'World cannot have a parent');
    const expected = p.id === 'place:africa' ? 'place:world' : ['place:uganda', 'place:kenya'].includes(String(p.id)) ? 'place:africa' : null;
    if (expected && (p.parentIds.length !== 1 || p.parentIds[0] !== expected)) fail(p, 'initial geography must preserve sibling country scopes');
    const kind = p.id === 'place:world' ? 'world' : p.id === 'place:africa' ? 'continent' : ['place:uganda', 'place:kenya'].includes(String(p.id)) ? 'country' : null;
    if (kind && p.kind !== kind) fail(p, 'initial geography has wrong place kind');
  }
  checkCycles(rows.places.flatMap(p => Array.isArray(p.parentIds) ? p.parentIds.map(parent => [String(p.id), String(parent)] as [string, string]) : []), 'geography');
  for (const s of rows.sources) {
    required(s, ['title', 'locator']); oneOf(s, 'kind', ['external', 'internal_editorial']);
    oneOf(s, 'reuseStatus', ['link_only', 'licensed', 'public_domain', 'unreviewed']); timestamp(s, 'retrievedAt');
    if (s.kind === 'external' && !url(s.locator, release)) fail(s, 'invalid or placeholder source URL');
  }
  for (const e of rows.evidence) {
    reference(e, 'subjectId', [...nodeTypes, 'contribution', 'relations', 'presenceAssessments', 'taxonomyMappings']); reference(e, 'sourceId', ['sources']);
    required(e, ['claim']); oneOf(e, 'support', ['direct', 'inference', 'illustrative']); oneOf(e, 'reviewStatus', ['pending', 'reviewed', 'contested']);
    if (e.reviewStatus === 'reviewed') { required(e, ['reviewer']); timestamp(e, 'reviewedAt'); }
    if (e.support === 'inference' || e.reviewStatus === 'contested') required(e, ['notes']);
    timestamp(e, 'reviewAfter', true);
    if (release && e.support === 'illustrative') fail(e, 'illustrative evidence in release');
  }
  function covered(r: Row, external = false) {
    const valid = rows.evidence.filter(e => e.subjectId === r.id && e.reviewStatus === 'reviewed' && e.support !== 'illustrative' && (!external || all.get(String(e.sourceId))?.kind === 'external'));
    if (!valid.length) fail(r, 'missing reviewed evidence coverage');
    if (valid.some(e => nonempty(e.reviewAfter) && e.reviewAfter < today)) fail(r, 'evidence review has expired');
  }
  if (release) for (const r of [...rows.nodes, ...rows.contributions, ...rows.relations]) {
    // Editorial process framing may use an internal rationale; external claims cannot.
    const structuralEditorial = ['stage', 'endeavor'].includes(String(r.type)) || (r.type === 'produces' && category.get(String(r.fromId)) === 'endeavor');
    covered(r, !structuralEditorial);
  }
  const assessments = new Set<string>();
  for (const p of rows.presenceAssessments) {
    reference(p, 'subjectId', [...nodeTypes, 'relations']); reference(p, 'placeId', ['places']);
    oneOf(p, 'state', ['established', 'limited', 'unknown', 'conflicting']); required(p, ['scopeNote']); timestamp(p, 'reviewedAt'); temporal(p);
    const signature = `${p.subjectId}/${p.placeId}`; if (assessments.has(signature)) fail(p, 'duplicate current assessment'); assessments.add(signature);
    if (release && ['established', 'limited'].includes(String(p.state))) covered(p, true);
  }
  for (const m of rows.taxonomyMappings) {
    reference(m, 'roleId', ['role']); reference(m, 'sourceId', ['sources']); required(m, ['scheme', 'code', 'sourceVersion']);
    oneOf(m, 'mappingRelation', ['exact', 'close', 'broader', 'narrower']); if (release) covered(m, true);
  }
  return errors;
}

export function assertCatalog(input: unknown, options?: { release?: boolean; today?: string }): asserts input is Catalog {
  const errors = validateCatalog(input, options);
  if (errors.length) throw new Error(`Catalog validation failed:\n${errors.join('\n')}`);
}
