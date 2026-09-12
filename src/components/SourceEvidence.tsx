import type { Graph } from '../data/graph.ts';

export function SourceEvidence({ subjectId, graph, title = 'Sources and reasoning' }: {
  subjectId: string; graph: Graph; title?: string;
}) {
  const items = graph.getEvidence(subjectId);
  return (
    <details className="source-evidence">
      <summary>{title}</summary>
      {items.length ? <ul>{items.map((item) => (
        <li key={item.id}>
          <p className="evidence-kind">{item.source.kind === 'internal_editorial' ? 'Editorial framing' : item.support === 'inference' ? 'Interpretation from sources' : 'Source-supported claim'}</p>
          <p>{item.claim}</p>
          {item.notes && <p>{item.notes}</p>}
          <a href={item.source.kind === 'external' ? item.source.locator : `https://github.com/karuhanga/latent-threads/blob/main/${item.source.locator}`} target="_blank" rel="noopener noreferrer">{item.source.title} ↗</a>
          {item.source.pinpoint && <p className="source-pinpoint">{item.source.pinpoint}</p>}
          <p className="source-date">Reviewed {item.reviewedAt ?? item.source.retrievedAt}</p>
        </li>
      ))}</ul> : <p>No source detail is available for this item.</p>}
    </details>
  );
}
