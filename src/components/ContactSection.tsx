import { Zap } from 'lucide-react'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import SectionTitle from './SectionTitle'
import ContactInfoCard from './ContactInfoCard'
import OpenBookingButton from './OpenBookingButton'
import OpenVoucherButton from './OpenVoucherButton'

export default function ContactSection() {
  return (
    <Section id="kontakt">
      <Container>
        <div className="mb-12">
          <SectionTitle
            center={false}
            eyebrow="Kontakt"
            icon={<Zap className="h-4 w-4" />}
            title={
              <>
                Kde nás <em className="italic">najdete</em>
              </>
            }
            subtitle="Náš salon se nachází v centru Hodonína na Masarykově náměstí."
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left - Contact Info */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid gap-4">
              <div className="contact-card">
                <ContactInfoCard
                  icon={
                    <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
                  label="Adresa"
                  value="Masarykovo náměstí 59, 695 01 Hodonín"
                />
              </div>
              <div className="contact-card">
                <ContactInfoCard
                  icon={
                    <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  }
                  label="Telefon"
                  value="+420 773 577 899"
                />
              </div>
              <div className="contact-card">
                <ContactInfoCard
                  icon={
                    <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  label="E-mail"
                  value="info@swbeauty.cz"
                />
              </div>
            </div>

            {/* Opening Hours */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="font-medium text-slate-900">Otevírací doba</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Pondělí - Pátek</span>
                  <span className="font-medium text-slate-900">9:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Sobota</span>
                  <span className="font-medium text-slate-900">10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Neděle</span>
                  <span className="font-medium text-slate-900">Zavřeno</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <OpenBookingButton className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
                Rezervovat termín
              </OpenBookingButton>
              <OpenVoucherButton className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50">
                Objednat poukaz
              </OpenVoucherButton>
            </div>
          </div>

          {/* Right - Map */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 self-start h-[360px] md:h-[480px] lg:h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2642.9429366838445!2d17.123456!3d48.848889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476b4e2e70000001%3A0x400f7d1c696bd50!2sMasarykovo%20n%C3%A1m%C4%9Bst%C3%AD%2059%2C%20695%2001%20Hodon%C3%ADn!5e0!3m2!1scs!2scz!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa - SW Beauty Hodonín"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
