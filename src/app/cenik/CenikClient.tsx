'use client'
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
    <main className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      <section className="site-container pt-12 pb-10">
        <SectionTitle
          center={false}
          eyebrow="Ceník"
          title="Ceník služeb SW Beauty"
          subtitle="Aktuální nabídka ošetření a balíčků. Ceny jsou uvedeny v Kč. Pro volné termíny nás kontaktujte."
        />
      </section>

      {/* Filter Tabs */}
      <section className="site-container pb-8">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-black text-white shadow-sm ring-1 ring-black/10 dark:bg-white dark:text-graphite'
                : 'text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            Vše
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-sm ring-1 ring-black/10 dark:bg-white dark:text-graphite'
                  : 'text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {order.map((category) => (
        <section key={category} className="site-container py-8">
          <h3 className="mb-6 font-display text-xl text-slate-900 dark:text-white md:text-2xl">{category}</h3>
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

      <section className="site-container pt-8">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Uvedené ceny jsou orientační. Finální doporučení a počet sezení stanovíme při konzultaci dle cíle a stavu
          pleti/těla.
        </p>
      </section>
    </main>
  )
}
