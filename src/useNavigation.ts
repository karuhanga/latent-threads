import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { Graph } from './data/graph.ts';
import { parseHashRoute, routeToHash, type Route } from './routing.ts';
import { followNavigation, restoreNavigation, revisitTrail, withNavigationState, type NavigationSnapshot } from './navigation.ts';

export function useNavigation(graph: Graph) {
  const [navigation, setNavigation] = useState(() => restoreNavigation(window.location.hash, window.history.state, graph));
  const current = useRef(navigation);

  useEffect(() => {
    function restore() {
      const next = restoreNavigation(window.location.hash, window.history.state, graph);
      current.current = next;
      window.history.replaceState(withNavigationState(window.history.state, next), '', `${window.location.pathname}${window.location.search}${routeToHash(next.route)}`);
      setNavigation(next);
    }
    restore();
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    return () => {
      window.removeEventListener('popstate', restore);
      window.removeEventListener('hashchange', restore);
    };
  }, [graph]);

  function commit(next: NavigationSnapshot) {
    if (next === current.current) return;
    window.history.pushState(withNavigationState(window.history.state, next), '', `${window.location.pathname}${window.location.search}${routeToHash(next.route)}`);
    current.current = next;
    setNavigation(next);
  }

  function follow(route: Route) { commit(followNavigation(current.current, route, graph)); }
  function followTrail(index: number) { commit(revisitTrail(current.current, index, graph)); }

  function onInternalLink(event: MouseEvent<HTMLElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest('a');
    if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
    const hash = anchor.getAttribute('href');
    if (!hash?.startsWith('#/')) return;
    const route = parseHashRoute(hash);
    if (!route) return;
    event.preventDefault();
    follow(route);
  }

  return { navigation, follow, followTrail, onInternalLink };
}
