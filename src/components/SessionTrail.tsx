import type { Graph } from '../data/graph.ts';
import type { NavigationSnapshot } from '../navigation.ts';
import { routeToHash } from '../routing.ts';
import './discovery.css';

export function SessionTrail({ navigation, graph, onSelect }: { navigation: NavigationSnapshot; graph: Graph; onSelect: (index: number) => void }) {
  return (
    <nav className="session-trail" aria-label="Your exploration trail">
      <p className="eyebrow">YOUR TRAIL</p>
      <ol>{navigation.trail.map((entry, index) => {
        const label = entry.kind === 'home' ? 'Discover' : graph.getNode(entry.entityId)?.label ?? 'Unavailable thread';
        const context = entry.kind === 'explore' && entry.contextContributionId ? graph.getNode(entry.contextContributionId) : undefined;
        const isCurrent = index === navigation.trail.length - 1;
        return <li key={`${routeToHash(entry)}:${index}`}>{isCurrent ? <span aria-current="page">{label}</span> : <a href={routeToHash(entry)} title={context ? `Following ${context.label}` : undefined} onClick={(event) => {
          if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) { event.preventDefault(); onSelect(index); }
        }}>{label}</a>}{!isCurrent && <span className="trail-arrow" aria-hidden="true">→</span>}</li>;
      })}</ol>
    </nav>
  );
}
