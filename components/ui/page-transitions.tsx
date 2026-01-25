'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// Smooth scroll behavior
export function SmoothScroll() {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const href = target.getAttribute('href')
      
      if (href?.startsWith('#')) {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => {
      link.addEventListener('click', handleScroll)
    })

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleScroll)
      })
    }
  }, [])

  return null
}

// Magnetic cursor effect for interactive elements
export function MagneticElements() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const magneticElements = document.querySelectorAll('.magnetic')
      
      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const deltaX = e.clientX - centerX
        const deltaY = e.clientY - centerY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        
        if (distance < 100) {
          const strength = (100 - distance) / 100
          const moveX = deltaX * strength * 0.3
          const moveY = deltaY * strength * 0.3
          
          ;(element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
        } else {
          ;(element as HTMLElement).style.transform = 'translate(0px, 0px)'
        }
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return null
}

// Parallax scrolling effect
export function ParallaxElements() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll('.parallax')
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5')
        const yPos = -(scrolled * speed)
        ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}

// Loading animation
export function PageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.h2
              className="text-3xl font-bold text-white mb-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tawona Rwatida
            </motion.h2>
            <motion.p
              className="text-blue-300 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Crafting Digital Experiences
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}