import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()

    // Auth token cookie'sini sil
    cookieStore.delete('auth-token')

    return NextResponse.json({ message: 'Başarıyla çıkış yapıldı' })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ message: 'Çıkış yapılırken bir hata oluştu' }, { status: 500 })
  }
}
