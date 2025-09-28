'use client'

import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useAuth } from '@/contexts/AuthContext'

import ProfileSidebar from '@/components/layout/ProfileSidebar'
import { PageLoadingSpinner } from '@/components/ui/Spinners'

export default function ProfileLayout({ children }) {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login?redirect=/profile')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className='min-h-96'>
        <PageLoadingSpinner />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className='min-h-screen'>
      {/* Mobile Layout */}
      <div className='lg:hidden'>
        <div className='sticky top-0 z-40  pb-1 pt-4'>
          <ProfileSidebar />
        </div>
        <div className='px-4 pb-20 pt-4'>
          <div className='max-w-4xl mx-auto'>{children}</div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden lg:flex pt-8 max-w-7xl mx-auto'>
        <ProfileSidebar />
        <div className='flex-1 p-6'>
          <div className='max-w-4xl mx-auto'>{children}</div>
        </div>
      </div>
    </div>
  )
}
