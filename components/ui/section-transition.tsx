'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function SectionTransition({ children, className = "", delay = 0 }: SectionTransitionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-100px 0px'
  })

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        rotateX: -15
      }}
      animate={inView ? { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateX: 0
      } : {}}
      transition={{ 
        duration: 1.2, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0"
        style={{
          background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
          backgroundSize: "300% 300%",
          padding: "2px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
        animate={inView ? {
          opacity: [0, 1, 0],
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        } : {}}
        transition={{
          opacity: { duration: 2, delay: delay + 0.5 },
          backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
        }}
      />
      
      {children}
    </motion.div>
  )
}

// Floating particles for section backgrounds
export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            opacity: 0,
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}