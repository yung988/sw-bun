import type { Metadata } from 'next'
import BookingForm from '@/components/BookingForm'

export const metadata: Metadata = {
  title: 'Rezervace termínu | SW Beauty',
  description: 'Objednejte se online na ošetření v SW Beauty. Rychlá a jednoduchá rezervace termínu.',
}

export default function RezervacePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Rezervace termínu</h1>
          <p className="text-xl text-gray-600">Vyplňte formulář a my se vám ozveme s potvrzením termínu</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <BookingForm />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 mb-4">Preferujete telefonickou rezervaci?</p>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-900">
              <a href="tel:+420777123456" className="hover:text-gray-700">
                +420 777 123 456
              </a>
            </p>
            <p className="text-sm text-gray-600">Pondělí - Pátek: 9:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}
