import type { Metadata } from 'next'
import EMSClient from './EMSClient'

export const metadata: Metadata = {
  title: 'EMS Budování svalů - 30 minut = 5,5 hodiny v posilovně | SW Beauty',
  description:
    'EMS budování svalů pomocí elektromagnetické stimulace. 30 minut = 5,5 hodiny v posilovně. Budování svalů, spalování tuku bez námahy. Cena od 1300 Kč.',
  keywords: [
    'EMS budování svalů',
    'elektromagnetická stimulace',
    'budování svalů',
    'spalování tuku',
    'fitness',
    'SW Beauty',
    'kosmetické služby',
  ],
  openGraph: {
    title: 'EMS Budování svalů - 30 minut = 5,5 hodiny v posilovně | SW Beauty',
    description:
      'EMS budování svalů pomocí elektromagnetické stimulace. 30 minut = 5,5 hodiny v posilovně. Budování svalů, spalování tuku bez námahy. Cena od 1300 Kč.',
    images: ['/images/ems.png'],
    url: 'https://swbeauty.cz/sluzby/ems-budovani-svalu',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMS Budování svalů - 30 minut = 5,5 hodiny v posilovně | SW Beauty',
    description:
      'EMS budování svalů pomocí elektromagnetické stimulace. 30 minut = 5,5 hodiny v posilovně. Budování svalů, spalování tuku bez námahy. Cena od 1300 Kč.',
    images: ['/images/ems.png'],
  },
}

export default function EMSPage() {
  return <EMSClient />
}
