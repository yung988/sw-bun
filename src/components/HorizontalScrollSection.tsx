// HorizontalScrollSection.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Carousel from './Carousel'
import Container from './ui/Container'
import Section from './ui/Section'

type Service = {
  serviceId: string
  name: string
  slug: string
  shortDescription: string
  images: string[]
  pricing: { price: number }[]
  subcategories: any[]
}

export default function HorizontalScrollSection() {
  const [services, setServices] = useState<any[]>([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        const data: Service[] = await response.json()
        const categories = data.map((s) => {
          const prices = s.pricing.map((p) => p.price).filter((p) => p > 0)
          const priceRange =
            prices.length > 0
              ? prices.length === 1
                ? `${prices[0]} Kč`
                : `od ${Math.min(...prices)} Kč`
              : 'Na vyžádání'

          return {
            id: s.serviceId,
            name: s.name,
            slug: s.slug,
            description: s.shortDescription,
            priceRange,
            serviceCount: s.subcategories.length > 0 ? s.subcategories.length : s.pricing.length,
          }
        })

        // Build covers from CSV service images first, fallback to folder-based cover
        const covers: Record<string, string> = {}
        for (const service of data) {
          const candidates = service.images.filter(Boolean)
          // Since we can't call resolveExisting on client, use first image or fallback
          covers[service.serviceId] = candidates.length ? candidates[0] : '/images/salon/recepce.jpg'
        }

        const serviceItems = categories.map((c) => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          description: c.description,
          image: covers[c.id] || '/images/salon/recepce.jpg',
        }))
        setServices(serviceItems)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchServices()
  }, [])

  if (!services.length) return null

  return (
    <Section className="relative bg-white mt-32 md:mt-40 lg:mt-48">
      <Container className="py-20 md:py-24 lg:py-32">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">Naše služby</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-slate-900 mt-2">
            Objevte <em className="italic">dokonalost</em>
          </h2>
        </div>

        {/* Services Grid/Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
          {services.map((s, i) => (
            <Link key={s.id} href={`/sluzby?service=${s.slug}`} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={s.image || '/placeholder.svg'}
                    alt={s.name}
                    fill
                    sizes="320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority={i < 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-light text-slate-900 mb-2 tracking-tight leading-tight">{s.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">{s.description}</p>

                  <div className="flex items-center text-xs font-medium text-slate-900 uppercase tracking-wider">
                    <span>Zjistit více</span>
                    <svg
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop Carousel */}
        <div className="hidden lg:block">
          <Carousel auto={true} autoSpeed={50} showArrows={true}>
            {services.map((s, i) => (
              <Link key={s.id} href={`/sluzby?service=${s.slug}`} className="group flex-shrink-0 w-72 md:w-80">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
                  {/* Image */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <Image
                      src={s.image || '/placeholder.svg'}
                      alt={s.name}
                      fill
                      sizes="320px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority={i < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <h3 className="text-xl lg:text-2xl font-light text-slate-900 mb-3 tracking-tight leading-tight">
                      {s.name}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">{s.description}</p>

                    <div className="flex items-center text-xs font-medium text-slate-900 uppercase tracking-wider">
                      <span>Zjistit více</span>
                      <svg
                        className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      </Container>
    </Section>
  )
}
