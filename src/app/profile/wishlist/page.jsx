'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useWishlist } from '@/contexts/WishlistContext'
import ProductCard from '@/components/ecommerce/ProductCard'
import { ProductLoader } from '@/components/ui/EcommerceLoader'
import { Heart } from 'lucide-react'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'

export default function WishlistPage() {
  const router = useRouter()
  const { items: wishlistItems } = useWishlist()
  const [displayedItems, setDisplayedItems] = useState([])
  const [newlyLoadedItems, setNewlyLoadedItems] = useState([])
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const INITIAL_LOAD = 8
  const ITEMS_PER_PAGE = 6

  // Update displayed items when wishlist changes
  useEffect(() => {
    const initialItems = wishlistItems.slice(0, INITIAL_LOAD)
    setDisplayedItems(initialItems)
    setNewlyLoadedItems([])
    setPage(1)
    setHasMore(wishlistItems.length > INITIAL_LOAD)
  }, [wishlistItems])

  // Load more items
  const loadMoreItems = useCallback(() => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)

    // Simulate realistic loading delay
    setTimeout(() => {
      const startIndex = INITIAL_LOAD + (page - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      const newItems = wishlistItems.slice(startIndex, endIndex)

      if (newItems.length > 0) {
        setNewlyLoadedItems(newItems.map((p) => p.id))
        setDisplayedItems((prev) => [...prev, ...newItems])
        setPage((prev) => prev + 1)
        setHasMore(endIndex < wishlistItems.length)

        // Clear newly loaded state after animation
        setTimeout(() => {
          setNewlyLoadedItems([])
        }, 600)
      } else {
        setHasMore(false)
      }

      setLoadingMore(false)
    }, 1000)
  }, [wishlistItems, page, loadingMore, hasMore])

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000 &&
        !loadingMore &&
        hasMore
      ) {
        loadMoreItems()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreItems, loadingMore, hasMore])

  if (wishlistItems.length === 0) {
    return (
      <Card className='text-center py-10'>
        <CardContent className='pt-6 flex flex-col items-center gap-4'>
          <Heart className='mx-auto h-16 w-16 text-gray-300' />
          <h3 className='text-lg font-medium text-gray-900'>Favori listeniz boş</h3>
          <p className='text-gray-500'>Beğendiğiniz ürünleri favorilere ekleyerek buradan kolayca erişebilirsiniz.</p>
          <Button onClick={() => router.push('/products')} className=''>
            Ürünleri Keşfet
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Favori Ürünlerim</h1>
        <p className='text-gray-600'>
          {displayedItems.length} / {wishlistItems.length} ürün gösteriliyor
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'>
        {displayedItems.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className={`relative transition-all duration-500 ease-out ${
              newlyLoadedItems.includes(product.id) ? 'animate-fade-in-up opacity-0' : 'opacity-100'
            }`}
            style={{
              animationDelay: newlyLoadedItems.includes(product.id)
                ? `${newlyLoadedItems.indexOf(product.id) * 100}ms`
                : '0ms',
            }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {loadingMore && (
        <Card className='text-center py-8 mt-6'>
          <CardContent>
            <ProductLoader size='md' />
          </CardContent>
        </Card>
      )}

      {!hasMore && displayedItems.length > 0 && displayedItems.length < wishlistItems.length && (
        <Card className='text-center py-8 mt-6'>
          <CardContent>
            <p className='text-gray-500 dark:text-gray-400'>Tüm favori ürünler yüklendi</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
