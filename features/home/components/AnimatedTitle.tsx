"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Dancing_Script } from "next/font/google";

// Font configuration
const dancingScript = Dancing_Script({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "vietnamese"]
});

// Typewriter Text Component with GSAP
interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

const TypewriterText = ({
  text,
  delay = 0,
  speed = 50,
  className = "",
  style = {}
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [isTyping, currentIndex, text, speed]);

  // GSAP text shadow animation
  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        textShadow:
          "3px 3px 12px rgba(45, 24, 16, 0.4), 0px 0px 25px rgba(217, 119, 6, 0.15)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  // GSAP cursor blink animation
  useEffect(() => {
    if (cursorRef.current && isTyping && currentIndex < text.length) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, [isTyping, currentIndex, text.length]);

  return (
    <p
      ref={textRef}
      className={className}
      style={{
        ...style,
        textShadow:
          "2px 2px 8px rgba(45, 24, 16, 0.3), 0px 0px 20px rgba(217, 119, 6, 0.1)"
      }}
    >
      {displayedText}
      {isTyping && currentIndex < text.length && (
        <span
          ref={cursorRef}
          style={{
            color: "#D97706",
            fontWeight: "bold",
            fontSize: "1.2em"
          }}
        >
          |
        </span>
      )}
    </p>
  );
};

const AnimatedTitle = () => {
  const text = " HÀNH TRÌNH NHÂN QUYỀN - TỪ QUAN NIỆM ĐẾN HÀNH ĐỘNG";
  const titleRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const underlineContainerRef = useRef<HTMLDivElement>(null);
  const underlineBarRef = useRef<HTMLDivElement>(null);
  const gradientOverlayRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const subtitleContainerRef = useRef<HTMLDivElement>(null);
  const leftQuoteRef = useRef<HTMLDivElement>(null);
  const rightQuoteRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title container entrance
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
        );
      }

      // Characters stagger animation
      const validChars = charsRef.current.filter(Boolean);
      if (validChars.length > 0) {
        gsap.fromTo(
          validChars,
          {
            opacity: 0,
            y: 50,
            scale: 0.5,
            rotationX: -90
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.2, // Increased from 0.2 for slower animation
            stagger: 0.05, // Increased from 0.033 for slower stagger
            ease: "back.out(1.7)",
            onComplete: () => {
              // Start wave animation after entrance
              validChars.forEach((char, index) => {
                if (!char) return;

                // Color wave animation
                gsap.to(char, {
                  color: "#D97706",
                  duration: 4,
                  repeat: -1,
                  yoyo: true,
                  ease: "linear",
                  delay: index * 0.07, // Increased from 0.033 for slower wave
                  keyframes: [
                    { color: "#2D1810" },
                    { color: "#8B4513" },
                    { color: "#D97706" },
                    { color: "#B45309" },
                    { color: "#92400E" },
                    { color: "#2D1810" }
                  ]
                });

                // Y-axis wave animation
                gsap.to(char, {
                  y: -2,
                  duration: 2,
                  repeat: -1,
                  yoyo: true,
                  ease: "power1.inOut",
                  delay: index * 0.07 // Increased from 0.017 for slower wave
                });
              });
            }
          }
        );
      }

      // Underline animation
      if (underlineContainerRef.current) {
        gsap.fromTo(
          underlineContainerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.5, delay: 3, ease: "power2.out" }
        );
      }

      // 3D rotation for underline bar
      if (underlineBarRef.current) {
        gsap.to(underlineBarRef.current, {
          rotationX: 2,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }

      // Gradient overlay animation
      if (gradientOverlayRef.current) {
        gsap.to(gradientOverlayRef.current, {
          backgroundPosition: "200% center",
          duration: 4,
          repeat: -1,
          ease: "linear",
          delay: 1
        });
      }

      // Highlight opacity animation
      if (highlightRef.current) {
        gsap.to(highlightRef.current, {
          opacity: 0.6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }

      // Subtitle container entrance
      if (subtitleContainerRef.current) {
        gsap.fromTo(
          subtitleContainerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, delay: 4.5, duration: 1, ease: "power2.out" }
        );
      }

      // Quote marks
      if (leftQuoteRef.current) {
        gsap.fromTo(
          leftQuoteRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            delay: 5,
            duration: 0.6,
            ease: "back.out(1.7)"
          }
        );
      }

      if (rightQuoteRef.current) {
        gsap.fromTo(
          rightQuoteRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            delay: 5.2,
            duration: 0.6,
            ease: "back.out(1.7)"
          }
        );
      }

      // Background glow animation
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.08,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Main Title with Wave Text Effect */}
      <div className="relative overflow-hidden w-full max-w-7xl mx-auto">
        <div className="flex justify-center items-center w-full">
          <h1
            ref={titleRef}
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold leading-relaxed relative ${dancingScript.className}`}
            style={{
              letterSpacing: "0.02em",
              wordSpacing: "0.1em",
              textAlign: "center",
              display: "block",
              maxWidth: "100%",
              lineHeight: "1.6"
            }}
          >
            {text.split(" ").map((word, wIndex) => (
              <span
                key={wIndex}
                style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  marginRight: "0.25em"
                }}
              >
                {word.split("").map((char, cIndex) => (
                  <span
                    key={cIndex}
                    ref={(el) => {
                      charsRef.current.push(el);
                    }}
                    className="inline-block"
                    style={{
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                      willChange: "color, transform, opacity",
                      color: "#2D1810"
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* 3D Decorative Underline with Tapered Ends */}
      <div
        ref={underlineContainerRef}
        className="mx-auto w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] h-2 sm:h-3 md:h-4 relative"
        style={{
          perspective: "1000px"
        }}
      >
        {/* Main Tapered Bar */}
        <div
          ref={underlineBarRef}
          className="w-full h-full relative"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #8B4513 15%, #D97706 30%, #B45309 50%, #D97706 70%, #8B4513 85%, transparent 100%)",
            borderRadius: "50px",
            boxShadow: `
              0 4px 8px rgba(139, 69, 19, 0.3),
              0 2px 4px rgba(139, 69, 19, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
        >
          {/* Animated Gradient Overlay */}
          <div
            ref={gradientOverlayRef}
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(217, 119, 6, 0.8) 20%, rgba(180, 83, 9, 0.9) 50%, rgba(217, 119, 6, 0.8) 80%, transparent 100%)",
              borderRadius: "50px",
              willChange: "background-position",
              backgroundSize: "200% 100%"
            }}
          />

          {/* Top Highlight */}
          <div
            ref={highlightRef}
            className="absolute top-0 left-0 w-full h-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.4) 50%, transparent 90%)",
              borderRadius: "50px 50px 0 0",
              willChange: "opacity",
              opacity: 0.3
            }}
          />

          {/* 3D Depth Shadow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)",
              borderRadius: "50px",
              transform: "translateZ(-2px) translateY(1px)"
            }}
          />
        </div>
      </div>

      {/* Enhanced Subtitle with Typewriter Effect */}
      <div
        ref={subtitleContainerRef}
        className="mt-8 sm:mt-12 lg:mt-20 relative max-w-4xl mx-auto"
      >
        {/* Decorative Quote Marks */}
        <div
          ref={leftQuoteRef}
          className="absolute -top-2 sm:-top-4 -left-4 sm:-left-8 text-2xl sm:text-3xl md:text-4xl opacity-30 z-10"
          style={{
            // fontFamily: "'Open Sans', serif",
            color: "#D97706",
            fontWeight: "bold"
          }}
        >
          "
        </div>

        {/* Card Container for Quote */}
        <div className="relative rounded-2xl border-2 border-amber-700/40 bg-black/20 backdrop-blur-sm p-3">
          <TypewriterText
            text="Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân. Công việc đổi mới xây dựng là trách nhiệm của dân."
            delay={5.5}
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal leading-relaxed text-center ${dancingScript.className}`}
            style={{
              // fontFamily: "'Dancing Script', cursive",
              color: "#D97706",
              letterSpacing: "0.5px",
              fontWeight: "500"
            }}
          />
        </div>

        {/* Decorative Quote Marks */}
        <div
          ref={rightQuoteRef}
          className="absolute -bottom-2 sm:-bottom-4 -right-4 sm:-right-8 text-2xl sm:text-3xl md:text-4xl opacity-30 z-10"
          style={{
            // fontFamily: "'Open Sans', serif",
            color: "#D97706",
            fontWeight: "bold"
          }}
        >
          "
        </div>

        {/* Background Glow Effect */}
        <div
          ref={glowRef}
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 300px 80px at center, rgba(217, 119, 6, 0.05), transparent)",
            willChange: "opacity"
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedTitle;
