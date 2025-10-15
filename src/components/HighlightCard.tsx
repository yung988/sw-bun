'use client'

import { Sparkles, Heart, Zap, Droplet, Scissors, type LucideIcon } from 'lucide-react'

type IconName = 'sparkles' | 'heart' | 'zap' | 'droplet' | 'scissors'

type Props = {
  icon?: IconName
  title: string
  description: string
  index?: number
}

const iconMap: Record<IconName, LucideIcon> = {
  sparkles: Sparkles,
  heart: Heart,
  zap: Zap,
  droplet: Droplet,
  scissors: Scissors,
}

export default function HighlightCard({ icon, title, description, index = 0 }: Props) {
  const IconComponent = icon ? iconMap[icon] : null

  return (
    <div className="w-[320px] shrink-0 highlight-card" data-index={index}>
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:shadow-xl hover:border-slate-300">
        {IconComponent && (
          <div className="mb-6">
            <IconComponent className="h-8 w-8 text-slate-900" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-slate-900 mb-3">{title}</h3>
        <p className="text-base leading-relaxed text-slate-600">{description}</p>
      </div>
    </div>
  )
}
