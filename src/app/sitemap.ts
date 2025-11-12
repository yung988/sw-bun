import { getAllServices } from '@/lib/services'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://swbeauty.cz'

  // Statické stránky
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/sluzby`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cenik`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Dynamické stránky služeb (včetně kategorií a podkategorií)
  const services = await getAllServices()
  const servicePages: MetadataRoute.Sitemap = []

  for (const service of services) {
    // Main service page
    servicePages.push({
      url: `${baseUrl}/sluzby/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })

    // Subcategory pages (e.g., Kosmetika subcategories)
    for (const sub of service.subcategories) {
      servicePages.push({
        url: `${baseUrl}/sluzby/${sub.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    }
  }

  // Spojit všechny stránky
  return [...staticPages, ...servicePages]
}
