'use client'

import { track } from '@/lib/analytics'
import { useEffect } from 'react'

type Props = {
  slug: string
  categoryId: string
  price?: string
}

export default function ServiceViewTracker({ slug, categoryId, price }: Props) {
  useEffect(() => {
    track('service_view', { slug, category_id: categoryId, price })
  }, [slug, categoryId, price])
  return null
}
