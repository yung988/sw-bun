'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: true,
          pin: true,
        },
      })

      tl.fromTo(
        '.about-scaler',
        { scale: 1.12, borderRadius: '2rem', yPercent: 2 },
        { scale: 1, borderRadius: '1.25rem', yPercent: 0 },
        0
      )
        .fromTo(
          '.about-layer-1 .card',
          { y: 80, scale: 0.9, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, stagger: 0.08 },
          0.05
        )
        .fromTo(
          '.about-layer-2 .card',
          { y: 100, scale: 0.9, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, stagger: 0.08 },
          0.18
        )
        .fromTo('.about-copy > *', { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08 }, 0.1)
        .fromTo(
          '.about-layer-2 .card',
          { y: 100, scale: 0.9, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, stagger: 0.12 },
          0.18
        )
        .fromTo('.about-copy > *', { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.12 }, 0.1)
        .fromTo('.about-stats', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 0.45)
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="o-nas" className="relative min-h-[180vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Copy */}
            <div className="about-copy col-span-12 md:col-span-4 space-y-6">
              <p className="text-sm text-slate-500 uppercase tracking-wider">O nás</p>
              <h2 className="text-5xl md:text-6xl font-light leading-[1.1] text-slate-900">
                Cítit se <em className="italic">krásně</em>, <br />
                cítit se <em className="italic">sebevědomě</em>, <br />
                cítit se <em className="italic">jako vy</em>.
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-md">
                Nejen ošetření, ale rituál, který vám vrátí radost z vlastní krásy. Využíváme moderní technologie, ale
                vždy s citem pro přirozenost.
              </p>
            </div>

            {/* Visual field (scaler + layers) */}
            <div className="col-span-12 md:col-span-8 relative">
              {/* Scaler */}
              <div className="about-scaler relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl will-change-transform">
                <Image
                  src="/images/salon/kreslomistnostnaprocedury.jpg"
                  alt="SW Beauty salon"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-transparent" />
              </div>

              {/* Layer 1 (levý horní + pravý dolní) */}
              <div className="about-layer-1 pointer-events-none absolute inset-0 grid grid-cols-12 gap-6">
                <div className="card col-span-5 md:col-span-4 self-start">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src="/images/team/sabina-main.jpeg"
                      alt="Sabina – zakladatelka"
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 33vw, 50vw"
                      priority
                    />
                  </div>
                </div>
                <div className="col-span-2 md:col-span-4" />
                <div className="card col-span-5 md:col-span-4 self-end col-start-8">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src="/images/salon/recepce.jpg"
                      alt="Recepce SW Beauty"
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 33vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              {/* Layer 2 (pravý horní malý + levý dolní malý) */}
              <div className="about-layer-2 pointer-events-none absolute inset-0 grid grid-cols-12 gap-6">
                <div className="card col-span-3 md:col-span-3 col-start-9 self-start">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl">
                    <Image
                      src="/images/salon/recepce.jpg"
                      alt="Detail interiéru"
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 25vw, 40vw"
                    />
                  </div>
                </div>
                <div className="card col-span-4 md:col-span-3 self-end">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl">
                    <Image
                      src="/images/team/sabina-main.jpeg"
                      alt="Poradenství a péče"
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 25vw, 40vw"
                    />
                  </div>
                </div>
              </div>

              {/* Stats badge */}
              <div className="about-stats absolute -bottom-8 -left-6 rounded-2xl bg-white p-6 shadow-2xl border border-slate-200/60">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-light text-slate-900">10+</div>
                    <div className="text-xs text-slate-500">let praxe</div>
                  </div>
                  <div>
                    <div className="text-3xl font-light text-slate-900">500+</div>
                    <div className="text-xs text-slate-500">klientek</div>
                  </div>
                  <div>
                    <div className="text-3xl font-light text-slate-900">98%</div>
                    <div className="text-xs text-slate-500">spokojenost</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
