import PriceTable from '@/components/PriceTable'
import SectionTitle from '@/components/SectionTitle'
import OpenVoucherButton from '@/components/OpenVoucherButton'
import OpenBookingButton from '@/components/OpenBookingButton'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllServices } from '@/lib/services'

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
    <main className="min-h-screen bg-white pb-24 pt-32 md:pt-40 lg:pt-44">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-[1250px] px-6">
          <SectionTitle
            eyebrow="Transparentní ceny"
            title={
              <>
                Kompletní <em className="italic">ceník</em>
              </>
            }
            subtitle="Všechny naše služby na jednom místě. Žádné skryté poplatky, žádná překvapení."
          />
        </div>
      </section>

      {/* Price Table Section */}
      <section className="mx-auto max-w-[1250px] px-6 py-8 md:py-12 lg:py-16">
        <PriceTable services={services} />
      </section>

      {/* Quick Actions */}
      <section className="mx-auto max-w-[1250px] px-6 py-8 md:py-12 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Reservation CTA */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Kalendář</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-light">Rezervace termínu</h3>
            <p className="mb-6 text-sm text-white/80">
              Našli jste službu, která vás zaujala? Rezervujte si termín online nebo nás kontaktujte.
            </p>
            <OpenBookingButton className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-white/90">
              Rezervovat termín
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Šipka</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </OpenBookingButton>
          </div>

          {/* Voucher CTA */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200">
              <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Dárek</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-2xl font-light text-slate-900">Dárkové poukazy</h3>
            <p className="mb-6 text-sm text-slate-600">
              Darujte svým blízkým relaxaci a krásu. Poukazy na libovolnou hodnotu nebo konkrétní službu.
            </p>
            <OpenVoucherButton className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
              Objednat poukaz
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Šipka</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </OpenVoucherButton>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-[1250px] px-6 py-8 md:py-12 lg:py-16">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h3 className="mb-6 text-2xl font-light text-slate-900">
            Často kladené <em className="font-serif italic">otázky</em>
          </h3>
          <div className="space-y-4">
            <details className="group rounded-xl border border-slate-200 bg-white p-5">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900">
                Jak dlouho trvá jedno ošetření?
                <svg
                  className="h-5 w-5 text-slate-400 transition group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Rozbalit</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Délka ošetření se liší podle typu služby. V ceníku najdete u každé služby uvedenou přesnou délku v
                minutách. Většina ošetření trvá 60-90 minut.
              </p>
            </details>

            <details className="group rounded-xl border border-slate-200 bg-white p-5">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900">
                Jsou ceny konečné nebo se mohou měnit?
                <svg
                  className="h-5 w-5 text-slate-400 transition group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Rozbalit</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Všechny ceny jsou konečné a zahrnují veškeré náklady. Žádné skryté poplatky. Ceny se mohou měnit pouze
                při aktualizaci ceníku, o které vás vždy předem informujeme.
              </p>
            </details>

            <details className="group rounded-xl border border-slate-200 bg-white p-5">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900">
                Nabízíte balíčky nebo slevy?
                <svg
                  className="h-5 w-5 text-slate-400 transition group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Rozbalit</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Ano! V ceníku najdete balíčky označené štítkem "Balíček", které nabízejí výhodnější ceny při zakoupení
                více sezení. Pravidelně také nabízíme sezónní akce.
              </p>
            </details>

            <details className="group rounded-xl border border-slate-200 bg-white p-5">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900">
                Mohu platit kartou?
                <svg
                  className="h-5 w-5 text-slate-400 transition group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Rozbalit</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-sm text-slate-600">
                Ano, přijímáme platby kartou i hotovost. Pro vaše pohodlí nabízíme všechny běžné platební metody.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  )
}
