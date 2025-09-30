'use client'
import Navbar from '@/components/Navbar'
import PriceCard from '@/components/PriceCard'
import SectionTitle from '@/components/SectionTitle'
import type { PriceItem } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function EndosRollerClient() {
  const [prices, setPrices] = useState<PriceItem[]>([])

  useEffect(() => {
    fetch('/api/pricelist')
      .then((res) => res.json())
      .then((data: PriceItem[]) => {
        const endosPrices = data.filter((item) => item.CategoryName === 'ENDOS-ROLLER')
        setPrices(endosPrices)
      })
  }, [])

  return (
    <main className="min-h-screen bg-white pb-24">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-8">
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-slate-500">
            Formování
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900">Endos-roller</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Lymfatická masáž pro detoxikaci, konturování postavy a redukci celulitidy. Viditelné výsledky již po prvním
            ošetření.
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
          <Image
            src="/images/service-endosphere.jpg"
            alt="Endos-roller"
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-slate-900 mb-6">Co je Endos-roller?</h2>
            <div className="space-y-4 text-slate-600">
              <p>
                Endos-roller (Endosphere) je revoluční technologie pro lymfatickou masáž a konturování těla. Kombinuje
                mechanickou stimulaci s kompresivní mikrovibrací pomocí 55 rotujících silikonových válečků.
              </p>
              <p>
                Tyto mikrovibrace pronikají hluboko do tkáně a stimulují lymfatický systém, krevní oběh, tukovou a
                pojivovou tkáň. Výsledkem je detoxikace, zeštíhlení a zpevnění pokožky.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl text-slate-900 mb-4">Výhody Endos-rolleru</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Redukce celulitidy a vyhlazení pokožky</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Zeštíhlení problematických partií</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Detoxikace a odvodnění těla</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Zpevnění a zlepšení elasticity kůže</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Úleva od těžkých a oteklých nohou</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Konturování siluety</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {prices.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <SectionTitle
            center={false}
            eyebrow="Ceník"
            title="Endos-roller ceník"
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
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[2rem] border border-faint bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-center">
          <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Vyzkoušejte Endos-roller</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Objednejte si první ošetření a poznejte sílu lymfatické masáže.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="mailto:info@swbeauty.cz"
              className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Objednat ošetření
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
          href="/blog/jak-funguje-endos-roller"
          className="group block overflow-hidden rounded-2xl border border-faint bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-soft"
        >
          <div className="flex flex-col md:flex-row">
            <div className="relative aspect-[16/10] md:aspect-square md:w-64 overflow-hidden bg-slate-100">
              <Image
                src="/images/salon/cekarna.jpg"
                alt="Endos-roller článek"
                fill
                sizes="256px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 p-6">
              <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 mb-3">
                Tipy
              </span>
              <h4 className="font-medium text-slate-900 text-lg mb-2">Jak funguje Endos-roller</h4>
              <p className="text-sm text-slate-600">
                Lymfatická masáž pro detoxikaci a konturování postavy. Zjistěte více o této technologii.
              </p>
            </div>
          </div>
        </Link>
      </section>
    </main>
  )
}
