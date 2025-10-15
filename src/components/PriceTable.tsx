'use client'

import type { Service } from '@/lib/services'
import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { formatPrice } from '@/lib/services'

type CategoryFilter = 'all' | string

type Props = {
  services: Service[]
}

const categoryLabels: Record<string, string> = {
  all: 'Vše',
  kosmetika: 'Kosmetika',
  hifu: 'HIFU',
  'budovani-svalu': 'Budování svalů',
  endosphere: 'Endosphere',
  kavitace: 'Kavitace',
  'ostatni-sluzby': 'Ostatní služby',
  'Prodlužování vlasů': 'Prodlužování vlasů',
}

export default function PriceTable({ services }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')

  // Initialize filter from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.includes(categoryParam as CategoryFilter)) {
      setCategoryFilter(categoryParam as CategoryFilter)
    }
    const searchParam = searchParams.get('search')
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParams, categories])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (categoryFilter !== 'all') {
      params.set('category', categoryFilter)
    }
    if (searchQuery) {
      params.set('search', searchQuery)
    }
    const query = params.toString()
    router.replace(`/cenik${query ? `?${query}` : ''}`, { scroll: false })
  }, [categoryFilter, searchQuery, router])

  const allServices = useMemo(() => services, [services])
  const categories = ['all', ...new Set(allServices.map((s) => s.categoryId))]

  // Initialize filter from URL params
  useEffect(() => {
    const cats = ['all', ...new Set(allServices.map((s) => s.categoryId))]
    const categoryParam = searchParams.get('category')
    if (categoryParam && cats.includes(categoryParam as CategoryFilter)) {
      setCategoryFilter(categoryParam as CategoryFilter)
    }
    const searchParam = searchParams.get('search')
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParams, allServices])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (categoryFilter !== 'all') {
      params.set('category', categoryFilter)
    }
    if (searchQuery) {
      params.set('search', searchQuery)
    }
    const query = params.toString()
    router.replace(`/cenik${query ? `?${query}` : ''}`, { scroll: false })
  }, [categoryFilter, searchQuery, router])

  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      const matchesCategory = categoryFilter === 'all' || service.categoryId === categoryFilter
      const matchesSearch =
        searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [allServices, categoryFilter, searchQuery])

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Hledat</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Hledat službu, popis nebo kategorii..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-slate-900 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Vymazat</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Zobrazeno <strong className="text-slate-900">{filteredServices.length}</strong> služeb
          {searchQuery && (
            <span>
              {' '}
              pro "<strong className="text-slate-900">{searchQuery}</strong>"
            </span>
          )}
        </p>
        {filteredServices.length > 0 && (
          <Link
            href="/rezervace"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Rezervovat termín
          </Link>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Obrázek
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Služba
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Kategorie
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Délka
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Sezení
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                  Cena
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                  Akce
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>Nenalezeno</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-slate-600">Žádné služby nenalezeny</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('')
                          setCategoryFilter('all')
                        }}
                        className="text-sm text-slate-900 underline hover:no-underline"
                      >
                        Resetovat filtry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr key={service.slug} className="group hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      {service.image && (
                        <img src={service.image} alt={service.name} className="w-12 h-12 object-cover rounded-lg" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-slate-900 group-hover:text-slate-700">{service.name}</p>
                            {service.isPackage && (
                              <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-xs font-medium text-white">
                                Balíček
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-slate-600 line-clamp-2">{service.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{service.duration} min</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{service.sessions}</td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-lg font-semibold text-slate-900">{formatPrice(service.price)}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/sluzby/${service.categoryId}/${service.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-slate-900 hover:text-slate-600 transition"
                      >
                        Detail
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <title>Detail</title>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredServices.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <svg className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <title>Nenalezeno</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-slate-600">Žádné služby nenalezeny</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setCategoryFilter('all')
              }}
              className="text-sm text-slate-900 underline hover:no-underline"
            >
              Resetovat filtry
            </button>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div key={service.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-start gap-3">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                      {service.category}
                    </span>
                    {service.isPackage && (
                      <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-medium text-white">
                        Balíček
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-slate-900">{service.name}</h3>
                  <p className="text-lg font-semibold text-slate-900 mt-1">{formatPrice(service.price)}</p>
                </div>
              </div>

              <p className="mb-4 text-sm text-slate-600 line-clamp-3">{service.description}</p>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex gap-4 text-xs text-slate-500">
                  <span>⏱️ {service.duration} min</span>
                  <span>📅 {service.sessions}</span>
                </div>
                <Link
                  href={`/sluzby/${service.categoryId}/${service.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-slate-900"
                >
                  Detail
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Detail</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
