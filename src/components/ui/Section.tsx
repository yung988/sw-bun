import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * Section component for consistent vertical spacing
 * Default: py-24 md:py-28
 */
const Section = forwardRef<HTMLElement, SectionProps>(({ children, className, id }, ref) => {
  return (
    <section ref={ref} id={id} className={cn('py-24 md:py-28', className)}>
      {children}
    </section>
  )
})

Section.displayName = 'Section'

export default Section
