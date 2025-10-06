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
  return match ? Number.parseInt(match[1]) : 60
}

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^ -~]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parsePrice(priceStr: string): { min?: number; max?: number; isVariable: boolean } {
  if (priceStr.includes('-')) {
    const parts = priceStr.split('-')
    const min = Number.parseInt(parts[0].replace(/[^\d]/g, ''))
    const max = Number.parseInt(parts[1].replace(/[^\d]/g, ''))
    return { min, max, isVariable: true }
  }

  const price = Number.parseInt(priceStr.replace(/[^\d]/g, ''))
  return { min: price, max: price, isVariable: false }
}

export function priceItemToService(item: PriceItem): Service {
  const nameLower = item.PackageName.toLowerCase()
  const isPackage = nameLower.includes('balíček') || nameLower.includes('baličck') || nameLower.includes('balicek')
  const { min, max, isVariable } = parsePrice(item.Price)

  return {
    slug: `${createSlug(item.CategoryId)}-${createSlug(item.PackageName)}`,
    name: item.PackageName,
    category: item.CategoryName,
    categoryId: item.CategoryId.toLowerCase(),
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

// Cache for parsed services (improves performance)
let servicesCache: Service[] | null = null

export function getAllServices(): Service[] {
  // Return cached version if available
  if (servicesCache) {
    return servicesCache
  }

  // Parse CSV and cache the result
  const csvPath = path.join(process.cwd(), 'public', 'pricelist.csv')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')
  const items = parseCSV(csvContent)
  servicesCache = items.map(priceItemToService)

  return servicesCache
}

// Helper to clear cache (useful for development or if CSV changes)
export function clearServicesCache() {
  servicesCache = null
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
  const mainServices: Service[] = []

  // Get first non-package service from each major category
  const hifu = all.find((s) => s.categoryId === 'hifu' && !s.isPackage && s.name.includes('facelift celý obličej'))
  if (hifu) mainServices.push(hifu)

  const endosphere = all.find((s) => s.categoryId === 'endosphere' && !s.isPackage && s.name.includes('celé tělo'))
  if (endosphere) mainServices.push(endosphere)

  const budovani = all.find((s) => s.categoryId === 'budovani-svalu' && !s.isPackage && s.name.includes('2 partie') && !s.name.includes('kombo'))
  if (budovani) mainServices.push(budovani)

  const hydrafacial = all.find((s) => s.categoryId === 'kosmetika' && !s.isPackage && s.name.includes('Hydrafacialem') && s.name.includes('Standard'))
  if (hydrafacial) mainServices.push(hydrafacial)

  const kavitace = all.find((s) => s.categoryId === 'kavitace' && !s.isPackage)
  if (kavitace) mainServices.push(kavitace)

  const kosmetika = all.find((s) => s.categoryId === 'kosmetika' && !s.isPackage && s.name.includes('anti Age'))
  if (kosmetika) mainServices.push(kosmetika)

  const dermapen = all.find((s) => s.categoryId === 'kosmetika' && !s.isPackage && s.name.includes('Dermapen'))
  if (dermapen) mainServices.push(dermapen)

  const lpg = all.find((s) => s.categoryId === 'ostatni-sluzby' && !s.isPackage && s.name.includes('LPG'))
  if (lpg) mainServices.push(lpg)

  return mainServices.slice(0, 8)
}

export function getCategories(): string[] {
  const services = getAllServices()
  return [...new Set(services.map((s) => s.categoryId))]
}

export function getCategoryName(categoryId: string): string {
  const service = getAllServices().find((s) => s.categoryId === categoryId)
  return service?.category || categoryId.toUpperCase()
}
