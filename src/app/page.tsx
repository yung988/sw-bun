import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://swbeauty.cz'),
  title: 'SW Beauty - Profesionální kosmetický salon Hodonín',
  description:
    'Moderní technologie HIFU, Endos-roller, budování svalů EMS a profesionální kosmetika v Hodoníně. Profesionální péče o vaši krásu s okamžitými výsledky.',
  keywords: ['kosmetický salon', 'HIFU', 'Endos-roller', 'EMS', 'kosmetika', 'Hodonín', 'omlazení', 'formování těla'],
  alternates: {
    canonical: 'https://swbeauty.cz',
  },
  openGraph: {
    title: 'SW Beauty - Profesionální kosmetický salon Hodonín',
    description: 'Moderní technologie HIFU, Endos-roller, budování svalů EMS a profesionální kosmetika v Hodoníně.',
    images: ['/images/hero-image.jpg'],
    url: 'https://swbeauty.cz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SW Beauty - Profesionální kosmetický salon Hodonín',
    description: 'Moderní technologie HIFU, Endos-roller, budování svalů EMS a profesionální kosmetika v Hodoníně.',
    images: ['/images/hero-image.jpg'],
  },
}

import Carousel from '@/components/Carousel'
import FAQ from '@/components/FAQ'
import FadeInSection from '@/components/FadeInSection'
import Hero from '@/components/Hero'
import InstagramFeed from '@/components/InstagramFeed'
import RatingSummary from '@/components/RatingSummary'
import SectionTitle from '@/components/SectionTitle'
import { Sparkles, Heart, Zap, Droplet, Scissors } from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import SubscribeForm from '@/components/SubscribeForm'
import TestimonialCard from '@/components/TestimonialCard'
import WhyCard from '@/components/WhyCard'
import { faqs } from '@/data/faq'
import { highlights } from '@/data/highlights'
import { testimonials } from '@/data/testimonials'
import { whyLeft, whyRight } from '@/data/why'
import { getMainServices } from '@/lib/services'
import Image from 'next/image'
import Link from 'next/link'
import OpenVoucherButton from '@/components/OpenVoucherButton'

// Only show most important FAQs - 6 total (3+3)
const faqsLeft = faqs.slice(0, 3)
const faqsRight = faqs.slice(3, 6)

export default function Home() {
  const mainServices = getMainServices()
  
  console.log('🔍 Main services count:', mainServices.length)
  console.log('🔍 Main services:', mainServices.map(s => s.name))

  return (
    <main id="main-content" className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <Hero
        title="Objevte svou ideální"
        titleItalic="krásu !"
        subtitle="Moderní technologie HIFU, Endosphere a budování svalů EMS v Hodoníně."
        trustedText="Důvěřuje nám přes"
        trustedCount="500+ klientů"
        avatars={['/images/service-hifu.jpg', '/images/service-endosphere.jpg', '/images/service-hair.jpg']}
      />

      {/* Why Us - Merged Highlights + Why */}
      <FadeInSection delay={0.1}>
        <section id="why" className="mx-auto max-w-[1250px] px-6 py-24 md:py-32">
          <SectionTitle
            eyebrow="Proč SW Beauty"
            title={
              <>
                Profesionální péče v <em className="italic">luxusním</em> prostředí
              </>
            }
            subtitle="Kombinujeme nejmodernější technologie s individuálním přístupem pro maximální výsledky."
          />

          {/* Highlights Carousel */}
          <div className="mt-12 mb-20">
            <Carousel auto autoSpeed={25}>
              {highlights.map((b) => (
                <div key={b.t} className="w-[320px] shrink-0">
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
                    {b.icon && (
                      <div className="mb-4">
                        {b.icon === 'sparkles' && <Sparkles className="h-6 w-6 text-slate-900" />}
                        {b.icon === 'heart' && <Heart className="h-6 w-6 text-slate-900" />}
                        {b.icon === 'zap' && <Zap className="h-6 w-6 text-slate-900" />}
                        {b.icon === 'droplet' && <Droplet className="h-6 w-6 text-slate-900" />}
                        {b.icon === 'scissors' && <Scissors className="h-6 w-6 text-slate-900" />}
                      </div>
                    )}
                    <h3 className="text-base font-semibold text-slate-900 mb-2">{b.t}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{b.d}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Why Cards */}
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-3">
            <div className="space-y-5">
              {whyLeft.map((item) => (
                <WhyCard key={item.title} {...item} />
              ))}
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-faint bg-[#efe7dd]">
              <Image
                src="/images/service-hifu.jpg"
                alt="Ošetření"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-5">
              {whyRight.map((item) => (
                <WhyCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* About Us Preview */}
      <FadeInSection delay={0.15}>
        <section className="mx-auto max-w-[1250px] px-6 py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-slate-200">
              <Image
                src="/images/team/sabina.jpg"
                alt="Sabina - zakladatelka SW Beauty"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-3">O nás</div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900 mb-6">
                Poznejte <em className="italic">SW Beauty</em>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Jsme moderní kosmetický salon v Hodoníně, kde kombinujeme nejnovější technologie s individuálním
                přístupem. Naše zakladatelka Sabina má více než 10 let zkušeností a pravidelně absolvuje školení, aby
                vám mohla nabízet ty nejlepší služby.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <title>Potvrzeno</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-slate-900">Certifikovaná kosmetička</strong>
                    <p className="text-sm text-slate-600">S mezinárodními certifikáty</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <title>Potvrzeno</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-slate-900">Moderní technologie</strong>
                    <p className="text-sm text-slate-600">HIFU, Endosphere, EMS a další</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <title>Potvrzeno</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-slate-900">Luxusní prostředí</strong>
                    <p className="text-sm text-slate-600">Relaxujte v příjemném prostředí</p>
                  </div>
                </div>
              </div>
              <Link
                href="/o-salonu"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Více o nás
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Šipka</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Services section */}
      <FadeInSection delay={0.2}>
        <section id="sluzby" className="mx-auto max-w-[1250px] px-6 py-24 md:py-32">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <SectionTitle center={false} eyebrow="Naše služby" title="Objevte naši nabídku ošetření" />
            <Link
              href="/sluzby"
              className="rounded-full border border-slate-200 px-6 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:border-slate-300"
            >
              Všechny služby
            </Link>
          </div>
          {/* Desktop: Grid layout, Mobile: Carousel */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {mainServices.slice(0, 8).map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.name}
                description={service.description}
                price={service.price}
                category={service.category}
                href={`/sluzby/${service.categoryId}/${service.slug}`}
              />
            ))}
          </div>
          <div className="lg:hidden">
            <Carousel>
              {mainServices.slice(0, 8).map((service) => (
                <div key={service.slug} className="w-72 shrink-0 snap-start">
                  <ServiceCard
                    title={service.name}
                    description={service.description}
                    price={service.price}
                    category={service.category}
                    href={`/sluzby/${service.categoryId}/${service.slug}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      </FadeInSection>

      {/* Voucher CTA */}
      <FadeInSection delay={0.25}>
        <section className="mx-auto max-w-[1250px] px-6 py-24 md:py-32">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-12 md:p-16">
            <div className="relative z-10 grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white border border-slate-200">
                  <svg className="h-7 w-7 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Dárek</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    />
                  </svg>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900 mb-4">
                  Darujte <em className="italic">relaxaci a krásu</em>
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Dárkové poukazy SW Beauty jsou perfektní dárek pro vaše blízké. Vyberte si konkrétní službu nebo
                  hodnotu a potěšte své milované relaxací a profesionální péčí.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>Potvrzeno</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Platnost 12 měsíců
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>Potvrzeno</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Elegantní provedení s osobním věnováním
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-700">
                    <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>Potvrzeno</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Možnost výběru konkrétní služby nebo hodnoty
                  </li>
                </ul>
                <OpenVoucherButton className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition hover-gray">
                  Objednat dárkový poukaz
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Šipka</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </OpenVoucherButton>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <Image
                    src="/images/poukaz.png"
                    alt="Dárkový poukaz SW Beauty"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Testimonials */}
      <FadeInSection delay={0.3}>
        <section className="mx-auto max-w-[1250px] px-6 py-24 md:py-32">
          <SectionTitle eyebrow="Reference" title="Co říkají naši spokojení klienti" />
          <div className="mt-8">
            <RatingSummary />
          </div>
          <div className="mt-12">
            <Carousel>
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="w-[340px] md:w-[380px] shrink-0">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      </FadeInSection>

      {/* FAQ */}
      <FadeInSection delay={0.4}>
        <section id="faq" className="mx-auto max-w-[1250px] px-6 py-16 md:py-20">
          <div className="mb-8 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-3">Faq</div>
            <h2 className="font-display text-2xl md:text-3xl font-light text-slate-900 mb-3">
              Máte dotaz? <em className="italic">Rádi vám pomůžeme.</em>
            </h2>
            <Link
              href="/kontakt"
              className="inline-flex mt-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Kontaktovat nás
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <FAQ items={faqsLeft} />
            <FAQ items={faqsRight} />
          </div>
        </section>
      </FadeInSection>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Newsletter - moved to end */}
      <section className="mx-auto max-w-[1250px] px-6 py-24 md:py-32">
        <SubscribeForm />
      </section>
    </main>
  )
}
