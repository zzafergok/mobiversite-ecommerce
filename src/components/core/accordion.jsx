'use client'

import React, { useState, useCallback, useMemo, createContext, useContext } from 'react'

import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'

// Context
const AccordionContext = createContext(null)

const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion bileşenleri bir AccordionRoot içinde kullanılmalıdır')
  }
  return context
}

// AccordionRoot Props - JavaScript version (no TypeScript interfaces)

export function AccordionRoot({
  children,
  defaultValue = [],
  value,
  onValueChange,
  allowMultiple = false,
  className,
  type = 'single',
  collapsible = true,
}) {
  // type prop'u allowMultiple'a dönüştür
  const isMultiple = useMemo(() => type === 'multiple' || allowMultiple, [type, allowMultiple])

  // State yönetimi
  const [internalExpanded, setInternalExpanded] = useState(defaultValue || [])

  // Controlled veya uncontrolled modunu belirle
  const isControlled = value !== undefined
  const expandedItems = isControlled ? value : internalExpanded

  // Item'ı toggle et
  const toggleItem = useCallback(
    (itemValue) => {
      const newValue = (() => {
        // Eğer zaten açıksa
        if (expandedItems.includes(itemValue)) {
          // Collapsible false ise ve tek item açılabiliyorsa, kapatma
          if (!collapsible && !isMultiple && expandedItems.length === 1) {
            return expandedItems
          }
          // Aksi halde kapat
          return expandedItems.filter((item) => item !== itemValue)
        }

        // Eğer kapalıysa ve çoklu açılabiliyorsa, ekle
        if (isMultiple) {
          return [...expandedItems, itemValue]
        }

        // Eğer kapalıysa ve tekli açılabiliyorsa, sadece bu açık olsun
        return [itemValue]
      })()

      // State güncelle
      if (!isControlled) {
        setInternalExpanded(newValue)
      }

      // Callback'i çağır
      if (onValueChange) {
        onValueChange(newValue)
      }
    },
    [expandedItems, isMultiple, collapsible, isControlled, onValueChange],
  )

  // Item'ın açık olup olmadığını kontrol et
  const isExpanded = useCallback((itemValue) => expandedItems.includes(itemValue), [expandedItems])

  // Context değeri
  const contextValue = useMemo(
    () => ({
      expandedItems,
      toggleItem,
      isExpanded,
      allowMultiple: isMultiple,
    }),
    [expandedItems, toggleItem, isExpanded, isMultiple],
  )

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn('divide-y divide-neutral-200 dark:divide-neutral-700', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

// AccordionItem Props - JavaScript version

export function AccordionItem({ children, value, disabled = false, className }) {
  const { isExpanded } = useAccordionContext()
  const expanded = isExpanded(value)

  return (
    <div
      data-state={expanded ? 'open' : 'closed'}
      data-disabled={disabled ? 'true' : undefined}
      className={cn('overflow-hidden transition-all w-full', disabled && 'opacity-50 cursor-not-allowed', className)}
    >
      {children}
    </div>
  )
}

// AccordionTrigger Props - JavaScript version

export function AccordionTrigger({ children, className, hideIcon = false }) {
  const { toggleItem, isExpanded } = useAccordionContext()
  const item = React.useContext(AccordionItemContext)

  if (!item) {
    throw new Error('AccordionTrigger bir AccordionItem içinde kullanılmalıdır')
  }

  const { value, disabled } = item
  const expanded = isExpanded(value)

  const handleClick = useCallback(() => {
    if (!disabled) {
      toggleItem(value)
    }
  }, [disabled, toggleItem, value])

  return (
    <button
      type='button'
      onClick={handleClick}
      disabled={disabled}
      aria-expanded={expanded}
      className={cn(
        'flex items-center justify-between w-full py-4 px-4 text-left text-base font-medium transition-colors',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:ring-inset',
        'hover:bg-neutral-50 dark:hover:bg-neutral-800/50',
        expanded && 'bg-neutral-50 dark:bg-neutral-800/50',
        disabled && 'cursor-not-allowed',
        className,
      )}
    >
      {children}

      {!hideIcon && (
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200',
            expanded && 'rotate-180',
          )}
        />
      )}
    </button>
  )
}

// AccordionContent Props - JavaScript version

export function AccordionContent({ children, className, forceMount = false }) {
  const { isExpanded } = useAccordionContext()
  const item = React.useContext(AccordionItemContext)

  if (!item) {
    throw new Error('AccordionContent bir AccordionItem içinde kullanılmalıdır')
  }

  const { value } = item
  const expanded = isExpanded(value)

  return (
    <AnimatePresence initial={false}>
      {(expanded || forceMount) && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className='overflow-hidden'
        >
          <div className={cn('px-4 pb-4 pt-4', className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// AccordionItem Context
const AccordionItemContext = createContext(null)

// Bileşen ağacını yeniden düzenleyelim
export const Accordion = {
  Root: AccordionRoot,
  Item: ({ children, ...props }) => {
    const contextValue = {
      value: props.value,
      disabled: props.disabled || false,
    }

    return (
      <AccordionItemContext.Provider value={contextValue}>
        <AccordionItem {...props}>{children}</AccordionItem>
      </AccordionItemContext.Provider>
    )
  },
  Trigger: AccordionTrigger,
  Content: AccordionContent,
}

// Kullanım örneği
export function AccordionExample() {
  return (
    <div className='p-6 max-w-md mx-auto'>
      <h2 className='text-lg font-medium mb-4'>Accordion Örneği</h2>

      <Accordion.Root
        defaultValue={['item-1']}
        className='border rounded-lg border-neutral-200 dark:border-neutral-700'
      >
        <Accordion.Item value='item-1'>
          <Accordion.Trigger>Accordion Item 1</Accordion.Trigger>
          <Accordion.Content>
            <p className='text-neutral-600 dark:text-neutral-400'>
              Bu bir örnek açıklama metnidir. Accordion içeriğini burada gösteriyoruz. İçerik uzun veya kısa olabilir.
            </p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='item-2'>
          <Accordion.Trigger>Accordion Item 2</Accordion.Trigger>
          <Accordion.Content>
            <p className='text-neutral-600 dark:text-neutral-400'>
              İkinci accordion öğesinin içeriği burada yer alır. Bu içerik farklı bir bilgi barındırabilir.
            </p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value='item-3'>
          <Accordion.Trigger>Accordion Item 3</Accordion.Trigger>
          <Accordion.Content>
            <p className='text-neutral-600 dark:text-neutral-400'>
              Üçüncü accordion öğesinin içeriği. İsterseniz burada resim, liste veya başka bileşenler de
              kullanabilirsiniz.
            </p>
            <div className='mt-2 p-2 bg-primary-50 dark:bg-primary-900/20 rounded'>
              <p className='text-xs'>Örnek bir vurgulanmış alan</p>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  )
}
