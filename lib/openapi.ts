import path from 'node:path';
import { createOpenAPI } from 'fumadocs-openapi/server';

/**
 * Single source of truth for OpenAPI specs.
 *
 * Each entry maps a URL-safe slug (used under `/portfolio/api/<slug>`)
 * to the spec's display title and YAML filename.
 *
 * Adding a new spec is a one-line change here — `lib/custom-tree.ts`
 * builds its navigation directly from this object.
 */
export const SPECS = {
  'hyperliquid-perps': { title: 'Hyperliquid Perpetuals API', file: 'hyperliquid-perps.yaml' },
  'hyperliquid-spot': { title: 'Hyperliquid Spot API', file: 'hyperliquid-spot.yaml' },
  'hyperliquid-exchange': { title: 'Hyperliquid Exchange API', file: 'hyperliquid-exchange.yaml' },
  'omg-info': { title: 'OMG Network Info API', file: 'omg-info.yaml' },
  'omg-operator': { title: 'OMG Network Operator API', file: 'omg-operator.yaml' },
  'omg-watcher': { title: 'OMG Network Watcher API', file: 'omg-watcher.yaml' },
} as const;

export type SpecSlug = keyof typeof SPECS;

/**
 * Resolve a spec slug to its absolute YAML path on disk.
 * Returns `undefined` if the slug is unknown.
 */
export function getSpecPath(slug: string): string | undefined {
  const spec = SPECS[slug as SpecSlug];
  return spec ? path.join(process.cwd(), 'content/api', spec.file) : undefined;
}

/**
 * Resolve a spec slug to its display title.
 * Returns `undefined` if the slug is unknown.
 */
export function getSpecTitle(slug: string): string | undefined {
  return SPECS[slug as SpecSlug]?.title;
}

export const openapi = createOpenAPI({
  input: Object.values(SPECS).map((spec) => path.join(process.cwd(), 'content/api', spec.file)),
});
