import FadeIn from '@/components/animations/FadeIn'
import SectionTitle from '@/components/SectionTitle'
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
        <Container>
          <FadeIn y={20} duration={0.7}>
            <SectionTitle
              eyebrow="Kompletní nabídka"
              title={
                <>
                  Naše služby <em className="italic">a ceny</em>
                </>
              }
              subtitle="Vyberte službu ze seznamu a prohlédněte si detaily, výhody a ceník."
            />
          </FadeIn>

          <div className="mt-12 md:mt-16">
            <ServicesLayout services={allServices} />
          </div>
        </Container>
      </Section>
    </main>
  )
}
