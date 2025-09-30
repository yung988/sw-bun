'use client'
import Navbar from '@/components/Navbar'
import PriceCard from '@/components/PriceCard'
import SectionTitle from '@/components/SectionTitle'
import type { PriceItem } from '@/types'
import { useEffect, useState } from 'react'

export default function CenikClient() {
  const [items, setItems] = useState<PriceItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/pricelist')
      .then((res) => res.json())
      .then((data: PriceItem[]) => {
        setItems(data)
        const cats = Array.from(new Set(data.map((item) => item.CategoryName || item.CategoryId || 'Ostatní')))
        setCategories(cats)
      })
  }, [])

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => (item.CategoryName || item.CategoryId) === selectedCategory)

  const groupByCategory = (items: PriceItem[]) => {
    const order: string[] = []
    const groups: Record<string, PriceItem[]> = {}
    for (const it of items) {
      const key = it.CategoryName || it.CategoryId || 'Ostatní'
      if (!groups[key]) {
        groups[key] = []
        order.push(key)
      }
      groups[key].push(it)
    }
    return { order, groups }
  }

  const { order, groups } = groupByCategory(filteredItems)

  return (
    <main className="min-h-screen bg-white pb-24">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-12 pb-10">
        <SectionTitle
          center={false}
          eyebrow="Ceník"
          title="Ceník služeb SW Beauty"
          subtitle="Aktuální nabídka ošetření a balíčků. Ceny jsou uvedeny v Kč. Pro volné termíny nás kontaktujte."
        />
      </section>

      {/* Filter Tabs */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'border border-faint bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            Vše
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'border border-faint bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {order.map((category) => (
        <section key={category} className="mx-auto max-w-6xl px-6 py-8">
          <h3 className="mb-6 font-display text-xl text-slate-900 md:text-2xl">{category}</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {groups[category].map((it) => (
              <PriceCard
                key={`${category}-${it.PackageName}-${it.Price}`}
                title={it.PackageName}
                price={it.Price || ''}
                sessions={it.Sessions || undefined}
                description={it.Description || undefined}
              />
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-6 pt-8">
        <p className="text-xs text-slate-500">
          Uvedené ceny jsou orientační. Finální doporučení a počet sezení stanovíme při konzultaci dle cíle a stavu
          pleti/těla.
        </p>
      </section>
    </main>
  )
}
