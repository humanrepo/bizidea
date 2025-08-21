import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
        className
      )}
      {...props}
    />
  )
}

function SkeletonCard() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-12" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

function SkeletonInput() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}

function SkeletonButton() {
  return <Skeleton className="h-10 w-full rounded-lg" />
}

export { Skeleton, SkeletonCard, SkeletonInput, SkeletonButton }
