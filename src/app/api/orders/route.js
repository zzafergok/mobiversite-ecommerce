/* eslint-disable prefer-const */
import { NextResponse } from 'next/server'

// Static orders data
let orders = []

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (userId) {
    const filtered = orders.filter((order) => order.userId === userId)
    return NextResponse.json(filtered)
  }

  return NextResponse.json(orders)
}

export async function POST(request) {
  const orderData = await request.json()
  const newOrder = {
    id: String(orders.length + 1),
    ...orderData,
    createdAt: new Date().toISOString(),
  }
  orders.push(newOrder)
  return NextResponse.json(newOrder)
}
