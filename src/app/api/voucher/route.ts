import { checkRateLimit, formatResetTime, getClientIp } from '@/lib/rateLimit'
import { sanitizeEmail, sanitizeHtml, sanitizePhone } from '@/lib/sanitize'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

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
    const { name, email, phone, amount, customAmount, recipient, message } = body

    // Sanitizace všech vstupů
    const sanitizedName = sanitizeHtml(name || '')
    const sanitizedEmail = sanitizeEmail(email)
    const sanitizedPhone = sanitizePhone(phone)
    const sanitizedAmount = sanitizeHtml(amount || '')
    const sanitizedCustomAmount = customAmount ? sanitizeHtml(customAmount) : null
    const sanitizedRecipient = recipient ? sanitizeHtml(recipient) : null
    const sanitizedMessage = message ? sanitizeHtml(message) : null

    // Validace povinných polí po sanitizaci
    if (!sanitizedName || !sanitizedEmail || !sanitizedPhone || !sanitizedAmount) {
      return NextResponse.json({ error: 'Chybí povinné údaje' }, { status: 400 })
    }

    const finalAmount = sanitizedAmount === 'custom' ? sanitizedCustomAmount : sanitizedAmount

    console.log('Voucher order:', { name: sanitizedName, email: sanitizedEmail, amount: finalAmount })

    // Email pro majitelku salonu - používáme sanitizované hodnoty
    const { error: ownerError } = await resend.emails.send({
      from: 'SW Beauty Poukazy <poukazy@swbeauty.cz>',
      to: 'info@swbeauty.cz',
      subject: `🎁 Nová objednávka poukazu - ${finalAmount} Kč`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Nová objednávka dárkového poukazu</h2>
          
          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Hodnota poukazu</h3>
            <p style="margin: 5px 0; font-size: 24px; font-weight: bold; color: #0f172a;">${finalAmount} Kč</p>
            
            <h3 style="color: #334155; margin-top: 20px;">Kontaktní údaje objednatele</h3>
            <p style="margin: 5px 0;"><strong>Jméno:</strong> ${sanitizedName}</p>
            <p style="margin: 5px 0;"><strong>E‑mail:</strong> ${sanitizedEmail}</p>
            <p style="margin: 5px 0;"><strong>Telefon:</strong> ${sanitizedPhone}</p>
            
            ${
              sanitizedRecipient
                ? `
            <h3 style="color: #334155; margin-top: 20px;">Pro koho</h3>
            <p style="margin: 5px 0;">${sanitizedRecipient}</p>
            `
                : ''
            }
            
            ${
              sanitizedMessage
                ? `
            <h3 style="color: #334155; margin-top: 20px;">Věnování</h3>
            <p style="margin: 5px 0; font-style: italic;">${sanitizedMessage}</p>
            `
                : ''
            }
          </div>
          
          <p style="color: #64748b; font-size: 14px;">
            Kontaktujte prosím klienta pro platební údaje a domluvu vyzvednutí či doručení poukazu.
          </p>
        </div>
      `,
    })

    if (ownerError) {
      console.error('Owner email error:', ownerError)
      throw ownerError
    }

    // Potvrzovací email pro zákazníka - používáme sanitizované hodnoty
    const { error: clientError } = await resend.emails.send({
      from: 'SW Beauty <poukazy@swbeauty.cz>',
      to: sanitizedEmail,
      subject: '✅ Potvrzení objednávky poukazu – SW Beauty',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Děkujeme za objednávku!</h2>
          
          <p>Dobrý den ${sanitizedName},</p>
          
          <p>Vaše objednávka dárkového poukazu byla úspěšně přijata.</p>
          
          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Shrnutí objednávky</h3>
            <p style="margin: 5px 0;"><strong>Hodnota poukazu:</strong> ${finalAmount} Kč</p>
            ${sanitizedRecipient ? `<p style="margin: 5px 0;"><strong>Pro koho:</strong> ${sanitizedRecipient}</p>` : ''}
            ${sanitizedMessage ? `<p style="margin: 5px 0;"><strong>Věnování:</strong> ${sanitizedMessage}</p>` : ''}
          </div>
          
          <p>Brzy vás budeme kontaktovat s platebními údaji a podrobnostmi o vyzvednutí poukazu.</p>
          
          <div style="background: #fff7ed; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>💡 Tipy:</strong><br>
              • Platnost: 12 měsíců od data vystavení<br>
              • Použitelný na všechny služby SW Beauty<br>
              • Elegantní provedení s osobním věnováním
            </p>
          </div>
          
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

    console.log('✅ Voucher order email sent successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Voucher API error:', error)
    return NextResponse.json({ error: 'Nepodařilo se odeslat objednávku poukazu' }, { status: 500 })
  }
}
