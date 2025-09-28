'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { useToast } from './ToastContext'
import useApiService from '@/hooks/ecommerce/useApiService'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      }

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || [],
      }

    case 'MERGE_CARTS': {
      // Merge guest cart with user cart, avoiding duplicates
      const { userCart, guestCart } = action.payload
      const mergedItems = [...userCart]

      guestCart.forEach((guestItem) => {
        const existingItem = mergedItems.find((item) => item.id === guestItem.id)
        if (existingItem) {
          existingItem.quantity += guestItem.quantity
        } else {
          mergedItems.push(guestItem)
        }
      })

      return {
        ...state,
        items: mergedItems,
      }
    }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const { user, isAuthenticated } = useAuth()
  const { showAddToCart, showRemoveFromCart, clearToastsByType } = useToast()
  const apiService = useApiService()

  // Load cart on mount and auth changes
  useEffect(() => {
    const loadCart = async () => {
      if (typeof window === 'undefined') return

      if (isAuthenticated && user?.id) {
        // User is logged in - load their persistent cart
        try {
          const userCart = await apiService.getUserCart(user.id)
          const userCartItems = userCart?.items || []

          // Get guest cart from localStorage
          const guestCartJson = localStorage.getItem('guestCart')
          const guestCartItems = guestCartJson ? JSON.parse(guestCartJson) : []

          if (guestCartItems.length > 0) {
            // Merge guest cart with user cart
            dispatch({
              type: 'MERGE_CARTS',
              payload: {
                userCart: userCartItems,
                guestCart: guestCartItems,
              },
            })
            // Clear guest cart after merging
            localStorage.removeItem('guestCart')
          } else {
            // Just load user cart
            dispatch({ type: 'LOAD_CART', payload: userCartItems })
          }
        } catch (error) {
          console.error('Error loading user cart:', error)
        }
      } else {
        // User not logged in - load guest cart from localStorage
        const guestCart = localStorage.getItem('guestCart')
        if (guestCart) {
          try {
            dispatch({ type: 'LOAD_CART', payload: JSON.parse(guestCart) })
          } catch (error) {
            console.error('Error loading guest cart:', error)
          }
        }
      }
    }

    loadCart()
  }, [isAuthenticated, user?.id, apiService])

  // Save cart changes
  useEffect(() => {
    const saveCart = async () => {
      if (typeof window === 'undefined') return

      if (isAuthenticated && user?.id) {
        // Save to user's persistent cart
        try {
          await apiService.updateUserCart(user.id, state.items)
        } catch (error) {
          console.error('Error saving user cart:', error)
        }
      } else {
        // Save to guest cart in localStorage
        localStorage.setItem('guestCart', JSON.stringify(state.items))
      }
    }

    // Only save if we have initialized the cart
    if (state.items.length > 0 || localStorage.getItem('guestCart')) {
      saveCart()
    }
  }, [state.items, isAuthenticated, user?.id, apiService])

  // Clear guest cart on logout
  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      // User logged out - clear any remaining cart and start fresh
      localStorage.removeItem('guestCart')
      dispatch({ type: 'CLEAR_CART' })
      // Clear any remove-cart toasts that might be showing wishlist questions
      clearToastsByType('remove-cart')
    }
  }, [isAuthenticated, clearToastsByType])

  const addToCart = (product, quantity = 1) => {
    // Add product multiple times if quantity > 1
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product })
    }
    // Show toast notification with quantity info
    showAddToCart(product, { quantity })
  }

  const removeFromCart = (productId) => {
    // Find the product before removing it to show in toast
    const product = state.items.find((item) => item.id === productId)
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })

    // Show remove toast if product was found
    if (product) {
      showRemoveFromCart(product)
    }
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
