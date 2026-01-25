'use client'

import { useCallback, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const morphTime = 1.5
const cooldownTime = 0.5

interface MorphingTextProps {
  texts: readonly string[]
  className?: string
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(new Date())

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]

      if (!current1 || !current2) return

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      const invertedFraction = 1 - fraction

      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

      current1.textContent = texts[textIndexRef.current % texts.length]
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length]
    },
    [texts]
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime

    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }

    setStyles(fraction)

    if (fraction === 1) {
      textIndexRef.current++
      morphRef.current = 0
    }
  }, [setStyles])

  const animate = useCallback(() => {
    const newTime = new Date()
    const shouldIncrementIndex = cooldownRef.current > 0
    const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000

    timeRef.current = newTime

    cooldownRef.current -= dt

    if (cooldownRef.current <= 0) {
      if (shouldIncrementIndex) {
        textIndexRef.current++
      }

      morphRef.current += dt
    } else {
      morphRef.current = 0
    }

    doMorph()

    requestAnimationFrame(animate)
  }, [doMorph])

  useEffect(() => {
    const animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [animate])

  return (
    <div className={cn('relative inline-block', className)}>
      <span
        ref={text1Ref}
        className="absolute inset-0 font-bold"
        style={{
          filter: 'blur(0px)',
          opacity: '100%',
        }}
      >
        {texts[0]}
      </span>
      <span
        ref={text2Ref}
        className="font-bold"
        style={{
          filter: 'blur(100px)',
          opacity: '0%',
        }}
      >
        {texts[1] || texts[0]}
      </span>
    </div>
  )
}