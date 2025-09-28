'use client'

import * as React from 'react'

import { Check } from 'lucide-react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border shadow transition-all',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset',
      'disabled:cursor-not-allowed disabled:opacity-50',
      // Light mode styles
      'border-neutral-300 bg-white text-white',
      'hover:border-neutral-400 hover:bg-neutral-50',
      'focus-visible:ring-primary/50',
      'data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500',
      'data-[state=checked]:text-white',
      // Dark mode styles
      'dark:border-neutral-600 dark:bg-neutral-900 dark:text-white',
      'dark:hover:border-neutral-500 dark:hover:bg-neutral-800',
      'dark:focus-visible:ring-primary/40',
      'dark:data-[state=checked]:bg-primary-600 dark:data-[state=checked]:border-primary-600',
      'dark:data-[state=checked]:text-white',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className='h-3.5 w-3.5' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
