'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'
import { useFormChanges } from '@/hooks/useFormChanges'
import { Button } from '@/components/core/button'
import { Input } from '@/components/core/input'
import { Label } from '@/components/core/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'
import { ArrowLeft, User, Mail, MapPin, Save } from 'lucide-react'

export default function ProfileEditPage() {
  const router = useRouter()
  const { user, updateProfile, isAuthenticated, loading: authLoading } = useAuth()
  const { showSuccess, showError, showInfo } = useToast()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
      country: 'Turkey',
    },
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [initialFormData, setInitialFormData] = useState(null)

  // Form değişikliklerini takip et
  const { hasChanges, getChangedData } = useFormChanges(
    initialFormData,
    formData,
    [], // Hariç tutulacak alanlar (opsiyonel)
  )

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      return
    }
  }, [authLoading, isAuthenticated, router])

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      const userData = {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          zipcode: user.address?.zipcode || '',
          country: user.address?.country || 'Turkey',
        },
      }
      setFormData(userData)
      setInitialFormData(userData) // Initial data'yı da set et
    }
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Ad gereklidir'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Soyad gereklidir'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email gereklidir'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir email adresi giriniz'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Değişiklik kontrolü
    if (!hasChanges) {
      showInfo('Herhangi bir değişiklik yapılmadı')
      return
    }

    setLoading(true)

    try {
      // Sadece değişen alanları gönder
      const changedData = getChangedData()
      const result = await updateProfile(changedData)

      if (result.success) {
        showSuccess(result.message || 'Profil başarıyla güncellendi!')
        // Initial data'yı güncellenmiş data ile senkronize et
        setInitialFormData(formData)
        router.push('/profile')
      } else {
        showError(result.error || 'Profil güncellenirken bir hata oluştu')
      }
    } catch (error) {
      console.error('Update profile error:', error)
      showError('Profil güncellenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    )
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      {/* Header */}
      <div className='mb-6'>
        <Button
          variant='ghost'
          className='mb-4 p-0 h-auto text-blue-600 hover:text-blue-700'
          onClick={() => router.push('/profile')}
        >
          <div className='inline-flex items-center gap-2'>
            <ArrowLeft size={20} />
            Profil'e Geri Dön
          </div>
        </Button>

        <h1 className='text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2'>Profil Düzenle</h1>
        <p className='text-gray-600 dark:text-gray-400'>Hesap bilgilerinizi güncelleyebilirsiniz</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User size={24} />
            Kişisel Bilgiler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Personal Information */}
            <div className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='firstName'>Ad *</Label>
                  <Input
                    id='firstName'
                    name='firstName'
                    type='text'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? 'border-red-500' : ''}
                    placeholder='Adınız'
                  />
                  {errors.firstName && <p className='text-sm text-red-500 mt-1'>{errors.firstName}</p>}
                </div>

                <div>
                  <Label htmlFor='lastName'>Soyad *</Label>
                  <Input
                    id='lastName'
                    name='lastName'
                    type='text'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? 'border-red-500' : ''}
                    placeholder='Soyadınız'
                  />
                  {errors.lastName && <p className='text-sm text-red-500 mt-1'>{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold flex items-center gap-2 border-t pt-4'>
                <Mail size={20} />
                İletişim Bilgileri
              </h3>

              <div>
                <Label htmlFor='email'>Email *</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder='email@example.com'
                />
                {errors.email && <p className='text-sm text-red-500 mt-1'>{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor='phone'>Telefon</Label>
                <Input
                  id='phone'
                  name='phone'
                  type='tel'
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder='+90 555 123 4567'
                />
              </div>
            </div>

            {/* Address Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold flex items-center gap-2 border-t pt-4'>
                <MapPin size={20} />
                Adres Bilgileri
              </h3>

              <div>
                <Label htmlFor='address.street'>Sokak/Cadde</Label>
                <Input
                  id='address.street'
                  name='address.street'
                  type='text'
                  value={formData.address.street}
                  onChange={handleInputChange}
                  placeholder='Sokak/Cadde adresiniz'
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div>
                  <Label htmlFor='address.city'>Şehir</Label>
                  <Input
                    id='address.city'
                    name='address.city'
                    type='text'
                    value={formData.address.city}
                    onChange={handleInputChange}
                    placeholder='İstanbul'
                  />
                </div>

                <div>
                  <Label htmlFor='address.zipcode'>Posta Kodu</Label>
                  <Input
                    id='address.zipcode'
                    name='address.zipcode'
                    type='text'
                    value={formData.address.zipcode}
                    onChange={handleInputChange}
                    placeholder='34000'
                  />
                </div>

                <div>
                  <Label htmlFor='address.country'>Ülke</Label>
                  <Input
                    id='address.country'
                    name='address.country'
                    type='text'
                    value={formData.address.country}
                    onChange={handleInputChange}
                    placeholder='Turkey'
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 pt-6 border-t'>
              <Button
                type='submit'
                className='flex-1 gap-2'
                disabled={loading || !hasChanges}
                variant={hasChanges ? 'default' : 'secondary'}
              >
                <Save size={20} />
                {loading ? 'Kaydediliyor...' : hasChanges ? 'Değişiklikleri Kaydet' : 'Değişiklik Yok'}
              </Button>

              <Button type='button' variant='outline' onClick={() => router.push('/profile')} className='flex-1'>
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
