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
import { getServiceCategories } from '@/lib/services'
import Image from 'next/image'
import Link from 'next/link'
import OpenVoucherButton from '@/components/OpenVoucherButton'

// Only show most important FAQs - 6 total (3+3)
const faqsLeft = faqs.slice(0, 3)
const faqsRight = faqs.slice(3, 6)

export default function Home() {
  const categories = getServiceCategories()

  console.log('🔍 Categories count:', categories.length)
  console.log(
    '🔍 Categories:',
    categories.map((c) => c.name)
  )

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
            eyebrow="Proč nás vybrat"
            title={
              <>
                Proč vaše pleť si zaslouží <em className="italic">nejlepší péči</em>
              </>
            }
            subtitle="Kopeme hluboko do vašich cílů, zákazníků a výzev, abychom se sladili na strategii a směru."
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
              <SectionTitle
                eyebrow="O nás"
                title={
                  <>
                    Poznejte <em className="italic">SW Beauty</em>
                  </>
                }
                subtitle="Jsme moderní kosmetický salon v Hodoníně, kde kombinujeme nejnovější technologie s individuálním přístupem. Naše zakladatelka Sabina má více než 10 let zkušeností a pravidelně absolvuje školení, aby vám mohla nabízet ty nejlepší služby."
              />
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
        <section id="sluzby" className="mx-auto max-w-[1250px] px-6 py-16 lg:py-24">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <SectionTitle center={false} eyebrow="Naše služby" title="Objevte naši nabídku ošetření" />
            <Link
              href="/sluzby"
              className="rounded-full border border-slate-200 px-6 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:border-slate-300"
            >
              Všechny služby
            </Link>
          </div>
          {/* Carousel - 9 služeb, ukáže 4 najednou */}
          <Carousel auto autoSpeed={20}>
            {categories.map((category) => {
              // Mapování kategorií na obrázky
              const imageMap: Record<string, string> = {
                hifu: '/images/service-hifu.jpg',
                endosphere: '/images/service-endosphere.jpg',
                'budovani-svalu': '/images/service-ems.jpeg',
                kavitace: '/images/service-cavitace.jpeg',
                kosmetika: '/images/service-cosmetic.jpeg',
                'prodluzovani-vlasu': '/images/service-hair.jpg',
                'ostatni-sluzby': '/images/service-ostatni.jpeg',
                lpg: '/images/service-endosphere.jpg', // fallback pro LPG
                hydrafacial: '/images/service-cosmetic.jpeg', // fallback pro kosmetiku
              }

              const image = imageMap[category.id] || `/images/service-default.jpg`

              return (
                <div key={category.id} className="w-[320px] shrink-0 snap-start">
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
          <SectionTitle
            eyebrow="Reference"
            title={
              <>
                Co říkají naši <em className="italic">spokojení klienti</em>
              </>
            }
          />
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
          <SectionTitle
            eyebrow="Časté dotazy"
            title={
              <>
                Máte dotaz? <em className="italic">Rádi vám pomůžeme.</em>
              </>
            }
            subtitle="Našli jsme odpovědi na nejčastější otázky našich klientů."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <FAQ items={faqsLeft} />
            <FAQ items={faqsRight} />
          </div>
        </section>
      </FadeInSection>

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Contact CTA */}
      <FadeInSection delay={0.45}>
        <section className="mx-auto max-w-[1250px] px-6 py-16 md:py-20">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium mb-3">
                  Kontaktujte nás
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-light text-slate-900 leading-tight mb-4">
                  Máte otázky? <em className="italic">Rádi pomůžeme</em>
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Nevíte si rady s výběrem služby nebo potřebujete konzultaci? Kontaktujte nás a my vám ochotně
                  poradíme.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200">
                      <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">E-mail</div>
                      <div className="text-sm text-slate-600">info@swbeauty.cz</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-200">
                      <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">Telefon</div>
                      <div className="text-sm text-slate-600">+420 773 577 899</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                  >
                    Kontaktovat nás
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/rezervace"
                    className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    Rezervovat konzultaci
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <Image
                    src="/images/team/sabina.jpg"
                    alt="Kontakt - SW Beauty"
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

      {/* Newsletter - moved to end */}
      <FadeInSection delay={0.5}>
        <section className="mx-auto max-w-[1250px] px-6 py-24 md:py-32">
          <SubscribeForm />
        </section>
      </FadeInSection>
    </main>
  )
}
