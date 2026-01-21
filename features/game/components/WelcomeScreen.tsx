"use client";

import { Star, Trophy, HelpCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface WelcomeScreenProps {
  onStart: () => void;
  onShowInstructions: () => void;
  onShowLeaderboard: () => void;
}

export default function WelcomeScreen({
  onStart,
  onShowInstructions,
  onShowLeaderboard,
}: WelcomeScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate stars
    starsRef.current.forEach((star, index) => {
      if (star) {
        gsap.fromTo(
          star,
          { scale: 0, rotation: -180, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          }
        );
      }
    });

    // Animate title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
    }

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.5 }
      );
    }

    // Animate main button
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: 0.7,
          ease: "back.out(1.5)",
        }
      );
    }

    // Animate secondary buttons
    if (secondaryRef.current) {
      gsap.fromTo(
        secondaryRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.9 }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Decorative stars with amber theme */}
      <div
        ref={(el) => {
          starsRef.current[0] = el;
        }}
        className="absolute top-8 left-8"
      >
        <Star className="w-16 h-16 text-amber-400 fill-amber-400 drop-shadow-lg" />
      </div>
      <div
        ref={(el) => {
          starsRef.current[1] = el;
        }}
        className="absolute top-8 right-8"
      >
        <Star className="w-16 h-16 text-amber-400 fill-amber-400 drop-shadow-lg" />
      </div>
      <div
        ref={(el) => {
          starsRef.current[2] = el;
        }}
        className="absolute bottom-8 left-1/4"
      >
        <Star className="w-12 h-12 text-amber-300 fill-amber-300 opacity-60" />
      </div>
      <div
        ref={(el) => {
          starsRef.current[3] = el;
        }}
        className="absolute bottom-8 right-1/4"
      >
        <Star className="w-12 h-12 text-amber-300 fill-amber-300 opacity-60" />
      </div>

      <div className="text-center max-w-4xl">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-amber-400 mb-6 drop-shadow-2xl"
        >
          Hành Trình Nhân Quyền
        </h1>

        <h2
          ref={subtitleRef}
          className="text-xl md:text-2xl font-semibold text-white/90 mb-12 px-4 leading-relaxed"
        >
          Cùng tham gia vào trò chơi
          <br />
          Để hiểu hơn và &quot;Thử thách trí nhớ&quot; của mình nhé!
        </h2>

        {/* Main CTA Button */}
        <button
          ref={buttonRef}
          onClick={onStart}
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 
                   text-white text-xl md:text-2xl font-bold py-4 px-12 rounded-2xl 
                   shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70
                   transition-all duration-300 hover:scale-105 mb-8"
        >
          BẮT ĐẦU CHƠI
        </button>

        {/* Secondary Buttons */}
        <div
          ref={secondaryRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onShowInstructions}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md
                     text-white border-2 border-white/30 hover:border-amber-400/50
                     font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <HelpCircle className="w-5 h-5" />
            Hướng dẫn
          </button>

          <button
            onClick={onShowLeaderboard}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md
                     text-white border-2 border-white/30 hover:border-amber-400/50
                     font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105"
          >
            <Trophy className="w-5 h-5" />
            Bảng xếp hạng
          </button>
        </div>

        {/* Game Description */}
        <p className="mt-12 text-white/80 text-lg max-w-2xl mx-auto">
          Trả lời câu hỏi để thu thập mảnh ghép và hoàn thành bức tranh lịch sử!
        </p>
      </div>
    </div>
  );
}
