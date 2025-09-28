'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'

const WishlistContext = createContext()

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return state
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    }

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
      }

    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload || [],
      }

    default:
      return state
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] })

  // LocalStorage'dan wishlist'i yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist')
      if (savedWishlist) {
        try {
          dispatch({ type: 'LOAD_WISHLIST', payload: JSON.parse(savedWishlist) })
        } catch (error) {
          console.error('Error loading wishlist from localStorage:', error)
        }
      }
    }
  }, [])

  // Wishlist değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(state.items))
    }
  }, [state.items])

  const addToWishlist = (product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product })
  }

  const removeFromWishlist = (productId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId })
  }

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' })
  }

  const isInWishlist = (productId) => {
    return state.items.some((item) => item.id === productId)
  }

  const value = {
    items: state.items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
