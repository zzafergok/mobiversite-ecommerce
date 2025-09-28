'use client'

import * as React from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-center', className)}
    {...props}
  >
    <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800'>
      <SliderPrimitive.Range className='absolute h-full bg-primary-500 dark:bg-primary-600' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='block h-5 w-5 rounded-full border-2 border-primary-500 bg-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-50 dark:border-primary-600 dark:bg-neutral-950 dark:focus-visible:ring-primary/40' />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
