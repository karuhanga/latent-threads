import { useEffect, useRef, useState } from 'react';
import { parseHashRoute, routeToHash, type Route } from './routing.ts';
import { Arrow, SoundRings, ThreadMark, Waveform } from './components/VisualMarks.tsx';
import { getPreviewEntity, MIX_ID, ROLE_ID, SONG_ID, SOUND_ID, TOOL_ID, type PreviewEntity } from './fixtures/designPreview.ts';

const entityHref = (entityId: string) => routeToHash({ kind: 'explore', entityId });

function SiteHeader({ exploring }: { exploring: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        document.getElementById('main-content')?.focus();
      }}>Skip to content</a>
      <div className="preview-banner"><span className="preview-dot" />Design preview · illustrative content</div>
      <header className="site-header page-width">
        <a className="wordmark" href="#/" aria-label="Latent Threads home"><ThreadMark /><span>latent<br />threads</span></a>
        <p className="header-description">See how the world<br />comes together.</p>
        <nav aria-label="Main navigation">
          <a className={exploring ? '' : 'nav-active'} href="#/" aria-current={exploring ? undefined : 'page'}>Discover</a>
          <a className={exploring ? 'nav-active' : ''} href={entityHref(SONG_ID)} aria-current={exploring ? 'page' : undefined}>Follow a song <Arrow diagonal /></a>
        </nav>
      </header>
    </>
  );
}

function Home() {
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
      <section className="curiosity-section" aria-labelledby="curiosity-heading">
        <div className="section-heading"><h2 id="curiosity-heading">Follow your curiosity</h2><p>Different ways into the same story <span aria-hidden="true">↙</span></p></div>
        <div className="curiosity-grid">
          <a className="curiosity-tile tile-featured" href={entityHref(SONG_ID)}>
            <div className="tile-top"><span className="eyebrow">ENDEAVOR</span><Arrow diagonal /></div>
            <h3>A song.<br />From an idea<br />to your headphones.</h3>
            <Waveform />
            <div className="tile-bottom"><span>Follow the process</span><span aria-hidden="true">01</span></div>
          </a>
          <a className="curiosity-tile tile-role" href={entityHref(ROLE_ID)}>
            <div className="tile-top"><span className="eyebrow">ROLE</span><Arrow diagonal /></div>
            <div className="mixing-mark" aria-hidden="true"><i /><i /><i /></div>
            <h3>Mixing<br />engineer</h3><p>Who brings the parts together?</p>
          </a>
          <a className="curiosity-tile tile-knowledge" href={entityHref(SOUND_ID)}>
            <div className="tile-top"><span className="eyebrow">KNOWLEDGE</span><Arrow diagonal /></div>
            <SoundRings /><h3>Sound<br />waves</h3><p>What’s behind what we hear?</p>
          </a>
          <a className="curiosity-tile tile-tool" href={entityHref(TOOL_ID)}>
            <div className="tile-top"><span className="eyebrow">TOOL</span><Arrow diagonal /></div>
            <h3>A studio.<br />Inside a computer.</h3>
            <div className="tile-bottom"><span>Digital audio workstation</span><div className="track-mark" aria-hidden="true"><i /><i /><i /></div></div>
          </a>
        </div>
      </section>
      <section className="thread-invitation" aria-labelledby="thread-heading">
        <div><span className="eyebrow">ONE CONNECTION CAN CHANGE YOUR DIRECTION</span><h2 id="thread-heading">There’s always another thread.</h2></div>
        <ol className="sample-trail" aria-label="An example exploration">
          <li><a href={entityHref(SONG_ID)}>A song</a><span aria-hidden="true">→</span></li>
          <li><a href={entityHref(ROLE_ID)}>Mixing engineer</a><span aria-hidden="true">→</span></li>
          <li><a href={entityHref(SOUND_ID)}>Sound waves <Arrow diagonal /></a></li>
        </ol>
      </section>
    </>
  );
}

function ProcessOverview() {
  return (
    <div className="process-overview">
      <p className="eyebrow">ONE POSSIBLE PROCESS <span>· ILLUSTRATIVE</span></p>
      <ol>
        <li><span className="stage-number">01</span><span>Shape an idea</span></li>
        <li><span className="stage-number">02</span><span>Record</span></li>
        <li><a href={entityHref(MIX_ID)}><span className="stage-number">03</span><span>Mix</span><Arrow diagonal /></a></li>
        <li><span className="stage-number">04</span><span>Share</span></li>
      </ol>
    </div>
  );
}

function Explorer({ entity }: { entity: PreviewEntity }) {
  const isSong = entity.id === SONG_ID;
  return (
    <>
      <nav className="breadcrumb" aria-label="You are here">
        <a href="#/">Discover</a><span aria-hidden="true">/</span>
        {isSong ? <span aria-current="page">A song</span> : <><a href={entityHref(SONG_ID)}>A song</a><span aria-hidden="true">/</span><span aria-current="page">{entity.shortTitle}</span></>}
      </nav>
      <section className="explorer-heading" aria-labelledby="explorer-title">
        <div><p className="eyebrow blue-text">{entity.type.toUpperCase()} / FOLLOW THE THREAD</p><h1 id="explorer-title">{isSong ? <>A song,<br />piece by piece.</> : entity.title}</h1></div>
        <p>{isSong ? 'Zoom in on the work. Meet the people. Discover something you never knew you wanted to know.' : entity.description}</p>
      </section>
      <div className="explorer-layout">
        <section className="exploration-canvas" aria-labelledby="canvas-heading">
          <div className="canvas-toolbar"><h2 id="canvas-heading">The connections</h2><a href={entityHref(SONG_ID)}>Back to the song <Arrow /></a></div>
          <ProcessOverview />
          <div className="focus-landscape">
            <p className="landscape-caption">A CLOSER LOOK AT THE MIX</p>
            <article className="focus-node">
              <div className="tile-top"><span className="eyebrow">{entity.type.toUpperCase()}</span><span className="focus-indicator">IN FOCUS</span></div>
              <h3>{entity.title}</h3><Waveform />
            </article>
            <div className="branch-lines" aria-hidden="true"><i /><i /><i /></div>
            <ul className="neighbor-grid" aria-label={`Connections from ${entity.title}`}>
              {entity.related.map((connection) => {
                const neighbor = getPreviewEntity(connection.id);
                if (!neighbor) return null;
                return <li key={neighbor.id}><p className="connection-label">{connection.label}</p><a className={`neighbor-card neighbor-${neighbor.type.toLowerCase()}`} href={entityHref(neighbor.id)}><div className="tile-top"><span className="eyebrow">{neighbor.type.toUpperCase()}</span><Arrow diagonal /></div><h4>{neighbor.shortTitle}</h4></a></li>;
              })}
            </ul>
            <p className="canvas-hint"><span aria-hidden="true">↗</span> Follow any connection to make it your starting point.</p>
          </div>
        </section>
        <aside className="context-panel" aria-labelledby="context-heading">
          <div className="context-top"><span className="eyebrow">IN CONTEXT</span><span className="context-index">01—05</span></div>
          <h2 id="context-heading">{entity.title}</h2><p className="context-description">{entity.description}</p>
          <div className="context-contribution"><span className="eyebrow">{entity.type === 'Role' ? 'THE CONTRIBUTION' : 'HOW IT CONNECTS'}</span><p>{entity.contribution}</p></div>
          <div className="context-next"><span className="eyebrow">TAKE ANOTHER TURN</span><a href={entityHref(entity.id === SOUND_ID ? TOOL_ID : SOUND_ID)}>{entity.id === SOUND_ID ? 'Step inside an audio workstation' : 'What is a sound wave?'}<Arrow diagonal /></a></div>
          <p className="evidence-notice">Illustrative explanation.<br />Content and sources are still being reviewed.</p>
        </aside>
      </div>
    </>
  );
}

function MissingThread() {
  return <section className="missing-thread"><p className="eyebrow">AN UNFINISHED THREAD</p><h1>This thread isn’t in the preview yet.</h1><p>There are a few other places to start.</p><a className="text-link" href={entityHref(SONG_ID)}>Follow the song <Arrow /></a></section>;
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseHashRoute(window.location.hash) ?? { kind: 'home' });
  const mainRef = useRef<HTMLElement>(null);
  const lastRoute = useRef(window.location.hash);
  useEffect(() => {
    function readLocation() {
      const next = parseHashRoute(window.location.hash);
      if (next === null) window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#/`);
      setRoute(next ?? { kind: 'home' });
    }
    readLocation();
    window.addEventListener('hashchange', readLocation);
    return () => window.removeEventListener('hashchange', readLocation);
  }, []);
  useEffect(() => {
    if (lastRoute.current !== window.location.hash) {
      lastRoute.current = window.location.hash;
      mainRef.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [route]);
  const entity = route.kind === 'explore' ? getPreviewEntity(route.entityId) : undefined;
  return (
    <>
      <SiteHeader exploring={route.kind === 'explore'} />
      <main id="main-content" className="page-width page-content" tabIndex={-1} ref={mainRef}>
        {route.kind === 'home' ? <Home /> : entity ? <Explorer entity={entity} /> : <MissingThread />}
      </main>
      <footer className="site-footer page-width"><a href="#/">latent threads</a><span>Made for the curious.</span><span className="footer-preview">A design preview, one thread at a time.</span></footer>
    </>
  );
}
