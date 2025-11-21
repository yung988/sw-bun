import Breadcrumbs from '@/components/Breadcrumbs'
import ContactForm from '@/components/ContactForm'
import OpenBookingButton from '@/components/OpenBookingButton'
import OpenVoucherButton from '@/components/OpenVoucherButton'
import PageLayout from '@/components/PageLayout'
import SectionTitle from '@/components/SectionTitle'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt | SW Beauty Hodonín',
  description:
    'Kontaktujte nás - SW Beauty kosmetický salon v Hodoníně. Rezervujte si termín online nebo nás navštivte na adrese U Cihelny 1326/2, 695 01 Hodonín.',
  keywords: ['kontakt', 'SW Beauty', 'Hodonín', 'kosmetický salon', 'rezervace'],
  alternates: {
    canonical: 'https://swbeauty.cz/kontakt',
  },
  openGraph: {
    title: 'Kontakt | SW Beauty Hodonín',
    description: 'Kontaktujte nás - SW Beauty kosmetický salon v Hodoníně.',
    url: 'https://swbeauty.cz/kontakt',
    type: 'website',
  },
}

export default function ContactPage() {
  return (
    <PageLayout maxWidth="wide">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Domů', href: '/' },
          { label: 'Kontakt' },
        ]}
      />

      {/* Header */}
      <div className="mb-16">
        <SectionTitle
          eyebrow="Kontakt"
          title={
            <>
              Kde nás <em className="italic">najdete</em>
            </>
          }
          subtitle="Náš salon se nachází v centru Hodonína. Rezervujte si termín online nebo nás kontaktujte."
        />
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Left Column - Contact Info */}
        <div className="space-y-12">
          {/* Address */}
          <div className="group">
            <div className="flex items-start gap-4 mb-1">
              <MapPin className="w-5 h-5 text-slate-400 mt-1 group-hover:text-slate-600 transition-colors" />
              <div>
                <h3 className="text-sm text-slate-500 mb-2 font-medium">Adresa</h3>
                <p className="text-xl text-slate-900">U Cihelny 1326/4, 695 01 Hodonín</p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="group">
            <div className="flex items-start gap-4 mb-1">
              <Phone className="w-5 h-5 text-slate-400 mt-1 group-hover:text-slate-600 transition-colors" />
              <div>
                <h3 className="text-sm text-slate-500 mb-2 font-medium">Telefon</h3>
                <a href="tel:+420776632498" className="text-xl text-slate-900 hover:text-slate-700 transition-colors">
                  +420 776 632 498
                </a>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="group">
            <div className="flex items-start gap-4 mb-1">
              <Mail className="w-5 h-5 text-slate-400 mt-1 group-hover:text-slate-600 transition-colors" />
              <div>
                <h3 className="text-sm text-slate-500 mb-2 font-medium">E-mail</h3>
                <a
                  href="mailto:info@swbeauty.cz"
                  className="text-xl text-slate-900 hover:text-slate-700 transition-colors"
                >
                  info@swbeauty.cz
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-slate-600" />
              <h3 className="text-xl font-light text-slate-900">Otevírací doba</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-slate-200">
                <span className="text-slate-600">Otevírací doba</span>
                <span className="text-slate-900 font-medium">na objednávku</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <OpenBookingButton className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition-all duration-200 shadow-sm hover:shadow-md text-center">
              Rezervovat termín
            </OpenBookingButton>
            <OpenVoucherButton className="border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 shadow-sm hover:shadow-md text-center">
              Objednat poukaz
            </OpenVoucherButton>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div>
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-light text-slate-900 mb-6">Napište nám</h2>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-sm hover:border-slate-300 transition-colors overflow-hidden group">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <iframe
            title="Mapa umístění SW Beauty"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2644.6507768!2d17.1256!3d48.8489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUwJzU2LjAiTiAxN8KwMDczMi4yIkU!5e0!3m2!1sen!2scz!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="mt-4 text-center">
          <a
            href="https://goo.gl/maps/your-map-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors underline"
          >
            Zobrazit na mapě
          </a>
        </div>
      </div>
    </PageLayout>
  )
}

