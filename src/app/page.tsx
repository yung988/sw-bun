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

import HeroSection from '@/components/HeroSection'
import WhyUsSection from '@/components/WhyUsSection'
import AboutUsSection from '@/components/AboutUsSection'
import GallerySection from '@/components/GallerySection'
import ServicesSection from '@/components/ServicesSection'
import VoucherCTASection from '@/components/VoucherCTASection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import InstagramFeed from '@/components/InstagramFeed'
import ContactSection from '@/components/ContactSection'
import NewsletterSection from '@/components/NewsletterSection'
import { getServiceCategories } from '@/lib/services'

export default async function Home() {
  const categories = await getServiceCategories()

  return (
    <main id="main-content" className="min-h-screen bg-white pb-24 pt-20">
      <HeroSection />
      <WhyUsSection />
      <AboutUsSection />
      <GallerySection />
      <ServicesSection categories={categories} />
      <VoucherCTASection />
      <TestimonialsSection />
      <FAQSection />
      <InstagramFeed />
      <ContactSection />
      <NewsletterSection />
    </main>
  )
}
