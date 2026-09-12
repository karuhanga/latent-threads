import type { Graph } from '../data/graph.ts';
import { entityTypeLabel } from '../data/graph.ts';
import type { Entity, Node } from '../data/types.ts';
import { routeToHash } from '../routing.ts';
import { Arrow } from './VisualMarks.tsx';
import { ClaimQualifier, SourceEvidence } from './SourceEvidence.tsx';
import { accessLabels, learningFor, licenseLabels, safeExternalUrl } from './learning.ts';
import { usePreferences } from '../preferences.tsx';
import { OrganizationExamples } from './OrganizationExamples.tsx';
import './learning.css';

const href = (entityId: string) => routeToHash({ kind: 'explore', entityId });

function LearningDetails({ resource }: { resource: Node }) {
  const { showDetails } = usePreferences();
  const url = safeExternalUrl(resource.url);
  const licenseUrl = safeExternalUrl(resource.licenseUrl);
  return <>
    <dl className="learning-metadata">
      <div><dt>Level</dt><dd className="learning-level">{resource.learnerLevel ?? 'Not recorded'}</dd></div>
      {resource.resourceKind && <div><dt>Type</dt><dd>{entityTypeLabel(resource)}</dd></div>}
      {resource.effort && <div><dt>Time</dt><dd>{resource.effort}</dd></div>}
      {resource.credential && <div><dt>Completion</dt><dd>{resource.credential}</dd></div>}
      {resource.format && resource.format.toLocaleLowerCase() !== resource.resourceKind && <div><dt>Format</dt><dd>{resource.format}</dd></div>}
      <div><dt>Access</dt><dd>{accessLabels[resource.access ?? 'unknown']}</dd></div>
      {showDetails && <div><dt>Reuse license</dt><dd>{licenseLabels[resource.licenseStatus ?? 'unknown']}{licenseUrl && <a href={licenseUrl} target="_blank" rel="noopener noreferrer" aria-label="Read reuse license terms (opens in a new tab)">Read license terms ↗</a>}</dd></div>}
    </dl>
    {resource.preparation && <p className="learning-preparation"><strong>Before you start</strong>{resource.preparation}</p>}
    {showDetails && resource.notes && <p className="learning-limits">{resource.notes}</p>}
    {showDetails && <p className="learning-checked">{resource.accessReviewedAt ? <>Access checked <time dateTime={resource.accessReviewedAt}>{resource.accessReviewedAt}</time></> : 'Access check date not recorded.'}</p>}
    {url ? <a className="learning-open" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${resource.label} at ${resource.provider ?? 'the provider'} (opens in a new tab)`}><span>Open resource<span className="learning-new-tab">Opens in a new tab</span></span><Arrow diagonal /></a> : <p className="learning-empty">Resource link unavailable.</p>}
  </>;
}

function LearningSection({ entity, graph }: { entity: Entity; graph: Graph }) {
  const { showDetails } = usePreferences();
  if (entity.type === 'learning_resource') return (
    <section className="learning-section" aria-labelledby="learning-heading">
      <h3 id="learning-heading" className="eyebrow">KEEP LEARNING</h3>
      <p className="learning-provider">{entity.provider ?? 'Provider not recorded'}</p>
      {entity.outcomes?.length ? <div className="learning-outcomes"><h4>What you’ll learn</h4><ul>{entity.outcomes.map(outcome => <li key={outcome}>{outcome}</li>)}</ul></div> : null}
      <LearningDetails resource={entity} />
    </section>
  );
  if (!['knowledge', 'capability', 'tool', 'role'].includes(entity.type)) return null;
  const options = learningFor(graph.catalog, entity.id);
  if (!options.length && !showDetails) return null;
  return (
    <section className="learning-section" aria-labelledby="learning-heading">
      <h3 id="learning-heading" className="eyebrow">KEEP LEARNING</h3>
      {options.length ? <ul className="learning-list">{options.map(({ resource, connections }) => <li key={resource.id}>
        <article className="learning-card" aria-labelledby={`learning-${resource.id}`}>
          <p className="learning-provider">{resource.provider ?? 'Provider not recorded'}</p>
          <h4 id={`learning-${resource.id}`}><a href={href(resource.id)}>{resource.label}</a></h4>
          <ClaimQualifier subjectId={resource.id} graph={graph} />
          <p className="learning-description">{resource.summary}</p>
          <LearningDetails resource={resource} />
          {connections.map(connection => <div key={connection.id}><ClaimQualifier subjectId={connection.id} graph={graph} /><SourceEvidence subjectId={connection.id} graph={graph} title="Why learn this here?" /></div>)}
          <SourceEvidence subjectId={resource.id} graph={graph} title="Resource sources and limits" />
        </article>
      </li>)}</ul> : <p className="learning-empty">No learning resources linked yet.</p>}
    </section>
  );
}

export function DetailPanel({ entity, graph }: { entity: Entity; graph: Graph }) {
  const { showDetails } = usePreferences();
  const contributions = graph.getContributions(entity.id);
  return (
    <aside className="context-panel" aria-labelledby="context-heading">
      <div className="context-top"><h2 className="detail-title" id="context-heading">{entity.details ? 'Explore further' : 'About'}</h2><span className="context-index">{entityTypeLabel(entity)}</span></div>
      {!entity.details && <p className="context-description">{entity.summary}</p>}
      {showDetails && entity.notes && entity.type !== 'learning_resource' && <p className="context-note">{entity.notes}</p>}
      {entity.type === 'contribution' && <div className="context-contribution"><h3 className="eyebrow">ROLE</h3><p><a href={href(entity.roleId)}>{graph.getNode(entity.roleId)?.label}</a></p><p><a href={href(entity.stageId)}>{graph.getNode(entity.stageId)?.label}</a> · <a href={href(entity.endeavorId)}>{graph.getNode(entity.endeavorId)?.label}</a></p></div>}
      {contributions.length > 0 && entity.type !== 'endeavor' && entity.type !== 'contribution' && (
        <div className="context-contribution">
          <h3 className="eyebrow">ACTIVITIES</h3>
          {contributions.map((item) => (
            <div className="panel-contribution" key={item.id}>
              <a href={href(item.id)}>{graph.getNode(item.id)?.label ?? 'Activity'}</a>
              <p><a href={href(item.roleId)}>{graph.getNode(item.roleId)?.label}</a> · <a href={href(item.stageId)}>{graph.getNode(item.stageId)?.label}</a></p>
            </div>
          ))}
        </div>
      )}
      <LearningSection entity={entity} graph={graph} />
      <OrganizationExamples entityId={entity.id} graph={graph} />
      <SourceEvidence key={entity.id} subjectId={entity.id} graph={graph} />
    </aside>
  );
}
