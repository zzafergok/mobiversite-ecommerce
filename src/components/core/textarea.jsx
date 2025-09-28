'use client'

import * as React from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textareaVariants = cva(
  'flex min-h-[60px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary/40',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-red-500 focus-visible:ring-red-500/50 dark:border-red-500 dark:focus-visible:ring-red-500/50',
        success:
          'border-green-500 focus-visible:ring-green-500/50 dark:border-green-500 dark:focus-visible:ring-green-500/50',
      },
      size: {
        default: 'min-h-[60px]',
        sm: 'min-h-[40px] text-xs',
        lg: 'min-h-[80px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const Textarea = React.forwardRef(
  ({ className, variant, size, error, maxLength, showCount, autoResize, value, onChange, ...props }, ref) => {
    const hasError = !!error
    const finalVariant = hasError ? 'error' : variant
    const [internalValue, setInternalValue] = React.useState(value || '')
    const textareaRef = React.useRef(null)

    // Auto-resize functionality
    React.useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [internalValue, autoResize])

    // Merge refs
    React.useImperativeHandle(ref, () => textareaRef.current, [])

    const handleChange = (e) => {
      const newValue = e.target.value

      // Respect maxLength
      if (maxLength && newValue.length > maxLength) {
        return
      }

      setInternalValue(newValue)
      onChange?.(e)
    }

    const currentLength =
      typeof value === 'string'
        ? value.length
        : Array.isArray(value)
          ? value.join('').length
          : typeof value === 'number'
            ? value.toString().length
            : internalValue.toString().length
    const displayValue = value !== undefined ? value : internalValue

    return (
      <div className='relative w-full'>
        <textarea
          ref={textareaRef}
          className={cn(
            textareaVariants({ variant: finalVariant, size }),
            autoResize && 'resize-none overflow-hidden',
            className,
          )}
          value={displayValue}
          onChange={handleChange}
          maxLength={maxLength}
          {...props}
        />

        {(showCount || maxLength) && (
          <div className='absolute bottom-2 right-2 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-950 px-1'>
            {showCount && (
              <span
                className={cn(
                  maxLength && currentLength > maxLength * 0.9 && 'text-yellow-600 dark:text-yellow-400',
                  maxLength && currentLength >= maxLength && 'text-red-600 dark:text-red-400',
                )}
              >
                {currentLength}
              </span>
            )}
            {maxLength && (
              <span>
                {showCount ? '/' : ''}
                {maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea, textareaVariants }
