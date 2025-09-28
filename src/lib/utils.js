import { twMerge } from 'tailwind-merge'
import { clsx } from 'clsx'

/**
 * Combines class names with Tailwind CSS
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Debounces a function
 */
export function debounce(fn, ms = 300) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

/**
 * Checks if the client is in dark mode
 */
export function isDarkMode() {
  if (typeof window === 'undefined') return false
  return (
    localStorage.getItem('theme') === 'dark' ||
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

/**
 * Gets a nested object property by a dot-notation path
 */
export function get(obj, path, defaultValue = undefined) {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)
  const result = travel(/[,[\]]+?/) || travel(/[,.[\]]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

/**
 * Sanitizes HTML to prevent XSS attacks
 */
export function sanitizeHtml(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Formats a date for display
 */
export function formatDate(date, locale = 'en-US') {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Type-safe LocalStorage access
 */
export const storage = {
  get: (key, defaultValue) => {
    if (typeof window === 'undefined') return defaultValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error getting item from localStorage', error)
      return defaultValue
    }
  },
  set: (key, value) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error setting item in localStorage', error)
    }
  },
  remove: (key) => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing item from localStorage', error)
    }
  },
}
