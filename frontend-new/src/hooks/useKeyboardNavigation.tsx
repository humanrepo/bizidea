import React, { useEffect } from 'react'
import { KEYS } from '@/lib/a11y'

interface UseKeyboardNavigationProps {
  isOpen: boolean
  onClose: () => void
  onOpen?: () => void
}

export function useKeyboardNavigation({ isOpen, onClose, onOpen }: UseKeyboardNavigationProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === KEYS.ESC && isOpen) {
        onClose()
      }
      
      // Toggle menu with Alt+M
      if (event.altKey && event.key.toLowerCase() === 'm' && onOpen && !isOpen) {
        onOpen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onOpen])
}

interface UseMenuNavigationProps {
  itemRefs: React.RefObject<HTMLElement>[]
  isOpen: boolean
}

export function useMenuNavigation({ itemRefs, isOpen }: UseMenuNavigationProps) {
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      const currentIndex = itemRefs.findIndex(ref => 
        ref.current === document.activeElement
      )

      switch (event.key) {
        case KEYS.ARROW_DOWN:
          event.preventDefault()
          if (currentIndex < itemRefs.length - 1) {
            itemRefs[currentIndex + 1].current?.focus()
          }
          break
          
        case KEYS.ARROW_UP:
          event.preventDefault()
          if (currentIndex > 0) {
            itemRefs[currentIndex - 1].current?.focus()
          }
          break
          
        case KEYS.HOME:
          event.preventDefault()
          itemRefs[0].current?.focus()
          break
          
        case KEYS.END:
          event.preventDefault()
          itemRefs[itemRefs.length - 1].current?.focus()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, itemRefs])
}
