'use client'

import OpenBookingButton from '@/components/OpenBookingButton'
import ScrollableImageGallery from '@/components/ScrollableImageGallery'
import { getCategoryMosaic } from '@/data/imagesManifest'
import type { MainService } from '@/lib/services'
import { useState } from 'react'

type Props = {
  services: MainService[]
}

export default function ServicesLayout({ services }: Props) {
  const [selectedService, setSelectedService] = useState<MainService>(services[0])

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Žádné služby k zobrazení.</p>
      </div>
    )
  }

  // Get images for gallery - use service images or fallback to mosaic
  let galleryImages: { src: string; alt: string }[] = []
  if (selectedService.images && selectedService.images.length > 0) {
    galleryImages = selectedService.images.map((src) => ({ src, alt: selectedService.name }))
  } else {
    const mosaic = getCategoryMosaic(selectedService.serviceId)
    galleryImages = mosaic.slice(0, 20).map((src) => ({ src, alt: selectedService.name }))
  }

  return (
    // Pozn.: Tailwind arbitrární hodnoty v grid-template-columns musí používat podtržítka místo mezer
    // a čárky v hodnotách se zapisují jako _ (např. minmax(0,_1fr)). Původní zápis s čárkami bránil
    // aplikaci 3-sloupcového layoutu na desktopu.
    <div className="min-h-[600px] lg:h-full grid gap-5 md:gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-[280px_1fr_360px] xl:grid-cols-[320px_1fr_400px]">
      {/* Left: Scrollable Service List */}
      <aside className="h-64 md:h-80 lg:h-full overflow-y-auto overscroll-contain lg:order-1">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 lg:p-8 shadow-sm h-full flex flex-col">
          <h2 className="text-xl font-light text-slate-900 mb-4 flex-shrink-0 tracking-tight">Naše služby</h2>
          <nav className="space-y-2.5 flex-1 overflow-y-auto pr-2 md:pr-3 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {services.map((service) => (
              <button
                key={service.serviceId}
                onClick={() => setSelectedService(service)}
                className={`w-full text-left rounded-xl px-5 py-3.5 transition-all duration-200 ${
                  selectedService.serviceId === service.serviceId
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:shadow-sm'
                }`}
              >
                <div className="font-medium leading-tight tracking-tight">{service.name}</div>
                <div
                  className={`text-sm mt-1 ${
                    selectedService.serviceId === service.serviceId ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {service.shortDescription}
                </div>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Center: Scrollable Content - Title, Description, Indications, Contraindications, Pricing */}
      <main className="min-h-[400px] lg:h-full lg:overflow-y-auto lg:overscroll-contain pr-2 space-y-6 lg:space-y-8 lg:order-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {/* Header */}
        <div className="flex-shrink-0">
          <div className="text-sm font-medium text-slate-600 mb-2">{selectedService.categoryName}</div>
          <h1 className="text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">{selectedService.name}</h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-prose">{selectedService.shortDescription}</p>
        </div>

        {/* Full Description */}
        {selectedService.fullDescription && (
          <section className="flex-shrink-0">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">O ošetření</h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-line max-w-prose">
              {selectedService.fullDescription}
            </p>
          </section>
        )}

        {/* Indications */}
        {selectedService.indications.length > 0 && (
          <section className="flex-shrink-0">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Pro koho je vhodné</h2>
            <ul className="space-y-2">
              {selectedService.indications.map((indication, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base text-slate-700">{indication}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Contraindications */}
        {selectedService.contraindications.length > 0 && (
          <section className="flex-shrink-0 rounded-xl border border-red-200 bg-red-50 p-4 md:p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Kontraindikace</h2>
            <ul className="space-y-2">
              {selectedService.contraindications.map((contra, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base text-slate-700">{contra}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pricing */}
        <section className="flex-shrink-0">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Ceník</h2>
          {selectedService.pricing.length > 0 ? (
            <div className="space-y-3">
              {selectedService.pricing.map((item, idx) => (
                <div
                  key={idx}
                  className="pb-3 border-b border-slate-200 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 text-sm md:text-base">{item.name}</h4>
                      {item.description && (
                        <p className="text-xs md:text-sm text-slate-600 mt-1">{item.description}</p>
                      )}
                    </div>
                    {item.isPackage && (
                      <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-1 text-xs font-medium text-white flex-shrink-0">
                        Balíček
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <div className="text-xs md:text-sm text-slate-500">
                      {item.duration > 0 && `${item.duration} min`}
                      {item.duration > 0 && item.sessions > 1 && ' • '}
                      {item.sessions > 1 && `${item.sessions}× sezení`}
                    </div>
                    <div className="text-lg md:text-xl font-semibold text-slate-900">{item.priceFormatted}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm md:text-base text-slate-600">Ceny na vyžádání</p>
          )}
          
          {/* Booking Button */}
          <div className="mt-6">
            <OpenBookingButton className="w-full rounded-xl bg-slate-900 px-6 py-3 text-sm md:text-base font-semibold text-white transition-all duration-200 hover:bg-slate-800 shadow-sm hover:shadow-md">
              Objednat online
            </OpenBookingButton>
          </div>
        </section>
      </main>

      {/* Right: Scrollable Image Gallery */}
      <aside className="h-64 md:h-80 lg:h-full overflow-y-auto overscroll-contain lg:order-3">
        <ScrollableImageGallery images={galleryImages} />
      </aside>
    </div>
  )
}
