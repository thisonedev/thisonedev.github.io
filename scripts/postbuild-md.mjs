import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * Generates `.md` files for every page so crawlers can fetch them
 * directly. Spins up `next dev`, hits `/llms.mdx/<path>/content.md`
 * per page, and writes the body to `out/llms.mdx/<path>/content.md`.
 * Static export creates the directory but doesn't always write the
 * `.md` sibling, so this script fills in any gaps.
 */

const PORT = process.env.POSTBUILD_PORT ?? '3100';
const BASE = `http://localhost:${PORT}`;
const outDir = path.join(process.cwd(), 'out');

async function waitForServer(child) {
  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    // Bails out early if `next dev` already exited (another dev server
    // holds the port, so Next aborts instead of waiting).
    if (child.exitCode !== null) {
      throw new Error(`dev server exited with code ${child.exitCode} before becoming ready`);
    }
    try {
      const res = await fetch(`${BASE}/llms.txt`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`dev server did not become ready on ${BASE}`);
}

async function fetchWithRetry(url, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`failed to fetch ${url} after ${attempts} attempts`);
}

async function main() {
  const { readFile } = await import('node:fs/promises');
  const sitemap = await readFile(path.join(outDir, 'sitemap.xml'), 'utf8');
  const sitemapMdUrls = [...sitemap.matchAll(/<loc>([^<]+\/content\.md)<\/loc>/g)].map((m) => m[1]);

  console.log(`[postbuild] found ${sitemapMdUrls.length} sitemap MD URLs`);

  // `detached: true` puts the child in its own process group so the
  // SIGTERM below kills the whole tree, not just `npx`.
  console.log(`[postbuild] starting dev server on :${PORT}…`);
  const dev = spawn('npx', ['next', 'dev', '-p', PORT], {
    stdio: ['ignore', 'pipe', 'pipe'],
    cwd: process.cwd(),
    env: { ...process.env, NODE_ENV: 'development' },
    detached: true,
  });
  dev.stdout.on('data', () => {});
  dev.stderr.on('data', (chunk) => process.stderr.write(`[next dev] ${chunk}`));
  dev.unref();

  try {
    await waitForServer(dev);

    let written = 0;
    for (const sitemapUrl of sitemapMdUrls) {
      try {
        const pathname = new URL(sitemapUrl).pathname;
        const res = await fetchWithRetry(`${BASE}${pathname}`);
        const body = await res.text();

        // Canonical path under /llms.mdx/<path>/content.md (what the route returns)
        const canonical = path.join(outDir, pathname);
        await mkdir(path.dirname(canonical), { recursive: true });
        await writeFile(canonical, body, 'utf8');
        written++;

        // Mirror at /portfolio/<slug>.md for crawlers that append `.md`
        // to the HTML URL they landed on.
        if (pathname.startsWith('/llms.mdx/')) {
          const slug = pathname.replace(/^\/llms\.mdx\//, '').replace(/\/content\.md$/, '');
          if (slug) {
            const mirror = path.join(outDir, 'portfolio', `${slug}.md`);
            await mkdir(path.dirname(mirror), { recursive: true });
            await writeFile(mirror, body, 'utf8');
            written++;
          }
        }
      } catch (err) {
        console.warn(`[postbuild] skipping ${sitemapUrl} (${err.message})`);
      }
    }

    console.log(`[postbuild] wrote ${written} .md files`);
  } finally {
    try {
      process.kill(-dev.pid, 'SIGTERM');
    } catch {}
    setTimeout(() => {
      try {
        process.kill(-dev.pid, 'SIGKILL');
      } catch {}
      process.exit(0);
    }, 2000);
  }
}

main().catch((err) => {
  console.error('[postbuild] failed:', err);
  process.exit(1);
});
