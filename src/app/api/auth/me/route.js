import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { apiService } from '@/services/ecommerce/apiService'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Yetkisiz erişim' }, { status: 401 })
    }

    // Token'i decode et
    try {
      const decodedToken = JSON.parse(Buffer.from(token, 'base64').toString())

      // Kullanıcı bilgilerini al
      const user = await apiService.getUserById(decodedToken.userId)

      if (!user) {
        return NextResponse.json({ message: 'Kullanıcı bulunamadı' }, { status: 404 })
      }

      // Şifreyi response'dan kaldır
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json(userWithoutPassword)
    } catch (decodeError) {
      console.error('Token decode error:', decodeError)
      return NextResponse.json({ message: 'Geçersiz token' }, { status: 401 })
    }
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json({ message: 'Kullanıcı bilgileri alınırken bir hata oluştu' }, { status: 500 })
  }
}
