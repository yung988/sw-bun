export function formatPrice(price: number | string): string {
  if (typeof price === 'number') {
    return `${price.toLocaleString('cs-CZ')} Kč`
  }

  const trimmed = price.trim()
  if (!trimmed) return 'Na dotaz'
  if (trimmed.toLowerCase() === 'na dotaz') return 'Na dotaz'

  const numeric = Number.parseInt(trimmed.replace(/\s/g, ''), 10)
  if (!Number.isNaN(numeric)) {
    return `${numeric.toLocaleString('cs-CZ')} Kč`
  }

  return trimmed.endsWith('Kč') ? trimmed : `${trimmed} Kč`
}
