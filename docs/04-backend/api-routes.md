# API Routes Documentation

Komplexní dokumentace všech API endpointů v SW Beauty projektu.

## Table of Contents

- [Přehled](#přehled)
- [Společné Features](#společné-features)
- [POST /api/booking](#post-apibooking)
- [POST /api/contact](#post-apicontact)
- [POST /api/newsletter](#post-apinewsletter)
- [POST /api/voucher](#post-apivoucher)
- [GET /api/pricelist](#get-apipricelist)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Testing](#testing)

---

## Přehled

SW Beauty API obsahuje 5 endpointů pro handling formulářů a data management.

### API Endpoints Summary

| Endpoint | Method | Účel | Rate Limit |
|----------|--------|------|------------|
| `/api/booking` | POST | Rezervace ošetření | 5/hour |
| `/api/contact` | POST | Kontaktní formulář | 5/hour |
| `/api/newsletter` | POST | Newsletter subscription | 10/hour |
| `/api/voucher` | POST | Objednávka dárkového poukazu | 5/hour |
| `/api/pricelist` | GET | Export ceníku | Unlimited |

### Base URL

```
Development:  http://localhost:3000
Production:   https://swbeauty.cz
```

---

## Společné Features

Všechny API endpointy sdílejí následující features:

### 1. Rate Limiting

Ochrana proti abuse pomocí IP-based rate limiting.

```typescript
// Implementace
const rateLimitResult = checkRateLimit(clientIp, limit, window)

if (!rateLimitResult.success) {
  return NextResponse.json(
    { error: 'Příliš mnoho požadavků' },
    {
      status: 429,
      headers: {
        'X-RateLimit-Remaining': '0',
        'Retry-After': '3600'
      }
    }
  )
}
```

### 2. Input Sanitization

Všechny vstupy jsou sanitizovány proti XSS útokům.

```typescript
import { sanitizeEmail, sanitizeHtml, sanitizePhone } from '@/lib/sanitize'

const sanitizedName = sanitizeHtml(name)
const sanitizedEmail = sanitizeEmail(email)
const sanitizedPhone = sanitizePhone(phone)
```

### 3. Email Delivery

Emails jsou odesílány přes **Resend API**.

```typescript
const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'SW Beauty <info@swbeauty.cz>',
  to: 'recipient@example.com',
  subject: 'Subject',
  html: '<p>Email content</p>'
})
```

### 4. Dual Email System

Každý endpoint odesílá **2 emaily**:
1. **Owner Email** - Pro majitelku salonu (info@swbeauty.cz)
2. **Client Email** - Potvrzovací email pro zákazníka

### 5. Error Handling

Konzistentní error responses.

```typescript
try {
  // API logic
} catch (error) {
  console.error('API error:', error)
  return NextResponse.json(
    { error: 'Chybová zpráva' },
    { status: 500 }
  )
}
```

---

## POST /api/booking

Rezervace ošetření přes booking modal.

### Endpoint

```
POST /api/booking
```

### Request Body

```typescript
interface BookingRequest {
  service: string           // Název služby
  name: string              // Jméno zákazníka
  email: string             // Email zákazníka
  phone?: string            // Telefon (optional)
  preferredDate: string     // ISO date string
  preferredTime: string     // Čas (např. "10:00")
  message?: string          // Poznámka (optional)
}
```

### TypeScript Interface

```typescript
// src/app/api/booking/route.ts
type BookingPayload = {
  service: string
  name: string
  email: string
  phone?: string
  preferredDate: string  // "2024-11-15"
  preferredTime: string  // "10:00"
  message?: string
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{
    "service": "Hydrafacial",
    "name": "Jana Nováková",
    "email": "jana@example.com",
    "phone": "+420 777 123 456",
    "preferredDate": "2024-11-20",
    "preferredTime": "14:00",
    "message": "Prosím potvrzení termínu"
  }'
```

### JavaScript/TypeScript Example

```typescript
async function bookService(data: BookingPayload) {
  const response = await fetch('/api/booking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  return response.json()
}

// Použití
try {
  const result = await bookService({
    service: 'Hydrafacial',
    name: 'Jana Nováková',
    email: 'jana@example.com',
    phone: '+420 777 123 456',
    preferredDate: '2024-11-20',
    preferredTime: '14:00',
    message: 'Poznámka...'
  })
  console.log('Rezervace úspěšná!', result)
} catch (error) {
  console.error('Chyba:', error.message)
}
```

### Success Response

```json
{
  "success": true
}
```

**Status Code:** `200 OK`

### Error Responses

#### Missing Required Fields

```json
{
  "error": "Chybí povinné údaje"
}
```

**Status Code:** `400 Bad Request`

#### Rate Limit Exceeded

```json
{
  "error": "Příliš mnoho požadavků. Zkuste to prosím za 1 hodinu."
}
```

**Status Code:** `429 Too Many Requests`

**Headers:**
```
X-RateLimit-Remaining: 0
Retry-After: 3600
```

#### Server Error

```json
{
  "error": "Nepodařilo se odeslat rezervaci"
}
```

**Status Code:** `500 Internal Server Error`

### Rate Limiting

- **Limit:** 5 requests per hour per IP
- **Window:** 3600 seconds (1 hour)
- **Tracking:** IP-based

### Validation Rules

| Field | Required | Validation |
|-------|----------|------------|
| `service` | Yes | Non-empty string after sanitization |
| `name` | Yes | Non-empty string after sanitization |
| `email` | Yes | Valid email format |
| `phone` | No | Phone format (sanitized) |
| `preferredDate` | Yes | Valid date string |
| `preferredTime` | Yes | Non-empty string |
| `message` | No | Sanitized HTML |

### Email Templates

#### Owner Email

**From:** `SW Beauty Rezervace <rezervace@swbeauty.cz>`
**To:** `info@swbeauty.cz`
**Subject:** `🗓️ Nová rezervace - [Jméno zákazníka]`

**Content:**
- Název služby
- Preferovaný termín a čas
- Kontaktní údaje (jméno, email, telefon)
- Poznámka (pokud existuje)

#### Client Confirmation Email

**From:** `SW Beauty <rezervace@swbeauty.cz>`
**To:** [Email zákazníka]
**Subject:** `✅ Potvrzení rezervace – SW Beauty`

**Content:**
- Poděkování za rezervaci
- Shrnutí rezervace (služba, termín)
- Informace o dalším postupu
- Kontaktní údaje salonu

### Implementation Details

**File:** `/src/app/api/booking/route.ts`

**Key Functions:**
```typescript
// Rate limiting check
const rateLimitResult = checkRateLimit(clientIp, 5, 60 * 60 * 1000)

// Input sanitization
const sanitizedService = sanitizeHtml(service)
const sanitizedName = sanitizeHtml(name)
const sanitizedEmail = sanitizeEmail(email)
const sanitizedPhone = phone ? sanitizePhone(phone) : null

// Email sending
await resend.emails.send({ /* owner email */ })
await resend.emails.send({ /* client email */ })
```

---

## POST /api/contact

Kontaktní formulář pro obecné dotazy.

### Endpoint

```
POST /api/contact
```

### Request Body

```typescript
interface ContactRequest {
  name: string       // Jméno
  email: string      // Email
  phone?: string     // Telefon (optional)
  message: string    // Zpráva
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Petra Svobodová",
    "email": "petra@example.com",
    "phone": "+420 777 999 888",
    "message": "Chtěla bych se zeptat na..."
  }'
```

### TypeScript Example

```typescript
async function sendContactMessage(data: ContactRequest) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  return response.json()
}
```

### Success Response

```json
{
  "success": true
}
```

**Status Code:** `200 OK`

### Error Responses

#### Missing Required Fields

```json
{
  "error": "Chybí povinné údaje"
}
```

**Status Code:** `400 Bad Request`

### Rate Limiting

- **Limit:** 5 requests per hour per IP
- **Window:** 3600 seconds

### Validation Rules

| Field | Required | Validation |
|-------|----------|------------|
| `name` | Yes | Non-empty after sanitization |
| `email` | Yes | Valid email format |
| `phone` | No | Phone format |
| `message` | Yes | Non-empty after sanitization |

### Email Templates

#### Owner Email

**From:** `SW Beauty Kontakt <kontakt@swbeauty.cz>`
**To:** `info@swbeauty.cz`
**Subject:** `💬 Nová zpráva z webu - [Jméno]`

#### Client Email

**From:** `SW Beauty <kontakt@swbeauty.cz>`
**To:** [Email zákazníka]
**Subject:** `✅ Děkujeme za vaši zprávu – SW Beauty`

**File:** `/src/app/api/contact/route.ts`

---

## POST /api/newsletter

Newsletter subscription endpoint.

### Endpoint

```
POST /api/newsletter
```

### Request Body

```typescript
interface NewsletterRequest {
  email: string    // Email pro newsletter
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "subscriber@example.com"
  }'
```

### TypeScript Example

```typescript
async function subscribeNewsletter(email: string) {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error)
  }

  return response.json()
}

// Použití
try {
  await subscribeNewsletter('user@example.com')
  console.log('Přihlášení k newsletteru úspěšné!')
} catch (error) {
  console.error('Chyba:', error.message)
}
```

### Success Response

```json
{
  "success": true
}
```

**Status Code:** `200 OK`

### Error Responses

#### Invalid Email

```json
{
  "error": "Zadejte prosím platný email"
}
```

**Status Code:** `400 Bad Request`

### Rate Limiting

- **Limit:** 10 requests per hour per IP (vyšší než ostatní)
- **Window:** 3600 seconds

### Validation Rules

| Field | Required | Validation |
|-------|----------|------------|
| `email` | Yes | Valid email format |

### Email Templates

#### Owner Notification

**From:** `SW Beauty Newsletter <newsletter@swbeauty.cz>`
**To:** `info@swbeauty.cz`
**Subject:** `📰 Nový odběratel newsletteru`

**Content:**
- Email nového odběratele
- Datum přihlášení
- Upozornění na uvítací slevu 10%

#### Subscriber Welcome Email

**From:** `SW Beauty <newsletter@swbeauty.cz>`
**To:** [Email odběratele]
**Subject:** `🎉 Vítejte v newsletteru SW Beauty!`

**Content:**
- Uvítací zpráva
- Co očekávat od newsletteru
- **Speciální uvítací sleva 10%** na první ošetření
- Kontaktní údaje
- Odhlášení informace

**File:** `/src/app/api/newsletter/route.ts`

---

## POST /api/voucher

Objednávka dárkového poukazu.

### Endpoint

```
POST /api/voucher
```

### Request Body

```typescript
interface VoucherRequest {
  name: string           // Jméno objednatele
  email: string          // Email objednatele
  phone: string          // Telefon objednatele
  amount: string         // Hodnota poukazu nebo "custom"
  customAmount?: string  // Vlastní částka (pokud amount="custom")
  recipient?: string     // Pro koho je poukaz (optional)
  message?: string       // Věnování (optional)
}
```

### Example Request

```bash
curl -X POST http://localhost:3000/api/voucher \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Martin Novotný",
    "email": "martin@example.com",
    "phone": "+420 777 444 555",
    "amount": "2000",
    "recipient": "Pro maminku",
    "message": "Přeji krásné narozeniny!"
  }'
```

### Custom Amount Example

```bash
curl -X POST http://localhost:3000/api/voucher \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Eva Procházková",
    "email": "eva@example.com",
    "phone": "+420 777 333 222",
    "amount": "custom",
    "customAmount": "3500"
  }'
```

### TypeScript Example

```typescript
async function orderVoucher(data: VoucherRequest) {
  const response = await fetch('/api/voucher', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to order voucher')
  }

  return response.json()
}

// Použití
await orderVoucher({
  name: 'Martin Novotný',
  email: 'martin@example.com',
  phone: '+420 777 444 555',
  amount: '2000',
  recipient: 'Pro maminku',
  message: 'Přeji krásné narozeniny!'
})
```

### Success Response

```json
{
  "success": true
}
```

**Status Code:** `200 OK`

### Error Responses

#### Missing Required Fields

```json
{
  "error": "Chybí povinné údaje"
}
```

**Status Code:** `400 Bad Request`

### Rate Limiting

- **Limit:** 5 requests per hour per IP
- **Window:** 3600 seconds

### Validation Rules

| Field | Required | Validation |
|-------|----------|------------|
| `name` | Yes | Non-empty after sanitization |
| `email` | Yes | Valid email format |
| `phone` | Yes | Valid phone format |
| `amount` | Yes | Non-empty string |
| `customAmount` | Conditional | Required if amount="custom" |
| `recipient` | No | Sanitized HTML |
| `message` | No | Sanitized HTML |

### Amount Logic

```typescript
const finalAmount = amount === 'custom' ? customAmount : amount
```

Pokud je `amount="custom"`, použije se hodnota z `customAmount`.

### Email Templates

#### Owner Email

**From:** `SW Beauty Poukazy <poukazy@swbeauty.cz>`
**To:** `info@swbeauty.cz`
**Subject:** `🎁 Nová objednávka poukazu - [Částka] Kč`

**Content:**
- Hodnota poukazu
- Kontaktní údaje objednatele
- Pro koho je poukaz
- Věnování
- Instrukce pro kontakt zákazníka

#### Client Confirmation

**From:** `SW Beauty <poukazy@swbeauty.cz>`
**To:** [Email objednatele]
**Subject:** `✅ Potvrzení objednávky poukazu – SW Beauty`

**Content:**
- Poděkování
- Shrnutí objednávky
- Informace o dalším postupu (platba, vyzvednutí)
- Tipy o poukazu (platnost 12 měsíců, použití)
- Kontaktní údaje

**File:** `/src/app/api/voucher/route.ts`

---

## GET /api/pricelist

Export ceníku ve formátu JSON.

### Endpoint

```
GET /api/pricelist
```

### Request

```bash
curl http://localhost:3000/api/pricelist
```

### TypeScript Example

```typescript
async function getPricelist() {
  const response = await fetch('/api/pricelist')

  if (!response.ok) {
    throw new Error('Failed to fetch pricelist')
  }

  const items: PriceItem[] = await response.json()
  return items
}

// Použití
const pricelist = await getPricelist()
console.log(`Loaded ${pricelist.length} items`)
```

### Success Response

```json
[
  {
    "category": "Kosmetika",
    "subcategory": "Ošetření pleti",
    "serviceType": "single",
    "name": "Hydrafacial",
    "shortDescription": "Hloubkové čištění a hydratace pleti",
    "description": "Detailní popis služby...",
    "duration": 60,
    "sessions": 1,
    "price": "1500",
    "benefits": [
      "Hloubkové čištění",
      "Hydratace",
      "Okamžité výsledky"
    ],
    "image": "/images/hydrafacial.jpg",
    "images": [
      "/images/hydrafacial-1.jpg",
      "/images/hydrafacial-2.jpg"
    ]
  },
  // ... další položky
]
```

**Status Code:** `200 OK`

### Response Schema

```typescript
type PriceItem = {
  category: string          // Kategorie služby
  subcategory: string       // Podkategorie
  serviceType: string       // "single" | "package"
  name: string              // Název služby
  shortDescription: string  // Krátký popis
  description: string       // Detailní popis
  duration: number          // Délka v minutách (0 = variabilní)
  sessions: number          // Počet sezení (0 = single session)
  price: string             // Cena jako string (např. "1500")
  benefits: string[]        // Pole benefitů
  image: string             // Hlavní obrázek
  images: string[]          // Galerie obrázků
}
```

### Error Response

```json
{
  "error": "Nepodařilo se načíst ceník"
}
```

**Status Code:** `500 Internal Server Error`

### Rate Limiting

- **Limit:** None (unlimited)
- **Caching:** Consider implementing client-side caching

### Use Cases

1. **Export ceníku** - Stažení kompletního ceníku
2. **External integrations** - Integrace s třetími stranami
3. **Data analysis** - Analýza dat služeb
4. **Backup** - Backup dat služeb

### Implementation

**File:** `/src/app/api/pricelist/route.ts`

```typescript
export async function GET() {
  try {
    const file = path.join(process.cwd(), 'public', 'swbeauty-procedury.csv')
    const csv = await fs.readFile(file, 'utf-8')
    const items = parseCSV(csv)
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json(
      { error: 'Nepodařilo se načíst ceník' },
      { status: 500 }
    )
  }
}
```

**CSV File:** `/public/swbeauty-procedury.csv`

---

## Error Handling

### Standard Error Format

Všechny API endpointy vrací errors ve formátu:

```json
{
  "error": "Popis chyby v češtině"
}
```

### HTTP Status Codes

| Code | Význam | Použití |
|------|--------|---------|
| `200` | OK | Úspěšný request |
| `400` | Bad Request | Chybějící/nevalidní data |
| `429` | Too Many Requests | Rate limit exceeded |
| `500` | Internal Server Error | Server error |

### Error Messages (Česky)

Všechny error messages jsou v češtině pro lepší UX:

```typescript
// Chybějící data
{ error: 'Chybí povinné údaje' }

// Rate limit
{ error: 'Příliš mnoho požadavků. Zkuste to prosím za 1 hodinu.' }

// Server error
{ error: 'Nepodařilo se odeslat rezervaci' }
{ error: 'Nepodařilo se odeslat zprávu' }
{ error: 'Nepodařilo se přihlásit k odběru newsletteru' }
{ error: 'Nepodařilo se odeslat objednávku poukazu' }
{ error: 'Nepodařilo se načíst ceník' }
```

### Client-Side Error Handling

```typescript
async function handleApiRequest<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      const error = await response.json()

      // Handle specific status codes
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        throw new Error(
          `Rate limit exceeded. Retry after ${retryAfter} seconds.`
        )
      }

      throw new Error(error.error || 'Unknown error')
    }

    return response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
```

---

## Rate Limiting

### Implementation

Rate limiting je implementovaný v `/src/lib/rateLimit.ts`:

```typescript
export function checkRateLimit(
  ip: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  // In-memory tracking per IP
  const now = Date.now()
  const requests = requestMap.get(ip) || []

  // Filter expired requests
  const validRequests = requests.filter(
    time => now - time < windowMs
  )

  if (validRequests.length >= limit) {
    return {
      success: false,
      resetTime: validRequests[0] + windowMs
    }
  }

  validRequests.push(now)
  requestMap.set(ip, validRequests)

  return { success: true }
}
```

### Rate Limits per Endpoint

| Endpoint | Limit | Window | Reasoning |
|----------|-------|--------|-----------|
| `/api/booking` | 5/hour | 1 hour | Prevent spam bookings |
| `/api/contact` | 5/hour | 1 hour | Prevent spam messages |
| `/api/newsletter` | 10/hour | 1 hour | Higher limit for subscriptions |
| `/api/voucher` | 5/hour | 1 hour | Prevent fraudulent orders |
| `/api/pricelist` | None | - | Public data |

### IP Detection

```typescript
export function getClientIp(request: Request): string {
  // Try Vercel headers first
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  // Try x-real-ip
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Fallback
  return 'unknown'
}
```

### Response Headers

Při rate limit exceeded:

```
HTTP/1.1 429 Too Many Requests
X-RateLimit-Remaining: 0
Retry-After: 3600
Content-Type: application/json

{
  "error": "Příliš mnoho požadavků. Zkuste to prosím za 1 hodinu."
}
```

---

## Testing

### Manual Testing (cURL)

#### Test Booking

```bash
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{
    "service": "Test Service",
    "name": "Test User",
    "email": "test@example.com",
    "preferredDate": "2024-11-20",
    "preferredTime": "14:00"
  }'
```

#### Test Rate Limiting

```bash
# Send 6 requests rapidly (should get 429 on 6th)
for i in {1..6}; do
  curl -X POST http://localhost:3000/api/booking \
    -H "Content-Type: application/json" \
    -d '{"service":"Test","name":"Test","email":"test@example.com","preferredDate":"2024-11-20","preferredTime":"14:00"}'
  echo "\nRequest $i done"
  sleep 1
done
```

### TypeScript Testing

```typescript
// Test helper
async function testApiEndpoint(
  endpoint: string,
  method: string,
  body?: any
) {
  const response = await fetch(`http://localhost:3000${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  console.log(`[${response.status}] ${endpoint}`)
  console.log(data)

  return { response, data }
}

// Test all endpoints
await testApiEndpoint('/api/booking', 'POST', {
  service: 'Test',
  name: 'Test User',
  email: 'test@example.com',
  preferredDate: '2024-11-20',
  preferredTime: '14:00'
})

await testApiEndpoint('/api/contact', 'POST', {
  name: 'Test User',
  email: 'test@example.com',
  message: 'Test message'
})

await testApiEndpoint('/api/newsletter', 'POST', {
  email: 'test@example.com'
})

await testApiEndpoint('/api/pricelist', 'GET')
```

### Postman Collection

Vytvořte Postman collection s těmito requests:

1. **POST Booking** - Základní booking request
2. **POST Booking (Invalid)** - Missing fields
3. **POST Booking (Rate Limit)** - Opakované requesty
4. **POST Contact** - Kontaktní formulář
5. **POST Newsletter** - Newsletter subscription
6. **POST Voucher** - Voucher objednávka
7. **GET Pricelist** - Ceník export

---

## Best Practices

### 1. Always Sanitize Inputs

```typescript
// ✅ Good
const sanitizedName = sanitizeHtml(name)
const sanitizedEmail = sanitizeEmail(email)

// ❌ Bad
const name = request.body.name  // Direct use
```

### 2. Validate Before Processing

```typescript
// ✅ Good
if (!sanitizedName || !sanitizedEmail) {
  return NextResponse.json(
    { error: 'Chybí povinné údaje' },
    { status: 400 }
  )
}

// Process...
```

### 3. Handle Errors Gracefully

```typescript
// ✅ Good
try {
  await resend.emails.send(/* ... */)
} catch (error) {
  console.error('Email error:', error)
  return NextResponse.json(
    { error: 'Nepodařilo se odeslat email' },
    { status: 500 }
  )
}
```

### 4. Log Important Events

```typescript
console.log('✅ Booking created:', { service, email })
console.error('❌ API error:', error)
console.warn('⚠️  Rate limit exceeded:', ip)
```

### 5. Use TypeScript Types

```typescript
// ✅ Good - Type-safe
interface BookingPayload {
  service: string
  name: string
  email: string
  // ...
}

async function handleBooking(data: BookingPayload) {
  // ...
}
```

---

## Summary

SW Beauty API poskytuje:

- **5 endpointů** - booking, contact, newsletter, voucher, pricelist
- **Rate limiting** - Ochrana proti abuse
- **Input sanitization** - XSS ochrana
- **Dual emails** - Owner + Client notifications
- **Error handling** - Konzistentní error responses
- **TypeScript** - Type-safe API

---

**Další:** [Services Data →](../05-data/services-data.md)
