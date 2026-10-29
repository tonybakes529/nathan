// Shared lookup for the ffmpeg/ffprobe binaries that `npm install` downloads.
// Falls back to a system install (e.g. `brew install ffmpeg`) if those aren't there.
import { execFileSync } from 'node:child_process';

async function pick(pkg, read, cmd) {
  try {
    const mod = await import(pkg);
    const path = read(mod.default);
    if (path) return path;
  } catch {}
  try {
    execFileSync(cmd, ['-version'], { stdio: 'ignore' });
    return cmd;
  } catch {}
  console.error(`\n✗ ${cmd} isn't available. Run \`npm install\` in this folder first, then try again.\n`);
  process.exit(1);
}

export const ffmpeg = await pick('ffmpeg-static', (m) => m, 'ffmpeg');
export const ffprobe = await pick('ffprobe-static', (m) => m && m.path, 'ffprobe');
