import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  center?: boolean
  icon?: ReactNode
}

export default function SectionTitle({ eyebrow, title, subtitle, center = true, icon }: Props) {
  return (
    <div className={`space-y-6 ${center ? 'text-center' : 'text-left'}`}>
      {eyebrow && (
        <div className={`flex items-center gap-2 ${center ? 'justify-center' : 'justify-start'}`}>
          {icon && <div className="text-slate-500">{icon}</div>}
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">{eyebrow}</span>
        </div>
      )}
      <h2 className={`font-display text-4xl md:text-5xl font-light leading-tight tracking-tight text-slate-900`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base leading-relaxed text-slate-600 ${center ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
