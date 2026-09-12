import type { Graph } from '../data/graph.ts';
import { typeLabels } from '../data/graph.ts';
import type { Entity } from '../data/types.ts';
import { routeToHash } from '../routing.ts';
import { Arrow } from './VisualMarks.tsx';
import { SourceEvidence } from './SourceEvidence.tsx';

const href = (entityId: string) => routeToHash({ kind: 'explore', entityId });

export function DetailPanel({ entity, graph }: { entity: Entity; graph: Graph }) {
  const contributions = graph.getContributions(entity.id);
  return (
    <aside className="context-panel" aria-labelledby="context-heading">
      <div className="context-top"><span className="eyebrow">IN CONTEXT</span><span className="context-index">{typeLabels[entity.type]}</span></div>
      <h2 id="context-heading">{entity.label}</h2>
      <p className="context-description">{entity.summary}</p>
      {entity.notes && <p className="context-note">{entity.notes}</p>}
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
      {entity.type === 'learning_resource' && entity.url && (
        <div className="context-next"><span className="eyebrow">KEEP LEARNING</span><a href={entity.url} target="_blank" rel="noopener noreferrer">Open at {entity.provider ?? 'the provider'}<Arrow diagonal /></a></div>
      )}
      <SourceEvidence key={entity.id} subjectId={entity.id} graph={graph} />
    </aside>
  );
}
