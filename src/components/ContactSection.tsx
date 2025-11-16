'use client'

import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useState, FormEvent } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (error) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <Section id="kontakt" className="relative bg-white luxury-spacing">
      <Container>
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-800 mb-4">
            Kontakt
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Máte dotazy nebo chcete rezervovat termín? Neváhejte nás kontaktovat.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-serif text-gray-800 mb-6">
                Kontaktujte nás
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                    style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}
                  >
                    <MapPin className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Adresa</p>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      SW Beauty s.r.o.
                      <br />
                      U Cihelny 1326/2
                      <br />
                      695 01 Hodonín
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                    style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}
                  >
                    <Phone className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Telefon</p>
                    <a
                      href="tel:+420773577899"
                      className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
                    >
                      +420 773 577 899
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                    style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}
                  >
                    <Mail className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Email</p>
                    <a
                      href="mailto:info@swbeauty.cz"
                      className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
                    >
                      info@swbeauty.cz
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                    style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}
                  >
                    <Clock className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">Otevírací doba</p>
                    <div className="text-gray-600 text-sm sm:text-base space-y-1">
                      <p>
                        <span className="inline-block w-32">Pondělí - Pátek:</span>
                        <span className="font-medium text-gray-800">7:00 - 20:00</span>
                      </p>
                      <p>
                        <span className="inline-block w-32">Sobota:</span>
                        <span className="font-medium text-gray-800">9:00 - 16:00</span>
                      </p>
                      <p>
                        <span className="inline-block w-32">Neděle:</span>
                        <span className="font-medium text-gray-800">dle dohody</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-10">
            <h3 className="text-xl sm:text-2xl font-serif text-gray-800 mb-6">
              Napište nám
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Jméno a příjmení *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Jan Novák"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="jan@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Zpráva *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                  placeholder="Vaše zpráva..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 sm:py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {status === 'loading' ? 'Odesílám...' : 'ODESLAT ZPRÁVU'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-sm sm:text-base text-center">
                  ✓ Zpráva byla úspěšně odeslána!
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm sm:text-base text-center">
                  ✕ Chyba při odesílání. Zkuste to prosím znovu.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif text-gray-800 mb-6 text-center">
            JAK SE K NÁM DOSTANETE
          </h3>
          <div className="rounded-2xl overflow-hidden shadow-lg h-72 md:h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2618.5!2d17.132!3d48.849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUwJzU2LjQiTiAxN8KwMDcnNTUuMiJF!5e0!3m2!1scs!2scz!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SW Beauty na mapě"
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
