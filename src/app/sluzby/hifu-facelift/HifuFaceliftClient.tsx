'use client'
import BookingForm from '@/components/BookingForm'
import PriceCard from '@/components/PriceCard'
import SectionTitle from '@/components/SectionTitle'
import type { PriceItem } from '@/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HifuFaceliftClient() {
  const [prices, setPrices] = useState<PriceItem[]>([])

  useEffect(() => {
    fetch('/api/pricelist')
      .then((res) => res.json())
      .then((data: PriceItem[]) => {
        const hifuPrices = data.filter(
          (item) => item.CategoryName === 'HIFU FACELIFT' || item.CategoryName === 'HIFU TĚLO'
        )
        setPrices(hifuPrices)
      })
  }, [])

  const facelifts = prices.filter((p) => p.CategoryName === 'HIFU FACELIFT')
  const body = prices.filter((p) => p.CategoryName === 'HIFU TĚLO')

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <section className="site-container pt-12 pb-8">
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-slate-500">
            Omlazení
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900">HIFU 7D Facelift</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Neinvazivní lifting obličeje a těla pomocí fokusovaného ultrazvuku. Okamžitý efekt, dlouhodobé výsledky bez
            operace a rekonvalescence.
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="site-container pb-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
          <Image
            src="/images/service-hifu.jpg"
            alt="HIFU 7D Facelift"
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="site-container py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-slate-900 mb-6">Co je HIFU 7D?</h2>
            <div className="space-y-4 text-slate-600">
              <p>
                HIFU (High-Intensity Focused Ultrasound) je nejmodernější neinvazivní technologie pro lifting a zpevnění
                pleti. Využívá fokusovaný ultrazvuk, který proniká do hlubokých vrstev kůže a stimuluje tvorbu nového
                kolagenu.
              </p>
              <p>
                Technologie 7D umožňuje ošetření v 7 různých hloubkách (1,5 - 4,5 mm), což zajišťuje komplexní omlazení
                od povrchu až po SMAS vrstvu.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl text-slate-900 mb-4">Výhody HIFU</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Okamžitý viditelný efekt po ošetření</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Dlouhodobé výsledky až 12-18 měsíců</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Bez řezů, anestézie a rekonvalescence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Přirozené postupné zlepšení</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Bezpečné pro všechny typy pleti</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {facelifts.length > 0 && (
        <section className="site-container py-12">
          <SectionTitle
            center={false}
            eyebrow="Ceník"
            title="HIFU Facelift - Obličej"
            subtitle="Ceny jsou uvedeny v Kč. Finální doporučení stanovíme při konzultaci."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {facelifts.map((item) => (
              <PriceCard
                key={`${item.PackageName}-${item.Price}`}
                title={item.PackageName}
                price={item.Price}
                sessions={item.Sessions || undefined}
                description={item.Description || undefined}
              />
            ))}
          </div>
        </section>
      )}

      {body.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <SectionTitle
            center={false}
            eyebrow="Ceník"
            title="HIFU - Formování těla"
            subtitle="Zeštíhlení a zpevnění problematických partií."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {body.map((item) => (
              <PriceCard
                key={`${item.PackageName}-${item.Price}`}
                title={item.PackageName}
                price={item.Price}
                sessions={item.Sessions || undefined}
                description={item.Description || undefined}
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[2rem] border border-faint bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-center">
          <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Zajímá vás HIFU ošetření?</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Domluvte si konzultaci a zjistěte, zda je HIFU vhodné pro vás. Rádi vám poradíme.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="mailto:info@swbeauty.cz"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Objednat konzultaci
            </Link>
            <Link
              href="/cenik"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Celý ceník
            </Link>
          </div>
        </div>
      </section>

      {/* Related Article */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h3 className="font-display text-xl text-slate-900 mb-6">Více informací</h3>
        <Link
          href="/blog/hifu-7d-revoluce-v-omlazovani"
          className="group block overflow-hidden rounded-2xl border border-faint bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft"
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative aspect-[16/10] md:aspect-square md:w-64 overflow-hidden bg-slate-100">
              <Image
                src="/images/salon/recepce.jpg"
                alt="HIFU článek"
                fill
                sizes="256px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 p-6">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 mb-3">
                Technologie
              </span>
              <h4 className="font-medium text-slate-900 text-lg mb-2">HIFU 7D - revoluce v omlazování</h4>
              <p className="text-sm text-slate-600">
                Neinvazivní lifting bez operace s okamžitým efektem. Zjistěte více o této revoluční technologii.
              </p>
            </div>
          </div>
        </Link>
      </section>

      {/* Booking Section */}
      <section id="rezervace" className="mx-auto max-w-4xl px-6 py-[90px]">
        <BookingForm
          preselectedService={{
            id: 'hifu-facelift-cely-oblicej',
            name: 'HIFU facelift celý obličej',
            price: '5 500 Kč',
            duration: 60,
          }}
        />
      </section>
    </main>
  )
}
