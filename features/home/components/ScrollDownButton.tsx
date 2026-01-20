"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ScrollDownButton = () => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!buttonRef.current || !arrowRef.current) return;

    // Floating animation for button
    gsap.to(buttonRef.current, {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Arrow bounce animation
    gsap.to(arrowRef.current, {
      y: 5,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div ref={buttonRef} onClick={handleClick} className="cursor-pointer group">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-amber-500/30 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Button container */}
      <div className="relative flex flex-col items-center gap-2">
        {/* Text */}
        <span className="text-amber-200 text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          Cuộn để xem
        </span>

        {/* Arrow icon */}
        <div className="w-12 h-12 rounded-full bg-amber-600/40 backdrop-blur-md border border-amber-500/50 flex items-center justify-center group-hover:bg-amber-600/60 group-hover:border-amber-400/70 transition-all duration-300 shadow-lg shadow-amber-900/50">
          <svg
            ref={arrowRef}
            className="w-6 h-6 text-amber-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>

        {/* Vertical line */}
        <div className="w-px h-8 bg-gradient-to-b from-amber-500/50 to-transparent" />
      </div>
    </div>
  );
};

export default ScrollDownButton;
