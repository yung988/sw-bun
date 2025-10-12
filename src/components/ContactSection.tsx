'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap } from 'lucide-react'
import SectionTitle from './SectionTitle'
import ContactInfoCard from './ContactInfoCard'
import OpenBookingButton from './OpenBookingButton'
import OpenVoucherButton from './OpenVoucherButton'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const hoursRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

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

      // Contact cards - Stagger from different directions
      const cards = cardsRef.current?.querySelectorAll('.contact-card')
      if (cards) {
        cards.forEach((card, index) => {
          const directions = [
            { x: -100, y: 0 },   // Card 0: from left
            { x: 100, y: 0 },    // Card 1: from right
            { x: 0, y: 100 },    // Card 2: from bottom
          ]
          
          const direction = directions[index % directions.length]
          
          gsap.from(card, {
            opacity: 0,
            x: direction.x,
            y: direction.y,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          })
        })
      }

      // Opening hours - Bounce entrance
      gsap.from(hoursRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        delay: 0.5,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: hoursRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Buttons - Stagger from bottom
      const buttons = buttonsRef.current?.querySelectorAll('button')
      if (buttons) {
        buttons.forEach((button, index) => {
          gsap.from(button, {
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: 0.7 + index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: buttonsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        })
      }

      // Map - Slide from right
      gsap.from(mapRef.current, {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="kontakt" 
      className="mx-auto max-w-[1250px] px-6 py-16 md:py-24"
    >
      <div ref={titleRef} className="mb-12">
        <SectionTitle
          center={false}
          title={
            <>
              Kde nás <em className="italic">najdete</em>
            </>
          }
          subtitle="Náš salon se nachází v centru Hodonína na Masarykově náměstí."
          badge={{ icon: <Zap className="h-4 w-4" />, text: 'Kontakt' }}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left - Contact Info */}
        <div className="space-y-6">
          {/* Contact Cards */}
          <div ref={cardsRef} className="grid gap-4">
            <div className="contact-card">
              <ContactInfoCard
                icon={
                  <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                }
                label="Adresa"
                value="Masarykovo náměstí 59, 695 01 Hodonín"
              />
            </div>
            <div className="contact-card">
              <ContactInfoCard
                icon={
                  <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                }
                label="Telefon"
                value="+420 773 577 899"
              />
            </div>
            <div className="contact-card">
              <ContactInfoCard
                icon={
                  <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
                label="E-mail"
                value="info@swbeauty.cz"
              />
            </div>
          </div>

          {/* Opening Hours */}
          <div ref={hoursRef} className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-medium text-slate-900">Otevírací doba</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Pondělí - Pátek</span>
                <span className="font-medium text-slate-900">9:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sobota</span>
                <span className="font-medium text-slate-900">10:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Neděle</span>
                <span className="font-medium text-slate-900">Zavřeno</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap gap-3">
            <OpenBookingButton className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              Rezervovat termín
            </OpenBookingButton>
            <OpenVoucherButton className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
              Objednat poukaz
            </OpenVoucherButton>
          </div>
        </div>

        {/* Right - Map */}
        <div ref={mapRef} className="relative overflow-hidden rounded-2xl border border-slate-200 self-start h-[360px] md:h-[480px] lg:h-[600px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2642.9429366838445!2d17.123456!3d48.848889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476b4e2e70000001%3A0x400f7d1c696bd50!2sMasarykovo%20n%C3%A1m%C4%9Bst%C3%AD%2059%2C%20695%2001%20Hodon%C3%ADn!5e0!3m2!1scs!2scz!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa - SW Beauty Hodonín"
          />
        </div>
      </div>
    </section>
  )
}

