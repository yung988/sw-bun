import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  center?: boolean
  icon?: ReactNode
  badge?: { icon?: ReactNode; text: string }
}

export default function SectionTitle({ eyebrow, title, subtitle, center = true, icon, badge }: Props) {
  return (
    <div className={`space-y-4 ${center ? 'text-center' : 'text-left'}`}>
      {badge && (
        <div className={`mb-4 ${center ? 'justify-center' : 'justify-start'} flex`}>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/60 bg-white/60 px-3 py-1">
            {badge.icon && <div className="text-slate-600">{badge.icon}</div>}
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-600">{badge.text}</span>
          </div>
        </div>
      )}
      {eyebrow && (
        <div className={`flex items-center gap-2 ${center ? 'justify-center' : 'justify-start'} mb-2`}>
          {icon && <div className="text-slate-500">{icon}</div>}
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">{eyebrow}</span>
        </div>
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
