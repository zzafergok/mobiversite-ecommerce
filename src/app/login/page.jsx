'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { useState, useEffect, Suspense } from 'react'

import { Eye, EyeOff, User, Lock } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'

import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Button } from '@/components/core/button'
import { Separator } from '@/components/core/separator'
import { Card, CardContent } from '@/components/core/card'
import { Alert, AlertDescription } from '@/components/core/alert'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isAuthenticated } = useAuth()
  const redirectTo = searchParams.get('redirect') || '/'

  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, router, redirectTo])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(formData)

      if (result.success) {
        router.push(redirectTo)
      } else {
        setError(result.error || 'Giriş yapılırken bir hata oluştu')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Giriş yapılırken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setFormData({
      username: 'zafergok',
      password: '123123',
    })
  }

  return (
    <div className='min-h-auto flex items-center justify-center dark:bg-gray-900 xs:pt-12 md:pt-28 px-4 sm:px-6 lg:px-8'>
      <Card className='max-w-md w-full'>
        <CardContent className='space-y-8 p-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white'>
              Hesabınıza Giriş Yapın
            </h2>
            <p className='mt-2 text-center text-sm text-gray-600 dark:text-gray-400'>
              Veya{' '}
              <span
                className='font-medium text-gray-600 hover:text-gray-500 cursor-pointer'
                onClick={() => router.push('/')}
              >
                misafir olarak devam edin
              </span>
            </p>
          </div>

          <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
            <div className='rounded-md shadow-sm space-y-4'>
              <div>
                <Label htmlFor='username' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Kullanıcı Adı
                </Label>
                <Input
                  id='username'
                  name='username'
                  type='text'
                  required
                  value={formData.username}
                  onChange={handleChange}
                  startIcon={<User className='h-5 w-5' />}
                  placeholder='Kullanıcı adınızı girin'
                  className='w-full'
                />
              </div>

              <div>
                <Label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Şifre
                </Label>
                <Input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  startIcon={<Lock className='h-5 w-5' />}
                  endIcon={
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => setShowPassword(!showPassword)}
                      className='h-auto p-0 hover:bg-transparent'
                    >
                      {showPassword ? (
                        <EyeOff className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                      ) : (
                        <Eye className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                      )}
                    </Button>
                  }
                  placeholder='Şifrenizi girin'
                  className='w-full'
                />
              </div>
            </div>

            {error && (
              <Alert variant='destructive'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div>
              <Button
                type='submit'
                disabled={loading}
                className='w-full bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className='pt-4'>
                <Separator className='mb-4' />
                <Button
                  type='button'
                  variant='ghost'
                  onClick={fillDemoCredentials}
                  className='w-full text-gray-600 hover:text-gray-500'
                >
                  Demo hesap bilgilerini kullan
                </Button>
                <p className='mt-2 text-xs text-gray-500 dark:text-gray-400 text-center'>
                  Demo: Kullanıcı adı: zafergok, Şifre: 123123
                </p>
              </div>
            )}

            <div className='text-center text-sm text-gray-600 dark:text-gray-400 pt-4 border-t'>
              Hesabınız yok mu?{' '}
              <Link href='/register' className='text-gray-600 hover:text-gray-700 font-medium'>
                Hesap Oluşturun
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className='min-h-screen flex items-center justify-center'>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
