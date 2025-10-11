import { getCategories, getCategoryName } from '@/lib/services'
import type { Metadata } from 'next'
import Link from 'next/link'
import SectionTitle from '@/components/SectionTitle'

export const metadata: Metadata = {
  title: 'Služby | SW Beauty Hodonín',
  description:
    'Kompletní seznam profesionálních kosmetických služeb - HIFU, Endos-roller, budování svalů EMS, kosmetika. Moderní technologie pro viditelné výsledky.',
  keywords: ['služby', 'kosmetické služby', 'HIFU', 'Endos-roller', 'EMS', 'kosmetika', 'Hodonín'],
  alternates: {
    canonical: 'https://swbeauty.cz/sluzby',
  },
}

const categoryIcons: Record<string, string> = {
  kosmetika: '✨',
  hifu: '💆‍♀️',
  'budovani-svalu': '💪',
  endosphere: '🌊',
  kavitace: '🔊',
  'ostatni-sluzby': '💅',
  'Prodlužování vlasů': '💇‍♀️',
}

const categoryDescriptions: Record<string, string> = {
  kosmetika:
    'Profesionální péče o pleť s Hydrafacial čištěním a Dermapen mikrojehličkováním pro hydrataci, anti-aging a jasnou pleť',
  hifu: 'Neinvazivní lifting obličeje a těla fokusovaným ultrazvukem - stimuluje kolagen bez operace s výsledky trvajícími měsíce',
  'budovani-svalu':
    'Elektrostimulace svalů EMS - 20 minut intenzivního tréninku nahradí hodiny v posilovně, spaluje tuk a buduje svaly',
  endosphere:
    'Kompresní mikro-vibrace Endos-roller pro lymfatickou drenáž, redukci celulitidy a tonizaci pokožky bez bolesti',
  kavitace:
    'Ultrazvuková lipokavitace pro bezpečnou redukci lokálního tuku, konturování postavy a zlepšení elasticity pleti',
  'ostatni-sluzby':
    'Doplňkové služby jako prodlužování řas, depilace voskem a další speciální procedury pro kompletní péči',
  'Prodlužování vlasů':
    'Prodlužování vlasů mikro spoji keratinem za tepla nebo studena - přirozený vzhled, pevné spoje, výdrž 3-4 měsíce',
}

export default function ServicesPage() {
  const categories = getCategories()

  return (
    <main className="min-h-screen bg-white pb-24 pt-20">
      <div className="mx-auto max-w-[1250px] px-6 py-20">
        <SectionTitle
          eyebrow="Kompletní nabídka"
          title={
            <>
              Služby <em className="italic">& Ceny</em>
            </>
          }
          subtitle="Vyberte si kategorii a objevte naši nabídku luxusních ošetření s transparentními cenami"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((categoryId) => {
            const categoryName = getCategoryName(categoryId)
            const icon = categoryIcons[categoryId] || '✨'
            const description = categoryDescriptions[categoryId] || ''

            return (
              <Link
                key={categoryId}
                href={`/sluzby/${categoryId}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-soft hover:-translate-y-1"
              >
                <div className="mb-4 text-4xl">{icon}</div>
                <h2 className="mb-2 text-xl font-medium text-slate-900 group-hover:text-slate-700 transition">
                  {categoryName}
                </h2>
                <p className="text-sm text-slate-600 mb-4">{description}</p>
                <span className="inline-flex items-center text-sm font-medium text-slate-900 group-hover:gap-2 transition-all">
                  Prohlédnout služby
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <title>Prohlédnout služby</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-2xl font-light text-slate-900 mb-3">
              Nevíte si rady s <em className="font-serif italic">výběrem?</em>
            </h3>
            <p className="text-slate-600 mb-6">Objednejte si konzultaci zdarma a my vám poradíme.</p>
            <Link
              href="/rezervace"
              className="inline-flex rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Konzultace zdarma
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
