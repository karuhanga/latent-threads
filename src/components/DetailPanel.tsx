import type { Graph } from '../data/graph.ts';
import { typeLabels } from '../data/graph.ts';
import type { Entity, Node } from '../data/types.ts';
import { routeToHash } from '../routing.ts';
import { Arrow } from './VisualMarks.tsx';
import { SourceEvidence } from './SourceEvidence.tsx';
import { accessLabels, learningFor, licenseLabels, safeExternalUrl } from './learning.ts';
import './learning.css';

const href = (entityId: string) => routeToHash({ kind: 'explore', entityId });

function LearningDetails({ resource }: { resource: Node }) {
  const url = safeExternalUrl(resource.url);
  const licenseUrl = safeExternalUrl(resource.licenseUrl);
  return <>
    <dl className="learning-metadata">
      <div><dt>Level</dt><dd className="learning-level">{resource.learnerLevel ?? 'Not recorded'}</dd></div>
      {resource.format && <div><dt>Format</dt><dd>{resource.format}</dd></div>}
      <div><dt>Access</dt><dd>{accessLabels[resource.access ?? 'unknown']}</dd></div>
      <div><dt>Reuse license</dt><dd>{licenseLabels[resource.licenseStatus ?? 'unknown']}{licenseUrl && <a href={licenseUrl} target="_blank" rel="noopener noreferrer" aria-label="Read reuse license terms (opens in a new tab)">Read license terms ↗</a>}</dd></div>
    </dl>
    {resource.notes && <p className="learning-limits">{resource.notes}</p>}
    <p className="learning-checked">{resource.accessReviewedAt ? <>Access checked <time dateTime={resource.accessReviewedAt}>{resource.accessReviewedAt}</time></> : 'Access check date not recorded.'}</p>
    {url ? <a className="learning-open" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${resource.label} at ${resource.provider ?? 'the provider'} (opens in a new tab)`}><span>Open resource<span className="learning-new-tab">Opens in a new tab</span></span><Arrow diagonal /></a> : <p className="learning-empty">A checked resource link is not available.</p>}
  </>;
}

function LearningSection({ entity, graph }: { entity: Entity; graph: Graph }) {
  if (entity.type === 'learning_resource') return (
    <section className="learning-section" aria-labelledby="learning-heading">
      <h3 id="learning-heading" className="eyebrow">KEEP LEARNING</h3>
      <p className="learning-provider">{entity.provider ?? 'Provider not recorded'}</p>
      <LearningDetails resource={entity} />
    </section>
  );
  if (!['knowledge', 'capability', 'tool', 'role'].includes(entity.type)) return null;
  const options = learningFor(graph.catalog, entity.id);
  return (
    <section className="learning-section" aria-labelledby="learning-heading">
      <h3 id="learning-heading" className="eyebrow">KEEP LEARNING</h3>
      {options.length ? <ul className="learning-list">{options.map(({ resource, connections }) => <li key={resource.id}>
        <article className="learning-card" aria-labelledby={`learning-${resource.id}`}>
          <p className="learning-provider">{resource.provider ?? 'Provider not recorded'}</p>
          <h4 id={`learning-${resource.id}`}>{resource.label}</h4>
          <p className="learning-description">{resource.summary}</p>
          <LearningDetails resource={resource} />
          {connections.map(connection => <SourceEvidence key={connection.id} subjectId={connection.id} graph={graph} title="Why learn this here?" />)}
          <SourceEvidence subjectId={resource.id} graph={graph} title="Resource sources and limits" />
        </article>
      </li>)}</ul> : <p className="learning-empty">No checked learning resource is linked to this {entity.type === 'capability' ? 'skill' : entity.type === 'knowledge' ? 'concept' : typeLabels[entity.type].toLowerCase()} yet.{['role', 'tool'].includes(entity.type) && ' Follow a skill or knowledge connection to keep exploring.'}</p>}
    </section>
  );
}

export function DetailPanel({ entity, graph }: { entity: Entity; graph: Graph }) {
  const contributions = graph.getContributions(entity.id);
  return (
    <aside className="context-panel" aria-labelledby="context-heading">
      <div className="context-top"><span className="eyebrow">IN CONTEXT</span><span className="context-index">{typeLabels[entity.type]}</span></div>
      <h2 id="context-heading">{entity.label}</h2>
      <p className="context-description">{entity.summary}</p>
      {entity.notes && entity.type !== 'learning_resource' && <p className="context-note">{entity.notes}</p>}
      {contributions.length > 0 && entity.type !== 'endeavor' && (
        <div className="context-contribution">
          <h3 className="eyebrow">WORK IN THIS CONTEXT</h3>
          {contributions.map((item) => (
            <div className="panel-contribution" key={item.id}>
              <a href={href(item.id)}>{item.action}</a>
              <p><a href={href(item.roleId)}>{graph.getNode(item.roleId)?.label}</a> · <a href={href(item.stageId)}>{graph.getNode(item.stageId)?.label}</a></p>
            </div>
          ))}
        </div>
      )}
      <LearningSection entity={entity} graph={graph} />
      <SourceEvidence key={entity.id} subjectId={entity.id} graph={graph} />
    </aside>
  );
}
