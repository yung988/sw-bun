import type { Metadata } from 'next'
import KavitaceClient from './KavitaceClient'

export const metadata: Metadata = {
  title: 'Kavitace - Ultrazvuková redukce tuku | SW Beauty',
  description:
    'Kavitace - neinvazivní ultrazvuková metoda pro redukci tukových zásob. Viditelné zmenšení objemu již po prvním sezení. Cena od 1500 Kč.',
  keywords: [
    'kavitace',
    'ultrazvuková kavitace',
    'redukce tuku',
    'zeštíhlení',
    'neinvazivní metoda',
    'SW Beauty',
    'kosmetické služby',
  ],
  openGraph: {
    title: 'Kavitace - Ultrazvuková redukce tuku | SW Beauty',
    description:
      'Kavitace - neinvazivní ultrazvuková metoda pro redukci tukových zásob. Viditelné zmenšení objemu již po prvním sezení. Cena od 1500 Kč.',
    images: ['/images/cavitace.png'],
    url: 'https://swbeauty.cz/sluzby/kavitace',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kavitace - Ultrazvuková redukce tuku | SW Beauty',
    description:
      'Kavitace - neinvazivní ultrazvuková metoda pro redukci tukových zásob. Viditelné zmenšení objemu již po prvním sezení. Cena od 1500 Kč.',
    images: ['/images/cavitace.png'],
  },
}

export default function KavitacePage() {
  return <KavitaceClient />
}
