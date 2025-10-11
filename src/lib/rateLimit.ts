/**
 * Simple in-memory rate limiter
 * Works for Vercel serverless functions (single instance per request)
 */

type RateLimitStore = Map<string, number[]>

const store: RateLimitStore = new Map()

/**
 * Check if request should be rate limited
 * @param identifier - Usually IP address
 * @param maxRequests - Maximum requests allowed in window
 * @param windowMs - Time window in milliseconds
 * @returns Object with success status and remaining requests
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60 * 60 * 1000 // 1 hour default
): { success: boolean; remaining: number; resetTime?: number } {
  const now = Date.now()
  const requests = store.get(identifier) || []

  // Filtrovat požadavky mimo aktuální okno
  const recentRequests = requests.filter((timestamp) => now - timestamp < windowMs)

  if (recentRequests.length >= maxRequests) {
    // Vypočítat, kdy se rate limit resetuje
    const oldestRequest = Math.min(...recentRequests)
    const resetTime = oldestRequest + windowMs

    return {
      success: false,
      remaining: 0,
      resetTime,
    }
  }

  // Přidat timestamp aktuálního požadavku
  recentRequests.push(now)
  store.set(identifier, recentRequests)

  // Vyčištění starých záznamů pro prevenci memory leak (zachovat max 10000 záznamů)
  if (store.size > 10000) {
    const oldestKey = store.keys().next().value
    if (oldestKey) {
      store.delete(oldestKey)
    }
  }

  return {
    success: true,
    remaining: maxRequests - recentRequests.length,
  }
}

/**
 * Get client IP address from request headers (works with Vercel)
 * @param request - Next.js Request object
 * @returns IP address or 'unknown'
 */
export function getClientIp(request: Request): string {
  // Vercel poskytuje reálnou IP v x-forwarded-for header
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwarded.split(',')[0].trim()
  }

  // Fallback na x-real-ip
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Poslední možnost
  return 'unknown'
}

/**
 * Format time until rate limit reset
 * @param resetTime - Timestamp when rate limit resets
 * @returns Human-readable string
 */
export function formatResetTime(resetTime: number): string {
  const now = Date.now()
  const diffMs = resetTime - now
  const diffMinutes = Math.ceil(diffMs / 60000)

  if (diffMinutes < 1) {
    return 'méně než minutu'
  }
  if (diffMinutes === 1) {
    return '1 minutu'
  }
  if (diffMinutes < 5) {
    return `${diffMinutes} minuty`
  }
  if (diffMinutes < 60) {
    return `${diffMinutes} minut`
  }

  const hours = Math.ceil(diffMinutes / 60)
  if (hours === 1) {
    return '1 hodinu'
  }
  return `${hours} hodin`
}
