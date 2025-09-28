import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

export const useResponsiveCategories = (categories) => {
  const [visibleCategories, setVisibleCategories] = useState([])
  const [showAllCategoriesOnly, setShowAllCategoriesOnly] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const containerRef = useRef(null)
  const itemsRef = useRef([])

  const calculateVisibleCategories = useCallback(() => {
    if (!containerRef.current || isCalculating) return

    setIsCalculating(true)

    // Use requestAnimationFrame to ensure DOM has rendered
    requestAnimationFrame(() => {
      const container = containerRef.current
      if (!container) {
        setIsCalculating(false)
        return
      }

      const containerWidth = container.offsetWidth
      const allCategoriesButtonWidth = 150
      const spacing = 16
      const padding = 32

      let totalWidth = padding + allCategoriesButtonWidth
      let visibleCount = 0

      // Calculate how many categories can fit (excluding "Tüm Kategoriler")
      const categoriesToCheck = categories.filter((cat) => cat.name !== 'Tüm Kategoriler')

      for (let i = 0; i < categoriesToCheck.length; i++) {
        // Estimate width if item not yet rendered
        const estimatedWidth = categoriesToCheck[i].name.length * 8 + 24 + spacing

        if (totalWidth + estimatedWidth <= containerWidth) {
          totalWidth += estimatedWidth
          visibleCount++
        } else {
          break
        }
      }

      // Update state only if different
      const newShowAllOnly = visibleCount < 3
      const newVisibleCategories = newShowAllOnly ? [] : categoriesToCheck.slice(0, visibleCount)

      setShowAllCategoriesOnly((prev) => (prev !== newShowAllOnly ? newShowAllOnly : prev))
      setVisibleCategories((prev) => {
        if (prev.length !== newVisibleCategories.length) return newVisibleCategories
        if (prev.some((cat, i) => cat.name !== newVisibleCategories[i]?.name)) return newVisibleCategories
        return prev
      })

      setIsCalculating(false)
    })
  }, [categories, isCalculating])

  // Initial calculation
  useEffect(() => {
    const timer = setTimeout(calculateVisibleCategories, 100)
    return () => clearTimeout(timer)
  }, [])

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const timer = setTimeout(calculateVisibleCategories, 150)
      return () => clearTimeout(timer)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [calculateVisibleCategories])

  const setItemRef = useCallback(
    (index) => (el) => {
      itemsRef.current[index] = el
    },
    [],
  )

  const hiddenCategories = useMemo(() => {
    return categories.filter(
      (cat) => cat.name !== 'Tüm Kategoriler' && !visibleCategories.some((visible) => visible.name === cat.name),
    )
  }, [categories, visibleCategories])

  return {
    visibleCategories,
    hiddenCategories,
    showAllCategoriesOnly,
    containerRef,
    setItemRef,
    recalculate: calculateVisibleCategories,
  }
}
