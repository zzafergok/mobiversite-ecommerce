import Link from 'next/link'
import { Package, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/core/button'
import { Card, CardContent } from '@/components/core/card'

export default function NotFound() {
  return (
    <div className='min-h-[60vh] flex items-center justify-center'>
      <Card className='max-w-md w-full text-center'>
        <CardContent className='pt-16 pb-16'>
          <Package className='mx-auto h-20 w-20 text-gray-300 mb-6' />
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Ürün Bulunamadı</h2>
          <p className='text-gray-600 mb-8'>Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
          <div className='space-y-3'>
            <Button asChild className='w-full'>
              <Link href='/products'>Tüm Ürünleri Görüntüle</Link>
            </Button>
            <Button variant='outline' asChild className='w-full'>
              <Link href='/' className='flex items-center justify-center gap-2'>
                <ArrowLeft size={16} />
                Ana Sayfaya Dön
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
