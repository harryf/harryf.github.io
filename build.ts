#!/usr/bin/env bun
/**
 * build.ts — regenerates index.html for harryf.github.io
 *
 * Scans the repo for *.html pages, extracts a title and last-modified date
 * for each, and writes a styled index.html listing them newest-first.
 *
 * A page is EXCLUDED from the index (but still served) when it lives under a
 * `private/` directory. The root index.html itself is never listed.
 *
 * Run locally with `bun build.ts`; CI runs it on every push (see
 * .github/workflows/deploy.yml).
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, basename, dirname } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const EXCLUDE_DIRS = new Set(["node_modules", "private"]);

type Page = { url: string; title: string; iso: string };

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue; // skip .git, .github, dotfiles
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue;
      walk(full, acc);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      acc.push(full);
    }
  }
  return acc;
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function titleFor(file: string, html: string): string {
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (t && t[1].trim()) return decode(t[1].replace(/\s+/g, " "));
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) {
    const txt = decode(h1[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " "));
    if (txt) return txt;
  }
  // Fall back to a humanised filename.
  const name = basename(file).replace(/\.html?$/i, "");
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function isoDate(rel: string): string {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", rel], {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
    if (out) return out;
  } catch {
    /* not committed yet or not a git repo — fall through */
  }
  try {
    return statSync(join(ROOT, rel)).mtime.toISOString();
  } catch {
    return new Date(0).toISOString();
  }
}

function urlFor(rel: string): string {
  // A folder's own index.html links to the folder; other pages link directly.
  if (basename(rel).toLowerCase() === "index.html") {
    const d = dirname(rel);
    return d === "." ? "/" : `/${d}/`;
  }
  return `/${rel}`;
}

const files = walk(ROOT);
const pages: Page[] = files
  .map((f) => relative(ROOT, f).split("\\").join("/"))
  .filter((rel) => rel.toLowerCase() !== "index.html") // never list the homepage
  .map((rel) => {
    const html = readFileSync(join(ROOT, rel), "utf8");
    return { url: urlFor(rel), title: titleFor(rel, html), iso: isoDate(rel) };
  })
  .sort((a, b) => (a.iso < b.iso ? 1 : a.iso > b.iso ? -1 : 0));

const fmt = (iso: string) => (iso > "1970" ? iso.slice(0, 10) : "");

const items =
  pages.length === 0
    ? `      <li class="empty">No pages yet — drop an <code>.html</code> file in the repo and push.</li>`
    : pages
        .map(
          (p) => `      <li>
        <a href="${esc(p.url)}">${esc(p.title)}</a>
        <span class="meta"><time>${fmt(p.iso)}</time><code>${esc(p.url)}</code></span>
      </li>`
        )
        .join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>harryf.github.io</title>
  <style>
    :root { color-scheme: light dark; }
    * { box-sizing: border-box; }
    body {
      font: 16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      max-width: 46rem; margin: 0 auto; padding: 4rem 1.5rem 6rem;
      color: #1a1a1a; background: #fafafa;
    }
    @media (prefers-color-scheme: dark) { body { color: #e6e6e6; background: #121212; } }
    header h1 { font-size: 1.6rem; margin: 0 0 .25rem; letter-spacing: -0.01em; }
    header p { margin: 0 0 2.5rem; opacity: .6; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { padding: .85rem 0; border-bottom: 1px solid rgba(128,128,128,.2); }
    li a { font-size: 1.1rem; text-decoration: none; color: inherit; font-weight: 500; }
    li a:hover { text-decoration: underline; }
    .meta { display: flex; gap: 1rem; margin-top: .25rem; font-size: .8rem; opacity: .55; }
    .meta code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    .empty { opacity: .55; }
    footer { margin-top: 3rem; font-size: .8rem; opacity: .45; }
  </style>
</head>
<body>
  <header>
    <h1>harryf.github.io</h1>
    <p>One-off pages &amp; experiments.</p>
  </header>
  <main>
    <ul>
${items}
    </ul>
  </main>
  <footer>Index generated automatically on each push.</footer>
</body>
</html>
`;

writeFileSync(join(ROOT, "index.html"), html);
console.log(`Wrote index.html — ${pages.length} page(s) listed.`);
