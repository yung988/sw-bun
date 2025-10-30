'use client'

type Payload = Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

export function track(event: string, payload: Payload = {}) {
  if (typeof window === 'undefined') return
  try {
    const data = { event, ...payload, ts: Date.now() }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(data)
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[track]', data)
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[track] failed', e)
  }
}
