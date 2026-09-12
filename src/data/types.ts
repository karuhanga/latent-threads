export type NodeType = 'endeavor' | 'stage' | 'artifact' | 'service' | 'role' | 'capability' | 'knowledge' | 'tool' | 'learning_resource';
export type EditorialStatus = 'draft' | 'illustrative' | 'published';
export type TimeBound = { value: string; precision: 'year' | 'month' | 'day'; qualifier: 'exact' | 'approximate' };
export type ValidTime = { start?: TimeBound | null; end?: TimeBound | null };
export interface Node {
  id: string; type: NodeType; label: string; summary: string; editorialStatus: EditorialStatus;
  aliases?: string[]; kind?: string; notes?: string; validTime?: ValidTime;
  endeavorId?: string; displayOrder?: number;
  url?: string; provider?: string; format?: string; learnerLevel?: string;
  access?: 'free' | 'audit_free' | 'paid' | 'mixed' | 'unknown';
  licenseStatus?: 'open' | 'restricted' | 'unknown'; licenseUrl?: string; accessReviewedAt?: string;
}
export interface Contribution {
  id: string; endeavorId: string; stageId: string; roleId: string; action: string; label?: string;
  editorialStatus: EditorialStatus; notes?: string; validTime?: ValidTime;
}
export type RelationType = 'produces' | 'depends_on' | 'uses' | 'requires_capability' | 'draws_on' | 'teaches' | 'hands_off_to' | 'coordinates_with' | 'specializes' | 'part_of';
export interface Relation {
  id: string; type: RelationType; fromId: string; toId: string; editorialStatus: EditorialStatus;
  summary?: string; validTime?: ValidTime;
}
export interface Source {
  id: string; title: string; kind: 'external' | 'internal_editorial'; locator: string;
  retrievedAt: string; reuseStatus: 'link_only' | 'licensed' | 'public_domain' | 'unreviewed';
  publisher?: string; pinpoint?: string; notes?: string;
}
export interface Evidence {
  id: string; subjectId: string; sourceId: string; claim: string;
  support: 'direct' | 'inference' | 'illustrative'; reviewStatus: 'pending' | 'reviewed' | 'contested';
  reviewedAt?: string; reviewer?: string; notes?: string; reviewAfter?: string;
}
export interface Place { id: string; label: string; kind: string; parentIds: string[] }
export interface PresenceAssessment {
  id: string; subjectId: string; placeId: string; state: 'established' | 'limited' | 'unknown' | 'conflicting';
  reviewedAt: string; scopeNote: string; validTime?: ValidTime;
}
export interface TaxonomyMapping {
  id: string; roleId: string; scheme: string; code: string; sourceId: string; sourceVersion: string;
  mappingRelation: 'exact' | 'close' | 'broader' | 'narrower';
}
export interface Catalog {
  schemaVersion: '0.1'; nodes: Node[]; contributions: Contribution[]; relations: Relation[];
  sources: Source[]; evidence: Evidence[]; places: Place[];
  presenceAssessments: PresenceAssessment[]; taxonomyMappings: TaxonomyMapping[];
}
export type Entity = Node | (Contribution & { type: 'contribution'; label: string; summary: string });
