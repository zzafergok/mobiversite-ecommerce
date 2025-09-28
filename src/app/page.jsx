'use client'

import { Suspense } from 'react'
import FeaturedProducts from '@/components/ecommerce/FeaturedProducts'
import { ProductLoader } from '@/components/ui/EcommerceLoader'

export default function HomePage() {
  return (
    <div className='space-y-6 md:space-y-12 pt-8 max-w-7xl mx-auto'>
      {/* Featured Products Section */}
      <section className='px-2 md:px-0'>
        <div className='text-center mb-6 md:mb-8'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>Öne Çıkan Ürünler</h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            En popüler ve en çok tercih edilen ürünlerimizi keşfedin
          </p>
        </div>

        <Suspense fallback={<ProductLoader />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      {/* Features Section */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-2 md:px-0'>
        <div className='text-center p-6  dark:bg-gray-800 rounded-lg'>
          <div className='w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-blue-600 dark:text-blue-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold mb-2'>Güvenli Alışveriş</h3>
          <p className='text-gray-600 dark:text-gray-400'>Tüm ödemeleriniz SSL sertifikası ile korunur</p>
        </div>

        <div className='text-center p-6  dark:bg-gray-800 rounded-lg'>
          <div className='w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-green-600 dark:text-green-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold mb-2'>Hızlı Teslimat</h3>
          <p className='text-gray-600 dark:text-gray-400'>Siparişleriniz 24 saat içinde kargoya verilir</p>
        </div>

        <div className='text-center p-6  dark:bg-gray-800 rounded-lg'>
          <div className='w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-purple-600 dark:text-purple-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
          </div>
          <h3 className='text-xl font-semibold mb-2'>Müşteri Memnuniyeti</h3>
          <p className='text-gray-600 dark:text-gray-400'>%100 müşteri memnuniyeti garantisi</p>
        </div>
      </section>
    </div>
  )
}
