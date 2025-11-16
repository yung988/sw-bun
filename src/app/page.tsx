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
import HorizontalScrollSection from '@/components/HorizontalScrollSection'
import AboutSection from '@/components/AboutSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import Gallery from '@/components/Gallery'
import VoucherSection from '@/components/VoucherSection'
import ContactSection from '@/components/ContactSection'
import InstagramFeed from '@/components/InstagramFeed'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f8f3f0] pb-24 pt-[56px] md:pt-[68px] lg:pt-[80px]">
      <HeroSection />
      <HorizontalScrollSection />
      <AboutSection />
      <TestimonialsSection />
      <Gallery />
      <VoucherSection />
      <ContactSection />
      <InstagramFeed />
    </main>
  )
}
