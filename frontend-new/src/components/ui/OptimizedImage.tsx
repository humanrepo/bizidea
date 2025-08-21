import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  sizes = '100vw',
  priority = false,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!width) return undefined
    
    const widths = [width / 2, width, width * 2]
    return widths
      .map(w => `${getOptimizedImageUrl(src, w)} ${w}w`)
      .join(', ')
  }

  // Function to get optimized image URL (you can integrate with a CDN here)
  const getOptimizedImageUrl = (url: string, width?: number) => {
    // Example: Integrate with a CDN or image optimization service
    // return `https://your-cdn.com/optimize?url=${url}&width=${width}`
    return url
  }

  useEffect(() => {
    if (priority) {
      const img = new Image()
      img.src = src
      img.onload = () => setIsLoading(false)
      img.onerror = () => setIsError(true)
    }
  }, [src, priority])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        src={getOptimizedImageUrl(src)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        srcSet={generateSrcSet()}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsError(true)}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        {...props}
      />
      
      {/* Loading state */}
      {isLoading && !isError && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
      )}
      
      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Erreur de chargement
          </span>
        </div>
      )}
    </div>
  )
}
