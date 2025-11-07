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

import AboutUsSection from '@/components/AboutUsSection'
import ContactSection from '@/components/ContactSection'
import FAQSection from '@/components/FAQSection'
import HeroSection from '@/components/HeroSection'
import HorizontalScrollSection from '@/components/HorizontalScrollSection'
import InstagramFeed from '@/components/InstagramFeed'
import NewsletterSection from '@/components/NewsletterSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import VoucherCTASection from '@/components/VoucherCTASection'
import WhyUsSection from '@/components/WhyUsSection'
import { getCategoryCoverServer, getCategoryMosaicServer, resolveExisting } from '@/lib/server/images'
import { getServiceCategories, getServicesByCategory } from '@/lib/services'

export default async function Home() {
  const categories = await getServiceCategories()
  // Build covers from CSV service images first, fallback to folder-based cover
  const coversByCategory: Record<string, string> = {}
  for (const c of categories) {
    const svcs = await getServicesByCategory(c.id)
    const candidates = Array.from(
      new Set(svcs.flatMap((s) => (s.images?.length ? s.images : [s.image])).filter(Boolean))
    ) as string[]
    const fromCsv = candidates.length ? await resolveExisting(candidates) : null
    coversByCategory[c.id] = fromCsv || (await getCategoryCoverServer(c.id))
  }

 

  return (
    <main id="main-content" className="min-h-screen bg-white pb-24 pt-20 md:pt-24 lg:pt-28">
      <HeroSection />
      <WhyUsSection />
      <AboutUsSection />
      <div className="lg:hidden">
        <ServicesSection categories={categories} />
      </div>
      <div className="hidden lg:block">
        <HorizontalScrollSection categories={categories} coversByCategory={coversByCategory} />
      </div>
      <VoucherCTASection />
      <TestimonialsSection />
      <FAQSection />
      <InstagramFeed />
      <ContactSection />
      <NewsletterSection />
    </main>
  )
}
