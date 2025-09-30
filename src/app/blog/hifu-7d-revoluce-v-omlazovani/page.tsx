import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HIFU 7D - revoluce v omlazování | SW Beauty Blog',
  description:
    'Neinvazivní lifting bez operace s okamžitým efektem. Zjistěte více o této revoluční technologii HIFU 7D.',
  keywords: ['HIFU 7D', 'omlazování', 'neinvazivní lifting', 'kosmetika blog', 'Praha'],
  openGraph: {
    title: 'HIFU 7D - revoluce v omlazování | SW Beauty Blog',
    description:
      'Neinvazivní lifting bez operace s okamžitým efektem. Zjistěte více o této revoluční technologii HIFU 7D.',
    images: ['/images/service-hifu.jpg'],
    url: 'https://swbeauty.cz/blog/hifu-7d-revoluce-v-omlazovani',
    type: 'article',
    publishedTime: '2025-01-15T00:00:00Z',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIFU 7D - revoluce v omlazování | SW Beauty Blog',
    description:
      'Neinvazivní lifting bez operace s okamžitým efektem. Zjistěte více o této revoluční technologii HIFU 7D.',
    images: ['/images/service-hifu.jpg'],
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
          <div className="text-sm text-slate-500">Leden 15, 2025</div>
          <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900">
            HIFU 7D - revoluce v omlazování
          </h1>
          <p className="text-lg text-slate-600">Neinvazivní lifting bez operace s okamžitým efektem</p>
        </div>
      </section>

      {/* Featured Image */}
      <section className="mx-auto max-w-4xl px-6 pb-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-slate-100">
          <Image
            src="/images/service-hifu.jpg"
            alt="HIFU 7D ošetření"
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 pb-20">
        <div className="prose prose-slate max-w-none">
          <h3 className="text-2xl font-medium text-slate-900 mb-4">Co je HIFU 7D?</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            HIFU (High-Intensity Focused Ultrasound) je nejmodernější neinvazivní technologie pro lifting a zpevnění
            pleti. Na rozdíl od klasických metod pracuje HIFU v hlubokých vrstvách kůže, kde stimuluje tvorbu nového
            kolagenu a elastinu bez poškození povrchu pleti.
          </p>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Jak HIFU funguje?</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Technologie HIFU 7D využívá fokusovaný ultrazvuk, který proniká do hloubky 1,5 až 4,5 mm pod povrch kůže.
            Tepelná energie zahřeje tkáň na 60-70°C, což spustí proces kolageneze - přirozené obnovy kolagenu. Výsledkem
            je postupné zpevnění a lifting pleti.
          </p>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Výhody HIFU 7D</h3>
          <ul className="space-y-3 mb-6">
            <li className="text-slate-600 leading-relaxed">
              <strong>Okamžitý efekt:</strong> První výsledky viditelné ihned po ošetření
            </li>
            <li className="text-slate-600 leading-relaxed">
              <strong>Dlouhodobé výsledky:</strong> Efekt se zlepšuje 2-3 měsíce a vydrží až 12-18 měsíců
            </li>
            <li className="text-slate-600 leading-relaxed">
              <strong>Bez rekonvalescence:</strong> Můžete se vrátit k běžným aktivitám ihned
            </li>
            <li className="text-slate-600 leading-relaxed">
              <strong>Bezpečné:</strong> Neinvazivní metoda bez řezů a anestézie
            </li>
            <li className="text-slate-600 leading-relaxed">
              <strong>Přirozené výsledky:</strong> Postupné zlepšení bez "umělého" vzhledu
            </li>
          </ul>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Pro koho je HIFU vhodné?</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            HIFU je ideální pro osoby ve věku 30-65 let s mírným až středním povislým pleti. Nejlepší výsledky
            dosahujeme u klientů, kteří chtějí:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="text-slate-600">• Zpevnit povolené kontury obličeje</li>
            <li className="text-slate-600">• Redukovat dvojitou bradu</li>
            <li className="text-slate-600">• Zlepšit tvar obličeje a čelisti</li>
            <li className="text-slate-600">• Zmírnit vrásky na čele a kolem očí</li>
            <li className="text-slate-600">• Zpevnit kůži na krku a dekoltu</li>
          </ul>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Průběh ošetření</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Ošetření trvá 60-90 minut v závislosti na rozsahu. Nejprve aplikujeme ultrazvukový gel a poté přikládáme
            aplikátor na jednotlivé partie obličeje. Můžete cítit mírné teplo a píchání, ale ošetření je dobře
            snesitelné. Po proceduře může být pleť lehce zarudlá, což odezní do několika hodin.
          </p>

          <h3 className="text-2xl font-medium text-slate-900 mb-4 mt-8">Péče po ošetření</h3>
          <p className="text-slate-600 leading-relaxed mb-6">Po HIFU ošetření doporučujeme:</p>
          <ul className="space-y-2 mb-6">
            <li className="text-slate-600">• Hydratovat pleť kvalitními produkty</li>
            <li className="text-slate-600">• Používat SPF 50+ po dobu 2 týdnů</li>
            <li className="text-slate-600">• Vyhnout se sauně a intenzivnímu sportu 48 hodin</li>
            <li className="text-slate-600">• Pít dostatek vody pro podporu regenerace</li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-[2rem] border border-faint bg-slate-50 p-8 text-center">
          <h3 className="text-xl font-medium text-slate-900 mb-2">Zajímá vás HIFU ošetření?</h3>
          <p className="text-slate-600 mb-6">Domluvte si konzultaci a zjistěte, zda je HIFU vhodné pro vás.</p>
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
