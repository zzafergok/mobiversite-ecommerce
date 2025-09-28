'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { User, Heart, Package, List } from 'lucide-react'

import { Badge } from '@/components/core/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card'

export default function ProfileSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      href: '/profile',
      label: 'Profil',
      icon: User,
      exact: true,
    },
    {
      href: '/profile/wishlist',
      label: 'Favori Ürünler',
      icon: Heart,
    },
    {
      href: '/profile/lists',
      label: 'Listelerim',
      icon: List,
    },
    {
      href: '/profile/orders',
      label: 'Siparişlerim',
      icon: Package,
    },
  ]

  const isActive = (href, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <Card className='hidden lg:block w-64 h-96 border-r'>
        <CardHeader className='pb-4'>
          <CardTitle className='text-lg'>Hesabım</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <nav>
            <ul className='space-y-1 px-3 p-6'>
              {menuItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href, item.exact)

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        active
                          ? 'bg-primary/10 text-primary border-primary'
                          : 'text-gray-700 dark:text-gray-300 hover: dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                    >
                      <Icon className={`mr-3 h-5 w-5 ${active ? 'text-primary' : 'text-gray-400'}`} />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </CardContent>
      </Card>

      {/* Mobile Navigation */}
      <div className='lg:hidden'>
        {/* Standard Mobile - Horizontal Navigation */}
        <div className='block fold-cover:hidden fold-main:hidden'>
          <div className='bg-white border border-gray-200 rounded-lg mx-4 mb-6 shadow-sm overflow-hidden'>
            <div className='p-3'>
              <div className='grid grid-cols-4 gap-1'>
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href, item.exact)

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-col items-center p-2 rounded-lg transition-colors touch-manipulation ${
                        active ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:'
                      }`}
                    >
                      <Icon className={`h-4 w-4 mb-1 ${active ? 'text-primary' : 'text-gray-400'}`} />
                      <span className='text-xs text-center font-medium leading-tight'>{item.label}</span>
                      {active && <div className='w-2 h-0.5 bg-primary rounded-full mt-0.5'></div>}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Galaxy Z Fold4 Cover Screen */}
        <div className='hidden fold-cover:block'>
          <Card className='mx-2 mb-4'>
            <CardContent className='p-3'>
              <nav>
                <div className='flex flex-col space-y-1'>
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href, item.exact)

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center px-2 py-2 text-xs font-medium rounded-md transition-colors ${
                          active
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 dark:text-gray-300 hover: dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className={`mr-2 h-3 w-3 ${active ? 'text-primary' : 'text-gray-400'}`} />
                        <span className='text-xs'>{item.label}</span>
                        {active && <Badge variant='default' size='sm' className='ml-auto w-1 h-1 p-0' />}
                      </Link>
                    )
                  })}
                </div>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Galaxy Z Fold4 Main Screen */}
        <div className='hidden fold-main:block'>
          <Card className='mx-4 mb-6'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-base'>Hesabım</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <nav>
                <div className='grid grid-cols-3 gap-2 px-4 pb-4'>
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href, item.exact)

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                          active
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 dark:text-gray-300 hover: dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className={`h-6 w-6 mb-1 ${active ? 'text-primary' : 'text-gray-400'}`} />
                        <span className='text-xs text-center'>{item.label}</span>
                        {active && <Badge variant='default' size='sm' className='mt-1 w-2 h-2 p-0' />}
                      </Link>
                    )
                  })}
                </div>
              </nav>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
