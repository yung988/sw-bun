import BookingForm from '@/components/BookingForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rezervace termínu | SW Beauty',
  description: 'Objednejte se online na ošetření v SW Beauty. Rychlá a jednoduchá rezervace termínu.',
}

export default function RezervacePage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-light text-slate-900 mb-4">
            Rezervace <em className="italic">termínu</em>
          </h1>
          <p className="text-lg text-slate-600">Vyplňte formulář — potvrzení vám pošleme co nejdříve.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 md:p-12">
          <BookingForm />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600 mb-4">Preferujete telefonickou rezervaci?</p>
          <div className="space-y-2">
            <p className="text-lg font-medium text-slate-900">
              <a href="tel:+420773577899" className="hover:text-slate-700 transition">
                +420 773 577 899
              </a>
            </p>
            <p className="text-sm text-slate-600">Pondělí - Pátek: 9:00 - 20:00 | Sobota: 10:00 - 18:00</p>
          </div>
        </div>
      </div>
    </main>
  )
}
