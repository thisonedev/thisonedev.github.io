# Technical Writing Portfolio

A documentation site showcasing 5+ years of work as a technical and content writer in the web3 industry.

**Live site:** https://thisonedev.github.io/portfolio/

---

## What's inside

- **Apps & CLIs**. Sample applications, CLIs, and integration demos across Tether, TON, Chainlink, Hive, OMG Network, and Myria ecosystems.

- **Guides & Tutorials**. Technical guides on blockchain development, API usage, and
  tooling. Written for both beginner and intermediate audiences.

- **Research**. In-depth research and analysis of web3 projects and protocols. Includes coverage of emerging platforms, networks, and infrastructure.

## Tech stack

- [Fumadocs](https://fumadocs.dev) — docs framework
- Next.js (static export)
- MDX for content
- Deployed to GitHub Pages via GitHub Actions

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

The site auto-deploys to GitHub Pages on every push to `master` via the included GitHub Actions workflow at `.github/workflows/deploy.yml`.

To deploy manually:

```bash
npm run build
```

The static output is exported to the `out/` folder.