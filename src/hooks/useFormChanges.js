/* eslint-disable prefer-const */
import { useState, useEffect, useMemo } from 'react'

/**
 * Form değişikliklerini takip eden hook
 * @param {Object} initialData - Başlangıç verileri
 * @param {Object} currentData - Mevcut form verileri
 * @param {Array} excludeFields - Karşılaştırmadan hariç tutulacak alanlar (opsiyonel)
 * @returns {Object} - { hasChanges, changedFields, getChangedData }
 */
export function useFormChanges(initialData, currentData, excludeFields = []) {
  const [originalData, setOriginalData] = useState(initialData)

  // initialData değiştiğinde originalData'yı güncelle
  useEffect(() => {
    setOriginalData(initialData)
  }, [initialData])

  // Deep comparison için helper fonksiyon
  const deepEqual = (obj1, obj2, exclude = []) => {
    if (obj1 === obj2) return true

    if (obj1 == null || obj2 == null) return obj1 === obj2

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2

    const keys1 = Object.keys(obj1).filter((key) => !exclude.includes(key))
    const keys2 = Object.keys(obj2).filter((key) => !exclude.includes(key))

    if (keys1.length !== keys2.length) return false

    for (let key of keys1) {
      if (!keys2.includes(key)) return false
      if (!deepEqual(obj1[key], obj2[key])) return false
    }

    return true
  }

  // Değişen alanları bul
  const getChangedFields = (original, current, exclude = [], path = '') => {
    const changes = {}

    if (!original || !current) return changes

    const allKeys = new Set([...Object.keys(original || {}), ...Object.keys(current || {})])

    for (let key of allKeys) {
      if (exclude.includes(key)) continue

      const currentPath = path ? `${path}.${key}` : key

      if (
        typeof original[key] === 'object' &&
        typeof current[key] === 'object' &&
        original[key] !== null &&
        current[key] !== null &&
        !Array.isArray(original[key]) &&
        !Array.isArray(current[key])
      ) {
        // Nested object karşılaştırması
        const nestedChanges = getChangedFields(original[key], current[key], [], currentPath)
        Object.assign(changes, nestedChanges)
      } else if (!deepEqual(original[key], current[key])) {
        changes[currentPath] = {
          old: original[key],
          new: current[key],
        }
      }
    }

    return changes
  }

  // Memoized hesaplamalar
  const { hasChanges, changedFields } = useMemo(() => {
    if (!originalData || !currentData) {
      return { hasChanges: false, changedFields: {} }
    }

    const changes = getChangedFields(originalData, currentData, excludeFields)
    return {
      hasChanges: Object.keys(changes).length > 0,
      changedFields: changes,
    }
  }, [originalData, currentData, excludeFields])

  // Sadece değişen verileri döndür
  const getChangedData = () => {
    if (!hasChanges) return {}

    const result = {}

    Object.keys(changedFields).forEach((path) => {
      const keys = path.split('.')
      let current = result

      // Nested path oluştur
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {}
        }
        current = current[keys[i]]
      }

      // Son key'e değeri ata
      const lastKey = keys[keys.length - 1]
      current[lastKey] = changedFields[path].new
    })

    return result
  }

  // Reset fonksiyonu - originalData'yı currentData ile güncelle
  const resetChanges = () => {
    setOriginalData(currentData)
  }

  return {
    hasChanges,
    changedFields,
    getChangedData,
    resetChanges,
    originalData,
  }
}

export default useFormChanges
