'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function EpicCursor() {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener('mousemove', updatePosition)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .cursor-hover')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] mix-blend-difference">
      {/* Main Cursor */}
      <motion.div
        className="absolute"
        style={{
          left: position.x - 6,
          top: position.y - 6,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <motion.div
          className="w-3 h-3 bg-white rounded-full"
          animate={{
            opacity: isHovering ? 0.8 : 1,
          }}
        />
      </motion.div>

      {/* Trailing Cursor */}
      <motion.div
        className="absolute"
        style={{
          left: position.x - 20,
          top: position.y - 20,
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 2 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <div className="w-10 h-10 border-2 border-white rounded-full" />
      </motion.div>

      {/* Particle Effect on Click */}
      <AnimatePresence>
        {isClicking && (
          <div className="absolute" style={{ left: position.x, top: position.y }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 6) * 20,
                  y: Math.sin((i * Math.PI * 2) / 6) * 20,
                  opacity: 0,
                  scale: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}