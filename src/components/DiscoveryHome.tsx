import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { entityTypeLabel, type Graph } from '../data/graph.ts';
import { discoveryPool, makeDiscoveryWall, pickDiscovery, runWallTransition, searchDiscovery, type WallPhase } from '../discovery.ts';
import { usePreferences } from '../preferences.tsx';
import { routeToHash } from '../routing.ts';
import { Arrow } from './VisualMarks.tsx';
import './discovery.css';

const entityHref = (entityId: string) => routeToHash({ kind: 'explore', entityId });
const ROTATION_MS = 7_000;

export function DiscoveryHome({ graph, query, onQueryChange, onSurprise }: {
  graph: Graph;
  query: string;
  onQueryChange: (query: string) => void;
  onSurprise: (entityId: string) => void;
}) {
  const { autoShuffle } = usePreferences();
  const [wall, setWall] = useState(() => makeDiscoveryWall(graph));
  const [phase, setPhase] = useState<WallPhase>('idle');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [manualCount, setManualCount] = useState(0);
  const [resultLimit, setResultLimit] = useState(8);
  const previousSurprise = useRef<string | undefined>(undefined);
  const firstResult = useRef<HTMLAnchorElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const wallElement = useRef<HTMLUListElement>(null);
  const cancelTransition = useRef<(() => void) | undefined>(undefined);
  const transitionKind = useRef<'auto' | 'manual'>('auto');
  const interaction = useRef({ hovered: false, focused: false });
  const current = useRef({ autoShuffle, query, reducedMotion });
  current.current = { autoShuffle, query, reducedMotion };
  const results = searchDiscovery(graph, query);
  const hasQuery = query.trim().length > 0;

  function stopTransition() { cancelTransition.current?.(); cancelTransition.current = undefined; }

  function safeToSwap(manual: boolean) {
    if (document.hidden || wallElement.current?.contains(document.activeElement) || wallElement.current?.matches(':hover')) return false;
    if (manual) return true;
    return current.current.autoShuffle && !current.current.reducedMotion && !current.current.query.trim()
      && !interaction.current.hovered && !interaction.current.focused;
  }

  function shuffle(manual = false) {
    stopTransition();
    transitionKind.current = manual ? 'manual' : 'auto';
    cancelTransition.current = runWallTransition({
      isSafe: () => safeToSwap(manual),
      onSwap: () => { setWall((previous) => makeDiscoveryWall(graph, previous)); if (manual) setManualCount((count) => count + 1); },
      onPhase: setPhase,
      instant: current.current.reducedMotion,
    });
  }

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const visibilityChanged = () => { if (document.hidden) stopTransition(); setHidden(document.hidden); };
    const motionChanged = () => { if (media.matches) stopTransition(); setReducedMotion(media.matches); };
    document.addEventListener('visibilitychange', visibilityChanged);
    media.addEventListener('change', motionChanged);
    return () => { document.removeEventListener('visibilitychange', visibilityChanged); media.removeEventListener('change', motionChanged); stopTransition(); };
  }, []);

  useEffect(() => {
    if (!autoShuffle || hovered || focused || hidden || reducedMotion || hasQuery) {
      if (transitionKind.current === 'auto') stopTransition();
      return;
    }
    const timer = window.setInterval(() => shuffle(), ROTATION_MS);
    return () => window.clearInterval(timer);
  }, [autoShuffle, hovered, focused, hidden, reducedMotion, hasQuery]);

  function updateQuery(next: string) { onQueryChange(next); setResultLimit(8); }
  function clearQuery() { updateQuery(''); searchInput.current?.focus(); }
  function surprise() {
    const pick = pickDiscovery(discoveryPool(graph), previousSurprise.current);
    if (pick) { previousSurprise.current = pick.id; onSurprise(pick.id); }
  }

  const rotationLabel = !autoShuffle ? 'Auto shuffle off' : reducedMotion ? 'Reduced motion · auto shuffle paused'
    : hovered || focused || hidden || hasQuery ? 'Auto shuffle paused' : 'Auto shuffle on';

  return (
    <section className="catalog-discovery" aria-labelledby="discovery-heading"
      onPointerEnter={() => { interaction.current.hovered = true; stopTransition(); setHovered(true); }}
      onPointerLeave={() => { interaction.current.hovered = false; setHovered(false); }}
      onPointerDownCapture={stopTransition}
      onFocusCapture={() => { interaction.current.focused = true; stopTransition(); setFocused(true); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { interaction.current.focused = false; setFocused(false); } }}>
      <h1 id="discovery-heading" className="discovery-sr-only">Explore the catalog</h1>
      <div className="catalog-toolbar">
        <form className="catalog-search" role="search" onSubmit={(event) => { event.preventDefault(); firstResult.current?.focus(); }}>
          <label htmlFor="thread-search">Search the catalog</label>
          <div className="search-input-row">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" /><path d="m15 15 6 6" /></svg>
            <input ref={searchInput} id="thread-search" type="search" autoComplete="off" placeholder="What would you like to explore?" value={query} onChange={(event) => updateQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') clearQuery(); }} aria-describedby="search-hint" aria-controls="discovery-results" />
            {query && <button className="search-clear" type="button" onClick={clearQuery}>Clear</button>}
            <button className="search-submit" type="submit" aria-label="Go to catalog search results"><Arrow /></button>
          </div>
          <p id="search-hint" className="search-hint">Endeavors, activities, roles, subjects, skills, tools and courses</p>
        </form>
        <div className="catalog-controls">
          <div className="discovery-actions"><button type="button" className="discovery-action" onClick={() => { updateQuery(''); shuffle(true); }}>Shuffle <span aria-hidden="true">↻</span></button><button type="button" className="discovery-action surprise-action" onClick={surprise}>Surprise me <Arrow diagonal /></button></div>
          <p className="rotation-status"><span className={autoShuffle && !reducedMotion ? 'rotation-dot' : 'rotation-dot rotation-off'} aria-hidden="true" />{rotationLabel}</p>
        </div>
      </div>

      <div id="discovery-results">
        <p className={hasQuery ? 'search-status' : 'discovery-sr-only'} role="status">{hasQuery ? `${results.length} ${results.length === 1 ? 'catalog item' : 'catalog items'} found` : ''}</p>
        {hasQuery && (results.length ? <>
          <ul className="search-results">{results.slice(0, resultLimit).map((entity, index) => <li key={entity.id}>
            <a ref={index === 0 ? firstResult : undefined} href={entityHref(entity.id)}>
              <span className={`result-type result-type-${entity.type}`}>{entityTypeLabel(entity)}</span>
              <div><h2>{entity.label}</h2><p>{entity.summary}</p></div><Arrow diagonal />
            </a>
          </li>)}</ul>
          {results.length > resultLimit && <button type="button" className="discovery-action search-more" onClick={() => setResultLimit((count) => count + 8)}>Show more results <span aria-hidden="true">+</span></button>}
        </> : <div className="search-empty"><h2>No catalog items found for “{query.trim()}”.</h2><p>Try another name, a shorter word, or <button type="button" onClick={clearQuery}>return to the tile wall</button>.</p></div>)}
      </div>

      {!hasQuery && <>
        <p className="discovery-sr-only" role="status">{manualCount ? `Wall shuffled ${manualCount === 1 ? 'once' : `${manualCount} times`}.` : ''}</p>
        {wall.tiles.length ? <ul ref={wallElement} onPointerEnter={stopTransition} className={`catalog-wall wall-layout-${wall.layout} wall-phase-${phase}${wall.tiles.length < 7 ? ' catalog-wall-sparse' : ''}`} aria-label="Explore catalog items">
          {wall.tiles.map((tile, index) => {
            const entity = graph.getNode(tile.entityId);
            if (!entity) return null;
            return <li key={tile.slot} className={`catalog-tile-slot tile-size-${tile.size}`} style={{ gridArea: tile.slot, '--tile-delay': `${index * 30}ms` } as CSSProperties}>
              <a className={`catalog-tile catalog-tile-${entity.type}`} href={entityHref(entity.id)} aria-label={`${entityTypeLabel(entity)}: ${entity.label}`}>
                <div className="catalog-tile-face">
                  <div className="catalog-tile-top"><span>{entityTypeLabel(entity)}</span><Arrow diagonal /></div>
                  <h2>{entity.label}</h2>
                  {tile.size === 'large' && <p>{entity.summary}</p>}
                  <div className="catalog-tile-mark" aria-hidden="true"><i /><i /><i /></div>
                </div>
              </a>
            </li>;
          })}
        </ul> : <p className="search-empty">No published catalog items are available yet.</p>}
      </>}
    </section>
  );
}
