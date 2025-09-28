'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ecommerce/ProductCard'
import ProductFilters from '@/components/ecommerce/ProductFilters'
import useApiService from '@/hooks/useApiService'
import { ProductLoader } from '@/components/ui/EcommerceLoader'
import { Card, CardContent } from '@/components/core/card'

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [newlyLoadedProducts, setNewlyLoadedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const ITEMS_PER_PAGE = 4
  const INITIAL_LOAD = 16

  const apiService = useApiService()

  // Read URL parameters and set initial states
  useEffect(() => {
    const urlSearchQuery = searchParams.get('search')
    const urlCategory = searchParams.get('category')
    const urlSort = searchParams.get('sort')

    // Always sync search query with URL parameter
    if (urlSearchQuery) {
      setSearchQuery(decodeURIComponent(urlSearchQuery))
    } else {
      setSearchQuery('')
    }

    if (urlCategory) {
      // Handle multiple categories (e.g., "men's clothing,women's clothing")
      if (urlCategory.includes(',')) {
        setSelectedCategory(urlCategory)
      } else {
        setSelectedCategory(urlCategory)
      }
    } else {
      // Reset to 'all' if no category in URL
      setSelectedCategory('all')
    }

    if (urlSort && ['default', 'price-low', 'price-high', 'name'].includes(urlSort)) {
      setSortBy(urlSort)
    } else {
      setSortBy('default')
    }
  }, [searchParams])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated loading time
        await new Promise((resolve) => setTimeout(resolve, 1500))

        const [productsData, categoriesData] = await Promise.all([
          apiService.getAllProducts(),
          apiService.getCategories(),
        ])

        setProducts(productsData)
        setFilteredProducts(productsData)
        setCategories(['all', ...categoriesData])
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [apiService])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Category filter - support multiple categories
    if (selectedCategory !== 'all') {
      if (selectedCategory.includes(',')) {
        // Multiple categories (e.g., "men's clothing,women's clothing")
        const categories = selectedCategory.split(',').map((cat) => cat.trim())
        filtered = filtered.filter((product) => categories.includes(product.category))
      } else {
        // Single category
        filtered = filtered.filter((product) => product.category === selectedCategory)
      }
    }

    // Search filter - search across title, description, and category
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery),
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
    setPage(1)
    setHasMore(true)
  }, [products, selectedCategory, sortBy, searchQuery])

  // Update displayed products when filtered products change
  useEffect(() => {
    const initialItems = filteredProducts.slice(0, INITIAL_LOAD)
    setDisplayedProducts(initialItems)
    setNewlyLoadedProducts([])
    setHasMore(filteredProducts.length > INITIAL_LOAD)
  }, [filteredProducts])

  // Load more products
  const loadMoreProducts = useCallback(() => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)

    // Simulate realistic loading delay
    setTimeout(() => {
      const startIndex = INITIAL_LOAD + (page - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      const newProducts = filteredProducts.slice(startIndex, endIndex)

      if (newProducts.length > 0) {
        setNewlyLoadedProducts(newProducts.map((p) => p.id))
        setDisplayedProducts((prev) => [...prev, ...newProducts])
        setPage((prev) => prev + 1)
        setHasMore(endIndex < filteredProducts.length)

        // Clear newly loaded state after animation
        setTimeout(() => {
          setNewlyLoadedProducts([])
        }, 600)
      } else {
        setHasMore(false)
      }

      setLoadingMore(false)
    }, 1200)
  }, [filteredProducts, page, loadingMore, hasMore])

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000 &&
        !loadingMore &&
        hasMore
      ) {
        loadMoreProducts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreProducts, loadingMore, hasMore])

  if (loading) {
    return <ProductLoader size='lg' className='min-h-96' />
  }

  return (
    <div className='space-y-4 md:space-y-6 max-w-7xl mx-auto'>
      <div className='text-center px-2 md:px-0'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>Tüm Ürünler</h1>
        <p className='text-gray-600 dark:text-gray-400'>
          {displayedProducts.length} / {filteredProducts.length} ürün gösteriliyor
        </p>
      </div>

      <div className='px-2 md:px-0'>
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <Card className='mx-2 md:mx-0'>
          <CardContent className='text-center py-12'>
            <p className='text-gray-500 dark:text-gray-400 text-lg'>Aradığınız kriterlere uygun ürün bulunamadı.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 px-2 md:px-0'
            style={{ contain: 'layout style' }}
          >
            {displayedProducts.map((product, index) => (
              <div
                key={`${product.id}-${index}`}
                className={`${newlyLoadedProducts.includes(product.id) ? 'animate-fade-in opacity-0' : 'opacity-100'}`}
                style={{
                  animationDelay: newlyLoadedProducts.includes(product.id)
                    ? `${newlyLoadedProducts.indexOf(product.id) * 100}ms`
                    : '0ms',
                  contain: 'layout',
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {loadingMore && (
            <Card className='mx-2 md:mx-0'>
              <CardContent className='flex justify-center py-8'>
                <ProductLoader size='md' />
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductLoader size='lg' className='min-h-96' />}>
      <ProductsPageContent />
    </Suspense>
  )
}
