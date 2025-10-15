import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { PriceItem } from '@/types'
import { NextResponse } from 'next/server'

function parseCSV(text: string): PriceItem[] {
  const cleaned = text.replace(/\ufeff/g, '')
  const lines = cleaned.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length < 2) return []

  const parseLine = (line: string): string[] => {
    const out: string[] = []
    let cur = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (ch === ',' && !inQuotes) {
        out.push(cur)
        cur = ''
      } else {
        cur += ch
      }
    }
    out.push(cur)
    return out.map((s) => s.trim())
  }

  const header = parseLine(lines[0])
  const idx = (name: string) => header.indexOf(name)

  const res: PriceItem[] = []
  for (let l = 1; l < lines.length; l++) {
    const cols = parseLine(lines[l])
    const item: PriceItem = {
      CategoryId: cols[idx('Category')] ?? '',
      CategoryName: cols[idx('Category')] ?? '',
      PackageName: cols[idx('PackageName')] ?? '',
      Price: cols[idx('Price')] ?? '',
      Sessions: cols[idx('Sessions')] ?? '',
      Price_Cleaned: cols[idx('Price_Cleaned')] ?? '',
      Image: cols[idx('Image')] ?? '',
      Description: cols[idx('Description')] ?? '',
    }
    if (item.CategoryId || item.CategoryName || item.PackageName) {
      res.push(item)
    }
  }
  return res
}

export async function GET() {
  try {
    const file = path.join(process.cwd(), 'public', 'swbeauty-procedury.csv')
    const csv = await fs.readFile(file, 'utf-8')
    const items = parseCSV(csv)
    return NextResponse.json(items)
  } catch (_error) {
    return NextResponse.json({ error: 'Nepodařilo se načíst ceník' }, { status: 500 })
  }
}
