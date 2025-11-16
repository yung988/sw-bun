import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { Gift, Heart, Star, Check } from 'lucide-react'
import OpenVoucherButton from './OpenVoucherButton'
import { cn } from '@/lib/utils'

const voucherProducts = [
  {
    icon: Gift,
    name: 'Dárkový poukaz na libovolnou službu',
    price: 'od 1000 Kč',
    description: 'Perfektní dárek pro vaše blízké. Poukaz lze využít na jakoukoliv službu v našem salonu.',
    popular: false,
  },
  {
    icon: Heart,
    name: 'Relax balíček',
    price: '2500 Kč',
    description: 'Kompletní kosmetické ošetření s relaxační masáží. Ideální pro odpočinek a regeneraci.',
    popular: true,
  },
  {
    icon: Star,
    name: 'Premium péče',
    price: '4000 Kč',
    description: 'Luxusní balíček zahrnující nejnovější technologie péče o pleť a tělo.',
    popular: false,
  },
]

const advantages = [
  'Platnost 12 měsíců od zakoupení',
  'Možnost využití na jakoukoliv službu',
  'Elegantní fyzická podoba poukazu',
  'Možnost osobního vyzvednutí nebo zaslání poštou',
  'Individuální hodnota dle vašeho přání',
]

export default function VoucherSection() {
  return (
    <Section id="poukazy" className="relative bg-gradient-to-b from-gray-50 to-white luxury-spacing">
      <Container>
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-800 mb-4">
            Dárkové poukazy
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: 'var(--accent)' }} />
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Darujte zážitek krásy a relaxace. Vyberte si z našich připravených balíčků nebo zvolte vlastní hodnotu.
          </p>
        </div>

        {/* Voucher Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {voucherProducts.map((product, index) => {
            const Icon = product.icon
            return (
              <div
                key={index}
                className={cn(
                  'relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300',
                  product.popular && 'ring-2 md:scale-105'
                )}
                style={product.popular ? { borderColor: 'var(--accent)' } : {}}
              >
                {/* Popular Badge */}
                {product.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold text-white whitespace-nowrap"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    NEJOBLÍBENĚJŠÍ
                  </span>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full"
                    style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}
                  >
                    <Icon className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-serif text-gray-800 mb-3">
                  {product.name}
                </h3>
                <p className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
                  {product.price}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mb-4">Platnost: 12 měsíců</p>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed min-h-[4rem]">
                  {product.description}
                </p>

                {/* CTA Button */}
                <div
                  className={cn(product.popular && 'voucher-button-popular')}
                  style={
                    product.popular
                      ? { '--accent-color': 'var(--accent)' } as React.CSSProperties
                      : undefined
                  }
                >
                  <OpenVoucherButton
                    className={cn(
                      'w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base',
                      product.popular
                        ? 'text-white shadow-md hover:shadow-lg bg-[var(--accent)]'
                        : 'bg-white border-2 text-gray-800 hover:bg-gray-50 border-[var(--accent)]'
                    )}
                  >
                    Objednat poukaz
                  </OpenVoucherButton>
                </div>
              </div>
            )
          })}
        </div>

        {/* Advantages Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-md">
          <h3 className="text-2xl sm:text-3xl font-serif text-gray-800 mb-8 text-center">
            Výhody našich dárkových poukazů
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 shrink-0 mt-1" style={{ color: 'var(--accent)' }} />
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{advantage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-base sm:text-lg text-gray-600 mb-4">
            Máte dotazy k dárkovým poukazům?
          </p>
          <a
            href="#kontakt"
            className="inline-block py-3 px-8 rounded-xl border-2 font-semibold transition-all duration-200 hover:bg-gray-50 text-sm sm:text-base"
            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
          >
            Kontaktujte nás
          </a>
        </div>
      </Container>
    </Section>
  )
}
