import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit, getClientIp, formatResetTime } from '@/lib/rateLimit'
import { sanitizeHtml, sanitizeEmail, sanitizePhone } from '@/lib/sanitize'

// Initialize Resend only if API key exists (runtime check)
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set')
    return null
  }
  return new Resend(apiKey)
}

export async function POST(request: Request) {
  try {
    // Rate limiting check (5 requests per hour per IP)
    const clientIp = getClientIp(request)
    const rateLimitResult = checkRateLimit(clientIp, 5, 60 * 60 * 1000)

    if (!rateLimitResult.success) {
      const resetTimeStr = rateLimitResult.resetTime
        ? formatResetTime(rateLimitResult.resetTime)
        : 'za chvíli'

      console.warn(`Rate limit exceeded for IP: ${clientIp}`)

      return NextResponse.json(
        {
          error: `Příliš mnoho požadavků. Zkuste to prosím za ${resetTimeStr}.`,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600',
          },
        }
      )
    }

    const resend = getResend()
    if (!resend) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const body = await request.json()
    const { service, name, email, phone, preferredDate, preferredTime, message } = body

    // Sanitize all inputs
    const sanitizedService = sanitizeHtml(service || '')
    const sanitizedName = sanitizeHtml(name || '')
    const sanitizedEmail = sanitizeEmail(email)
    const sanitizedPhone = phone ? sanitizePhone(phone) : null
    const sanitizedMessage = message ? sanitizeHtml(message) : ''

    // Validate required fields after sanitization
    if (!sanitizedService || !sanitizedName || !sanitizedEmail) {
      return NextResponse.json({ error: 'Chybí povinné údaje' }, { status: 400 })
    }

    // Email pro klientku (majitelku) - používáme sanitizované hodnoty
    const { error: ownerError } = await resend.emails.send({
      from: 'SW Beauty Rezervace <rezervace@swbeauty.cz>',
      to: 'info@swbeauty.cz',
      subject: `🗓️ Nová rezervace - ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Nová rezervace</h2>
          
          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Služba</h3>
            <p style="margin: 5px 0;"><strong>${sanitizedService}</strong></p>
            
            <h3 style="color: #334155;">Preferovaný termín</h3>
            <p style="margin: 5px 0;"><strong>${new Date(preferredDate).toLocaleDateString('cs-CZ')} v ${preferredTime}</strong></p>
            
            <h3 style="color: #334155;">Kontaktní údaje</h3>
            <p style="margin: 5px 0;">Jméno: <strong>${sanitizedName}</strong></p>
            <p style="margin: 5px 0;">Email: <strong>${sanitizedEmail}</strong></p>
            <p style="margin: 5px 0;">Telefon: <strong>${sanitizedPhone || 'Neuvedeno'}</strong></p>
            
            ${
              sanitizedMessage
                ? `
            <h3 style="color: #334155;">Poznámka</h3>
            <p style="margin: 5px 0;">${sanitizedMessage}</p>
            `
                : ''
            }
          </div>
          
          <p style="color: #64748b; font-size: 14px;">
            Pro potvrzení termínu kontaktujte klienta do 24 hodin.
          </p>
        </div>
      `,
    })

    if (ownerError) {
      console.error('Owner email error:', ownerError)
      throw ownerError
    }

    // Potvrzovací email pro klienta - používáme sanitizované hodnoty
    const { error: clientError } = await resend.emails.send({
      from: 'SW Beauty <rezervace@swbeauty.cz>',
      to: sanitizedEmail,
      subject: '✅ Potvrzení rezervace - SW Beauty',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Děkujeme za Vaši rezervaci!</h2>
          
          <p>Dobrý den ${sanitizedName},</p>
          
          <p>Vaše nezávazná poptávka na ošetření byla úspěšně odeslána.</p>
          
          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Shrnutí rezervace</h3>
            <p style="margin: 5px 0;"><strong>Služba:</strong> ${sanitizedService}</p>
            <p style="margin: 5px 0;"><strong>Preferovaný termín:</strong> ${new Date(preferredDate).toLocaleDateString('cs-CZ')} v ${preferredTime}</p>
          </div>
          
          <p>Budeme Vás kontaktovat do 24 hodin pro potvrzení termínu na emailu nebo telefonu.</p>
          
          <p style="margin-top: 30px;">S pozdravem,<br><strong>Tým SW Beauty</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #64748b; font-size: 12px;">
            SW Beauty s.r.o.<br>
            U Cihelny 1326/2, 695 01 Hodonín<br>
            Telefon: +420 773 577 899<br>
            Email: info@swbeauty.cz<br>
            Web: swbeauty.cz
          </p>
        </div>
      `,
    })

    if (clientError) {
      console.error('Client email error:', clientError)
      throw clientError
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json({ error: 'Failed to send booking' }, { status: 500 })
  }
}
