#!/usr/bin/env node
/**
 * One-time batch convert JPG/JPEG/PNG (photos) to WebP using cwebp (libwebp).
 * Requires: brew install webp  (or cwebp on PATH)
 * Quality 92 for HD, crisp output. Skips favicon folder.
 */

import { readdirSync, statSync, unlinkSync, existsSync } from 'fs'
import { join, dirname, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_ROOT = join(__dirname, '..', 'public', 'images')
const QUALITY = 92
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.JPG']) // photos only; keep PNGs (logos, etc.)
const SKIP_DIRS = new Set(['favicon']) // keep favicons as PNG/ICO

function getAllImageFiles(dir, list = []) {
  const entries = readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) getAllImageFiles(full, list)
      continue
    }
    const ext = extname(e.name)
    if (EXTENSIONS.has(ext)) list.push(full)
  }
  return list
}

function toWebpPath(path) {
  const dir = dirname(path)
  const base = basename(path, extname(path))
  return join(dir, `${base}.webp`)
}

const files = getAllImageFiles(IMAGES_ROOT)
if (files.length === 0) {
  console.log('No JPG/PNG files found under public/images (excluding favicon).')
  process.exit(0)
}

console.log(`Converting ${files.length} images to WebP (quality ${QUALITY})...`)
let ok = 0
let fail = 0

for (const input of files) {
  const output = toWebpPath(input)
  const rel = input.replace(IMAGES_ROOT, 'public/images')
  const result = spawnSync('cwebp', ['-q', String(QUALITY), input, '-o', output], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  if (result.status === 0) {
    console.log('  ✓', rel, '→', basename(output))
    unlinkSync(input)
    ok++
  } else {
    console.error('  ✗', rel, result.stderr?.trim() || result.error?.message || 'failed')
    fail++
  }
}

console.log(`Done. ${ok} converted (originals removed), ${fail} failed.`)
process.exit(fail > 0 ? 1 : 0)
