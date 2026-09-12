import { createContext, useContext, useState, type ReactNode } from 'react';
import { defaultPreferences, readPreferences, writePreferences, type DisplayPreferences } from './preference-storage.ts';

interface Preferences extends DisplayPreferences {
  setShowDetails: (value: boolean) => void;
  setAutoShuffle: (value: boolean) => void;
}
const PreferencesContext = createContext<Preferences>({ ...defaultPreferences, setShowDetails: () => {}, setAutoShuffle: () => {} });
export const usePreferences = () => useContext(PreferencesContext);
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(() => {
    try { return readPreferences(window.localStorage); } catch { return { ...defaultPreferences }; }
  });
  function update(key: keyof DisplayPreferences, value: boolean) {
    setPreferences(previous => {
      const next = { ...previous, [key]: value };
      try { writePreferences(window.localStorage, next); } catch { /* Browsers may deny access to localStorage itself. */ }
      return next;
    });
  }
  return <PreferencesContext.Provider value={{ ...preferences, setShowDetails: value => update('showDetails', value), setAutoShuffle: value => update('autoShuffle', value) }}>{children}</PreferencesContext.Provider>;
}
