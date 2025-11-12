"use client"

import { useEffect, useRef, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import Container from './ui/Container'

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

export default function HorizontalScrollSection({ categories, coversByCategory }: HProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [deltaX, setDeltaX] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const rafRef = useRef<number | null>(null)
  const speedRef = useRef(0.5)
  const momentumRef = useRef(0)

  const services = categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
    image: coversByCategory[c.id] || "/images/salon/recepce.jpg",
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
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 py-20 lg:py-32">
      <Container>
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">Naše služby</span>
          <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-slate-900 mt-2">
            Objevte <em className="italic">dokonalost</em>
          </h2>
        </div>
      </Container>

      {/* Horizontal track - full width */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
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
            <div key={`${s.id}-${i}`} className="flex-shrink-0 w-80 md:w-96">
              <Link href={`/sluzby/${s.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-2xl h-[28rem] shadow-soft hover:shadow-elevated transition-all duration-500">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(max-width: 768px) 320px, 384px"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    priority={i < 3}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                    <h3 className="font-display text-2xl lg:text-3xl font-light text-white mb-3 tracking-tight leading-tight">
                      {s.name}
                    </h3>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-2 mb-6">
                      {s.description}
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs font-medium text-white uppercase tracking-wider group-hover:gap-3 transition-all">
                      <span>Zjistit více</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
      </div>
    </section>
  )
}
