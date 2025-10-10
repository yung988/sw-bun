import type { Metadata } from 'next'
import Image from 'next/image'
import SectionTitle from '@/components/SectionTitle'
import { Heart, Sparkles, Scissors } from 'lucide-react'

export const metadata: Metadata = {
  title: 'O salonu SW Beauty - Profesionální kosmetický salon Hodonín',
  description:
    'Poznejte Sabinu, zakladatelku SW Beauty salonu. Profesionální kosmetické služby v Hodoníně s moderními technologiemi HIFU, Endos-roller a EMS.',
  keywords: ['o salonu', 'SW Beauty', 'Sabina', 'kosmetický salon', 'Hodonín', 'profesionální péče'],
  openGraph: {
    title: 'O salonu SW Beauty - Profesionální kosmetický salon Hodonín',
    description: 'Poznejte Sabinu, zakladatelku SW Beauty salonu. Profesionální kosmetické služby v Hodoníně.',
    images: ['/images/team/sabina.jpg'],
    url: 'https://swbeauty.cz/o-salonu',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O salonu SW Beauty - Profesionální kosmetický salon Hodonín',
    description: 'Poznejte Sabinu, zakladatelku SW Beauty salonu. Profesionální kosmetické služby v Hodoníně.',
    images: ['/images/team/sabina.jpg'],
  },
}

export default function OSalonuPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white   py-20">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900  mb-6">
                O salonu <strong>SW</strong> <em className="italic">Beauty</em>
              </h1>
              <p className="text-lg text-slate-600  leading-relaxed mb-8">
                Vítejte v našem moderním kosmetickém salonu v Hodoníně. Jsme tým profesionálů, kteří se věnují vaší
                kráse s láskou a péčí již několik let.
              </p>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/images/salon/recepce.jpg"
                alt="Interiér salonu SW Beauty"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Sabina */}
      <section className="py-20">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
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
                center={false}
                title={
                  <>
                    Naši <em className="italic">zakladatelku</em>
                  </>
                }
                subtitle="Sabina je certifikovaná kosmetička s více než 10 lety zkušeností v oboru. Její vášeň pro krásu a wellness ji přivedla k založení SW Beauty salonu."
              />
              <p className="text-slate-600  leading-relaxed mb-6">
                Sabina pravidelně absolvuje školení a kurzy, aby mohla svým klientkám nabízet ty nejlepší a
                nejbezpečnější ošetření. Její přístup je individuální a vždy se zaměřuje na potřeby každé klientky.
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
                    <strong className="text-slate-900">10+ let zkušeností</strong>
                    <p className="text-sm text-slate-600">V oboru kosmetiky a wellness</p>
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
                    <strong className="text-slate-900">Pravidelná školení</strong>
                    <p className="text-sm text-slate-600">Nejnovější trendy a technologie</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salon Story */}
      <section className="py-20 bg-slate-50">
        <div className="site-container">
          <div className="mb-12">
            <SectionTitle
              center={false}
              eyebrow="Naše hodnoty"
              title={
                <>
                  Naše <strong>hodnoty</strong>
                </>
              }
              icon={<Heart className="h-4 w-4" />}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-6">
                <Image
                  src="/images/salon/cekarna.jpg"
                  alt="Čekárna salonu"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-slate-900  mb-2">Moderní prostory</h3>
              <p className="text-sm text-slate-600">
                Náš salon je vybaven nejmodernějšími technologiemi v příjemném prostředí.
              </p>
            </div>
            <div className="text-center">
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-6">
                <Image
                  src="/images/salon/kreslomistnostnaprocedury.jpg"
                  alt="Procedurální místnost"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-slate-900  mb-2">Profesionální péče</h3>
              <p className="text-sm text-slate-600">
                Každé ošetření provádíme s maximální péčí a pozorností k detailům.
              </p>
            </div>
            <div className="text-center">
              <div className="relative aspect-square overflow-hidden rounded-2xl mb-6">
                <Image
                  src="/images/salon/stul_detail.jpg"
                  alt="Detail vybavení"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium text-slate-900  mb-2">Kvalitní produkty</h3>
              <p className="text-sm text-slate-600">Používáme pouze certifikované produkty od renomovaných značek.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies & Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="site-container">
          <div className="mb-12">
            <SectionTitle
              center={false}
              title={
                <>
                  Naši <em className="italic">zakladatelku</em>
                </>
              }
              subtitle="Sabina je certifikovaná kosmetička s více než 10 lety zkušeností v oboru. Její vášeň pro krásu a wellness ji přivedla k založení SW Beauty salonu."
              badge={{ icon: <Heart className="h-4 w-4" />, text: 'Zakladatelka' }}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-slate-900">HIFU technologie</h3>
              </div>
              <p className="text-sm text-slate-600">
                Neinvazivní lifting obličeje pomocí ultrazvukových vln pro mladší vzhled bez operace.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-slate-900">Endosphere terapie</h3>
              </div>
              <p className="text-sm text-slate-600">
                Kompresivní mikrovibrace pro redukci celulitidy a zpevnění pokožky.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="font-medium text-slate-900">EMS budování svalů</h3>
              </div>
              <p className="text-sm text-slate-600">Elektrická stimulace svalů pro efektivní trénink bez námahy.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200">
            <h3 className="font-medium text-slate-900 mb-4">Certifikáty a školení</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-green-600 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong className="text-slate-900">Certifikovaná kosmetička</strong>
                  <p className="text-sm text-slate-600">Mezinárodní certifikáty v estetické medicíně</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-green-600 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong className="text-slate-900">Pravidelná školení</strong>
                  <p className="text-sm text-slate-600">Aktualizace znalostí nejnovějších trendů</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-green-600 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong className="text-slate-900">Kvalitní produkty</strong>
                  <p className="text-sm text-slate-600">Certifikované kosmetické přípravky</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-green-600 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <strong className="text-slate-900">Bezpečnost na prvním místě</strong>
                  <p className="text-sm text-slate-600">Hygienické postupy a sterilizace</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12">
            <SectionTitle center={false} eyebrow="Naše hodnoty" title="" icon={<Heart className="h-4 w-4" />} />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white mb-4">
                <svg
                  className="h-6 w-6 text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Láska k práci</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Láska k práci</h3>
              <p className="text-sm text-slate-600">Každé ošetření děláme srdcem a vášní pro krásu.</p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white mb-4">
                <svg
                  className="h-6 w-6 text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Bezpečnost</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Bezpečnost</h3>
              <p className="text-sm text-slate-600">Vaše zdraví a bezpečnost je naší nejvyšší prioritou.</p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white mb-4">
                <svg
                  className="h-6 w-6 text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Inovace</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Inovace</h3>
              <p className="text-sm text-slate-600">Pravidelně zavádíme nejnovější technologie a trendy.</p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white mb-4">
                <svg
                  className="h-6 w-6 text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Individuální přístup</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 009.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Individuální přístup</h3>
              <p className="text-sm text-slate-600">Každá klientka je pro nás jedinečná a zaslouží si osobní péči.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
