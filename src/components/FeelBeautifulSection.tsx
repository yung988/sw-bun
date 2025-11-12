// FeelBeautifulSection.tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function FeelBeautifulSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLDivElement | null>(null)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const textRefs = useRef<(HTMLSpanElement | null)[]>([])
  const paragraphRef = useRef<HTMLParagraphElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Jemný parallax fotky
      gsap.to(imgRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Jemné zjasnění overlay
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.5 },
        {
          opacity: 0.82,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center 50%',
            scrub: 1,
          },
        }
      )

      // Texty se jemně objeví postupně
      textRefs.current.forEach((textEl, index) => {
        if (textEl) {
          gsap.fromTo(
            textEl,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: textEl,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: index * 0.15,
            }
          )
        }
      })

      // Odstavec přijede jako poslední
      if (paragraphRef.current) {
        gsap.fromTo(
          paragraphRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          {/* Gradient overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900/80 via-slate-800/75 to-slate-900/85"
            style={{ opacity: 0.5 }}
          />

          {/* Background Image */}
          <div ref={imgRef} className="absolute inset-0">
            <Image
              src="/images/salon/kreslomistnostnaprocedury.jpg"
              alt="SW Beauty salon"
              fill
              className="object-cover grayscale opacity-50"
              priority
              sizes="100vw"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 px-8 md:px-16 lg:px-24 py-20 md:py-28 lg:py-32">
            <div className="max-w-4xl">
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 md:mb-12 leading-[1.1]">
                <span
                  ref={(el) => {
                    textRefs.current[0] = el
                  }}
                  className="inline-block"
                  style={{ opacity: 0 }}
                >
                  Cítit se <em className="italic">krásně.</em>
                </span>
                <br />
                <span
                  ref={(el) => {
                    textRefs.current[1] = el
                  }}
                  className="inline-block"
                  style={{ opacity: 0 }}
                >
                  Cítit se <em className="italic">sebevědomě.</em>
                </span>
                <br />
                <span
                  ref={(el) => {
                    textRefs.current[2] = el
                  }}
                  className="inline-block"
                  style={{ opacity: 0 }}
                >
                  Cítit se <em className="italic">jako vy.</em>
                </span>
              </h2>

              <p
                ref={paragraphRef}
                className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-2xl"
                style={{ opacity: 0 }}
              >
                To je můj cíl. Ne jen ošetření, ale zážitek, který vám vrátí radost z vlastní krásy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
