'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { ShoppingCart, Heart } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'

export default function ProductCard({ product }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleHeartClick = (e) => {
    e.preventDefault()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Card className='overflow-hidden group'>
      <div className='cursor-pointer' onClick={() => router.push(`/products/${product.id}`)}>
        <div className='relative aspect-square overflow-hidden'>
          <Image
            src={product.image}
            alt={product.title}
            fill
            className='object-contain p-4 group-hover:scale-105 transition-transform duration-300'
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
          />
        </div>
      </div>

      <CardContent className='p-4'>
        <h3
          className='text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 transition-colors min-h-[2.5rem] cursor-pointer'
          onClick={() => router.push(`/products/${product.id}`)}
        >
          {product.title}
        </h3>

        <p className='text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 min-h-[2rem]'>{product.description}</p>

        <div className='flex items-center justify-between mb-3'>
          <span className='text-lg font-bold text-green-600'>${product.price}</span>
          <Badge variant='secondary' size='sm' className='capitalize'>
            {product.category}
          </Badge>
        </div>

        <div className='flex items-center gap-2'>
          <Button onClick={handleAddToCart} className='flex-1 gap-2 min-h-[2.5rem]' size='sm'>
            <ShoppingCart size={16} />
            <span className='hidden sm:inline'>Sepete Ekle</span>
            <span className='sm:hidden'>Sepet</span>
          </Button>

          {isAuthenticated && (
            <Button
              variant='outline'
              size='icon'
              className={`min-w-[2.5rem] min-h-[2.5rem] ${
                isInWishlist(product.id) ? 'bg-red-100 text-red-600 hover:bg-red-200' : ''
              }`}
              title='Favorilere Ekle/Çıkar'
              onClick={handleHeartClick}
            >
              <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
