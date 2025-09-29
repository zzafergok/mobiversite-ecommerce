'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useState, useEffect } from 'react'

import { ShoppingCart } from 'lucide-react'

import { useCart } from '@/contexts/CartContext'
import { apiService } from '@/services/apiService'

import { Badge } from '@/components/core/badge'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'

export default function DailyDeals() {
  const { addToCart } = useCart()

  const [deals, setDeals] = useState([])
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12,
  })

  useEffect(() => {
    const fetchDailyDeals = async () => {
      try {
        const allProducts = await apiService.getAllProducts()

        // Fisher-Yates shuffle algoritması ile güvenilir karıştırma
        const shuffled = [...allProducts]
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }

        // İlk 4 benzersiz ürünü seç ve indirimli fiyat ekle
        const dailyDeals = shuffled.slice(0, 4).map((product) => ({
          ...product,
          originalPrice: Math.round(product.price * 1.3),
          discount: Math.round(((product.price * 1.3 - product.price) / (product.price * 1.3)) * 100),
        }))
        setDeals(dailyDeals)
      } catch (error) {
        console.error('Error fetching daily deals:', error)
      }
    }

    fetchDailyDeals()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          // Reset timer to 24 hours
          hours = 23
          minutes = 59
          seconds = 59
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  return (
    <div className='bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 md:p-8 text-white'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
        <div>
          <h2 className='text-2xl md:text-3xl font-bold mb-2'>⚡ Günün Fırsatları</h2>
          <p className='text-red-100'>Sınırlı süre - Kaçırma!</p>
        </div>
        <div className='text-center'>
          <div className='text-sm text-red-100 mb-1'>Kalan Süre</div>
          <div className='text-2xl font-bold'>
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {deals.map((deal) => (
          <Card
            key={deal.id}
            className='bg-white bg-opacity-20 border-none text-white overflow-hidden h-full flex flex-col'
          >
            <Link href={`/products/${deal.id}`}>
              <div className='relative aspect-square'>
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className='object-contain p-2'
                  sizes='(max-width: 768px) 50vw, 25vw'
                />
              </div>
            </Link>

            <CardContent className='p-4 text-center flex flex-col flex-1'>
              <Link href={`/products/${deal.id}`}>
                <h3 className='text-sm font-semibold mb-2 line-clamp-2 hover:text-yellow-200 transition-colors'>
                  {deal.title}
                </h3>
              </Link>

              <div className='space-y-1 mb-3'>
                <div className='text-xs text-red-100 line-through'>${deal.originalPrice}</div>
                <div className='text-lg font-bold'>${deal.price}</div>
                <Badge variant='destructive' size='sm' className='bg-yellow-500 text-yellow-900'>
                  %{deal.discount} İndirim
                </Badge>
              </div>

              <div className='flex flex-col gap-2 mt-auto'>
                <Button
                  onClick={() => handleAddToCart(deal)}
                  size='sm'
                  className='w-full gap-2 bg-white text-red-600 hover:bg-gray-100'
                >
                  <ShoppingCart size={14} />
                  Sepete Ekle
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
