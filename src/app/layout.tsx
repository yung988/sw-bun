import type { Metadata } from 'next'
import { Figtree, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import 'lenis/dist/lenis.css'
import { BrandProvider } from '@/components/BrandProvider'
import Footer from '@/components/Footer'
import { IntroProvider } from '@/components/IntroProvider'
import LenisScroll from '@/components/LenisScroll'
import LoadingScreen from '@/components/LoadingScreen'
import MainContent from '@/components/MainContent'
import { ModalProvider } from '@/components/ModalProvider'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import { getBrandLogoServer, getFaviconServer } from '@/lib/server/images'
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

const figtree = Figtree({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-figtree',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-source-serif-4',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const logoSrc = await getBrandLogoServer()
  const favicon = await getFaviconServer()
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
    <html lang="cs" className={`scroll-smooth ${figtree.variable} ${sourceSerif4.variable}`}>
      <head>
        <script type="application/ld+json" suppressHydrationWarning>
          {jsonLdScript}
        </script>
        <link rel="icon" href={favicon} />
      </head>
      <body className={figtree.className}>
        <IntroProvider>
          <LoadingScreen />
          <LenisScroll />
          <ScrollProgress />
          <ModalProvider>
            <BrandProvider value={{ logoSrc }}>
              <Navbar />
              <MainContent>{children}</MainContent>
              <Footer />
            </BrandProvider>
          </ModalProvider>
          <Analytics />
          <SpeedInsights />
        </IntroProvider>
      </body>
    </html>
  )
}
