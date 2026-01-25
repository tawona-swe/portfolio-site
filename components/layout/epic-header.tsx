'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-blue-400 rounded-full"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, Math.random() * 100 - 50],
      y: [0, Math.random() * 100 - 50],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2,
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
)

export function EpicHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 100], [0, -10])
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleSectionChange = () => {
      const sections = navigation.map(nav => nav.href.substring(1))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleSectionChange)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleSectionChange)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      style={{ y: headerY, opacity: headerOpacity }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-2xl'
          : 'bg-transparent'
      )}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.1} />
        ))}
      </div>

      {/* Magnetic Effect Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-full blur-3xl"
        animate={{
          x: mounted ? (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 1920) / 2) * 0.01 : 0,
          y: mounted ? (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 1080) / 2) * 0.01 : 0,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-center h-20">
          {/* Desktop Navigation with Floating Effect - Centered */}
          <div className="hidden md:block">
            <motion.div 
              className="flex items-center space-x-1 bg-white/5 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault()
                    scrollToSection(item.href)
                  }}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-hover group',
                    activeSection === item.href.substring(1)
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white'
                  )}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative">
                    <span>{item.name}</span>
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Mobile Menu Button - Positioned on Right */}
          <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative p-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 cursor-hover"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <XMarkIcon className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Bars3Icon className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Epic Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="md:hidden mt-4"
            >
              <motion.div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 space-y-2">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 cursor-hover',
                      activeSection === item.href.substring(1)
                        ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{item.name}</span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}