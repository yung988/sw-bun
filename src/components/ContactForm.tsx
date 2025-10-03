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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Vytvoří mailto link s daty z formuláře
    const subject = encodeURIComponent(`Kontakt z webu - ${formData.name}`)
    const body = encodeURIComponent(
      `Jméno: ${formData.name}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\n\nZpráva:\n${formData.message}`
    )

    window.location.href = `mailto:info@swbeauty.cz?subject=${subject}&body=${body}`

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Jméno a příjmení
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
          placeholder="Jan Novák"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
          placeholder="jan@email.cz"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Telefon
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
          placeholder="+420 123 456 789"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Zpráva
        </label>
        <textarea
          id="message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm text-slate-900 dark:text-white outline-none transition focus:border-slate-400 dark:focus:border-slate-600 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
          placeholder="Chtěl/a bych se objednat na..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-slate-900 dark:bg-white px-6 py-3.5 text-sm font-medium text-white dark:text-slate-900 transition hover:bg-slate-800 dark:hover:bg-slate-100"
      >
        {submitted ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <title>Odesláno</title>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Odesláno
          </span>
        ) : (
          'Odeslat zprávu'
        )}
      </button>
    </form>
  )
}
