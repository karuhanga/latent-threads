import { useState } from 'react';
import { typeLabels, type Graph, type Connection } from '../data/graph.ts';
import type { Entity, Contribution } from '../data/types.ts';
import { routeToHash } from '../routing.ts';
import { Arrow } from './VisualMarks.tsx';
import { DetailPanel } from './DetailPanel.tsx';
import { ClaimQualifier, SourceEvidence } from './SourceEvidence.tsx';
import './explorer.css';

const href = (entityId: string) => routeToHash({ kind: 'explore', entityId });

function ProcessOverview({ graph, endeavorId, activeStageId }: { graph: Graph; endeavorId: string; activeStageId?: string }) {
  const stages = graph.getStages(endeavorId);
  if (!stages.length) return null;
  return (
    <div className="process-overview live-process">
      <p className="eyebrow">PROCESS</p>
      <ol>{stages.map((stage, index) => <li key={stage.id} className={stage.id === activeStageId ? 'stage-active' : ''}><a href={href(stage.id)} aria-current={stage.id === activeStageId ? 'step' : undefined}><span className="stage-number">{String(index + 1).padStart(2, '0')}</span><span>{stage.label}</span></a></li>)}</ol>
      <p className="process-caveat">One possible sequence. Stages can overlap.</p>
    </div>
  );
}

function ContributionContext({ contribution, graph }: { contribution: Contribution; graph: Graph }) {
  return <p className="contribution-context"><a href={href(contribution.roleId)}>{graph.getNode(contribution.roleId)?.label}</a><span> · </span><a href={href(contribution.stageId)}>{graph.getNode(contribution.stageId)?.label}</a></p>;
}

function ConnectionCard({ connection, graph }: { connection: Connection; graph: Graph }) {
  const { entity, label } = connection;
  return (
    <li>
      <p className="connection-label">{label}<ClaimQualifier subjectId={connection.evidenceId} graph={graph} /></p>
      <a className={`neighbor-card neighbor-${entity.type}`} href={href(entity.id)}>
        <div className="tile-top"><span className="eyebrow">{typeLabels[entity.type].toUpperCase()}</span><Arrow diagonal /></div>
        <h4>{entity.label}</h4>
        {entity.type === 'contribution' && <p className="neighbor-action">{entity.action}</p>}
      </a>
      {entity.type === 'contribution' && <ContributionContext contribution={entity} graph={graph} />}
      <SourceEvidence subjectId={connection.evidenceId} graph={graph} title="Why this connection?" />
    </li>
  );
}

function ActivityCard({ contribution, graph }: { contribution: Contribution; graph: Graph }) {
  return (
    <li>
      <a className="team-card" href={href(contribution.id)}>
        <div className="tile-top"><span className="eyebrow">{typeLabels.contribution.toUpperCase()}</span><Arrow diagonal /></div>
        <h3>{graph.getNode(contribution.id)?.label ?? 'Activity'}</h3>
        <p>{contribution.action}</p>
        <span className="team-stage">{graph.getNode(contribution.roleId)?.label} · {graph.getNode(contribution.stageId)?.label}</span>
      </a>
      <ClaimQualifier subjectId={contribution.id} graph={graph} />
      <SourceEvidence subjectId={contribution.id} graph={graph} title="Source for this activity" />
    </li>
  );
}

export function GraphExplorer({ entity, graph }: { entity: Entity; graph: Graph; contextContributionId?: string }) {
  const [selectedView, setView] = useState<'connections' | 'activities'>('connections');
  const activities = entity.type === 'endeavor' || entity.type === 'stage' ? graph.getContributions(entity.id) : [];
  const view = activities.length ? selectedView : 'connections';
  const [pagination, setPagination] = useState({ entityId: entity.id, view, offset: 0 });
  const offset = pagination.entityId === entity.id && pagination.view === view ? pagination.offset : 0;
  // Standalone entities never inherit a process hierarchy from a previous visit.
  const endeavorId = entity.type === 'endeavor' ? entity.id : entity.type === 'stage' || entity.type === 'contribution' ? entity.endeavorId : undefined;
  const endeavor = endeavorId ? graph.getNode(endeavorId) : undefined;
  const activeStageId = entity.type === 'stage' ? entity.id : entity.type === 'contribution' ? entity.stageId : undefined;
  const neighborhood = graph.getNeighborhood(entity.id, { limit: 3, offset });
  const pageSize = view === 'connections' ? 3 : 4;
  const total = view === 'connections' ? neighborhood.total : activities.length;

  return (
    <>
      <section className="explorer-heading catalog-explorer-heading" aria-labelledby="explorer-title">
        <div>
          <p className="eyebrow blue-text">{typeLabels[entity.type].toUpperCase()}</p>
          {endeavor?.type === 'endeavor' && endeavor.id !== entity.id && <a className="process-parent" href={href(endeavor.id)}>{endeavor.label}</a>}
          <h1 id="explorer-title">{entity.label}</h1>
          <ClaimQualifier subjectId={entity.id} graph={graph} />
        </div>
      </section>
      <div className="explorer-layout">
        <section className="exploration-canvas" aria-labelledby="canvas-heading">
          <div className="canvas-toolbar"><h2 id="canvas-heading">Connections</h2></div>
          {endeavor?.type === 'endeavor' && <ProcessOverview graph={graph} endeavorId={endeavor.id} activeStageId={activeStageId} />}
          {activities.length > 0 && <div className="view-controls" role="group" aria-label="Explore connections or activities">
            <button type="button" aria-pressed={view === 'connections'} onClick={() => setView('connections')}>Connections</button>
            <button type="button" aria-pressed={view === 'activities'} onClick={() => setView('activities')}>Activities</button>
          </div>}
          <div className="focus-landscape">
            {view === 'connections' ? (
              <>
                <article className="focus-node">
                  <div className="tile-top"><span className="eyebrow">{typeLabels[entity.type].toUpperCase()}</span></div>
                  <h3>{entity.label}</h3>
                </article>
                {neighborhood.items.length > 0 ? <><div className={`branch-lines branches-${neighborhood.items.length}`} aria-hidden="true"><i /><i /><i /></div><ul className={`neighbor-grid live-neighbors neighbor-count-${neighborhood.items.length}`} aria-label={`Connections from ${entity.label}`}>{neighborhood.items.map((connection, index) => <ConnectionCard key={`${entity.id}:${connection.entity.id}:${index}`} connection={connection} graph={graph} />)}</ul></> : <p className="empty-connections">No connections have been added yet. <a href="#/">Explore the catalog.</a></p>}
              </>
            ) : (
              <section className="team-section" aria-labelledby="team-heading">
                <h3 id="team-heading">Activities</h3>
                <ul className="team-grid">{activities.slice(offset, offset + pageSize).map((contribution) => <ActivityCard key={contribution.id} contribution={contribution} graph={graph} />)}</ul>
              </section>
            )}
            {total > pageSize && <nav className="connection-pagination" aria-label={view === 'connections' ? 'Connection pages' : 'Activity pages'}><button type="button" disabled={offset === 0} onClick={() => setPagination({ entityId: entity.id, view, offset: Math.max(0, offset - pageSize) })}>Previous</button><span aria-live="polite">{offset + 1}–{Math.min(total, offset + pageSize)} of {total}</span><button type="button" disabled={offset + pageSize >= total} onClick={() => setPagination({ entityId: entity.id, view, offset: offset + pageSize })}>Next {view === 'connections' ? 'connections' : 'activities'}</button></nav>}
          </div>
        </section>
        <DetailPanel entity={entity} graph={graph} />
      </div>
    </>
  );
}
