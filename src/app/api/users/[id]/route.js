import { NextResponse } from 'next/server'

// Static users data (should be shared, but keeping simple for now)
const users = [
  {
    id: '1',
    username: 'demo',
    password: 'demo123',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    createdAt: '2024-01-01T00:00:00.000Z',
  },
]

export async function GET(request, { params }) {
  const { id } = params
  const user = users.find((u) => u.id === id)

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(request, { params }) {
  const { id } = params
  const userData = await request.json()
  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  users[userIndex] = { ...users[userIndex], ...userData }
  return NextResponse.json(users[userIndex])
}

export async function PATCH(request, { params }) {
  const { id } = params
  const userData = await request.json()
  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  users[userIndex] = { ...users[userIndex], ...userData }
  return NextResponse.json(users[userIndex])
}
