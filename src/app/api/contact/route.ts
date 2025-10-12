import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit, getClientIp, formatResetTime } from '@/lib/rateLimit'
import { sanitizeHtml, sanitizeEmail, sanitizePhone } from '@/lib/sanitize'

// Inicializace Resend pouze pokud API klíč existuje
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
    // Kontrola rate limiting (5 požadavků za hodinu na IP)
    const clientIp = getClientIp(request)
    const rateLimitResult = checkRateLimit(clientIp, 5, 60 * 60 * 1000)

    if (!rateLimitResult.success) {
      const resetTimeStr = rateLimitResult.resetTime ? formatResetTime(rateLimitResult.resetTime) : 'za chvíli'

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
      return NextResponse.json({ error: 'Služba odesílání emailů není nakonfigurována' }, { status: 500 })
    }

    const body = await request.json()
    const { name, email, phone, message } = body

    // Sanitizace všech vstupů
    const sanitizedName = sanitizeHtml(name || '')
    const sanitizedEmail = sanitizeEmail(email)
    const sanitizedPhone = phone ? sanitizePhone(phone) : null
    const sanitizedMessage = sanitizeHtml(message || '')

    // Validace povinných polí po sanitizaci
    if (!sanitizedName || !sanitizedEmail || !sanitizedMessage) {
      return NextResponse.json({ error: 'Chybí povinné údaje' }, { status: 400 })
    }

    console.log('Contact form submission:', { name: sanitizedName, email: sanitizedEmail })

    // Email pro majitelku salonu - používáme sanitizované hodnoty
    const { error: ownerError } = await resend.emails.send({
      from: 'SW Beauty Kontakt <kontakt@swbeauty.cz>',
      to: 'info@swbeauty.cz',
      subject: `💬 Nová zpráva z webu - ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Nová zpráva z kontaktního formuláře</h2>
          
          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Kontaktní údaje</h3>
            <p style="margin: 5px 0;"><strong>Jméno:</strong> ${sanitizedName}</p>
            <p style="margin: 5px 0;"><strong>E‑mail:</strong> ${sanitizedEmail}</p>
            ${sanitizedPhone ? `<p style="margin: 5px 0;"><strong>Telefon:</strong> ${sanitizedPhone}</p>` : ''}
            
            <h3 style="color: #334155; margin-top: 20px;">Zpráva</h3>
            <p style="margin: 5px 0; white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
          
          <p style="color: #64748b; font-size: 14px;">
            Odpovězte prosím klientovi co nejdříve na e‑mail nebo telefon.
          </p>
        </div>
      `,
    })

    if (ownerError) {
      console.error('Owner email error:', ownerError)
      throw ownerError
    }

    // Potvrzovací email pro odesílatele - používáme sanitizované hodnoty
    const { error: clientError } = await resend.emails.send({
      from: 'SW Beauty <kontakt@swbeauty.cz>',
      to: sanitizedEmail,
      subject: '✅ Děkujeme za vaši zprávu – SW Beauty',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Děkujeme za vaši zprávu!</h2>
          
          <p>Dobrý den ${sanitizedName},</p>
          
          <p>Vaše zpráva byla úspěšně odeslána. Ozveme se vám co nejdříve.</p>
          
          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0; color: #64748b; font-size: 14px;"><strong>Vaše zpráva:</strong></p>
            <p style="margin: 10px 0 0 0; white-space: pre-wrap;">${sanitizedMessage}</p>
          </div>
          
          <p>V případě potřeby nás můžete kontaktovat i telefonicky.</p>
          
          <p style="margin-top: 30px;">S pozdravem,<br><strong>Tým SW Beauty</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #64748b; font-size: 12px;">
            SW Beauty s.r.o.<br>
            U Cihelny 1326/2, 695 01 Hodonín<br>
            Telefon: +420 773 577 899<br>
            E‑mail: info@swbeauty.cz<br>
            Web: swbeauty.cz
          </p>
        </div>
      `,
    })

    if (clientError) {
      console.error('Client email error:', clientError)
      // Don't throw - owner email was sent successfully
    }

    console.log('✅ Contact form email sent successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Contact API error:', error)
    return NextResponse.json({ error: 'Nepodařilo se odeslat zprávu' }, { status: 500 })
  }
}
