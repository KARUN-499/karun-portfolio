import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
})

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR' } = await req.json()
    
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency,
      receipt: `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)
    return NextResponse.json({ orderId: order.id }, { status: 200 })
  } catch (error) {
    console.error('Razorpay Error:', error)
    return NextResponse.json({ error: 'Order creation failed' }, { status: 500 })
  }
}
