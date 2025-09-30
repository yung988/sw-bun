'use client'
import Navbar from '@/components/Navbar'
import PriceCard from '@/components/PriceCard'
import SectionTitle from '@/components/SectionTitle'
import type { PriceItem } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function KosmetikaClient() {
  const [prices, setPrices] = useState<PriceItem[]>([])

  useEffect(() => {
    fetch('/api/pricelist')
      .then((res) => res.json())
      .then((data: PriceItem[]) => {
        const kosmetikaPrices = data.filter(
          (item) => item.CategoryName === 'KOSMETIKA' || item.CategoryName === 'HYDRAFACIAL'
        )
        setPrices(kosmetikaPrices)
      })
  }, [])

  const kosmetika = prices.filter((p) => p.CategoryName === 'KOSMETIKA')
  const hydrafacial = prices.filter((p) => p.CategoryName === 'HYDRAFACIAL')

  return (
    <main className="min-h-screen bg-white pb-24">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-8">
        <div className="space-y-4">
          <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-slate-500">
            Kosmetika
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900">Profesionální kosmetika</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Individuální ošetření pleti podle typu a potřeb. Hydrafacial, dermapen, laminace řas a obočí. Dopřejte své
            pleti profesionální péči.
          </p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
          <Image
            src="/images/cosmetic.png"
            alt="Profesionální kosmetika"
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
            <h2 className="font-display text-2xl md:text-3xl font-light text-slate-900 mb-6">Naše kosmetické služby</h2>
            <div className="space-y-4 text-slate-600">
              <p>
                Nabízíme širokou škálu kosmetických ošetření pro všechny typy pleti. Od základní péče přes speciální
                ošetření až po pokročilé technologie jako Hydrafacial a Dermapen.
              </p>
              <p>
                Každé ošetření přizpůsobujeme individuálním potřebám vaší pleti. Používáme pouze kvalitní profesionální
                produkty a nejmodernější technologie.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl text-slate-900 mb-4">Co nabízíme</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Ošetření pro všechny typy pleti</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Hydrafacial - hloubkové čištění</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Dermapen - mikrojehličkování</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Laminace řas a obočí</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Anti-age ošetření s kolagenem</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-400">✓</span>
                <span className="text-slate-600">Ošetření problematické pleti</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Hydrafacial Section */}
      {hydrafacial.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <SectionTitle
            center={false}
            eyebrow="Hydrafacial"
            title="Hydrafacial - Hloubkové čištění pleti"
            subtitle="Revoluční technologie pro dokonale čistou a hydratovanou pleť."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {hydrafacial.map((item) => (
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

      {/* Kosmetika Section */}
      {kosmetika.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <SectionTitle
            center={false}
            eyebrow="Ceník"
            title="Kosmetická ošetření"
            subtitle="Individuální péče podle typu pleti a vašich potřeb."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {kosmetika.map((item) => (
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
          <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Objednejte si kosmetické ošetření</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Dopřejte své pleti profesionální péči. Rádi vám poradíme s výběrem vhodného ošetření.
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
    </main>
  )
}
