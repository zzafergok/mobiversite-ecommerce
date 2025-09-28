import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  [
    'flex w-full rounded-md border px-3 py-2 text-sm transition-colors',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'border-neutral-200 bg-white text-neutral-900',
          'dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100',
          'focus-visible:ring-primary/50 dark:focus-visible:ring-primary/40',
          'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
        ].join(' '),
        error: [
          'border-red-500 bg-white text-neutral-900',
          'dark:border-red-400 dark:bg-neutral-900 dark:text-neutral-100',
          'focus-visible:ring-red-500/50 dark:focus-visible:ring-red-400/50',
          'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
        ].join(' '),
        success: [
          'border-green-500 bg-white text-neutral-900',
          'dark:border-green-400 dark:bg-neutral-900 dark:text-neutral-100',
          'focus-visible:ring-green-500/50 dark:focus-visible:ring-green-400/50',
          'placeholder:text-neutral-500 dark:placeholder:text-neutral-400',
        ].join(' '),
      },
      inputSize: {
        default: 'h-10 px-3 py-2',
        sm: 'h-8 px-2 py-1 text-xs',
        lg: 'h-12 px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  },
)

const Input = React.forwardRef(({ className, variant, inputSize, type, startIcon, endIcon, error, ...props }, ref) => {
  const hasError = Boolean(error)
  const effectiveVariant = hasError ? 'error' : variant

  if (startIcon || endIcon) {
    return (
      <div className='relative'>
        {startIcon && (
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400'>
            {startIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant: effectiveVariant, inputSize }),
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            type === 'number' &&
              '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]',
            className,
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400'>
            {endIcon}
          </div>
        )}
        {error && <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{error}</p>}
      </div>
    )
  }

  return (
    <>
      <input
        type={type}
        className={cn(
          inputVariants({ variant: effectiveVariant, inputSize }),
          type === 'number' &&
            '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]',
          className,
        )}
        ref={ref}
        {...props}
      />
      {error && <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{error}</p>}
    </>
  )
})
Input.displayName = 'Input'

export { Input, inputVariants }
