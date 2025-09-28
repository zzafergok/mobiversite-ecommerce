'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'

import { ShoppingCart, Heart } from 'lucide-react'

import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useWishlist } from '@/contexts/WishlistContext'

import useApiService from '@/hooks/useApiService'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Skeleton } from '@/components/core/skeleton'
import { Card, CardContent } from '@/components/core/card'

export default function FeaturedProducts() {
  const { addToCart } = useCart()
  const apiService = useApiService()
  const { isAuthenticated } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Simulated loading time
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const allProducts = await apiService.getAllProducts()
        // İlk 6 ürünü featured olarak göster
        setProducts(allProducts.slice(0, 6))
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [apiService])

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const handleWishlistToggle = (product) => {
    if (!isAuthenticated) {
      // Redirect to login or show message
      return
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  if (loading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6'>
        {[...Array(6)].map((_, i) => (
          <Card key={i} className='overflow-hidden'>
            <Skeleton variant='rectangular' height={200} className='w-full' />
            <CardContent className='p-4 space-y-3'>
              <Skeleton variant='text' lines={2} height={16} />
              <div className='flex items-center justify-between'>
                <Skeleton variant='text' width={80} height={20} />
                <Skeleton variant='text' width={60} height={16} />
              </div>
              <div className='flex items-center gap-2'>
                <Skeleton variant='rectangular' height={36} className='flex-1' />
                <Skeleton variant='rectangular' width={36} height={36} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6'>
      {products.map((product) => (
        <Card key={product.id} className='overflow-hidden flex flex-col h-full'>
          <Link href={`/products/${product.id}`}>
            <div className='relative aspect-square'>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className='object-contain p-4'
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
              />
            </div>
          </Link>

          <CardContent className='p-4 flex flex-col flex-1'>
            <Link href={`/products/${product.id}`}>
              <h3 className='text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 transition-colors min-h-[2.5rem]'>
                {product.title}
              </h3>
            </Link>

            <div className='flex items-center justify-between mb-3'>
              <span className='text-lg font-bold text-green-600'>${product.price}</span>
              <Badge variant='secondary' size='sm'>
                {product.category}
              </Badge>
            </div>

            <div className='flex items-center gap-2 mt-auto'>
              <Button onClick={() => handleAddToCart(product)} className='flex-1' size='sm'>
                <ShoppingCart size={16} />
                Sepete Ekle
              </Button>

              {isAuthenticated && (
                <Button
                  onClick={() => handleWishlistToggle(product)}
                  variant={isInWishlist(product.id) ? 'destructive' : 'outline'}
                  size='icon'
                  className={isInWishlist(product.id) ? 'bg-red-100 text-red-600 hover:bg-red-200' : ''}
                >
                  <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
