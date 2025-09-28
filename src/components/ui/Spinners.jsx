// Page Loading Spinner - Büyük ve merkezi kullanım için
export const PageLoadingSpinner = ({ size = 'large', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className='relative'>
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin`}
        ></div>
      </div>
    </div>
  )
}

// Products Loading Spinner - Ürün listesi yüklenirken
export const ProductsLoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-14 h-14',
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className='relative'>
        <div
          className={`${sizeClasses[size]} rounded-full border-3 border-orange-200 border-t-orange-500 animate-spin`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${size === 'small' ? 'w-3 h-3' : size === 'medium' ? 'w-5 h-5' : 'w-7 h-7'} rounded-full border-2 border-orange-300 border-t-transparent animate-spin`}
          style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}
        ></div>
      </div>
    </div>
  )
}

// Order Completion Spinner - Sipariş tamamlanırken
export const OrderCompletionSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className='relative'>
        {/* Ana daire */}
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-green-200 border-t-green-500 animate-spin`}
        ></div>
        {/* İç daireler */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${size === 'small' ? 'w-4 h-4' : size === 'medium' ? 'w-6 h-6' : 'w-8 h-8'} rounded-full border-2 border-green-300 border-b-transparent animate-spin`}
          style={{ animationDuration: '1.5s' }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4'} rounded-full bg-green-500 animate-pulse`}
        ></div>
      </div>
    </div>
  )
}

// Genel kullanım için basit spinner
export const SimpleSpinner = ({ size = 'medium', color = 'blue', className = '' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-10 h-10',
  }

  const colorClasses = {
    blue: 'border-blue-200 border-t-blue-500',
    green: 'border-green-200 border-t-green-500',
    orange: 'border-orange-200 border-t-orange-500',
    gray: 'border-gray-200 border-t-gray-500',
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-3 ${colorClasses[color]} animate-spin ${className}`}
    ></div>
  )
}
