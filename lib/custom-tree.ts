import type { Node } from 'fumadocs-core/page-tree';
import { SPECS } from '@/lib/openapi';
import { resolveIcon } from '@/lib/resolveIcon';

/**
 * Sidebar tree for the portfolio section. Generates the OpenAPI
 * References section from `SPECS`.
 */

type PageEntry = {
  name: string;
  url: string;
  icon: string;
};

type Section = {
  separator: string;
  entries: PageEntry[];
};

/** Sections. A section with one entry renders without a separator. */
const sections: Section[] = [
  {
    separator: 'API References',
    entries: Object.entries(SPECS).map(([slug, { title }]) => ({
      name: title,
      url: `/portfolio/api/${slug}`,
      icon: 'BookA',
    })),
  },
  {
    separator: 'CLIs & SDK Modules',
    entries: [
      { name: 'TON CLI Typescript', url: '/portfolio/ton/ton-cli-typescript', icon: 'Terminal' },
      {
        name: 'OMG Network Samples App',
        url: '/portfolio/omg-network/samples-app',
        icon: 'Terminal',
      },
      { name: 'Myria Samples App', url: '/portfolio/myria/samples-app', icon: 'Terminal' },
      { name: 'Tether WDK SUI Module', url: '/portfolio/tether/wdk-sui-wallet', icon: 'Terminal' },
      { name: 'Tether WDK CowSwap Module', url: '/portfolio/tether/wdk-cowswap', icon: 'Terminal' },
    ],
  },
  {
    separator: 'Apps',
    entries: [
      { name: 'TON Appkit Starter', url: '/portfolio/ton/ton-appkit-starter', icon: 'Terminal' },
      { name: 'Graph App', url: '/portfolio/chainlink/graph-app', icon: 'Terminal' },
      { name: 'Hive Apps Explorer', url: '/portfolio/hive/hive-apps-explorer', icon: 'Terminal' },
      { name: 'Hive DAO', url: '/portfolio/hive/hive-dao', icon: 'Terminal' },
      { name: 'Hived Scan', url: '/portfolio/hive/hivedscan', icon: 'Terminal' },
    ],
  },
  {
    separator: 'How-tos',
    entries: [
      {
        name: 'How to Interact with Multibaas',
        url: '/portfolio/omg-network/multibaas',
        icon: 'Scroll',
      },
      {
        name: 'How to Manage a VPS',
        url: '/portfolio/omg-network/how-to-manage-vps',
        icon: 'Scroll',
      },
      { name: 'How to Run a Watcher', url: '/portfolio/omg-network/run-watcher', icon: 'Scroll' },
      {
        name: 'How to Manage a Watcher',
        url: '/portfolio/omg-network/manage-watcher',
        icon: 'Scroll',
      },
      {
        name: 'How to Register Upkeep',
        url: '/portfolio/chainlink/register-upkeep',
        icon: 'Scroll',
      },
      {
        name: 'How to Make an Existing Job Request',
        url: '/portfolio/chainlink/job-requests',
        icon: 'Scroll',
      },
    ],
  },
  {
    separator: 'Guides & Tutorials',
    entries: [
      {
        name: 'OMG Network Exchange Use Case',
        url: '/portfolio/omg-network/exchange-use-case',
        icon: 'Scroll',
      },
      {
        name: 'OMG Network Wallet Use Case',
        url: '/portfolio/omg-network/wallet-use-case',
        icon: 'Scroll',
      },
      { name: 'Hello World TON', url: '/portfolio/ton/hello-world-ton', icon: 'Scroll' },
      { name: 'Chainlink API Calls', url: '/portfolio/chainlink/api-calls', icon: 'Scroll' },
      {
        name: 'Arbitrum Feeds Chainlink',
        url: '/portfolio/chainlink/arbitrum-feeds',
        icon: 'Scroll',
      },
      { name: 'Flight Aware Chainlink', url: '/portfolio/chainlink/flight-aware', icon: 'Scroll' },
      { name: 'L2 Sequencer Health Flag', url: '/portfolio/chainlink/health-flag', icon: 'Scroll' },
      { name: 'Mint Transactions', url: '/portfolio/myria/mint-transactions', icon: 'Scroll' },
    ],
  },
  {
    separator: 'Quickstarts',
    entries: [
      {
        name: 'OMG Network Web Wallet Quickstart',
        url: '/portfolio/omg-network/web-wallet',
        icon: 'Scroll',
      },
      { name: 'Myria Quickstart', url: '/portfolio/myria/quickstart', icon: 'Scroll' },
    ],
  },
  {
    separator: 'Product Specs',
    entries: [
      {
        name: 'Community Points Engine',
        url: '/portfolio/omg-network/community-points',
        icon: 'Scroll',
      },
    ],
  },
  {
    separator: 'Blog Posts & Announcements',
    entries: [
      { name: 'Paytomat Overview', url: '/portfolio/paytomat/overview', icon: 'Scroll' },
      { name: 'Smart Contracts', url: '/portfolio/paytomat/smart-contracts', icon: 'Scroll' },
      { name: 'EOS Resources', url: '/portfolio/paytomat/eos-resources', icon: 'Scroll' },
      { name: 'Revenue Contract', url: '/portfolio/paytomat/revenue-contract', icon: 'Scroll' },
      { name: 'Wallet Redesign', url: '/portfolio/paytomat/wallet', icon: 'Scroll' },
      { name: '1C Integration', url: '/portfolio/paytomat/1c-integration', icon: 'Scroll' },
      { name: 'Loyalty Program', url: '/portfolio/paytomat/loyalty-program', icon: 'Scroll' },
      { name: 'Decentralized Franchise', url: '/portfolio/paytomat/franchise', icon: 'Scroll' },
      {
        name: 'Merchant Interfaces',
        url: '/portfolio/paytomat/merchant-interfaces',
        icon: 'Scroll',
      },
    ],
  },
  {
    separator: 'Research',
    entries: [
      { name: 'Unipeg', url: '/portfolio/research/unipeg', icon: 'Scroll' },
      { name: 'Real Finance', url: '/portfolio/research/realfinance', icon: 'Scroll' },
      { name: 'SUI', url: '/portfolio/research/sui', icon: 'Scroll' },
      { name: 'Eitherway', url: '/portfolio/research/eitherway', icon: 'Scroll' },
      { name: 'Gitlawb', url: '/portfolio/research/gitlawb', icon: 'Scroll' },
      { name: 'Pengu', url: '/portfolio/research/pengu', icon: 'Scroll' },
      { name: 'JOE', url: '/portfolio/research/joe', icon: 'Scroll' },
      { name: 'Keeta Network', url: '/portfolio/research/keeta', icon: 'Scroll' },
      { name: 'Mantle Network', url: '/portfolio/research/mantle', icon: 'Scroll' },
      { name: 'KnoxNet', url: '/portfolio/research/knoxnet', icon: 'Scroll' },
      { name: 'Psyopanime', url: '/portfolio/research/psyopanime', icon: 'Scroll' },
      { name: 'Ovpp', url: '/portfolio/research/ovpp', icon: 'Scroll' },
    ],
  },
];

const omitSingleSection = (s: Section) =>
  s.entries.length > 1
    ? [{ type: 'separator' as const, name: s.separator }, ...s.entries.flatMap(toNode)]
    : s.entries.flatMap(toNode);

const toNode = (entry: PageEntry): Node =>
  ({
    type: 'page',
    name: entry.name,
    url: entry.url,
    icon: resolveIcon(entry.icon),
  }) as Node;

/** Fumadocs page tree consumed by `<DocsLayout>`. */
export const customTree: Node[] = sections.flatMap(omitSingleSection);
