import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

/** Tags nav/sidebar/TOC chrome with `data-markdown-ignore` so HTML→MD converters skip it. */

const outDir = path.join(process.cwd(), 'out');

/** Selector patterns for Fumadocs chrome plus skip-link elements outside that namespace. */
const TAG_PATTERNS = [
  /<header\b[^>]*\bid="nd-subnav"[^>]*>/,
  /<header\b[^>]*\bid="nd-nav"[^>]*>/,
  /<nav\b[^>]*\baria-label="Main"[^>]*>/,
  /<nav\b[^>]*\baria-label="Breadcrumb"[^>]*>/,
  /<aside\b[^>]*\bid="nd-sidebar"(?:-mobile)?[^>]*>/,
  /<div\b[^>]*\bid="nd-toc"[^>]*>/,
  /<div\b[^>]*\bdata-toc-popover=""[^>]*>/,
  /<div\b[^>]*\bdata-toc-popover-content[^>]*>/,
  /<div\b[^>]*\bdata-page-footer[^>]*>/,
  /<a\b[^>]*\bhref="#content-area"[^>]*>/,
  /<p\b[^>]*\bclass="text-lg text-fd-muted-foreground mb-0"[^>]*>/,
  /<div\b[^>]*\bclass="flex flex-row gap-2 items-center border-b pb-6"[^>]*>/,
  /<div\b[^>]*\bclass="@container grid gap-4 grid-cols-2"[^>]*>/,
];

const ATTR = 'data-markdown-ignore="true"';

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) yield full;
  }
}

function tagChrome(html) {
  let tagged = 0;
  const out = html.replace(
    new RegExp(TAG_PATTERNS.map((p) => `(?:${p.source})`).join('|'), 'g'),
    (match) => {
      if (match.includes('data-markdown-ignore=')) return match;
      tagged++;
      return match.replace(/\s*(\/?>)$/, ` ${ATTR}$1`);
    },
  );
  return { html: out, tagged };
}

let totalFiles = 0;
let totalTagged = 0;
for await (const file of walk(outDir)) {
  const original = await readFile(file, 'utf8');
  const { html, tagged } = tagChrome(original);
  if (tagged > 0) {
    await writeFile(file, html, 'utf8');
    totalFiles++;
    totalTagged += tagged;
  }
}

console.log(
  `[postbuild-md-ignore] tagged ${totalTagged} element(s) across ${totalFiles} HTML file(s)`,
);
