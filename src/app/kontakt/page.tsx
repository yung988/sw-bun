import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt - SW Beauty | Kosmetický salon Hodonín',
  description:
    'Kontaktujte nás. SW Beauty kosmetický salon v Hodoníně. Adresa: U Cihelny 1326/2, 695 01 Hodonín. Otevírací doba: Po-Pá 9:00-20:00, So 10:00-18:00.',
  keywords: ['kontakt', 'SW Beauty', 'kosmetický salon', 'Hodonín', 'adresa', 'otevírací doba'],
  openGraph: {
    title: 'Kontakt - SW Beauty | Kosmetický salon Hodonín',
    description: 'Kontaktujte nás. SW Beauty kosmetický salon v Hodoníně. Adresa a otevírací doba.',
    images: ['/images/hero-image.jpg'],
    url: 'https://swbeauty.cz/kontakt',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt - SW Beauty | Kosmetický salon Hodonín',
    description: 'Kontaktujte nás. SW Beauty kosmetický salon v Hodoníně. Adresa a otevírací doba.',
    images: ['/images/hero-image.jpg'],
  },
}

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-white   py-20">
        <div className="site-container">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900  mb-6">
              Kontaktujte <em className="italic">nás</em>
            </h1>
            <p className="text-lg text-slate-600  max-w-2xl mx-auto">
              Máte otázky nebo chcete domluvit konzultaci? Neváhejte nás kontaktovat. Rádi vám pomůžeme najít to pravé
              ošetření pro vás.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section className="site-container py-[90px]">
        <div className="mb-12 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200  bg-white">
            <svg
              className="h-5 w-5 text-slate-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <title>Ikona lokace</title>
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
            <h2 className="font-display text-3xl md:text-4xl font-light text-slate-900">
              Navštivte nás <em className="italic">v salonu</em>
            </h2>
          </div>
        </div>
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200  bg-white  p-8 shadow-sm">
              <ContactForm />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-slate-900  mb-2">Adresa</h3>
                <p className="text-slate-600">
                  SW Beauty s.r.o.
                  <br />U Cihelny 1326/2
                  <br />
                  695 01 Hodonín
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-900  mb-2">Otevírací doba</h3>
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Pondělí - Pátek:</span>
                    <span className="font-medium">9:00 - 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sobota:</span>
                    <span className="font-medium">10:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Neděle:</span>
                    <span className="font-medium">Zavřeno</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-slate-900  mb-2">Kontakt</h3>
                <div className="space-y-1 text-slate-600">
                  <p className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <title>E-mail</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a href="mailto:info@swbeauty.cz" className="hover:text-slate-900  transition">
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
                      <title>Telefon</title>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a href="tel:+420773577899" className="hover:text-slate-900  transition">
                      +420 773 577 899
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              title="Mapa umístění SW Beauty"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.8!2d17.1260024!3d48.8529391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUxJzEwLjYiTiAxN8KwMDcnMzMuNiJF!5e0!3m2!1scs!2scz!4v1234567890"
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
    </main>
  )
}
