'use client'

import React from 'react'

import { PageLoadingSpinner, ProductsLoadingSpinner, OrderCompletionSpinner, SimpleSpinner } from './Spinners'

const EcommerceLoader = ({
  size = 'medium',
  text = 'Yükleniyor...',
  type = 'default',
  className = '',
  showText = true,
}) => {
  const getSpinnerComponent = () => {
    switch (type) {
      case 'shopping':
      case 'page':
        return <PageLoadingSpinner size={size} className='flex justify-center items-center' />
      case 'products':
      case 'cart':
        return <ProductsLoadingSpinner size={size} className='flex justify-center items-center' />
      case 'orders':
      case 'package':
        return <OrderCompletionSpinner size={size} className='flex justify-center items-center' />
      default:
        return <SimpleSpinner size={size} className='mx-auto' />
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className='mb-6'>{getSpinnerComponent()}</div>
      {showText && (
        <div className='mt-4'>
          <p className='text-sm text-gray-600 font-medium animate-pulse'>{text}</p>
        </div>
      )}
    </div>
  )
}

// Pre-configured loaders for common use cases
export const ProductLoader = ({ size = 'medium', className = '', text = 'Ürünler yükleniyor...' }) => (
  <EcommerceLoader type='products' text={text} size={size} className={className} />
)

export const CartLoader = ({ size = 'medium', className = '', text = 'Sepet yükleniyor...' }) => (
  <EcommerceLoader type='cart' text={text} size={size} className={className} />
)

export const OrderLoader = ({ size = 'medium', className = '', text = 'Siparişler yükleniyor...' }) => (
  <EcommerceLoader type='orders' text={text} size={size} className={className} />
)

export const PageLoader = ({ size = 'large', className = '', text = 'Sayfa yükleniyor...' }) => (
  <EcommerceLoader type='page' text={text} size={size} className={`min-h-96 ${className}`} />
)

export const DataLoader = ({ size = 'medium', className = '', text = 'Veriler yükleniyor...' }) => (
  <EcommerceLoader type='default' text={text} size={size} className={className} />
)

export default EcommerceLoader
