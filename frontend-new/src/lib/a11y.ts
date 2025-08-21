// Keyboard navigation utils
export const KEYS = {
  TAB: 'Tab',
  ENTER: 'Enter',
  ESC: 'Escape',
  SPACE: ' ',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
}

// Focus trap utility for modals and dropdowns
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusable = focusableElements[0] as HTMLElement
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

  function handleTabKey(e: KeyboardEvent) {
    const isTabPressed = e.key === KEYS.TAB
    if (!isTabPressed) return

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus()
        e.preventDefault()
      }
    }
  }

  return {
    enable: () => {
      element.addEventListener('keydown', handleTabKey)
      firstFocusable?.focus()
    },
    disable: () => {
      element.removeEventListener('keydown', handleTabKey)
    }
  }
}

// Announce messages to screen readers
export function announceToScreenReader(message: string) {
  const announcer = document.createElement('div')
  announcer.setAttribute('aria-live', 'polite')
  announcer.setAttribute('aria-atomic', 'true')
  announcer.classList.add('sr-only')
  document.body.appendChild(announcer)
  
  // Set content after a brief delay to ensure it's announced
  setTimeout(() => {
    announcer.textContent = message
    
    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(announcer)
    }, 1000)
  }, 100)
}

// Skip to main content link utility
export function setupSkipLink() {
  const skipLink = document.createElement('a')
  skipLink.href = '#main'
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-primary-600'
  skipLink.textContent = 'Aller au contenu principal'
  document.body.insertBefore(skipLink, document.body.firstChild)
}
