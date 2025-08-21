import { useEffect, useRef } from 'react'

interface UseAnnouncerProps {
  message: string
  assertive?: boolean
  timeout?: number
}

export function useAnnouncer({
  message,
  assertive = false,
  timeout = 1000
}: UseAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!message) return

    if (!announcerRef.current) {
      announcerRef.current = document.createElement('div')
      announcerRef.current.setAttribute('aria-live', assertive ? 'assertive' : 'polite')
      announcerRef.current.setAttribute('aria-atomic', 'true')
      announcerRef.current.className = 'sr-only'
      document.body.appendChild(announcerRef.current)
    }

    // Clear previous message
    announcerRef.current.textContent = ''

    // Set message after a brief delay to ensure it's announced
    const timeoutId = setTimeout(() => {
      if (announcerRef.current) {
        announcerRef.current.textContent = message
      }
    }, 100)

    // Clean up
    return () => {
      clearTimeout(timeoutId)
      if (announcerRef.current) {
        document.body.removeChild(announcerRef.current)
        announcerRef.current = null
      }
    }
  }, [message, assertive, timeout])
}

// Example usage:
// const { announce } = useAnnouncer()
// announce("Votre message a été envoyé avec succès")
