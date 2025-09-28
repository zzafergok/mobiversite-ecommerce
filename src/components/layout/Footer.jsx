'use client'

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
              Teknoloji ve elektronik ürünlerinde güvenilir adresiniz. En kaliteli ürünleri en uygun fiyatlarla
              sunuyoruz.
            </p>
            <div className='flex space-x-4'>
              <span className='text-xs text-gray-400'>© 2024 D-MARKET Elektronik Hizmetler Tic. A.Ş.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-semibold mb-4'>Hızlı Erişim</h4>
            <ul className='space-y-2 text-sm text-gray-300'>
              <li>Güvenli Alışveriş</li>
              <li>Gizlilik Politikası</li>
              <li>Kullanım Koşulları</li>
              <li>İptal ve İade</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='font-semibold mb-4'>Müşteri Hizmetleri</h4>
            <ul className='space-y-2 text-sm text-gray-300'>
              <li>İletişim</li>
              <li>Canlı Destek</li>
              <li>SSS</li>
              <li>0850 252 40 00</li>
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
