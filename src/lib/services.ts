import { getCategoryMosaicServer } from '@/lib/server/images'
import Papa from 'papaparse'
import { formatPrice } from './price'

// ===== TYPES =====

export type PricingItem = {
  serviceId: string
  name: string
  description: string
  duration: number
  sessions: number
  price: number
  priceFormatted: string
  isPackage: boolean
  sortOrder: number
}

export type MainService = {
  serviceId: string
  parentId: string | null
  categoryName: string
  name: string
  slug: string
  shortDescription: string
  fullDescription: string
  benefits: string[]
  indications: string[]
  contraindications: string[]
  image: string
  images: string[]
  // Nested subcategories (only for parent categories like Kosmetika)
  subcategories: MainService[]
  // Pricing items
  pricing: PricingItem[]
}

// ===== CONSTANTS =====

const DEFAULT_IMAGE = '/images/service-ostatni.jpg'

// ===== HELPER FUNCTIONS =====

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
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

function parseCSVGeneric<T = Record<string, string>>(csvText: string): T[] {
  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  })

  if (parsed.errors?.length) {
    console.warn('CSV parse warnings:', parsed.errors.slice(0, 3))
  }

  const items: T[] = []

  for (const rowRaw of parsed.data) {
    if (!rowRaw) continue
    // Lowercase, trimmed keys for robust access
    const row: Record<string, string> = {}
    for (const [k, v] of Object.entries(rowRaw)) {
      if (!k) continue
      row[k.trim().toLowerCase()] = (v ?? '').toString().trim()
    }
    items.push(row as T)
  }

  return items
}

function splitByComma(value: string): string[] {
  if (!value) return []
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

// ===== DATA LOADING =====

async function getServicesFile(): Promise<string | null> {
  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs/promises')
      const path = await import('path')
      const filePath = path.join(process.cwd(), 'public/services/pricelist_updated - services.csv')
      return await fs.readFile(filePath, 'utf-8')
    } catch (error) {
      console.error('Failed to load services.csv:', error)
      return null
    }
  }
  return null
}

async function getPricingFile(): Promise<string | null> {
  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs/promises')
      const path = await import('path')
      const filePath = path.join(process.cwd(), 'public/services/pricelist_updated - prices.csv')
      return await fs.readFile(filePath, 'utf-8')
    } catch (error) {
      console.error('Failed to load pricing.csv:', error)
      return null
    }
  }
  return null
}

// ===== PARSING =====

async function parseServicesCSV(csvText: string): Promise<MainService[]> {
  const rows = parseCSVGeneric<{
    service_id: string
    parent_id: string
    category_name: string
    name: string
    short_description: string
    full_description: string
    benefits: string
    indications: string
    contraindications: string
    image: string
  }>(csvText)

  const services: MainService[] = []

  for (const row of rows) {
    const serviceId = row.service_id
    if (!serviceId) continue

    const rawImages = row.image ? row.image.split(';').map((s) => s.trim()).filter(Boolean) : []
    let images = rawImages.map((p) => sanitizeImage(p))

    // Try to get mosaic images
    const mosaic = await getCategoryMosaicServer(serviceId)
    if ((!images.length || images.every((img) => img === DEFAULT_IMAGE)) && mosaic?.length) {
      images = mosaic.slice(0, 3)
    }

    services.push({
      serviceId,
      parentId: row.parent_id || null,
      categoryName: row.category_name,
      name: row.name,
      slug: createSlug(serviceId),
      shortDescription: row.short_description,
      fullDescription: row.full_description,
      benefits: splitByComma(row.benefits),
      indications: splitByComma(row.indications),
      contraindications: splitByComma(row.contraindications),
      image: images[0] || DEFAULT_IMAGE,
      images,
      subcategories: [],
      pricing: [],
    })
  }

  return services
}

async function parsePricingCSV(csvText: string): Promise<PricingItem[]> {
  const rows = parseCSVGeneric<{
    serviceid: string
    category: string
    subcategory: string
    service_type: string
    name: string
    duration_in_minutes: string
    session: string
    price_in_czk: string
  }>(csvText)

  const pricing: PricingItem[] = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const serviceId = row.serviceid
    if (!serviceId) continue

    const duration = Number.parseInt(row.duration_in_minutes, 10) || 0
    const sessions = Number.parseInt(row.session, 10) || 1
    const price = Number.parseInt(row.price_in_czk, 10) || 0
    const isPackage = row.service_type === 'package'
    const sortOrder = i + 1

    pricing.push({
      serviceId,
      name: row.name,
      description: row.subcategory || row.category || '',
      duration,
      sessions,
      price,
      priceFormatted: formatPrice(price),
      isPackage,
      sortOrder,
    })
  }

  // Sort by sortOrder
  pricing.sort((a, b) => a.sortOrder - b.sortOrder)

  return pricing
}

// ===== CACHE =====

let servicesCache: MainService[] | null = null
let servicesLoading: Promise<MainService[]> | null = null

async function loadAllServices(): Promise<MainService[]> {
  if (servicesCache) {
    return servicesCache
  }

  if (!servicesLoading) {
    servicesLoading = (async () => {
      const [servicesCSV, pricingCSV] = await Promise.all([getServicesFile(), getPricingFile()])

      if (!servicesCSV || !pricingCSV) {
        console.error('Missing CSV files')
        return []
      }

      const services = await parseServicesCSV(servicesCSV)
      const pricing = await parsePricingCSV(pricingCSV)

      // Attach pricing to services
      for (const service of services) {
        service.pricing = pricing.filter((p) => p.serviceId === service.serviceId)
      }

      // Build hierarchy - attach subcategories to parents
      const parentMap = new Map<string, MainService>()
      const children: MainService[] = []

      for (const service of services) {
        if (!service.parentId) {
          parentMap.set(service.serviceId, service)
        } else {
          children.push(service)
        }
      }

      for (const child of children) {
        const parent = parentMap.get(child.parentId!)
        if (parent) {
          parent.subcategories.push(child)
        }
      }

      // Return only top-level services (parents)
      return Array.from(parentMap.values())
    })()

    try {
      servicesCache = await servicesLoading
    } finally {
      servicesLoading = null
    }
  }

  return servicesCache ?? []
}

// ===== PUBLIC API =====

export async function getAllServices(): Promise<MainService[]> {
  return loadAllServices()
}

export async function getServiceById(serviceId: string): Promise<MainService | null> {
  const services = await getAllServices()

  // Search in top-level services
  const topLevel = services.find((s) => s.serviceId === serviceId)
  if (topLevel) return topLevel

  // Search in subcategories
  for (const service of services) {
    const sub = service.subcategories.find((s) => s.serviceId === serviceId)
    if (sub) return sub
  }

  return null
}

export async function getServiceBySlug(slug: string): Promise<MainService | null> {
  const services = await getAllServices()

  // Search in top-level services
  const topLevel = services.find((s) => s.slug === slug)
  if (topLevel) return topLevel

  // Search in subcategories
  for (const service of services) {
    const sub = service.subcategories.find((s) => s.slug === slug)
    if (sub) return sub
  }

  return null
}

export async function getCategories(): Promise<string[]> {
  const services = await getAllServices()
  return services.map((s) => s.serviceId)
}

export async function getCategoryName(categoryId: string): Promise<string> {
  const service = await getServiceById(categoryId)
  return service?.name ?? categoryId
}

export function clearServicesCache() {
  servicesCache = null
}

export { formatPrice } from './price'
