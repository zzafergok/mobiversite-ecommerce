'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const EnvironmentContext = createContext()

export function EnvironmentProvider({ children }) {
  const [environment, setEnvironment] = useState('json-server') // 'json-server' | 'neon-db'

  // LocalStorage'dan environment seçimini yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEnvironment = localStorage.getItem('environment')
      if (savedEnvironment && ['json-server', 'neon-db'].includes(savedEnvironment)) {
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
    if (['json-server', 'neon-db'].includes(newEnvironment)) {
      setEnvironment(newEnvironment)
    }
  }

  const value = {
    environment,
    switchEnvironment,
    isJsonServer: environment === 'json-server',
    isNeonDb: environment === 'neon-db',
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
