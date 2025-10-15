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
  image: string
  isPackage: boolean
  isVariablePrice: boolean
}

function parseCSV(csvText: string): PriceItem[] {
  const lines = csvText.split('\n').filter((line) => line.trim())
  if (lines.length < 2) return []

  const items: PriceItem[] = []

  for (let i = 1; i < lines.length; i++) {
    // Nový formát: Category,PackageName,Description,Price,Sessions,Price_Cleaned,Image
    const regex = /^([^,]+),("(?:[^"]|"")*"|[^,]+),("(?:[^"]|"")*"|[^,]+),([^,]+),([^,]+),([^,]+),([^,]+)$/
    const match = lines[i].match(regex)

    if (match) {
      items.push({
        CategoryId: match[1].trim(),
        CategoryName: match[1].trim(), // V novém CSV je kategorie v prvním sloupci
        PackageName: match[2]
          .replace(/^\"|\"$/g, '')
          .replace(/\"\"/g, '"')
          .trim(),
        Description: match[3]
          .replace(/^\"|\"$/g, '')
          .replace(/\"\"/g, '"')
          .trim(),
        Price: match[4].trim(),
        Sessions: match[5].trim(),
        Price_Cleaned: match[6].trim(),
        Image: match[7].trim(),
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

function parseCleanPrice(priceStr: string): { min?: number; max?: number; isVariable: boolean } {
  if (priceStr.includes('-')) {
    const parts = priceStr.split('-')
    const min = Number.parseInt(parts[0].trim())
    const max = Number.parseInt(parts[1].trim())
    return { min, max, isVariable: true }
  }

  const price = Number.parseInt(priceStr.trim())
  return { min: price, max: price, isVariable: false }
}

export function priceItemToService(item: PriceItem): Service {
  const nameLower = item.PackageName.toLowerCase()
  const isPackage = nameLower.includes('balíček') || nameLower.includes('baličck') || nameLower.includes('balicek')
  const { min, max, isVariable } = parseCleanPrice(item.Price_Cleaned)
  const categoryId = createSlug(item.CategoryName)

  return {
    slug: `${categoryId}-${createSlug(item.PackageName)}`,
    name: item.PackageName,
    category: item.CategoryName,
    categoryId: categoryId,
    price: item.Price,
    priceMin: min,
    priceMax: max,
    sessions: item.Sessions,
    duration: extractDuration(item.PackageName),
    description: item.Description,
    image: item.Image ? `/images/${item.Image}` : '/images/service-ostatni.jpg',
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
      return await readFile(`${process.cwd()}/public/swbeauty-procedury.csv`, 'utf-8')
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
    categories.push({
      id: categoryId,
      name: getCategoryDisplayName(categoryId),
      description: getCategoryDescription(categoryId),
      priceRange: 'Na dotaz',
      slug: categoryId,
      serviceCount: services.length,
    })
  }

  return categories
}

function getCategoryDisplayName(categoryId: string): string {
  const names: Record<string, string> = {
    kosmetika: 'KOSMETIKA',
    'budovani-svalu': 'BUDOVÁNÍ SVALŮ',
    'hifu>facelift': 'HIFU FACELIFT',
    'endosphere-roller': 'ENDOSPHERE ROLLER',
    kavitace: 'KAVITACE',
    radiofrekvence: 'RADIOFREKVENCE',
    lymfodrenaz: 'LYMFODRENÁŽ',
    hifu: 'HIFU',
    endosphere: 'ENDOSPHERE',
    lpg: 'LPG',
    'prodluzovani-vlasu': 'PRODLUŽOVÁNÍ VLASŮ',
    'ostatni-sluzby': 'OSTATNÍ SLUŽBY',
  }
  return names[categoryId] || categoryId.toUpperCase()
}

function getCategoryDescription(categoryId: string): string {
  const descriptions: Record<string, string> = {
    kosmetika: 'Profesionální kosmetické ošetření pro všechny typy pleti.',
    'budovani-svalu': 'Elektrostimulace svalů pro efektivní trénink a spalování tuků.',
    'hifu>facelift': 'Neinvazivní lifting obličeje pomocí fokusovaného ultrazvuku pro pevnější pleť.',
    'endosphere-roller': 'Kompresní mikro-vibrace pro lymfatickou drenáž a redukci celulitidy.',
    kavitace: 'Ultrazvuková liposukce pro neinvazivní redukci tukových zásob.',
    radiofrekvence: 'Radiofrekvenční ošetření pro omlazení a zpevnění pleti.',
    lymfodrenaz: 'Manuální lymfodrenáž pro detoxikaci a zlepšení cirkulace.',
    hifu: 'Neinvazivní lifting obličeje pomocí fokusovaného ultrazvuku pro pevnější pleť.',
    endosphere: 'Kompresní mikro-vibrace pro lymfatickou drenáž a redukci celulitidy.',
    hydrafacial: 'Hloubkové čištění a hydratace pleti pomocí vakuové technologie.',
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
  const kosmetika = all.find((s) => s.categoryId === 'kosmetika')
  if (kosmetika) mainServices.push(kosmetika)

  const budovani = all.find((s) => s.categoryId === 'budovani-svalu')
  if (budovani) mainServices.push(budovani)

  const hifu = all.find((s) => s.categoryId === 'hifu>facelift')
  if (hifu) mainServices.push(hifu)

  const endosphere = all.find((s) => s.categoryId === 'endosphere-roller')
  if (endosphere) mainServices.push(endosphere)

  const kavitace = all.find((s) => s.categoryId === 'kavitace')
  if (kavitace) mainServices.push(kavitace)

  const radiofrekvence = all.find((s) => s.categoryId === 'radiofrekvence')
  if (radiofrekvence) mainServices.push(radiofrekvence)

  const lymfodrenaz = all.find((s) => s.categoryId === 'lymfodrenaz')
  if (lymfodrenaz) mainServices.push(lymfodrenaz)

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
