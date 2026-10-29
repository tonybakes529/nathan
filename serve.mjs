// Local preview: `npm run dev`, then open http://localhost:4321
// Re-runs the build whenever content.js changes, so a page refresh shows your edits.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
import { build } from './tools/build.mjs';

const ROOT = resolve(import.meta.dirname, 'site');
const CONTENT = join(ROOT, 'content.js');
const PORT = Number(process.env.PORT || 4321);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime', '.woff2': 'font/woff2',
};

let builtAt = 0;
async function rebuildIfChanged() {
  const { mtimeMs } = await stat(CONTENT);
  if (mtimeMs === builtAt) return;
  builtAt = mtimeMs;
  try { build({ quiet: true }); }
  catch (err) { console.error(`\n✗ ${err.friendly ? err.message : err.stack}\n`); }
}

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const file = join(ROOT, p);
    if (!file.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }
    if (p === '/index.html') await rebuildIfChanged();
    const { size } = await stat(file);
    const headers = { 'content-type': TYPES[extname(file).toLowerCase()] || 'application/octet-stream', 'accept-ranges': 'bytes', 'cache-control': 'no-cache' };

    // Safari only plays video when the server supports byte ranges.
    const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
    if (range) {
      const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
      const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
      res.writeHead(206, { ...headers, 'content-range': `bytes ${start}-${end}/${size}`, 'content-length': end - start + 1 });
      createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, { ...headers, 'content-length': size });
    createReadStream(file).pipe(res);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' }).end('not found');
  }
}).listen(PORT, async () => {
  await rebuildIfChanged();
  console.log(`Previewing your portfolio at http://localhost:${PORT}  (Ctrl+C to stop)`);
});
