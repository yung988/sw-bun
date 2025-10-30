'use client'

import Link from 'next/link'
import { track } from '@/lib/analytics'
import type { ComponentProps, ReactNode } from 'react'

type Props = {
  href: string
  className?: string
  children: ReactNode
  event: string
  data?: Record<string, unknown>
} & Omit<ComponentProps<typeof Link>, 'href' | 'className' | 'children'>

export default function TrackedLink({ href, className, children, event, data, ...rest }: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track(event, { href, ...data })}
      {...rest}
    >
      {children}
    </Link>
  )
}

