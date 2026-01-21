'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { Scale, Users, User, BookOpen, Shield, Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Stage = 'game' | 'transition' | 'content'
type Choice = 'west' | 'vietnam' | null

interface ComparisonData {
  title: string
  west: {
    content: string
    icon: React.ReactNode
  }
  vietnam: {
    content: string
    icon: React.ReactNode
  }
}

export default function ComparePage() {
  const [stage, setStage] = useState<Stage>('game')
  const [choice, setChoice] = useState<Choice>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const scaleRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<HTMLDivElement>(null)

  const comparisonData: ComparisonData[] = [
    {
      title: 'Trọng tâm',
      west: {
        content: 'Quyền Dân sự & Chính trị. \n Đề cao tự do cá nhân, coi tự do cá nhân là trung tâm để xã hội phát triển tự nhiên.',
        icon: <User className="w-8 h-8" />
      },
      vietnam: {
        content: 'Quyền Kinh tế, Văn hóa & Xã hội. \n Đề cao quyền được sống, làm việc, học tập và an sinh xã hội cho đa số nhân dân.',
        icon: <Users className="w-8 h-8" />
      }
    },
    {
      title: 'Cách tiếp cận',
      west: {
        content: 'Cá nhân đối trọng Nhà nước. \n Kiểm soát quyền lực công bằng cơ chế "kiềm chế - đối trọng" để bảo vệ quyền cá nhân',
        icon: <Shield className="w-8 h-8" />
      },
      vietnam: {
        content: 'Cá nhân thống nhất Nhà nước. \n Nhà nước là công cụ bảo vệ quyền lợi dân. Quyền cá nhân hài hòa với lợi ích quốc gia.',
        icon: <Heart className="w-8 h-8" />
      }
    },
    {
      title: 'Bản chất',
      west: {
        content: 'Quyền tự nhiên, vốn có. \n Tồn tại mặc nhiên và tuyệt đối, độc lập với bối cảnh xã hội.',
        icon: <BookOpen className="w-8 h-8" />
      },
      vietnam: {
        content: 'Quyền đi đôi với Nghĩa vụ. \n Quyền lợi không tách rời trách nhiệm với cộng đồng; được cụ thể hóa bằng pháp luật.',
        icon: <BookOpen className="w-8 h-8" />
      }
    }
  ]

  const handleChoice = (selected: Choice) => {
    setChoice(selected)
    
    // Animate scale tipping
    if (scaleRef.current) {
      const rotation = selected === 'west' ? -15 : 15
      gsap.to(scaleRef.current, {
        rotation,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      })
    }

    // Show transition after animation
    setTimeout(() => {
      setStage('transition')
    }, 1200)
  }

  const handleExplore = () => {
    setStage('content')
    
    // Animate game shrinking to top
    if (gameRef.current) {
      gsap.to(gameRef.current, {
        scale: 0.3,
        y: -300,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut'
      })
    }
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </Link>
        {/* Stage 1: The Game */}
        <AnimatePresence>
          {stage === 'game' && (
            <motion.div
              ref={gameRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="min-h-[80vh] flex flex-col items-center justify-center"
            >
              {/* Question */}
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 text-amber-100"
              >
                Trong một đại dịch, bạn sẽ chọn gì?
              </motion.h1>

              {/* Scale/Balance */}
              <div className="relative w-full max-w-4xl mb-16">
                <div ref={scaleRef} className="flex items-center justify-center">
                  <Scale className="w-16 h-16 text-amber-300" />
                </div>
              </div>

              {/* Options */}
              <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
                {/* West Option */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChoice('west')}
                  className={`group relative p-8 rounded-2xl shadow-xl transition-all duration-300 ${
                    choice === 'west'
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ring-4 ring-blue-400/50'
                      : 'bg-white/10 backdrop-blur-md border border-white/20 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-full transition-all duration-300 ${choice === 'west' ? 'bg-blue-400' : 'bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 group-hover:scale-110'}`}>
                      <User className={`w-12 h-12 ${choice === 'west' ? 'text-white' : 'text-blue-300'}`} />
                    </div>
                    <p className={`text-base ${choice === 'west' ? 'text-blue-50' : 'text-amber-200/80'}`}>
                      Quyền tự do đi lại tuyệt đối của cá nhân
                    </p>
                  </div>
                  {choice === 'west' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-blue-400/20 rounded-2xl animate-pulse"
                    />
                  )}
                </motion.button>

                {/* Vietnam Option */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChoice('vietnam')}
                  className={`group relative p-8 rounded-2xl shadow-xl transition-all duration-300 ${
                    choice === 'vietnam'
                      ? 'bg-gradient-to-br from-red-500 to-red-600 text-white ring-4 ring-red-400/50'
                      : 'bg-white/10 backdrop-blur-md border border-white/20 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/20'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`p-4 rounded-full transition-all duration-300 ${choice === 'vietnam' ? 'bg-red-400' : 'bg-red-600/20 backdrop-blur-sm border border-red-500/30 group-hover:scale-110'}`}>
                      <Users className={`w-12 h-12 ${choice === 'vietnam' ? 'text-white' : 'text-red-300'}`} />
                    </div>
                    <p className={`text-base ${choice === 'vietnam' ? 'text-red-50' : 'text-amber-200/80'}`}>
                      Hạn chế cá nhân để bảo vệ sức khỏe cộng đồng
                    </p>
                  </div>
                  {choice === 'vietnam' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 bg-red-400/20 rounded-2xl animate-pulse"
                    />
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 2: Transition */}
        <AnimatePresence>
          {stage === 'transition' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-[80vh] flex flex-col items-center justify-center"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="text-center space-y-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  <Scale className="w-24 h-24 text-amber-300" />
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-amber-100">
                  {choice === 'west' ? 'Bạn đã chọn quan điểm Phương Tây' : 'Bạn đã chọn quan điểm Việt Nam'}
                </h2>
                
                <p className="text-lg text-amber-200/80 max-w-2xl mx-auto leading-relaxed">
                  Mỗi quan điểm đều có những giá trị riêng. Hãy khám phá sự khác biệt sâu sắc giữa hai cách tiếp cận nhân quyền này.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExplore}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
                >
                  Khám phá sự khác biệt →
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 3: Detailed Content */}
        <AnimatePresence>
          {stage === 'content' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              {/* Header */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-100 mb-4">
                  So sánh quan điểm nhân quyền
                </h2>
                <p className="text-xl text-amber-200/70">
                  Phương Tây vs Việt Nam
                </p>
              </motion.div>

              {/* Comparison Cards */}
              <div className="space-y-6">
                {comparisonData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/20 hover:border-amber-500/50 transition-all duration-300"
                  >
                    {/* Card Header */}
                    <button
                      onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                      className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                    >
                      <h3 className="text-2xl font-bold text-amber-100">{item.title}</h3>
                      <motion.div
                        animate={{ rotate: expandedCard === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>

                    {/* Card Content */}
                    <AnimatePresence>
                      {expandedCard === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="grid md:grid-cols-2 gap-6 p-6 border-t border-white/10">
                            {/* West Side */}
                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="p-6 rounded-xl bg-blue-600/10 backdrop-blur-sm border-2 border-blue-500/30"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-blue-500 text-white rounded-lg">
                                  {item.west.icon}
                                </div>
                                <h4 className="text-xl font-bold text-blue-200">Phương Tây</h4>
                              </div>
                              <p className="text-amber-100/90 leading-relaxed whitespace-pre-line">{item.west.content}</p>
                            </motion.div>

                            {/* Vietnam Side */}
                            <motion.div
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="p-6 rounded-xl bg-red-600/10 backdrop-blur-sm border-2 border-red-500/30"
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-red-500 text-white rounded-lg">
                                  {item.vietnam.icon}
                                </div>
                                <h4 className="text-xl font-bold text-red-200">Việt Nam</h4>
                              </div>
                              <p className="text-amber-100/90 leading-relaxed whitespace-pre-line">{item.vietnam.content}</p>
                            </motion.div>
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
  )
}
