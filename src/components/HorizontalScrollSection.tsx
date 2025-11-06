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

  // Naplnění z kategorií (místo CSV služeb)
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

  // GSAP + ScrollTrigger (Lenis-friendly)
  useEffect(() => {
    if (!services.length) return
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    // Skip on mobile
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

        // Per-card motion (parallax image + text fade)
        for (const card of gsap.utils.toArray<HTMLElement>('.glass-card')) {
          const img = card.querySelector('img')
          const text = card.querySelector('.text-block')

          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.05, y: 60, opacity: 0.5 },
              {
                scale: 1,
                y: 0,
                opacity: 1,
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tl,
                  start: 'left 95%',
                  end: 'left 55%',
                  scrub: true,
                },
              }
            )
          }

          if (text) {
            gsap.fromTo(
              text,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: tl,
                  start: 'left 90%',
                  end: 'left 60%',
                  scrub: true,
                },
              }
            )
          }
        }

        // Pokud používáš Lenis, někde v app už běží lenis.on('scroll', ScrollTrigger.update)
        // Jen zajistíme refresh po načtení obrázků a při resize:
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
      <section className="relative w-full bg-white overflow-hidden z-[1] pt-[84px] pb-10">
        {/* Header */}
        <div className="px-6 text-slate-900">
          <p className="uppercase text-[10px] tracking-[0.28em] text-slate-500/90 mb-2">Naše služby</p>
          <h2 className="text-4xl font-light leading-tight">
            Objevte <span className="italic font-serif">dokonalost</span>
          </h2>
        </div>

        {/* Snap scroller */}
        <div className="mt-6 flex gap-5 px-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar touch-pan-x">
          {services.map((s, index) => (
            <Link
              key={s.id}
              href={`/sluzby/${s.slug}`}
              className="snap-start relative flex-shrink-0 w-[82vw] h-[68vh] rounded-[22px] overflow-hidden group"
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="90vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,.84,.44,1)] group-active:scale-[1.03]"
                  priority={index === 0}
                />
              </div>

              {/* Glass text panel */}
              <div className="absolute inset-0 flex items-end p-5">
                <div className="w-full rounded-[18px] border border-white/35 bg-white/25 backdrop-blur-[12px] shadow-[0_8px_36px_-12px_rgba(0,0,0,0.18)] p-5">
                  <div className="text-slate-900">
                    <p className="text-[2.6rem] font-light text-black/10 font-serif leading-none mb-1">0{index + 1}</p>
                    <h3 className="text-[1.4rem] font-light mb-1">{s.name}</h3>
                    <p className="text-[0.95rem] text-slate-700/95 mb-4 leading-relaxed line-clamp-3">
                      {s.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-slate-900 text-xs font-medium uppercase tracking-[0.18em]">
                      Zjistit více
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path d="M17 8l4 4-4 4M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-white overflow-hidden z-[1] pt-[96px] md:pt-[112px]"
    >
      {/* Fixní header (mírně vlevo, redakční feeling) */}
      <div className="absolute top-28 left-16 md:left-20 z-20 text-slate-900 pointer-events-none">
        <p className="uppercase text-[10px] tracking-[0.28em] text-slate-500/90 mb-3">Naše služby</p>
        <h2 className="text-5xl md:text-6xl font-light leading-tight">
          Objevte <span className="italic font-serif">dokonalost</span>
        </h2>
      </div>

      {/* Horizontální dráha */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 flex h-full items-center gap-[10vw] pl-[20vw] pr-[20vw]"
        style={{ width: `${services.length * 58}vw` }}
      >
        {services.map((s, i) => (
          <Link
            key={s.id}
            href={`/sluzby/${s.slug}`}
            className="glass-card relative flex-shrink-0 w-[44vw] h-[80vh] rounded-[28px] overflow-hidden group"
          >
            {/* Foto */}
            <Image
              src={s.image}
              alt={s.name}
              fill
              sizes="(min-width:1280px) 44vw, (min-width:1024px) 60vw, 90vw"
              className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(.16,.84,.44,1)] group-hover:scale-[1.05]"
              priority={i < 2}
            />

            {/* Glass panel (spodní) */}
            <div className="absolute inset-0 flex items-end p-6 md:p-10">
              <div className="text-block w-full rounded-[22px] border border-white/35 bg-white/20 backdrop-blur-[14px] shadow-[0_8px_40px_-10px_rgba(0,0,0,0.15)] p-6 md:p-8">
                <p className="text-[3.5rem] md:text-[5rem] font-light text-black/10 font-serif leading-none mb-1">
                  0{i + 1}
                </p>
                <h3 className="text-[1.8rem] md:text-[2.4rem] font-light text-slate-900 mb-2">{s.name}</h3>
                <p className="text-[0.95rem] text-slate-700/95 mb-5 leading-relaxed line-clamp-3">{s.description}</p>
                <span className="inline-flex items-center gap-2 text-slate-900 text-xs md:text-sm font-medium uppercase tracking-[0.18em] group-hover:gap-3 transition-all">
                  Zjistit více
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M17 8l4 4-4 4M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Jemná highlight aura */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10 group-hover:ring-white/25 transition-[ring] duration-500" />
          </Link>
        ))}
      </div>
    </section>
  )
}
