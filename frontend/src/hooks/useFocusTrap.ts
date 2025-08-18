import { useEffect, useRef } from 'react'

type UseFocusTrapOptions = {
  enabled: boolean
  onEscape?: () => void
}

export function useFocusTrap({ enabled, onEscape }: UseFocusTrapOptions) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return

    const element = elementRef.current
    if (!element) return

    // Sauvegarde le dernier élément focus
    const previousActiveElement = document.activeElement as HTMLElement

    // Focus le premier élément focusable
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    )
    if (focusableElements.length) {
      focusableElements[0].focus()
    }

    // Gestionnaire d'événements pour piéger le focus
    function handleKeyDown(event: KeyboardEvent) {
      if (!enabled) return

      if (event.key === 'Escape' && onEscape) {
        onEscape()
        return
      }

      if (event.key === 'Tab') {
        const focusableElements = element.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        // Si on fait Maj+Tab et qu'on est sur le premier élément, aller au dernier
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
        // Si on fait Tab et qu'on est sur le dernier élément, aller au premier
        else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    element.addEventListener('keydown', handleKeyDown)

    return () => {
      element.removeEventListener('keydown', handleKeyDown)
      if (enabled) {
        previousActiveElement?.focus()
      }
    }
  }, [enabled, onEscape])

  return elementRef
}
