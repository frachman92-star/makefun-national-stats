// Nusantara Stats — entry program (Node 22, standard library only).
//
// What this does, in three steps:
//   1. Copies the static site in app/ into the output directory.
//   2. Copies the screenshots/ folder next to it.
//   3. Writes dossier.json there, using the vendored make.fun library,
//      so the judge can read the screenshots, the first-load files and
//      bytes, and the source.
//
// The site itself is plain static files (HTML, CSS, ES modules) with no
// build step and no network use; everything it shows lives in app/.
//
// vendor/makefun-frontend.ts must stay untouched: the scorer requires
// dossier.json to be byte-for-byte what that library writes.
//
// Outside the grader's container, set MAKEFUN_OUTPUT_DIR to choose the
// output directory (it stands in for /output):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// Directory holding this file; app/ and screenshots/ sit beside it.
const root = dirname(fileURLToPath(import.meta.url));

// Where the entry goes: the grader's /output, or MAKEFUN_OUTPUT_DIR locally.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyTree(source, target) {
  if (!existsSync(source)) return;
  mkdirSync(target, { recursive: true });
  cpSync(source, target, { recursive: true });
}

mkdirSync(outputDir, { recursive: true });
copyTree(join(root, 'app'), join(outputDir, 'app'));
copyTree(join(root, 'screenshots'), join(outputDir, 'screenshots'));

// Caps from the competition's gate (reference/gate.json): text_max_bytes
// is the one that shapes the dossier's bytes; the rest refuse entries the
// scorer would refuse (more than 4 screenshots, one over 256 KiB, more
// than 993 files/dirs in app/, or app/ over 16 MiB).
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
