import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'O salonu SW Beauty - Profesionální kosmetický salon v Praze',
  description:
    'Poznejte Sabinu, zakladatelku SW Beauty salonu. Profesionální kosmetické služby v Praze s moderními technologiemi HIFU, Endos-roller a EMS.',
  keywords: ['o salonu', 'SW Beauty', 'Sabina', 'kosmetický salon', 'Praha', 'profesionální péče'],
  openGraph: {
    title: 'O salonu SW Beauty - Profesionální kosmetický salon v Praze',
    description: 'Poznejte Sabinu, zakladatelku SW Beauty salonu. Profesionální kosmetické služby v Praze.',
    images: ['/images/team/sabina.jpg'],
    url: 'https://swbeauty.cz/o-salonu',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O salonu SW Beauty - Profesionální kosmetický salon v Praze',
    description: 'Poznejte Sabinu, zakladatelku SW Beauty salonu. Profesionální kosmetické služby v Praze.',
    images: ['/images/team/sabina.jpg'],
  },
}

export default function OSalonuPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-6">
                O salonu <em className="italic">SW Beauty</em>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Vítejte v našem moderním kosmetickém salonu v srdci Prahy. Jsme tým profesionálů, kteří se věnují vaší
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
              <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-6">
                Poznejte <em className="italic">Sabina</em>, naši zakladatelku
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Sabina je certifikovaná kosmetička s více než 10 lety zkušeností v oboru. Její vášeň pro krásu a
                wellness ji přivedla k založení SW Beauty salonu, kde kombinuje tradiční kosmetické techniky s
                nejnovějšími technologiemi.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
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
                    <strong className="text-slate-900 dark:text-white">Certifikovaná kosmetička</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">S mezinárodními certifikáty</p>
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
                    <strong className="text-slate-900 dark:text-white">10+ let zkušeností</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">V oboru kosmetiky a wellness</p>
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
                    <strong className="text-slate-900 dark:text-white">Pravidelná školení</strong>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Nejnovější trendy a technologie</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salon Story */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="site-container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-6">
              Příběh našeho <em className="italic">salonu</em>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              SW Beauty vznikl z lásky k péči o krásu a touhy poskytovat klientkám ten nejlepší zážitek z kosmetických
              ošetření.
            </p>
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
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Moderní prostory</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
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
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Profesionální péče</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
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
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Kvalitní produkty</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Používáme pouze certifikované produkty od renomovaných značek.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900 dark:text-white mb-6">
              Naše <em className="italic">hodnoty</em>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-slate-900 dark:text-white"
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
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Láska k práci</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Každé ošetření děláme srdcem a vášní pro krásu.
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-slate-900 dark:text-white"
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
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Bezpečnost</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Vaše zdraví a bezpečnost je naší nejvyšší prioritou.
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-slate-900 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <title>Inovace</title>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Inovace</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Pravidelně zavádíme nejnovější technologie a trendy.
              </p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mx-auto mb-4">
                <svg
                  className="h-6 w-6 text-slate-900 dark:text-white"
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
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Individuální přístup</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Každá klientka je pro nás jedinečná a zaslouží si osobní péči.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
