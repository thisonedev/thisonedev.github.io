import Image from 'next/image';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import {
  BookOpenIcon,
  CodeIcon,
  FileTextIcon,
  GlobeIcon,
  LayoutIcon,
  TerminalIcon,
  ZapIcon,
  ArrowUpRightIcon,
} from 'lucide-react';
import { Marquee } from '@/app/(home)/marquee';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import {
  Hero,
  PreviewImages,
  Writing,
  ProcessStrip,
} from '@/app/(home)/page.client';
import CLIImage from '../../content/images/cli.png';
import StoryImage from '../../content/images/story.png';

// ─── CVA Variants ──────────────────────────────────

const headingVariants = cva('font-medium tracking-tight', {
  variants: {
    variant: {
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-xl lg:text-2xl',
    },
  },
});

const buttonVariants = cva(
  'inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-200',
        secondary: 'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const cardVariants = cva('rounded-2xl text-sm p-6 bg-origin-border shadow-lg', {
  variants: {
    variant: {
      secondary: 'bg-brand-secondary text-brand-secondary-foreground',
      default: 'border bg-fd-card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Page() {
  return (
    <main className="text-landing-foreground pt-4 pb-6 dark:text-landing-foreground-dark md:pb-12">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative flex min-h-[300px] h-[52vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border">
        <Hero />
        <div className="flex flex-col z-2 px-4 size-full md:p-12 max-md:items-center max-md:text-center">
          <h1 className="text-4xl my-4 leading-tighter font-medium xl:text-5xl xl:mb-12">
            Hi. I'm Dmytro! I write 
             <br />developer docs for
            <br />
             <span className="text-brand-secondary">web3 and AI companies</span>.
          </h1>
          {/* Credibility bar */}
          <p className="text-sm text-fd-muted-foreground mb-6 font-mono">
            8+ yrs · 5 clients · Fintech, L2s, Stablecoins
          </p>
          <div className="flex flex-row items-center gap-4 flex-wrap w-fit">
            <a href="#contact" className={cn(buttonVariants(), 'max-sm:text-sm')}>
              Get in Touch
            </a>
            <Link href="/portfolio" className={cn(buttonVariants({ variant: 'secondary' }), 'max-sm:text-sm')}>
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2 lg:mt-20">

        {/* ── Pitch Paragraph ──────────────────────────────────────────────── */}
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
          Technical writer with 8+ years of experience in{' '}
          <span className="text-brand font-medium">APIs</span>,{' '}
          <span className="text-brand font-medium">blockchain ecosystems</span>, and{' '}
          <span className="text-brand font-medium">AI workflows</span>. I turn complex systems
          into documentation developers use.
        </p>

        {/* ── Tool Strip ───────────────────────────────────────────────────── */}
        <ToolStrip />

        {/* ── Availability Card ────────────────────────────────────────────── */}
        {/* <AvailabilityCard /> */}

        {/* ── Testimonials ─────────────────────────────────────────────────── */}
        {/* <Testimonials /> */}

        {/* ── Work Samples (replaces PreviewImages / Aesthetics) ───────────── */}
        <WorkSamples />

        {/* ── Process Strip ────────────────────────────────────────────────── */}
        <ProcessSection />

        {/* ── Expertise Tabs ───────────────────────────────────────────────── */}
        <ExpertiseTabs />

        {/* ── Case Studies ─────────────────────────────────────────────────── */}
        <CaseStudies />

        {/* ── Toolchain & Industries ───────────────────────────────────────── */}
        <Toolchain />
        <Industries />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <ClosingCTA />

      </div>
    </main>
  );
}

// ─── Tool Strip ──────────────────────────────────────────────────────────────

function ToolStrip() {
  const tools = [
    'Git', 'MDX', 'Docs as Code', 'OpenAPI / Swagger', 'Docusaurus', 'Mintlify',
    'Fumadocs', 'Solidity', 'TypeScript', 'React'
  ];

  return (
    <div className="col-span-full flex flex-wrap gap-2">
      {tools.map((tool) => (
        <span
          key={tool}
          className="text-xs font-mono px-3 py-1.5 rounded-full border border-brand/30 bg-fd-card text-fd-muted-foreground"
        >
          {tool}
        </span>
      ))}
    </div>
  );
}

// ─── Availability Card ────────────────────────────────────────────────────────

function AvailabilityCard() {
  return (
    <div className="relative p-4 rounded-2xl col-span-full z-2 overflow-hidden md:p-8">
      <Image
        src={CLIImage}
        alt=""
        className="absolute inset-0 size-full object-top object-cover -z-1"
      />
      <div className="mx-auto w-full max-w-[800px] p-6 bg-fd-card text-fd-card-foreground border rounded-2xl shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="size-2.5 rounded-full bg-brand-secondary animate-pulse" />
              <span className="text-xs font-medium text-brand-secondary uppercase tracking-wider">
                Available for contracts
              </span>
            </div>
            <h2 className={cn(headingVariants({ variant: 'h3', className: 'mb-3' }))}>
              Let's build docs people use.
            </h2>
            <p className="text-fd-muted-foreground text-sm mb-1">
              Developer portals · API references · How-tos · User guides · Onboarding flows
            </p>
            <p className="text-xs text-fd-muted-foreground/60">
              Free consultation. I'll tell you if I'm not the right fit.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <a
              href="mailto:thisonedev.md@gmail.com"
              className={cn(buttonVariants({ variant: 'primary' }))}
            >
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/thisonedev/"
              rel="noreferrer noopener"
              target="_blank"
              className={cn(buttonVariants({ variant: 'secondary' }))}
            >
              DM on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/124599',
    user: 'Client · DeFi Protocol',
    role: 'Head of DevRel',
    message: `Dmytro took our scattered API notes and turned them into a reference developers were citing in support tickets within a week of launch.

Zero back-and-forth on rewrites. Just clean, accurate docs on the first pass.`,
  },
];

function Testimonials() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'mt-8 text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        What Clients Say
      </h2>

      <div
        className={cn(
          cardVariants({
            variant: 'secondary',
            className: 'relative p-0 col-span-full',
          }),
        )}
      >
        <div className="absolute inset-0 z-2 inset-shadow-[0_10px_60px] inset-shadow-brand-secondary rounded-2xl" />
        <Marquee className="p-8">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl border bg-fd-card text-landing-foreground p-4 shadow-lg w-[320px]"
            >
              <p className="text-sm whitespace-pre-wrap">{item.message}</p>
              <div className="mt-auto flex flex-row items-center gap-2 pt-4">
                <Image
                  src={item.avatar}
                  alt="avatar"
                  width="32"
                  height="32"
                  unoptimized
                  className="size-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{item.user}</p>
                  <p className="text-xs text-fd-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
}

// ─── Work Samples ─────────────────────────────────────────────────────────────

function WorkSamples() {
  return (
    <>
      <div
        className={cn(
          cardVariants({
            variant: 'secondary',
            className: 'flex items-center justify-center p-0',
          }),
        )}
      >
        <PreviewImages />
      </div>
      <div className={cn(cardVariants(), 'flex flex-col')}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Documentation built for both humans and agents
        </h3>
        <p className="mb-4">
          Every sample in my portfolio includes working code, verified output, and context explaining the decisions behind it.
        </p>
        <p className="mb-6">
          Each piece is clear enough for a developer reading through it, and structured for AI agents to consume directly.
        </p>
        <Link href="/portfolio" className={cn(buttonVariants({ className: 'w-fit' }))}>
          Browse Portfolio
        </Link>
      </div>
    </>
  );
}

// ─── Process Strip ────────────────────────────────────────────────────────────

function ProcessSection() {
  return (
    <div className="col-span-full">
      <ProcessStrip />
    </div>
  );
}

// ─── Expertise Tabs ───────────────────────────────────────────────────────────

function ExpertiseTabs() {
  return (
    <Writing
      tabs={{
        writer: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ServerCodeBlock
              code={` 
openapi: 3.1.0
info:
  version: 1.0.0
  title: Child chain API
  description: |
    The API for the child chain.
    For a complete list of error codes, see the error code documentation.
  contact:
    name: OMG Network
    email: engineering@omg.network
  license:
    name: 'Apache 2.0: https://www.apache.org/licenses/LICENSE-2.0'
    url: 'https://omg.network/'
tags:
  - name: Block
    description: Block related API.
  - name: Transaction
    description: Transaction related API.
  - name: Fees
    description: Fees related API.
servers:
  - url: 'http://localhost:9656/'
paths:
  /alarm.get:
    get:
      tags:
        - Alarm
      summary: 'Provide alarms for system memory, CPU, and storage usage'
                `}
              lang="yaml"
            />
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                API &amp; SDK References
              </h3>
              <p>
                Structured, scannable, and tied to real request/response examples. Developers
                find what they need without reading everything.
              </p>
              <ul className="text-xs list-disc list-inside mt-8 space-y-1">
                <li>REST &amp; WebSocket endpoint coverage</li>
                <li>Typed SDK method signatures</li>
                <li>Error codes and edge-case notes</li>
                <li>OpenAPI / Swagger spec authoring</li>
                <li>Versioned changelogs</li>
              </ul>
            </div>
          </div>
        ),
        developer: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ServerCodeBlock
              code={`
import {
  ProjectManager,
  UpdateProjectParams,
  ProjectResponse
} from "myria-core-sdk";
import config from "../config";

(async (): Promise<void> => {
  const starkKey: string = config.stark_key;
  const env = config.environment;

  const projectManager: ProjectManager = new ProjectManager(env);
  const projectId: number = config.project_id;

  const params: UpdateProjectParams = {
    id: projectId,
    name: "PROJECT_NAME",
    companyName: "COMPANY_NAME",
    contactEmail: "COMPANY_EMAIL",
    starkKey: starkKey,
  };

  console.log("Updating the project...");
  const updatedProjectResponse: ProjectResponse = await projectManager.updateProject(params);

  console.log("Updated project response:");
  console.log(JSON.stringify(updatedProjectResponse, null, 2));
})();
                `}
              lang="typescript"
            />
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                CLIs &amp; Sample Apps
              </h3>
              <p>
                Runnable code. I build minimal working apps so the reader can
                clone, run, and adapt rather than guess from incomplete snippets.
              </p>
              <ul className="text-xs list-disc list-inside mt-8 space-y-1">
                <li>Clean and structured CLIs</li>
                <li>GitHub-hosted sample repos</li>
                <li>Environment setup &amp; troubleshooting</li>
                <li>Annotated source code</li>
              </ul>
            </div>
          </div>
        ),
        automation: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ServerCodeBlock
              code={`
---
title: FlightAware Chainlink (Testnet)
description: FlightAware Chainlink (Testnet) Tutorial
---

This Chainlink has a dedicated connection to [FlightAware](https://uk.flightaware.com/).

### Steps for using this oracle

1.  **Write and deploy** your Chainlink contract using the network details provided.
2.  **Fund** the contract with [LINK](https://docs.chain.link/resources/link-token-contracts).
3.  **Call** your request method.

---

### Chainlink Network Details

Use the following addresses and Job IDs for the Kovan network to create requests:

*   **LINK Token address:** 0xa36085f69e2889c224210f603d836748e7dc0088
*   **Oracle address:** 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e
*   **JobID:** a644d4e30977459d9a596bef89c09e71
*   **Sleep JobID:** f0003b2c52024e7fa931d6ee9a947c87

---

### Create your Chainlink contract

To inherit Chainlink behavior, you must import ChainlinkClient.sol.

Basic Contract Structure (Solidity 0.6.0):

\`\`\`solidity
pragma solidity ^0.6.0; 

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol"; 

contract FlightAwareChainlink is ChainlinkClient {
  uint256 oraclePayment;

  constructor(uint256 _oraclePayment) public {     
      setPublicChainlinkToken();     
      oraclePayment = _oraclePayment;   
  }   
  // Additional functions here...
}
\`\`\``}
              lang="mdx"
            />
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                Guides &amp; Tutorials
              </h3>
              <p>
                End-to-end narratives that take a developer from zero to working integration.
                Concept first, code second, troubleshooting throughout.
              </p>
              <ul className="text-xs list-disc list-inside mt-8 space-y-1">
                <li>Use-case walkthroughs (wallet, exchange, bridge)</li>
                <li>Quickstarts with copy-paste readiness</li>
                <li>How-tos for ops &amp; DevOps tasks</li>
                <li>Product specs &amp; feature documentation</li>
                <li>Blog posts &amp; protocol announcements</li>
              </ul>
            </div>
          </div>
        ),
      }}
    />
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

const caseStudies = [
  {
    icon: GlobeIcon,
    client: 'OMG Network',
    category: 'L2 Infrastructure · Docs-as-code · Samples App · Product Spec',
    headline: 'Integration time: 2 hours → 3 minutes',
    body: `OMG Network's Plasma-chain docs couldn't keep pace with an actively shipping protocol and partners had no single path through an integration. I rebuilt the Docusaurus portal on a docs-as-code workflow, built a JavaScript samples app covering every omg-js operation, wrote end-to-end use-case guides for exchanges and wallets (cutting integration time 60-70%), and authored the Community Points Engine technical specification, which received the highest ranking in Reddit's Great Scaling Bake-Off.`,
    href: '/portfolio/case-studies/omg-network/',
  },
  {
    icon: BookOpenIcon,
    client: 'Chainlink',
    category: 'Developer Portal · Guides & Tutorials · Community',
    headline: 'Support volume down 30–40%',
    body: `Chainlink's portal was a closed Read the Docs site with no path for community contributions. I helped migrate it to an open-source Eleventy site, then shipped integration guides for every new data feed and automation feature as they landed: price and data feeds, L2 sequencer health, job requests, and Automation upkeep. I also embedded in hackathons and Discord to feed developer friction back into the docs rather than answering the same questions one at a time.`,
    href: '/portfolio/case-studies/chainlink/',
  },
  {
    icon: TerminalIcon,
    client: 'Myria',
    category: 'SDK References · Sample App · Developer Portal',
    headline: 'Partner integration time dropped 70–80%',
    body: `Myria had no public developer documentation when I joined. Partners depended entirely on direct access to the engineering team. I built the portal from scratch, including SDK references, a Stark key SDK helper, a TypeScript samples app with runnable examples for every core flow, and a quickstart for new partners. Within weeks of launch, high-profile partners including AB de Villiers and LeapBlock Studios had integrated.`,
    href: '/portfolio/case-studies/myria/',
  },
  {
    icon: FileTextIcon,
    client: 'Paytomat',
    category: 'Content Strategy · API Docs · POS Integrations',
    headline: 'Audience engagement up 35–45% in the first few weeks',
    body: `Paytomat built crypto POS infrastructure for merchants and needed to build an audience around it while simultaneously managing API docs for live integrations with NCR, Poster, and 1C. I ran the content strategy that grew engagement, contributed to two whitepapers that opened doors with non-technical clients (increasing interest by 30–40%), and kept the Console Panel REST API documentation accurate across three concurrent partner integrations. I also represented Paytomat at Malaysia's MaGIC Accelerator Program.`,
    href: '/portfolio/case-studies/paytomat/',
  },
];

function CaseStudies() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'mt-8 text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Case Studies
      </h2>

      {caseStudies.map((study) => {
        const Icon = study.icon;
        return (
          <div key={study.client} className={cn(cardVariants(), 'flex flex-col')}>
            <div className="flex items-center gap-3 mb-4">
              <Icon className="text-brand size-5 shrink-0" />
              <span className="text-xs font-mono text-fd-muted-foreground uppercase tracking-wider">
                {study.category}
              </span>
            </div>
            <p className="text-xs font-medium text-brand mb-2">{study.client}</p>
            <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-3' }))}>
              {study.headline}
            </h3>
            <p className="mb-6 text-fd-muted-foreground leading-relaxed">{study.body}</p>
            <Link
              href={study.href}
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'mt-auto w-fit flex items-center gap-1',
              )}
            >
              View case study <ArrowUpRightIcon className="size-3" />
            </Link>
          </div>
        );
      })}
    </>
  );
}

// ─── Toolchain ───────────────────────────────────────

function Toolchain() {
  const tools = [
    { name: 'Git & GitHub', description: 'Docs-as-code version control and PR reviews.' },
    { name: 'MDX / Markdown', description: 'Rich content authoring with component embedding.' },
    { name: 'OpenAPI / Swagger', description: 'Spec-first API documentation and validation.' },
    { name: 'Docusaurus', description: 'Static doc sites for open-source and developer portals.' },
    { name: 'Mintlify', description: 'Modern hosted docs for API-first products.' },
    { name: 'Fumadocs', description: 'Next.js-native documentation framework.' },
  ];

  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Toolchain
      </h2>

      {/* Full-width featured card */}
      <div className="relative col-span-full min-h-[250px] px-2 py-6 rounded-2xl z-2 border shadow-md overflow-hidden">
        <Image
          src={StoryImage}
          alt=""
          className="absolute inset-0 size-full -z-1 pointer-events-none object-cover object-top rounded-2xl"
        />

        <div className="w-full m-auto max-w-[500px] text-start shadow-xl p-4 bg-fd-card/80 backdrop-blur-md rounded-xl border shadow-black/50 dark:bg-fd-card/50">
          <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-3' }))}>
            Docs-as-code, all the way down.
          </h3>
          <p className="text-sm mb-4 text-fd-muted-foreground">
            Every doc I produce lives in version control, ships through CI, and is reviewed like
            code. Documentation stays in sync with the product.
          </p>
          <Link
            href="/portfolio"
            className={cn(buttonVariants({ variant: 'primary', className: 'text-sm py-2' }))}
          >
            See examples
          </Link>
        </div>
      </div>

      <div
        className={cn(
          cardVariants({
            className: 'relative flex flex-col overflow-hidden z-2',
          }),
        )}
      >
        <LayoutIcon className="text-brand mb-4" />
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Platforms I work with
        </h3>
        <p className="mb-8 text-fd-muted-foreground">
          From static generators to hosted portals. I pick the right tool for your stack and
          constraints.
        </p>
        <div className="mt-auto flex flex-col gap-2 @container mask-[linear-gradient(to_bottom,white,transparent)]">
          {tools.map((item) => (
            <div
              key={item.name}
              className="flex flex-col text-sm gap-2 p-2 border border-dashed border-brand-secondary @lg:flex-row @lg:items-center last:@max-lg:hidden"
            >
              <p className="font-medium text-nowrap">{item.name}</p>
              <p className="text-xs flex-1 @lg:text-end text-fd-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* QA card */}
      <div className={cn(cardVariants(), 'flex flex-col')}>
        <CodeIcon className="text-brand mb-4" />
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          QA-like mindset
        </h3>
        <p className="mb-6 text-fd-muted-foreground">
          Every API endpoint, CLI command, and code sample gets tested against a working
          environment before it appears in the docs. If it doesn't run, it doesn't ship.
        </p>
        <ServerCodeBlock
          codeblock={{ title: 'createWallet.ts' }}
          code={`
export async function createWallet(opts: CreateWalletOptions): Promise<void> {
  const network = resolveNetwork(opts.network);

  const words    = await mnemonicNew(24);
  const mnemonic = words.join(' ');
  const keyPair  = await mnemonicToPrivateKey(words);
  const wallet = WalletContractV5R1.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
    walletId: { networkGlobalId: config.networks[network].globalId },
  });

  const address    = formatAddress(wallet.address, network);
  const bounceable = formatAddressBounceable(wallet.address, network);

  console.log('New TON wallet created');
}
            `}
          lang="javascript"
        />
      </div>
    </>
  );
}

// ─── Industries ───────────────────────────────────────────────────────────────

function Industries() {
  const domains = [
    {
      icon: ZapIcon,
      name: 'Fintech and Payments',
      description:
        'Stablecoins, POS systems, payment APIs, merchant integrations.',
    },
    {
      icon: GlobeIcon,
      name: 'Infrastructure',
      description:
        'Node setup and management, VPS configuration.',
    },
    {
      icon: TerminalIcon,
      name: 'API-first Startups',
      description:
        'Developer portals, REST references, WebSocket guides, and onboarding flows for teams shipping fast.',
    },
    {
      icon: BookOpenIcon,
      name: 'AI Workflows',
      description:
        'LLM-powered toolchains, agent frameworks, and AI-assisted developer tooling.',
    },
  ];

  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'mt-8 text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Domains I Know
      </h2>

      {domains.map((d) => {
        const Icon = d.icon;
        return (
          <div key={d.name} className={cn(cardVariants(), 'flex flex-col')}>
            <Icon className="text-brand mb-4" />
            <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-4' }))}>
              {d.name}
            </h3>
            <p className="text-fd-muted-foreground">{d.description}</p>
          </div>
        );
      })}
    </>
  );
}

// ─── Closing CTA ──────────────────────────────────────────────────────────────

function ClosingCTA() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'mt-8 text-brand text-center mb-4 col-span-full',
          }),
        )}
        id="contact"
      >
        Let's Work Together
      </h2>

      <div className={cn(cardVariants({ className: 'flex flex-col' }))}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Ready when you are.
        </h3>
        <p className="mb-8 text-fd-muted-foreground">
          Got a docs project, an API that needs a reference, or a developer portal that needs
          rebuilding? Send me a note. I respond within 24 hours.
        </p>
        <div className="flex flex-row flex-wrap gap-2">
          <a
            href="mailto:thisonedev.md@gmail.com"
            className={cn(buttonVariants({ variant: 'primary' }))}
          >
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/thisonedev/"
            rel="noreferrer noopener"
            target="_blank"
            className={cn(buttonVariants({ variant: 'secondary' }))}
          >
            DM on LinkedIn
          </a>
          <Link href="/portfolio" className={cn(buttonVariants({ variant: 'secondary' }))}>
            View Portfolio
          </Link>
        </div>
      </div>

      <div
        className={cn(
          cardVariants({
            className: 'flex flex-col p-0 pt-8',
          }),
        )}
      >
        <h2 className="text-3xl text-center font-extrabold font-mono uppercase mb-4 lg:text-4xl">
          Great Docs = More Clients
        </h2>
        <p className="text-center font-mono text-xs opacity-50 mb-8">
          and no, you can't automate everything yet.
        </p>
        <div className="h-[200px] mt-auto overflow-hidden p-8 bg-gradient-to-b from-brand-secondary/10">
          <div className="mx-auto bg-radial-[circle_at_0%_100%] from-60% from-transparent to-brand-secondary size-[500px] rounded-full" />
        </div>
      </div>
    </>
  );
}