#!/usr/bin/env node
// Reads site/content.js, writes the <head> tags Google and link previews need
// into site/index.html, and warns about files content.js points to that don't exist.
// Runs on every Vercel deploy and whenever `npm run dev` starts.
//   node tools/build.mjs
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';

const ROOT = resolve(import.meta.dirname, '..');
const SITE = resolve(ROOT, 'site');
const CONTENT = resolve(SITE, 'content.js');
const HTML = resolve(SITE, 'index.html');

export function loadContent() {
  const window = {};
  try {
    vm.runInNewContext(readFileSync(CONTENT, 'utf8'), { window }, { filename: 'site/content.js' });
  } catch (err) {
    const where = /site\/content\.js:(\d+)/.exec(err.stack || '');
    const e = new Error(
      `site/content.js has a mistake${where ? ` around line ${where[1]}` : ''}: ${err.message}\n` +
      'Usually a missing comma between items, or a missing quote or bracket.');
    e.friendly = true;
    throw e;
  }
  if (!window.PORTFOLIO || typeof window.PORTFOLIO !== 'object') {
    const e = new Error('site/content.js must set window.PORTFOLIO = { ... }');
    e.friendly = true;
    throw e;
  }
  return window.PORTFOLIO;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function siteUrl(site) {
  const raw = (site.url || '').trim() || process.env.VERCEL_PROJECT_PRODUCTION_URL || '';
  if (!raw) return '';
  return (/^https?:\/\//.test(raw) ? raw : 'https://' + raw).replace(/\/+$/, '');
}

function letterIcon(name, accent) {
  const letter = esc((name.trim()[0] || '•').toUpperCase());
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="${esc(accent)}"/>` +
    `<text x="32" y="44" text-anchor="middle" font-family="-apple-system,Helvetica,Arial,sans-serif" font-size="36" font-weight="700" fill="#fff">${letter}</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

function headTags(P) {
  const site = P.site || {};
  const theme = P.theme || {};
  const name = (site.name || 'Your Name').trim();
  const role = (site.role || '').trim();
  const title = (site.title || '').trim() || [name, role].filter(Boolean).join(' — ');
  const description = (site.description || '').trim();
  const base = siteUrl(site);
  const abs = (p) => (/^https?:\/\//.test(p) || !base ? p : `${base}/${p.replace(/^\.?\//, '')}`);
  const accent = theme.accent || (theme.preset === 'clean' ? '#2F5BFF' : '#FF5A1F');

  const tags = [`<title>${esc(title)}</title>`];
  if (description) tags.push(`<meta name="description" content="${esc(description)}">`);
  tags.push(`<meta property="og:title" content="${esc(title)}">`);
  if (description) tags.push(`<meta property="og:description" content="${esc(description)}">`);
  tags.push('<meta property="og:type" content="website">');
  if (base) tags.push(`<meta property="og:url" content="${esc(base)}/">`, `<link rel="canonical" href="${esc(base)}/">`);
  if (site.shareImage) tags.push(`<meta property="og:image" content="${esc(abs(site.shareImage))}">`);
  tags.push(`<meta name="twitter:card" content="${site.shareImage ? 'summary_large_image' : 'summary'}">`);
  tags.push(`<link rel="icon" href="${esc(site.favicon || letterIcon(name, accent))}">`);
  tags.push(`<meta name="theme-color" content="${theme.preset === 'dark' ? '#0C0C0D' : theme.preset === 'clean' ? '#FFFFFF' : '#F3F0EB'}">`);
  return tags.join('\n');
}

// Every "assets/…" string anywhere in content.js should be a real file.
function missingFiles(P) {
  const found = new Set();
  const walk = (v) => {
    if (typeof v === 'string') { if (/^\.?\/?assets\//.test(v)) found.add(v.replace(/^\.?\//, '')); }
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(P);
  const missing = [], heavy = [];
  for (const rel of found) {
    const file = resolve(SITE, rel);
    if (!existsSync(file)) missing.push(rel);
    else if (statSync(file).size > 40 * 1048576) heavy.push(rel);
  }
  return { missing, heavy };
}

export function build({ quiet = false } = {}) {
  const P = loadContent();
  const html = readFileSync(HTML, 'utf8');
  const block = /(<!-- seo:start[^>]*-->\n)[\s\S]*?(\n<!-- seo:end -->)/;
  if (!block.test(html)) throw new Error('site/index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers');
  const next = html.replace(block, (_m, open, close) => open + headTags(P) + close);
  if (next !== html) writeFileSync(HTML, next);

  const { missing, heavy } = missingFiles(P);
  if (!quiet) {
    const name = (P.site && P.site.name) || '';
    console.log(`✓ built head tags for "${name}"`);
    if (!siteUrl(P.site || {})) console.log('  tip: set site.url in content.js so link previews work everywhere');
    if (name === 'Your Name') console.log('  tip: you’re still using the sample content — edit site/content.js');
  }
  for (const rel of missing) console.warn(`⚠ content.js points to a file that doesn't exist: site/${rel}`);
  for (const rel of heavy) console.warn(`⚠ site/${rel} is over 40 MB — run \`npm run videos\` to shrink it`);
  return P;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    build();
  } catch (err) {
    console.error(`\n✗ ${err.friendly ? err.message : err.stack}\n`);
    process.exit(1);
  }
}
