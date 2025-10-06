'use client'
import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-12 md:p-16">
      <div className="grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium mb-4">Newsletter</div>
          <h3 className="font-display text-3xl md:text-4xl font-light text-slate-900 leading-tight mb-4">
            Sledujte naše <em className="italic">novinky a akce</em>
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Přihlaste se k odběru novinek a získejte slevu 10% na první ošetření.
          </p>
        </div>
        <form onSubmit={submit} className="flex w-full flex-col gap-4">
          <div className="flex gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vas@email.cz"
              className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            />
            <button
              type="submit"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 hover:shadow-lg whitespace-nowrap"
            >
              Odeslat
            </button>
          </div>
          {submitted && (
            <p className="text-sm text-slate-900 text-center flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <title>Úspěch</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Děkujeme! Budeme vás informovat.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
