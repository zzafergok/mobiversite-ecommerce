/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { apiService } from '@/services/ecommerce/apiService'

export async function POST(request) {
  try {
    const userData = await request.json()

    // Basic validation
    if (!userData.username || !userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      return NextResponse.json({ message: 'Tüm alanlar doldurulmalıdır' }, { status: 400 })
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) {
      return NextResponse.json({ message: 'Geçerli bir email adresi giriniz' }, { status: 400 })
    }

    // Check if username already exists
    const usernameExists = await apiService.checkUsernameExists(userData.username)
    if (usernameExists) {
      return NextResponse.json({ message: 'Bu kullanıcı adı zaten kullanılıyor' }, { status: 409 })
    }

    // Check if email already exists
    const emailExists = await apiService.checkEmailExists(userData.email)
    if (emailExists) {
      return NextResponse.json({ message: 'Bu email adresi zaten kullanılıyor' }, { status: 409 })
    }

    // Create new user
    const newUser = await apiService.createUser(userData)

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser

    // Set auth token cookie
    const token = Buffer.from(
      JSON.stringify({
        userId: newUser.id,
        username: newUser.username,
      }),
    ).toString('base64')

    const cookieStore = cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json(
      {
        user: userWithoutPassword,
        message: 'Hesap başarıyla oluşturuldu! Hoş geldiniz!',
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ message: 'Kayıt işlemi sırasında bir hata oluştu' }, { status: 500 })
  }
}
