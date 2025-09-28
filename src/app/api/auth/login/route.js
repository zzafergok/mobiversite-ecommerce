import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { apiService } from '@/services/ecommerce/apiService'

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ message: 'Kullanıcı adı ve şifre gerekli' }, { status: 400 })
    }

    // API'dan kullanıcıyı kontrol et
    const user = await apiService.getUserByCredentials(username, password)

    if (!user) {
      return NextResponse.json({ message: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 })
    }

    // Şifreyi response'dan kaldır
    const { password: _, ...userWithoutPassword } = user

    // JWT veya session token oluştur (basit bir örnek)
    const token = Buffer.from(JSON.stringify({ userId: user.id, username: user.username })).toString('base64')

    // Cookie'ye token'i kaydet
    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 gün
    })

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Giriş yapılırken bir hata oluştu' }, { status: 500 })
  }
}
