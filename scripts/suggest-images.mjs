#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const CSV_PATH = path.join(ROOT, 'public/services/services.csv')
const IMAGES_ROOT = path.join(ROOT, 'public/images')

const args = new Set(process.argv.slice(2))
const WRITE = args.has('--write')
const AUGMENT = args.has('--augment')
const TOP_K = Number(process.env.TOP_K || 4)

function stripDiacritics(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function slugify(str) {
  return stripDiacritics(String(str).toLowerCase())
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function parseCsvLine(line) {
  const result = []
  let current = ''
  let inside = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      const next = line[i + 1]
      if (inside && next === '"') { current += '"'; i++; }
      else inside = !inside
      continue
    }
    if (ch === ',' && !inside) { result.push(current); current = ''; continue }
    current += ch
  }
  result.push(current)
  return result
}

function toCsvLine(cells) {
  return cells.map((c) => {
    const s = String(c ?? '')
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return '"' + s.replaceAll('"', '""') + '"'
    }
    return s
  }).join(',')
}

async function indexImages() {
  const map = [] // { base, rel, slug, segments }
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) await walk(p)
      else if (/\.(jpe?g|png|webp|gif)$/i.test(e.name)) {
        const rel = path.relative(IMAGES_ROOT, p).replaceAll('\\', '/')
        const base = e.name.toLowerCase()
        map.push({ base, rel, slug: slugify(base.replace(/\.[^.]+$/, '')), segments: rel.split('/') })
      }
    }
  }
  await walk(IMAGES_ROOT)
  return map
}

function isGeneric(img) {
  return !img || /service-(cosmetic|hifu|ems|endosphere|cavitace|ostatni|hair)\./.test(img)
}

function preferFolderFor(row) {
  const cat = (row.category || '').toLowerCase()
  const sub = (row.subcategory || '').toLowerCase()
  if (cat.includes('kosmet')) return 'kosmetika'
  if (cat.includes('hifu')) return 'hifu'
  if (sub.includes('ems') || cat.includes('sval') || cat.includes('tvarování')) return 'ems'
  if (cat.includes('kavit')) return 'kavitace'
  if (cat.includes('radio')) return 'radiofrekvence'
  if (cat.includes('endos')) return 'stylizované'
  return null
}

function scoreImage(row, img) {
  const nameSlug = slugify(row.name)
  const tokens = new Set(nameSlug.split('-').filter(Boolean))
  let score = 0
  for (const t of tokens) {
    if (!t || t.length < 3) continue
    if (img.slug.includes(t)) score += 2
  }
  const pref = preferFolderFor(row)
  if (pref && img.segments[0] === pref) score += 3
  // Keyword helpers
  const name = row.name.toLowerCase()
  if (name.includes('anti') && img.base.includes('anti')) score += 2
  if (name.includes('hydr') && img.base.includes('hydrat')) score += 2
  if (name.includes('propolis') && img.base.includes('propolis')) score += 2
  if (name.includes('rty') && (img.base.includes('rty') || img.base.includes('lip'))) score += 2
  if (name.includes('řas') && img.base.includes('rasy')) score += 2
  return score
}

function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let inside = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '"') {
      const next = text[i + 1]
      if (inside && next === '"') { cell += '"'; i++; }
      else inside = !inside
      continue
    }
    if (ch === ',' && !inside) { row.push(cell); cell = ''; continue }
    if ((ch === '\n' || ch === '\r') && !inside) {
      // handle CRLF and LF
      if (ch === '\r' && text[i + 1] === '\n') i++
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
      continue
    }
    cell += ch
  }
  // push last
  if (cell.length > 0 || row.length > 0) {
    row.push(cell)
    rows.push(row)
  }
  return rows
}

async function main() {
  const csvRaw = await fs.readFile(CSV_PATH, 'utf-8')
  const table = parseCsv(csvRaw)
  const header = table[0]
  const getIdx = (k) => header.findIndex((h) => h.trim().toLowerCase() === k)
  const idx = {
    category: getIdx('category'),
    subcategory: getIdx('subcategory'),
    name: getIdx('name'),
    image: getIdx('image'),
  }
  if (Object.values(idx).some((v) => v === -1)) {
    console.error('[suggest-images] Missing columns in CSV header.')
    process.exit(1)
  }

  const images = await indexImages()
  const validRel = new Set(images.map((i) => i.rel))
  const updated = []
  const outLines = [toCsvLine(header)]

  for (let i = 1; i < table.length; i++) {
    const cells = table[i]
    if (!cells || cells.length < header.length) { continue }
    const row = {
      category: cells[idx.category],
      subcategory: cells[idx.subcategory],
      name: cells[idx.name],
      image: (cells[idx.image] || '').trim(),
    }

    let current = row.image
    if (current.includes(',') || current.includes(';')) current = current.split(/[;,]/)[0].trim()

    // Build candidate list
    const scored = images.map((img) => ({ img, score: scoreImage(row, img) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)

    let existingList = (row.image || '')
      .split(/[;,]/)
      .map((v) => v.trim())
      .filter(Boolean)
    // drop invalid existing paths
    existingList = existingList.filter((p) => validRel.has(p))

    const existingSet = new Set(existingList)

    const chosen = []
    for (const { img, score } of scored) {
      if (chosen.length >= TOP_K) break
      if (score < 3) break
      if (existingSet.has(img.rel)) continue
      chosen.push(img.rel)
    }

    // If we already have a specific image and not augmenting, keep as-is
    if (!AUGMENT && !isGeneric(current)) {
      outLines.push(toCsvLine(cells))
      continue
    }

    let best = null
    let bestScore = -1
    for (const img of images) {
      const s = scoreImage(row, img)
      if (s > bestScore) { bestScore = s; best = img }
    }

    if (existingList.length || chosen.length) {
      const primary = !isGeneric(current) && existingList.length ? existingList[0] : (chosen[0] || current)
      const merged = [primary, ...existingList.slice(1), ...chosen]
      const unique = Array.from(new Set(merged.filter(Boolean)))
      cells[idx.image] = unique.join(', ')
      outLines.push(toCsvLine(cells))
      updated.push({ line: i + 1, name: row.name, image: cells[idx.image], score: chosen.length ? 'aug' : 'keep' })
    } else {
      outLines.push(toCsvLine(cells))
    }
  }

  if (WRITE) {
    const backup = CSV_PATH.replace(/\.csv$/i, `.backup.${Date.now()}.csv`)
    await fs.writeFile(backup, csvRaw, 'utf-8')
    await fs.writeFile(CSV_PATH, outLines.join('\n') + '\n', 'utf-8')
    console.log(`[suggest-images] Updated ${updated.length} rows. Backup: ${path.basename(backup)}`)
  } else {
    console.log(`[suggest-images] Would update ${updated.length} rows. Run with --write to apply.`)
    for (const u of updated.slice(0, 20)) {
      console.log(`  L${u.line}: ${u.name} -> ${u.image} (score=${u.score})`)
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
