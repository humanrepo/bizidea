import * as React from "react"
import { AnimatePresence, motion, MotionProps } from "framer-motion"

type TransitionProps = {
  children: React.ReactNode
  isVisible?: boolean
  delay?: number
  duration?: number
} & MotionProps

export function FadeIn({
  children,
  isVisible = true,
  delay = 0,
  duration = 0.3,
  ...props
}: TransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, delay }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SlideUp({
  children,
  isVisible = true,
  delay = 0,
  duration = 0.3,
  ...props
}: TransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration, delay }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SlideIn({
  children,
  isVisible = true,
  delay = 0,
  duration = 0.3,
  ...props
}: TransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration, delay }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Scale({
  children,
  isVisible = true,
  delay = 0,
  duration = 0.3,
  ...props
}: TransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration, delay }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Stagger({
  children,
  isVisible = true,
  delay = 0.1,
  duration = 0.3,
  ...props
}: TransitionProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: delay,
              },
            },
          }}
          initial="hidden"
          animate="show"
          {...props}
        >
          {React.Children.map(children, (child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
