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
        PackageName: match[3]
          .replace(/^\"|\"$/g, '')
          .replace(/\"\"/g, '"')
          .trim(),
        Price: match[4].trim(),
        Sessions: match[5].trim(),
        Description: match[6]
          .replace(/^\"|\"$/g, '')
          .replace(/\"\"/g, '"')
          .trim(),
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

// Cache pro parsované služby (zlepšuje výkon)
let servicesCache: Service[] | null = null
let servicesLoading: Promise<Service[]> | null = null

async function getPriceListFile(): Promise<string | null> {
  if (typeof window === 'undefined') {
    try {
      const { readFile } = await import('node:fs/promises')
      return await readFile(`${process.cwd()}/public/pricelist.csv`, 'utf-8')
    } catch (error) {
      console.error('Nepodařilo se načíst soubor ceníku:', error)
    }
  }
  return null
}

async function loadServices(): Promise<Service[]> {
  if (servicesCache) {
    return servicesCache
  }

  if (!servicesLoading) {
    servicesLoading = (async () => {
      const csvContent = await getPriceListFile()
      if (!csvContent) {
        return []
      }
      const items = parseCSV(csvContent)
      return items.map(priceItemToService)
    })()

    try {
      servicesCache = await servicesLoading
    } finally {
      servicesLoading = null
    }
  }

  return servicesCache ?? []
}

export async function getAllServices(): Promise<Service[]> {
  return loadServices()
}

// Pomocník pro vyčištění cache (užitečné pro development nebo pokud se CSV změní)
export function clearServicesCache() {
  servicesCache = null
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getAllServices()
  return services.find((s) => s.slug === slug) || null
}

export async function getServicesByCategory(categoryId: string): Promise<Service[]> {
  const services = await getAllServices()
  return services.filter((s) => s.categoryId === categoryId)
}

export type ServiceCategory = {
  id: string
  name: string
  description: string
  priceRange: string
  slug: string
  serviceCount: number
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const all = await getAllServices()

  // Seskupit služby podle kategorie
  const categoryMap = new Map<string, Service[]>()
  for (const service of all) {
    const existing = categoryMap.get(service.categoryId) || []
    existing.push(service)
    categoryMap.set(service.categoryId, existing)
  }

  // Vytvořit karty kategorií s metadaty
  const categories: ServiceCategory[] = []

  for (const [categoryId, services] of categoryMap.entries()) {
    const firstService = services[0]
    const prices = services.filter((s) => s.priceMin !== undefined).map((s) => s.priceMin!)

    const minPrice = prices.length > 0 ? Math.min(...prices) : 0
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0

    let priceRange = 'Na dotaz'
    if (minPrice > 0 && maxPrice > 0) {
      if (minPrice === maxPrice) {
        priceRange = `${minPrice.toLocaleString('cs-CZ')} Kč`
      } else {
        priceRange = `${minPrice.toLocaleString('cs-CZ')} - ${maxPrice.toLocaleString('cs-CZ')} Kč`
      }
    }

    categories.push({
      id: categoryId,
      name: getCategoryDisplayName(categoryId),
      description: getCategoryDescription(categoryId),
      priceRange,
      slug: categoryId,
      serviceCount: services.length,
    })
  }

  return categories
}

function getCategoryDisplayName(categoryId: string): string {
  const names: Record<string, string> = {
    kosmetika: 'KOSMETIKA',
    hifu: 'HIFU',
    endosphere: 'ENDOSPHERE',
    'budovani-svalu': 'BUDOVÁNÍ SVALŮ',
    kavitace: 'KAVITACE',
    lpg: 'LPG',
    'prodluzovani-vlasu': 'PRODLUŽOVÁNÍ VLASŮ',
    'ostatni-sluzby': 'OSTATNÍ SLUŽBY',
  }
  return names[categoryId] || categoryId.toUpperCase()
}

function getCategoryDescription(categoryId: string): string {
  const descriptions: Record<string, string> = {
    hifu: 'Neinvazivní lifting obličeje pomocí fokusovaného ultrazvuku pro pevnější pleť.',
    endosphere: 'Kompresní mikro-vibrace pro lymfatickou drenáž a redukci celulitidy.',
    'budovani-svalu': 'Elektrostimulace svalů pro efektivní trénink a spalování tuků.',
    hydrafacial: 'Hloubkové čištění a hydratace pleti pomocí vakuové technologie.',
    kavitace: 'Ultrazvuková liposukce pro neinvazivní redukci tukových zásob.',
    kosmetika: 'Profesionální kosmetické ošetření pro všechny typy pleti.',
    lpg: 'Mechanická endermologie pro formování postavy a boj s celulitidou.',
    'prodluzovani-vlasu': 'Profesionální prodlužování vlasů mikro spoji keratinem.',
    'ostatni-sluzby': 'Další specializované služby pro vaši krásu a pohodu.',
  }
  return descriptions[categoryId] || 'Profesionální péče o vaši krásu.'
}

export async function getMainServices(): Promise<Service[]> {
  const all = await getAllServices()
  const mainServices: Service[] = []

  // Získat první službu z každé hlavní kategorie (včetně balíčků, pokud je potřeba)
  const hifu = all.find((s) => s.categoryId === 'hifu')
  if (hifu) mainServices.push(hifu)

  const endosphere = all.find((s) => s.categoryId === 'endosphere')
  if (endosphere) mainServices.push(endosphere)

  const budovani = all.find((s) => s.categoryId === 'budovani-svalu')
  if (budovani) mainServices.push(budovani)

  const hydrafacial = all.find((s) => s.categoryId === 'hydrafacial')
  if (hydrafacial) mainServices.push(hydrafacial)

  const kavitace = all.find((s) => s.categoryId === 'kavitace')
  if (kavitace) mainServices.push(kavitace)

  const kosmetika = all.find((s) => s.categoryId === 'kosmetika')
  if (kosmetika) mainServices.push(kosmetika)

  const lpg = all.find((s) => s.categoryId === 'lpg')
  if (lpg) mainServices.push(lpg)

  const ostatni = all.find((s) => s.categoryId === 'ostatni-sluzby')
  if (ostatni) mainServices.push(ostatni)

  return mainServices.slice(0, 8)
}

export async function getCategories(): Promise<string[]> {
  const services = await getAllServices()
  return [...new Set(services.map((s) => s.categoryId))]
}

export async function getCategoryName(categoryId: string): Promise<string> {
  const services = await getAllServices()
  const service = services.find((s) => s.categoryId === categoryId)
  return service?.category || categoryId.toUpperCase()
}
