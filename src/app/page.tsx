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

import HorizontalScrollSection from '@/components/HorizontalScrollSection'

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-white pb-24 pt-[56px] md:pt-[68px] lg:pt-[80px]">
      <HeroSection />
      <SabinaSection />
      <HorizontalScrollSection />
      <VoucherCTASection />
      <WhyUsSection />
      <TestimonialsSection />
      <InstagramFeed />
    </main>
  )
}
