import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SW Beauty Hodonín | HIFU, Endospheres, Kosmetika | Luxusní péče',
  description: 'Luxusní kosmetický salon v Hodoníně. HIFU 7D lifting, Endospheres terapie, Hydrafacial, prodlužování vlasů. Online rezervace termínů. U Cihelny 1326/4.',
  keywords: 'kosmetika Hodonín, HIFU lifting, Endospheres, Hydrafacial, prodlužování vlasů, kosmetický salon, laminace obočí, lifting řas',
  openGraph: {
    type: 'website',
    url: 'https://swbeauty.cz',
    title: 'SW Beauty Hodonín | HIFU, Endospheres, Kosmetika',
    description: 'Luxusní kosmetický salon v Hodoníně. HIFU 7D lifting, Endospheres terapie, profesionální kosmetika. Rezervujte termín online.',
    images: ['https://swbeauty.cz/images/hero-image.jpg'],
    locale: 'cs_CZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SW Beauty Hodonín | HIFU, Endospheres, Kosmetika',
    description: 'Luxusní kosmetický salon v Hodoníně. HIFU 7D lifting, Endospheres terapie, profesionální kosmetika.',
    images: ['https://swbeauty.cz/images/hero-image.jpg'],
  },
  icons: {
    icon: '/favicon.png',
  },
  other: {
    'disabled-font-classes': 'font-instrument-serif,font-roboto,font-montserrat,font-poppins,font-merriweather,font-bricolage,font-jakarta,font-manrope,font-space-grotesk,font-work-sans,font-pt-serif,font-geist-mono,font-space-mono,font-nunito,font-quicksand',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Geist:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-stone-200 selection:text-stone-900 text-stone-800 relative">
        {children}
      </body>
    </html>
  );
}