#!/usr/bin/env node
// Generate favicon.ico from an SVG source.
// Usage: node scripts/generate-favicon.mjs [inputSvg] [outputIco]

import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import pngToIco from 'png-to-ico'
import sharp from 'sharp'

const INPUT = process.argv[2] || path.join(process.cwd(), 'public', 'logo.svg')
const OUTPUT = process.argv[3] || path.join(process.cwd(), 'public', 'favicon.ico')

const SIZES = [16, 32, 48, 64, 128, 256]

async function ensureFile(p) {
  try {
    const st = await fs.stat(p)
    if (!st.isFile()) throw new Error('not a file')
  } catch (e) {
    console.error(`[favicon] Input not found: ${p}`)
    process.exit(1)
  }
}

async function svgToPngBuffers(svgPath) {
  const buffers = []
  const svgBuf = await fs.readFile(svgPath)
  for (const size of SIZES) {
    const buf = await sharp(svgBuf, { density: 512 })
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
    buffers.push(buf)
  }
  return buffers
}

async function main() {
  await ensureFile(INPUT)
  console.log(`[favicon] Generating from ${path.relative(process.cwd(), INPUT)} ...`)
  const pngBuffers = await svgToPngBuffers(INPUT)
  const ico = await pngToIco(pngBuffers)
  await fs.writeFile(OUTPUT, ico)
  console.log(`[favicon] Wrote ${path.relative(process.cwd(), OUTPUT)} with sizes ${SIZES.join(', ')}px`)
}

main().catch((err) => {
  console.error('[favicon] Failed:', err)
  process.exit(1)
})

