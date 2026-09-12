import { useEffect, useRef, useState } from 'react';
import { routeToHash } from './routing.ts';
import { Arrow, ThreadMark } from './components/VisualMarks.tsx';
import { graph } from './data/index.ts';
import { GraphExplorer } from './components/GraphExplorer.tsx';
import { DiscoveryHome } from './components/DiscoveryHome.tsx';
import { SessionTrail } from './components/SessionTrail.tsx';
import { useNavigation } from './useNavigation.ts';

const SONG_ID = 'endeavor:song-release';

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

function MissingThread() {
  return <section className="missing-thread"><p className="eyebrow">AN UNFINISHED THREAD</p><h1>This thread isn’t in this collection yet.</h1><p>There are a few other places to start.</p><a className="text-link" href={entityHref(SONG_ID)}>Follow the song <Arrow /></a></section>;
}

export default function App() {
  const { navigation, follow, followTrail, onInternalLink } = useNavigation(graph);
  const route = navigation.route;
  const [searchQuery, setSearchQuery] = useState('');
  const mainRef = useRef<HTMLElement>(null);
  const lastNavigation = useRef(navigation);
  useEffect(() => {
    // A trail can shorten while keeping the same focal URL. Its activated link
    // then disappears, so focus must follow the navigation snapshot as well.
    if (lastNavigation.current !== navigation) {
      lastNavigation.current = navigation;
      mainRef.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [navigation]);
  const entity = route.kind === 'explore' ? graph.getNode(route.entityId) : undefined;
  return (
    <div onClick={onInternalLink}>
      <SiteHeader exploring={route.kind === 'explore'} />
      <main id="main-content" className="page-width page-content" tabIndex={-1} ref={mainRef}>
        {route.kind === 'home' ? <DiscoveryHome graph={graph} query={searchQuery} onQueryChange={setSearchQuery} onSurprise={(entityId) => follow({ kind: 'explore', entityId })} /> : <>
          <SessionTrail navigation={navigation} graph={graph} onSelect={followTrail} />
          {entity ? <GraphExplorer key={routeToHash(route)} entity={entity} graph={graph} contextContributionId={route.contextContributionId} /> : <MissingThread />}
        </>}
      </main>
      <footer className="site-footer page-width"><a href="#/">latent threads</a><span>Made for the curious.</span><span className="footer-preview">One song. Many ways to explore.</span></footer>
    </div>
  );
}
