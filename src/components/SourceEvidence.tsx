import type { Graph } from '../data/graph.ts';
import { evidenceLabels, sourceUrl } from './learning.ts';
import { usePreferences } from '../preferences.tsx';
import './learning.css';

/** Detailed attribution includes how a claim is supported. */
export function ClaimQualifier({ subjectId, graph }: { subjectId: string; graph: Graph }) {
  const { showDetails } = usePreferences();
  if (!showDetails) return null;
  const evidence = graph.getEvidence(subjectId);
  const label = evidence.some(item => item.reviewStatus === 'contested') ? 'Contested'
    : evidence.some(item => item.support === 'inference') ? 'Includes interpretation' : undefined;
  return label ? <span className="claim-qualifier">{label}</span> : null;
}

export function SourceEvidence({ subjectId, graph, title = 'Sources and reasoning' }: {
  subjectId: string; graph: Graph; title?: string;
}) {
  const { showDetails } = usePreferences();
  if (!showDetails) return null;
  const items = graph.getEvidence(subjectId);
  return (
    <details className="source-evidence" key={subjectId}>
      <summary>{title}</summary>
      {items.length ? <ul>{items.map((item) => {
        const url = sourceUrl(item.source);
        return (
        <li key={item.id}>
          <p className={`evidence-kind${item.reviewStatus === 'contested' ? ' evidence-contested' : ''}`}>{evidenceLabels(item, item.source).join(' · ')}</p>
          <p>{item.claim}</p>
          {item.notes && <p className="evidence-limit">{item.notes}</p>}
          {url ? <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${item.source.title} (opens in a new tab)`}>{item.source.title} ↗</a> : <p>Source link not available.</p>}
          {item.source.publisher && <p className="source-publisher">{item.source.publisher}</p>}
          {item.source.pinpoint && <p className="source-pinpoint">{item.source.pinpoint}</p>}
          {item.source.notes && <p className="evidence-limit">Source note: {item.source.notes}</p>}
          <p className="source-date">Source checked <time dateTime={item.source.retrievedAt}>{item.source.retrievedAt}</time>{item.reviewedAt && <><br />Claim reviewed <time dateTime={item.reviewedAt}>{item.reviewedAt}</time></>}</p>
        </li>
      );})}</ul> : <p>No source evidence is recorded for this item yet.</p>}
    </details>
  );
}
