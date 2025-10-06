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
        throw new Error('Failed to send message')
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Helper text */}
      <div className="mb-6">
        <p className="text-sm text-slate-600">
          Máte dotaz nebo potřebujete poradit? Napište nám a my se vám ozveme do 24 hodin.
        </p>
      </div>

      {/* Success message */}
      {submitted && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex items-start gap-3">
          <svg
            className="h-5 w-5 text-slate-900 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Úspěch</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-medium text-slate-900 text-sm">Zpráva odeslána!</p>
            <p className="text-slate-700 text-sm mt-1">Děkujeme! Brzy se Vám ozveme.</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3">
          <svg
            className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <title>Chyba</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700  mb-2">
          Jméno a příjmení
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-xl border border-slate-200  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-900"
          placeholder="Jan Novák"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700  mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          inputMode="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-xl border border-slate-200  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-900"
          placeholder="jan@email.cz"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700  mb-2">
          Telefon (volitelné)
        </label>
        <input
          type="tel"
          id="phone"
          inputMode="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-xl border border-slate-200  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-900"
          placeholder="+420 773 577 899"
        />
        <p className="mt-1.5 text-xs text-slate-500">
          Pro rychlejší odpověď můžete přidat telefon
        </p>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700  mb-2">
          Zpráva
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl border border-slate-200  bg-white  px-4 py-3 text-sm text-slate-900  outline-none transition focus:border-slate-900"
          placeholder="Chtěl/a bych se objednat na..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-slate-900 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Odesílám...' : 'Odeslat zprávu'}
      </button>
    </form>
  )
}
