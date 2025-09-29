import { ProductLoader } from '@/components/ui/EcommerceLoader'

export default function Loading() {
  return (
    <div>
      <div className='mb-8'>
        <div className='h-8 bg-gray-200 rounded animate-pulse mb-2 w-48'></div>
        <div className='h-4 bg-gray-200 rounded animate-pulse w-64'></div>
      </div>
      <ProductLoader />
    </div>
  )
}
