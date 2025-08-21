import * as React from "react"
import { cn } from "@/lib/utils"

export interface EnhancedButtonModernProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  children: React.ReactNode
}

const EnhancedButtonModern = React.forwardRef<HTMLButtonElement, EnhancedButtonModernProps>(
  ({ className, variant = 'default', size = 'default', loading, children, disabled, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95"
    
    const variants = {
      default: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus-visible:ring-primary-500 shadow-lg shadow-primary-500/25",
      destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus-visible:ring-red-500 shadow-lg shadow-red-500/25",
      outline: "border-2 border-gray-300 bg-transparent hover:border-gray-400 hover:bg-gray-50 focus-visible:ring-gray-500",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
      ghost: "hover:bg-gray-100 focus-visible:ring-gray-500",
      link: "text-primary-500 hover:text-primary-600 underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-11 py-2.5 px-5",
      sm: "h-9 px-3 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
EnhancedButtonModern.displayName = "EnhancedButtonModern"

export { EnhancedButtonModern }
