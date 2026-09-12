export interface DisplayPreferences { showDetails: boolean; autoShuffle: boolean }
export const preferenceKey = 'latent-threads:display:v1';
export const defaultPreferences: DisplayPreferences = { showDetails: false, autoShuffle: true };
export function readPreferences(storage: Pick<Storage, 'getItem'>): DisplayPreferences {
  try {
    const value: unknown = JSON.parse(storage.getItem(preferenceKey) ?? 'null');
    if (!value || typeof value !== 'object') return { ...defaultPreferences };
    const data = value as Record<string, unknown>;
    return {
      showDetails: typeof data.showDetails === 'boolean' ? data.showDetails : false,
      autoShuffle: typeof data.autoShuffle === 'boolean' ? data.autoShuffle : true,
    };
  } catch { return { ...defaultPreferences }; }
}
export function writePreferences(storage: Pick<Storage, 'setItem'>, preferences: DisplayPreferences): void {
  try { storage.setItem(preferenceKey, JSON.stringify(preferences)); } catch { /* Settings still work for this visit when storage is unavailable. */ }
}
