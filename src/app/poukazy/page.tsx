import VoucherForm from '@/components/VoucherForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dárkové poukazy - SW Beauty | Darujte relaxaci a krásu',
  description:
    'Dárkové poukazy na kosmetická ošetření SW Beauty. Ideální dárek pro vaše blízké. Platnost 12 měsíců, možnost osobního věnování.',
  keywords: ['dárkové poukazy', 'SW Beauty', 'dárek', 'kosmetické ošetření', 'poukazy'],
  openGraph: {
    title: 'Dárkové poukazy - SW Beauty | Darujte relaxaci a krásu',
    description: 'Dárkové poukazy na kosmetická ošetření SW Beauty. Ideální dárek pro vaše blízké.',
    images: ['/images/poukaz.png'],
    url: 'https://swbeauty.cz/poukazy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dárkové poukazy - SW Beauty | Darujte relaxaci a krásu',
    description: 'Dárkové poukazy na kosmetická ošetření SW Beauty. Ideální dárek pro vaše blízké.',
    images: ['/images/poukaz.png'],
  },
}

export default function PoukazyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="site-container">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-6">
              Dárkové <em className="italic">poukazy</em>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Darujte svým blízkým relaxaci a krásu. Dárkový poukaz je perfektní dárek, který potěší každého milovníka
              péče o sebe.
            </p>
          </div>
        </div>
      </section>

      {/* Voucher Section */}
      <section className="site-container py-[90px]">
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800">
            <svg
              className="h-5 w-5 text-slate-900 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <title>Dárkový poukaz</title>
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
                  <title>Potvrzeno</title>
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
                  <title>Potvrzeno</title>
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
                  <title>Potvrzeno</title>
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
    </main>
  )
}
