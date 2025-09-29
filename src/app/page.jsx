'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import FeaturedProducts from '@/components/ecommerce/FeaturedProducts'
import BestSellers from '@/components/ecommerce/BestSellers'
import DailyDeals from '@/components/ecommerce/DailyDeals'
import { ProductLoader } from '@/components/ui/EcommerceLoader'

export default function HomePage() {
  const categories = [
    { name: 'Elektronik', icon: '📱', color: 'bg-gray-500', href: '/products?category=electronics' },
    { name: 'Erkek Giyim', icon: '👔', color: 'bg-indigo-500', href: "/products?category=men's clothing" },
    { name: 'Kadın Giyim', icon: '👗', color: 'bg-pink-500', href: "/products?category=women's clothing" },
    { name: 'Mücevher', icon: '💍', color: 'bg-purple-500', href: '/products?category=jewelery' },
    { name: 'Spor', icon: '⚽', color: 'bg-orange-500', href: '/products?category=spor' },
    { name: 'Kozmetik', icon: '💄', color: 'bg-red-500', href: '/products?category=kozmetik' },
    { name: 'Anne & Bebek', icon: '👶', color: 'bg-yellow-500', href: '/products?category=anne-bebek' },
    { name: 'Kitap', icon: '📚', color: 'bg-amber-500', href: '/products?category=kitap' },
  ]

  return (
    <div className='space-y-8 md:space-y-12 max-w-7xl mx-auto'>
      {/* Hero Banner Section */}
      <section className='relative h-72 sm:h-80 md:h-96 bg-gradient-to-r from-gray-600 to-purple-600 rounded-lg overflow-hidden'>
        <div className='absolute inset-0 bg-black bg-opacity-40' />
        <div className='relative z-10 flex items-center justify-center h-full text-center text-white px-4 sm:px-6 mx-auto max-w-4xl'>
          <div className='space-y-4 sm:space-y-6 flex flex-col items-center gap-4'>
            <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold leading-tight'>
              Mobiversite Store'da
              <br className='sm:hidden' />
              Büyük Fırsatlar!
            </h1>
            <p className='text-sm sm:text-base md:text-xl leading-relaxed max-w-3xl mx-auto'>
              Elektronik, moda, takı ve binlerce üründe %70'e varan indirimler. Hızlı teslimat, güvenli ödeme garantisi
              ile Türkiye'nin en güvenilir online alışveriş platformu.
            </p>
            <Link href='/products'>
              <button className='bg-white text-gray-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-sm sm:text-base'>
                Fırsatları Keşfet
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className='overflow-hidden'>
        <div className='text-center mb-6 md:mb-8 px-2'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>
            Online Alışveriş Kategorileri
          </h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Elektronik ürünlerden modaya, takıdan kozmetiğe kadar geniş ürün yelpazesi ile ihtiyacınız olan her şey
            Mobiversite Store'da. Kaliteli markaları en uygun fiyatlarla keşfedin.
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 py-4 md:p-4'>
          {categories.map((category, index) => (
            <Link key={index} href={category.href} className='group cursor-pointer block'>
              <div className='bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200'>
                <div
                  className={`w-16 h-16 mx-auto mb-4 ${category.color} rounded-full flex items-center justify-center text-2xl`}
                >
                  {category.icon}
                </div>
                <h3 className='font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200'>
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Daily Deals Section */}
      <section>
        <Suspense
          fallback={
            <div className='bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 md:p-8 text-white text-center'>
              Yükleniyor...
            </div>
          }
        >
          <DailyDeals />
        </Suspense>
      </section>

      {/* Featured Products Section */}
      <section>
        <div className='text-center mb-6 md:mb-8 px-2'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>Öne Çıkan Ürünler</h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            En popüler ve en çok tercih edilen ürünlerimizi keşfedin
          </p>
        </div>

        <Suspense fallback={<ProductLoader />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      {/* Best Sellers Section */}
      <section>
        <div className='text-center mb-6 md:mb-8 px-2'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4'>🔥 En Çok Satanlar</h2>
          <p className='text-gray-600 dark:text-gray-400'>Bu ürünler çok beğeniliyor</p>
        </div>

        <Suspense fallback={<ProductLoader />}>
          <BestSellers />
        </Suspense>
      </section>

      {/* Enhanced Features Section */}
      <section className='grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 py-4'>
        <div className='text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <div className='w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-gray-600 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>Güvenli Alışveriş</h3>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>SSL sertifikası ile korunan ödeme</p>
        </div>

        <div className='text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
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
          <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>Hızlı Teslimat</h3>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>24 saat içinde kargoya teslim</p>
        </div>

        <div className='text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
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
          <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>Müşteri Memnuniyeti</h3>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>%100 memnuniyet garantisi</p>
        </div>

        <div className='text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow'>
          <div className='w-16 h-16 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-yellow-600 dark:text-yellow-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
              />
            </svg>
          </div>
          <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white'>Güvenli Ödeme</h3>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>Tüm kredi kartları kabul edilir</p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section>
        <div className='bg-gradient-to-r from-gray-600 to-purple-600 rounded-lg p-6 sm:p-8 text-center text-white'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4'>📧 Kampanyalardan Haberdar Olun</h2>
          <p className='text-gray-100 mb-6'>En yeni ürünler ve özel fırsatlardan ilk siz haberdar olun</p>

          <div className='flex flex-col md:flex-row gap-4 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='E-posta adresinizi girin'
              className='flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400'
            />
            <button className='bg-white text-gray-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300'>
              Abone Ol
            </button>
          </div>

          <div className='mt-6 flex flex-col md:flex-row items-center justify-center gap-4'>
            <span className='text-gray-100'>Mobil uygulamayı indirin:</span>
            <div className='flex gap-3'>
              <div className='bg-black text-white px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-800 transition'>
                📱 App Store
              </div>
              <div className='bg-black text-white px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-gray-800 transition'>
                🤖 Google Play
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
