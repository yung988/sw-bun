import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EMS budování svalů - 30 minut = 5,5 hodiny v posilovně | SW Beauty Blog',
  description: '30 minut = 5,5 hodiny v posilovně. Zjistěte, jak to funguje a jaké jsou výsledky EMS budování svalů.',
  keywords: ['EMS budování svalů', 'elektromagnetická stimulace', 'posilování svalů', 'kosmetika blog', 'Praha'],
  openGraph: {
    title: 'EMS budování svalů - 30 minut = 5,5 hodiny v posilovně | SW Beauty Blog',
    description: '30 minut = 5,5 hodiny v posilovně. Zjistěte, jak to funguje a jaké jsou výsledky EMS budování svalů.',
    images: ['/images/ems.png'],
    url: 'https://swbeauty.cz/blog/ems-budovani-svalu',
    type: 'article',
    publishedTime: '2025-01-05T00:00:00Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMS budování svalů - 30 minut = 5,5 hodiny v posilovně | SW Beauty Blog',
    description: '30 minut = 5,5 hodiny v posilovně. Zjistěte, jak to funguje a jaké jsou výsledky EMS budování svalů.',
    images: ['/images/ems.png'],
  },
}

import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 pt-12 pb-8">
        <div className="space-y-4 text-center">
          <div className="text-sm text-slate-500">Leden 5, 2025</div>
          <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900">EMS budování svalů</h1>
          <p className="text-lg text-slate-600">30 minut = 5,5 hodiny v posilovně. Jak to funguje?</p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
          <Image
            src="/images/ems.png"
            alt="EMS budování svalů"
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 pb-20">
        <div className="prose prose-slate max-w-none">
          <h3 className="text-2xl font-medium text-slate-900 mb-4">Co je EMS technologie?</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            EMS (Electrical Muscle Stimulation) je revoluční technologie pro budování a posilování svalů pomocí
            elektromagnetické stimulace. Během 30minutového sezení dosáhnete 30 000 supramaximálních kontrakcí, což
            odpovídá 5,5 hodinám intenzivního tréninku v posilovně!
          </p>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Jak EMS funguje?</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Technologie EMS využívá elektromagnetické pole vysoké intenzity (HIFEM), které proniká do svalové tkáně a
            vyvolává supramaximální kontrakce. Tyto kontrakce jsou mnohem intenzivnější než při běžném cvičení a
            dosahují 100% aktivace svalových vláken.
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            Během jednoho sezení se svaly stahují a uvolňují tisíce krát, což vede k:
          </p>
          <ul className="space-y-3 mb-6">
            <li className="text-slate-600 leading-relaxed">
              <strong>Růstu svalové hmoty:</strong> Stimulace hypertrofie svalových vláken
            </li>
            <li className="text-slate-600 leading-relaxed">
              <strong>Spalování tuku:</strong> Intenzivní kontrakce vyžadují energii z tukových zásob
            </li>
            <li className="text-slate-600 leading-relaxed">
              <strong>Zpevnění:</strong> Zlepšení svalového tonu a definice
            </li>
            <li className="text-slate-600 leading-relaxed">
              <strong>Regeneraci:</strong> Podpora obnovy svalů po zátěži
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Výhody EMS budování svalů</h3>
          <ul className="space-y-2 mb-6">
            <li className="text-slate-600">
              • <strong>Úspora času:</strong> 30 minut = 5,5h v posilovně
            </li>
            <li className="text-slate-600">
              • <strong>Bez námahy:</strong> Ležíte a svaly pracují za vás
            </li>
            <li className="text-slate-600">
              • <strong>Cílené posilování:</strong> Zaměření na konkrétní partie
            </li>
            <li className="text-slate-600">
              • <strong>Viditelné výsledky:</strong> Již po 3-5 sezeních
            </li>
            <li className="text-slate-600">
              • <strong>Bezpečné:</strong> Neinvazivní bez rizika zranění
            </li>
            <li className="text-slate-600">
              • <strong>Pro všechny:</strong> Od začátečníků po sportovce
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Které partie lze ošetřit?</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            EMS technologie umožňuje cílené posilování různých svalových skupin:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="text-slate-600">
              • <strong>Břicho:</strong> Zpevnění břišních svalů a redukce tuku
            </li>
            <li className="text-slate-600">
              • <strong>Zadek:</strong> Lifting a tvarování hýždí
            </li>
            <li className="text-slate-600">
              • <strong>Stehna:</strong> Zpevnění a zeštíhlení
            </li>
            <li className="text-slate-600">
              • <strong>Paže:</strong> Definice a odstranění povislé kůže
            </li>
            <li className="text-slate-600">
              • <strong>Lýtka:</strong> Tvarování a posílení
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Pro koho je EMS vhodné?</h3>
          <p className="text-slate-600 leading-relaxed mb-6">EMS je ideální pro:</p>
          <ul className="space-y-2 mb-6">
            <li className="text-slate-600">• Lidi s nedostatkem času na pravidelné cvičení</li>
            <li className="text-slate-600">• Ty, kdo chtějí zpevnit a vytvarovat postavu</li>
            <li className="text-slate-600">• Sportovce pro doplnění tréninku</li>
            <li className="text-slate-600">• Osoby po těhotenství pro obnovu svalů</li>
            <li className="text-slate-600">• Každého, kdo chce viditelné výsledky rychle</li>
          </ul>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Průběh ošetření</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Ošetření trvá 30-60 minut podle počtu partií. Pohodlně ležíte, zatímco aplikátory umístěné na vybraných
            partiích vyvolávají intenzivní svalové kontrakce. Můžete cítit silné stahování svalů, ale ošetření není
            bolestivé. Po proceduře můžete cítit únavu svalů podobnou jako po intenzivním tréninku.
          </p>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Jak často opakovat?</h3>
          <p className="text-slate-600 leading-relaxed mb-6">Pro optimální výsledky doporučujeme:</p>
          <ul className="space-y-2 mb-6">
            <li className="text-slate-600">
              • <strong>Intenzivní kúra:</strong> 8-10 ošetření 2x týdně
            </li>
            <li className="text-slate-600">
              • <strong>První výsledky:</strong> Po 3-5 sezeních
            </li>
            <li className="text-slate-600">
              • <strong>Maximální efekt:</strong> Po dokončení kúry
            </li>
            <li className="text-slate-600">
              • <strong>Udržování:</strong> 1x měsíčně
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Kombinace s dalšími metodami</h3>
          <p className="text-slate-600 leading-relaxed mb-6">Pro ještě lepší výsledky kombinujte EMS s:</p>
          <ul className="space-y-2 mb-6">
            <li className="text-slate-600">
              • <strong>Endos-roller:</strong> Pro detoxikaci a zeštíhlení
            </li>
            <li className="text-slate-600">
              • <strong>Kavitací:</strong> Pro redukci tukových zásob
            </li>
            <li className="text-slate-600">
              • <strong>HIFU tělo:</strong> Pro zpevnění kůže
            </li>
            <li className="text-slate-600">
              • <strong>Zdravou stravou:</strong> Pro maximální výsledky
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Regenerace svalů</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            EMS je také skvělé pro regeneraci svalů po intenzivním sportovním výkonu. Pomáhá:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="text-slate-600">• Urychlit obnovu svalových vláken</li>
            <li className="text-slate-600">• Zmírnit svalovou únavu</li>
            <li className="text-slate-600">• Zlepšit prokrvení svalů</li>
            <li className="text-slate-600">• Předejít svalovým křečím</li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-[2rem] border border-faint bg-slate-50 p-8 text-center">
          <h3 className="text-xl font-medium text-slate-900 mb-2">Vyzkoušejte EMS budování svalů</h3>
          <p className="text-slate-600 mb-6">Objednejte si první sezení a poznejte sílu elektromagnetické stimulace.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/cenik"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Zobrazit ceník
            </Link>
            <Link
              href="mailto:info@swbeauty.cz"
              className="rounded-full border border-faint px-6 py-3 text-sm font-medium text-slate-600 transition hover:bg-white"
            >
              Kontaktovat nás
            </Link>
          </div>
        </div>

        {/* Social Share */}
        <div className="mt-12 border-t border-faint pt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Sdílejte tento článek</p>
              <p className="text-xs text-slate-500 mt-1">Jednoduché nápady o designu, jasnosti a dynamice</p>
            </div>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-slate-400 transition hover:text-slate-900"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Instagram">
                <title>Instagram</title>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-faint bg-slate-50/50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-xs text-slate-400">
              Všechna práva vyhrazena. © {new Date().getFullYear()} SW Beauty ·
              <Link href="/" className="ml-2 underline-offset-4 hover:underline">
                Zpět na hlavní stránku
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
