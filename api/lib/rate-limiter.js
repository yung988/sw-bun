// Simple in-memory rate limiter for API endpoints
const rateLimitMap = new Map();

export function rateLimit(identifier, maxRequests = 5, windowMs = 300000) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(identifier) || [];

  // Clean up old requests outside the time window
  const recentRequests = userRequests.filter(time => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    const error = new Error('Příliš mnoho požadavků. Zkuste to prosím za chvíli.');
    error.statusCode = 429;
    throw error;
  }

  recentRequests.push(now);
  rateLimitMap.set(identifier, recentRequests);

  return true;
}

// Clean up old entries every 10 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, requests] of rateLimitMap.entries()) {
    const validRequests = requests.filter(time => now - time < 3600000); // Keep 1 hour history
    if (validRequests.length === 0) {
      rateLimitMap.delete(key);
    } else {
      rateLimitMap.set(key, validRequests);
    }
  }
}, 600000); // Run every 10 minutes
