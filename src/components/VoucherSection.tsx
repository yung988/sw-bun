import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { Check, Gift } from 'lucide-react'
import OpenVoucherButton from './OpenVoucherButton'

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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-800 mb-6">
                Dárkový poukaz
              </h2>
              <div className="w-20 h-1 mb-8" style={{ backgroundColor: 'var(--accent)' }} />
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-light mb-8">
                Darujte svým blízkým to nejcennější – čas pro sebe a péči, která je rozzáří.
                Náš dárkový poukaz je vstupenkou do světa relaxace a krásy.
                Můžete si zvolit libovolnou hodnotu a obdarovaný si sám vybere proceduru,
                která mu udělá největší radost.
              </p>
            </div>

            {/* Advantages List */}
            <div className="space-y-4 mb-10">
              {advantages.map((advantage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--accent)', opacity: 0.2 }}
                  >
                    <Check className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">{advantage}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <OpenVoucherButton className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl text-center min-w-[200px]">
                Objednat poukaz
              </OpenVoucherButton>
              <a
                href="#kontakt"
                className="px-8 py-4 rounded-xl border-2 font-semibold transition-all duration-200 hover:bg-gray-50 text-center min-w-[200px]"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              >
                Kontaktujte nás
              </a>
            </div>
          </div>

          {/* Right Column - Visual Representation */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md aspect-[1.6/1] perspective-1000">
              {/* Card Visual */}
              <div
                className="relative w-full h-full rounded-2xl shadow-2xl p-8 flex flex-col justify-between overflow-hidden transform transition-transform hover:scale-[1.02] duration-500"
                style={{
                  background: 'linear-gradient(135deg, #fdfbf7 0%, #f4f0ec 100%)',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-rose-100/50 to-transparent rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-100/50 to-transparent rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                        <Gift className="w-6 h-6 text-slate-700" />
                      </div>
                      <span className="text-sm font-medium tracking-widest uppercase text-slate-500">Voucher</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Hodnota</p>
                      <p className="text-2xl font-serif text-slate-900">Volitelná</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-3xl font-serif text-slate-900 mb-2">Dárkový poukaz</h3>
                    <p className="text-slate-500 font-light">SW Beauty Salon</p>
                  </div>
                </div>
              </div>

              {/* Background Elements for Depth */}
              <div
                className="absolute -inset-4 bg-slate-900/5 rounded-[2rem] -z-10 blur-xl transform translate-y-4"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
