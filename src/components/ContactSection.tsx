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
                      U Cihelny 1326/4
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
                      href="tel:+420776632498"
                      className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
                    >
                      +420 776 632 498
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
                        <span className="inline-block w-32">Otevírací doba:</span>
                        <span className="font-medium text-gray-800">na objednávku</span>
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

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="elegant-input peer placeholder-transparent"
                    placeholder="Jméno a příjmení"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    JMÉNO A PŘÍJMENÍ *
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="elegant-input peer placeholder-transparent"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    EMAIL *
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="elegant-input peer placeholder-transparent resize-none"
                    placeholder="Zpráva"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    ZPRÁVA *
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary w-full border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'ODESÍLÁM...' : 'ODESLAT ZPRÁVU'}
              </button>

              {status === 'success' && (
                <p className="text-green-600 text-sm text-center font-medium tracking-wide uppercase">
                  ✓ Zpráva byla úspěšně odeslána
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm text-center font-medium tracking-wide uppercase">
                  ✕ Chyba při odesílání
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
