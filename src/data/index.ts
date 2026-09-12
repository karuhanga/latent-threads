import catalog from '../generated/catalog.json';
import { createGraph } from './graph.ts';
import type { Catalog } from './types.ts';

// Generated only after release validation; never hand-author this artifact.
export const graph = createGraph(catalog as Catalog);
