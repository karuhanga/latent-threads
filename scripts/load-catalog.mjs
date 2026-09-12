import { lstat, readFile, realpath } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalogVersionErrors } from '../src/data/validate.ts';

const requiredCollections = ['nodes', 'contributions', 'relations', 'sources', 'evidence', 'places', 'presenceAssessments', 'taxonomyMappings'];
const collections = [...requiredCollections, 'organizationExamples'];
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);

function localPath(input) {
  if (input instanceof URL) {
    if (input.protocol !== 'file:') throw new Error('Catalog input must be a local file path or file URL');
    return fileURLToPath(input);
  }
  if (typeof input !== 'string') throw new Error('Catalog input must be a local file path or file URL');
  return input.startsWith('file:') ? localPath(new URL(input)) : resolve(input);
}

async function readJson(file) {
  const stat = await lstat(file);
  if (stat.isSymbolicLink() || !stat.isFile()) throw new Error(`Catalog file must be a regular file: ${file}`);
  try { return JSON.parse(await readFile(file, 'utf8')); }
  catch (error) { throw new Error(`Cannot read catalog JSON ${file}: ${error.message}`); }
}

function rejectDuplicateIds(packs) {
  const ids = new Map();
  for (const { name, catalog } of packs) for (const key of collections) for (const row of catalog[key]) {
    if (!object(row) || typeof row.id !== 'string' || !row.id.trim()) throw new Error(`Invalid record in ${name}/${key}: an object with an ID is required`);
    if (ids.has(row.id)) throw new Error(`Duplicate ID ${row.id} in ${name}/${key}; already defined in ${ids.get(row.id)}`);
    ids.set(row.id, `${name}/${key}`);
  }
}

async function loadPack(directory) {
  const stat = await lstat(directory);
  if (stat.isSymbolicLink() || !stat.isDirectory()) throw new Error(`Pack must be a real directory: ${directory}`);
  const manifest = await readJson(join(directory, 'manifest.json'));
  if (!object(manifest) || !['0.1', '0.2', '0.3'].includes(manifest.schemaVersion)) throw new Error(`Unsupported pack schemaVersion: ${directory}`);
  if (!object(manifest.files)) throw new Error(`Invalid pack files map: ${directory}`);
  const catalog = { schemaVersion: manifest.schemaVersion };
  for (const key of collections) {
    const file = manifest.files[key];
    if (key === 'organizationExamples' && file === undefined) { catalog[key] = []; continue; }
    if (typeof file !== 'string' || !/^[a-zA-Z]+\.json$/.test(file)) throw new Error(`Invalid manifest file: ${key} in ${directory}`);
    catalog[key] = await readJson(join(directory, file));
    if (!Array.isArray(catalog[key])) throw new Error(`Expected array: ${key} in ${directory}`);
  }
  const errors = catalogVersionErrors(catalog);
  if (errors.length) throw new Error(`Invalid pack version in ${directory}: ${errors.join('; ')}`);
  return catalog;
}

/** Merge only explicitly enabled packs. Cross-pack references are validated after merging. */
export async function loadCatalogManifest(input = new URL('../data/catalog.json', import.meta.url)) {
  const file = localPath(input);
  const manifest = await readJson(file);
  if (!object(manifest) || !['0.2', '0.3'].includes(manifest.schemaVersion)) throw new Error('Aggregate catalog requires schemaVersion 0.2 or 0.3');
  if (!Array.isArray(manifest.packs) || !manifest.packs.length || !manifest.packs.every(name => typeof name === 'string' && /^[a-z][a-z0-9-]*$/.test(name))) throw new Error('Catalog packs must be a nonempty list of safe directory names');
  if (new Set(manifest.packs).size !== manifest.packs.length) throw new Error('Duplicate enabled pack');
  const root = await realpath(dirname(file));
  const packs = await Promise.all(manifest.packs.map(async name => {
    const directory = join(root, name);
    const actual = await realpath(directory);
    const location = relative(root, actual);
    if (!location || location === '..' || location.startsWith(`..${sep}`) || isAbsolute(location)) throw new Error(`Pack escapes catalog directory: ${name}`);
    const catalog = await loadPack(directory);
    if (catalog.schemaVersion === '0.3' && manifest.schemaVersion !== '0.3') throw new Error(`Pack ${name} requires aggregate schemaVersion 0.3`);
    return { name, catalog };
  }));
  rejectDuplicateIds(packs);
  return Object.fromEntries([
    ['schemaVersion', manifest.schemaVersion],
    ...collections.map(key => [key, packs.flatMap(pack => pack.catalog[key])]),
  ]);
}

/** An explicit directory keeps the v0.1 single-pack API; omitted input uses enabled packs. */
export async function loadCatalog(directory) {
  if (directory === undefined) return loadCatalogManifest();
  const path = localPath(directory);
  const catalog = await loadPack(path);
  rejectDuplicateIds([{ name: path, catalog }]);
  return catalog;
}
