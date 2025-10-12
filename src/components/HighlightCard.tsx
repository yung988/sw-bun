'use client'

import { Sparkles, Heart, Zap, Droplet, Scissors, LucideIcon } from 'lucide-react'

type IconName = 'sparkles' | 'heart' | 'zap' | 'droplet' | 'scissors'

type Props = {
  icon?: IconName
  title: string
  description: string
}

const iconMap: Record<IconName, LucideIcon> = {
  sparkles: Sparkles,
  heart: Heart,
  zap: Zap,
  droplet: Droplet,
  scissors: Scissors,
}

export default function HighlightCard({ icon, title, description }: Props) {
  const IconComponent = icon ? iconMap[icon] : null

  return (
    <div className="w-[320px] shrink-0">
      <div className="h-full rounded-2xl border border-slate-200 bg-white p-6">
        {IconComponent && (
          <div className="mb-4">
            <IconComponent className="h-6 w-6 text-slate-900" />
          </div>
        )}
        <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </div>
  )
}

