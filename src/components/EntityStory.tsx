import type { Entity } from '../data/types.ts';
import './story.css';

/** Everyday explanation stays visible independently of provenance preferences. */
export function EntityStory({ entity }: { entity: Entity }) {
  const details = entity.details;
  if (!details) return null;
  return <section className="entity-story" aria-label={`About ${entity.label}`}>
    <div className="story-explanation">
      <p className="story-summary">{entity.summary}</p>
      {details.explanation.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      {(details.inputs || details.outputs) && <dl className="story-work">
        {details.inputs && <div><dt>Starts with</dt><dd>{details.inputs}</dd></div>}
        {details.outputs && <div><dt>Produces</dt><dd>{details.outputs}</dd></div>}
      </dl>}
      {details.decision && <div className="story-decision"><h2>A decision to make</h2><p>{details.decision}</p></div>}
    </div>
    <div className="story-aside">
      <article className="story-example">
        <p className="eyebrow">EXAMPLE</p>
        <h2>{details.example.title}</h2>
        <p>{details.example.body}</p>
      </article>
      {details.practice && <div className="story-practice"><h2>Try it</h2><p>{details.practice}</p></div>}
    </div>
  </section>;
}
