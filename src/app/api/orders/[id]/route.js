/* eslint-disable prefer-const */
import { NextResponse } from 'next/server'

// Static orders data (should be shared, but keeping simple for now)
let orders = []

export async function GET(request, { params }) {
  const { id } = params
  const order = orders.find((o) => o.id === id)

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  return NextResponse.json(order)
}
