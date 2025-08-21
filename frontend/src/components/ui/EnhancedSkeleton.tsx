import * as React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean
}

function EnhancedSkeleton({ className, animated = true, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-gray-200 dark:bg-gray-700",
        animated && "animate-pulse",
        className
      )}
      {...props}
    />
  )
}

function EnhancedSkeletonText({ className, lines = 1, ...props }: SkeletonProps & { lines?: number }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <EnhancedSkeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  )
}

function EnhancedSkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white dark:bg-gray-800 p-6 space-y-4",
        className
      )}
      {...props}
    >
      <EnhancedSkeleton className="h-6 w-1/3 rounded-lg" />
      <EnhancedSkeleton className="h-4 w-full rounded-lg" />
      <EnhancedSkeleton className="h-4 w-2/3 rounded-lg" />
      <div className="flex space-x-2">
        <EnhancedSkeleton className="h-10 w-24 rounded-lg" />
        <EnhancedSkeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  )
}

export {
  EnhancedSkeleton,
  EnhancedSkeletonText,
  EnhancedSkeletonCard,
}
