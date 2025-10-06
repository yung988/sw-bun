import type { ReactNode } from 'react'

type Props = { eyebrow?: string; title: ReactNode; subtitle?: string; center?: boolean }

export default function SectionTitle({ eyebrow, title, subtitle, center = true }: Props) {
  return (
    <div className={`space-y-4 ${center ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-slate-500 font-medium mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl font-light leading-tight tracking-tight text-slate-900`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm leading-relaxed text-slate-600 mt-3 ${center ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
