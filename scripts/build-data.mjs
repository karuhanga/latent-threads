import { mkdir, writeFile } from 'node:fs/promises';
import { loadCatalog } from './load-catalog.mjs';
import { assertCatalog } from '../src/data/validate.ts';

const catalog = await loadCatalog();
assertCatalog(catalog);
await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true });
await writeFile(new URL('../src/generated/catalog.json', import.meta.url), JSON.stringify(catalog));
console.log(`Validated release: ${catalog.nodes.length} nodes, ${catalog.contributions.length} contributions, ${catalog.relations.length} relations.`);
