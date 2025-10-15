import { cn } from '@/lib/utils'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Container component for consistent max-width and horizontal padding
 * Default: mx-auto max-w-[1250px] px-6
 */
export default function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto max-w-[1250px] px-6', className)}>{children}</div>
}
