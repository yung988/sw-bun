import { Instrument_Serif, Inter, Inter_Tight } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import SmoothScroll from '@/components/SmoothScroll'
import ThemeProvider from '@/components/ThemeProvider'

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
  return (
    <html lang="cs" suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LoadingScreen />
          <SmoothScroll />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
