import React, { useEffect, useRef } from 'react'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'
import { cn } from '@/lib/utils'

interface DropdownMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpen?: () => void
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right'
  className?: string
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  onClose,
  onOpen,
  trigger,
  children,
  align = 'right',
  className
}) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useKeyboardNavigation({ isOpen, onClose, onOpen })

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  return (
    <div className="relative">
      {trigger}
      
      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            'absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10',
            'focus:outline-none py-1 z-50 origin-top-right transition-all duration-200 ease-out',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  onClick,
  children,
  className,
  disabled = false
}) => {
  return (
    <button
      className={cn(
        'w-full text-left px-4 py-2 text-sm',
        disabled
          ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:bg-gray-50 dark:focus:bg-gray-700/50',
        'focus:outline-none transition-colors duration-150 ease-in-out',
        className
      )}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

interface DropdownDividerProps {
  className?: string
}

export const DropdownDivider: React.FC<DropdownDividerProps> = ({ className }) => {
  return (
    <div
      className={cn('h-px my-1 bg-gray-200 dark:bg-gray-700', className)}
      role="separator"
      aria-orientation="horizontal"
    />
  )
}
