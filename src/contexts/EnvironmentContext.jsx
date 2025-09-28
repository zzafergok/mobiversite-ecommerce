'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const EnvironmentContext = createContext()

export function EnvironmentProvider({ children }) {
  // Production'da static data, development'da json-server kullan
  const defaultEnvironment = process.env.NODE_ENV === 'production' ? 'production' : 'json-server'
  const [environment, setEnvironment] = useState(defaultEnvironment) // 'json-server' | 'neon-db' | 'production'

  // LocalStorage'dan environment seçimini yükle (sadece development'da)
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
      const savedEnvironment = localStorage.getItem('environment')
      if (savedEnvironment && ['json-server', 'neon-db', 'production'].includes(savedEnvironment)) {
        setEnvironment(savedEnvironment)
      }
    }
  }, [])

  // Environment değiştiğinde localStorage'a kaydet
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('environment', environment)
    }
  }, [environment])

  const switchEnvironment = (newEnvironment) => {
    if (['json-server', 'neon-db', 'production'].includes(newEnvironment)) {
      setEnvironment(newEnvironment)
    }
  }

  const value = {
    environment,
    switchEnvironment,
    isJsonServer: environment === 'json-server',
    isNeonDb: environment === 'neon-db',
    isProduction: environment === 'production',
  }

  return <EnvironmentContext.Provider value={value}>{children}</EnvironmentContext.Provider>
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext)
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider')
  }
  return context
}
