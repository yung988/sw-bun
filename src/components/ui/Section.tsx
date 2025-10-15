import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type SectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * Section component for consistent vertical spacing
 * Default: py-16 md:py-24
 */
const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, id }, ref) => {
    return (
      <section ref={ref} id={id} className={cn('py-16 md:py-24', className)}>
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section

