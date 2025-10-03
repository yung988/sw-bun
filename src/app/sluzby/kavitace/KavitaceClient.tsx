'use client'
import PriceCard from '@/components/PriceCard'
import SectionTitle from '@/components/SectionTitle'
import type { PriceItem } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function KavitaceClient() {
  const [prices, setPrices] = useState<PriceItem[]>([])

  useEffect(() => {
    fetch('/api/pricelist')
      .then((res) => res.json())
      .then((data: PriceItem[]) => {
        const kavitacePrices = data.filter((item) => item.CategoryName === 'KAVITACE')
        setPrices(kavitacePrices)
      })
  }, [])

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <section className="site-container section-y">
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-slate-500">
            Zeštíhlení
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900">Kavitace</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Ultrazvuková kavitace pro redukci tukových zásob. Neinvazivní metoda pro zeštíhlení problematických partií
            bez operace.
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="site-container section-y">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
          <Image
            src="/images/cavitace.png"
            alt="Kavitace"
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
            <h2 className="font-display text-2xl md:text-3xl font-light text-slate-900 mb-6">Co je kavitace?</h2>
            <div className="space-y-4 text-slate-600">
              <p>
                Kavitace je neinvazivní metoda pro redukci tukových zásob pomocí nízkofrekvenčního ultrazvuku.
                Ultrazvukové vlny vytvářejí v tukové tkáni mikrobubliny, které implodují a rozbíjejí tukové buňky.
              </p>
              <p>
                Uvolněný tuk je následně přirozeně odstraněn tělem přes lymfatický systém. Výsledkem je viditelné
                zmenšení objemu ošetřované oblasti již po prvním sezení.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl text-slate-900 mb-4">Výhody kavitace</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Neinvazivní bez řezů a anestézie</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Viditelné výsledky po prvním sezení</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Bez rekonvalescence</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Cílená redukce tuku</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Bezpečné a bezbolestné</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Vhodné pro všechny typy pleti</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Treated Areas */}
      <section className="site-container section-y">
        <h2 className="font-display text-2xl md:text-3xl font-light text-slate-900 mb-8 text-center">
          Které partie lze ošetřit?
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Břicho', desc: 'Redukce tuku a zmenšení objemu' },
            { title: 'Boky', desc: 'Odstranění "love handles"' },
            { title: 'Stehna', desc: 'Zeštíhlení vnitřní i vnější strany' },
            { title: 'Zadek', desc: 'Tvarování a zeštíhlení' },
            { title: 'Paže', desc: 'Redukce tuku na pažích' },
            { title: 'Nohy', desc: 'Celkové zeštíhlení nohou' },
          ].map((area) => (
            <div key={area.title} className="card-soft p-6">
              <h4 className="font-medium text-slate-900 mb-2">{area.title}</h4>
              <p className="text-sm text-slate-600">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="site-container section-y">
        <h2 className="font-display text-2xl md:text-3xl font-light text-slate-900 mb-8 text-center">
          Jak probíhá ošetření?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-medium text-slate-900">
              1
            </div>
            <h4 className="font-medium text-slate-900 mb-2">Konzultace</h4>
            <p className="text-sm text-slate-600">Probereme vaše cíle a určíme vhodné oblasti k ošetření</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-medium text-slate-900">
              2
            </div>
            <h4 className="font-medium text-slate-900 mb-2">Ošetření</h4>
            <p className="text-sm text-slate-600">Aplikace ultrazvuku na vybrané partie, trvá 45-100 minut</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-medium text-slate-900">
              3
            </div>
            <h4 className="font-medium text-slate-900 mb-2">Výsledky</h4>
            <p className="text-sm text-slate-600">Viditelné zmenšení objemu, doporučujeme kúru 6-8 sezení</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {prices.length > 0 && (
        <section className="site-container section-y">
          <SectionTitle
            center={false}
            eyebrow="Ceník"
            title="Kavitace - ceník"
            subtitle="Ceny jsou uvedeny v Kč. Pro optimální výsledky doporučujeme kúru 6-8 ošetření."
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
      <section className="site-container section-y">
        <div className="rounded-[2rem] border border-faint bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-center">
          <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Vyzkoušejte kavitaci</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Objednejte si první sezení a poznejte účinnou metodu pro redukci tuku.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="mailto:info@swbeauty.cz" className="btn bg-white px-8 py-3.5 text-slate-900 hover:bg-slate-50">
              Objednat sezení
            </Link>
            <Link href="/cenik" className="btn-ghost-dark px-8 py-3.5">
              Celý ceník
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
