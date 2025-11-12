// InfiniteCarousel.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from './ui/Container'
import Section from './ui/Section'

type ServiceCategory = {
  id: string
  name: string
  slug: string
  description: string
  priceRange: string
  serviceCount: number
}

type HProps = {
  categories: ServiceCategory[]
  coversByCategory: Record<string, string>
}

export default function InfiniteCarousel({ categories, coversByCategory }: HProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [deltaX, setDeltaX] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const rafRef = useRef<number | null>(null)
  const speedRef = useRef(0.5) // Rychlější autoplay
  const momentumRef = useRef(0)

  const services = categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
    image: coversByCategory[c.id] || '/images/salon/recepce.jpg',
  }))

  const duplicatedServices = [...services, ...services, ...services]

  useEffect(() => {
    if (!trackRef.current) return

    const animate = () => {
      if (isDragging || isHovered) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      setDeltaX(prev => {
        const trackWidth = trackRef.current!.scrollWidth / 3
        let newDelta = prev - speedRef.current

        if (Math.abs(newDelta) >= trackWidth) {
          newDelta = 0
        }

        return newDelta
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isDragging, isHovered, services.length])

  // Zlepšené drag handlery
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    setIsDragging(true)
    setStartX(e.pageX + deltaX)
    setIsHovered(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    
    const currentX = e.pageX
    const newDelta = currentX - startX
    
    momentumRef.current = newDelta - deltaX
    
    setDeltaX(newDelta)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Momentum efekt
    const momentum = momentumRef.current * 0.95
    if (Math.abs(momentum) > 0.5) {
      setDeltaX(prev => prev + momentum)
    }
    setTimeout(() => setIsHovered(false), 800)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setTimeout(() => setIsHovered(false), 800)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX + deltaX)
    setIsHovered(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return
    const currentX = e.touches[0].pageX
    const newDelta = currentX - startX
    
    momentumRef.current = newDelta - deltaX
    
    setDeltaX(newDelta)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    const momentum = momentumRef.current * 0.95
    if (Math.abs(momentum) > 0.5) {
      setDeltaX(prev => prev + momentum)
    }
    setTimeout(() => setIsHovered(false), 800)
  }

  if (!services.length) return null

  return (
    <Section className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32 overflow-hidden">
      <Container>
        {/* Header s tlačítkem */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">Naše služby</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-slate-900 mt-2">
              Objevte <em className="italic">dokonalost</em>
            </h2>
          </div>
          
          {/* Tlačítko Všechny služby */}
          <Link 
            href="/sluzby"
            className="mt-6 lg:mt-0 inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-full font-medium text-sm transition-all duration-300 hover:bg-slate-800 hover:shadow-lg group"
          >
            Všechny služby
            <svg
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4" />
            </svg>
          </Link>
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing rounded-2xl"
          onMouseEnter={() => !isDragging && setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={trackRef}
            className="flex gap-6 lg:gap-8 select-none py-2"
            style={{
              width: 'max-content',
              transform: `translateX(${deltaX}px)`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {duplicatedServices.map((s, i) => (
              <div key={`${s.id}-${i}`} className="flex-shrink-0 w-72 md:w-80 lg:w-96">
                <Link href={`/sluzby/${s.slug}`} className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200">
                    <div className="relative h-64 md:h-72 overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        priority={i < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
                    </div>

                    <div className="p-6 lg:p-8">
                      <h3 className="text-xl lg:text-2xl font-light text-slate-900 mb-3 tracking-tight leading-tight">
                        {s.name}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                        {s.description}
                      </p>

                      <div className="flex items-center text-xs font-medium text-slate-900 uppercase tracking-wider group-hover:text-slate-700 transition-colors">
                        <span>Zjistit více</span>
                        <svg
                          className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1.5"
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
              </div>
            ))}
          </div>

          {/* Gradient překryvy na krajích */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
      </Container>
    </Section>
  )
}