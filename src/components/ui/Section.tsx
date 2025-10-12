import { cn } from '@/lib/utils'

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * Section component for consistent vertical spacing
 * Default: py-16 md:py-24
 */
export default function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-24', className)}>
      {children}
    </section>
  )
}

