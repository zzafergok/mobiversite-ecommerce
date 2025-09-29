/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { Button } from '@/components/core/button'
import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { Progress } from '@/components/core/progress'
import { Eye, EyeOff, User, Mail, Phone, MapPin, ArrowLeft, ArrowRight, Check } from 'lucide-react'

const STEPS = [
  {
    id: 'firstName',
    title: 'Adınız',
    label: 'Ad',
    placeholder: 'Adınızı girin',
    type: 'text',
    icon: User,
    required: true,
    validation: (value) => {
      if (!value.trim()) return 'Ad gereklidir'
      if (value.length < 2) return 'Ad en az 2 karakter olmalıdır'
      return null
    },
  },
  {
    id: 'lastName',
    title: 'Soyadınız',
    label: 'Soyad',
    placeholder: 'Soyadınızı girin',
    type: 'text',
    icon: User,
    required: true,
    validation: (value) => {
      if (!value.trim()) return 'Soyad gereklidir'
      if (value.length < 2) return 'Soyad en az 2 karakter olmalıdır'
      return null
    },
  },
  {
    id: 'username',
    title: 'Kullanıcı Adı',
    label: 'Kullanıcı Adı',
    placeholder: 'Kullanıcı adınızı girin',
    type: 'text',
    icon: User,
    required: true,
    validation: (value) => {
      if (!value.trim()) return 'Kullanıcı adı gereklidir'
      if (value.length < 3) return 'Kullanıcı adı en az 3 karakter olmalıdır'
      return null
    },
  },
  {
    id: 'email',
    title: 'E-posta Adresiniz',
    label: 'E-posta',
    placeholder: 'email@example.com',
    type: 'email',
    icon: Mail,
    required: true,
    validation: (value) => {
      if (!value.trim()) return 'Email gereklidir'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Geçerli bir email adresi giriniz'
      return null
    },
  },
  {
    id: 'password',
    title: 'Şifreniz',
    label: 'Şifre',
    placeholder: '••••••••',
    type: 'password',
    icon: Eye,
    required: true,
    validation: (value) => {
      if (!value) return 'Şifre gereklidir'
      if (value.length < 6) return 'Şifre en az 6 karakter olmalıdır'
      return null
    },
  },
  {
    id: 'confirmPassword',
    title: 'Şifrenizi Onaylayın',
    label: 'Şifre Tekrarı',
    placeholder: '••••••••',
    type: 'password',
    icon: Eye,
    required: true,
    validation: (value, formData) => {
      if (!value) return 'Şifre tekrarı gereklidir'
      if (value !== formData.password) return 'Şifreler eşleşmiyor'
      return null
    },
  },
  {
    id: 'phone',
    title: 'Telefon Numaranız',
    label: 'Telefon',
    placeholder: '+90 555 123 4567',
    type: 'tel',
    icon: Phone,
    required: false,
    validation: () => null,
  },
  {
    id: 'address.street',
    title: 'Adres Bilginiz',
    label: 'Sokak/Cadde',
    placeholder: 'Sokak/Cadde adresiniz',
    type: 'text',
    icon: MapPin,
    required: false,
    validation: () => null,
  },
  {
    id: 'address.city',
    title: 'Şehriniz',
    label: 'Şehir',
    placeholder: 'İstanbul',
    type: 'text',
    icon: MapPin,
    required: false,
    validation: () => null,
  },
  {
    id: 'address.zipcode',
    title: 'Posta Kodunuz',
    label: 'Posta Kodu',
    placeholder: '34000',
    type: 'text',
    icon: MapPin,
    required: false,
    validation: () => null,
  },
]

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const { showSuccess, showError } = useToast()

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
      country: 'Turkey',
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [currentError, setCurrentError] = useState('')

  const getCurrentValue = () => {
    const step = STEPS[currentStep]
    if (step.id.includes('.')) {
      const [parent, child] = step.id.split('.')
      return formData[parent][child]
    }
    return formData[step.id]
  }

  const handleInputChange = (value) => {
    const step = STEPS[currentStep]

    if (step.id.includes('.')) {
      const [parent, child] = step.id.split('.')
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [step.id]: value,
      }))
    }

    setCurrentError('')
  }

  const validateCurrentStep = () => {
    const step = STEPS[currentStep]
    const currentValue = getCurrentValue()
    const error = step.validation(currentValue, formData)

    setCurrentError(error || '')
    return !error
  }

  const handleNext = () => {
    if (!validateCurrentStep()) return

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setCurrentError('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleNext()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const { confirmPassword, ...registerData } = formData
      const result = await register(registerData)

      if (result.success) {
        showSuccess(result.message || 'Kayıt başarılı! Hoş geldiniz!')
        router.push('/profile')
      } else {
        showError(result.error || 'Kayıt işlemi başarısız')
      }
    } catch (error) {
      console.error('Register error:', error)
      showError('Kayıt işlemi sırasında bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const currentStepData = STEPS[currentStep]
  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100
  const Icon = currentStepData.icon

  return (
    <div className='min-h-auto flex items-center justify-center xs:pt-12 md:pt-28 px-4 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80'>
        <CardHeader className='text-center pb-6'>
          <CardTitle className='text-2xl font-bold bg-gradient-to-r from-gray-600 to-purple-600 bg-clip-text text-transparent'>
            Hesap Oluştur
          </CardTitle>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>Mobiversite E-Commerce'e katılın</p>

          {/* Progress Bar */}
          <div className='mt-6 space-y-2'>
            <div className='flex justify-between text-xs text-gray-500'>
              <span>Adım {currentStep + 1}</span>
              <span>{STEPS.length} adımdan</span>
            </div>
            <Progress value={progressPercentage} className='h-2' />
          </div>
        </CardHeader>

        <CardContent className='space-y-6'>
          {/* Current Step */}
          <div className='text-center space-y-4'>
            <div className='mx-auto w-16 h-16 bg-gradient-to-br from-gray-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg'>
              <Icon className='w-8 h-8 text-white' />
            </div>

            <div className='space-y-2'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{currentStepData.title}</h3>
              {currentStepData.required && <p className='text-sm text-gray-500'>Bu alan zorunludur</p>}
            </div>
          </div>

          {/* Input Field */}
          <div className='space-y-4'>
            <Label htmlFor='currentInput' className='sr-only'>
              {currentStepData.label}
            </Label>

            <div className='relative'>
              <Input
                id='currentInput'
                type={currentStepData.type === 'password' && showPassword ? 'text' : currentStepData.type}
                value={getCurrentValue()}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={currentStepData.placeholder}
                className={`text-lg h-14 text-center ${currentError ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-gray-500'} transition-all duration-200`}
                autoComplete='off'
                autoFocus
              />

              {currentStepData.type === 'password' && (
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>

            {/* Error Message */}
            {currentError && (
              <div className='text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200 animate-in slide-in-from-top-2 duration-200'>
                {currentError}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className='flex gap-3 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={handlePrev}
              disabled={currentStep === 0}
              className='flex-1 h-12 transition-all duration-200'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Geri
            </Button>

            <Button
              type='button'
              onClick={handleNext}
              disabled={loading}
              className='flex-1 h-12 bg-gradient-to-r from-gray-600 to-purple-600 hover:from-gray-700 hover:to-purple-700 transition-all duration-200'
            >
              {loading ? (
                'Kayıt Yapılıyor...'
              ) : currentStep === STEPS.length - 1 ? (
                <>
                  <Check className='w-4 h-4 mr-2' />
                  Tamamla
                </>
              ) : (
                <>
                  İleri
                  <ArrowRight className='w-4 h-4 ml-2' />
                </>
              )}
            </Button>
          </div>

          {/* Step Indicators */}
          <div className='flex justify-center space-x-2 pt-4'>
            {STEPS.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-gradient-to-r from-gray-500 to-purple-600' : 'bg-gray-200 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Login Link */}
          <div className='text-center text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700'>
            Zaten hesabınız var mı?{' '}
            <Link href='/login' className='text-gray-600 hover:text-gray-700 font-medium transition-colors'>
              Giriş Yapın
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
