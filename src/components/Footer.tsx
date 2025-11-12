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

  const categories = [
    { name: 'HIFU Facelift', slug: 'hifu' },
    { name: 'Endosphere', slug: 'endosphere' },
    { name: 'EMS Budování', slug: 'budovani-svalu' },
    { name: 'Kavitace', slug: 'kavitace' },
    { name: 'LPG', slug: 'lpg' },
    { name: 'Kosmetika', slug: 'kosmetika' },
    { name: 'Hydrafacial', slug: 'hydrafacial' },
    { name: 'Péče o vlasy', slug: 'vlasy' },
  ]

  return (
    <footer className={`${visibilityClass} bg-white`}>
      <div className="mx-auto max-w-[1250px] px-6 md:px-8 lg:px-10 py-20">
        {/* Brand Description + Social */}
        <div className="mb-16">
          <p className="text-base leading-relaxed text-slate-700 mb-8 max-w-2xl">
            SW Beauty je váš partner v péči o pleť a tělo. Věříme v kombinaci moderních technologií se zkušenostmi specialistů. Naše služby vám přinášejí viditelné výsledky s maximálním pohodlím a profesionalitou. Každé ošetření je přizpůsobeno vašim individuálním potřebám.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/p/SW-Beauty-61564161444740/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 transition-colors"
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
              className="text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <title>Instagram</title>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Four Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1 - About */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-slate-900 uppercase tracking-widest">O nás</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#o-nas" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  O salonu
                </a>
              </li>
              <li>
                <a href="/#kontakt" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Kontakt
                </a>
              </li>
              <li>
                <Link href="/sluzby" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Všechny služby
                </Link>
              </li>
              <li>
                <p className="text-sm text-slate-600">U Cihelny 1326/2</p>
                <p className="text-sm text-slate-600">695 01 Hodonín</p>
              </li>
              <li>
                <a href="tel:+420773577899" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  +420 773 577 899
                </a>
              </li>
              <li>
                <a href="mailto:info@swbeauty.cz" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  info@swbeauty.cz
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 - Services 1 */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-slate-900 uppercase tracking-widest">Služby</h3>
            <ul className="space-y-3">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/sluzby/${cat.slug}`}
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services 2 */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-slate-900 uppercase tracking-widest">Další služby</h3>
            <ul className="space-y-3">
              {categories.slice(4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/sluzby/${cat.slug}`}
                    className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="mb-6 text-sm font-semibold text-slate-900 uppercase tracking-widest">Zůstanete v kontaktu</h3>
            <p className="text-sm text-slate-600 mb-6">
              Přihlaste se k odběru novinek a získejte tipy na péči a speciální nabídky.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
              className="space-y-3"
            >
              <input
                type="email"
                placeholder="Váš e-mail"
                className="w-full border-b border-slate-300 bg-transparent px-0 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors"
              />
              <button
                type="submit"
                className="text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors underline"
              >
                Odebírat
              </button>
            </form>
          </div>
        </div>

        {/* Large Logo Section */}
        <div className="py-20 border-t border-b border-slate-200 text-center mb-12">
          <div className="relative h-80 w-full max-w-2xl mx-auto mb-8">
            <Image src={logoSrc} alt="SW Beauty" fill className="object-contain" />
          </div>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Věříme v chytrou a šetrnou péči o pleť i tělo. Kombinujeme moderní technologie se zkušenostmi našich specialistů.
          </p>
        </div>

        {/* Bottom - Links & Copyright */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} SW Beauty s.r.o. Všechna práva vyhrazena.</p>
          <div className="flex gap-6">
            <Link href="/ochrana-osobnich-udaju" className="hover:text-slate-900 transition-colors">
              Ochrana osobních údajů
            </Link>
            <Link href="/obchodni-podminky" className="hover:text-slate-900 transition-colors">
              Obchodní podmínky
            </Link>
            <button type="button" onClick={() => openBooking()} className="hover:text-slate-900 transition-colors">
              Rezervace
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
