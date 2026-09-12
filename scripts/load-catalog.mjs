import { readFile } from 'node:fs/promises';

export async function loadCatalog(directory = new URL('../data/song/', import.meta.url)) {
  const manifest = JSON.parse(await readFile(new URL('manifest.json', directory), 'utf8'));
  const catalog = { schemaVersion: manifest.schemaVersion };
  for (const key of ['nodes', 'contributions', 'relations', 'sources', 'evidence', 'places', 'presenceAssessments', 'taxonomyMappings']) {
    const file = manifest.files?.[key];
    if (typeof file !== 'string' || !/^[a-zA-Z]+\.json$/.test(file)) throw new Error(`Invalid manifest file: ${key}`);
    catalog[key] = JSON.parse(await readFile(new URL(file, directory), 'utf8'));
  }
  return catalog;
}
