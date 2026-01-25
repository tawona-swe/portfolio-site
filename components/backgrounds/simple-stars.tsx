'use client'

import { useEffect, useState } from 'react'

export function SimpleStars() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 200; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.8 + 0.2,
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}