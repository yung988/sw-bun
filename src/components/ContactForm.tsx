'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Nepodařilo se odeslat zprávu')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      console.error('Contact form error:', err)
      setError('Nepodařilo se odeslat zprávu. Zkuste to prosím znovu.')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Helper text */}
      <div className="mb-8">
        <p className="text-sm text-slate-600 font-light leading-relaxed">
          Máte dotaz nebo potřebujete poradit? Napište nám a my se vám ozveme do 24 hodin.
        </p>
      </div>

      {/* Success message */}
      {submitted && (
        <div className="bg-slate-50 border-l-2 border-slate-900 p-4">
          <p className="font-medium text-slate-900 text-sm uppercase tracking-wide">Zpráva odeslána</p>
          <p className="text-slate-600 text-sm mt-1 font-light">Děkujeme! Brzy se Vám ozveme.</p>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-2 border-red-500 p-4">
          <p className="text-red-800 text-sm font-medium">{error}</p>
        </div>
      )}

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
            className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-600 peer-focus:text-sm uppercase tracking-wider"
          >
            Jméno a příjmení
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            id="email"
            inputMode="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="elegant-input peer placeholder-transparent"
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-600 peer-focus:text-sm uppercase tracking-wider"
          >
            Email
          </label>
        </div>

        <div className="relative">
          <input
            type="tel"
            id="phone"
            inputMode="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="elegant-input peer placeholder-transparent"
            placeholder="Telefon"
          />
          <label
            htmlFor="phone"
            className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-600 peer-focus:text-sm uppercase tracking-wider"
          >
            Telefon (volitelné)
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
            className="absolute left-0 -top-3.5 text-sm text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-600 peer-focus:text-sm uppercase tracking-wider"
          >
            Zpráva
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'ODESÍLÁM...' : 'ODESLAT ZPRÁVU'}
      </button>
    </form>
  )
}
