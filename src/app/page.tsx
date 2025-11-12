import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://swbeauty.cz'),
  title: 'SW Beauty - Profesionální kosmetický salon Hodonín',
  description:
    'Profesionální kosmetika a moderní technologie HIFU, Endosphere a EMS v Hodoníně. Prověřené metody pro viditelné výsledky.',
  keywords: ['kosmetický salon', 'HIFU', 'Endosphere', 'EMS', 'kosmetika', 'Hodonín', 'omlazení', 'formování těla'],
  alternates: {
    canonical: 'https://swbeauty.cz',
  },
  openGraph: {
    title: 'SW Beauty - Profesionální kosmetický salon Hodonín',
    description: 'Profesionální kosmetika a moderní technologie HIFU, Endosphere a EMS v Hodoníně.',
    images: ['/images/hero-image.jpg'],
    url: 'https://swbeauty.cz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SW Beauty - Profesionální kosmetický salon Hodonín',
    description: 'Profesionální kosmetika a moderní technologie HIFU, Endosphere a EMS v Hodoníně.',
    images: ['/images/hero-image.jpg'],
  },
}


import FeelBeautifulSection from '@/components/FeelBeautifulSection'
import HeroSection from '@/components/HeroSection'
import ScrollGalleryCSS from '@/components/ScrollGalleryCSS'
import InstagramFeed from '@/components/InstagramFeed'
import SabinaSection from '@/components/SabinaSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import VoucherCTASection from '@/components/VoucherCTASection'
import WhyUsSection from '@/components/WhyUsSection'
import { getCategoryCoverServer, resolveExisting } from '@/lib/server/images'
import { getAllServices } from '@/lib/services'

export default async function Home() {
  const services = await getAllServices()

  // Build category list with covers
  const categories = services.map((s) => {
    const prices = s.pricing.map((p) => p.price).filter((p) => p > 0)
    const priceRange = prices.length > 0
      ? prices.length === 1
        ? `${prices[0]} Kč`
        : `od ${Math.min(...prices)} Kč`
      : 'Na vyžádání'

    return {
      id: s.serviceId,
      name: s.name,
      slug: s.slug,
      description: s.shortDescription,
      priceRange,
      serviceCount: s.subcategories.length > 0 ? s.subcategories.length : s.pricing.length,
    }
  })

  // Build covers from CSV service images first, fallback to folder-based cover
  const coversByCategory: Record<string, string> = {}
  for (const service of services) {
    const candidates = service.images.filter(Boolean)
    const fromCsv = candidates.length ? await resolveExisting(candidates) : null
    coversByCategory[service.serviceId] = fromCsv || (await getCategoryCoverServer(service.serviceId))
  }

  return (
    <main id="main-content" className="min-h-screen bg-white pb-24 pt-[56px] md:pt-[68px] lg:pt-[80px]">
      <HeroSection />
      <WhyUsSection />
      <FeelBeautifulSection />
      <SabinaSection />
      <ScrollGalleryCSS />
      <VoucherCTASection />
      <TestimonialsSection />
      <InstagramFeed />
    </main>
  )
}
