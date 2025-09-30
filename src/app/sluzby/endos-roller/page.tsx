import type { Metadata } from 'next'
import EndosRollerClient from './EndosRollerClient'

export const metadata: Metadata = {
  title: 'Endos-roller - Lymfatická masáž a konturování těla | SW Beauty',
  description:
    'Endos-roller - revoluční technologie pro lymfatickou masáž, detoxikaci a konturování postavy. Redukce celulitidy, zeštíhlení a zpevnění pokožky. Cena od 1900 Kč.',
  keywords: [
    'Endos-roller',
    'lymfatická masáž',
    'konturování těla',
    'redukce celulitidy',
    'detoxikace',
    'SW Beauty',
    'kosmetické služby',
  ],
  openGraph: {
    title: 'Endos-roller - Lymfatická masáž a konturování těla | SW Beauty',
    description:
      'Endos-roller - revoluční technologie pro lymfatickou masáž, detoxikaci a konturování postavy. Redukce celulitidy, zeštíhlení a zpevnění pokožky. Cena od 1900 Kč.',
    images: ['/images/service-endosphere.jpg'],
    url: 'https://swbeauty.cz/sluzby/endos-roller',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Endos-roller - Lymfatická masáž a konturování těla | SW Beauty',
    description:
      'Endos-roller - revoluční technologie pro lymfatickou masáž, detoxikaci a konturování postavy. Redukce celulitidy, zeštíhlení a zpevnění pokožky. Cena od 1900 Kč.',
    images: ['/images/service-endosphere.jpg'],
  },
}

export default function EndosRollerPage() {
  return <EndosRollerClient />
}
