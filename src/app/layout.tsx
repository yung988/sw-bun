import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ModalProvider } from '@/components/ModalProvider'
import LoadingScreen from '@/components/LoadingScreen'
import SmoothScroll from '@/components/SmoothScroll'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://swbeauty.cz'),
  title: 'SW Beauty | Profesionální kosmetické služby v Hodoníně',
  description:
    'Objevte profesionální kosmetické služby v Hodoníně. HIFU, Endosphere, kosmetika a mnoho dalších ošetření s okamžitými výsledky.',
  keywords: ['kosmetika', 'HIFU', 'Endosphere', 'Hodonín', 'kosmetický salon', 'ošetření'],
  authors: [{ name: 'SW Beauty' }],
  openGraph: {
    title: 'SW Beauty | Profesionální kosmetické služby',
    description: 'Profesionální kosmetické služby v Hodoníně s okamžitými výsledky',
    url: 'https://swbeauty.cz',
    siteName: 'SW Beauty',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SW Beauty salon',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SW Beauty | Profesionální kosmetické služby',
    description: 'Profesionální kosmetické služby v Hodoníně',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'SW Beauty',
    description: 'Profesionální kosmetické služby v Hodoníně',
    url: 'https://swbeauty.cz',
    telephone: '+420773577899',
    email: 'info@swbeauty.cz',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'U Cihelny 1326/2',
      addressLocality: 'Hodonín',
      postalCode: '695 01',
      addressCountry: 'CZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8488,
      longitude: 17.1322,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '18:00',
      },
    ],
    priceRange: '500Kč - 5000Kč',
    image: 'https://swbeauty.cz/images/og-image.jpg',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
  }

  // Safe JSON-LD injection without dangerouslySetInnerHTML
  const jsonLdScript = JSON.stringify(jsonLd)

  return (
    <html lang="cs" className={`scroll-smooth ${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
        >
          {jsonLdScript}
        </script>
      </head>
      <body className={inter.className}>
        <LoadingScreen />
        <SmoothScroll />
        <ModalProvider>
          <Navbar />
          {children}
          <Footer />
        </ModalProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
