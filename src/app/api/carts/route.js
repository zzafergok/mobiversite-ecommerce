/* eslint-disable prefer-const */
import { NextResponse } from 'next/server'

// Static carts data
let carts = []

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')

  if (userId) {
    const filtered = carts.filter((cart) => cart.userId === userId)
    return NextResponse.json(filtered)
  }

  return NextResponse.json(carts)
}

export async function POST(request) {
  const cartData = await request.json()
  const newCart = {
    id: String(carts.length + 1),
    ...cartData,
    timestamp: cartData.timestamp || Date.now(),
  }
  carts.push(newCart)
  return NextResponse.json(newCart)
}
