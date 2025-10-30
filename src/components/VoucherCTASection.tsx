import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Image from 'next/image'
import OpenVoucherButton from './OpenVoucherButton'

export default function VoucherCTASection() {
  return (
    <Section id="poukazy">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-12 md:p-16">
          <div className="relative z-10 grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white border-2 border-slate-200">
                <svg className="h-8 w-8 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <title>Dárek</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-light text-slate-900 mb-6">
                Dárkový poukaz <em className="italic">na míru</em>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-8">
                Darujte zážitek krásy a relaxace. Vyberte konkrétní službu nebo hodnotu poukazu — ideální dárek pro
                každou příležitost.
              </p>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-base text-slate-700">
                  <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Potvrzeno</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Platnost 12 měsíců
                </li>
                <li className="flex items-center gap-3 text-base text-slate-700">
                  <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Potvrzeno</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Elegantní provedení s osobním věnováním
                </li>
                <li className="flex items-center gap-3 text-base text-slate-700">
                  <svg className="h-6 w-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Potvrzeno</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Možnost výběru konkrétní služby nebo hodnoty
                </li>
              </ul>

              <div>
                <OpenVoucherButton className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-slate-800">
                  Objednat dárkový poukaz
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Šipka</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </OpenVoucherButton>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                <Image
                  src="/images/poukaz/Image_fx (25).jpg"
                  alt="Dárkový poukaz SW Beauty"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
