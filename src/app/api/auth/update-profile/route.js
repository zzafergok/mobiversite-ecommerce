/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { apiService } from '@/services/ecommerce/apiService'

export async function PATCH(request) {
  try {
    // Check if user is authenticated
    const cookieStore = cookies()
    const authToken = cookieStore.get('auth-token')

    if (!authToken) {
      return NextResponse.json({ message: 'Oturum açmanız gerekiyor' }, { status: 401 })
    }

    // Decode token to get user info
    let sessionData
    try {
      sessionData = JSON.parse(Buffer.from(authToken.value, 'base64').toString())
    } catch {
      return NextResponse.json({ message: 'Geçersiz oturum' }, { status: 401 })
    }
    const userData = await request.json()

    // Use API service

    // Get current user
    const currentUser = await apiService.getUserById(sessionData.userId)
    if (!currentUser) {
      return NextResponse.json({ message: 'Kullanıcı bulunamadı' }, { status: 404 })
    }

    // If email is being updated, check if it's already taken by another user
    if (userData.email && userData.email !== currentUser.email) {
      const emailExists = await apiService.checkEmailExists(userData.email)
      if (emailExists) {
        return NextResponse.json({ message: 'Bu email adresi zaten kullanılıyor' }, { status: 409 })
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userData.email)) {
        return NextResponse.json({ message: 'Geçerli bir email adresi giriniz' }, { status: 400 })
      }
    }

    // If username is being updated, check if it's already taken by another user
    if (userData.username && userData.username !== currentUser.username) {
      const usernameExists = await apiService.checkUsernameExists(userData.username)
      if (usernameExists) {
        return NextResponse.json({ message: 'Bu kullanıcı adı zaten kullanılıyor' }, { status: 409 })
      }
    }

    // Update user with partial data
    const updatedUser = await apiService.updateUserPartial(sessionData.userId, userData)

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser

    // Update auth token if username changed
    if (userData.username) {
      const newToken = Buffer.from(
        JSON.stringify({
          userId: updatedUser.id,
          username: updatedUser.username,
        }),
      ).toString('base64')

      cookieStore.set('auth-token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    return NextResponse.json({
      user: userWithoutPassword,
      message: 'Profil başarıyla güncellendi',
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ message: 'Profil güncellenirken bir hata oluştu' }, { status: 500 })
  }
}
