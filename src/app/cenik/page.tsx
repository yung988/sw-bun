import Breadcrumbs from '@/components/Breadcrumbs'
import PageLayout from '@/components/PageLayout'
import PriceTable from '@/components/PriceTable'
import SectionTitle from '@/components/SectionTitle'
import { getAllServices } from '@/lib/services'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Ceník služeb | SW Beauty Hodonín',
  description:
    'Kompletní ceník všech služeb SW Beauty s cenami - kosmetika, HIFU facelift, budování svalů, endos-roller a další profesionální ošetření. Transparentní ceny bez skrytých poplatků.',
  keywords: ['ceník', 'ceny', 'SW Beauty', 'kosmetika', 'HIFU', 'Hodonín', 'služby'],
  openGraph: {
    title: 'Ceník služeb | SW Beauty Hodonín',
    url: 'https://swbeauty.cz/cenik',
    type: 'website',
  },
}

export default async function PriceListPage() {
  const services = await getAllServices()

  return (
    <PageLayout maxWidth="default" paddingBottom={false} flexLayout={true}>
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 mb-6">
        <Breadcrumbs
          items={[
            { label: 'Domů', href: '/' },
            { label: 'Ceník' },
          ]}
        />
        <SectionTitle
          eyebrow="Transparentní ceny"
          title={
            <>
              Kompletní <em className="italic">ceník</em>
            </>
          }
          subtitle="Všechny naše služby na jednom místě. Klikněte na službu pro rezervaci."
        />
      </div>

      {/* Scrollable Price Table Section */}
      <div className="flex-1 min-h-0">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-slate-900 border-r-transparent" />
                <p className="mt-4 text-sm text-slate-600">Načítání ceníku...</p>
              </div>
            </div>
          }
        >
          <PriceTable services={services} />
        </Suspense>
      </div>

    </PageLayout>
  )
}
