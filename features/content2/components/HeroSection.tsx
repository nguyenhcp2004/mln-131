'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  context: string;
}

export default function HeroSection({ title, subtitle, quote, author, context }: HeroSectionProps) {
  return (
    <section className="revolutionary-gradient py-16 px-4 relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute top-8 left-8 opacity-20">
        <Star className="w-24 h-24 text-[#FFD700] fill-[#FFD700]" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-20">
        <Star className="w-24 h-24 text-[#FFD700] fill-[#FFD700]" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-4">
            {title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
            {subtitle}
          </h2>

          {/* Quote Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm border-2 border-[#FFD700] rounded-xl p-6 md:p-8"
          >
            <Quote className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
            <p className="text-xl md:text-2xl text-white font-semibold italic mb-4">
              "{quote}"
            </p>
            <p className="text-[#FFD700] font-bold text-lg">- {author}</p>
            <p className="text-white/70 text-sm mt-2">{context}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
