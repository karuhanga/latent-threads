import { useState } from 'react';
import { typeLabels, type Graph, type Connection } from '../data/graph.ts';
import type { Entity, Contribution } from '../data/types.ts';
import { routeToHash } from '../routing.ts';
import { Arrow, Waveform } from './VisualMarks.tsx';
import { DetailPanel } from './DetailPanel.tsx';
import { SourceEvidence } from './SourceEvidence.tsx';

const SONG_ID = 'endeavor:song-release';
const href = (entityId: string) => routeToHash({ kind: 'explore', entityId });

function ProcessOverview({ graph, activeStageId }: { graph: Graph; activeStageId?: string }) {
  return (
    <div className="process-overview live-process">
      <p className="eyebrow">ONE WAY TO FOLLOW THE PROCESS</p>
      <ol>{graph.getStages(SONG_ID).map((stage, index) => <li key={stage.id} className={stage.id === activeStageId ? 'stage-active' : ''}><a href={href(stage.id)} aria-current={stage.id === activeStageId ? 'step' : undefined}><span className="stage-number">{String(index + 1).padStart(2, '0')}</span><span>{stage.label}</span></a></li>)}</ol>
      <p className="process-caveat">Stages can overlap or be revisited. One person can play several roles.</p>
    </div>
  );
}

function ContributionContext({ contribution, graph }: { contribution: Contribution; graph: Graph }) {
  return <p className="contribution-context"><a href={href(contribution.roleId)}>{graph.getNode(contribution.roleId)?.label}</a><span> during </span><a href={href(contribution.stageId)}>{graph.getNode(contribution.stageId)?.label}</a><span> · </span><a href={href(contribution.endeavorId)}>the song journey</a></p>;
}

function ConnectionCard({ connection, graph }: { connection: Connection; graph: Graph }) {
  const { entity, label } = connection;
  return (
    <li>
      <p className="connection-label">{label}</p>
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

function TeamCard({ contribution, graph }: { contribution: Contribution; graph: Graph }) {
  return (
    <li>
      <a className="team-card" href={href(contribution.id)}>
        <div className="tile-top"><span className="eyebrow">CONTRIBUTION</span><Arrow diagonal /></div>
        <h3>{graph.getNode(contribution.roleId)?.label}</h3>
        <p>{contribution.action}</p>
        <span className="team-stage">{graph.getNode(contribution.stageId)?.label}</span>
      </a>
      <SourceEvidence subjectId={contribution.id} graph={graph} title="Source for this contribution" />
    </li>
  );
}

export function GraphExplorer({ entity, graph, contextContributionId }: { entity: Entity; graph: Graph; contextContributionId?: string }) {
  const [view, setView] = useState<'system' | 'team'>('system');
  const [pagination, setPagination] = useState({ entityId: entity.id, view, offset: 0 });
  const offset = pagination.entityId === entity.id && pagination.view === view ? pagination.offset : 0;
  const contextEntity = contextContributionId ? graph.getNode(contextContributionId) : undefined;
  const context = entity.type === 'contribution' ? entity : contextEntity?.type === 'contribution' ? contextEntity : undefined;
  const directContributions = graph.getContributions(entity.id);
  const activeStageId = entity.type === 'stage' ? entity.id : context?.stageId ?? (entity.type === 'role' && directContributions.length === 1 ? directContributions[0]?.stageId : undefined);
  const teamScope = directContributions.length ? entity.id : activeStageId ?? SONG_ID;
  const team = graph.getContributions(teamScope);
  const neighborhood = graph.getNeighborhood(entity.id, { limit: 3, offset });
  const pageSize = view === 'system' ? 3 : 4;
  const total = view === 'system' ? neighborhood.total : team.length;
  const isSong = entity.id === SONG_ID;
  const backId = context && entity.id !== context.id ? context.id : entity.type === 'contribution' ? entity.stageId : SONG_ID;
  const backLabel = backId === SONG_ID ? 'Back to song' : graph.getNode(backId)?.label ?? 'Back';

  return (
    <>
      <nav className="breadcrumb" aria-label="You are here">
        <a href="#/">Discover</a><span aria-hidden="true">/</span>
        {isSong ? <span aria-current="page">A song</span> : <><a href={href(SONG_ID)}>A song</a><span aria-hidden="true">/</span><span aria-current="page">{entity.label}</span></>}
      </nav>
      <section className="explorer-heading" aria-labelledby="explorer-title">
        <div><p className="eyebrow blue-text">{typeLabels[entity.type].toUpperCase()} / FOLLOW THE THREAD</p><h1 id="explorer-title">{isSong ? <>A song,<br />piece by piece.</> : entity.label}</h1></div>
        <p>{entity.summary}</p>
      </section>
      <div className="explorer-layout">
        <section className="exploration-canvas" aria-labelledby="canvas-heading">
          <div className="canvas-toolbar"><h2 id="canvas-heading">The connections</h2><div className="canvas-navigation">{!isSong && <a href={href(backId)}>{backLabel}</a>}<a href={isSong ? '#/' : href(SONG_ID)}>{isSong ? 'Home' : 'Reset to song'}<Arrow /></a></div></div>
          <ProcessOverview graph={graph} activeStageId={activeStageId} />
          <div className="view-controls" role="group" aria-label="Explore by process or people">
            <button type="button" aria-pressed={view === 'system'} onClick={() => setView('system')}>System <span>the process</span></button>
            <button type="button" aria-pressed={view === 'team'} onClick={() => setView('team')}>Team <span>the contributions</span></button>
          </div>
          {context && <div className="thread-context"><span className="eyebrow">IN THIS THREAD</span><ContributionContext contribution={context} graph={graph} /></div>}
          <div className="focus-landscape">
            {view === 'system' ? (
              <>
                <p className="landscape-caption">YOUR CURRENT STARTING POINT</p>
                <article className="focus-node">
                  <div className="tile-top"><span className="eyebrow">{typeLabels[entity.type].toUpperCase()}</span><span className="focus-indicator">IN FOCUS</span></div>
                  <h3>{entity.label}</h3>
                  {entity.type === 'contribution' ? <p className="focus-action">{entity.action}</p> : <Waveform />}
                </article>
                {neighborhood.items.length > 0 ? <><div className={`branch-lines branches-${neighborhood.items.length}`} aria-hidden="true"><i /><i /><i /></div><ul className={`neighbor-grid live-neighbors neighbor-count-${neighborhood.items.length}`} aria-label={`Connections from ${entity.label}`}>{neighborhood.items.map((connection, index) => <ConnectionCard key={`${entity.id}:${connection.entity.id}:${index}`} connection={connection} graph={graph} />)}</ul></> : <p className="empty-connections">No further connections are included here yet. Choose another stage above or return to the song.</p>}
              </>
            ) : (
              <section className="team-section" aria-labelledby="team-heading">
                <p className="eyebrow">WORK IN CONTEXT</p>
                <h3 id="team-heading">{teamScope === SONG_ID ? 'The contributions behind a song' : `Contributions: ${graph.getNode(teamScope)?.label ?? 'this part of the song'}`}</h3>
                <p className="team-caveat">These are parts people can play, not a fixed or mandatory team.</p>
                <ul className="team-grid">{team.slice(offset, offset + pageSize).map((contribution) => <TeamCard key={contribution.id} contribution={contribution} graph={graph} />)}</ul>
              </section>
            )}
            {total > pageSize && <nav className="connection-pagination" aria-label={view === 'system' ? 'Connection pages' : 'Contribution pages'}><button type="button" disabled={offset === 0} onClick={() => setPagination({ entityId: entity.id, view, offset: Math.max(0, offset - pageSize) })}>Previous</button><span aria-live="polite">{offset + 1}–{Math.min(total, offset + pageSize)} of {total}</span><button type="button" disabled={offset + pageSize >= total} onClick={() => setPagination({ entityId: entity.id, view, offset: offset + pageSize })}>Next {view === 'system' ? 'connections' : 'contributions'}</button></nav>}
            <p className="canvas-hint"><span aria-hidden="true">↗</span> Follow any connection to make it your starting point.</p>
          </div>
        </section>
        <DetailPanel entity={entity} graph={graph} />
      </div>
    </>
  );
}
