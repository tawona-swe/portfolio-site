'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { SparklesIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { MorphingText } from '@/components/ui/morphing-text'
import { TechIcon } from '@/components/ui/skill-icons'
import portfolioData from '@/data/portfolio.json'

const roles = [
  'Full Stack Software Developer',
  'E-commerce Platform Architect',
  'AI & System Integration Expert',
  'Laravel & React Specialist',
  'Digital Innovation Creator'
]

// Explosive bomb entrance animation variants
const explosionVariants = {
  hidden: { 
    scale: 0, 
    opacity: 0,
    x: 0,
    y: 0,
  },
  visible: (i: number) => {
    // Calculate random explosion direction
    const angle = (Math.random() * 360) * (Math.PI / 180)
    const distance = 200 + Math.random() * 100
    const startX = Math.cos(angle) * distance
    const startY = Math.sin(angle) * distance
    
    return {
      scale: [0, 1.3, 1],
      opacity: [0, 1, 1],
      x: [startX, 0],
      y: [startY, 0],
      rotate: [Math.random() * 360, 0],
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150,
        delay: i * 0.08,
        duration: 0.8
      }
    }
  }
}

// Interactive Tic-Tac-Toe Game
const TicTacToeGame = () => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)
  const [gameStarted, setGameStarted] = useState(false)

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  const checkWinner = (currentBoard: (string | null)[]) => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: pattern }
      }
    }
    if (currentBoard.every(cell => cell !== null)) {
      return { winner: 'draw', line: null }
    }
    return null
  }

  const makeAIMove = (currentBoard: (string | null)[]) => {
    const emptyCells = currentBoard.map((cell, idx) => cell === null ? idx : null).filter(idx => idx !== null) as number[]
    if (emptyCells.length === 0) return null

    // Check if AI can win
    for (const cell of emptyCells) {
      const testBoard = [...currentBoard]
      testBoard[cell] = 'O'
      if (checkWinner(testBoard)?.winner === 'O') {
        return cell
      }
    }

    // Block player from winning
    for (const cell of emptyCells) {
      const testBoard = [...currentBoard]
      testBoard[cell] = 'X'
      if (checkWinner(testBoard)?.winner === 'X') {
        return cell
      }
    }

    // Take center if available
    if (currentBoard[4] === null) {
      return 4
    }

    // Take corners
    const corners = [0, 2, 6, 8].filter(i => currentBoard[i] === null)
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)]
    }

    // Take any remaining cell
    return emptyCells[Math.floor(Math.random() * emptyCells.length)]
  }

  const handleCellClick = (index: number) => {
    if (!gameStarted) setGameStarted(true)
    if (board[index] || winner || !isPlayerTurn) return

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result.winner)
      setWinningLine(result.line)
      return
    }

    setIsPlayerTurn(false)

    // AI move after delay
    setTimeout(() => {
      const aiMove = makeAIMove(newBoard)
      if (aiMove !== null) {
        const aiBoard = [...newBoard]
        aiBoard[aiMove] = 'O'
        setBoard(aiBoard)

        const aiResult = checkWinner(aiBoard)
        if (aiResult) {
          setWinner(aiResult.winner)
          setWinningLine(aiResult.line)
        }
      }
      setIsPlayerTurn(true)
    }, 500)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsPlayerTurn(true)
    setWinner(null)
    setWinningLine(null)
    setGameStarted(false)
  }

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 0.8, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h3 className="text-xl font-bold text-white mb-1">
          Challenge Me!
        </h3>
        <p className="text-gray-400 text-xs">
          {!gameStarted ? 'Click any cell to start' : winner ? (
            winner === 'draw' ? "It's a draw!" : winner === 'X' ? 'You won! 🎉' : 'I won! Try again?'
          ) : isPlayerTurn ? 'Your turn (X)' : 'My turn (O)...'}
        </p>
      </motion.div>

      {/* Game Board */}
      <div className="relative">
        {/* Grid Lines */}
        <svg
          width="240"
          height="240"
          viewBox="0 0 240 240"
          className="absolute inset-0"
        >
          {/* Vertical lines */}
          <motion.line
            x1="80"
            y1="10"
            x2="80"
            y2="230"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.line
            x1="160"
            y1="10"
            x2="160"
            y2="230"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          {/* Horizontal lines */}
          <motion.line
            x1="10"
            y1="80"
            x2="230"
            y2="80"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.line
            x1="10"
            y1="160"
            x2="230"
            y2="160"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />

          {/* Winning Line */}
          {winner && winningLine && (
            <motion.line
              x1={winningLine[0] % 3 === 0 ? 40 : winningLine[0] % 3 === 1 ? 120 : 200}
              y1={Math.floor(winningLine[0] / 3) === 0 ? 40 : Math.floor(winningLine[0] / 3) === 1 ? 120 : 200}
              x2={winningLine[2] % 3 === 0 ? 40 : winningLine[2] % 3 === 1 ? 120 : 200}
              y2={Math.floor(winningLine[2] / 3) === 0 ? 40 : Math.floor(winningLine[2] / 3) === 1 ? 120 : 200}
              stroke="#10b981"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          )}
        </svg>

        {/* Cells */}
        <div className="grid grid-cols-3 gap-0 w-[240px] h-[240px]">
          {board.map((cell, index) => {
            return (
              <motion.button
                key={index}
                onClick={() => handleCellClick(index)}
                className="relative w-[80px] h-[80px] flex items-center justify-center cursor-pointer transition-all disabled:cursor-not-allowed group"
                disabled={!!cell || !!winner || !isPlayerTurn}
                whileHover={{ scale: cell ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hover effect background */}
                {!cell && !winner && isPlayerTurn && (
                  <motion.div
                    className="absolute inset-2 rounded-xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                )}

                {/* Cell glow when filled */}
                {cell && (
                  <motion.div
                    className={`absolute inset-0 rounded-xl blur-xl ${
                      cell === 'X' ? 'bg-purple-500/20' : 'bg-cyan-500/20'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {cell && (
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    className="absolute z-10"
                  >
                    {cell === 'X' ? (
                      <>
                        {/* X with glow effect */}
                        <defs>
                          <filter id={`glow-x-${index}`}>
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <motion.line
                          x1="12"
                          y1="12"
                          x2="48"
                          y2="48"
                          stroke="url(#gradient-x)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          filter={`url(#glow-x-${index})`}
                          variants={draw}
                          initial="hidden"
                          animate="visible"
                        />
                        <motion.line
                          x1="48"
                          y1="12"
                          x2="12"
                          y2="48"
                          stroke="url(#gradient-x)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          filter={`url(#glow-x-${index})`}
                          variants={draw}
                          initial="hidden"
                          animate="visible"
                        />
                        <defs>
                          <linearGradient id="gradient-x" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </>
                    ) : (
                      <>
                        {/* O with glow effect */}
                        <defs>
                          <filter id={`glow-o-${index}`}>
                            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                            <feMerge>
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                          <linearGradient id="gradient-o" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                        <motion.circle
                          cx="30"
                          cy="30"
                          r="20"
                          stroke="url(#gradient-o)"
                          strokeWidth="6"
                          fill="transparent"
                          strokeLinecap="round"
                          filter={`url(#glow-o-${index})`}
                          variants={draw}
                          initial="hidden"
                          animate="visible"
                        />
                      </>
                    )}
                  </svg>
                )}

                {/* Subtle border on cells */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Reset Button */}
      {(winner || gameStarted) && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={resetGame}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold text-sm hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-blue-500/25"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {winner ? 'Play Again' : 'Reset Game'}
        </motion.button>
      )}

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080,
            opacity: 0,
          }}
          animate={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1920,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 1080,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

export function EpicHero() {
  const { personal } = portfolioData
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()
  const [showIntro, setShowIntro] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  useEffect(() => {
    // Show intro GIF for 5 seconds, then fade out and show content
    const introTimer = setTimeout(() => {
      setShowIntro(false)
      setTimeout(() => {
        setShowContent(true)
      }, 500)
    }, 5000)

    return () => clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    if (isInView && showContent) {
      controls.start("visible")
    }
  }, [isInView, controls, showContent])

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={ref}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-black pt-20"
    >
      {/* Intro GIF Overlay */}
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1, delay: 4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* Enhanced background with animated gradient */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-black"
            animate={{
              background: [
                "linear-gradient(135deg, #0f172a 0%, #020617 50%, #000000 100%)",
                "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #020617 100%)",
                "linear-gradient(135deg, #0f172a 0%, #020617 50%, #000000 100%)",
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Enhanced Particle Field */}
          <ParticleField />
          
          {/* Multiple Floating Orbs for depth */}
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
              x: [0, -40, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated grid overlay */}
          <div className="absolute inset-0 opacity-10"
               style={{
                 backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
                 backgroundSize: '50px 50px'
               }}
          />
          
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Main GIF */}
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full h-full">
                <img
                  src="/images/click-enter-intro.gif"
                  alt="Click to enter"
                  className="w-full h-full object-cover relative z-10"
                />
                {/* Smoky edge effect */}
                <div className="absolute inset-0 pointer-events-none z-20" 
                     style={{
                       maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)',
                       WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)'
                     }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-black opacity-0" />
                </div>
                {/* Outer glow/smoke effect */}
                <div className="absolute inset-0 pointer-events-none blur-3xl opacity-50 z-20"
                     style={{
                       background: 'radial-gradient(ellipse at center, transparent 40%, rgba(15, 23, 42, 0.6) 75%, rgba(2, 6, 23, 0.9) 100%)'
                     }}
                />
              </div>
            </motion.div>

            {/* Loading indicator at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-[10%] z-20 flex flex-col items-center gap-4"
            >
              <motion.div
                className="flex space-x-2"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
              <p className="text-gray-400 text-sm">Loading experience...</p>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main Hero Content - Only show after intro */}
      {showContent && (
        <>
          {/* Explosion Center Effect */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 blur-3xl" />
          </motion.div>

          {/* Shockwave rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.15,
                ease: "easeOut" 
              }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            >
              <div className="w-32 h-32 rounded-full border-4 border-blue-400/50" />
            </motion.div>
          ))}

          {/* Particle burst effect */}
          {Array.from({ length: 30 }).map((_, i) => {
            const angle = (i / 30) * Math.PI * 2
            const distance = 300
            return (
              <motion.div
                key={i}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 1,
                  opacity: 1 
                }}
                animate={{ 
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  scale: 0,
                  opacity: 0
                }}
                transition={{ 
                  duration: 1,
                  delay: i * 0.02,
                  ease: "easeOut" 
                }}
                className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full z-25 pointer-events-none"
              />
            )
          })}

          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-800/10 via-gray-800/10 to-black/20"
            animate={{
              background: [
                "linear-gradient(135deg, rgba(30, 41, 59, 0.1) 0%, rgba(17, 24, 39, 0.1) 50%, rgba(0, 0, 0, 0.2) 100%)",
                "linear-gradient(135deg, rgba(17, 24, 39, 0.1) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(30, 41, 59, 0.1) 100%)",
                "linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(30, 41, 59, 0.1) 50%, rgba(17, 24, 39, 0.1) 100%)",
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Particle Field */}
          <ParticleField />

          {/* Floating Orbs */}
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          
          {/* LEFT SIDE - Content */}
          <motion.div
            variants={explosionVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="space-y-8"
          >
            {/* Welcome Badge */}
            <motion.div
              variants={explosionVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <motion.span
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-full text-blue-300 border border-blue-400/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <SparklesIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Welcome to my digital universe</span>
              </motion.span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              variants={explosionVariants}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <motion.h1
                variants={explosionVariants}
                initial="hidden"
                animate="visible"
                custom={3}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4"
              >
                <span className="text-white">Hi, I'm </span>
                <motion.span
                  className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent inline-block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                  {personal.name}
                </motion.span>
              </motion.h1>

              {/* Morphing Role */}
              <motion.div
                variants={explosionVariants}
                initial="hidden"
                animate="visible"
                custom={4}
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300 h-16 flex items-center"
              >
                <MorphingText texts={roles} />
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={explosionVariants}
              initial="hidden"
              animate="visible"
              custom={5}
              className="text-lg text-gray-400 leading-relaxed max-w-xl"
            >
              {personal.subtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={explosionVariants}
              initial="hidden"
              animate="visible"
              custom={6}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={scrollToAbout}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white rounded-xl font-semibold text-lg overflow-hidden shadow-lg shadow-blue-500/25"
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center justify-center space-x-2">
                  <RocketLaunchIcon className="w-5 h-5" />
                  <span>Explore My Work</span>
                </span>
              </motion.button>

              <motion.a
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 border-2 border-blue-400/50 text-white rounded-xl font-semibold text-lg backdrop-blur-xl hover:bg-blue-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2, borderColor: "rgba(96, 165, 250, 0.8)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Download Resume</span>
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📄
                  </motion.span>
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={explosionVariants}
              initial="hidden"
              animate="visible"
              custom={7}
              className="flex space-x-4"
            >
              {portfolioData.socials.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/10 group relative overflow-hidden hover:border-blue-400/50 transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  {social.icon === 'github' && (
                    <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  
                  {social.icon === 'linkedin' && (
                    <svg className="w-5 h-5 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  )}
                  
                  {social.icon === 'email' && (
                    <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Interactive Tic-Tac-Toe Game */}
          <motion.div
            variants={explosionVariants}
            initial="hidden"
            animate="visible"
            custom={8}
            className="relative flex items-center justify-center h-[600px]"
          >
            <TicTacToeGame />
          </motion.div>
        </div>

        {/* Skills Icons Line - Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap justify-center items-center gap-6 mt-16 mb-12 max-w-5xl mx-auto"
        >
          <span className="text-gray-400 text-sm font-semibold mr-4">Tech Stack:</span>
          {[
            'React', 'Next.js', 'TypeScript', 'Laravel', 'Python', 
            'Java/Spring Boot', 'Angular', 'MySQL', 'Docker', 'AWS', 'Node.js'
          ].map((tech, index) => (
            <motion.div
              key={tech}
              className="flex items-center space-x-2 group cursor-pointer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.3 + index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1, 
                y: -2,
                transition: { duration: 0.2 }
              }}
            >
              <div className="w-8 h-8 bg-white/5 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/10 group-hover:border-blue-400/50 transition-all duration-300">
                <TechIcon name={tech} className="w-5 h-5 text-gray-400 group-hover:text-blue-300 transition-colors" />
              </div>
              <span className="text-gray-400 group-hover:text-white text-sm font-medium transition-colors">
                {tech}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
        </>
      )}

      {/* Scroll Indicator */}
      {showContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <motion.div
            className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center cursor-pointer hover:border-blue-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            onClick={scrollToAbout}
          >
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
