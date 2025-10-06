import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů | SW Beauty',
  description: 'Zásady ochrany osobních údajů SW Beauty Hodonín',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-20">
      <div className="mx-auto max-w-[900px] px-6">
        <Link href="/" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-8 transition">
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>Zpět</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zpět na hlavní stránku
        </Link>

        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-8">Ochrana osobních údajů</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 leading-relaxed mb-6">
            SW Beauty respektuje vaše soukromí a zavazuje se chránit vaše osobní údaje v souladu s nařízením GDPR
            (General Data Protection Regulation).
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">Správce osobních údajů</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Správcem vašich osobních údajů je SW Beauty, se sídlem v Hodoníně.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">Jaké údaje zpracováváme</h2>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
            <li>Kontaktní údaje (jméno, e-mail, telefon)</li>
            <li>Údaje nutné pro poskytnutí služeb</li>
            <li>Údaje ze zákaznických rezervací</li>
          </ul>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">Účel zpracování</h2>
          <p className="text-slate-600 leading-relaxed mb-6">Vaše osobní údaje zpracováváme za účelem:</p>
          <ul className="list-disc list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
            <li>Poskytování našich služeb</li>
            <li>Komunikace s klienty</li>
            <li>Zpracování rezervací</li>
            <li>Zasílání newsletteru (pouze se souhlasem)</li>
          </ul>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">Vaše práva</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Máte právo na přístup ke svým osobním údajům, jejich opravu, výmaz, omezení zpracování, přenositelnost údajů
            a vznesení námitky proti zpracování.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">Kontakt</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            V případě dotazů týkajících se zpracování osobních údajů nás kontaktujte na:{' '}
            <a href="mailto:info@swbeauty.cz" className="text-slate-900 hover:underline">
              info@swbeauty.cz
            </a>
          </p>

          <p className="text-sm text-slate-500 mt-12">Poslední aktualizace: {new Date().toLocaleDateString('cs-CZ')}</p>
        </div>
      </div>
    </main>
  )
}
