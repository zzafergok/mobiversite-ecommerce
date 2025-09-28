'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ListsContext = createContext()

export function ListsProvider({ children }) {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLists()
  }, [])

  const loadLists = async () => {
    try {
      setLoading(true)
      const storedLists = localStorage.getItem('userLists')
      if (storedLists) {
        setLists(JSON.parse(storedLists))
      }
    } catch (error) {
      console.error('Error loading lists:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveLists = (newLists) => {
    setLists(newLists)
    localStorage.setItem('userLists', JSON.stringify(newLists))
  }

  const createList = async (listData) => {
    try {
      const newList = {
        id: Date.now().toString(),
        name: listData.name,
        description: listData.description || '',
        items: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const updatedLists = [...lists, newList]
      saveLists(updatedLists)
      return newList
    } catch (error) {
      console.error('Error creating list:', error)
      throw error
    }
  }

  const updateList = async (listId, updates) => {
    try {
      const updatedLists = lists.map((list) =>
        list.id === listId ? { ...list, ...updates, updatedAt: new Date().toISOString() } : list,
      )
      saveLists(updatedLists)
    } catch (error) {
      console.error('Error updating list:', error)
      throw error
    }
  }

  const deleteList = async (listId) => {
    try {
      const updatedLists = lists.filter((list) => list.id !== listId)
      saveLists(updatedLists)
    } catch (error) {
      console.error('Error deleting list:', error)
      throw error
    }
  }

  const addProductToList = async (listId, product) => {
    try {
      const updatedLists = lists.map((list) => {
        if (list.id === listId) {
          const isAlreadyInList = list.items.some((item) => item.id === product.id)
          if (!isAlreadyInList) {
            return {
              ...list,
              items: [...list.items, { ...product, addedAt: new Date().toISOString() }],
              updatedAt: new Date().toISOString(),
            }
          }
        }
        return list
      })
      saveLists(updatedLists)
    } catch (error) {
      console.error('Error adding product to list:', error)
      throw error
    }
  }

  const removeProductFromList = async (listId, productId) => {
    try {
      const updatedLists = lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            items: list.items.filter((item) => item.id !== productId),
            updatedAt: new Date().toISOString(),
          }
        }
        return list
      })
      saveLists(updatedLists)
    } catch (error) {
      console.error('Error removing product from list:', error)
      throw error
    }
  }

  const isProductInList = (listId, productId) => {
    const list = lists.find((list) => list.id === listId)
    return list ? list.items.some((item) => item.id === productId) : false
  }

  const getProductLists = (productId) => {
    return lists.filter((list) => list.items.some((item) => item.id === productId))
  }

  const value = {
    lists,
    loading,
    createList,
    updateList,
    deleteList,
    addProductToList,
    removeProductFromList,
    isProductInList,
    getProductLists,
    loadLists,
  }

  return <ListsContext.Provider value={value}>{children}</ListsContext.Provider>
}

export function useLists() {
  const context = useContext(ListsContext)
  if (!context) {
    throw new Error('useLists must be used within a ListsProvider')
  }
  return context
}
