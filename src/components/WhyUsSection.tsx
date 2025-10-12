'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from './SectionTitle'
import Carousel from './Carousel'
import HighlightCard from './HighlightCard'
import { highlights } from '@/data/highlights'
import { FadeIn } from './animations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Title - Simple fade up
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Carousel container - Fade and scale
      gsap.from(carouselRef.current, {
        opacity: 0,
        scale: 0.98,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Individual cards - Simple stagger fade
      const cards = gsap.utils.toArray('.highlight-card')

      cards.forEach((card: any, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="why"
      className="mx-auto max-w-[1250px] px-6 py-16 md:py-24"
    >
      <div ref={titleRef}>
        <SectionTitle
          center={false}
          eyebrow="Proč přijít právě k nám"
          title={
            <>
              Co nás <em className="italic">odlišuje</em>
            </>
          }
          subtitle="Nejsme jen další kosmetický salon. Kombinujeme osobní přístup s nejmodernějšími technologiemi a péčí, která přináší viditelné výsledky."
        />
      </div>

      <div
        ref={carouselRef}
        className="mt-16"
      >
        <Carousel auto autoSpeed={25}>
          {highlights.map((b, index) => (
            <HighlightCard
              key={b.t}
              icon={b.icon}
              title={b.t}
              description={b.d}
              index={index}
            />
          ))}
        </Carousel>
      </div>
    </section>
  )
}

