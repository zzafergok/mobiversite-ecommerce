import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center dark:bg-gray-900'>
      <div className='text-center px-4'>
        <div className='mb-8'>
          <h1 className='text-9xl font-bold text-gray-300 dark:text-gray-700'>404</h1>
        </div>

        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>Sayfa Bulunamadı</h2>
          <p className='text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto'>
            Aradığınız sayfa mevcut değil, taşınmış veya silinmiş olabilir.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold'
          >
            <Home size={20} />
            Ana Sayfaya Dön
          </Link>

          <Link
            href='/products'
            className='inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold'
          >
            <Search size={20} />
            Ürünleri İncele
          </Link>
        </div>

        <div className='mt-8 text-sm text-gray-500 dark:text-gray-400'>
          <p>Sorun devam ederse lütfen bizimle iletişime geçin.</p>
        </div>
      </div>
    </div>
  )
}
