'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import SectionTitle from './SectionTitle'
import Carousel from './Carousel'
import ServiceCard from './ServiceCard'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type ServicesSectionProps = {
  categories: {
    id: string
    name: string
    description: string
    priceRange: string
    slug: string
    serviceCount: number
  }[]
}

export default function ServicesSection({ categories }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!categories || categories.length === 0) return

    const ctx = gsap.context(() => {
      // Title - Slide from left with rotation
      gsap.from(titleRef.current, {
        opacity: 0,
        x: -100,
        rotateY: -20,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Button - Magnetic entrance
      gsap.from(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        rotation: -10,
        duration: 1,
        ease: 'elastic.out(1, 0.7)',
        scrollTrigger: {
          trigger: buttonRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Carousel - 3D perspective entrance
      gsap.from(carouselRef.current, {
        opacity: 0,
        y: 100,
        rotateX: 30,
        duration: 1.3,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Individual service cards - 2D slide-in (alternating left/right)
      const cards = gsap.utils.toArray('.service-card-3d')

      cards.forEach((card: any, index) => {
        const fromLeft = index % 2 === 0

        gsap.from(card, {
          opacity: 0,
          x: fromLeft ? -120 : 120,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.08,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Scroll-direction aware carousel movement
      if (typeof window !== 'undefined') {
        const lenis = (window as any).lenis
        if (lenis) {
          const handler = ({ direction }: { direction: number }) => {
            gsap.to(carouselRef.current, {
              x: direction === 1 ? -10 : 10,
              duration: 0.3,
              ease: 'power2.out',
            })
          }

          lenis.on('scroll', handler)
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [categories])

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    gsap.to(buttonRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  const serviceImages = [
    '/services/oblicej.jpg',
    '/services/telo.jpg',
    '/services/depilace.jpg',
    '/services/masaze.jpg',
    '/services/nehty.jpg',
  ]

  return (
    <section
      ref={sectionRef}
      id="sluzby"
      className="mx-auto max-w-[1250px] px-6 py-16 md:py-24"
    >
      <div className="flex flex-wrap items-center justify-between gap-6 mb-16">
        <div ref={titleRef}>
          <SectionTitle
            center={false}
            title={
              <>
                Naše <em className="italic">služby</em>
              </>
            }
          />
        </div>

        <Link
          ref={buttonRef}
          href="/sluzby"
          className="rounded-xl border-2 border-slate-200 px-8 py-4 text-base font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-900 hover:text-white hover:border-slate-900"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          Všechny služby
        </Link>
      </div>

      <div ref={carouselRef}>
        <Carousel auto autoSpeed={30}>
          {categories.map((category, index) => {
            const image = serviceImages[index % serviceImages.length]
            
            return (
              <div
                key={category.id}
                className="w-[320px] shrink-0 snap-start service-card-3d"
              >
                <ServiceCard
                  title={category.name}
                  description={category.description}
                  price={category.priceRange}
                  category={`${category.serviceCount} služeb`}
                  href={`/sluzby/${category.slug}`}
                  image={image}
                  compact={true}
                />
              </div>
            )
          })}
        </Carousel>
      </div>
    </section>
  )
}

