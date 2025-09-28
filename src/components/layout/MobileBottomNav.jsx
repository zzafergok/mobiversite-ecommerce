'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'
import { useWishlist } from '@/contexts/WishlistContext'
import { Home, Heart, ShoppingCart, User, Grid3X3 } from 'lucide-react'
import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'
import BottomSheet from '@/components/ui/BottomSheet'

export default function MobileBottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const { getCartItemsCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const [categoriesModalOpen, setCategoriesModalOpen] = useState(false)

  const cartItemsCount = getCartItemsCount()
  const wishlistItemsCount = wishlistItems.length

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
    ],
    [],
  )

  const navItems = [
    {
      name: 'Keşfet',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      name: 'Listelerim',
      href: user ? '/profile/wishlist' : '/login',
      icon: Heart,
      isActive: pathname === '/profile/wishlist',
      badge: user ? wishlistItemsCount : 0,
      showBadge: user && wishlistItemsCount > 0,
    },
    {
      name: 'Sepetim',
      href: '/cart',
      icon: ShoppingCart,
      isActive: pathname === '/cart',
      badge: cartItemsCount,
      showBadge: cartItemsCount > 0,
    },
    {
      name: 'Hesabım',
      href: user ? '/profile' : '/login',
      icon: User,
      isActive: pathname === '/profile' || pathname === '/login',
    },
    {
      name: 'Kategoriler',
      icon: Grid3X3,
      isActive: pathname === '/products',
      isModal: true,
    },
  ]

  return (
    <>
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 safe-area-bottom ${categoriesModalOpen ? 'hidden' : ''}`}
      >
        <div className='flex items-center justify-around px-2 py-1'>
          {navItems.map((item) => {
            const Icon = item.icon

            if (item.isModal) {
              return (
                <Button
                  key={item.name}
                  variant='ghost'
                  onClick={() => setCategoriesModalOpen(true)}
                  className={`relative flex flex-col items-center justify-center min-w-0 flex-1 px-1 py-2 text-xs h-auto transition-colors ${
                    item.isActive ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className='relative'>
                    <Icon size={20} className={`mb-1 ${item.isActive ? 'text-orange-600' : 'text-gray-500'}`} />
                  </div>
                  <span
                    className={`text-[10px] font-medium truncate w-full text-center ${
                      item.isActive ? 'text-orange-600' : 'text-gray-500'
                    }`}
                  >
                    {item.name}
                  </span>
                </Button>
              )
            }

            return (
              <Button
                key={item.name}
                asChild
                variant='ghost'
                className={`relative flex flex-col items-center justify-center min-w-0 flex-1 px-1 py-2 text-xs h-auto transition-colors ${
                  item.isActive ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Link href={item.href}>
                  <div className='relative'>
                    <Icon size={20} className={`mb-1 ${item.isActive ? 'text-orange-600' : 'text-gray-500'}`} />
                    {item.showBadge && (
                      <Badge
                        variant='destructive'
                        size='sm'
                        className='absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center text-[10px] p-0 min-w-0'
                      >
                        {item.badge > 99 ? '99+' : item.badge}
                      </Badge>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-medium truncate w-full text-center ${
                      item.isActive ? 'text-orange-600' : 'text-gray-500'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              </Button>
            )
          })}
        </div>
      </div>

      {/* Categories Bottom Sheet */}
      <BottomSheet isOpen={categoriesModalOpen} onClose={() => setCategoriesModalOpen(false)} title='Kategoriler'>
        <div className='p-4 space-y-3'>
          {categories.map((category) => (
            <Card
              key={category.name}
              className='hover: transition-colors cursor-pointer'
              onClick={() => {
                router.push(category.href)
                setCategoriesModalOpen(false)
              }}
            >
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-gray-900'>{category.name}</span>
                  <span className='text-gray-400'>›</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Tüm Ürünler */}
          <Card
            className='hover: transition-colors cursor-pointer border-orange-200 bg-orange-50'
            onClick={() => {
              router.push('/products')
              setCategoriesModalOpen(false)
            }}
          >
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-orange-700'>Tüm Ürünler</span>
                <span className='text-orange-400'>›</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </BottomSheet>
    </>
  )
}
