/**
 * Input sanitization utilities to prevent XSS attacks
 */

/**
 * Sanitize string for use in HTML context
 * Escapes characters that could be used for XSS attacks
 * @param input - User input string
 * @returns Sanitized string safe for HTML
 */
export function sanitizeHtml(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim()
}

/**
 * Sanitize object with multiple string fields
 * @param obj - Object with string values
 * @returns New object with sanitized values
 */
export function sanitizeObject<T extends Record<string, string | number | boolean | undefined>>(
  obj: T
): T {
  const sanitized: Record<string, string | number | boolean | undefined> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeHtml(value)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized as T
}

/**
 * Strip HTML tags from string (for plain text contexts)
 * @param input - String that may contain HTML
 * @returns Plain text without HTML tags
 */
export function stripHtml(input: string): string {
  if (typeof input !== 'string') {
    return ''
  }

  return input.replace(/<[^>]*>/g, '').trim()
}

/**
 * Validate and sanitize email address
 * @param email - Email address to validate
 * @returns Sanitized email or null if invalid
 */
export function sanitizeEmail(email: string): string | null {
  if (typeof email !== 'string') {
    return null
  }

  const trimmed = email.trim().toLowerCase()

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmed)) {
    return null
  }

  return trimmed
}

/**
 * Sanitize phone number (Czech format)
 * @param phone - Phone number string
 * @returns Sanitized phone or null if invalid
 */
export function sanitizePhone(phone: string): string | null {
  if (typeof phone !== 'string') {
    return null
  }

  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '')

  // Check if it's a valid Czech phone number
  if (cleaned.length < 9) {
    return null
  }

  return cleaned
}
