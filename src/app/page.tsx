import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SW Beauty - Profesionální kosmetický salon',
  description:
    'Moderní technologie HIFU, Endos-roller, budování svalů EMS a profesionální kosmetika v Praze. Profesionální péče o vaši krásu s okamžitými výsledky.',
  keywords: ['kosmetický salon', 'HIFU', 'Endos-roller', 'EMS', 'kosmetika', 'Praha', 'omlazení', 'formování těla'],
  openGraph: {
    title: 'SW Beauty - Profesionální kosmetický salon',
    description: 'Moderní technologie HIFU, Endos-roller, budování svalů EMS a profesionální kosmetika v Praze.',
    images: ['/images/hero-image.jpg'],
    url: 'https://swbeauty.cz',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SW Beauty - Profesionální kosmetický salon',
    description: 'Moderní technologie HIFU, Endos-roller, budování svalů EMS a profesionální kosmetika v Praze.',
    images: ['/images/hero-image.jpg'],
  },
}

import BlogCard from '@/components/BlogCard'
import Carousel from '@/components/Carousel'
import ContactForm from '@/components/ContactForm'
import FAQ from '@/components/FAQ'
import FadeInSection from '@/components/FadeInSection'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import PartnersStrip from '@/components/PartnersStrip'
import ProductGridCard from '@/components/ProductGridCard'
import RatingSummary from '@/components/RatingSummary'
import SectionTitle from '@/components/SectionTitle'
import SubscribeForm from '@/components/SubscribeForm'
import TestimonialCard from '@/components/TestimonialCard'
import VoucherForm from '@/components/VoucherForm'
import WhyCard from '@/components/WhyCard'
import { blogPosts } from '@/data/blog'
import { faqs } from '@/data/faq'
import { highlights } from '@/data/highlights'
import { services } from '@/data/services'
import { testimonials } from '@/data/testimonials'
import { whyLeft, whyRight } from '@/data/why'
import Image from 'next/image'
import Link from 'next/link'

const faqsLeft = faqs.slice(0, 2)
const faqsRight = faqs.slice(2)

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pb-24">
      <Navbar />

      {/* Hero Section */}
      <Hero
        title="Profesionální péče o"
        titleItalic="vaši krásu !"
        subtitle="Moderní technologie HIFU, Endosphere, budování svalů EMS a profesionální kosmetika v Praze."
        trustedText="Důvěřuje nám přes"
        trustedCount="500+ zákazníků"
        avatars={['/images/service-hifu.jpg', '/images/service-endosphere.jpg', '/images/service-hair.jpg']}
      />

      {/* Highlights */}
      <FadeInSection delay={0.1}>
        <section id="highlights" className="mx-auto max-w-[1200px] px-6 py-20">
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
        <section id="why" className="mx-auto max-w-[1200px] px-6 py-20">
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

      {/* Products carousel */}
      <FadeInSection delay={0.3}>
        <section id="products" className="mx-auto max-w-[1200px] px-6 py-[90px]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <SectionTitle center={false} eyebrow="Naše služby" title="Objevte naši nabídku ošetření" />
            <Link
              href="/cenik"
              className="rounded-full border border-slate-200 dark:border-slate-700 px-6 py-3 text-sm text-slate-600 dark:text-slate-400 transition hover:bg-white dark:hover:bg-slate-800"
            >
              Celý ceník
            </Link>
          </div>
          <div className="mt-12">
            <Carousel>
              {services.map((p) => (
                <div key={p.title} className="w-72 shrink-0 snap-start">
                  <ProductGridCard {...p} />
                </div>
              ))}
            </Carousel>
          </div>
        </section>
      </FadeInSection>

      {/* Testimonials */}
      <FadeInSection delay={0.4}>
        <section className="mx-auto max-w-[1200px] px-6 py-[90px]">
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
      <section className="mx-auto max-w-[1200px] px-6 py-[90px]">
        <SubscribeForm />
      </section>

      {/* FAQ */}
      <FadeInSection delay={0.5}>
        <section id="faq" className="mx-auto max-w-[1200px] px-6 py-[90px]">
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
      <section className="mx-auto max-w-[1200px] px-6 py-[90px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800 p-12 md:p-16">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
              <svg
                className="h-5 w-5 text-slate-900 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
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
            className="inline-flex rounded-full bg-slate-900 dark:bg-white px-8 py-4 text-sm font-medium text-white dark:text-slate-900 transition hover:bg-slate-800 dark:hover:bg-slate-100"
          >
            Objednat konzultaci
          </Link>
        </div>
      </section>

      {/* Blog */}
      <FadeInSection delay={0.6}>
        <section className="mx-auto max-w-[1200px] px-6 py-[90px]">
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

      {/* Voucher Section */}
      <FadeInSection delay={0.7}>
        <section className="mx-auto max-w-[1200px] px-6 py-[90px]">
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
              <svg
                className="h-5 w-5 text-slate-900 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Dárkové poukazy</div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900 dark:text-white">
                Darujte <em className="italic">relaxaci a krásu</em>
              </h2>
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Dárkový poukaz je perfektní dárek pro vaše blízké. Můžete si vybrat konkrétní hodnotu nebo nechat
                obdarovaného vybrat si ošetření podle vlastního výběru.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Platnost 12 měsíců</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Poukaz je platný rok od data vystavení</p>
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Elegantní provedení</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Vytiskneme poukaz v krásném designu</p>
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Osobní věnování</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Můžete přidat vlastní text</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
              <VoucherForm />
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Contact & Map Section */}
      <FadeInSection delay={0.8}>
        <section className="mx-auto max-w-[1200px] px-6 py-[90px]">
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
              <svg
                className="h-5 w-5 text-slate-900 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">Kontakt</div>
              <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900 dark:text-white">
                Navštivte nás <em className="italic">v salonu</em>
              </h2>
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-sm">
                <ContactForm />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">Adresa</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Vaše ulice 123
                    <br />
                    110 00 Praha 1
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">Otevírací doba</h3>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex justify-between">
                      <span>Pondělí - Pátek:</span>
                      <span className="font-medium">9:00 - 19:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sobota:</span>
                      <span className="font-medium">9:00 - 15:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Neděle:</span>
                      <span className="font-medium">Zavřeno</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">Kontakt</h3>
                  <div className="space-y-1 text-slate-600 dark:text-slate-400">
                    <p className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <a
                        href="mailto:info@swbeauty.cz"
                        className="hover:text-slate-900 dark:hover:text-white transition"
                      >
                        info@swbeauty.cz
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a href="tel:+420123456789" className="hover:text-slate-900 dark:hover:text-white transition">
                        +420 123 456 789
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                title="Mapa umístění SW Beauty"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.7499999999995!2d14.4378!3d50.0755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA0JzMxLjgiTiAxNMKwMjYnMTYuMSJF!5e0!3m2!1scs!2scz!4v1234567890"
                width="100%"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale"
              />
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-12 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white shadow-sm">
                  <Image src="/logo.svg" alt="SW Beauty" fill className="object-contain p-1.5" />
                </div>
                <span className="font-display text-lg tracking-tight">SW Beauty</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Profesionální péče o pleť v srdci České republiky.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-medium text-slate-900 dark:text-white">Rychlé odkazy</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#highlights" className="hover:text-slate-900 dark:hover:text-white transition">
                    Přednosti
                  </a>
                </li>
                <li>
                  <a href="#why" className="hover:text-slate-900 dark:hover:text-white transition">
                    Proč SW Beauty
                  </a>
                </li>
                <li>
                  <a href="#products" className="hover:text-slate-900 dark:hover:text-white transition">
                    Produkty
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-4 text-sm font-medium text-slate-900 dark:text-white">Služby</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="/sluzby/hifu-facelift" className="hover:text-slate-900 dark:hover:text-white transition">
                    HIFU ošetření
                  </a>
                </li>
                <li>
                  <a href="/sluzby/endos-roller" className="hover:text-slate-900 dark:hover:text-white transition">
                    Endosphere
                  </a>
                </li>
                <li>
                  <a href="/sluzby/kosmetika" className="hover:text-slate-900 dark:hover:text-white transition">
                    Péče o vlasy
                  </a>
                </li>
                <li>
                  <a href="/cenik" className="hover:text-slate-900 dark:hover:text-white transition">
                    Ceník
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 text-sm font-medium text-slate-900 dark:text-white">Kontakt</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="mailto:info@swbeauty.cz" className="hover:text-slate-900 dark:hover:text-white transition">
                    info@swbeauty.cz
                  </a>
                </li>
                <li>
                  <a href="tel:+420123456789" className="hover:text-slate-900 dark:hover:text-white transition">
                    +420 123 456 789
                  </a>
                </li>
                <li className="pt-2">
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
                    >
                      FB
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
                    >
                      IG
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-xs text-slate-400 dark:text-slate-300">
            <p>
              Všechna práva vyhrazena. © {new Date().getFullYear()} SW Beauty ·{' '}
              <a href="/ochrana-osobnich-udaju" className="underline-offset-4 hover:underline">
                Ochrana osobních údajů
              </a>{' '}
              ·{' '}
              <a href="/obchodni-podminky" className="underline-offset-4 hover:underline">
                Obchodní podmínky
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
