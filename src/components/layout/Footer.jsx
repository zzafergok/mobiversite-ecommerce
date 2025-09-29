'use client'

import Link from 'next/link'
import { Badge } from '@/components/core/badge'
import { Separator } from '@/components/core/separator'

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white mt-12 pb-16 md:pb-0'>
      <div className='w-full px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='col-span-1 md:col-span-2'>
            <h3 className='text-lg font-bold mb-4'>Mobiversite Store</h3>
            <p className='text-gray-300 text-sm mb-4'>
              Türkiye'nin en güvenilir online alışveriş platformu. Elektronik, moda, takı ve binlerce üründe en iyi
              fiyat garantisi. Hızlı teslimat, güvenli ödeme ve 7/24 müşteri hizmetleri ile yanınızdayız.
            </p>
            <div className='flex space-x-4'>
              <span className='text-xs text-gray-400'>© 2024 Mobiversite E-Ticaret Ltd. Şti.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-semibold mb-4'>Kategoriler</h4>
            <ul className='space-y-2 text-sm text-gray-300'>
              <li>
                <Link href='/products?category=electronics' className='hover:text-white transition-colors'>
                  Elektronik
                </Link>
              </li>
              <li>
                <Link href="/products?category=men's clothing" className='hover:text-white transition-colors'>
                  Erkek Giyim
                </Link>
              </li>
              <li>
                <Link href="/products?category=women's clothing" className='hover:text-white transition-colors'>
                  Kadın Giyim
                </Link>
              </li>
              <li>
                <Link href='/products?category=jewelery' className='hover:text-white transition-colors'>
                  Takı & Mücevher
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='font-semibold mb-4'>Hızlı Linkler</h4>
            <ul className='space-y-2 text-sm text-gray-300'>
              <li>
                <Link href='/products' className='hover:text-white transition-colors'>
                  Tüm Ürünler
                </Link>
              </li>
              <li>
                <Link href='/cart' className='hover:text-white transition-colors'>
                  Sepetim
                </Link>
              </li>
              <li>
                <Link href='/cookie-policy' className='hover:text-white transition-colors'>
                  Çerez Politikası
                </Link>
              </li>
              <li>
                <Link href='/login' className='hover:text-white transition-colors'>
                  Giriş Yap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <Separator className='mt-8 bg-gray-700' />
        <div className='pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='text-xs text-gray-400 mb-4 md:mb-0'>Her Hakkı Saklıdır.</div>
            <div className='flex items-center space-x-2'>
              <span className='text-xs text-gray-400'>Güvenli Ödeme:</span>
              <div className='flex space-x-1'>
                <Badge
                  backgroundColor='#2563eb'
                  textColor='white'
                  className='w-8 h-5 rounded text-xs font-bold flex items-center justify-center'
                >
                  V
                </Badge>
                <Badge
                  backgroundColor='#dc2626'
                  textColor='white'
                  className='w-8 h-5 rounded text-xs font-bold flex items-center justify-center'
                >
                  M
                </Badge>
                <Badge
                  backgroundColor='#3b82f6'
                  textColor='white'
                  className='w-8 h-5 rounded text-xs font-bold flex items-center justify-center'
                >
                  A
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
