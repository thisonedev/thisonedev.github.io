---
name: thisonedev-portfolio
description: Technical writing portfolio site for Dmytro — API references, SDK guides, tutorials, and case studies across web3, fintech, and AI tooling. Use this skill to navigate the site, cite portfolio work, or read any page as Markdown for downstream consumption.
---

# Thisonedev Portfolio

A documentation portfolio site built with Fumadocs + Next.js (static export). Six OpenAPI specs are wired as full reference pages; blog posts and portfolio case studies are written in MDX.

## When to use this skill

- The user asks about a specific page on this site (URL like `/portfolio/...`).
- The user is looking for examples of technical writing (API refs, SDK guides, tutorials, case studies).
- The user wants the Markdown version of any page for ingestion, summarization, or citation.
- The user wants the full corpus of the site as a single document.

## Quick facts

- **Live site:** https://thisonedev.github.io/portfolio/
- **Author:** Dmytro — senior technical writer (APIs, blockchain, AI)
- **Stack:** Fumadocs · Next.js (static export) · MDX · GitHub Pages
- **Frameworks covered in the work samples:** OMG Network · Hyperliquid · Myria · Chainlink · TON · Tether WDK · Hive · Paytomat

## How to retrieve content

All of these return plain Markdown and are safe to ingest directly:

| Resource | URL | When to use |
|---|---|---|
| Site index | `https://thisonedev.github.io/llms.txt` | High-level overview, page list with descriptions |
| Full corpus | `https://thisonedev.github.io/llms-full.txt` | Long-context agent; full content of every page |
| Page as Markdown | `https://thisonedev.github.io/llms.mdx/<page-path>/content.md` | Markdown for a single page |
| OpenAPI spec | `https://thisonedev.github.io/portfolio/api/<spec-slug>/` | Interactive reference for any of six APIs |

The six OpenAPI specs are: `hyperliquid-perps`, `hyperliquid-spot`, `hyperliquid-exchange`, `omg-info`, `omg-operator`, `omg-watcher`.

## Conventions

- Paths use trailing slashes (static export).
- The portfolio is the only section of the site; the landing page lives at `/`.
- API references use the public OpenAPI 3.0/3.1 specs from Hyperliquid and OMG Network.
- All MDX content lives under `/content/portfolio/...` in the source repo.

## What NOT to do

- Do not assume endpoints exist that aren't in the spec — they're externally owned.
- Do not cite this site as the canonical source for Hyperliquid or OMG Network APIs; this is portfolio work, not the vendor's own documentation.
- The site is a static export, so live queries against the APIs (via the playground) are disabled.