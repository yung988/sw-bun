import type { ReactNode } from 'react'

type Props = { eyebrow?: string; title: ReactNode; subtitle?: string; center?: boolean }

export default function SectionTitle({ eyebrow, title, subtitle, center = true }: Props) {
  return (
    <div className={`space-y-3 ${center ? 'text-center' : 'text-left'}`}>
      {eyebrow && <span className="text-xs uppercase tracking-[0.4em] text-slate-500">{eyebrow}</span>}
      <h2 className="font-display text-[40px] leading-[48px] font-light tracking-tight text-slate-900">{title}</h2>
      {subtitle && (
        <p className={`text-sm leading-relaxed text-slate-500  ${center ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
