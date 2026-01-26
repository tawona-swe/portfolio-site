'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface MorphingTextProps {
  texts: readonly string[]
  className?: string
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentText = texts[currentTextIndex]
    
    const timeout = setTimeout(() => {
      if (isPaused) {
        // Pause after completing text
        setIsPaused(false)
        setIsDeleting(true)
        return
      }

      if (isDeleting) {
        // Delete characters
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1))
        } else {
          // Move to next text
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      } else {
        // Type characters
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1))
        } else {
          // Pause when text is complete
          setIsPaused(true)
        }
      }
    }, isDeleting ? 50 : isPaused ? 2000 : 100) // Faster delete, pause, slower type

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, isPaused, currentTextIndex, texts])

  return (
    <div className={cn('relative inline-block', className)}>
      <span className="font-bold">
        {displayedText}
        <span className="animate-pulse text-blue-400">|</span>
      </span>
    </div>
  )
}