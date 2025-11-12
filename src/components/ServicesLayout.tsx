'use client'

import OpenBookingButton from '@/components/OpenBookingButton'
import ScrollableImageGallery from '@/components/ScrollableImageGallery'
import { getCategoryMosaic } from '@/data/imagesManifest'
import { gsap } from '@/lib/gsap'
import type { MainService } from '@/lib/services'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useModals } from '@/components/ModalProvider'

type Props = {
  services: MainService[]
}

export default function ServicesLayout({ services }: Props) {
  const [selectedService, setSelectedService] = useState<MainService>(services[0])
  const contentRef = useRef<HTMLDivElement>(null)
  const { openBooking } = useModals()

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    }
  }, [selectedService])

  const handlePricingClick = (pricingName: string) => {
    openBooking(`${selectedService.name} - ${pricingName}`)
  }

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

  // Get main image for the selected service
  const mainImage = galleryImages[0]?.src || '/images/placeholder.jpg'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] xl:grid-cols-[320px_1fr_400px] gap-6 lg:gap-8 xl:gap-10 px-6 md:px-8 lg:px-10">
      {/* Left: Fixed Service List */}
      <aside className="lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-120px)]">
        <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-lg h-full flex flex-col">
          <h2 className="text-2xl font-light text-slate-900 mb-6 tracking-tight">Naše služby</h2>
          <nav className="space-y-3 overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {services.map((service) => (
              <button
                key={service.serviceId}
                onClick={() => setSelectedService(service)}
                className={`w-full text-left rounded-2xl px-5 py-4 transition-all duration-300 ${
                  selectedService.serviceId === service.serviceId
                    ? 'bg-slate-900 text-white shadow-lg scale-[1.02]'
                    : 'bg-slate-50/80 text-slate-700 hover:bg-slate-100 hover:shadow-md hover:scale-[1.01]'
                }`}
              >
                <div className="font-semibold leading-tight tracking-tight">{service.name}</div>
                <div
                  className={`text-sm mt-1.5 leading-relaxed ${
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

      {/* Middle: Scrollable Content */}
      <main ref={contentRef} className="space-y-8 md:space-y-10">
        {/* Header */}
        <div>
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            {selectedService.categoryName}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-4 tracking-tight leading-tight">
            {selectedService.name}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">{selectedService.shortDescription}</p>
        </div>

        {/* Full Description */}
        {selectedService.fullDescription && (
          <section className="bg-slate-50 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-light text-slate-900 mb-4">O ošetření</h2>
            <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {selectedService.fullDescription}
            </p>
          </section>
        )}

        {/* Indications */}
        {selectedService.indications.length > 0 && (
          <section className="bg-emerald-50 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-light text-slate-900 mb-4">Pro koho je vhodné</h2>
            <ul className="space-y-2.5">
              {selectedService.indications.map((indication, idx) => (
                <li key={idx} className="flex items-start gap-3">
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
                  <span className="text-sm text-slate-700 leading-relaxed">{indication}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Contraindications */}
        {selectedService.contraindications.length > 0 && (
          <section className="bg-red-50 rounded-3xl p-6 md:p-8 border-2 border-red-100">
            <h2 className="text-xl md:text-2xl font-light text-slate-900 mb-4">Kontraindikace</h2>
            <ul className="space-y-2.5">
              {selectedService.contraindications.map((contra, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-slate-700 leading-relaxed">{contra}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Pricing */}
        <section className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-6 md:p-8 border border-slate-200">
          <h2 className="text-xl md:text-2xl font-light text-slate-900 mb-4">Ceník</h2>
          {selectedService.pricing.length > 0 ? (
            <div className="space-y-2">
              {selectedService.pricing.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePricingClick(item.name)}
                  className="group w-full bg-white rounded-xl p-3 md:p-4 border border-slate-200 hover:border-slate-900 hover:shadow-md transition-all duration-300 text-left"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900 text-sm truncate">{item.name}</h4>
                        {item.isPackage && (
                          <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white flex-shrink-0">
                            Balíček
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        {item.duration > 0 && <span>{item.duration} min</span>}
                        {item.duration > 0 && item.sessions > 1 && <span>•</span>}
                        {item.sessions > 1 && <span>{item.sessions}× sezení</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-base md:text-lg font-semibold text-slate-900">{item.priceFormatted}</div>
                      <svg
                        className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600">Ceny na vyžádání</p>
          )}

          {/* General Booking Button */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <OpenBookingButton className="w-full rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 text-sm md:text-base font-semibold text-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              Objednat online
            </OpenBookingButton>
          </div>
        </section>
      </main>

      {/* Right: Fixed Image */}
      <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:h-[calc(100vh-120px)]">
        <div className="rounded-3xl overflow-hidden shadow-xl h-full relative">
          <Image src={mainImage} alt={selectedService.name} fill sizes="400px" className="object-cover" priority />
        </div>
      </aside>
    </div>
  )
}
