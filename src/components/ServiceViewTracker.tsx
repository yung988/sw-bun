'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

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

