#!/usr/bin/env node
// Turns raw clips in media/videos/ into small, web-ready 9:16 MP4s + poster images.
//   npm run videos                 encode new or changed clips
//   npm run videos -- --force      re-encode everything
//   npm run videos -- --poster=3   take the thumbnail 3 seconds in (default 1.5)
// Output goes to site/assets/videos/<name>.mp4 and <name>.jpg.
import { execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { resolve, extname, basename } from 'node:path';
import { ffmpeg, ffprobe } from './ffmpeg.mjs';

const ROOT = resolve(import.meta.dirname, '..');
const IN = resolve(ROOT, 'media/videos');
const OUT = resolve(ROOT, 'site/assets/videos');
const force = process.argv.includes('--force');
const posterArg = process.argv.find((a) => a.startsWith('--poster='));
const posterAt = posterArg ? Number(posterArg.split('=')[1]) || 1.5 : 1.5;
const VIDEO = new Set(['.mp4', '.mov', '.m4v', '.webm', '.mkv', '.avi']);

mkdirSync(IN, { recursive: true });
mkdirSync(OUT, { recursive: true });

const slug = (s) => s.normalize('NFKD').replace(/[^\w\s-]/g, '').trim().toLowerCase()
  .replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 60) || 'video';

const clips = readdirSync(IN).filter((f) => VIDEO.has(extname(f).toLowerCase())).sort();
if (!clips.length) {
  console.log('No clips found. Drop your raw videos into media/videos/ and run this again.');
  process.exit(0);
}

const mb = (p) => (statSync(p).size / 1048576).toFixed(1);
const run = (args) => execFileSync(ffmpeg, args, { stdio: ['ignore', 'ignore', 'pipe'] });
const done = [];

for (const file of clips) {
  const src = resolve(IN, file);
  const name = slug(basename(file, extname(file)));
  const mp4 = `${OUT}/${name}.mp4`;
  const jpg = `${OUT}/${name}.jpg`;
  done.push(name);
  if (!force && existsSync(mp4) && existsSync(jpg) && statSync(mp4).mtimeMs > statSync(src).mtimeMs) {
    console.log(`${name}: up to date`);
    continue;
  }

  const probe = JSON.parse(execFileSync(ffprobe, [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'json', src,
  ]).toString());
  const { width, height } = probe.streams[0];
  const duration = Number(probe.format?.duration) || 0;
  const vertical = height >= width;

  // 9:16 target. Vertical sources scale to fit; landscape sources are centre-cropped to 9:16.
  const filter = (w, h) => vertical
    ? `scale=${w}:${h}:force_original_aspect_ratio=decrease,pad=${w}:${h}:(ow-iw)/2:(oh-ih)/2:color=black`
    : `crop=ih*9/16:ih,scale=${w}:${h}`;

  process.stdout.write(`${name}: encoding… `);
  run(['-y', '-i', src,
    '-vf', filter(720, 1280),
    '-c:v', 'libx264', '-profile:v', 'high', '-crf', '27', '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-r', '30',
    '-c:a', 'aac', '-b:a', '128k', '-ac', '2',
    mp4]);
  const at = duration && posterAt >= duration ? 0 : posterAt;
  run(['-y', '-ss', String(at), '-i', src, '-frames:v', '1', '-vf', filter(1080, 1920), '-q:v', '4', jpg]);
  console.log(`${mb(src)} MB → ${mb(mp4)} MB${vertical ? '' : ' (landscape, cropped to 9:16)'}`);
}

console.log('\nPaste these into ugc.videos in site/content.js:\n');
for (const name of done) {
  console.log(`  videoUrl: "assets/videos/${name}.mp4", poster: "assets/videos/${name}.jpg",`);
}
