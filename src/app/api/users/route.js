import { NextResponse } from 'next/server'

// Static users data
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

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')
  const password = searchParams.get('password')
  const email = searchParams.get('email')

  // Filter by credentials
  if (username && password) {
    const user = users.find((u) => u.username === username && u.password === password)
    return NextResponse.json(user ? [user] : [])
  }

  // Filter by username
  if (username) {
    const filtered = users.filter((u) => u.username === username)
    return NextResponse.json(filtered)
  }

  // Filter by email
  if (email) {
    const filtered = users.filter((u) => u.email === email)
    return NextResponse.json(filtered)
  }

  return NextResponse.json(users)
}

export async function POST(request) {
  const userData = await request.json()
  const newUser = {
    id: String(users.length + 1),
    ...userData,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  return NextResponse.json(newUser)
}
