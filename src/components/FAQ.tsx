'use client'
import { useState } from 'react'

type Item = { q: string; a: string }

export default function FAQ({ items, idPrefix = '' }: { items: Item[]; idPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-2">
      {items.map((it, idx) => (
        <div
          key={it.q}
          className={`rounded-2xl border transition-all duration-300 ${
            open === idx
              ? 'border-slate-300 bg-white shadow-sm'
              : 'border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-md'
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(open === idx ? null : idx)}
            aria-expanded={open === idx}
            aria-controls={`faq-answer-${idPrefix}${idx}`}
            className="w-full text-left flex items-start justify-between gap-4 p-4 lg:p-5 group"
          >
            <span
              id={`faq-question-${idPrefix}${idx}`}
              className="font-medium text-sm lg:text-base tracking-tight text-slate-900 transition-colors pr-2"
            >
              {it.q}
            </span>
            <span className="flex-shrink-0 mt-0.5">
              <svg
                className={`w-4 h-4 text-slate-400 transition-all duration-300 ${
                  open === idx ? 'rotate-180 text-slate-700' : 'group-hover:text-slate-600'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Rozbalit</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <section
            id={`faq-answer-${idPrefix}${idx}`}
            aria-labelledby={`faq-question-${idPrefix}${idx}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              open === idx ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-4 lg:px-5 pb-4 lg:pb-5">
              <p className="text-sm leading-relaxed text-slate-600 pt-1">{it.a}</p>
            </div>
          </section>
        </div>
      ))}
    </div>
  )
}
