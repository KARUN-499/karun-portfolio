import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key')
    if (adminKey !== (process.env.ADMIN_KEY || 'karun2024admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json({ bookings, total: bookings.length })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const booking = await prisma.booking.create({
      data: {
        serviceId: body.serviceId,
        name: body.name,
        email: body.email,
        date: body.date,
        time: body.time,
        status: 'pending'
      }
    })
    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key')
    if (adminKey !== (process.env.ADMIN_KEY || 'karun2024admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    
    const body = await req.json()
    const booking = await prisma.booking.update({
      where: { id },
      data: body
    })
    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key')
    if (adminKey !== (process.env.ADMIN_KEY || 'karun2024admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    
    await prisma.booking.delete({
      where: { id }
    })
    return NextResponse.json({ message: 'Booking deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 })
  }
}
