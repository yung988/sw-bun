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
import HighlightCard from '@/components/HighlightCard'
import FeatureCard from '@/components/FeatureCard'
import ContactInfoCard from '@/components/ContactInfoCard'
import { faqs } from '@/data/faq'
import { highlights } from '@/data/highlights'
import { testimonials } from '@/data/testimonials'
import { whyLeft, whyRight } from '@/data/why'
import { features } from '@/data/features'
import { getServiceCategories } from '@/lib/services'
import Image from 'next/image'
import Link from 'next/link'
import OpenVoucherButton from '@/components/OpenVoucherButton'
import OpenBookingButton from '@/components/OpenBookingButton'

// Zobrazit pouze nejdůležitější FAQ - celkem 6 (3+3)
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
    <main id="main-content" className="min-h-screen bg-white pb-24 pt-20">
      {/* Hero Section */}
      <div id="home">
        <Hero
          title="Krása, která vám"
          titleItalic="sluší"
          subtitle="Profesionální kosmetika a moderní technologie v srdci Hodonína."
          trustedText="Důvěřuje nám přes"
          trustedCount="500+ klientek"
          avatars={['/images/service-hifu.jpg', '/images/service-endosphere.jpg', '/images/service-hair.jpg']}
        />
      </div>

      {/* Why Us - Merged Highlights + Why */}
      <FadeInSection delay={0.1}>
        <section id="why" className="mx-auto max-w-[1250px] px-6 py-28 md:py-40">
          <SectionTitle
            center={false}
            eyebrow="Proč přijít právě k nám"
            title={
              <>
                Co nás <em className="italic">odlišuje</em>
              </>
            }
            subtitle="Individuální přístup, prověřené technologie a péče, která skutečně funguje."
            badge={{ icon: <Sparkles className="h-4 w-4" />, text: 'Highlights' }}
          />

          {/* Highlights Carousel */}
          <div className="mt-14 mb-24">
            <Carousel auto autoSpeed={25}>
              {highlights.map((b) => (
                <HighlightCard key={b.t} icon={b.icon} title={b.t} description={b.d} />
              ))}
            </Carousel>
          </div>

          {/* Why Cards */}
          <div className="mt-12 grid items-start gap-10 lg:gap-12 lg:grid-cols-3">
            <div className="space-y-6">
              {whyLeft.map((item) => (
                <WhyCard key={item.title} {...item} />
              ))}
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-slate-200 bg-[#efe7dd] shadow-sm">
              <Image
                src="/images/service-hifu.jpg"
                alt="Ošetření"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              {whyRight.map((item) => (
                <WhyCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* About Us Preview */}
      <FadeInSection delay={0.15}>
        <section id="o-nas" className="mx-auto max-w-[1250px] px-6 py-28 md:py-40" aria-labelledby="o-nas-heading">
          <div className="mb-20">
            <SectionTitle
              center={false}
              title={
                <>
                O našem <em className="italic">salonu</em>
                </>
              }
            subtitle="Kosmetický salon v centru Hodonína, kde se spojují špičkové technologie s osobním přístupem."
              badge={{ icon: <Heart className="h-4 w-4" />, text: 'O nás' }}
            />
          </div>

          <div className="grid gap-10 md:gap-12 lg:grid-cols-3 mb-20">
            {features.map((feature) => (
              <FeatureCard key={feature.id} icon={feature.icon} title={feature.title} description={feature.description} />
            ))}
          </div>

          {/* Stats + Content Split */}
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-2 items-start mb-20">
            {/* Left - Image & Stats */}
            <div className="space-y-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200">
                <Image
                  src="/images/team/sabina.jpg"
                  alt="Sabina - zakladatelka SW Beauty"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-3xl font-light text-slate-900 mb-1">10+</div>
                  <div className="text-xs text-slate-600">let zkušeností</div>
                </div>
                <div className="text-center p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-3xl font-light text-slate-900 mb-1">500+</div>
                  <div className="text-xs text-slate-600">spokojených klientů</div>
                </div>
                <div className="text-center p-5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-3xl font-light text-slate-900 mb-1">98%</div>
                  <div className="text-xs text-slate-600">doporučí dál</div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6 lg:pt-4">
              <div>
                <h3 className="font-display text-2xl font-light text-slate-900 mb-4">
                  Prostor pro <em className="italic">vaši krásu</em>
                </h3>
                <p className="text-slate-600 leading-relaxed mb-5 max-w-prose">
                  SW Beauty vznikl z vášně pro krásu a touhy poskytovat klientkám to nejlepší. Naše zakladatelka Sabina má více než 10 let zkušeností v oboru a pravidelně se vzdělává v nejnovějších technikách.
                </p>
                <p className="text-slate-600 leading-relaxed max-w-prose">
                  V našem salonu najdete klidné prostředí, kde se můžete nechat hýčkat moderními technologiemi. Každá klientka je pro nás jedinečná.
                </p>
              </div>

              {/* Mini Gallery */}
              <div>
                <p className="text-sm font-medium text-slate-900 mb-3">Interiér našeho salonu</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200">
                    <Image src="/images/salon/recepce.jpg" alt="Recepce" fill className="object-cover" />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200">
                    <Image src="/images/salon/cekarna.jpg" alt="Čekárna" fill className="object-cover" />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200">
                    <Image src="/images/salon/kreslomistnostnaprocedury.jpg" alt="Místnost" fill className="object-cover" />
                  </div>
                </div>
              </div>

              <Link
                href="/o-salonu"
                aria-label="Více o nás"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-medium text-white transition hover:bg-slate-800"
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
            <SectionTitle
              center={false}
              title={
                <>
                  Naše <em className="italic">služby</em>
                </>
              }
              badge={{ icon: <Scissors className="h-4 w-4" />, text: 'Služby' }}
            />
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
        <section id="poukazy" className="mx-auto max-w-[1250px] px-6 py-24 md:py-32">
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
                  Dárkový poukaz <em className="italic">na míru</em>
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Potěšte své blízké kosmetickým ošetřením. Vyberte konkrétní službu nebo hodnotu poukazu — poukaz je platný 12 měsíců.
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
            center={false}
            title={
              <>
                Co říkají naše <em className="italic">klientky</em>
              </>
            }
            badge={{ icon: <Heart className="h-4 w-4" />, text: 'Reference' }}
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
            center={false}
            title={
              <>
                Máte <em className="italic">dotaz?</em>
              </>
            }
            subtitle="Připravili jsme odpovědi na nejčastější otázky."
            badge={{ icon: <Droplet className="h-4 w-4" />, text: 'FAQ' }}
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
        <section id="kontakt" className="mx-auto max-w-[1250px] px-6 py-16 md:py-20">
          <div className="mb-12">
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
              <div className="grid gap-4">
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

              {/* Opening Hours */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
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
              <div className="flex flex-wrap gap-3">
                <OpenBookingButton className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                  Rezervovat termín
                </OpenBookingButton>
                <OpenVoucherButton className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                  Objednat poukaz
                </OpenVoucherButton>
              </div>
            </div>

            {/* Right - Map */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 self-start h-[360px] md:h-[480px] lg:h-[600px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2642.9429366838445!2d17.123456!3d48.848889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476b4e2e70000001%3A0x400f7d1c696bd50!2sMasarykovo%20n%C3%A1m%C4%9Bst%C3%AD%2059%2C%20695%2001%20Hodon%C3%ADn!5e0!3m2!1scs!2scz!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa - SW Beauty Hodonín"
                className="absolute inset-0"
              />
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
