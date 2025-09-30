import type { Metadata } from 'next'
import HifuFaceliftClient from './HifuFaceliftClient'

export const metadata: Metadata = {
  title: 'HIFU 7D Facelift - Neinvazivní lifting obličeje | SW Beauty',
  description:
    'HIFU 7D facelift - neinvazivní lifting obličeje pomocí fokusovaného ultrazvuku. Okamžitý efekt, dlouhodobé výsledky bez operace. Cena od 5500 Kč.',
  keywords: [
    'HIFU 7D facelift',
    'neinvazivní lifting',
    'lifting obličeje',
    'fokusovaný ultrazvuk',
    'SW Beauty',
    'kosmetické služby',
  ],
  openGraph: {
    title: 'HIFU 7D Facelift - Neinvazivní lifting obličeje | SW Beauty',
    description:
      'HIFU 7D facelift - neinvazivní lifting obličeje pomocí fokusovaného ultrazvuku. Okamžitý efekt, dlouhodobé výsledky bez operace. Cena od 5500 Kč.',
    images: ['/images/service-hifu.jpg'],
    url: 'https://swbeauty.cz/sluzby/hifu-facelift',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HIFU 7D Facelift - Neinvazivní lifting obličeje | SW Beauty',
    description:
      'HIFU 7D facelift - neinvazivní lifting obličeje pomocí fokusovaného ultrazvuku. Okamžitý efekt, dlouhodobé výsledky bez operace. Cena od 5500 Kč.',
    images: ['/images/service-hifu.jpg'],
  },
}

export default function HifuFaceliftPage() {
  return <HifuFaceliftClient />
}
