'use client'
import PriceCard from '@/components/PriceCard'
import SectionTitle from '@/components/SectionTitle'
import type { PriceItem } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function EMSClient() {
  const [prices, setPrices] = useState<PriceItem[]>([])

  useEffect(() => {
    fetch('/api/pricelist')
      .then((res) => res.json())
      .then((data: PriceItem[]) => {
        const emsPrices = data.filter((item) => item.CategoryName === 'BUDOVÁNÍ SVALŮ')
        setPrices(emsPrices)
      })
  }, [])

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <section className="site-container section-y">
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-slate-500">
            Fitness
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900">EMS Budování svalů</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            30 minut = 5,5 hodiny v posilovně. Elektromagnetická stimulace pro budování svalů, spalování tuku a zpevnění
            postavy bez námahy.
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="site-container section-y">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
          <Image
            src="/images/ems.png"
            alt="EMS budování svalů"
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="site-container section-y">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-slate-900 mb-6">Co je EMS technologie?</h2>
            <div className="space-y-4 text-slate-600">
              <p>
                EMS (Electrical Muscle Stimulation) využívá elektromagnetické pole vysoké intenzity (HIFEM), které
                vyvolává supramaximální kontrakce svalů. Během 30 minut dosáhnete 30 000 kontrakcí, což odpovídá 5,5
                hodinám intenzivního tréninku!
              </p>
              <p>
                Tyto kontrakce jsou mnohem intenzivnější než při běžném cvičení a dosahují 100% aktivace svalových
                vláken. Výsledkem je růst svalové hmoty, spalování tuku a zpevnění postavy.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl text-slate-900 mb-4">Výhody EMS</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Úspora času - 30 minut = 5,5h v posilovně</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Bez námahy - ležíte a svaly pracují za vás</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Cílené posilování konkrétních partií</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Viditelné výsledky po 3-5 sezeních</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Bezpečné bez rizika zranění</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Vhodné pro regeneraci svalů</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Treated Areas */}
      <section className="site-container py-12">
        <h2 className="font-display text-2xl md:text-3xl font-light text-slate-900 mb-8 text-center">
          Které partie lze ošetřit?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Břicho', desc: 'Zpevnění břišních svalů a redukce tuku' },
            { title: 'Zadek', desc: 'Lifting a tvarování hýždí' },
            { title: 'Stehna', desc: 'Zpevnění a zeštíhlení' },
            { title: 'Paže', desc: 'Definice a odstranění povislé kůže' },
            { title: 'Lýtka', desc: 'Tvarování a posílení' },
            { title: 'Kombinace', desc: 'Ošetření více partií najednou' },
          ].map((area) => (
            <div key={area.title} className="rounded-2xl border border-faint bg-white p-6 shadow-sm">
              <h4 className="font-medium text-slate-900 mb-2">{area.title}</h4>
              <p className="text-sm text-slate-600">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      {prices.length > 0 && (
        <section className="site-container section-y">
          <SectionTitle
            center={false}
            eyebrow="Ceník"
            title="EMS Budování svalů - ceník"
            subtitle="Ceny jsou uvedeny v Kč. Pro optimální výsledky doporučujeme kúru 8-10 ošetření."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {prices.map((item) => (
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
      <section className="site-container py-12">
        <div className="rounded-[2rem] border border-faint bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-center">
          <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Vyzkoušejte EMS budování svalů</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Objednejte si první sezení a poznejte sílu elektromagnetické stimulace.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="mailto:info@swbeauty.cz"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Objednat sezení
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
      <section className="site-container py-12">
        <h3 className="font-display text-xl text-slate-900 mb-6">Více informací</h3>
        <Link
          href="/blog/ems-budovani-svalu"
          className="group block overflow-hidden rounded-2xl border border-faint bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft"
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative aspect-[16/10] md:aspect-square md:w-64 overflow-hidden bg-slate-100">
              <Image
                src="/images/salon/stul_detail.jpg"
                alt="EMS článek"
                fill
                sizes="256px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 p-6">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 mb-3">
                Fitness
              </span>
              <h4 className="font-medium text-slate-900 text-lg mb-2">EMS budování svalů</h4>
              <p className="text-sm text-slate-600">
                30 minut = 5,5 hodiny v posilovně. Zjistěte, jak to funguje a jaké jsou výsledky.
              </p>
            </div>
          </div>
        </Link>
      </section>
    </main>
  )
}
