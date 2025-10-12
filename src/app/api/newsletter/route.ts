import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { checkRateLimit, getClientIp, formatResetTime } from '@/lib/rateLimit'
import { sanitizeEmail } from '@/lib/sanitize'

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
    // Kontrola rate limiting (10 požadavků za hodinu na IP pro newsletter)
    const clientIp = getClientIp(request)
    const rateLimitResult = checkRateLimit(clientIp, 10, 60 * 60 * 1000)

    if (!rateLimitResult.success) {
      const resetTimeStr = rateLimitResult.resetTime ? formatResetTime(rateLimitResult.resetTime) : 'za chvíli'

      console.warn(`Rate limit exceeded for newsletter IP: ${clientIp}`)

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
    const { email } = body

    // Sanitizace emailu
    const sanitizedEmail = sanitizeEmail(email)

    // Validace emailu
    if (!sanitizedEmail) {
      return NextResponse.json({ error: 'Zadejte prosím platný email' }, { status: 400 })
    }

    console.log('Newsletter subscription:', { email: sanitizedEmail })

    // Email pro majitelku salonu - nový odběratel newsletteru
    const { error: ownerError } = await resend.emails.send({
      from: 'SW Beauty Newsletter <newsletter@swbeauty.cz>',
      to: 'info@swbeauty.cz',
      subject: `📰 Nový odběratel newsletteru`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Nový odběratel newsletteru</h2>

          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Kontaktní údaje</h3>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
            <p style="margin: 5px 0;"><strong>Datum přihlášení:</strong> ${new Date().toLocaleDateString('cs-CZ')}</p>
          </div>

          <p style="color: #64748b; font-size: 14px;">
            Nový odběratel se přihlásil k odběru. Můžete mu poslat uvítací e‑mail se slevou 10 %.
          </p>
        </div>
      `,
    })

    if (ownerError) {
      console.error('Owner newsletter email error:', ownerError)
      throw ownerError
    }

    // Potvrzovací email pro odběratele
    const { error: subscriberError } = await resend.emails.send({
      from: 'SW Beauty <newsletter@swbeauty.cz>',
      to: sanitizedEmail,
      subject: '🎉 Vítejte v newsletteru SW Beauty!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Vítejte v našem newsletteru!</h2>

          <p>Dobrý den,</p>

          <p>Děkujeme za přihlášení k odběru. Budeme vás pravidelně informovat o:</p>

          <ul style="color: #334155; margin: 20px 0;">
            <li>nových službách a produktech,</li>
            <li>akčních nabídkách a slevách,</li>
            <li>tamhle tipy na péči o pleť a tělo,</li>
            <li>novinkách ze světa krásy.</li>
          </ul>

          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">🎁 Speciální uvítací sleva</h3>
            <p style="margin: 5px 0; font-size: 18px; font-weight: bold; color: #0f172a;">10 % sleva na první ošetření</p>
            <p style="margin: 5px 0;">Při první návštěvě ukažte tento e‑mail a získejte slevu 10 % na jakékoli ošetření.</p>
          </div>

          <p>Sledujte nás také na sociálních sítích pro další tipy a inspiraci.</p>

          <p style="margin-top: 30px;">S pozdravem,<br><strong>Tým SW Beauty</strong></p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">

          <p style="color: #64748b; font-size: 12px;">
            SW Beauty s.r.o.<br>
            U Cihelny 1326/2, 695 01 Hodonín<br>
            Telefon: +420 773 577 899<br>
            E‑mail: info@swbeauty.cz<br>
            Web: swbeauty.cz
          </p>

          <p style="color: #64748b; font-size: 11px; margin-top: 20px;">
            Pokud již nechcete dostávat newsletter, můžete se kdykoli odhlásit odpovědí na tento e‑mail.
          </p>
        </div>
      `,
    })

    if (subscriberError) {
      console.error('Subscriber newsletter email error:', subscriberError)
      // Don't throw - owner email was sent successfully
    }

    console.log('✅ Newsletter subscription email sent successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Newsletter API error:', error)
    return NextResponse.json({ error: 'Nepodařilo se přihlásit k odběru newsletteru' }, { status: 500 })
  }
}
