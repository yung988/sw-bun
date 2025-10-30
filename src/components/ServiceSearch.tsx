'use client'

import type { Service } from '@/lib/services'
import { Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

type Props = {
  services: Service[]
}

// Mapování kategorií na obrázky
const categoryImages: Record<string, string> = {
  kosmetika: '/images/kosmetika/hydratational-1.jpg',
  hifu: '/images/hifu/hifu-1.jpg',
  'budovani-svalu': '/images/ems/budovani-svalu-1.jpeg',
  endosphere: '/images/stylizované/details-1.jpeg',
  kavitace: '/images/kavitace/kavitace-1.jpg',
  lpg: '/images/lpg/lpg-1.jpg',
  'prodluzovani-vlasu': '/images/salon/recepce.jpg',
  'ostatni-sluzby': '/images/salon/recepce.jpg',
}

export default function ServiceSearch({ services }: Props) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Filtrování služeb podle vyhledávacího dotazu
  const filteredServices = useMemo(() => {
    if (!query.trim()) return []

    const searchTerm = query.toLowerCase().trim()

    return services
      .filter((service) => {
        const nameMatch = service.name.toLowerCase().includes(searchTerm)
        const categoryMatch = service.category.toLowerCase().includes(searchTerm)
        const descriptionMatch = service.description?.toLowerCase().includes(searchTerm)

        return nameMatch || categoryMatch || descriptionMatch
      })
      .slice(0, 8) // Omezit na 8 výsledků
  }, [query, services])

  const handleClear = () => {
    setQuery('')
    setIsOpen(false)
  }

  const handleFocus = () => {
    setIsOpen(true)
  }

  const handleBlur = () => {
    // Delay to allow click on results
    setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Hledat služby... (např. HIFU, kosmetika, lifting)"
          className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition"
            aria-label="Vymazat vyhledávání"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl max-h-[500px] overflow-y-auto z-50">
          {filteredServices.length > 0 ? (
            <div className="p-2">
              <div className="px-4 py-2 text-xs text-slate-500 font-medium uppercase tracking-wider">
                Nalezeno {filteredServices.length}{' '}
                {filteredServices.length === 1 ? 'služba' : filteredServices.length < 5 ? 'služby' : 'služeb'}
              </div>
              {filteredServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/sluzby/${service.categoryId}/${service.slug}`}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 transition group"
                  onClick={() => handleClear()}
                >
                  {/* Service Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                    <Image
                      src={categoryImages[service.categoryId] || '/images/service-default.jpg'}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Service Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-slate-900 group-hover:text-slate-700 transition truncate">
                          {service.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">{service.category}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-medium text-slate-900">{service.price}</div>
                        <div className="text-xs text-slate-500">{service.duration} min</div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all flex-shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>Zobrazit detail</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-slate-400 mb-2">
                <Search className="h-8 w-8 mx-auto" />
              </div>
              <p className="text-sm text-slate-600 mb-1">Nenalezeny žádné služby</p>
              <p className="text-xs text-slate-500">Zkuste jiný výraz nebo procházejte kategorie níže</p>
            </div>
          )}
        </div>
      )}

      {/* Overlay for mobile */}
      {isOpen && query && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={handleClear}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleClear()
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
