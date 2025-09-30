import type { Metadata } from 'next'
import KosmetikaClient from './KosmetikaClient'

export const metadata: Metadata = {
  title: 'Profesionální kosmetika - Hydrafacial, Dermapen | SW Beauty',
  description:
    'Profesionální kosmetická ošetření pro všechny typy pleti. Hydrafacial, Dermapen, laminace řas a obočí. Individuální péče podle vašich potřeb. Cena od 800 Kč.',
  keywords: [
    'kosmetika',
    'hydrafacial',
    'dermapen',
    'laminace řas',
    'kosmetické ošetření',
    'SW Beauty',
    'kosmetické služby',
  ],
  openGraph: {
    title: 'Profesionální kosmetika - Hydrafacial, Dermapen | SW Beauty',
    description:
      'Profesionální kosmetická ošetření pro všechny typy pleti. Hydrafacial, Dermapen, laminace řas a obočí. Individuální péče podle vašich potřeb. Cena od 800 Kč.',
    images: ['/images/cosmetic.png'],
    url: 'https://swbeauty.cz/sluzby/kosmetika',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Profesionální kosmetika - Hydrafacial, Dermapen | SW Beauty',
    description:
      'Profesionální kosmetická ošetření pro všechny typy pleti. Hydrafacial, Dermapen, laminace řas a obočí. Individuální péče podle vašich potřeb. Cena od 800 Kč.',
    images: ['/images/cosmetic.png'],
  },
}

export default function KosmetikaPage() {
  return <KosmetikaClient />
}
