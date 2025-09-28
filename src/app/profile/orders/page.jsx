'use client'

import { useRouter } from 'next/navigation'

import { useState, useEffect, useCallback } from 'react'

import { Package, Calendar, CreditCard } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'

import useApiService from '@/hooks/useApiService'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Separator } from '@/components/core/separator'
import { Card, CardContent } from '@/components/core/card'
import { OrderLoader } from '@/components/ui/EcommerceLoader'

export default function OrdersPage() {
  const router = useRouter()
  const { user } = useAuth()
  const apiService = useApiService()

  const [page, setPage] = useState(1)
  const [orders, setOrders] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [displayedOrders, setDisplayedOrders] = useState([])
  const [newlyLoadedOrders, setNewlyLoadedOrders] = useState([])

  const INITIAL_LOAD = 5
  const ITEMS_PER_PAGE = 3

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return

      try {
        setLoading(true)
        // Simulated loading time
        await new Promise((resolve) => setTimeout(resolve, 800))
        const userOrders = await apiService.getOrdersByUserId(user.id)
        // Sort orders by date (newest first)
        const sortedOrders = (userOrders || []).sort((a, b) => new Date(b.date) - new Date(a.date))
        setOrders(sortedOrders)
      } catch (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user?.id, apiService])

  // Update displayed orders when orders change
  useEffect(() => {
    const initialItems = orders.slice(0, INITIAL_LOAD)
    setDisplayedOrders(initialItems)
    setNewlyLoadedOrders([])
    setPage(1)
    setHasMore(orders.length > INITIAL_LOAD)
  }, [orders])

  // Load more orders
  const loadMoreOrders = useCallback(() => {
    if (loadingMore || !hasMore) return

    setLoadingMore(true)

    // Simulate realistic loading delay
    setTimeout(() => {
      const startIndex = INITIAL_LOAD + (page - 1) * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      const newOrders = orders.slice(startIndex, endIndex)

      if (newOrders.length > 0) {
        setNewlyLoadedOrders(newOrders.map((o) => o.id))
        setDisplayedOrders((prev) => [...prev, ...newOrders])
        setPage((prev) => prev + 1)
        setHasMore(endIndex < orders.length)

        // Clear newly loaded state after animation
        setTimeout(() => {
          setNewlyLoadedOrders([])
        }, 600)
      } else {
        setHasMore(false)
      }

      setLoadingMore(false)
    }, 800)
  }, [orders, page, loadingMore, hasMore])

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000 &&
        !loadingMore &&
        hasMore
      ) {
        loadMoreOrders()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMoreOrders, loadingMore, hasMore])

  if (loading) {
    return <OrderLoader size='lg' className='py-16' />
  }

  if (orders.length === 0) {
    return (
      <Card className='text-center py-16'>
        <CardContent className='pt-6'>
          <Package className='mx-auto h-16 w-16 text-gray-300 mb-4' />
          <h3 className='text-lg font-medium text-gray-900 mb-2'>Henüz siparişiniz yok</h3>
          <p className='text-gray-500 mb-6'>İlk siparişinizi vererek alışverişe başlayın.</p>
          <Button onClick={() => router.push('/products')} className='bg-blue-600 hover:bg-blue-700'>
            Alışverişe Başla
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>Siparişlerim</h1>
        <p className='text-gray-600'>
          {displayedOrders.length} / {orders.length} sipariş gösteriliyor
        </p>
      </div>

      <div className='space-y-6'>
        {displayedOrders.map((order, index) => (
          <Card
            key={`${order.id}-${index}`}
            className={`overflow-hidden transition-all duration-500 ease-out ${
              newlyLoadedOrders.includes(order.id) ? 'animate-fade-in-up opacity-0' : 'opacity-100'
            }`}
            style={{
              animationDelay: newlyLoadedOrders.includes(order.id)
                ? `${newlyLoadedOrders.indexOf(order.id) * 100}ms`
                : '0ms',
            }}
          >
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center space-x-4'>
                  <div className='flex items-center space-x-2'>
                    <Package className='h-5 w-5 text-gray-400' />
                    <span className='text-sm font-medium text-gray-900'>Sipariş #{order.id}</span>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='h-4 w-4 text-gray-400' />
                    <span className='text-sm text-gray-600'>
                      {new Date(order.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </span>
                  </div>
                </div>
                <div className='flex items-center space-x-2'>
                  <CreditCard className='h-4 w-4 text-gray-400' />
                  <span className='text-lg font-semibold text-gray-900'>${order.total?.toFixed(2) || '0.00'}</span>
                </div>
              </div>

              <Separator className='my-4' />
              <div>
                <h4 className='text-sm font-medium text-gray-900 mb-3'>Sipariş Detayları</h4>
                <div className='space-y-2'>
                  {order.items?.map((item, index) => (
                    <div key={index} className='flex justify-between items-center text-sm'>
                      <span className='text-gray-600'>
                        {item.title} x {item.quantity}
                      </span>
                      <span className='text-gray-900 font-medium'>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  )) || <div className='text-sm text-gray-500'>Sipariş detayları bulunamadı</div>}
                </div>
              </div>

              {order.status && (
                <div className='mt-4'>
                  <Separator className='mb-4' />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm text-gray-600'>Durum:</span>
                    <Badge
                      variant={
                        order.status === 'delivered' || order.status === 'completed'
                          ? 'default'
                          : order.status === 'processing'
                            ? 'secondary'
                            : order.status === 'shipped'
                              ? 'outline'
                              : 'secondary'
                      }
                      className={
                        order.status === 'delivered' || order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {order.status === 'delivered' && 'Teslim Edildi'}
                      {order.status === 'processing' && 'Hazırlanıyor'}
                      {order.status === 'shipped' && 'Kargoda'}
                      {order.status === 'pending' && 'Beklemede'}
                      {order.status === 'completed' && 'Tamamlandı'}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {loadingMore && (
          <Card className='text-center py-8'>
            <CardContent>
              <OrderLoader size='md' />
            </CardContent>
          </Card>
        )}

        {!hasMore && displayedOrders.length > 0 && displayedOrders.length < orders.length && (
          <Card className='text-center py-8'>
            <CardContent>
              <p className='text-gray-500 dark:text-gray-400'>Tüm siparişler yüklendi</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
