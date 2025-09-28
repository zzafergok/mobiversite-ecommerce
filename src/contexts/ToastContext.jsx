'use client'

import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = {
      id,
      type: 'success',
      duration: 4000,
      ...toast,
      timeoutId: null,
      isPaused: false,
    }

    setToasts((prev) => [...prev, newToast])

    // Auto remove toast with timeout reference
    const timeoutId = setTimeout(() => {
      removeToast(id)
    }, newToast.duration)

    // Update toast with timeout ID
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, timeoutId } : t)))

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => {
      const toast = prev.find((t) => t.id === id)
      if (toast?.timeoutId) {
        clearTimeout(toast.timeoutId)
      }
      return prev.filter((toast) => toast.id !== id)
    })
  }, [])

  const pauseToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((toast) => {
        if (toast.id === id && !toast.isPaused) {
          // Clear existing timeout
          if (toast.timeoutId) {
            clearTimeout(toast.timeoutId)
          }
          return { ...toast, isPaused: true, timeoutId: null }
        }
        return toast
      }),
    )
  }, [])

  const resumeToast = useCallback(
    (id, remainingTime) => {
      setToasts((prev) =>
        prev.map((toast) => {
          if (toast.id === id && toast.isPaused) {
            // Set new timeout with remaining time
            const timeoutId = setTimeout(() => {
              removeToast(id)
            }, remainingTime)
            return { ...toast, isPaused: false, timeoutId }
          }
          return toast
        }),
      )
    },
    [removeToast],
  )

  const showSuccess = useCallback(
    (message, options = {}) => {
      return addToast({
        type: 'success',
        message,
        ...options,
      })
    },
    [addToast],
  )

  const showError = useCallback(
    (message, options = {}) => {
      return addToast({
        type: 'error',
        message,
        ...options,
      })
    },
    [addToast],
  )

  const showInfo = useCallback(
    (message, options = {}) => {
      return addToast({
        type: 'info',
        message,
        ...options,
      })
    },
    [addToast],
  )

  const showAddToCart = useCallback(
    (product, options = {}) => {
      // Check if there's already a cart toast for this product
      const existingCartToast = toasts.find((toast) => toast.type === 'cart' && toast.product?.id === product.id)

      if (existingCartToast) {
        // Remove existing toast and create a new one
        removeToast(existingCartToast.id)
      }

      return addToast({
        type: 'cart',
        product,
        message: 'Ürün sepete eklendi',
        duration: 5000,
        ...options,
      })
    },
    [addToast, removeToast, toasts],
  )

  const showRemoveFromCart = useCallback(
    (product, options = {}) => {
      // Check if there's already a remove-cart toast for this product
      const existingRemoveToast = toasts.find(
        (toast) => toast.type === 'remove-cart' && toast.product?.id === product.id,
      )

      if (existingRemoveToast) {
        // Remove existing toast and create a new one
        removeToast(existingRemoveToast.id)
      }

      return addToast({
        type: 'remove-cart',
        product,
        message: 'Ürün sepetten çıkarıldı',
        duration: 8000, // Longer duration for wishlist question
        ...options,
      })
    },
    [addToast, removeToast, toasts],
  )

  const clearAllToasts = useCallback(() => {
    // Clear all timeouts first
    toasts.forEach((toast) => {
      if (toast.timeoutId) {
        clearTimeout(toast.timeoutId)
      }
    })
    // Clear all toasts
    setToasts([])
  }, [toasts])

  const clearToastsByType = useCallback((type) => {
    setToasts((prev) => {
      const toastsToRemove = prev.filter((toast) => toast.type === type)
      const toastsToKeep = prev.filter((toast) => toast.type !== type)

      // Clear timeouts for removed toasts
      toastsToRemove.forEach((toast) => {
        if (toast.timeoutId) {
          clearTimeout(toast.timeoutId)
        }
      })

      return toastsToKeep
    })
  }, [])

  const value = {
    toasts,
    addToast,
    removeToast,
    pauseToast,
    resumeToast,
    showSuccess,
    showError,
    showInfo,
    showAddToCart,
    showRemoveFromCart,
    clearAllToasts,
    clearToastsByType,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
