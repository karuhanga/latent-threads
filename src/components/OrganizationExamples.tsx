import type { Graph } from '../data/graph.ts';
import { routeToHash } from '../routing.ts';
import { Arrow } from './VisualMarks.tsx';
import { SourceEvidence } from './SourceEvidence.tsx';
import { safeExternalUrl } from './learning.ts';
import './organization-examples.css';

export function OrganizationExamples({ entityId, graph }: { entityId: string; graph: Graph }) {
  const examples = graph.getOrganizationExamples(entityId);
  // A missing example says nothing about an activity's presence in a country.
  if (!examples.length) return null;
  return <section className="organization-examples" aria-labelledby="examples-heading">
    <h3 className="eyebrow" id="examples-heading">IN PRACTICE</h3>
    <ul>{examples.map(example => {
      const url = safeExternalUrl(example.url);
      return <li key={example.id}>
        <article aria-labelledby={`heading-${example.id}`}>
          <p className="example-place">{example.place.label}</p>
          <h4 id={`heading-${example.id}`}>{url ? <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`${example.name} (opens in a new tab)`}>{example.name}<Arrow diagonal /></a> : example.name}</h4>
          <p className="example-summary">{example.summary}</p>
          <p className="example-place-context">{example.placeContext}</p>
          <p className="example-activity">Activity: <a href={routeToHash({ kind: 'explore', entityId: example.contributionId })}>{graph.getNode(example.contributionId)?.label ?? example.contribution.action}</a></p>
          <SourceEvidence subjectId={example.id} graph={graph} title={`Sources for ${example.name}`} />
        </article>
      </li>;
    })}</ul>
  </section>;
}
