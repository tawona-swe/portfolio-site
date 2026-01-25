import { Variants } from 'framer-motion'

// Slide animations
export const slideInFromLeft = (delay: number = 0): Variants => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
})

export const slideInFromRight = (delay: number = 0): Variants => ({
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
})

export const slideInFromTop = (delay: number = 0): Variants => ({
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
})

export const slideInFromBottom = (delay: number = 0): Variants => ({
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
})

// Fade animations
export const fadeIn = (delay: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
})

export const fadeInUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
})

// Scale animations
export const scaleIn = (delay: number = 0): Variants => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: 'backOut',
    },
  },
})

export const scaleInSpring = (delay: number = 0): Variants => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay,
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
})

// Stagger animations
export const staggerContainer = (staggerChildren: number = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren: 0.1,
    },
  },
})

export const staggerItem: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 },
}

export const hoverGlow = {
  boxShadow: '0 0 20px rgba(25, 75, 255, 0.5)',
  transition: { duration: 0.3 },
}

// Complex animations
export const floatingAnimation: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const rotateAnimation: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const pulseAnimation: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}