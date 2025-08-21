import React, { useEffect, useRef, useState } from 'react'

interface LazyLoadProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
}

export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  className
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Déconnecte l'observer une fois le contenu chargé
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? children : null}
    </div>
  )
}

// Usage example:
// <LazyLoad>
//   <ExpensiveComponent />
// </LazyLoad>
