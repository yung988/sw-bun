'use client'

import { gsap } from '@/lib/gsap'
import { useLayoutEffect, useRef } from 'react'
import BeforeAfterSlider from './BeforeAfterSlider'

const results = [
  {
    before: '/images/clients/client-1.png',
    after: '/images/clients/client-2.png',
    title: 'Hydratační ošetření',
    description: 'Výrazné zlepšení hydratace a textury pleti po sérii ošetření',
  },
  {
    before: '/images/clients/client-3.png',
    after: '/images/clients/client-4.png',
    title: 'HIFU Lifting',
    description: 'Viditelné zpevnění a lifting kontur obličeje',
  },
  {
    before: '/images/clients/client-5.png',
    after: '/images/clients/client-6.png',
    title: 'Anti-age péče',
    description: 'Redukce vrásek a celkové omlazení pleti',
  },
]

export default function ResultsSection() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.result-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        })

        const stats = el.querySelector('.result-stats')
        if (stats) {
          gsap.from(stats, {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })
        }

        const desc = el.querySelector('.result-desc') as HTMLElement | null
        if (desc) {
          const dir = desc.dataset.dir === 'right' ? 20 : -20
          gsap.from(desc, {
            opacity: 0,
            x: dir,
            duration: 0.6,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          })

          gsap.utils.toArray<HTMLElement>(desc.querySelectorAll('.feature-item')).forEach((item, k) => {
            gsap.from(item, {
              opacity: 0,
              x: -10,
              duration: 0.4,
              delay: 0.3 + k * 0.1,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            })
          })
        }
      })

      const container = rootRef.current as HTMLElement
      const cta = container.querySelector('.results-cta')
      if (cta) {
        gsap.from(cta, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: cta as Element, start: 'top 90%' },
        })
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="relative bg-white py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-slate-300" />
            <span className="text-sm font-medium uppercase tracking-wider text-slate-500">Skutečné výsledky</span>
            <div className="h-px w-12 bg-slate-300" />
          </div>
          <h2 className="mb-4 text-4xl font-light text-slate-900 md:text-5xl lg:text-6xl">
            Viditelné <span className="font-serif italic">změny</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Naše práce mluví za sebe. Podívejte se na skutečné výsledky péče o naše klientky.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid gap-12 md:gap-16">
          {results.map((result, index) => (
            <div key={result.title} className="result-card grid gap-8 md:grid-cols-2 md:gap-12 items-center">
              {/* Before/After Slider - alternating sides */}
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''} relative`}>
                <BeforeAfterSlider beforeImage={result.before} afterImage={result.after} alt={result.title} />

                {/* Stats Overlay */}
                <div className="result-stats absolute -bottom-4 -right-4 rounded-2xl bg-white p-4 shadow-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <title>Ověřeno</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Ověřeno</p>
                      <p className="text-xs text-slate-500">Skutečný výsledek</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="result-desc" data-dir={index % 2 === 0 ? 'left' : 'right'}>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Procedura č. {index + 1}
                  </div>
                  <h3 className="mb-4 text-3xl font-light text-slate-900 md:text-4xl">{result.title}</h3>
                  <p className="mb-6 text-lg leading-relaxed text-slate-600">{result.description}</p>

                  {/* Features List */}
                  <div className="space-y-3">
                    {[
                      'Viditelné výsledky již po prvním ošetření',
                      'Dlouhodobý efekt s pravidelnou péčí',
                      'Bezpečné a neinvazivní',
                    ].map((feature, _i) => (
                      <div key={feature} className="feature-item flex items-start gap-3">
                        <svg
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <title>Výhoda</title>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8">
                    <button
                      type="button"
                      className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:shadow-xl"
                    >
                      Rezervovat termín
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <title>Zjistit více</title>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="results-cta mt-16 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 text-center text-white">
          <h3 className="mb-4 text-3xl font-light md:text-4xl">
            Chcete také takové <span className="font-serif italic">výsledky</span>?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
            Rezervujte si konzultaci zdarma a zjistěte, které ošetření je pro vás nejvhodnější.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-slate-900 transition-all hover:bg-white/90"
            >
              Nezávazná konzultace
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Zjistit více</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="tel:+420773577899"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-sm font-medium text-white transition-all hover:border-white/50 hover:bg-white/10"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <title>Telefon</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +420 773 577 899
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
