'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Heart, Star } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'

import useApiService from '@/hooks/useApiService'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Separator } from '@/components/core/separator'
import { Card, CardContent } from '@/components/core/card'

export default function CartPage() {
  const router = useRouter()
  const apiService = useApiService()
  const { isAuthenticated, user } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()

  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/cart')
      return
    }

    if (items.length === 0) {
      return
    }

    setLoading(true)

    try {
      const orderData = {
        userId: user.id,
        date: new Date().toISOString(),
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          category: item.category,
          image: item.image,
        })),
        total: getCartTotal(),
        status: 'completed',
      }

      await apiService.createOrder(orderData)
      clearCart()
      router.push('/profile/orders')
    } catch (error) {
      console.error('Order creation failed:', error)
      alert('Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleWishlist = (item) => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/cart')
      return
    }

    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist(item)
    }
  }

  if (items.length === 0) {
    return (
      <div className='min-h-screen pb-20 md:pb-0'>
        <div className='md:hidden bg-white border-b px-4 py-3 flex items-center'>
          <button onClick={() => router.push('/products')} className='mr-3'>
            <ArrowLeft size={20} className='text-gray-600' />
          </button>
          <h1 className='text-lg font-semibold'>Sepetim</h1>
        </div>

        <div className='px-2 py-8 text-center'>
          <div className='bg-white rounded-2xl p-8 shadow-sm max-w-sm mx-auto'>
            <ShoppingBag className='mx-auto h-16 w-16 text-orange-400 mb-4' />
            <h2 className='text-lg font-bold text-gray-900 mb-2'>Sepetiniz şu an boş</h2>
            <p className='text-gray-500 text-sm mb-6 leading-relaxed'>
              Sepetini fırsatlarla dolu dünyasından doldurman için ürünleri incelemeye başlayabilirsin.
            </p>
            <Button className='w-full bg-orange-500 hover:bg-orange-600' onClick={() => router.push('/products')}>
              Alışverişe Başla
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen pb-20 md:pb-0'>
      {/* Mobile Header */}
      <div className='md:hidden bg-white border-b px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center'>
          <button onClick={() => router.push('/products')} className='mr-3'>
            <ArrowLeft size={20} className='text-gray-600' />
          </button>
          <h1 className='text-lg font-semibold'>Sepetim</h1>
          <Badge variant='secondary' className='ml-2 text-xs px-2 py-1'>
            {items.length} ürün
          </Badge>
        </div>
        <Button variant='ghost' size='sm' onClick={clearCart} className='text-red-500 text-xs px-2'>
          Temizle
        </Button>
      </div>

      {/* Desktop Header */}
      <div className='hidden md:block bg-white border-b'>
        <div className='w-full px-4 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-bold text-gray-900'>Sepetim ({items.length} ürün)</h1>
            <Button variant='outline' onClick={clearCart} className='text-red-600 hover:text-red-700'>
              Sepeti Temizle
            </Button>
          </div>
        </div>
      </div>

      <div className='py-3 w-full px-0 md:px-4 md:py-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-2 px-2 md:px-0'>
            {items.map((item) => (
              <Card key={item.id} className='overflow-hidden'>
                <CardContent className='p-3'>
                  <div className='flex gap-3'>
                    {/* Product Image */}
                    <div className='relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-white rounded-lg p-1'>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className='object-contain'
                        sizes='(max-width: 768px) 64px, 80px'
                      />
                    </div>

                    {/* Product Details */}
                    <div className='flex-1 min-w-0'>
                      <h3
                        className='text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors line-clamp-2 mb-1 cursor-pointer'
                        onClick={() => router.push(`/products/${item.id}`)}
                      >
                        {item.title}
                      </h3>

                      {/* Rating and Category */}
                      <div className='flex items-center gap-2 mb-1'>
                        <div className='flex items-center'>
                          <Star size={10} className='text-yellow-400 fill-current' />
                          <Star size={10} className='text-yellow-400 fill-current' />
                          <Star size={10} className='text-yellow-400 fill-current' />
                          <Star size={10} className='text-yellow-400 fill-current' />
                          <Star size={10} className='text-gray-300' />
                          <span className='text-xs text-gray-500 ml-1'>(4.2)</span>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 mb-1'>
                        <Badge variant='secondary' size='sm' className='text-xs capitalize px-1.5 py-0.5'>
                          {item.category}
                        </Badge>
                        <span className='text-xs text-green-600 font-medium'>Stokta var</span>
                      </div>

                      {/* Price and Controls */}
                      <div className='flex items-center justify-between mt-2'>
                        <div>
                          <span className='text-lg font-bold text-gray-900'>${item.price}</span>
                          <span className='text-xs text-gray-500 ml-1'>KDV dahil</span>
                        </div>

                        <div className='flex items-center gap-1 md:gap-2'>
                          {/* Quantity Controls */}
                          <Card className='flex items-center border border-gray-200 rounded p-0 shadow-none bg-white'>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className='h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-gray-100'
                            >
                              <Minus size={12} className='md:w-4 md:h-4' />
                            </Button>
                            <span className='px-3 text-sm font-medium min-w-[2rem] text-center'>{item.quantity}</span>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className='h-7 w-7 md:h-8 md:w-8 p-0 hover:bg-gray-100'
                            >
                              <Plus size={12} className='md:w-4 md:h-4' />
                            </Button>
                          </Card>

                          {/* Action Buttons */}
                          {isAuthenticated && (
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => handleToggleWishlist(item)}
                              className={`h-7 w-7 md:h-8 md:w-8 p-0 transition-colors ${
                                isInWishlist(item.id)
                                  ? 'text-red-500 hover:text-red-600'
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                              title={isInWishlist(item.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                            >
                              <Heart
                                size={14}
                                className='md:w-4 md:h-4'
                                fill={isInWishlist(item.id) ? 'currentColor' : 'none'}
                              />
                            </Button>
                          )}
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => removeFromCart(item.id)}
                            className='h-7 w-7 md:h-8 md:w-8 p-0 text-gray-400 hover:text-red-500 transition-colors'
                            title='Sepetten çıkar'
                          >
                            <Trash2 size={14} className='md:w-4 md:h-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1 px-2 md:px-0'>
            <Card className='sticky top-4'>
              <CardContent className='p-4'>
                <h2 className='text-lg font-semibold text-gray-900 mb-3'>Sipariş Özeti</h2>

                <div className='space-y-2 text-sm mb-4'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Ürün Tutarı:</span>
                    <span className='font-medium'>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Kargo:</span>
                    <span className='font-medium text-green-600'>Ücretsiz</span>
                  </div>
                  <div className='flex justify-between items-center text-xs text-green-600 py-1'>
                    <span>🚚 Bugün kargoda</span>
                    <span>15:00'a kadar</span>
                  </div>
                  <Separator className='my-2' />
                  <div className='flex justify-between text-lg font-bold'>
                    <span>Toplam:</span>
                    <span className='text-orange-600'>${getCartTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 mb-3'
                >
                  {loading ? (
                    <div className='flex items-center justify-center space-x-2'>
                      <Badge
                        variant='outline'
                        className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin p-0 bg-transparent'
                      />
                      <span>İşleniyor...</span>
                    </div>
                  ) : (
                    'Sepeti Onayla'
                  )}
                </Button>

                <Button variant='outline' className='w-full mb-3' onClick={() => router.push('/products')}>
                  Alışverişe Devam Et
                </Button>

                {!isAuthenticated && (
                  <p className='text-xs text-gray-500 text-center leading-relaxed mb-3'>
                    Siparişi tamamlamak için giriş yapmanız gerekiyor.
                  </p>
                )}

                {/* Trust Indicators */}
                <div className='space-y-1 pt-3'>
                  <Separator />
                  <div className='flex items-center gap-2 text-xs text-gray-600'>
                    <span className='text-green-500'>✓</span>
                    <span>Güvenli ödeme</span>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-gray-600'>
                    <span className='text-green-500'>✓</span>
                    <span>Ücretsiz kargo</span>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-gray-600'>
                    <span className='text-green-500'>✓</span>
                    <span>14 gün değişim garantisi</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
