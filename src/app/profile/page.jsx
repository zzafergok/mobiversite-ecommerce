'use client'

import Link from 'next/link'

import { Heart, Package, Settings, User, Calendar, Mail, MapPin, Phone, Edit } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'
import { useWishlist } from '@/contexts/WishlistContext'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

export default function ProfilePage() {
  const { user } = useAuth()
  const { items: wishlistItems } = useWishlist()

  return (
    <div className='space-y-6 md:space-y-8'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-xl lg:text-2xl font-bold text-gray-900 mb-3'>Profil Bilgileri</h1>
        <p className='text-sm lg:text-base text-gray-600 leading-relaxed'>
          Hesap bilgilerinizi ve tercihlerinizi buradan yönetebilirsiniz.
        </p>
      </div>

      {/* User Info Card */}
      <Card className='overflow-hidden'>
        <CardContent className='p-5 lg:p-6'>
          <div className='flex flex-col sm:flex-row items-start space-y-5 sm:space-y-0 sm:space-x-6'>
            <div className='w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0'>
              <span className='text-lg lg:text-2xl font-bold text-blue-600'>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </span>
            </div>
            <div className='flex-1 w-full text-center sm:text-left'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5'>
                <h2 className='text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-0'>
                  {user?.firstName} {user?.lastName}
                </h2>
                <Button variant='outline' asChild size='sm'>
                  <Link href='/profile/edit' className='flex items-center gap-2'>
                    <Edit size={16} />
                    Profil Düzenle
                  </Link>
                </Button>
              </div>
              <div className='space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:gap-6'>
                <div className='flex items-center space-x-3 justify-center sm:justify-start'>
                  <Mail className='h-4 w-4 lg:h-5 lg:w-5 text-gray-400 flex-shrink-0' />
                  <div className='text-left min-w-0 flex-1'>
                    <p className='text-xs lg:text-sm text-gray-500'>E-posta</p>
                    <p className='text-sm lg:text-base text-gray-900 break-words overflow-hidden'>{user?.email}</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3 justify-center sm:justify-start'>
                  <User className='h-4 w-4 lg:h-5 lg:w-5 text-gray-400 flex-shrink-0' />
                  <div className='text-left min-w-0 flex-1'>
                    <p className='text-xs lg:text-sm text-gray-500'>Kullanıcı Adı</p>
                    <p className='text-sm lg:text-base text-gray-900'>{user?.username}</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3 justify-center sm:justify-start'>
                  <Phone className='h-4 w-4 lg:h-5 lg:w-5 text-gray-400 flex-shrink-0' />
                  <div className='text-left min-w-0 flex-1'>
                    <p className='text-xs lg:text-sm text-gray-500'>Telefon</p>
                    <p className='text-sm lg:text-base text-gray-900'>{user?.phone || 'Belirtilmemiş'}</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3 justify-center sm:justify-start'>
                  <MapPin className='h-4 w-4 lg:h-5 lg:w-5 text-gray-400 flex-shrink-0' />
                  <div className='text-left min-w-0 flex-1'>
                    <p className='text-xs lg:text-sm text-gray-500'>Adres</p>
                    <p className='text-sm lg:text-base text-gray-900 break-words'>
                      {user?.address
                        ? `${user.address.street}, ${user.address.city} ${user.address.zipcode}, ${user.address.country}`
                        : 'Belirtilmemiş'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-3 justify-center sm:justify-start'>
                  <Calendar className='h-4 w-4 lg:h-5 lg:w-5 text-gray-400 flex-shrink-0' />
                  <div className='text-left min-w-0 flex-1'>
                    <p className='text-xs lg:text-sm text-gray-500'>Üyelik Tarihi</p>
                    <p className='text-sm lg:text-base text-gray-900'>
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('tr-TR') : 'Belirtilmemiş'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center space-x-3 justify-center sm:justify-start'>
                  <Settings className='h-4 w-4 lg:h-5 lg:w-5 text-gray-400 flex-shrink-0' />
                  <div className='text-left min-w-0 flex-1'>
                    <p className='text-xs lg:text-sm text-gray-500'>API Ortamı</p>
                    <Badge variant='secondary' size='sm' className='mt-1'>
                      Production API
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6'>
        <Link href='/profile/wishlist' className='block'>
          <Card className='hover:shadow-md transition-shadow'>
            <CardContent className='p-5 lg:p-6'>
              <div className='flex items-center space-x-3 lg:space-x-4'>
                <div className='w-10 h-10 lg:w-12 lg:h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <Heart className='h-5 w-5 lg:h-6 lg:w-6 text-red-600' />
                </div>
                <div>
                  <p className='text-xl lg:text-2xl font-bold text-gray-900'>{wishlistItems.length}</p>
                  <p className='text-xs lg:text-sm text-gray-500'>Favori Ürün</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href='/profile/orders' className='block'>
          <Card className='hover:shadow-md transition-shadow'>
            <CardContent className='p-5 lg:p-6'>
              <div className='flex items-center space-x-3 lg:space-x-4'>
                <div className='w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <Package className='h-5 w-5 lg:h-6 lg:w-6 text-blue-600' />
                </div>
                <div>
                  <p className='text-xl lg:text-2xl font-bold text-gray-900'>0</p>
                  <p className='text-xs lg:text-sm text-gray-500'>Toplam Sipariş</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className='pb-4 lg:pb-4 pt-5 lg:pt-6'>
          <CardTitle className='text-base lg:text-lg'>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent className='pb-5 lg:pb-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4'>
            <Button variant='outline' asChild className='justify-start h-auto py-3 text-left min-h-[3rem]'>
              <Link href='/profile/wishlist' className='flex items-center'>
                <Heart className='h-4 w-4 mr-2 flex-shrink-0' />
                <span className='text-xs lg:text-sm text-left'>Favori Ürünlerimi Görüntüle</span>
              </Link>
            </Button>
            <Button variant='outline' asChild className='justify-start h-auto py-3 text-left min-h-[3rem]'>
              <Link href='/profile/orders' className='flex items-center'>
                <Package className='h-4 w-4 mr-2 flex-shrink-0' />
                <span className='text-xs lg:text-sm text-left'>Siparişlerimi Görüntüle</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
