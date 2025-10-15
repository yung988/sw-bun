import { NextResponse } from 'next/server'

// Redirect legacy /kontakt page to the contact section on the homepage
export function GET() {
  return NextResponse.redirect('/#kontakt', 308)
}

export function HEAD() {
  return NextResponse.redirect('/#kontakt', 308)
}
