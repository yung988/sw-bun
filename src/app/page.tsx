import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://swbeauty.cz'),
  title: 'SW Beauty - Profesionální kosmetický salon Hodonín',
  description:
    'Profesionální kosmetika a moderní technologie HIFU, Endosphere a EMS v Hodoníně. Prověřené metody pro viditelné výsledky.',
  keywords: ['kosmetický salon', 'HIFU', 'Endosphere', 'EMS', 'kosmetika', 'Hodonín', 'omlazení', 'formování těla'],
  alternates: {
    canonical: 'https://swbeauty.cz',
  },
  openGraph: {
    title: 'SW Beauty - Profesionální kosmetický salon Hodonín',
    description: 'Profesionální kosmetika a moderní technologie HIFU, Endosphere a EMS v Hodoníně.',
    images: ['/images/hero-image.jpg'],
    url: 'https://swbeauty.cz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SW Beauty - Profesionální kosmetický salon Hodonín',
    description: 'Profesionální kosmetika a moderní technologie HIFU, Endosphere a EMS v Hodoníně.',
    images: ['/images/hero-image.jpg'],
  },
}

import Carousel from '@/components/Carousel'
import FAQ from '@/components/FAQ'
import ScrollAnimation from '@/components/FadeInSection'
import Hero from '@/components/Hero'
import InstagramFeed from '@/components/InstagramFeed'
import RatingSummary from '@/components/RatingSummary'
import SectionTitle from '@/components/SectionTitle'
import { Sparkles, Heart, Zap, Droplet, Scissors } from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import SubscribeForm from '@/components/SubscribeForm'
import TestimonialCard from '@/components/TestimonialCard'
import HighlightCard from '@/components/HighlightCard'
import FeatureCard from '@/components/FeatureCard'
import ContactInfoCard from '@/components/ContactInfoCard'
import WhyUsSection from '@/components/WhyUsSection'
import ServicesSection from '@/components/ServicesSection'
import AboutUsSection from '@/components/AboutUsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import VoucherCTASection from '@/components/VoucherCTASection'
import ContactSection from '@/components/ContactSection'
import HorizontalServicesSection from '@/components/HorizontalServicesSection'
import { faqs } from '@/data/faq'
import { highlights } from '@/data/highlights'
import { testimonials } from '@/data/testimonials'
import { features } from '@/data/features'
import { getServiceCategories } from '@/lib/services'
import Image from 'next/image'
import Link from 'next/link'
import OpenVoucherButton from '@/components/OpenVoucherButton'
import OpenBookingButton from '@/components/OpenBookingButton'
import {
  SmoothReveal,
  MagneticButton,
  ParallaxText,
  ScrollVelocity,
  ElasticScale,
  Perspective3D,
  TextReveal
} from '@/components/animations'

// Zobrazit pouze nejdůležitější FAQ - celkem 6 (3+3)
const faqsLeft = faqs.slice(0, 3)
const faqsRight = faqs.slice(3, 6)

export default async function Home() {
  const categories = await getServiceCategories()

  return (
    <main id="main-content" className="min-h-screen bg-white pb-24 pt-20">
      {/* Hero Section */}
      <div id="home">
        <Hero
          title="Krása, která vám"
          titleItalic="sluší"
          subtitle="Profesionální kosmetika s moderními technologiemi v centru Hodonína."
          trustedText="Důvěřuje nám přes"
          trustedCount="500+ klientek"
          avatars={['/images/service-hifu.jpg', '/images/service-endosphere.jpg', '/images/service-hair.jpg']}
        />
      </div>

      {/* Why Us - With Dramatic GSAP Animations */}
      <WhyUsSection />

      {/* About Us - With Dramatic Reveal & 3D Layered Parallax */}
      <AboutUsSection />

      {/* Gallery Section - With FadeIn animations */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[1250px] px-6">
          <FadeIn>
            <div className="mb-20 max-w-3xl">
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-8 leading-tight">
                Prostor pro <em className="italic">váš klid</em>
              </h3>
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
                Moderní salon v centru Hodonína, kde se budete cítit příjemně od prvního okamžiku.
              </p>
            </div>
          </FadeIn>

          {/* Gallery Grid with stagger animations */}
          <FadeIn stagger={0.15} className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 relative aspect-[4/5] overflow-hidden rounded-3xl group">
              <Image
                src="/images/salon/recepce.jpg"
                alt="Vstup do salonu"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 text-white">
                <p className="text-sm opacity-80 mb-3 tracking-wider uppercase">Krok 1</p>
                <p className="text-2xl font-light">Vítáme vás</p>
              </div>
            </div>
            <div className="md:col-span-7 grid grid-rows-2 gap-8">
              <div className="relative overflow-hidden rounded-3xl group">
                <Image
                  src="/images/salon/cekarna.jpg"
                  alt="Relaxační prostor"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-12 left-12 text-white">
                  <p className="text-sm opacity-80 mb-3 tracking-wider uppercase">Krok 2</p>
                  <p className="text-2xl font-light">Odpočiňte si</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl group">
                <Image
                  src="/images/salon/kreslomistnostnaprocedury.jpg"
                  alt="Ošetření"
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-12 left-12 text-white">
                  <p className="text-sm opacity-80 mb-3 tracking-wider uppercase">Krok 3</p>
                  <p className="text-2xl font-light">Užijte si péči</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services section - With 3D Carousel & Perspective Depth */}
      <ServicesSection categories={categories} />

      {/* Horizontal Services Carousel - Clean scroll-driven animation */}
      <HorizontalServicesSection />

      {/* Voucher CTA - Simple 2D Scale + Fade */}
      <VoucherCTASection />

      {/* Testimonials - With 2D Bounce & Scroll-Direction Aware */}
      <TestimonialsSection />

      {/* FAQ - With Parallax */}
      <section id="faq" className="mx-auto max-w-[1250px] px-6 py-16 md:py-24">
        <ParallaxText speed={0.2}>
          <SectionTitle
            center={false}
            title={
              <>
                Máte <em className="italic">dotaz?</em>
              </>
            }
            subtitle="Připravili jsme odpovědi na nejčastější otázky."
          />
        </ParallaxText>

        <ElasticScale scaleRange={[0.98, 1.02]} className="mt-16 grid gap-8 md:grid-cols-2">
          <FAQ items={faqsLeft} />
          <FAQ items={faqsRight} />
        </ElasticScale>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Contact - 2D Stagger Animations */}
      <ContactSection />

      {/* Newsletter - With Smooth Reveal */}
      <section className="mx-auto max-w-[1250px] px-6 py-16 md:py-24">
        <SmoothReveal>
          <SubscribeForm />
        </SmoothReveal>
      </section>
    </main>
  )
}
