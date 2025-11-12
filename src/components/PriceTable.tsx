'use client'

import { formatPrice } from '@/lib/price'
import type { MainService } from '@/lib/services'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useModals } from '@/components/ModalProvider'

type CategoryFilter = 'all' | string

type Props = {
  services: MainService[]
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
  const { openBooking } = useModals()

  // Flatten pricing items for display
  type FlatService = {
    slug: string
    name: string
    description: string
    category: string
    categoryId: string
    image: string
    duration: number
    sessions: number
    price: number
    isPackage: boolean
  }

  const flattenedServices = useMemo(() => {
    const flattened: FlatService[] = []
    for (const service of services) {
      // If service has pricing, create items for each pricing variant
      if (service.pricing.length > 0) {
        for (const pricing of service.pricing) {
          flattened.push({
            slug: `${service.slug}-${pricing.sortOrder}`,
            name: pricing.name || service.name,
            description: pricing.description || service.shortDescription,
            category: service.categoryName,
            categoryId: service.serviceId,
            image: service.image,
            duration: pricing.duration,
            sessions: pricing.sessions,
            price: pricing.price,
            isPackage: pricing.isPackage,
          })
        }
      } else {
        // No pricing, show service itself
        flattened.push({
          slug: service.slug,
          name: service.name,
          description: service.shortDescription,
          category: service.categoryName,
          categoryId: service.serviceId,
          image: service.image,
          duration: 0,
          sessions: 1,
          price: 0,
          isPackage: false,
        })
      }

      // Add subcategory pricing items
      for (const sub of service.subcategories) {
        for (const pricing of sub.pricing) {
          flattened.push({
            slug: `${sub.slug}-${pricing.sortOrder}`,
            name: `${sub.name} - ${pricing.name}`,
            description: pricing.description || sub.shortDescription,
            category: sub.categoryName,
            categoryId: sub.serviceId,
            image: sub.image,
            duration: pricing.duration,
            sessions: pricing.sessions,
            price: pricing.price,
            isPackage: pricing.isPackage,
          })
        }
      }
    }
    return flattened
  }, [services])

  const allServices = useMemo(() => flattenedServices, [flattenedServices])
  const categories = useMemo(() => ['all', ...new Set(allServices.map((s) => s.categoryId))], [allServices])

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

  const handleServiceClick = (service: FlatService) => {
    openBooking({
      id: service.slug,
      name: service.name,
      price: formatPrice(service.price),
      duration: service.duration > 0 ? service.duration : null,
    })
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Search & Filter Controls - Fixed */}
      <div className="flex-shrink-0 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
            placeholder="Hledat službu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-slate-900 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Vymazat</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                categoryFilter === cat
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-200">
          <span>
            <strong className="text-slate-900">{filteredServices.length}</strong> služeb
            {searchQuery && (
              <span>
                {' '}
                pro "<strong className="text-slate-900">{searchQuery}</strong>"
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Desktop Table - Scrollable */}
      <div className="hidden lg:block flex-1 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="h-full overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Služba
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-slate-600">
                  Kategorie
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium uppercase tracking-wider text-slate-600">
                  Délka
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                  Cena
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
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
                  <tr
                    key={service.slug}
                    onClick={() => handleServiceClick(service)}
                    className="group hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        {service.image && (
                          <img src={service.image} alt={service.name} className="w-8 h-8 object-cover rounded flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-medium text-sm text-slate-900 group-hover:text-slate-700 truncate">{service.name}</p>
                            {service.isPackage && (
                              <span className="inline-flex items-center rounded bg-slate-900 px-1.5 py-0.5 text-xs font-medium text-white flex-shrink-0">
                                Balíček
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{service.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-center text-sm text-slate-600">
                      {service.duration > 0 ? `${service.duration} min` : '—'}
                    </td>
                    <td className="px-3 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <p className="text-base font-semibold text-slate-900">{formatPrice(service.price)}</p>
                        <svg className="h-4 w-4 text-slate-400 group-hover:text-slate-900 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <title>Rezervovat</title>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards - Scrollable */}
      <div className="lg:hidden flex-1 overflow-y-auto space-y-3">
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
            <div
              key={service.slug}
              onClick={() => handleServiceClick(service)}
              className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="mb-2 flex items-start gap-2">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-12 h-12 object-cover rounded flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                      {service.category}
                    </span>
                    {service.isPackage && (
                      <span className="inline-flex items-center rounded bg-slate-900 px-2 py-0.5 text-xs font-medium text-white">
                        Balíček
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-sm text-slate-900 truncate">{service.name}</h3>
                  <p className="text-base font-semibold text-slate-900 mt-0.5">{formatPrice(service.price)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex gap-3">
                  {service.duration > 0 && <span>⏱️ {service.duration} min</span>}
                  {service.sessions > 1 && <span>📅 {service.sessions}×</span>}
                </div>
                <span className="text-slate-900 font-medium">Rezervovat →</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
