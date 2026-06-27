# Technical Writing Portfolio

A docs-as-code portfolio site for **Dmytro**, a senior technical writer covering APIs, blockchain ecosystems, and AI tooling. The site is itself a portfolio piece: built with the same tools and patterns used for client work, and structured so both humans and AI agents can consume it.

**Live:** https://thisonedev.github.io

---

## What's here

The portfolio contains 60+ MDX pages organized into nine sections, plus six full OpenAPI specs rendered as interactive references.

### Featured case studies

| Client | What I shipped | Impact |
|---|---|---|
| [OMG Network](/portfolio/case-studies/omg-network/) | Docusaurus portal rebuild, omg-js samples app, exchange & wallet guides | Integration time 2h → 3m |
| [Chainlink](/portfolio/case-studies/chainlink/) | Migration to open-source Eleventy, integration guides for every new feed | Support volume −30–40% |
| [Myria](/portfolio/case-studies/myria/) | Portal from scratch, SDK references, TypeScript samples app | Partner integration −70–80% |
| [Paytomat](/portfolio/case-studies/paytomat/) | Content strategy, whitepapers, NCR/Poster/1C API docs | Engagement +35–45% |

---

## Tech stack

- **[Fumadocs](https://fumadocs.dev)** — docs framework on top of Next.js
- **Next.js 16** with `output: 'export'` — full static export to `out/`
- **MDX** for content authoring
- **[fumadocs-openapi](https://fumadocs.dev/docs/openapi)** for the API reference pages
- **Tailwind v4** with the `fumadocs-ui` preset
- **Biome** for lint + format (single tool, replaces ESLint + Prettier)
- **GitHub Pages** via Actions on every push to `master`

### Agent-readiness

Built for both humans and AI agents:

- [`llms.txt`](/llms.txt) — site index with descriptions, structured for LLM ingestion
- [`llms-full.txt`](/llms-full.txt) — full snapshot for long-context agents
- [`skill.md`](/skill.md) — manifest describing what the site is and how to retrieve content
- **Content negotiation** — every page available as Markdown at `/llms.mdx/<path>/content.md`
- **JSON-LD** on the homepage (Person schema)

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the site is served from the `/` route in dev. The portfolio tree lives at `/portfolio/`, blog at `/blog/`.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server on port 3000 |
| `npm run build` | Production static export to `out/` |
| `npm run start` | Serve the built `out/` folder |
| `npm run lint` | Biome check (lint + format) |
| `npm run lint:fix` | Biome check with auto-fix |
| `npm run format` | Biome format write |
| `npm run types:check` | Regenerate MDX types, then `tsc --noEmit` |

---

## Adding content

### New portfolio entry

Drop an `.mdx` file into `content/portfolio/<item>.mdx` with frontmatter:

```mdx
---
title: Your Page Title
description: One-line summary used in llms.txt and search.
---
```

Add an entry to `lib/custom-tree.ts` under the matching section so it shows in the sidebar.

### New OpenAPI spec

Add a YAML file to `content/api/<slug>.yaml`, then add one entry to `lib/openapi.ts`:

```ts
export const SPECS = {
  // ...existing
  'my-new-spec': { title: 'My New API', file: 'my-new-spec.yaml' },
} as const;
```

The sidebar tree, llms.txt, and static params all derive from this object — one change, three places updated.

---

## Deployment

The site auto-deploys to GitHub Pages on every push to `master` via `.github/workflows/deploy.yml`. The workflow runs `npm ci && npm run build`, uploads `out/` as the Pages artifact, then deploys.

Manual deploy is the same build:

```bash
npm run build
# → ./out is the deployable artifact
```