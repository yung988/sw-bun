'use client'
import ThemeToggle from '@/components/ThemeToggle'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('/')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ['services', 'about', 'reviews', 'gallery', 'contact']
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
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 py-4'
          : 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 py-6'
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="relative h-10 w-20">
          <Image src="/logo.svg" alt="SW Beauty" fill className="object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 text-sm lg:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 transition ${
              activeSection === '/'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700'
            }`}
          >
            Domů
          </Link>
          <a
            href="#services"
            className={`rounded-full px-4 py-2 transition ${
              activeSection === '#services'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700'
            }`}
          >
            Služby
          </a>
          <a
            href="#about"
            className={`rounded-full px-4 py-2 transition ${
              activeSection === '#about'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700'
            }`}
          >
            O nás
          </a>
          <a
            href="#reviews"
            className={`rounded-full px-4 py-2 transition ${
              activeSection === '#reviews'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700'
            }`}
          >
            Recenze
          </a>
          <a
            href="#gallery"
            className={`rounded-full px-4 py-2 transition ${
              activeSection === '#gallery'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700'
            }`}
          >
            Galerie
          </a>
          <Link
            href="/cenik"
            className={`rounded-full px-4 py-2 transition ${
              activeSection === '/cenik'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700'
            }`}
          >
            Ceník
          </Link>
          <a
            href="#contact"
            className={`rounded-full px-4 py-2 transition ${
              activeSection === '#contact'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700'
            }`}
          >
            Kontakt
          </a>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 dark:text-slate-500 transition hover:text-slate-900 dark:hover:text-slate-200"
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
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-slate-900 dark:bg-slate-100 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-900 dark:bg-slate-100 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-900 dark:bg-slate-100 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <nav className="mx-auto max-w-6xl px-6 py-6 flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition py-2"
            >
              Domů
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition py-2 text-left"
            >
              Přednosti
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition py-2 text-left"
            >
              Služby
            </button>
            <Link
              href="/cenik"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition py-2"
            >
              Ceník
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition py-2 text-left"
            >
              FAQ
            </button>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
