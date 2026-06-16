import { createOpenAPI } from 'fumadocs-openapi/server';
import path from 'path';

export const SPEC_PATHS: Record<string, string> = {
  'hyperliquid-perps':    path.join(process.cwd(), 'content/api/hyperliquid-perps.yaml'),
  'hyperliquid-spot':     path.join(process.cwd(), 'content/api/hyperliquid-spot.yaml'),
  'hyperliquid-exchange': path.join(process.cwd(), 'content/api/hyperliquid-exchange.yaml'),
  'omg-info':             path.join(process.cwd(), 'content/api/omg-info.yaml'),
  'omg-operator':         path.join(process.cwd(), 'content/api/omg-operator.yaml'),
  'omg-watcher':          path.join(process.cwd(), 'content/api/omg-watcher.yaml'),
};

export const SPEC_TITLES: Record<string, string> = {
  'hyperliquid-perps':    'Hyperliquid Perpetuals API',
  'hyperliquid-spot':     'Hyperliquid Spot API',
  'hyperliquid-exchange': 'Hyperliquid Exchange API',
  'omg-info':             'OMG Network Info API',
  'omg-operator':         'OMG Network Operator API',
  'omg-watcher':          'OMG Network Watcher API',
};

export const openapi = createOpenAPI({
  input: Object.values(SPEC_PATHS),
});