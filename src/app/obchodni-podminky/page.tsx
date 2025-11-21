import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Provozní řád | SW Beauty',
  description: 'Provozní řád kosmetického salonu SW Beauty Hodonín',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20 md:pt-40 md:pb-20 lg:pt-44 lg:pb-20">
      <div className="mx-auto max-w-[900px] px-6">
        <Link href="/" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-8 transition">
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <title>Zpět</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zpět na hlavní stránku
        </Link>

        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-8">Provozní řád salonu</h1>

        <div className="prose prose-slate max-w-none">
          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">1. Objednání a rezervace</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Ošetření doporučujeme objednat s předstihem telefonicky, e-mailem nebo prostřednictvím rezervačního
            formuláře na našich webových stránkách. Každá rezervace bude potvrzena.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">2. Zrušení nebo změna termínu</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Zrušení nebo změnu termínu je nutné nahlásit nejpozději 24 hodin předem. V případě opožděného zrušení nebo
            nedostavení si vyhrazujeme právo účtovat 50% z ceny ošetření.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">3. Pozdní příchod</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            V případě zpoždění klienta bude ošetření zkráceno o dobu zpoždění, cena zůstává nezměněna. Prosíme o příchod
            5-10 minut před začátkem ošetření.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">4. Platba za služby</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Platba probíhá v hotovosti nebo platební kartou ihned po ukončení ošetření. Ceny služeb jsou uvedeny v
            ceníku a zahrnují DPH.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">5. Balíčky a permanentky</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Zakoupené balíčky služeb mají platnost 12 měsíců od data zakoupení. Po uplynutí platnosti propadají
            nevyužité služby. Balíčky nelze vracet ani vyměnit za finanční hotovost.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">6. Dárkové poukazy</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Dárkové poukazy jsou platné 12 měsíců od data vystavení. Poukazy nelze vyměnit za peníze, pouze za služby
            salonu.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">7. Kontraindikace</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Klient je povinen před ošetřením informovat kosmetičku o svém zdravotním stavu, alergiích, medikaci a
            těhotenství. Salon nenese odpovědnost za komplikace vzniklé zatajením těchto informací.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">8. Odpovědnost</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Klient je plně odpovědný za dodržování pokynů kosmetičky před i po ošetření. Nedodržení doporučení může
            negativně ovlivnit výsledek ošetření.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">9. Hygiena a bezpečnost</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            V salonu dbáme na přísné dodržování hygienických a bezpečnostních standardů. Používáme pouze certifikované
            přípravky a sterilní nástroje.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">10. Reklamace</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            V případě nespokojenosti se službou nás prosím kontaktujte do 48 hodin. Každou reklamaci řešíme individuálně
            a snažíme se najít optimální řešení.
          </p>

          <h2 className="text-2xl font-medium text-slate-900 mt-12 mb-4">Kontakt</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            SW Beauty s.r.o.
            <br />U Cihelny 1326/4, 695 01 Hodonín
            <br />
            E-mail:{' '}
            <a href="mailto:info@swbeauty.cz" className="text-slate-900 hover:underline">
              info@swbeauty.cz
            </a>
            <br />
            Tel: +420 776 632 498
          </p>

          <p className="text-sm text-slate-500 mt-12">
            Vstupem do salonu a využitím našich služeb vyjadřujete souhlas s tímto provozním řádem.
            <br />
            Účinnost od: {new Date().toLocaleDateString('cs-CZ')}
          </p>
        </div>
      </div>
    </main>
  )
}
