import ServicesLayout from '@/components/ServicesLayout'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { getAllServices } from '@/lib/services'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Služby | SW Beauty Hodonín',
  description:
    'Kompletní seznam profesionálních kosmetických služeb - HIFU, Endos-roller, budování svalů EMS, kosmetika. Moderní technologie pro viditelné výsledky.',
  keywords: ['služby', 'kosmetické služby', 'HIFU', 'Endos-roller', 'EMS', 'kosmetika', 'Hodonín'],
  alternates: {
    canonical: 'https://swbeauty.cz/sluzby',
  },
}

export default async function ServicesPage() {
  const allServices = await getAllServices()

  return (
    <main className="min-h-screen bg-white pb-24 pt-[56px] md:pt-[68px] lg:pt-[80px]">
      <Section className="pt-16 md:pt-20 lg:pt-24">
        <ServicesLayout services={allServices} />
      </Section>
    </main>
  )
}
