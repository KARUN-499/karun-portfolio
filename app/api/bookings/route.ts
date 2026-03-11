import { NextRequest, NextResponse } from 'next/server'

// In-memory store for bookings (persists during server session)
// For production, connect to a real database like Supabase or MongoDB
const bookings: any[] = []

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
    return NextResponse.json({ success: true, id: booking.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
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
  try {
    const { id, status } = await req.json()
    const index = bookings.findIndex(b => b.id === id)
    if (index !== -1) {
      bookings[index].status = status
      return NextResponse.json({ success: true, booking: bookings[index] })
    }
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key')
  if (adminKey !== (process.env.ADMIN_KEY || 'karun2024admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const index = bookings.findIndex(b => b.id === id)
    if (index !== -1) {
      bookings.splice(index, 1)
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
