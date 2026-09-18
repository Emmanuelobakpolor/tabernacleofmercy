// Shared, tasteful motion presets — quick fades and short slides only.
// Framer Motion respects prefers-reduced-motion automatically when a
// component calls `useReducedMotion()`, which every animated component here does.

export const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

export const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const drawerVariants = {
  initial: { x: '100%' },
  animate: { x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '100%', transition: { duration: 0.24, ease: 'easeIn' } },
}

export const drawerVariantsLeft = {
  initial: { x: '-100%' },
  animate: { x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '-100%', transition: { duration: 0.24, ease: 'easeIn' } },
}

export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const popVariants = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.18 } },
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } },
}

export const staggerItem = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
}
