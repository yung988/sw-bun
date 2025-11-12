import { getAllServices } from '@/lib/services'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const services = await getAllServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error('Error loading services:', error)
    return NextResponse.json({ error: 'Nepodařilo se načíst služby' }, { status: 500 })
  }
}


