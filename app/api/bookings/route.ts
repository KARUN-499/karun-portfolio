import { NextRequest, NextResponse } from 'next/server'

// In-memory store for bookings (persists during server session)
// For production, connect to a real database like Supabase or MongoDB
const bookings: Record<string, unknown>[] = []

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const booking = {
      id: Date.now().toString(),
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    bookings.push(booking)
    console.log('New booking:', booking)
    return NextResponse.json({ success: true, id: booking.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Simple admin key protection
  const adminKey = req.headers.get('x-admin-key')
  if (adminKey !== (process.env.ADMIN_KEY || 'karun2024admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ bookings, total: bookings.length })
}

export async function PATCH(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key')
  if (adminKey !== (process.env.ADMIN_KEY || 'karun2024admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id, status } = await req.json()
  const booking = bookings.find(b => b.id === id)
  if (booking) booking.status = status
  return NextResponse.json({ success: true })
}
