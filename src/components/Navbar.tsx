'use client'

import gsap from 'gsap'
import { Menu, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useBrand } from './BrandProvider'
import OpenBookingButton from './OpenBookingButton'

export default function Navbar() {
  const { logoSrc } = useBrand()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  const links = [
    { href: '/', label: 'Domů' },
    { href: '/sluzby', label: 'Služby' },
    { href: '/cenik', label: 'Ceník' },
    { href: '/kontakt', label: 'Kontakt' },
  ]

  // Scroll efekt (mění intenzitu skla)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Zavře menu po změně cesty
  useEffect(() => setMenuOpen(false), [])

  // Intro animace navbaru
  useLayoutEffect(() => {
    gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
  }, [])

  // Mobilní menu (slide z pravé strany)
  useLayoutEffect(() => {
    const menu = menuRef.current
    const backdrop = backdropRef.current

    if (menuOpen) {
      gsap.set([menu, backdrop], { display: 'block' })
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 })
      gsap.fromTo(menu, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' })
    } else {
      gsap.to(menu, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(menu, { display: 'none' })
        },
      })
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(backdrop, { display: 'none' })
        },
      })
    }
  }, [menuOpen])

  return (
    <>
      {/* NAVBAR */}
      <nav ref={navRef} className="fixed top-0 left-0 w-full z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3">
          <div
            className={`
              relative overflow-hidden rounded-full border border-black/10
              backdrop-blur-3xl backdrop-saturate-150
              transition-all duration-500
              shadow-[0_8px_32px_rgba(0,0,0,0.08)]
            `}
            style={{
              background: scrolled
                ? 'linear-gradient(to bottom right, rgba(255,255,255,0.55), rgba(255,255,255,0.25))'
                : 'linear-gradient(to bottom right, rgba(255,255,255,0.4), rgba(255,255,255,0.2))',
              boxShadow: scrolled
                ? '0 12px 40px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(0,0,0,0.05)'
                : '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(0,0,0,0.05)',
            }}
          >
            {/* vrchní glass vrstvy */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />

            <div className="relative flex items-center px-4 sm:px-6 py-2 text-black">
              {/* LOGO */}
              <Link href="/" className="flex items-center z-10">
                <Image
                  src={logoSrc}
                  alt="SW Beauty"
                  width={70}
                  height={70}
                  className="transition-transform duration-500 hover:scale-105 active:scale-95"
                  priority
                />
              </Link>

              <div className="flex-1" />

              {/* DESKTOP LINKS */}
              <div className="hidden lg:flex items-center gap-1 mr-4">
                {links.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link key={link.href} href={link.href}>
                      <div
                        className={`relative px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-300 ${
                          isActive ? 'bg-black/5 text-black' : 'text-black/70 hover:text-black hover:bg-black/5'
                        }`}
                      >
                        {link.label}
                      </div>
                    </Link>
                  )
                })}
              </div>

              {/* CTA */}
              <div className="hidden lg:flex items-center gap-2">
                <OpenBookingButton className="px-4 py-1.5 rounded-full text-[14px] font-medium border border-black/20 text-black hover:border-black/40 hover:bg-black/5 transition-all">
                  Rezervace
                </OpenBookingButton>
                <a href="tel:+420773577899">
                  <button
                    type="button"
                    className="p-2 rounded-full border border-black/20 text-black hover:bg-black/5 transition-all"
                  >
                    <Phone size={18} />
                  </button>
                </a>
              </div>

              {/* MOBILE BUTTON */}
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-full text-black hover:bg-black/5 transition-all"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* BACKDROP */}
      <div
        ref={backdropRef}
        className="fixed inset-0 z-40 hidden bg-black/10 backdrop-blur-sm"
        onClick={() => setMenuOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setMenuOpen(false)
        }}
      />

      {/* MOBILE MENU (glass slide-in z pravé strany) */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 z-50 hidden h-full w-[80%] max-w-[360px]
        backdrop-blur-3xl bg-white/40 border-l border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        flex flex-col p-6 text-black"
        style={{
          background: 'linear-gradient(to bottom right, rgba(255,255,255,0.5), rgba(255,255,255,0.25))',
          boxShadow:
            'inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -1px 1px rgba(0,0,0,0.05), 0 12px 40px rgba(0,0,0,0.2)',
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <Image src={logoSrc} alt="SW Beauty" width={60} height={60} />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full hover:bg-black/5 transition"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <div
                  className={`block px-4 py-2.5 rounded-xl text-[15px] font-medium transition-all ${
                    isActive ? 'bg-black/5 text-black' : 'text-black/70 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-black/10 space-y-2">
          <OpenBookingButton className="w-full px-4 py-2.5 rounded-xl text-[14px] font-medium border border-black/20 text-black hover:bg-black/5 transition-all">
            Rezervovat termín
          </OpenBookingButton>
          <a href="tel:+420773577899">
            <button
              type="button"
              className="w-full flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium bg-black/10 text-black hover:bg-black/15 transition-all"
            >
              <Phone size={16} />
              Zavolat
            </button>
          </a>
        </div>
      </div>
    </>
  )
}
