import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 py-16">
      <div className="mx-auto max-w-container px-6">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-white shadow-sm">
                <Image src="/logo.svg" alt="SW Beauty" fill className="object-contain p-1.5" />
              </div>
              <span className="font-display text-lg tracking-tight">SW Beauty</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Profesionální péče o pleť v srdci České republiky.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900 dark:text-white">Rychlé odkazy</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/#highlights" className="hover:text-slate-900 dark:hover:text-white transition">
                  Přednosti
                </Link>
              </li>
              <li>
                <Link href="/#why" className="hover:text-slate-900 dark:hover:text-white transition">
                  Proč SW Beauty
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-slate-900 dark:hover:text-white transition">
                  Produkty
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-slate-900 dark:hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900 dark:text-white">Služby</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/sluzby/hifu-facelift" className="hover:text-slate-900 dark:hover:text-white transition">
                  HIFU ošetření
                </Link>
              </li>
              <li>
                <Link href="/sluzby/endos-roller" className="hover:text-slate-900 dark:hover:text-white transition">
                  Endosphere
                </Link>
              </li>
              <li>
                <Link href="/sluzby/kosmetika" className="hover:text-slate-900 dark:hover:text-white transition">
                  Péče o vlasy
                </Link>
              </li>
              <li>
                <Link href="/cenik" className="hover:text-slate-900 dark:hover:text-white transition">
                  Ceník
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900 dark:text-white">Kontakt</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="mailto:info@swbeauty.cz" className="hover:text-slate-900 dark:hover:text-white transition">
                  info@swbeauty.cz
                </a>
              </li>
              <li>
                <a href="tel:+420123456789" className="hover:text-slate-900 dark:hover:text-white transition">
                  +420 123 456 789
                </a>
              </li>
              <li className="pt-2">
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/p/SW-Beauty-61564161444740/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
                  >
                    FB
                  </a>
                  <a
                    href="https://www.instagram.com/swbeautysalons/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition"
                  >
                    IG
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 text-center text-xs text-slate-400 dark:text-slate-300">
          <p>
            Všechna práva vyhrazena. © {new Date().getFullYear()} SW Beauty ·{' '}
            <Link href="/ochrana-osobnich-udaju" className="underline-offset-4 hover:underline">
              Ochrana osobních údajů
            </Link>{' '}
            ·{' '}
            <Link href="/obchodni-podminky" className="underline-offset-4 hover:underline">
              Obchodní podmínky
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
