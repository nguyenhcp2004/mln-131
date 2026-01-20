"use client";

import { ReactNode, useRef, useEffect } from "react";
import { gsap } from "gsap";

interface CardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: "quote" | "list"; // Add variant support
}

const Card = ({
  children,
  delay = 0,
  className = "",
  variant = "quote",
}: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const leftQuoteRef = useRef<HTMLDivElement>(null);
  const rightQuoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline({ delay });

    // Card entrance animation
    tl.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Quote marks animation (only for quote variant)
    if (variant === "quote" && leftQuoteRef.current && rightQuoteRef.current) {
      tl.fromTo(
        [leftQuoteRef.current, rightQuoteRef.current],
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 0.3,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
        },
        "-=0.4"
      );
    }
  }, [delay, variant]);

  if (variant === "list") {
    // Simple card without quotes
    return (
      <div
        ref={cardRef}
        className={`relative rounded-xl border-2 border-amber-800/30 bg-black/10 p-8 shadow-xl shadow-black/20 ${className}`}
      >
        {children}
      </div>
    );
  }

  // Quote variant (original)
  return (
    <div className={`relative max-w-4xl mx-auto ${className}`}>
      {/* Left Quote Mark */}
      <div
        ref={leftQuoteRef}
        className="absolute -top-2 sm:-top-4 -left-4 sm:-left-8 text-2xl sm:text-3xl md:text-4xl opacity-30 z-10"
        style={{
          color: "#D97706",
          fontWeight: "bold",
        }}
      >
        "
      </div>

      {/* Card Container */}
      <div
        ref={cardRef}
        className="relative rounded-2xl border-2 border-amber-700/40 bg-black/20 backdrop-blur-sm p-6 sm:p-8 md:p-10 shadow-xl shadow-black/20"
      >
        {children}
      </div>

      {/* Right Quote Mark */}
      <div
        ref={rightQuoteRef}
        className="absolute -bottom-2 sm:-bottom-4 -right-4 sm:-right-8 text-2xl sm:text-3xl md:text-4xl opacity-30 z-10"
        style={{
          color: "#D97706",
          fontWeight: "bold",
        }}
      >
        "
      </div>
    </div>
  );
};

export default Card;
