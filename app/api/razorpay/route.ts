import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: 'Payment integration not configured' },
    { status: 501 }
  )
}
