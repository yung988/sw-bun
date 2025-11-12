'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useBrand } from './BrandProvider'
import { useModals } from './ModalProvider'

export default function Footer() {
  const { openBooking } = useModals()
  const { logoSrc } = useBrand()
  const pathname = usePathname()

  // Na stránkách Služby chceme na desktopu zamezit globálnímu scrollu,
  // proto footer na ≥ lg nezobrazujeme (na mobilu zůstává viditelný).
  const isServicesRoute = pathname?.startsWith('/sluzby')
  const visibilityClass = isServicesRoute ? 'lg:hidden' : ''

  return (
    <footer className={`${visibilityClass} border-t border-slate-200/50 bg-white py-24`}>
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Large Logo at top */}
        <div className="mb-16 flex justify-center">
          <div className="relative h-24 w-full max-w-md">
            <Image src={logoSrc} alt="SW Beauty" fill className="object-contain" />
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mb-20 mx-auto max-w-xl text-center">
          <h3 className="mb-4 text-2xl font-light tracking-wide text-slate-900">Připojte se k naší komunitě</h3>
          <p className="mb-8 text-base text-slate-600">
            Přihlaste se k odběru novinek a získejte tipy na péči, akce a speciální nabídky.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            onSubmit={(e) => {
              e.preventDefault()
              // newsletter je pouze vizuální – žádné odesílání
            }}
          >
            <input
              type="email"
              placeholder="Váš e-mail"
              className="w-full sm:w-80 border border-slate-300 bg-white px-5 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white text-base font-medium hover:bg-slate-800 transition-colors"
            >
              Odebírat
            </button>
          </form>
        </div>

        {/* Content Grid - Intro text, Categories, About */}
        <div className="grid gap-12 md:grid-cols-3 mb-20">
          {/* Intro Text */}
          <div>
            <h3 className="mb-6 text-lg font-medium text-slate-900">O značce</h3>
            <p className="text-base leading-relaxed text-slate-600">
              V SW Beauty věříme v chytrou a šetrnou péči o pleť i tělo. Kombinujeme moderní technologie se
              zkušenostmi našich specialistů, abychom přinášeli viditelné výsledky.
            </p>
          </div>

          {/* Kategorie */}
          <div>
            <h3 className="mb-6 text-lg font-medium text-slate-900">Kategorie</h3>
            <ul className="space-y-3 text-base text-slate-600">
              <li>
                <Link href="/sluzby/hifu" className="hover:text-slate-900 transition-colors duration-200">
                  HIFU Facelift
                </Link>
              </li>
              <li>
                <Link href="/sluzby/endosphere" className="hover:text-slate-900 transition-colors duration-200">
                  Endosphere
                </Link>
              </li>
              <li>
                <Link href="/sluzby/kosmetika" className="hover:text-slate-900 transition-colors duration-200">
                  Kosmetika
                </Link>
              </li>
              <li>
                <Link href="/sluzby/budovani-svalu" className="hover:text-slate-900 transition-colors duration-200">
                  Budování svalů EMS
                </Link>
              </li>
            </ul>
          </div>

          {/* O nás */}
          <div>
            <h3 className="mb-6 text-lg font-medium text-slate-900">O nás</h3>
            <ul className="space-y-3 text-base text-slate-600">
              <li>
                <Link href="/sluzby" className="hover:text-slate-900 transition-colors duration-200">
                  Služby & Ceny
                </Link>
              </li>
              <li>
                <a href="/#o-nas" className="hover:text-slate-900 transition-colors duration-200">
                  O salonu
                </a>
              </li>
              <li>
                <Link href="/#kontakt" className="hover:text-slate-900 transition-colors duration-200">
                  Kontakt
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="hover:text-slate-900 transition-colors duration-200"
                >
                  Rezervace
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mb-12 flex justify-center items-center gap-5">
          <a
            href="https://www.facebook.com/p/SW-Beauty-61564161444740/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-all duration-200 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50"
            aria-label="Facebook"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <title>Facebook</title>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/swbeautysalons/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-all duration-200 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50"
            aria-label="Instagram"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <title>Instagram</title>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200/50 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-slate-600">
          <p>© {new Date().getFullYear()} SW Beauty s.r.o. Všechna práva vyhrazena.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/ochrana-osobnich-udaju" className="hover:text-slate-900 transition-colors duration-200">
              Ochrana osobních údajů
            </Link>
            <Link href="/obchodni-podminky" className="hover:text-slate-900 transition-colors duration-200">
              Obchodní podmínky
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
