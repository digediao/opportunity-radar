// GitHub Pages build entrypoint: refresh the radar, then mirror the generated site
// to docs/, the directory selected by GitHub Pages.
import { cp } from 'node:fs/promises';
import { resolve } from 'node:path';

await import('./run.mjs');

const root = resolve(import.meta.dirname, '..');
await cp(resolve(root, 'site'), resolve(root, 'docs'), { recursive: true, force: true });
console.log('Mirrored generated site to docs/ for GitHub Pages.');
