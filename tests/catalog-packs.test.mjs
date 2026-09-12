import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';
import { loadCatalog, loadCatalogManifest } from '../scripts/load-catalog.mjs';
import { validateCatalog } from '../src/data/validate.ts';

const keys = ['nodes', 'contributions', 'relations', 'sources', 'evidence', 'places', 'presenceAssessments', 'taxonomyMappings'];
const song = await loadCatalog(new URL('../data/song/', import.meta.url));
const empty = (schemaVersion = '0.2') => ({ schemaVersion, ...Object.fromEntries(keys.map(key => [key, []])) });
async function temporary(t) {
  const root = await mkdtemp(join(tmpdir(), 'latent-threads-packs-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}
async function pack(root, name, catalog) {
  const directory = join(root, name);
  await mkdir(directory, { recursive: true });
  const files = Object.fromEntries([...keys, ...('organizationExamples' in catalog ? ['organizationExamples'] : [])].map(key => [key, `${key}.json`]));
  await writeFile(join(directory, 'manifest.json'), JSON.stringify({ schemaVersion: catalog.schemaVersion, files }));
  for (const [key, file] of Object.entries(files)) await writeFile(join(directory, file), JSON.stringify(catalog[key]));
  return directory;
}
async function manifest(root, packs, schemaVersion = '0.2') {
  const file = join(root, 'catalog.json');
  await writeFile(file, JSON.stringify({ schemaVersion, packs }));
  return file;
}

test('v0.1 directory loading remains compatible and optional examples default empty', async t => {
  const root = await temporary(t);
  const legacy = structuredClone(song); delete legacy.organizationExamples;
  const directory = await pack(root, 'song', legacy);
  const loaded = await loadCatalog(pathToFileURL(`${directory}/`));
  assert.equal(loaded.schemaVersion, '0.1');
  assert.deepEqual(loaded.organizationExamples, []);
  assert.deepEqual(loaded.nodes, song.nodes);
  assert.deepEqual(await loadCatalog(directory), loaded);
  assert.deepEqual(validateCatalog(loaded), []);
});

test('enabled packs merge in order and shared references resolve only in the aggregate', async t => {
  const root = await temporary(t);
  const domain = structuredClone(song);
  const shared = empty();
  shared.nodes = domain.nodes.filter(node => node.id === 'knowledge:sound-waves');
  domain.nodes = domain.nodes.filter(node => node.id !== 'knowledge:sound-waves');
  const domainDirectory = await pack(root, 'song', domain);
  await pack(root, 'shared', shared);
  await pack(root, 'unfinished', { ...empty('unreviewed'), nodes: [{ id: 'knowledge:unreviewed' }] });
  const file = await manifest(root, ['song', 'shared']);
  const merged = await loadCatalogManifest(file);
  assert.equal(merged.schemaVersion, '0.2');
  assert.equal(merged.nodes.at(-1).id, 'knowledge:sound-waves');
  assert.equal(merged.nodes.length, song.nodes.length);
  assert.equal(merged.nodes.some(node => node.id === 'knowledge:unreviewed'), false);
  assert.ok(validateCatalog(await loadCatalog(domainDirectory)).some(error => /dangling reference/.test(error)));
  assert.deepEqual(validateCatalog(merged), []);
  await manifest(root, ['song', 'shared', 'unfinished']);
  await assert.rejects(loadCatalogManifest(file), /Unsupported pack schemaVersion/);
});

test('duplicate records reject across packs and collections instead of silently overwriting', async t => {
  const root = await temporary(t);
  await pack(root, 'song', song);
  await pack(root, 'duplicate', { ...empty(), sources: [{ id: song.nodes[0].id }] });
  await assert.rejects(loadCatalogManifest(await manifest(root, ['song', 'duplicate'])), /Duplicate ID endeavor:song-release/);
  const directory = await pack(root, 'within', { ...empty(), nodes: [{ id: 'knowledge:repeat' }, { id: 'knowledge:repeat' }] });
  await assert.rejects(loadCatalog(directory), /Duplicate ID knowledge:repeat/);
});

test('catalog manifests reject unsafe, duplicate and incompatible pack declarations', async t => {
  const root = await temporary(t);
  for (const name of ['../outside', '/tmp/song', 'nested/song', 'nested\\song', 'song%2Foutside', '.', '', 7]) {
    await assert.rejects(loadCatalogManifest(await manifest(root, [name])), /safe directory names/, String(name));
  }
  await assert.rejects(loadCatalogManifest(await manifest(root, [])), /nonempty/);
  await assert.rejects(loadCatalogManifest(await manifest(root, ['song', 'song'])), /Duplicate enabled pack/);
  await assert.rejects(loadCatalogManifest(await manifest(root, ['song'], '0.1')), /requires schemaVersion 0.2/);
  const directory = await pack(root, 'future', empty('0.3'));
  await assert.rejects(loadCatalog(directory), /Unsupported pack schemaVersion/);
  await pack(root, 'future', { ...empty('0.1'), organizationExamples: [{ id: 'example:future' }] });
  await assert.rejects(loadCatalog(directory), /requires schemaVersion 0.2/);
});

test('pack and array symlinks cannot import files outside the reviewed pack tree', async t => {
  const root = await temporary(t);
  const data = join(root, 'data'); await mkdir(data);
  const outside = await pack(root, 'outside', empty());
  await symlink(outside, join(data, 'escaped'));
  await assert.rejects(loadCatalogManifest(await manifest(data, ['escaped'])), /escapes catalog directory/);
  const directory = await pack(data, 'safe', empty());
  await symlink(directory, join(data, 'alias'));
  await assert.rejects(loadCatalogManifest(await manifest(data, ['alias'])), /real directory/);
  await rm(join(directory, 'nodes.json'));
  await symlink(join(outside, 'nodes.json'), join(directory, 'nodes.json'));
  await assert.rejects(loadCatalog(directory), /regular file/);
});

test('manifest file traversal and non-array data fail before graph construction', async t => {
  const root = await temporary(t);
  const directory = await pack(root, 'bad', empty());
  const file = join(directory, 'manifest.json');
  const config = JSON.parse(await readFile(file, 'utf8'));
  config.files.nodes = '../private.json'; await writeFile(file, JSON.stringify(config));
  await assert.rejects(loadCatalog(directory), /Invalid manifest file: nodes/);
  await pack(root, 'bad', { ...empty(), nodes: {} });
  await assert.rejects(loadCatalog(directory), /Expected array: nodes/);
});

test('default loading uses the reviewed aggregate and it passes release validation', async () => {
  const configured = await loadCatalog();
  assert.equal(configured.schemaVersion, '0.2');
  assert.deepEqual(configured, await loadCatalogManifest());
  assert.deepEqual(validateCatalog(configured), []);
});
