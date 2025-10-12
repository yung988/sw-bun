import type { MetadataRoute } from 'next'
import { getAllServices, getCategories } from '@/lib/services'

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
      url: `${baseUrl}/rezervace`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },

  ]

  // Dynamické stránky kategorií služeb
  const categories = await getCategories()
  const categoryPages: MetadataRoute.Sitemap = categories.map((categoryId) => ({
    url: `${baseUrl}/sluzby/${categoryId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Dynamické stránky detailů služeb
  const services = await getAllServices()
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/sluzby/${service.categoryId}/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Spojit všechny stránky
  return [...staticPages, ...categoryPages, ...servicePages]
}
