import { NextResponse } from 'next/server'
import { Resend } from 'resend'

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
    const resend = getResend()
    if (!resend) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const body = await request.json()
    const { service, name, email, phone, preferredDate, preferredTime, message } = body

    // Email pro klientku (majitelku)
    const { error: ownerError } = await resend.emails.send({
      from: 'SW Beauty Rezervace <rezervace@swbeauty.cz>',
      to: 'info@swbeauty.cz',
      subject: `🗓️ Nová rezervace - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Nová rezervace</h2>
          
          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Služba</h3>
            <p style="margin: 5px 0;"><strong>${service}</strong></p>
            
            <h3 style="color: #334155;">Preferovaný termín</h3>
            <p style="margin: 5px 0;"><strong>${new Date(preferredDate).toLocaleDateString('cs-CZ')} v ${preferredTime}</strong></p>
            
            <h3 style="color: #334155;">Kontaktní údaje</h3>
            <p style="margin: 5px 0;">Jméno: <strong>${name}</strong></p>
            <p style="margin: 5px 0;">Email: <strong>${email}</strong></p>
            <p style="margin: 5px 0;">Telefon: <strong>${phone}</strong></p>
            
            ${
              message
                ? `
            <h3 style="color: #334155;">Poznámka</h3>
            <p style="margin: 5px 0;">${message}</p>
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

    // Potvrzovací email pro klienta
    const { error: clientError } = await resend.emails.send({
      from: 'SW Beauty <rezervace@swbeauty.cz>',
      to: email,
      subject: '✅ Potvrzení rezervace - SW Beauty',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Děkujeme za Vaši rezervaci!</h2>
          
          <p>Dobrý den ${name},</p>
          
          <p>Vaše nezávazná poptávka na ošetření byla úspěšně odeslána.</p>
          
          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Shrnutí rezervace</h3>
            <p style="margin: 5px 0;"><strong>Služba:</strong> ${service}</p>
            <p style="margin: 5px 0;"><strong>Preferovaný termín:</strong> ${new Date(preferredDate).toLocaleDateString('cs-CZ')} v ${preferredTime}</p>
          </div>
          
          <p>Budeme Vás kontaktovat do 24 hodin pro potvrzení termínu na emailu nebo telefonu.</p>
          
          <p style="margin-top: 30px;">S pozdravem,<br><strong>Tým SW Beauty</strong></p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #64748b; font-size: 12px;">
            SW Beauty Salon<br>
            Telefon: +420 123 456 789<br>
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
