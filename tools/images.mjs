#!/usr/bin/env node
// Shrinks oversized photos in site/assets/ so the site loads fast.
//   npm run images
// • Resizes anything wider than it needs to be (logos 420px, headshots 200px, everything else 1600px).
// • Turns big PNG photos into JPG (or WebP when they have see-through areas) and updates
//   the paths in site/content.js. Logos stay PNG.
// • Keeps every original in media/originals/ in case you want it back.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync, statSync, mkdirSync, copyFileSync, renameSync, unlinkSync, existsSync } from 'node:fs';
import { resolve, relative, extname, dirname, join } from 'node:path';
import { ffmpeg, ffprobe } from './ffmpeg.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const SITE = resolve(ROOT, 'site');
const ASSETS = resolve(SITE, 'assets');
const CONTENT = resolve(SITE, 'content.js');
const BACKUP = resolve(ROOT, 'media/originals');
const IMG = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const walk = (dir) => (existsSync(dir) ? readdirSync(dir, { withFileTypes: true }) : []).flatMap((e) =>
  e.isDirectory() ? walk(join(dir, e.name)) : IMG.has(extname(e.name).toLowerCase()) ? [join(dir, e.name)] : []);

const maxWidth = (rel) => (/\/logos?\//i.test('/' + rel) ? 420 : /headshot|avatar/i.test(rel) ? 200 : 1600);
const kb = (p) => statSync(p).size / 1024;
const probe = (p) => JSON.parse(execFileSync(ffprobe, ['-v', 'error', '-select_streams', 'v:0',
  '-show_entries', 'stream=width,pix_fmt', '-of', 'json', p]).toString()).streams[0];

// Many PNGs carry a transparency channel that's fully opaque; only treat it as transparent if a pixel actually is.
function usesAlpha(p, pixFmt) {
  if (!/a|pal8/.test(pixFmt || '')) return false;
  try {
    const out = execFileSync(ffmpeg, ['-v', 'error', '-i', p, '-vf',
      'alphaextract,signalstats,metadata=print:key=lavfi.signalstats.YMIN:file=-', '-f', 'null', '-']).toString();
    const m = /YMIN=(\d+)/.exec(out);
    return !m || Number(m[1]) < 250;
  } catch { return true; }
}

let content = readFileSync(CONTENT, 'utf8');
let before = 0, after = 0, changed = 0;

for (const file of walk(ASSETS)) {
  const rel = relative(SITE, file).split('\\').join('/');
  const ext = extname(file).toLowerCase();
  const { width, pix_fmt } = probe(file);
  const limit = maxWidth(rel);
  const size = kb(file);
  const isLogo = limit === 420;
  const convert = ext === '.png' && !isLogo && size > 300;
  if (width <= limit && size < 600 && !convert) continue;

  // PNG photo → JPG, or WebP if it has see-through areas (JPG would turn them black).
  const target = convert ? (usesAlpha(file, pix_fmt) ? '.webp' : '.jpg') : ext;
  const outRel = target === ext ? rel : rel.replace(/\.png$/i, target);
  const out = resolve(SITE, outRel);
  const tmp = out + '.tmp' + target;
  const vf = `scale='min(${limit},iw)':-2:flags=lanczos`;
  const args = target === '.jpg' || target === '.jpeg'
    ? ['-y', '-i', file, '-vf', vf, '-q:v', '4', '-pix_fmt', 'yuvj420p', tmp]
    : target === '.webp'
      ? ['-y', '-i', file, '-vf', vf, '-c:v', 'libwebp', '-quality', '82', tmp]
      : ['-y', '-i', file, '-vf', vf, '-compression_level', '100', tmp];
  execFileSync(ffmpeg, args, { stdio: ['ignore', 'ignore', 'pipe'] });

  if (kb(tmp) >= size) { unlinkSync(tmp); continue; }
  const backup = resolve(BACKUP, relative(ASSETS, file));
  mkdirSync(dirname(backup), { recursive: true });
  copyFileSync(file, backup);
  renameSync(tmp, out);
  if (outRel !== rel) { unlinkSync(file); content = content.split(rel).join(outRel); }

  before += size; after += kb(out); changed++;
  console.log(`${rel.padEnd(44)} ${(size / 1024).toFixed(2)} → ${(kb(out) / 1024).toFixed(2)} MB${outRel !== rel ? `  (now ${target})` : ''}`);
}

writeFileSync(CONTENT, content);
console.log(changed
  ? `\n${changed} image(s): ${(before / 1024).toFixed(1)} MB → ${(after / 1024).toFixed(1)} MB. Originals saved in media/originals/.`
  : 'All images are already web-sized.');
