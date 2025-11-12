// HorizontalScrollSection.tsx
'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from './ui/Container'
import Section from './ui/Section'

gsap.registerPlugin(ScrollTrigger)

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
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const services = categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
    image: coversByCategory[c.id] || '/images/salon/recepce.jpg',
  }))

  useEffect(() => {
    if (!services.length || !trackRef.current || !sectionRef.current) return

    const track = trackRef.current
    const cards = Array.from(track.children) as HTMLElement[]

    // celková šířka tracku = poslední karta.right
    const lastCard = cards[cards.length - 1]
    const trackWidth = lastCard.offsetLeft + lastCard.offsetWidth

    // výška viewportu
    const windowHeight = window.innerHeight

    // délka scrollu = šířka tracku - šířka viewportu
    const scrollDistance = trackWidth - window.innerWidth

    // vytvoříme animaci
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.to(track, { x: -scrollDistance, ease: 'none' })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [services])

  if (!services.length) return null

  return (
    <Section className="relative bg-white" ref={sectionRef}>
      <Container className="py-24">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">Naše služby</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-slate-900 mt-2">
            Objevte <em className="italic">dokonalost</em>
          </h2>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex gap-6 lg:gap-8"
          style={{ width: 'max-content' }}
        >
          {services.map((s, i) => (
            <Link
              key={s.id}
              href={`/sluzby/${s.slug}`}
              className="group flex-shrink-0 w-72 md:w-80"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
                {/* Image */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <Image
                    src={s.image}
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
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                    {s.description}
                  </p>

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
      </Container>
    </Section>
  )
}