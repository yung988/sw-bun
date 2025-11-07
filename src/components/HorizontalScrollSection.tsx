'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Service = {
  id: string
  slug: string
  name: string
  description: string
  image: string
  category?: string
}

type HProps = { categories: import('@/lib/services').ServiceCategory[]; coversByCategory: Record<string, string> }

export default function HorizontalScrollSection({ categories, coversByCategory }: HProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [services, setServices] = useState<Service[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Naplnění z kategorií
  useEffect(() => {
    const mapped: Service[] = (categories || []).map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      description: c.description,
      image: coversByCategory[c.id] || '/images/salon/recepce.jpg',
    }))
    setServices(mapped)
  }, [categories, coversByCategory])

  // Mobile detection
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767.98px)')
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  // GSAP ScrollTrigger
  useEffect(() => {
    if (!services.length) return
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    if (isMobile) return

    const setup = () => {
      const totalWidth = track.scrollWidth - window.innerWidth
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${Math.max(0, totalWidth)}`,
            anticipatePin: 1,
          },
        })
        tl.to(track, { x: -totalWidth })

        // Card animations
        for (const card of gsap.utils.toArray<HTMLElement>('.service-card-item')) {
          const img = card.querySelector('img')
          const content = card.querySelector('.card-content')

          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.1, opacity: 0.7 },
              {
                scale: 1,
                opacity: 1,
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tl,
                  start: 'left 80%',
                  end: 'left 40%',
                  scrub: true,
                },
              }
            )
          }

          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tl,
                  start: 'left 75%',
                  end: 'left 45%',
                  scrub: true,
                },
              }
            )
          }
        }

        const imgs = Array.from(track.querySelectorAll('img')) as HTMLImageElement[]
        let pending = imgs.length
        const done = () => ScrollTrigger.refresh()
        if (!pending) done()
        for (const im of imgs) {
          if (im.complete) {
            if (--pending === 0) done()
          } else {
            im.addEventListener('load', () => {
              if (--pending === 0) done()
            })
            im.addEventListener('error', () => {
              if (--pending === 0) done()
            })
          }
        }

        const onResize = () => {
          const w = track.scrollWidth - window.innerWidth
          tl.clear().to(track, { x: -w, ease: 'none' })
          ScrollTrigger.refresh()
        }
        window.addEventListener('resize', onResize)

        return () => {
          window.removeEventListener('resize', onResize)
          tl.kill()
          for (const s of ScrollTrigger.getAll()) {
            s.kill()
          }
        }
      }, container)

      return () => ctx.revert()
    }

    const cleanup = setup()
    return cleanup
  }, [services, isMobile])

  if (!services.length) return null

  if (isMobile) {
    return (
      <section className="relative w-full bg-slate-50 overflow-hidden py-16">
        {/* Header */}
        <div className="px-6 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">Naše služby</span>
          </div>
          <h2 className="font-display text-4xl font-light leading-tight tracking-tight text-slate-900">
            Objevte <em className="italic">dokonalost</em>
          </h2>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4">
          {services.map((s, index) => (
            <Link
              key={s.id}
              href={`/sluzby/${s.slug}`}
              className="snap-center relative flex-shrink-0 w-[82vw] group active:scale-[0.98] transition-transform duration-200"
            >
              <div className="relative h-[480px] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm group-active:shadow-md transition-shadow">
                {/* Image */}
                <div className="relative h-[280px] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="85vw"
                    className="object-cover transition-transform duration-700 group-active:scale-[1.05]"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-white/10" />

                  {/* Number badge */}
                  <div className="absolute top-5 left-5">
                    <div className="text-5xl font-light text-white/95 tabular-nums drop-shadow-lg">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-light text-slate-900 mb-3 tracking-tight">{s.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">{s.description}</p>

                  <div className="flex items-center text-xs font-medium text-slate-900 uppercase tracking-[0.2em]">
                    <span>Zjistit více</span>
                    <svg
                      className="ml-2 w-4 h-4 transition-transform group-active:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="w-2 flex-shrink-0" />
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-slate-50 overflow-hidden">
      {/* Fixed header */}
      <div className="absolute top-32 left-12 md:left-16 z-20 pointer-events-none">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">Naše služby</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl font-light leading-tight tracking-tight text-slate-900">
          Objevte <em className="italic">dokonalost</em>
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 flex h-full items-center gap-6 pl-[16vw] pr-[16vw]"
        style={{ width: `${services.length * 50}vw` }}
      >
        {services.map((s, i) => (
          <Link
            key={s.id}
            href={`/sluzby/${s.slug}`}
            className="service-card-item relative flex-shrink-0 w-[38vw] h-[75vh] group cursor-pointer"
          >
            <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md transition-all duration-500 group-hover:shadow-xl group-hover:border-slate-300">
              {/* Image */}
              <div className="relative h-[55%] overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="40vw"
                  className="object-cover"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-white/5" />

                {/* Number badge */}
                <div className="absolute top-8 left-8">
                  <div className="text-7xl font-light text-white/95 tabular-nums drop-shadow-lg">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="card-content relative h-[45%] p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-light text-slate-900 mb-4 tracking-tight leading-tight">{s.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">{s.description}</p>
                </div>

                <div className="flex items-center text-xs font-medium text-slate-900 uppercase tracking-[0.2em] group-hover:gap-1 transition-all">
                  <span>Zjistit více</span>
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
