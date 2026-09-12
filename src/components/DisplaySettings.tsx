import { useEffect, useRef, useState } from 'react';
import { usePreferences } from '../preferences.tsx';
import './settings.css';

export function DisplaySettings() {
  const { showDetails, autoShuffle, setShowDetails, setAutoShuffle } = usePreferences();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open]);
  return <div className="display-settings" ref={root} onKeyDown={event => {
    if (event.key === 'Escape' && open) { event.stopPropagation(); setOpen(false); trigger.current?.focus(); }
  }}>
    <button ref={trigger} className="settings-trigger" type="button" aria-label="Settings" title="Settings" aria-expanded={open} aria-controls="display-settings-panel" onClick={() => setOpen(value => !value)}>
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m9.5 3-.6 2.1-2 .9-2-.6L2.5 9l1.6 1.5v3L2.5 15l2.4 3.6 2-.6 2 .9.6 2.1h5l.6-2.1 2-.9 2 .6 2.4-3.6-1.6-1.5v-3L21.5 9l-2.4-3.6-2 .6-2-.9-.6-2.1z"/><circle cx="12" cy="12" r="3"/></svg>
    </button>
    {open && <section className="settings-panel" id="display-settings-panel" aria-label="Display settings">
      <h2>Display</h2>
      <label><input type="checkbox" checked={autoShuffle} onChange={event => setAutoShuffle(event.target.checked)} /><span>Automatic shuffle</span></label>
      <label><input type="checkbox" checked={showDetails} onChange={event => setShowDetails(event.target.checked)} /><span>Sources and detailed information</span></label>
    </section>}
  </div>;
}
