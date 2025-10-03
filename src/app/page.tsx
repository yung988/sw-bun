import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://swbeauty.cz'),
  title: 'SW Beauty - Profesionální kosmetický salon Hodonín',
  description:
    'Moderní technologie HIFU, Endos-roller, budování svalů EMS a profesionální kosmetika v Hodoníně. Profesionální péče o vaši krásu s okamžitými výsledky.',
  keywords: ['kosmetický salon', 'HIFU', 'Endos-roller', 'EMS', 'kosmetika', 'Hodonín', 'omlazení', 'formování těla'],
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

import BlogCard from '@/components/BlogCard'
import Carousel from '@/components/Carousel'
import FAQ from '@/components/FAQ'
import FadeInSection from '@/components/FadeInSection'
import Hero from '@/components/Hero'
import InstagramFeed from '@/components/InstagramFeed'
import ServiceCard from '@/components/ServiceCard'
import RatingSummary from '@/components/RatingSummary'
import SectionTitle from '@/components/SectionTitle'
import SubscribeForm from '@/components/SubscribeForm'
import TestimonialCard from '@/components/TestimonialCard'
import WhyCard from '@/components/WhyCard'
import { blogPosts } from '@/data/blog'
import { faqs } from '@/data/faq'
import { highlights } from '@/data/highlights'
import { testimonials } from '@/data/testimonials'
import { whyLeft, whyRight } from '@/data/why'
import { getMainServices } from '@/lib/services'
import Image from 'next/image'
import Link from 'next/link'

const faqsLeft = faqs.slice(0, 2)
const faqsRight = faqs.slice(2)

export default function Home() {
  const mainServices = getMainServices()

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      {/* Hero Section */}
      <Hero
        title="Objevte svou ideální"
        titleItalic="krásu !"
        subtitle="Moderní technologie HIFU, Endosphere a budování svalů EMS v Hodoníně."
        trustedText="Důvěřuje nám přes"
        trustedCount="500+ klientů"
        avatars={['/images/service-hifu.jpg', '/images/service-endosphere.jpg', '/images/service-hair.jpg']}
      />

      {/* Highlights */}
      <FadeInSection delay={0.1}>
        <section id="highlights" className="mx-auto max-w-container px-6 py-[90px]">
          <SectionTitle
            center={false}
            eyebrow="Naše přednosti"
            title={
              <>
                Proč si vybrat <em className="italic">SW Beauty</em> salon
              </>
            }
            subtitle="Kombinujeme nejmodernější technologie s individuálním přístupem."
          />
          <div className="mt-12">
            <Carousel auto autoSpeed={40}>
              {highlights.map((b) => (
                <div key={b.t} className="w-[260px] md:w-[300px] shrink-0">
                  <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-7 shadow-sm">
                    <div className="text-base font-medium text-slate-900 dark:text-white">{b.t}</div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{b.d}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      </FadeInSection>

      {/* Why section */}
      <FadeInSection delay={0.2}>
        <section id="why" className="mx-auto max-w-container px-6 py-[90px]">
          <SectionTitle
            eyebrow="Proč si vybrat nás"
            title={
              <>
                Dopřejte si <em className="italic">profesionální péči</em> v <em className="italic">moderním salonu</em>
              </>
            }
            subtitle="Kombinujeme nejnovější technologie s individuálním přístupem pro maximální výsledky."
          />
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

      {/* Services section */}
      <FadeInSection delay={0.3}>
        <section id="products" className="mx-auto max-w-container px-6 py-[90px]">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <SectionTitle center={false} eyebrow="Naše služby" title="Objevte naši nabídku ošetření" />
            <Link
              href="/sluzby"
              className="rounded-full border border-slate-200 dark:border-slate-700 px-6 py-3 text-sm text-slate-600 dark:text-slate-400 transition hover:bg-white dark:hover:bg-slate-800"
            >
              Všechny služby
            </Link>
          </div>
          {/* Desktop: Grid layout, Mobile: Carousel */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {mainServices.slice(0, 4).map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.name}
                description={service.description}
                price={service.price}
                category={service.category}
                href={`/sluzby/${service.slug}`}
              />
            ))}
          </div>
          <div className="lg:hidden">
            <Carousel>
              {mainServices.slice(0, 4).map((service) => (
                <div key={service.slug} className="w-72 shrink-0 snap-start">
                  <ServiceCard
                    title={service.name}
                    description={service.description}
                    price={service.price}
                    category={service.category}
                    href={`/sluzby/${service.slug}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      </FadeInSection>

      {/* Testimonials */}
      <FadeInSection delay={0.4}>
        <section className="mx-auto max-w-container px-6 py-[90px]">
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

      {/* Subscribe CTA */}
      <section className="mx-auto max-w-container px-6 py-[90px]">
        <SubscribeForm />
      </section>

      {/* FAQ */}
      <FadeInSection delay={0.5}>
        <section id="faq" className="mx-auto max-w-container px-6 py-[90px]">
          <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
                <svg
                  className="h-5 w-5 text-slate-900 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>FAQ ikona</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Faq</div>
                <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900 dark:text-white">
                  Máte dotaz? <em className="italic">Rádi vám pomůžeme.</em>
                </h2>
              </div>
            </div>
            <Link
              href="mailto:info@swbeauty.cz"
              className="inline-flex self-start md:self-auto rounded-full bg-slate-900 dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-slate-900 transition hover:bg-slate-800 dark:hover:bg-slate-100"
            >
              Kontaktovat nás
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <FAQ items={faqsLeft} />
            <FAQ items={faqsRight} />
          </div>
        </section>
      </FadeInSection>

      {/* Consultation CTA */}
      <section className="mx-auto max-w-container px-6 py-[90px]">
        <div className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 rounded-[2rem] bg-gradient-to-br from-sand/30 via-sand/20 to-transparent dark:from-slate-800/80 dark:via-slate-800/50 dark:to-slate-900/30 border border-sand/40 dark:border-slate-700/40 p-12 md:p-16 shadow-soft">
          {/* Dekorativní pozadí */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,246,242,0.8),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.8),transparent_50%)]" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm">
              <svg
                className="h-5 w-5 text-slate-900 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <title>Konzultace ikona</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Konzultace zdarma</div>
              <h3 className="font-display text-2xl md:text-3xl font-light text-slate-900 dark:text-white">
                Domluvte si konzultaci <em className="italic">ještě dnes.</em>
              </h3>
            </div>
          </div>
          <Link
            href="mailto:info@swbeauty.cz"
            className="relative z-10 inline-flex rounded-full bg-slate-900 dark:bg-white px-8 py-4 text-sm font-medium text-white dark:text-slate-900 transition hover:bg-slate-800 dark:hover:bg-slate-100 hover:shadow-lg hover:scale-105"
          >
            Objednat konzultaci
          </Link>
        </div>
      </section>

      {/* Blog */}
      <FadeInSection delay={0.6}>
        <section className="mx-auto max-w-container px-6 py-[90px]">
          <div className="mb-12 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
                <svg
                  className="h-5 w-5 text-slate-900 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Konzultace ikona</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Blog</div>
                <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900 dark:text-white">
                  Nejnovější články <em className="italic">pro vás</em>
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Prozkoumejte naše poslední články na míru právě vám
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.title} {...post} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="#"
              className="inline-flex rounded-full bg-slate-900 dark:bg-white px-8 py-4 text-sm font-medium text-white dark:text-slate-900 transition hover:bg-slate-800 dark:hover:bg-slate-100"
            >
              Zobrazit vše
            </Link>
          </div>
        </section>
      </FadeInSection>

      {/* Instagram Feed */}
      <InstagramFeed />
    </main>
  )
}
