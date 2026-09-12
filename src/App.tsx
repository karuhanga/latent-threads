import { useEffect, useRef, useState } from 'react';
import { parseHashRoute, routeToHash, type Route } from './routing.ts';
import { Arrow, SoundRings, ThreadMark, Waveform } from './components/VisualMarks.tsx';
import { graph } from './data/index.ts';
import { GraphExplorer } from './components/GraphExplorer.tsx';

const SONG_ID = 'endeavor:song-release';
const ROLE_ID = 'role:mixing-engineer';
const SOUND_ID = 'knowledge:sound-waves';
const TOOL_ID = 'tool:daw';
const PREVIEW_TOOL_ID = 'tool:digital-audio-workstation';

function resolveRoute(hash: string): Route | null {
  const route = parseHashRoute(hash);
  return route?.kind === 'explore' && route.entityId === PREVIEW_TOOL_ID
    ? { kind: 'explore', entityId: TOOL_ID }
    : route;
}

const entityHref = (entityId: string) => routeToHash({ kind: 'explore', entityId });

function SiteHeader({ exploring }: { exploring: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        document.getElementById('main-content')?.focus();
      }}>Skip to content</a>
      <div className="preview-banner"><span className="preview-dot" />Song exploration · Wave 1</div>
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
          <li><a href={entityHref("stage:song-mixing")}>Mix the tracks</a><span aria-hidden="true">→</span></li>
          <li><a href={entityHref("contribution:song-mix")}>Mixing engineer at work <Arrow diagonal /></a></li>
        </ol>
      </section>
    </>
  );
}

function MissingThread() {
  return <section className="missing-thread"><p className="eyebrow">AN UNFINISHED THREAD</p><h1>This thread isn’t in this collection yet.</h1><p>There are a few other places to start.</p><a className="text-link" href={entityHref(SONG_ID)}>Follow the song <Arrow /></a></section>;
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => resolveRoute(window.location.hash) ?? { kind: 'home' });
  const [contextContributionId, setContextContributionId] = useState<string>();
  const mainRef = useRef<HTMLElement>(null);
  const lastRoute = useRef(window.location.hash);
  useEffect(() => {
    function readLocation() {
      const previous = parseHashRoute(window.location.hash);
      const next = resolveRoute(window.location.hash);
      if (previous?.kind === 'explore' && previous.entityId === PREVIEW_TOOL_ID && next) {
        window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}${routeToHash(next)}`);
      }
      if (next === null) window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#/`);
      const entity = next?.kind === 'explore' ? graph.getNode(next.entityId) : undefined;
      setContextContributionId((previous) => {
        if (entity?.type === 'contribution') return entity.id;
        if (entity?.type === 'role') {
          const contributions = graph.getContributions(entity.id);
          return contributions.find((item) => item.id === previous)?.id
            ?? (contributions.length === 1 ? contributions[0]?.id : undefined);
        }
        if (!entity || ['endeavor', 'stage', 'artifact'].includes(entity.type)) return undefined;
        return previous;
      });
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
  const entity = route.kind === 'explore' ? graph.getNode(route.entityId) : undefined;
  return (
    <>
      <SiteHeader exploring={route.kind === 'explore'} />
      <main id="main-content" className="page-width page-content" tabIndex={-1} ref={mainRef}>
        {route.kind === 'home' ? <Home /> : entity ? <GraphExplorer key={entity.id} entity={entity} graph={graph} contextContributionId={contextContributionId} /> : <MissingThread />}
      </main>
      <footer className="site-footer page-width"><a href="#/">latent threads</a><span>Made for the curious.</span><span className="footer-preview">One song. Many ways to explore.</span></footer>
    </>
  );
}
