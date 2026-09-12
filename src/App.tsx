import { useEffect, useRef, useState } from 'react';
import { routeToHash } from './routing.ts';
import { ThreadMark } from './components/VisualMarks.tsx';
import { graph } from './data/index.ts';
import { GraphExplorer } from './components/GraphExplorer.tsx';
import { DiscoveryHome } from './components/DiscoveryHome.tsx';
import { DisplaySettings } from './components/DisplaySettings.tsx';
import { PreferencesProvider } from './preferences.tsx';
import { useNavigation } from './useNavigation.ts';

function SiteHeader({ exploring }: { exploring: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        document.getElementById('main-content')?.focus();
      }}>Skip to content</a>

      <header className="site-header app-header page-width">
        <a className="wordmark" href="#/" aria-label="Latent Threads home"><ThreadMark /><span>latent<br />threads</span></a>

        <nav aria-label="Main navigation">
          {exploring && <button className="app-back" type="button" onClick={() => window.history.back()}>← Back</button>}
          <a href="#/" aria-current={exploring ? undefined : 'page'}>Explore</a>
          <DisplaySettings />
        </nav>
      </header>
    </>
  );
}

function MissingThread() {
  return <section className="missing-thread"><h1>Item not found.</h1><p>This item is not in the catalog.</p><a className="text-link" href="#/">Explore the catalog</a></section>;
}

function Application() {
  const { navigation, follow, onInternalLink } = useNavigation(graph);
  const route = navigation.route;
  const [searchQuery, setSearchQuery] = useState('');
  const mainRef = useRef<HTMLElement>(null);
  const lastNavigation = useRef(navigation);
  useEffect(() => {
    // Restoring a navigation entry also restores keyboard focus to the page.
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
          {entity ? <GraphExplorer key={routeToHash(route)} entity={entity} graph={graph} contextContributionId={route.contextContributionId} /> : <MissingThread />}
        </>}
      </main>

    </div>
  );
}

export default function App() { return <PreferencesProvider><Application /></PreferencesProvider>; }
