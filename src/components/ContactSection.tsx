import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactSection() {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm tracking-widest uppercase">Kontakt</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light">
            Kde nás <span className="italic font-serif">najdete</span>
          </h1>
        </div>

        <p className="text-gray-600 text-lg mb-16 max-w-xl">
          Náš salon se nachází v centru Hodonína na Masarykově náměstí.
        </p>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-12">
            {/* Address */}
            <div className="group">
              <div className="flex items-start gap-4 mb-1">
                <MapPin className="w-5 h-5 text-gray-400 mt-1 group-hover:text-rose-500 transition-colors" />
                <div>
                  <h3 className="text-sm text-gray-500 mb-2 font-medium">Adresa</h3>
                  <p className="text-xl text-gray-900">Masarykovo náměstí 59, 695 01 Hodonín</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group">
              <div className="flex items-start gap-4 mb-1">
                <Phone className="w-5 h-5 text-gray-400 mt-1 group-hover:text-rose-500 transition-colors" />
                <div>
                  <h3 className="text-sm text-gray-500 mb-2 font-medium">Telefon</h3>
                  <a href="tel:+420773577899" className="text-xl text-gray-900 hover:text-rose-600 transition-colors">
                    +420 773 577 899
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <div className="flex items-start gap-4 mb-1">
                <Mail className="w-5 h-5 text-gray-400 mt-1 group-hover:text-rose-500 transition-colors" />
                <div>
                  <h3 className="text-sm text-gray-500 mb-2 font-medium">E-mail</h3>
                  <a
                    href="mailto:info@swbeauty.cz"
                    className="text-xl text-gray-900 hover:text-rose-600 transition-colors"
                  >
                    info@swbeauty.cz
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-gray-600" />
                <h3 className="text-xl font-light text-gray-900">Otevírací doba</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Pondělí - Pátek</span>
                  <span className="text-gray-900 font-medium">9:00 - 20:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Sobota</span>
                  <span className="text-gray-900 font-medium">10:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Neděle</span>
                  <span className="font-medium text-gray-500">Zavřeno</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onMouseEnter={() => setHoveredButton('reserve')}
                onMouseLeave={() => setHoveredButton(null)}
                className="relative overflow-hidden bg-black text-white px-8 py-4 rounded-full font-light hover:bg-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <span className="relative z-10">Rezervovat termín</span>
                {hoveredButton === 'reserve' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 animate-pulse"></div>
                )}
              </button>
              <button
                onMouseEnter={() => setHoveredButton('voucher')}
                onMouseLeave={() => setHoveredButton(null)}
                className="border-2 border-black text-black px-8 py-4 rounded-full font-light hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
              >
                Objednat poukaz
              </button>
            </div>
          </div>

          {/* Right Column - Map */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-gray-200 transition-colors overflow-hidden group">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2644.6507768!2d17.1256!3d48.8489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUwJzU2LjAiTiAxN8KwMDcnMzIuMiJF!5e0!3m2!1sen!2scz!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale group-hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://goo.gl/maps/your-map-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-black transition-colors underline"
                >
                  View larger map
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
