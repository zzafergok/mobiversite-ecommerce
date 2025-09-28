'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { ShoppingCart, Heart, User, Menu, X, Search, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Button } from '@/components/core/button'
import { Badge } from '@/components/core/badge'
import { Input } from '@/components/core/input'
import { useResponsiveCategories } from '@/hooks/useResponsiveCategories'

export default function Navbar() {
  const router = useRouter()
  const { user, logout, loading } = useAuth()
  const { getCartItemsCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false)
  const userDropdownRef = useRef(null)
  const categoriesDropdownRef = useRef(null)

  const cartItemsCount = getCartItemsCount()
  const wishlistItemsCount = wishlistItems.length

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false)
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        setCategoriesDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const categories = useMemo(
    () => [
      { name: 'Elektronik', href: '/products?category=electronics' },
      { name: 'Moda', href: "/products?category=men's clothing,women's clothing" },
      { name: 'Takı', href: '/products?category=jewelery' },
      { name: 'Spor', href: '/products?category=spor' },
      { name: 'Kozmetik', href: '/products?category=kozmetik' },
      { name: 'Anne & Bebek', href: '/products?category=anne-bebek' },
      { name: 'Oyuncak', href: '/products?category=oyuncak' },
      { name: 'Pet Shop', href: '/products?category=pet-shop' },
      { name: 'Film & Müzik', href: '/products?category=film-muzik' },
      { name: 'Kitap', href: '/products?category=kitap' },
      { name: 'Süpermarket', href: '/products?category=supermarket' },
      { name: 'Tüm Kategoriler', href: '/products' },
    ],
    [],
  )

  const { visibleCategories, hiddenCategories, showAllCategoriesOnly, containerRef, setItemRef } =
    useResponsiveCategories(categories)

  const handleLogout = async () => {
    setMobileMenuOpen(false)
    setUserDropdownOpen(false)
    await logout() // AuthContext automatically redirects to homepage
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery) {
      // Use router.push instead of window.location.href for better performance
      router.push(`/products?search=${encodeURIComponent(trimmedQuery)}`)
      // Clear search input after search
      setSearchQuery('')
    }
  }

  return (
    <nav className='bg-white dark:bg-gray-900 shadow-sm border-b fold-compact-nav hidden md:block fixed top-0 left-0 right-0 navbar-fixed z-50'>
      {/* Main Navbar */}
      <div className='max-w-7xl mx-auto px-4 fold-cover:px-2 fold-main:px-4'>
        <div className='flex items-center justify-between h-16 fold-cover:h-12 fold-main:h-16 space-x-4'>
          {/* Logo */}
          <Link
            href='/'
            className='text-xl font-bold text-orange-600 navbar-brand fold-cover:text-sm fold-main:text-lg flex-shrink-0'
          >
            <span className='hidden sm:inline fold-cover:hidden fold-main:inline'>Mobiversite</span>
            <span className='sm:hidden fold-cover:inline fold-main:hidden'>MB</span>
          </Link>

          {/* Search Bar */}
          <div className='flex-1 max-w-2xl mx-4'>
            <form onSubmit={handleSearch} className='relative'>
              <Input
                type='text'
                placeholder='Ürün, kategori veya marka ara'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent'
              />
              <Button
                type='submit'
                variant='ghost'
                size='icon'
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-0 shadow-none'
              >
                <Search size={18} />
              </Button>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className='hidden md:flex items-center space-x-4'>
            {/* User Dropdown */}
            {loading ? (
              <div className='w-24 h-10 bg-gray-200 animate-pulse rounded-lg'></div>
            ) : user ? (
              <div className='relative' ref={userDropdownRef}>
                <Button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className='bg-orange-600 hover:bg-orange-700 text-gray-50 px-4 py-2 rounded-lg flex items-center space-x-2'
                >
                  <User size={18} />
                  <span className='text-sm font-medium'>Hesabım</span>
                  <ChevronDown size={14} className={`transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50'>
                    <Link
                      href='/profile'
                      className='flex items-center space-x-3 px-4 py-3 text-gray-700 hover: transition-colors'
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <User size={16} />
                      <div>
                        <div className='text-sm font-medium'>Profilim</div>
                        <div className='text-xs text-gray-500'>{user.firstName}</div>
                      </div>
                    </Link>

                    <Link
                      href='/profile/wishlist'
                      className='flex items-center space-x-3 px-4 py-3 text-gray-700 hover: transition-colors'
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Heart size={16} />
                      <div>
                        <div className='text-sm font-medium'>Favorilerim</div>
                        <div className='text-xs text-gray-500'>{wishlistItemsCount} ürün</div>
                      </div>
                    </Link>

                    <div className='border-t border-gray-100 my-1'></div>

                    <button
                      onClick={handleLogout}
                      className='w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left'
                    >
                      <X size={16} />
                      <span className='text-sm font-medium'>Çıkış Yap</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => router.push('/login')}
                className='bg-orange-600 hover:bg-orange-700 text-gray-50 px-4 py-2 rounded-lg flex items-center space-x-2'
              >
                <User size={18} />
                <span className='text-sm font-medium'>Giriş Yap</span>
              </Button>
            )}

            {/* Cart Button */}
            <Button
              onClick={() => router.push('/cart')}
              variant='outline'
              className='relative border-2 border-orange-200 bg-orange-200 hover:bg-orange-300 text-orange-700 px-4 py-2 rounded-lg flex items-center space-x-2'
            >
              <div className='relative'>
                <ShoppingCart size={18} />
                {cartItemsCount > 0 && (
                  <Badge
                    variant='destructive'
                    size='sm'
                    className='absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center text-[10px] p-0 font-bold'
                  >
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </Badge>
                )}
              </div>
              <span className='text-sm font-medium'>Sepetim</span>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden text-gray-600 dark:text-gray-300'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className='md:hidden border-t border-gray-200 dark:border-gray-700 py-4'>
            <div className='flex flex-col space-y-4'>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className='text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}

              <div className='border-t border-gray-200 dark:border-gray-700 pt-4 px-4'>
                <div className='flex items-center justify-between'>
                  {/* Mobile Cart */}
                  <Link
                    href='/cart'
                    className='flex items-center space-x-2 text-gray-600 dark:text-gray-300'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart size={20} />
                    <span>Sepet ({cartItemsCount})</span>
                  </Link>

                  {/* Mobile Wishlist */}
                  {user && (
                    <Link
                      href='/profile/wishlist'
                      className='flex items-center space-x-2 text-gray-600 dark:text-gray-300 cursor-pointer'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Heart size={20} />
                      <span>({wishlistItemsCount})</span>
                    </Link>
                  )}
                </div>

                {/* Mobile User Menu */}
                <div className='mt-4'>
                  {loading ? (
                    <div className='w-32 h-8 bg-gray-200 animate-pulse rounded'></div>
                  ) : user ? (
                    <div className='flex flex-col space-y-2'>
                      <Link
                        href='/profile'
                        className='flex items-center space-x-2 text-gray-600 dark:text-gray-300'
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <User size={20} />
                        <span>{user.firstName}</span>
                      </Link>
                      <Button
                        onClick={handleLogout}
                        variant='ghost'
                        size='sm'
                        className='text-left text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 justify-start h-auto p-2'
                      >
                        Çıkış Yap
                      </Button>
                    </div>
                  ) : (
                    <Link
                      href='/login'
                      className='flex items-center space-x-2 text-gray-600 dark:text-gray-300'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User size={20} />
                      <span>Giriş Yap</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Navigation Bar */}
      <div className='bg-white border-t border-gray-200 shadow-sm relative' ref={categoriesDropdownRef}>
        <div className='max-w-7xl mx-auto px-4' ref={containerRef}>
          <div className='flex items-center justify-center py-3'>
            {showAllCategoriesOnly ? (
              // Show only "Tüm Kategoriler" button when space is limited
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className='text-sm text-orange-600 hover:text-orange-700 transition-colors font-semibold border border-orange-200 hover:border-orange-300 px-4 py-2 rounded-md hover:bg-orange-50 flex items-center space-x-2'
              >
                <span>Kategoriler</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
            ) : (
              // Show visible categories plus dropdown for hidden ones
              <div className='flex items-center justify-center space-x-4'>
                {visibleCategories.map((category, index) => (
                  <Link
                    key={category.name}
                    ref={setItemRef(index)}
                    href={category.href}
                    className='text-sm text-gray-700 hover:text-orange-600 transition-colors font-medium whitespace-nowrap hover:bg-orange-50 px-3 py-2 rounded-md'
                  >
                    {category.name}
                  </Link>
                ))}
                {hiddenCategories.length > 0 && (
                  <button
                    onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                    className='text-sm text-orange-600 hover:text-orange-700 transition-colors font-semibold border border-orange-200 hover:border-orange-300 px-4 py-2 rounded-md hover:bg-orange-50 flex items-center space-x-2'
                  >
                    <span>+{hiddenCategories.length} Kategori</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
                <Link
                  href='/products'
                  className='text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium px-3 py-2 rounded-md hover:'
                >
                  Tümü
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Hidden Categories Dropdown */}
        {categoriesDropdownOpen && (
          <div className='absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50'>
            <div className='max-w-7xl mx-auto px-4 py-4'>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3'>
                {showAllCategoriesOnly
                  ? // Show all categories when space is very limited
                    categories
                      .filter((cat) => cat.name !== 'Tüm Kategoriler')
                      .map((category) => (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setCategoriesDropdownOpen(false)}
                          className='text-sm text-gray-700 hover:text-orange-600 transition-colors font-medium hover:bg-orange-50 px-3 py-2 rounded-md text-center border border-gray-100 hover:border-orange-200'
                        >
                          {category.name}
                        </Link>
                      ))
                  : // Show only hidden categories
                    hiddenCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className='text-sm text-gray-700 hover:text-orange-600 transition-colors font-medium hover:bg-orange-50 px-3 py-2 rounded-md text-center border border-gray-100 hover:border-orange-200'
                      >
                        {category.name}
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
