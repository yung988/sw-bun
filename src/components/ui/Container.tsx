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
  // Konzistentní horizontální odsazení napříč stránkou
  // Větší vzdušnost na větších breakpointech pro luxusnější vzhled
  return <div className={cn('mx-auto max-w-[1250px] px-6 md:px-8 lg:px-10', className)}>{children}</div>
}
