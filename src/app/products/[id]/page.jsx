'use client'

import Image from 'next/image'
import { notFound, useRouter } from 'next/navigation'

import { useState, useEffect, use } from 'react'

import { ArrowLeft, ShoppingCart, Heart, Minus, Plus } from 'lucide-react'

import useApiService from '@/hooks/useApiService'

import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { useLists } from '@/contexts/ListsContext'
import { useWishlist } from '@/contexts/WishlistContext'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'
import { ProductLoader } from '@/components/ui/EcommerceLoader'
import FavoritesAndListsDropdown from '@/components/ecommerce/FavoritesAndListsDropdown'
import { ProductStructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'

export default function ProductDetailPage({ params }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const resolvedParams = use(params)
  const apiService = useApiService()
  const { isAuthenticated } = useAuth()
  const { isInWishlist } = useWishlist()
  const { lists, isProductInList } = useLists()

  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  // SEO helper fonksiyonlar
  const getCategoryDisplayName = (category) => {
    const categoryMap = {
      electronics: 'Elektronik',
      "men's clothing": 'Erkek Giyim',
      "women's clothing": 'Kadın Giyim',
      jewelery: 'Takı & Mücevher',
      spor: 'Spor',
      kozmetik: 'Kozmetik',
      'anne-bebek': 'Anne & Bebek',
      oyuncak: 'Oyuncak',
      'pet-shop': 'Pet Shop',
      'film-muzik': 'Film & Müzik',
      kitap: 'Kitap',
      supermarket: 'Süpermarket',
    }
    return categoryMap[category] || category
  }

  const generateProductTitle = (product) => {
    if (!product) return 'Ürün Detayı | Mobiversite Store'
    return `${product.title} - ${getCategoryDisplayName(product.category)} | Mobiversite Store`
  }

  const generateProductDescription = (product) => {
    if (!product) return "Mobiversite Store'da kaliteli ürünler."

    let description = `${product.title} ürününü Mobiversite Store'da keşfedin. `
    description += `${getCategoryDisplayName(product.category)} kategorisinde ${product.price}$ fiyatıyla. `
    description += product.description.substring(0, 100) + '... '
    description += 'Hızlı teslimat, güvenli ödeme, ücretsiz kargo fırsatları.'

    return description
  }

  // Dinamik SEO güncelleme
  useEffect(() => {
    if (product) {
      document.title = generateProductTitle(product)

      // Meta description güncelleme
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content', generateProductDescription(product))
      }

      // OG title güncelleme
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) {
        ogTitle.setAttribute('content', generateProductTitle(product))
      }

      // OG description güncelleme
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) {
        ogDesc.setAttribute('content', generateProductDescription(product))
      }

      // OG image güncelleme
      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage) {
        ogImage.setAttribute('content', product.image)
      }

      // Canonical URL güncelleme
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        canonical.setAttribute('href', `https://www.mobiversite.store/products/${product.id}`)
      }
    }
  }, [product])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulated loading time
        await new Promise((resolve) => setTimeout(resolve, 800))

        const productId = String(resolvedParams.id)

        // Validate ID format (should be numeric or valid product ID)
        const isValidId = /^[0-9]+$/.test(productId)
        if (!isValidId) {
          notFound()
          return
        }

        const productData = await apiService.getProduct(productId)
        if (!productData) {
          notFound()
        } else {
          setProduct(productData)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        if (error.response && error.response.status === 404) {
          notFound()
          return
        }
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

  // Breadcrumb verileri
  const breadcrumbItems = [
    { name: 'Ana Sayfa', url: 'https://www.mobiversite.store' },
    { name: 'Ürünler', url: 'https://www.mobiversite.store/products' },
    {
      name: getCategoryDisplayName(product.category),
      url: `https://www.mobiversite.store/products?category=${product.category}`,
    },
    {
      name: product.title,
      url: `https://www.mobiversite.store/products/${product.id}`,
    },
  ]

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
      <ProductStructuredData product={product} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      {/* Back Button */}
      <Button
        variant='ghost'
        className='mb-4 sm:mb-6 p-0 h-auto text-gray-600 hover:text-gray-700'
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
              {getCategoryDisplayName(product.category)}
            </Badge>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4'>
              {product.title}
            </h1>
            <div className='flex items-center gap-4 mb-4'>
              <p className='text-2xl sm:text-3xl font-bold text-green-600'>${product.price}</p>
              <div className='flex items-center gap-1'>
                <span className='text-yellow-500'>★★★★★</span>
                <span className='text-sm text-gray-500'>(127 değerlendirme)</span>
              </div>
            </div>
            <div className='flex items-center gap-2 mb-4 sm:mb-6'>
              <span className='text-green-600 text-sm font-medium'>✓ Stokta var</span>
              <span className='text-gray-500'>•</span>
              <span className='text-sm text-gray-600'>Hızlı teslimat</span>
              <span className='text-gray-500'>•</span>
              <span className='text-sm text-gray-600'>Ücretsiz kargo</span>
            </div>
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
              className='w-full gap-2 bg-gray-600 hover:bg-gray-700 h-12 text-base font-medium'
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
              <span className='text-gray-600 hover:text-gray-700 cursor-pointer' onClick={() => router.push('/login')}>
                giriş yapın
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
