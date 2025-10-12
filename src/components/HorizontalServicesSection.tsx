'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { NumberCounter } from './animations'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type Service = {
  number: number
  title: string
  description: string
  image: string
  href: string
}

const services: Service[] = [
  {
    number: 1,
    title: 'HIFU Facelift',
    description: 'Neinvazivní lifting obličeje pomocí ultrazvuku. Viditelné výsledky již po prvním ošetření.',
    image: '/images/service-hifu.jpg',
    href: '/sluzby/oblicej/hifu-facelift',
  },
  {
    number: 2,
    title: 'Endosphere',
    description: 'Revoluční technologie pro formování postavy a redukci celulitidy.',
    image: '/images/service-endosphere.jpg',
    href: '/sluzby/telo/endosphere',
  },
  {
    number: 3,
    title: 'Kosmetické ošetření',
    description: 'Profesionální péče o pleť přizpůsobená vašim potřebám.',
    image: '/images/service-cosmetic.jpeg',
    href: '/sluzby/oblicej',
  },
  {
    number: 4,
    title: 'Prodlužování vlasů',
    description: 'Přirozený vzhled, pevné spoje, výdrž 3-4 měsíce.',
    image: '/images/service-hair.jpg',
    href: '/sluzby/vlasy',
  },
]

export default function HorizontalServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !scrollerRef.current) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const section = sectionRef.current
    const scroller = scrollerRef.current

    const ctx = gsap.context(() => {
      // Title fade in
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Horizontal scroll
      const scrollWidth = scroller.scrollWidth - section.offsetWidth

      gsap.to(scroller, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollWidth + window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      // Stagger fade in for cards
      const cards = scroller.querySelectorAll('.service-card')
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
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
      className="relative min-h-screen bg-slate-50 py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1250px] px-6 mb-16">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900"
        >
          Na\u0161e <em className="italic font-serif">slu\u017eby</em>
        </h2>
      </div>

      {/* Horizontal scroller */}
      <div ref={scrollerRef} className="flex gap-8 px-6">
        {services.map((service) => (
          <Link
            key={service.number}
            href={service.href}
            className="service-card block w-[400px] md:w-[500px] shrink-0"
          >
            <div className="group relative h-[600px] bg-white rounded-3xl overflow-hidden border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:border-slate-300">
              {/* Number badge */}
              <div className="absolute top-8 left-8 z-10">
                <NumberCounter
                  number={service.number}
                  className="text-7xl font-light text-white/90 tabular-nums"
                />
              </div>

              {/* Image */}
              <div className="relative h-[350px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 400px, 500px"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between h-[250px]">
                <div>
                  <h3 className="text-3xl font-semibold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center text-sm font-medium text-slate-900 group-hover:translate-x-2 transition-transform duration-300">
                  <span>Zjistit v\u00edce</span>
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Spacer for smooth end */}
        <div className="w-6 shrink-0" />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-sm text-slate-500">
        <span>Scrollujte horizontálně</span>
        <svg
          className="w-5 h-5 animate-bounce-horizontal"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes bounce-horizontal {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(10px);
          }
        }
        .animate-bounce-horizontal {
          animation: bounce-horizontal 2s infinite;
        }
      `}</style>
    </section>
  )
}

