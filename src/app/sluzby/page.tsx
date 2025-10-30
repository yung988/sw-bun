// app/sluzby/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import SectionTitle from '@/components/SectionTitle'
import OpenBookingButton from '@/components/OpenBookingButton'
import ServicesClient from './_client'
import { getAllServices, getCategories, getCategoryName } from '@/lib/services'
import { Sparkles, Dumbbell, ScanFace, Waves, Zap, Droplets, Scissors, Stars } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Služby | SW Beauty Hodonín',
  description:
    'Kompletní přehled profesionálních kosmetických služeb. HIFU, Endosphere, EMS, kosmetika — moderní technologie s viditelnými výsledky.',
  alternates: { canonical: 'https://swbeauty.cz/sluzby' },
}

// Heuristické mapování ikon podle ID (dynamické – bez fixního seznamu)
function pickIcon(id: string) {
  const key = id.toLowerCase()
  if (key.includes('hifu')) return ScanFace
  if (key.includes('endo')) return Waves
  if (key.includes('kavit')) return Waves
  if (key.includes('radiof')) return Zap
  if (key.includes('lymfo')) return Droplets
  if (key.includes('sval') || key.includes('budovani')) return Dumbbell
  if (key.includes('vlasy') || key.includes('prodlu')) return Scissors
  if (key.includes('kosmet')) return Sparkles
  return Stars
}

const ServiceSearch = dynamic(() => import('@/components/ServiceSearch'), { ssr: false })

export default async function ServicesPage() {
  const [categories, allServices] = await Promise.all([getCategories(), getAllServices()])
  const categoryNames = await Promise.all(categories.map((id) => getCategoryName(id)))

  return (
    <ServicesClient>
      <main className="min-h-screen bg-white pb-24 pt-28 md:pt-36 lg:pt-40">
        <div className="mx-auto max-w-[1250px] px-6">
          {/* Header */}
          <div data-reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle
              eyebrow="Kompletní nabídka"
              title={
                <>
                  Naše služby <em className="italic">a ceny</em>
                </>
              }
              subtitle="Vyhledejte konkrétní ošetření nebo si procházejte kategorie — v klidném, přehledném rytmu."
            />
            <div className="flex items-center gap-3">
              <OpenBookingButton className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Konzultace zdarma
              </OpenBookingButton>
              <Link
                href="/kontakt"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50 transition"
              >
                Napsat dotaz
              </Link>
            </div>
          </div>

          {/* Live Search */}
          <div data-reveal className="mt-10">
            <ServiceSearch services={allServices} />
          </div>

          {/* Grid kategorií */}
          <section aria-labelledby="categories" className="mt-12">
            <h2 id="categories" className="sr-only">
              Kategorie služeb
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((id, i) => {
                const name = categoryNames[i]
                const Icon = pickIcon(id)
                return (
                  <Link
                    data-reveal
                    key={id}
                    href={`/sluzby/${id}`}
                    prefetch={false}
                    className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-slate-900"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <Icon
                        className="h-6 w-6 text-slate-900 transition-transform group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                      <span
                        aria-hidden
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 transition-all group-hover:border-slate-900 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </div>

                    <h3 className="mb-2 text-xl font-light text-slate-900">{name}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">Prohlédnout dostupná ošetření a ceník.</p>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50/90 to-transparent" />
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Spodní CTA */}
          <div data-reveal className="mt-16">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center">
              <h3 className="mb-2 text-2xl font-light text-slate-900">
                Nejste si jistí <em className="font-serif italic">které ošetření</em> je pro vás?
              </h3>
              <p className="mb-6 text-slate-600">Krátká konzultace zdarma vám pomůže zvolit ideální postup.</p>
              <OpenBookingButton className="inline-flex rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Konzultace zdarma
              </OpenBookingButton>
            </div>
          </div>
        </div>
      </main>
    </ServicesClient>
  )
}
