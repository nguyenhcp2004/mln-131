'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowLeft, Check, X, Sparkles, ChevronDown, PersonStanding } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type Phase = 'game' | 'reveal' | 'content'

interface Puzzle {
  id: number
  word: string
  hint: string
  imageUrls: string[]
}

interface ContentCard {
  id: number
  title: string
  content: string
  imageUrls: string[]
}

export default function HumanRightsPage() {
  const [phase, setPhase] = useState<Phase>('game')
  const [currentRound, setCurrentRound] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [collectedWords, setCollectedWords] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [isShaking, setIsShaking] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const wordRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<HTMLDivElement>(null)

  const puzzles: Puzzle[] = [
    {
      id: 1,
      word: 'LÀM CHỦ',
      hint: 'Quyền lực thuộc về nhân dân (6 chữ)',
      imageUrls: [
        '/puzzle/lam.webp',
        '/puzzle/chu.png',
      ]
    },
    {
      id: 2,
      word: 'PHÁP LUẬT',
      hint: 'Công cụ bảo vệ quyền con người (8 chữ)',
      imageUrls: [
        '/puzzle/phap.jpg',
        '/puzzle/luat.png',
      ]
    },
    {
      id: 3,
      word: 'KIỂM TRA',
      hint: 'Dân giám sát quyền lực (7 chữ)',
      imageUrls: [
        '/puzzle/kiem.webp',
        '/puzzle/tra.jpeg',
      ]
    },
    {
      id: 4,
      word: 'AN SINH',
      hint: 'Đảm bảo cuộc sống cho mọi người (6 chữ)',
      imageUrls: [
        '/puzzle/an.webp',
        '/puzzle/sinh.webp',
      ]
    },
    {
      id: 5,
      word: 'PHÁT TRIỂN',
      hint: 'Mục tiêu toàn diện và bền vững (9 chữ)',
      imageUrls: [
        '/puzzle/phat.png',
        '/puzzle/trien.jpg',
      ]
    }
  ]

  const contentCards: ContentCard[] = [
    {
      id: 1,
      title: "Quyền làm chủ – Dân chủ xã hội chủ nghĩa",
      content:
        'Dân chủ XHCN là hình thức dân chủ thực chất, nơi người dân là chủ thể quyền lực cao nhất. Không chỉ dừng lại ở việc bầu cử, người dân trực tiếp tham gia quản lý xã hội theo phương châm: "Dân biết, dân bàn, dân làm, dân kiểm tra, dân thụ hưởng". Mọi chính sách đều xuất phát từ lợi ích của đa số nhân dân lao động.',
      imageUrls: [
        "/humanr/bophieu1.jpg",
        "/humanr/bophieu2.png",
        "/humanr/bophieu3.jpg",
      ],
    },
    {
      id: 2,
      title: "Nhà nước XHCN – Công cụ bảo vệ quyền con người",
      content:
        "Nhà nước không đứng trên nhân dân mà là công cụ để thể chế hóa và bảo vệ quyền con người bằng pháp luật. Hệ thống pháp luật XHCN phản ánh ý chí của nhân dân, đảm bảo sự bình đẳng và công bằng. Quyền lợi cá nhân luôn gắn liền với nghĩa vụ công dân, tạo nền tảng cho sự phát triển toàn diện của mỗi thành viên trong xã hội.",
      imageUrls: [
        "/humanr/baove1.jpg",
        "/humanr/baove2.jpg",
        "/humanr/baove3.webp",
      ],
    },
    {
      id: 3,
      title: "Giá trị cốt lõi – Không để ai bị bỏ lại phía sau",
      content:
        "Mục tiêu cao nhất là giải phóng con người khỏi bất công và bóc lột. Nhà nước cam kết đảm bảo an sinh xã hội, giúp mọi người dân tiếp cận bình đẳng các dịch vụ cơ bản: Giáo dục, Y tế, Việc làm. Thông qua chính sách hỗ trợ nhóm yếu thế và phân phối công bằng, xã hội hướng tới thu hẹp khoảng cách giàu nghèo và phát triển bền vững.",
      imageUrls: [
        "/humanr/cotloi1.jpg",
        "/humanr/cotloi2.jpg",
        "/humanr/cotloi3.jpg",
      ],
    },
  ]

  const normalizeString = (str: string) => {
    return str
      .toUpperCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/Đ/g, 'D')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const currentPuzzle = puzzles[currentRound]
    const isAnswerCorrect = normalizeString(userInput) === normalizeString(currentPuzzle.word)

    if (isAnswerCorrect) {
      setIsCorrect(true)
      
      // Animate word flying to sidebar
      if (wordRef.current) {
        gsap.to(wordRef.current, {
          x: window.innerWidth > 768 ? 400 : 0,
          y: window.innerWidth > 768 ? -200 : -100,
          scale: 0.5,
          opacity: 0.8,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            setCollectedWords([...collectedWords, currentPuzzle.word])
            setUserInput('')
            setIsCorrect(null)
            
            if (currentRound < puzzles.length - 1) {
              setCurrentRound(currentRound + 1)
            } else {
              // All words collected, move to reveal phase
              setTimeout(() => setPhase('reveal'), 500)
            }
          }
        })
      }
    } else {
      setIsCorrect(false)
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
        setIsCorrect(null)
      }, 500)
    }
  }

  const handleStartJourney = () => {
    if (gameRef.current) {
      gsap.to(gameRef.current, {
        scale: 0.5,
        opacity: 0,
        y: -200,
        filter: 'blur(10px)',
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => setPhase('content')
      })
    }
  }

  const handleSkipGame = () => {
    // Collect all remaining words
    const allWords = puzzles.map(p => p.word)
    setCollectedWords(allWords)
    // Move to reveal phase
    setTimeout(() => setPhase('reveal'), 300)
  }

  const currentPuzzle = puzzles[currentRound]

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại</span>
            </Link>

            {/* Skip Button - Only show during game phase */}
            {phase === 'game' && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleSkipGame}
                className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:border-amber-500/50 text-amber-300 hover:text-amber-200 text-sm font-medium rounded-full transition-all duration-300"
              >
                Bỏ qua trò chơi →
              </motion.button>
            )}
          </div>

        {/* Phase 1: Word Puzzle Game */}
        <AnimatePresence>
          {phase === 'game' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >

              {/* Main Game Area */}
              <div className="space-y-8">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-100 mb-4">
                    Trò chơi giải mã
                  </h1>
                  <p className="text-xl text-amber-200/70">
                    Tìm ra 5 trụ cột nhân quyền trong XHCN
                  </p>
                  <div className="mt-4">
                    <span className="text-amber-300 text-lg font-semibold">
                      Vòng {currentRound + 1}/5
                    </span>
                  </div>
                </motion.div>

                {/* Puzzle Card */}
                <motion.div
                  key={currentRound}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 pt-4 border border-white/20"
                >
                  <h3 className="text-2xl font-bold text-amber-100 mb-4 text-center">
                    {currentPuzzle.hint}
                  </h3>

                  {/* Hint Images */}
                  <div className="grid grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
                    {currentPuzzle.imageUrls.map((url, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1 }}
                        className="aspect-square bg-white/5 rounded-xl border border-white/10 overflow-hidden group cursor-pointer shadow-lg relative"
                      >
                        <Image
                          src={url}
                          alt={`Gợi ý ${idx + 1}`}
                          fill
                          className="object-fill group-hover:scale-110 transition-transform duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Input Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Nhập từ khóa..."
                        className={`w-full px-6 py-4 bg-white/5 border-2 rounded-xl text-amber-100 placeholder-amber-300/50 focus:outline-none focus:border-amber-500 transition-all ${
                          isShaking ? 'animate-shake border-red-500' : 'border-white/20'
                        }`}
                        autoFocus
                      />
                      {isCorrect !== null && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          {isCorrect ? (
                            <Check className="w-6 h-6 text-green-400" />
                          ) : (
                            <X className="w-6 h-6 text-red-400" />
                          )}
                        </motion.div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all"
                    >
                      Xác nhận
                    </motion.button>
                  </form>

                  {/* Answer Preview (for correct answer animation) */}
                  {isCorrect && (
                    <motion.div
                      ref={wordRef}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-6 text-center"
                    >
                      <span className="inline-block px-6 py-3 bg-amber-500 text-white text-2xl font-bold rounded-xl">
                        {currentPuzzle.word}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Collected Words - Horizontal */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-lg font-bold text-amber-100 mb-4 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  Từ khóa đã thu thập
                </h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {collectedWords.map((word, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-6 py-3 bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-100 font-semibold"
                    >
                      {word}
                    </motion.div>
                  ))}
                  {Array(5 - collectedWords.length)
                    .fill(0)
                    .map((_, idx) => (
                      <div
                        key={`empty-${idx}`}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-amber-300/30 font-semibold"
                      >
                        ???
                      </div>
                    ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2: Grand Reveal */}
        <AnimatePresence>
          {phase === 'reveal' && (
            <motion.div
              ref={gameRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-[80vh] flex flex-col items-center justify-center"
            >
              <motion.h2
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-amber-100 mb-12 text-center"
              >
                5 TRỤ CỘT NHÂN QUYỀN TRONG XHCN
              </motion.h2>

              {/* Words in Circle Formation */}
              <div className="relative w-[400px] h-[400px] mb-12">
                {collectedWords.map((word, idx) => {
                  const angle = (idx * 72 - 90) * (Math.PI / 180)
                  const x = Math.cos(angle) * 150
                  const y = Math.sin(angle) * 150

                  return (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{ scale: 1, x, y }}
                      transition={{ delay: 0.5 + idx * 0.1, type: 'spring' }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-2xl text-center whitespace-nowrap">
                        {word}
                      </div>
                    </motion.div>
                  )
                })}

                {/* Center Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, type: 'spring' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-amber-500"
                >
                  <PersonStanding className="w-10 h-10 text-amber-300" />
                </motion.div>
              </div>

              {/* Start Journey Button */}
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartJourney}
                className="relative px-12 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xl font-bold rounded-full shadow-2xl overflow-hidden group"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-amber-400/30 rounded-full blur-xl"
                />
                <span className="relative">Tìm hiểu thêm →</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: Content Section */}
        <AnimatePresence>
          {phase === 'content' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-100 mb-4">
                  Nhân quyền trong XHCN
                </h2>
                <p className="text-xl text-amber-200/70">
                  Thực tiễn và giá trị cốt lõi
                </p>
              </motion.div>

              {/* Content Cards */}
              <div className="space-y-6 max-w-5xl mx-auto">
                {contentCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.15 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-amber-500/50 transition-all duration-300"
                  >
                    {/* Card Header */}
                    <button
                      onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
                      className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-2xl font-bold text-amber-100 text-left">{card.title}</h3>
                      <motion.div
                        animate={{ rotate: expandedCard === card.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-6 h-6 text-amber-300" />
                      </motion.div>
                    </button>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedCard === card.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 border-t border-white/10 space-y-6">
                            {/* Images */}
                            <div className="grid grid-cols-3 gap-4">
                              {card.imageUrls.map((url, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="aspect-video bg-white/5 rounded-xl border border-white/10 overflow-hidden relative"
                                >
                                  <Image
                                    src={url}
                                    alt={`${card.title} - Ảnh ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </motion.div>
                              ))}
                            </div>

                            {/* Content Text */}
                            <motion.p
                              initial={{ y: 10, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="text-amber-100/90 leading-relaxed text-lg"
                            >
                              {card.content}
                            </motion.p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}
