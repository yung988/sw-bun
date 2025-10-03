'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('/')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Only check sections if we're on the home page
      if (pathname === '/') {
        const sections = ['products']
        const scrollPosition = window.scrollY + 150

        if (scrollPosition < 400) {
          setActiveSection('/')
          return
        }

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(`#${sectionId}`)
              return
            }
          }
        }
      } else {
        // Set active section based on current page
        setActiveSection(pathname)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 mt-5 bg-white/90 dark:bg-graphite/80 backdrop-blur-md backdrop-saturate-150 border-b border-white/30 dark:border-slate-700/40 py-4">
      <div className="mx-auto flex max-w-container items-center justify-between px-3">
        <Link href="/" className="relative h-14 w-28 transition-transform hover:scale-105">
          <Image src="/logo.svg" alt="SW Beauty" fill className="object-contain" priority />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 text-[13px] font-medium lg:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 transition-all duration-300 ${
              activeSection === '/'
                ? 'bg-black text-white shadow-sm ring-1 ring-black/10 dark:bg-white dark:text-graphite'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Domů
          </Link>
          <a
            href="#products"
            className={`rounded-full px-4 py-2 transition-all duration-300 ${
              activeSection === '#products'
                ? 'bg-black text-white shadow-sm ring-1 ring-black/10 dark:bg-white dark:text-graphite'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Služby
          </a>
          <Link
            href="/cenik"
            className={`rounded-full px-4 py-2 transition-all duration-300 ${
              activeSection === '/cenik'
                ? 'bg-black text-white shadow-sm ring-1 ring-black/10 dark:bg-white dark:text-graphite'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Ceník
          </Link>
          <Link
            href="/o-salonu"
            className={`rounded-full px-4 py-2 transition-all duration-300 ${
              activeSection === '/o-salonu'
                ? 'bg-black text-white shadow-sm ring-1 ring-black/10 dark:bg-white dark:text-graphite'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            O salonu
          </Link>
          <Link
            href="/kontakt"
            className={`rounded-full px-4 py-2 transition-all duration-300 ${
              activeSection === '/kontakt'
                ? 'bg-black text-white shadow-sm ring-1 ring-black/10 dark:bg-white dark:text-graphite'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Kontakt
          </Link>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://www.instagram.com/swbeautysalons/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-300/80 bg-white/70 backdrop-blur px-2.5 py-2 text-slate-700 transition-all duration-300 hover:bg-white hover:shadow-sm dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-300"
            aria-label="Sledujte nás na Instagramu"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <title>Instagram</title>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="sr-only">Instagram</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-slate-900 dark:bg-slate-100 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-900 dark:bg-slate-100 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-900 dark:bg-slate-100 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 lg:hidden z-40 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white/80 dark:bg-graphite/80 backdrop-blur-2xl border-l border-slate-200/50 dark:border-slate-800/50 shadow-2xl lg:hidden z-50 transition-transform duration-500 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col h-full px-8 py-8">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Zavřít menu"
            >
              <svg
                className="w-6 h-6 text-slate-900 dark:text-slate-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-2 flex-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium py-4 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Domů
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium py-4 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
            >
              Služby
            </button>
            <Link
              href="/cenik"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium py-4 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Ceník
            </Link>
            <Link
              href="/o-salonu"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium py-4 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              O salonu
            </Link>
            <Link
              href="/kontakt"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors font-medium py-4 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Kontakt
            </Link>
          </div>

          {/* Social Link at Bottom */}
          <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
            <a
              href="https://www.instagram.com/swbeautysalons/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 transition-colors hover:text-slate-900 dark:hover:text-white flex items-center gap-3 py-4 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Sledujte nás na Instagramu"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <title>Instagram</title>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="font-medium">Instagram</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
