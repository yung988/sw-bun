import PageLayout from '@/components/PageLayout'
import SectionTitle from '@/components/SectionTitle'
import ServicesLayout from '@/components/ServicesLayout'
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
    <main className="min-h-screen lg:h-screen lg:overflow-hidden bg-white">
      <div className="pt-24 md:pt-32 lg:pt-40 px-4 md:px-6 lg:px-8 max-w-[1920px] mx-auto lg:h-full lg:flex lg:flex-col">
        <div className="mb-8 lg:mb-6 flex-shrink-0">
          <SectionTitle
            eyebrow="Kompletní nabídka"
            title={
              <>
                Naše služby <em className="italic">a ceny</em>
              </>
            }
            subtitle="Vyberte službu ze seznamu a prohlédněte si detaily, výhody a ceník."
          />
        </div>

        <div className="lg:flex-1 lg:min-h-0">
          <ServicesLayout services={allServices} />
        </div>
      </div>
    </main>
  )
}
