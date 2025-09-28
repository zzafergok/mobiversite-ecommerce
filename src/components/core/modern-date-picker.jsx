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

const DAYS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pa']

const QUICK_DATES = [
  { label: 'Bugün', getValue: () => new Date() },
  { label: 'Yarın', getValue: () => new Date(Date.now() + 24 * 60 * 60 * 1000) },
  { label: '1 Hafta Sonra', getValue: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  { label: '2 Hafta Sonra', getValue: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
  { label: '1 Ay Sonra', getValue: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
]

export function ModernDatePicker({
  value,
  onChange,
  placeholder = 'Tarih seçin',
  disabled = false,
  clearable = true,
  minDate,
  maxDate,
  className,
  error = false,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(value?.getMonth() ?? new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(value?.getFullYear() ?? new Date().getFullYear())

  // Format displayed date
  const displayValue = useMemo(() => {
    if (!value) return placeholder
    return value.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }, [value, placeholder])

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startDate = new Date(firstDay)
    const endDate = new Date(lastDay)

    // Adjust to start from Monday
    const startDay = (firstDay.getDay() + 6) % 7
    startDate.setDate(firstDay.getDate() - startDay)

    // Adjust to end on Sunday
    const endDay = (lastDay.getDay() + 6) % 7
    endDate.setDate(lastDay.getDate() + (6 - endDay))

    const days = []
    const current = new Date(startDate)

    while (current <= endDate) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return days
  }, [currentMonth, currentYear])

  const handleDateSelect = (date) => {
    onChange(date)
    setIsOpen(false)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange(null)
  }

  const handleQuickDateSelect = (quickDate) => {
    const date = quickDate.getValue()
    onChange(date)
    setIsOpen(false)
  }

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    }
  }

  const isDateDisabled = (date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isDateSelected = (date) => {
    if (!value) return false
    return date.toDateString() === value.toDateString()
  }

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentMonth
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
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
          <div className='border-r border-gray-200 dark:border-gray-700 p-3 max-w-[100px]'>
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

          {/* Calendar */}
          <div className='p-3'>
            {/* Calendar header */}
            <div className='flex items-center justify-between mb-4'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigateMonth('prev')}
                className='h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>

              <div className='text-sm font-semibold text-gray-900 dark:text-gray-100 min-w-[120px] text-center'>
                {MONTHS[currentMonth]} {currentYear}
              </div>

              <Button
                variant='ghost'
                size='sm'
                onClick={() => navigateMonth('next')}
                className='h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>

            {/* Days header */}
            <div className='grid grid-cols-7 gap-1 mb-2'>
              {DAYS.map((day) => (
                <div
                  key={day}
                  className='h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400'
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className='grid grid-cols-7 gap-1'>
              {calendarDays.map((date, index) => {
                const selected = isDateSelected(date)
                const today = isToday(date)
                const currentMonthDate = isCurrentMonth(date)
                const disabled = isDateDisabled(date)

                return (
                  <Button
                    key={index}
                    variant='ghost'
                    size='sm'
                    className={cn(
                      'h-8 w-8 p-0 text-sm font-normal relative',
                      !currentMonthDate && 'text-gray-300 dark:text-gray-600',
                      currentMonthDate &&
                        !selected &&
                        'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
                      selected && 'bg-blue-600 text-white hover:bg-blue-700',
                      today &&
                        !selected &&
                        'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold',
                      disabled && 'opacity-50 cursor-not-allowed',
                    )}
                    onClick={() => !disabled && handleDateSelect(date)}
                    disabled={disabled}
                  >
                    {date.getDate()}
                    {today && !selected && (
                      <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full' />
                    )}
                  </Button>
                )
              })}
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700'>
              <div className='text-xs text-gray-500 dark:text-gray-400'>
                {value ? value.toLocaleDateString('tr-TR') : 'Tarih seçilmedi'}
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
