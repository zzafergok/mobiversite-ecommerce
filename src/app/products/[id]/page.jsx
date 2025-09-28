'use client'

import { useState, useEffect, use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, ShoppingCart, Heart, Minus, Plus } from 'lucide-react'
import useApiService from '@/hooks/ecommerce/useApiService'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { useLists } from '@/contexts/ListsContext'
import { useAuth } from '@/contexts/AuthContext'
import FavoritesAndListsDropdown from '@/components/ecommerce/FavoritesAndListsDropdown'
import { ProductLoader } from '@/components/ui/EcommerceLoader'
import { Button } from '@/components/core/button'
import { Badge } from '@/components/core/badge'
import { Card, CardContent } from '@/components/core/card'

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiService = useApiService()
  const { addToCart } = useCart()
  const { isInWishlist } = useWishlist()
  const { lists, isProductInList } = useLists()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulated loading time
        await new Promise((resolve) => setTimeout(resolve, 800))

        const productData = await apiService.getProduct(resolvedParams.id)
        if (!productData) {
          setError('Product not found')
          return
        }
        setProduct(productData)
      } catch (error) {
        console.error('Error fetching product:', error)
        setError('Error loading product')
      } finally {
        setLoading(false)
      }
    }

    if (resolvedParams.id) {
      fetchProduct()
    }
  }, [resolvedParams.id, apiService])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
      setQuantity(1) // Reset quantity after adding to cart
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  // Kalbin rengini belirle: favorilerde veya herhangi bir listede ise kırmızı
  const isInAnyList = lists.some((list) => isProductInList(list.id, product?.id))
  const isHeartFilled = (product && isInWishlist(product.id)) || isInAnyList

  if (loading) {
    return <ProductLoader size='lg' className='min-h-96' />
  }

  if (error || !product) {
    notFound()
  }

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Back Button */}
      <Button
        variant='ghost'
        className='mb-4 sm:mb-6 p-0 h-auto text-blue-600 hover:text-blue-700'
        onClick={() => router.push('/products')}
      >
        <div className='inline-flex items-center gap-2'>
          <ArrowLeft size={20} />
          Ürünlere Geri Dön
        </div>
      </Button>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8'>
        {/* Product Image */}
        <Card className='overflow-hidden'>
          <CardContent className='relative aspect-square bg-white dark:bg-gray-800 p-0'>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className='object-contain p-4 sm:p-8'
              sizes='(max-width: 1024px) 100vw, 50vw'
              priority
            />
          </CardContent>
        </Card>

        {/* Product Info */}
        <div className='space-y-4 sm:space-y-6'>
          <div>
            <Badge variant='secondary' className='mb-3 sm:mb-4 capitalize'>
              {product.category}
            </Badge>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4'>
              {product.title}
            </h1>
            <p className='text-2xl sm:text-3xl font-bold text-green-600 mb-4 sm:mb-6'>${product.price}</p>
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3'>Ürün Açıklaması</h3>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed'>{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className='text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3'>Miktar</h3>
            <div className='flex items-center gap-3 mb-4 sm:mb-6'>
              <Button onClick={decrementQuantity} variant='outline' size='icon' className='h-10 w-10'>
                <Minus size={16} />
              </Button>
              <span className='text-lg sm:text-xl font-semibold min-w-[3rem] text-center'>{quantity}</span>
              <Button onClick={incrementQuantity} variant='outline' size='icon' className='h-10 w-10'>
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col gap-3 sm:gap-4'>
            <Button
              onClick={handleAddToCart}
              className='w-full gap-2 bg-blue-600 hover:bg-blue-700 h-12 text-base font-medium'
            >
              <ShoppingCart size={20} />
              Sepete Ekle
            </Button>

            {isAuthenticated && (
              <FavoritesAndListsDropdown product={product}>
                <Button
                  variant={isHeartFilled ? 'secondary' : 'outline'}
                  className={`w-full flex gap-2 h-12 text-base font-medium ${isHeartFilled && 'bg-red-100 text-red-600 hover:bg-red-200'}`}
                >
                  <Heart size={20} fill={isHeartFilled ? 'currentColor' : 'none'} />
                  Favoriler & Listeler
                </Button>
              </FavoritesAndListsDropdown>
            )}
          </div>

          {!isAuthenticated && (
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Favorilere ve listelere eklemek için{' '}
              <span className='text-blue-600 hover:text-blue-700 cursor-pointer' onClick={() => router.push('/login')}>
                giriş yapın
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
