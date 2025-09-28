'use client'

import React, { useState, useMemo } from 'react'
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/core/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/core/popover'
import { cn } from '@/lib/utils'

const MONTHS = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
]

const QUICK_DATES = [
  {
    label: 'Bu Ay',
    getValue: () => {
      const now = new Date()
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
    },
  },
  {
    label: 'Geçen Ay',
    getValue: () => {
      const now = new Date()
      now.setMonth(now.getMonth() - 1)
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
    },
  },
  {
    label: '6 Ay Önce',
    getValue: () => {
      const now = new Date()
      now.setMonth(now.getMonth() - 6)
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
    },
  },
  {
    label: '1 Yıl Önce',
    getValue: () => {
      const now = new Date()
      now.setFullYear(now.getFullYear() - 1)
      return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
    },
  },
]

export function MonthYearPicker({
  value,
  onChange,
  placeholder = 'Ay/Yıl seçin',
  disabled = false,
  clearable = true,
  minDate,
  maxDate,
  className,
  error = false,
}) {
  const [isOpen, setIsOpen] = useState(false)

  // Parse current value or default to current date
  const currentDate = useMemo(() => {
    if (value) {
      const [year, month] = value.split('-')
      return { year: parseInt(year), month: parseInt(month) - 1 }
    }
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  }, [value])

  const [currentYear, setCurrentYear] = useState(currentDate.year)

  // Format displayed value
  const displayValue = useMemo(() => {
    if (!value) return placeholder
    const [year, month] = value.split('-')
    return `${MONTHS[parseInt(month) - 1]} ${year}`
  }, [value, placeholder])

  const handleMonthSelect = (monthIndex) => {
    const monthStr = (monthIndex + 1).toString().padStart(2, '0')
    const newValue = `${currentYear}-${monthStr}`
    onChange(newValue)
    setIsOpen(false)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange(null)
  }

  const handleQuickDateSelect = (quickDate) => {
    const dateValue = quickDate.getValue()
    onChange(dateValue)
    setIsOpen(false)
  }

  const navigateYear = (direction) => {
    setCurrentYear((prev) => (direction === 'prev' ? prev - 1 : prev + 1))
  }

  const isMonthDisabled = (monthIndex) => {
    const monthValue = `${currentYear}-${(monthIndex + 1).toString().padStart(2, '0')}`
    if (minDate && monthValue < minDate) return true
    if (maxDate && monthValue > maxDate) return true
    return false
  }

  const isMonthSelected = (monthIndex) => {
    if (!value) return false
    const monthValue = `${currentYear}-${(monthIndex + 1).toString().padStart(2, '0')}`
    return monthValue === value
  }

  const isCurrentMonth = (monthIndex) => {
    const now = new Date()
    return now.getFullYear() === currentYear && now.getMonth() === monthIndex
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-full justify-start text-left font-normal h-10 px-3 py-2',
            !value && 'text-muted-foreground',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            'hover: dark:hover:bg-gray-800/50',
            'transition-all duration-200',
            className,
          )}
          disabled={disabled}
        >
          <Calendar className='mr-2 h-4 w-4 shrink-0 text-gray-500' />
          <span className='truncate'>{displayValue}</span>
          {clearable && value && !disabled && (
            <X
              className='ml-auto h-4 w-4 shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
              onClick={handleClear}
            />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-auto p-0 shadow-lg border border-gray-200 dark:border-gray-700' align='start'>
        <div className='flex'>
          {/* Quick dates sidebar */}
          <div className='border-r border-gray-200 dark:border-gray-700 p-3 min-w-[120px]'>
            <div className='text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide'>
              Hızlı Seçim
            </div>
            <div className='space-y-1'>
              {QUICK_DATES.map((quickDate, index) => (
                <Button
                  key={index}
                  variant='ghost'
                  size='sm'
                  className='w-full justify-start h-8 px-2 text-xs font-normal hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  onClick={() => handleQuickDateSelect(quickDate)}
                >
                  {quickDate.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Month/Year picker */}
          <div className='p-3 min-w-[280px]'>
            {/* Year navigation */}
            <div className='flex items-center justify-between mb-4'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigateYear('prev')}
                className='h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>

              <div className='text-lg font-semibold text-gray-900 dark:text-gray-100 min-w-[80px] text-center'>
                {currentYear}
              </div>

              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigateYear('next')}
                className='h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>

            {/* Months grid */}
            <div className='grid grid-cols-3 gap-2'>
              {MONTHS.map((month, index) => {
                const selected = isMonthSelected(index)
                const current = isCurrentMonth(index)
                const disabled = isMonthDisabled(index)

                return (
                  <Button
                    key={index}
                    variant='ghost'
                    size='sm'
                    className={cn(
                      'h-10 px-3 text-sm font-normal relative flex items-center justify-center',
                      'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                      selected && 'bg-blue-600 text-white hover:bg-blue-700',
                      current &&
                        !selected &&
                        'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold',
                      disabled && 'opacity-50 cursor-not-allowed',
                    )}
                    onClick={() => !disabled && handleMonthSelect(index)}
                    disabled={disabled}
                  >
                    {month}
                    {current && !selected && (
                      <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full' />
                    )}
                  </Button>
                )
              })}
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700'>
              <div className='text-xs text-gray-500 dark:text-gray-400'>
                {value ? displayValue : 'Ay/Yıl seçilmedi'}
              </div>
              <Button size='sm' variant='outline' onClick={() => setIsOpen(false)} className='h-7 px-3 text-xs'>
                Tamam
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
