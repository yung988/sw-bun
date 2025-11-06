import { getCategoryMosaicServer } from '@/lib/server/images'
import type { PriceItem } from '@/types'
import Papa from 'papaparse'
import { formatPrice } from './price'

type NumericRange = {
  min?: number
  max?: number
}

export type Service = {
  slug: string
  name: string
  shortDescription: string
  description: string
  category: string
  categoryId: string
  subcategory: string
  subcategoryId: string
  serviceType: string
  duration: number | null
  sessions: number | null
  price: string
  priceNumber?: number
  benefits: string[]
  image: string
  images: string[]
  isPackage: boolean
  isVariablePrice: boolean
}

export type ServiceCategory = {
  id: string
  name: string
  description: string
  priceRange: string
  slug: string
  serviceCount: number
}

export type ServiceSubcategory = {
  id: string
  categoryId: string
  name: string
  description: string
  priceRange: string
  serviceCount: number
}

const DEFAULT_IMAGE = '/images/service-ostatni.jpg'

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  kosmetika: 'Profesionální kosmetické ošetření pro zdravou, jasnou pleť.',
  'budovani-svalu': 'Elektrostimulace a EMS tréninky pro efektivní posílení a formování těla.',
  'hifu-tvar': 'Pokročilý HIFU lifting pro zpevnění kontur obličeje bez rekonvalescence.',
  'hifu-telo': 'Hloubkové HIFU tvarování těla podle potřeb vaší postavy.',
  endosphere: 'Kompresní mikro-vibrace Endosphere pro lymfatickou drenáž a redukci celulitidy.',
  kavitace: 'Ultrazvuková kavitace pro šetrnou redukci problematických partií.',
  lpg: 'Mechanická endermologie LPG pro vyhlazení pokožky a tvarování.',
  'ostatni-sluzby': 'Komplementární služby, které doplní vaši péči o krásu.',
  hydrafacial: 'Hydrafacial – okamžité hloubkové čištění, hydratace a rozjasnění pleti.',
}

function parseCSV(csvText: string): PriceItem[] {
  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  })

  if (parsed.errors?.length) {
    console.warn('CSV parse warnings:', parsed.errors.slice(0, 3))
  }

  const items: PriceItem[] = []

  for (const rowRaw of parsed.data) {
    if (!rowRaw) continue
    // Lowercase, trimmed keys for robust access
    const row: Record<string, string> = {}
    for (const [k, v] of Object.entries(rowRaw)) {
      if (!k) continue
      row[k.trim().toLowerCase()] = (v ?? '').toString().trim()
    }

    const get = (...keys: string[]) => {
      for (const k of keys) {
        const val = row[k.toLowerCase()]
        if (val !== undefined && val !== '') return val
      }
      return ''
    }

    const shortSuggested = get('short_description_suggested')
    const descSuggested = get('description_suggested')

    const benefitsRaw = get('benefits', 'benefit')
    const benefits = benefitsRaw
      ? benefitsRaw
          .split(/[,•;\n]/)
          .map((b) => b.trim())
          .filter(Boolean)
      : []

    const imageCell = get('image', 'images', 'gallery', 'image_path')
    const imageList = imageCell
      ? imageCell
          .split(/[;,]/)
          .map((v) => v.trim())
          .filter(Boolean)
      : []

    const durationRaw = get('duration_in_minutes', 'duration_minutes', 'duration')
    const sessionsRaw = get('sessions', 'session')
    const priceRaw = get('price_in_czk', 'price_czk', 'price')

    const duration = Number.parseInt(durationRaw, 10)
    const sessions = Number.parseInt(sessionsRaw, 10)

    const item: PriceItem = {
      category: get('category'),
      subcategory: get('subcategory'),
      serviceType: get('service_type', 'servicetype', 'type'),
      name: get('name', 'title'),
      shortDescription: shortSuggested || get('short_description', 'shortdescription', 'short'),
      description: descSuggested || get('description', 'desc'),
      duration: Number.isNaN(duration) ? 0 : duration,
      sessions: Number.isNaN(sessions) ? 0 : sessions,
      price: priceRaw,
      benefits,
      image: imageList[0] || imageCell,
      images: imageList,
    }

    // Skip empty lines (e.g., if name/category missing)
    if (!item.name || !item.category) continue
    items.push(item)
  }

  return items
}

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function sanitizeImage(image: string): string {
  if (!image) return DEFAULT_IMAGE
  const trimmed = image.trim()
  if (!trimmed) return DEFAULT_IMAGE
  if (trimmed.startsWith('http')) return trimmed
  return `/images/${trimmed}`
}

function isGenericImage(path: string): boolean {
  return path === DEFAULT_IMAGE || /\/images\/service-[\w-]+\.jpg$/.test(path)
}

function hashString(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  return Math.abs(hash)
}

function parsePrice(price: string): { raw: string; value?: number } {
  const trimmed = price.trim()
  if (!trimmed) return { raw: 'Na dotaz' }

  const normalized = trimmed.replace(/[^\d]/g, '')
  const numeric = Number.parseInt(normalized, 10)
  if (Number.isNaN(numeric)) {
    return { raw: trimmed }
  }

  return { raw: trimmed, value: numeric }
}

async function priceItemToService(item: PriceItem): Promise<Service> {
  const categoryId = createSlug(item.category)
  const subcategoryId = createSlug(item.subcategory || 'ostatni')
  const { raw: rawPrice, value: priceNumber } = parsePrice(item.price)

  const isPackage = item.serviceType.toLowerCase() === 'package' || item.name.toLowerCase().includes('balíček')

  // Resolve primary image & gallery with fallbacks
  const rawList = (item.images?.length ? item.images : [item.image]).filter(Boolean)
  let images = rawList.map((p) => sanitizeImage(p))
  // Resolve a mosaic dynamically from existing images under public/images
  const mosaic = await getCategoryMosaicServer(categoryId)
  if (!images.length || images.every(isGenericImage)) {
    if (mosaic?.length) {
      // pick 3 deterministic images from mosaic based on name hash
      const base = hashString(item.name)
      const picks = new Set<number>()
      for (let k = 0; k < Math.min(3, mosaic.length); k++) {
        picks.add((base + k) % mosaic.length)
      }
      images = Array.from(picks).map((i) => mosaic[i])
    }
  } else if (mosaic?.length) {
    // Augment generics inside list with mosaic picks
    images = images.map((img, idx) =>
      isGenericImage(img) ? mosaic[(hashString(item.name) + idx) % mosaic.length] : img
    )
  }
  const imagePath = images[0] || DEFAULT_IMAGE

  return {
    slug: `${categoryId}-${createSlug(item.name)}`,
    name: item.name,
    shortDescription: item.shortDescription,
    description: item.description,
    category: item.category,
    categoryId,
    subcategory: item.subcategory,
    subcategoryId,
    serviceType: item.serviceType.toLowerCase(),
    duration: item.duration > 0 ? item.duration : null,
    sessions: item.sessions > 0 ? item.sessions : null,
    price: rawPrice,
    priceNumber,
    benefits: item.benefits,
    image: imagePath,
    images,
    isPackage,
    isVariablePrice: false,
  }
}

function calculatePriceRange(values: Array<number | undefined>): NumericRange {
  const prices = values.filter((value): value is number => typeof value === 'number')
  if (!prices.length) return {}
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

function formatPriceRange(range: NumericRange): string {
  if (range.min === undefined) return 'Na dotaz'
  if (range.max === undefined || range.max === range.min) {
    return formatPrice(range.min)
  }
  return `${formatPrice(range.min)} – ${formatPrice(range.max)}`
}

// Cache pro parsované služby (zlepšuje výkon)
let servicesCache: Service[] | null = null
let servicesLoading: Promise<Service[]> | null = null

async function getPriceListFile(): Promise<string | null> {
  if (typeof window === 'undefined') {
    try {
      const { getPriceListFile: serverGetPriceListFile } = await import('./server/csv')
      return serverGetPriceListFile()
    } catch (error) {
      console.error('Nepodařilo se načíst public/services/services.csv:', error)
      return null
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
      return Promise.all(items.map(priceItemToService))
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
  return services.find((service) => service.slug === slug) ?? null
}

export async function getServicesByCategory(categoryId: string): Promise<Service[]> {
  const services = await getAllServices()
  return services.filter((service) => service.categoryId === categoryId)
}

export async function getServicesBySubcategory(categoryId: string, subcategoryId: string): Promise<Service[]> {
  const services = await getAllServices()
  return services.filter((service) => service.categoryId === categoryId && service.subcategoryId === subcategoryId)
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const all = await getAllServices()
  const categoryOrder: string[] = []
  const categoryMap = new Map<string, Service[]>()

  for (const service of all) {
    if (!categoryMap.has(service.categoryId)) {
      categoryMap.set(service.categoryId, [])
      categoryOrder.push(service.categoryId)
    }
    categoryMap.get(service.categoryId)?.push(service)
  }

  return categoryOrder.map((categoryId) => {
    const services = categoryMap.get(categoryId) ?? []
    const priceRange = calculatePriceRange(services.map((service) => service.priceNumber))

    // Derive a short, category-level claim from service shortDescriptions
    const preferred = services.find((s) => s.serviceType === 'single' && s.shortDescription) ?? services[0]
    const derivedClaim = preferred?.shortDescription?.trim()

    return {
      id: categoryId,
      slug: categoryId,
      name: services[0]?.category ?? categoryId,
      description: derivedClaim || CATEGORY_DESCRIPTIONS[categoryId] || 'Profesionální péče o vaši krásu.',
      priceRange: formatPriceRange(priceRange),
      serviceCount: services.length,
    }
  })
}

export async function getSubcategoriesByCategory(categoryId: string): Promise<ServiceSubcategory[]> {
  const services = await getServicesByCategory(categoryId)
  const order: string[] = []
  const subcategoryMap = new Map<string, Service[]>()

  for (const service of services) {
    if (!subcategoryMap.has(service.subcategoryId)) {
      subcategoryMap.set(service.subcategoryId, [])
      order.push(service.subcategoryId)
    }
    subcategoryMap.get(service.subcategoryId)?.push(service)
  }

  return order.map((subcategoryId) => {
    const list = subcategoryMap.get(subcategoryId) ?? []
    const priceRange = calculatePriceRange(list.map((service) => service.priceNumber))
    const first = list[0]

    return {
      id: subcategoryId,
      categoryId,
      name: first?.subcategory ?? subcategoryId,
      description: first?.shortDescription ?? '',
      priceRange: formatPriceRange(priceRange),
      serviceCount: list.length,
    }
  })
}

export async function getMainServices(): Promise<Service[]> {
  const all = await getAllServices()
  const seen = new Set<string>()
  const featured: Service[] = []

  for (const service of all) {
    if (seen.has(service.categoryId)) continue
    seen.add(service.categoryId)
    featured.push(service)
  }

  return featured.slice(0, 8)
}

export async function getCategories(): Promise<string[]> {
  const services = await getAllServices()
  const ids: string[] = []
  const seen = new Set<string>()

  for (const service of services) {
    if (seen.has(service.categoryId)) continue
    seen.add(service.categoryId)
    ids.push(service.categoryId)
  }

  return ids
}

export async function getCategoryName(categoryId: string): Promise<string> {
  const services = await getServicesByCategory(categoryId)
  return services[0]?.category ?? categoryId
}

export { formatPrice } from './price'
