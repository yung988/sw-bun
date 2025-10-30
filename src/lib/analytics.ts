'use client'

type Payload = Record<string, unknown>

export function track(event: string, payload: Payload = {}) {
  if (typeof window === 'undefined') return
  try {
    const data = { event, ...payload, ts: Date.now() }
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push(data)
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[track]', data)
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[track] failed', e)
  }
}

