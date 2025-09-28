'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CookieConsentContext = createContext()

const CONSENT_EXPIRY_KEY = 'cookie-consent-expiry'
const CONSENT_STORAGE_KEY = 'cookie-consent-preferences'

export function CookieConsentProvider({ children }) {
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false,
  })
  const [showBanner, setShowBanner] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    checkExistingConsent()
  }, [])

  const checkExistingConsent = () => {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') return

      const savedPreferences = localStorage.getItem(CONSENT_STORAGE_KEY)
      const expiryDate = localStorage.getItem(CONSENT_EXPIRY_KEY)

      if (savedPreferences && expiryDate) {
        const now = new Date().getTime()
        const expiry = parseInt(expiryDate)

        if (now < expiry) {
          // Valid consent exists
          const parsedPreferences = JSON.parse(savedPreferences)
          setPreferences(parsedPreferences)
          setConsentGiven(true)
          setShowBanner(false)
          return
        } else {
          // Consent expired, clear storage
          clearConsent()
        }
      }

      // No valid consent, show banner
      setShowBanner(true)
    } catch (error) {
      console.error('Error checking consent:', error)
      setShowBanner(true)
    }
  }

  const saveConsent = (newPreferences) => {
    try {
      const expiryDate = new Date()
      expiryDate.setFullYear(expiryDate.getFullYear() + 1) // 1 year expiry

      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newPreferences))
      localStorage.setItem(CONSENT_EXPIRY_KEY, expiryDate.getTime().toString())

      setPreferences(newPreferences)
      setConsentGiven(true)
      setShowBanner(false)

      // Trigger analytics/marketing scripts based on consent
      handleConsentChange(newPreferences)
    } catch (error) {
      console.error('Error saving consent:', error)
    }
  }

  const handleConsentChange = (newPreferences) => {
    // Here you would load/unload scripts based on consent
    if (newPreferences.analytics) {
      // Load Google Analytics
      console.log('Loading analytics scripts...')
    }

    if (newPreferences.marketing) {
      // Load marketing pixels
      console.log('Loading marketing scripts...')
    }

    if (newPreferences.functional) {
      // Load functional cookies
      console.log('Loading functional scripts...')
    }
  }

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    saveConsent(allAccepted)
  }

  const rejectAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    saveConsent(onlyEssential)
  }

  const updatePreferences = (category, value) => {
    const newPreferences = {
      ...preferences,
      [category]: category === 'essential' ? true : value, // Essential can't be disabled
    }
    setPreferences(newPreferences)
  }

  const saveCustomPreferences = () => {
    saveConsent(preferences)
  }

  const clearConsent = () => {
    try {
      localStorage.removeItem(CONSENT_STORAGE_KEY)
      localStorage.removeItem(CONSENT_EXPIRY_KEY)
      setConsentGiven(false)
      setShowBanner(true)
      setPreferences({
        essential: true,
        analytics: false,
        marketing: false,
        functional: false,
      })
    } catch (error) {
      console.error('Error clearing consent:', error)
    }
  }

  const reopenBanner = () => {
    setShowBanner(true)
  }

  const value = {
    consentGiven,
    showBanner,
    preferences,
    acceptAll,
    rejectAll,
    updatePreferences,
    saveCustomPreferences,
    clearConsent,
    reopenBanner,
    setShowBanner,
  }

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}
