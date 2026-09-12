import { useRef, useState } from 'react';
import { typeLabels, type Graph } from '../data/graph.ts';
import { discoveryPool, pickDiscovery, shuffleDiscovery } from '../discovery.ts';
import { routeToHash } from '../routing.ts';
import { Arrow, SoundRings, Waveform } from './VisualMarks.tsx';
import './discovery.css';

const SONG_ID = 'endeavor:song-release';
const entityHref = (entityId: string) => routeToHash({ kind: 'explore', entityId });

export function DiscoveryHome({ graph, query, onQueryChange, onSurprise }: {
  graph: Graph;
  query: string;
  onQueryChange: (query: string) => void;
  onSurprise: (entityId: string) => void;
}) {
  const [wallIds, setWallIds] = useState(['role:mixing-engineer', 'knowledge:sound-waves', 'tool:daw']);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [resultLimit, setResultLimit] = useState(8);
  const previousSurprise = useRef<string | undefined>(undefined);
  const firstResult = useRef<HTMLAnchorElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const [role, knowledge, tool] = wallIds.map((id) => graph.getNode(id));
  const results = graph.searchNodes(query, { limit: 50 });
  const hasQuery = query.trim().length > 0;

  function updateQuery(next: string) { onQueryChange(next); setResultLimit(8); }
  function clearQuery() { updateQuery(''); searchInput.current?.focus(); }
  function surprise() {
    const pick = pickDiscovery(discoveryPool(graph), previousSurprise.current);
    if (pick) { previousSurprise.current = pick.id; onSurprise(pick.id); }
  }

  return (
    <>
      <section className="home-hero" aria-labelledby="home-heading">
        <div>
          <p className="eyebrow blue-text">A LITTLE CURIOSITY OPENS A LOT</p>
          <h1 id="home-heading">How does a <span>song</span><br />get made?</h1>
        </div>
        <div className="hero-aside">
          <span className="index-label">001 / START ANYWHERE</span>
          <p>Behind the things we love are people, ideas and tools.</p>
          <p className="secondary-copy">Pick a thread. See where it takes you.</p>
          <a className="text-link" href={entityHref(SONG_ID)}>Let’s find out <Arrow /></a>
        </div>
      </section>

      <section className="discovery-search" aria-labelledby="search-heading">
        <div className="discovery-search-heading"><h2 id="search-heading">What caught your ear?</h2><p>Search this song’s people, ideas and tools.</p></div>
        <form role="search" onSubmit={(event) => { event.preventDefault(); firstResult.current?.focus(); }}>
          <label className="discovery-sr-only" htmlFor="thread-search">Search people, ideas and tools</label>
          <div className="search-input-row">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" /><path d="m15 15 6 6" /></svg>
            <input ref={searchInput} id="thread-search" type="search" autoComplete="off" placeholder="Try sound, songwriter or DAW" value={query} onChange={(event) => updateQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') clearQuery(); }} aria-describedby="search-hint" aria-controls="discovery-results" />
            {query && <button className="search-clear" type="button" onClick={clearQuery}>Clear</button>}
            <button className="search-submit" type="submit" aria-label="Go to search results"><Arrow /></button>
          </div>
          <p id="search-hint" className="search-hint">One song. Many connections. Search a name or part of a name.</p>
        </form>
        <div id="discovery-results">
          <p className={hasQuery ? 'search-status' : 'discovery-sr-only'} role="status">{hasQuery ? `${results.length} ${results.length === 1 ? 'thread' : 'threads'} found` : ''}</p>
          {hasQuery && (results.length ? <>
            <ul className="search-results">{results.slice(0, resultLimit).map((entity, index) => <li key={entity.id}>
              <a ref={index === 0 ? firstResult : undefined} href={entityHref(entity.id)}>
                <span className={`result-type result-type-${entity.type}`}>{typeLabels[entity.type]}</span>
                <div><h3>{entity.label}</h3><p>{entity.summary}</p></div><Arrow diagonal />
              </a>
            </li>)}</ul>
            {results.length > resultLimit && <button type="button" className="discovery-action search-more" onClick={() => setResultLimit((count) => count + 8)}>Show more threads <span aria-hidden="true">+</span></button>}
          </> : <div className="search-empty"><h3>No thread found for “{query.trim()}”.</h3><p>This collection starts with making a song. Try <button type="button" onClick={() => updateQuery('sound')}>sound</button>, <button type="button" onClick={() => updateQuery('engineer')}>engineer</button> or <button type="button" onClick={clearQuery}>browse the wall below</button>.</p></div>)}
        </div>
      </section>

      <section className="curiosity-section" aria-labelledby="curiosity-heading">
        <div className="section-heading discovery-wall-heading">
          <div><h2 id="curiosity-heading">Follow your curiosity</h2><p>Different ways into the same story</p></div>
          <div className="discovery-actions"><button type="button" className="discovery-action" onClick={() => { setWallIds((ids) => shuffleDiscovery(graph, ids)); setShuffleCount((count) => count + 1); }}>Shuffle the wall <span aria-hidden="true">↻</span></button><button type="button" className="discovery-action surprise-action" onClick={surprise}>Surprise me <Arrow diagonal /></button></div>
        </div>
        <p className="discovery-sr-only" role="status">{shuffleCount > 0 ? `Wall shuffled. Now showing ${role?.label}, ${knowledge?.label} and ${tool?.label}.` : ''}</p>
        <div className="curiosity-grid">
          <a className="curiosity-tile tile-featured" href={entityHref(SONG_ID)}>
            <div className="tile-top"><span className="eyebrow">ENDEAVOR</span><Arrow diagonal /></div>
            <h3>A song.<br />From an idea<br />to your headphones.</h3>
            <Waveform />
            <div className="tile-bottom"><span>Follow the process</span><span aria-hidden="true">01</span></div>
          </a>
          {role && <a className="curiosity-tile tile-role" href={entityHref(role.id)}>
            <div className="tile-top"><span className="eyebrow">ROLE</span><Arrow diagonal /></div>
            <div className="mixing-mark" aria-hidden="true"><i /><i /><i /></div>
            <h3 className="discovery-entity-title">{role.label}</h3><p>Meet a person behind the process.</p>
          </a>}
          {knowledge && <a className="curiosity-tile tile-knowledge" href={entityHref(knowledge.id)}>
            <div className="tile-top"><span className="eyebrow">KNOWLEDGE</span><Arrow diagonal /></div>
            <SoundRings /><h3 className="discovery-entity-title">{knowledge.label}</h3><p>Find an idea behind the music.</p>
          </a>}
          {tool && <a className="curiosity-tile tile-tool" href={entityHref(tool.id)}>
            <div className="tile-top"><span className="eyebrow">TOOL</span><Arrow diagonal /></div>
            <h3>{tool.id === 'tool:daw' ? <>A studio.<br />Inside a computer.</> : tool.label}</h3>
            <div className="tile-bottom"><span>{tool.id === 'tool:daw' ? tool.label : 'Meet a tool in the process'}</span><div className="track-mark" aria-hidden="true"><i /><i /><i /></div></div>
          </a>}
        </div>
      </section>
      <section className="thread-invitation" aria-labelledby="thread-heading">
        <div><span className="eyebrow">ONE CONNECTION CAN CHANGE YOUR DIRECTION</span><h2 id="thread-heading">There’s always another thread.</h2></div>
        <ol className="sample-trail" aria-label="An example exploration">
          <li><a href={entityHref(SONG_ID)}>A song</a><span aria-hidden="true">→</span></li>
          <li><a href={entityHref('stage:song-mixing')}>Mix the tracks</a><span aria-hidden="true">→</span></li>
          <li><a href={entityHref('contribution:song-mix')}>Mixing engineer at work <Arrow diagonal /></a></li>
        </ol>
      </section>
    </>
  );
}
