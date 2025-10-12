'use client'
import { motion } from 'framer-motion'

type Props = { icon?: string; title: string; description: string }

export default function WhyCard({ icon, title, description }: Props) {
  return (
    <motion.div
      className="rounded-2xl bg-white border border-slate-200 p-8"
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {icon && (
        <motion.div
          className="mb-6 text-4xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <span aria-hidden>{icon}</span>
        </motion.div>
      )}
      <div className="mb-4">
        <strong className="text-xl font-semibold text-slate-900">{title}</strong>
      </div>
      <p className="text-base leading-relaxed text-slate-600">{description}</p>
    </motion.div>
  )
}
