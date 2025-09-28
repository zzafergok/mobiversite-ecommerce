'use client'

import { useEffect } from 'react'

import { X } from 'lucide-react'

import { Button } from '@/components/core/button'

export default function BottomSheet({ isOpen, onClose, title, children }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-[60] lg:hidden'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' onClick={onClose} />

      {/* Bottom Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle */}
        <div className='flex justify-center pt-3 pb-1'>
          <div className='w-10 h-1 bg-gray-300 rounded-full' />
        </div>

        {/* Header */}
        <div className='flex items-center justify-between px-4 py-3 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
          <Button variant='ghost' size='icon' onClick={onClose} className='h-8 w-8'>
            <X size={18} />
          </Button>
        </div>

        {/* Content */}
        <div className='max-h-[70vh] overflow-y-auto'>{children}</div>
      </div>
    </div>
  )
}
