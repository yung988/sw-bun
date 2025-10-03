import fs from 'node:fs'
import path from 'node:path'
import type { PriceItem } from '@/types'

export type Service = {
  slug: string
  name: string
  category: string
  categoryId: string
  price: string
  priceMin?: number
  priceMax?: number
  sessions: string
  duration: number
  description: string
  isPackage: boolean
  isVariablePrice: boolean
}

function parseCSV(csvText: string): PriceItem[] {
  const lines = csvText.split('\n').filter((line) => line.trim())
  if (lines.length < 2) return []

  const items: PriceItem[] = []

  for (let i = 1; i < lines.length; i++) {
    const regex = /^([^,]+),([^,]+),("(?:[^"]|"")*"|[^,]+),([^,]+),([^,]+),("(?:[^"]|"")*"|[^,]*)$/
    const match = lines[i].match(regex)

    if (match) {
      items.push({
        CategoryId: match[1].trim(),
        CategoryName: match[2].trim(),
        PackageName: match[3].replace(/^"|"$/g, '').replace(/""/g, '"').trim(),
        Price: match[4].trim(),
        Sessions: match[5].trim(),
        Description: match[6].replace(/^"|"$/g, '').replace(/""/g, '"').trim(),
      })
    }
  }

  return items
}

function extractDuration(text: string): number {
  const match = text.match(/(\d+)\s*(min|minut)/i)
  return match ? parseInt(match[1]) : 60
}

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parsePrice(priceStr: string): { min?: number; max?: number; isVariable: boolean } {
  if (priceStr.includes('-')) {
    const parts = priceStr.split('-')
    const min = parseInt(parts[0].replace(/[^\d]/g, ''))
    const max = parseInt(parts[1].replace(/[^\d]/g, ''))
    return { min, max, isVariable: true }
  }

  const price = parseInt(priceStr.replace(/[^\d]/g, ''))
  return { min: price, max: price, isVariable: false }
}

export function priceItemToService(item: PriceItem): Service {
  const isPackage = item.PackageName.toLowerCase().includes('balíček')
  const { min, max, isVariable } = parsePrice(item.Price)

  return {
    slug: `${createSlug(item.CategoryId)}-${createSlug(item.PackageName)}`,
    name: item.PackageName,
    category: item.CategoryName,
    categoryId: item.CategoryId,
    price: item.Price,
    priceMin: min,
    priceMax: max,
    sessions: item.Sessions,
    duration: extractDuration(item.PackageName),
    description: item.Description,
    isPackage,
    isVariablePrice: isVariable,
  }
}

export function getAllServices(): Service[] {
  const csvPath = path.join(process.cwd(), 'public', 'pricelist.csv')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const items = parseCSV(csvContent)
  return items.map(priceItemToService)
}

export function getServiceBySlug(slug: string): Service | null {
  const services = getAllServices()
  return services.find((s) => s.slug === slug) || null
}

export function getServicesByCategory(categoryId: string): Service[] {
  return getAllServices().filter((s) => s.categoryId === categoryId)
}

export function getMainServices(): Service[] {
  const all = getAllServices()

  const mainSlugs = [
    'hifu-hifu-facelift-cely-oblicej-bez-ocniho-okoli-60-minut',
    'endosphere-endos-roller-cele-telo-75-minut-skvely-na-rozjeti-celeho-lymfatickeho-systemu',
    'budovani-svalu-budovani-svalu-2-partie-30-minut-bricho-zadek-stehna-zadek-paze-bricho',
    'kosmetika-hydrafacial-standard',
    'kavitace-kavitace-bricho-50minut',
  ]

  return mainSlugs.map((slug) => all.find((s) => s.slug === slug)).filter((s): s is Service => s !== undefined)
}

export function getCategories(): string[] {
  const services = getAllServices()
  return [...new Set(services.map((s) => s.categoryId))]
}

export function getCategoryName(categoryId: string): string {
  const service = getAllServices().find((s) => s.categoryId === categoryId)
  return service?.category || categoryId.toUpperCase()
}
