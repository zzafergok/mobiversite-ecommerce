'use client'

import { useState, useRef, useCallback } from 'react'
import { useToast } from '@/contexts/ToastContext'
import { X, CheckCircle, AlertCircle, Info, ShoppingCart, Heart, Trash2, Pause } from 'lucide-react'
import { Button } from '@/components/core/button'
import { Card } from '@/components/core/card'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useAuth } from '@/contexts/AuthContext'

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  cart: ShoppingCart,
  'remove-cart': Trash2,
}

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
  cart: 'bg-orange-50 border-orange-200 text-orange-800',
  'remove-cart': 'bg-red-50 border-red-200 text-red-800',
}

function Toast({ toast, onRemove }) {
  const router = useRouter()
  const { getCartItemsCount } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()
  const { pauseToast, resumeToast } = useToast()
  const Icon = toastIcons[toast.type]

  const [startTime] = useState(Date.now())
  const [isHovered, setIsHovered] = useState(false)
  const remainingTimeRef = useRef(toast.duration)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    // Calculate remaining time when hover starts
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, toast.duration - elapsed)
    remainingTimeRef.current = remaining
    pauseToast(toast.id)
  }, [toast.id, toast.duration, startTime, pauseToast])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    // Resume with remaining time when hover ends
    if (remainingTimeRef.current > 0) {
      resumeToast(toast.id, remainingTimeRef.current)
    }
  }, [toast.id, resumeToast])

  const handleViewCart = () => {
    router.push('/cart')
    onRemove(toast.id)
  }

  const handleViewProduct = () => {
    router.push(`/products/${toast.product.id}`)
    onRemove(toast.id)
  }

  const handleAddToWishlist = () => {
    if (isAuthenticated && !isInWishlist(toast.product.id)) {
      addToWishlist(toast.product)
    }
    onRemove(toast.id)
  }

  if (toast.type === 'cart') {
    return (
      <Card
        className={`p-4 w-full max-w-md shadow-lg border-2 ${toastStyles[toast.type]} animate-in toast-hover transition-all duration-200 ${isHovered ? 'scale-[1.02] shadow-xl' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='flex items-start space-x-3'>
          {/* Pause indicator */}
          {isHovered && (
            <div className='absolute top-2 left-2 bg-black/60 text-white rounded-full p-1'>
              <Pause size={10} />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={() => onRemove(toast.id)}
            className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors'
          >
            <X size={16} />
          </button>

          {/* Product image */}
          <div className='w-12 h-12 rounded-lg overflow-hidden bg-white p-1 border border-orange-200 shrink-0'>
            <Image
              src={toast.product.image}
              alt={toast.product.title}
              width={40}
              height={40}
              className='w-full h-full object-contain'
            />
          </div>

          {/* Content */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-center space-x-2 mb-1'>
              <Icon size={16} className='text-orange-600 shrink-0' />
              <p className='font-medium text-sm text-orange-800'>
                {toast.quantity && toast.quantity > 1 ? `${toast.quantity} adet sepete eklendi!` : 'Sepete eklendi!'}
              </p>
            </div>

            <p className='text-xs text-orange-700 line-clamp-2 mb-3'>{toast.product.title}</p>

            <div className='flex items-center space-x-2'>
              <Button
                size='sm'
                onClick={handleViewCart}
                className='bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-1.5 h-auto flex-1 sm:flex-none'
              >
                <ShoppingCart size={12} className='mr-1' />
                <span className='hidden sm:inline'>Sepeti Gör ({getCartItemsCount()})</span>
                <span className='sm:hidden'>Sepet ({getCartItemsCount()})</span>
              </Button>

              <Button
                size='sm'
                variant='outline'
                onClick={handleViewProduct}
                className='border-orange-300 text-orange-700 hover:bg-orange-100 text-xs px-3 py-1.5 h-auto flex-1 sm:flex-none'
              >
                <span className='hidden sm:inline'>Ürünü Gör</span>
                <span className='sm:hidden'>Görüntüle</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (toast.type === 'remove-cart') {
    return (
      <Card
        className={`p-4 w-full max-w-md shadow-lg border-2 ${toastStyles[toast.type]} animate-in toast-hover transition-all duration-200 ${isHovered ? 'scale-[1.02] shadow-xl' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='flex items-start space-x-3'>
          {/* Pause indicator */}
          {isHovered && (
            <div className='absolute top-2 left-2 bg-black/60 text-white rounded-full p-1'>
              <Pause size={10} />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={() => onRemove(toast.id)}
            className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors'
          >
            <X size={16} />
          </button>

          {/* Product image */}
          <div className='w-12 h-12 rounded-lg overflow-hidden bg-white p-1 border border-red-200 shrink-0'>
            <Image
              src={toast.product.image}
              alt={toast.product.title}
              width={40}
              height={40}
              className='w-full h-full object-contain'
            />
          </div>

          {/* Content */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-center space-x-2 mb-1'>
              <Icon size={16} className='text-red-600 shrink-0' />
              <p className='font-medium text-sm text-red-800'>Sepetten çıkarıldı!</p>
            </div>

            <p className='text-xs text-red-700 line-clamp-2 mb-3'>{toast.product.title}</p>

            {/* Wishlist Question */}
            {isAuthenticated && (
              <div className='bg-red-100 border border-red-200 rounded-lg p-3 mb-3'>
                {isInWishlist(toast.product.id) ? (
                  <p className='text-xs text-red-700 font-medium'>✅ Bu ürün zaten favorilerinizde bulunuyor</p>
                ) : (
                  <>
                    <p className='text-xs text-red-700 mb-2 font-medium'>
                      💡 Bu ürünü favorilere eklemek ister misiniz?
                    </p>
                    <div className='flex items-center space-x-2'>
                      <Button
                        size='sm'
                        onClick={handleAddToWishlist}
                        className='bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 h-auto flex-1'
                      >
                        <Heart size={12} className='mr-1' />
                        <span className='hidden sm:inline'>Favorilere Ekle</span>
                        <span className='sm:hidden'>Ekle</span>
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            <div className='flex items-center w-full'>
              <Button
                size='sm'
                onClick={handleViewProduct}
                className={`w-full bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 h-auto ${getCartItemsCount() === 0 ? 'flex-1' : 'flex-1 sm:flex-none'}`}
              >
                Ürünü Görüntüle
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={`p-4 w-full max-w-md shadow-lg border-2 ${toastStyles[toast.type]} animate-in toast-hover transition-all duration-200 ${isHovered ? 'scale-[1.02] shadow-xl' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='flex items-start space-x-3'>
        {/* Pause indicator */}
        {isHovered && (
          <div className='absolute top-2 left-2 bg-black/60 text-white rounded-full p-1'>
            <Pause size={10} />
          </div>
        )}

        <div className='shrink-0'>
          <Icon
            size={20}
            className={
              toast.type === 'success' ? 'text-green-600' : toast.type === 'error' ? 'text-red-600' : 'text-blue-600'
            }
          />
        </div>

        <div className='flex-1 min-w-0'>
          <p className='text-sm font-medium'>{toast.message}</p>
          {toast.description && <p className='text-xs mt-1 opacity-80'>{toast.description}</p>}
        </div>

        <button
          onClick={() => onRemove(toast.id)}
          className='shrink-0 text-gray-400 hover:text-gray-600 transition-colors'
        >
          <X size={16} />
        </button>
      </div>
    </Card>
  )
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className='fixed top-20 right-4 z-50 space-y-3 max-w-md toast-container sm:right-4 sm:left-auto'>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}
