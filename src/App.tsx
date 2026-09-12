import { useEffect, useState } from 'react';
import { parseHashRoute, routeToHash, type Route } from './routing.ts';

export default function App() {
  const [route, setRoute] = useState<Route>(
    () => parseHashRoute(window.location.hash) ?? { kind: 'home' },
  );

  useEffect(() => {
    function readLocation() {
      const next = parseHashRoute(window.location.hash);
      if (next === null) {
        window.history.replaceState(
          window.history.state,
          '',
          `${window.location.pathname}${window.location.search}#/`,
        );
      }
      setRoute(next ?? { kind: 'home' });
    }

    readLocation();
    window.addEventListener('hashchange', readLocation);
    return () => window.removeEventListener('hashchange', readLocation);
  }, []);

  return (
    <main>
      <p className="eyebrow">Latent Threads · Foundation preview</p>
      <h1>How does it get done?</h1>
      <p>The app foundation is ready. The visual experience and sourced song journey come next.</p>
      {route.kind === 'home' ? (
        <a href={routeToHash({ kind: 'explore', entityId: 'endeavor:song-release' })}>
          Open the exploration route
        </a>
      ) : (
        <section aria-labelledby="route-heading">
          <h2 id="route-heading">Exploration route</h2>
          <p>Selected ID: <code>{route.entityId}</code></p>
          <p>This is a routing preview; no curated content is loaded yet.</p>
          <a href="#/">Back home</a>
        </section>
      )}
    </main>
  );
}
