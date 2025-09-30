import type { Metadata } from 'next'
import CenikClient from './CenikClient'

export const metadata: Metadata = {
  title: 'Ceník služeb - SW Beauty | HIFU, Endos-roller, EMS, Kosmetika',
  description:
    'Aktuální ceník kosmetických služeb SW Beauty. HIFU facelift od 5500 Kč, Endos-roller od 1900 Kč, EMS budování svalů od 1300 Kč. Profesionální péče za férové ceny.',
  keywords: [
    'ceník služeb',
    'SW Beauty',
    'HIFU facelift',
    'Endos-roller',
    'EMS budování svalů',
    'kosmetika',
    'kosmetické služby',
  ],
  openGraph: {
    title: 'Ceník služeb - SW Beauty | HIFU, Endos-roller, EMS, Kosmetika',
    description:
      'Aktuální ceník kosmetických služeb SW Beauty. HIFU facelift od 5500 Kč, Endos-roller od 1900 Kč, EMS budování svalů od 1300 Kč. Profesionální péče za férové ceny.',
    images: ['/images/hero-image.jpg'],
    url: 'https://swbeauty.cz/cenik',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ceník služeb - SW Beauty | HIFU, Endos-roller, EMS, Kosmetika',
    description:
      'Aktuální ceník kosmetických služeb SW Beauty. HIFU facelift od 5500 Kč, Endos-roller od 1900 Kč, EMS budování svalů od 1300 Kč. Profesionální péče za férové ceny.',
    images: ['/images/hero-image.jpg'],
  },
}

export default function CenikPage() {
  return <CenikClient />
}
