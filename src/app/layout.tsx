import { Figtree } from 'next/font/google'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'
import SmoothScroll from '@/components/SmoothScroll'
import ThemeProvider from '@/components/ThemeProvider'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', weight: ['300', '400', '600', '700'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning className={figtree.variable}>
      <body className={figtree.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LoadingScreen />
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
