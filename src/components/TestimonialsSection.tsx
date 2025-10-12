'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionTitle from './SectionTitle'
import Carousel from './Carousel'
import TestimonialCard from './TestimonialCard'
import RatingSummary from './RatingSummary'
import { testimonials } from '@/data/testimonials'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const ratingRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title - Slide from left
      gsap.from(titleRef.current, {
        opacity: 0,
        x: -80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Rating summary - Bounce entrance
      gsap.from(ratingRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'elastic.out(1, 0.7)',
        scrollTrigger: {
          trigger: ratingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Carousel container - Fade + slide
      gsap.from(carouselRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Individual testimonial cards - 2D bounce entrance (alternating)
      const cards = gsap.utils.toArray('.testimonial-card-animated')
      
      cards.forEach((card: any, index) => {
        const fromBottom = index % 2 === 0
        
        gsap.from(card, {
          opacity: 0,
          y: fromBottom ? 100 : -100,
          scale: 0.9,
          duration: 1,
          delay: index * 0.1,
          ease: 'back.out(1.4)',
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
          lenis.on('scroll', ({ direction, velocity }: { direction: number; velocity: number }) => {
            // Move carousel based on scroll direction and velocity
            const movement = direction === 1 ? -15 : 15
            const velocityMultiplier = Math.min(Math.abs(velocity) * 0.01, 1)
            
            gsap.to(carouselRef.current, {
              x: movement * velocityMultiplier,
              duration: 0.4,
              ease: 'power2.out',
            })
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="mx-auto max-w-[1250px] px-6 py-16 md:py-24"
    >
      <div ref={titleRef}>
        <SectionTitle
          center={false}
          title={
            <>
              Co říkají naše <em className="italic">klientky</em>
            </>
          }
        />
      </div>

      <div ref={ratingRef} className="mt-12">
        <RatingSummary />
      </div>

      <div ref={carouselRef} className="mt-16">
        <Carousel>
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name} 
              className="w-[340px] md:w-[380px] shrink-0 testimonial-card-animated"
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  )
}

