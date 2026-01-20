"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Music2 } from "lucide-react";
import { gsap } from "gsap";

const MusicPlay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto set volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  // Animate waves when playing
  useEffect(() => {
    if (isPlaying) {
      // Icon fade in
      if (iconRef.current) {
        gsap.fromTo(
          iconRef.current,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
      }

      // Wave bars animation
      waveRefs.current.forEach((wave, index) => {
        if (wave) {
          gsap.to(wave, {
            scaleY: 1.8,
            duration: 0.6 + index * 0.15,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: index * 0.1,
          });
        }
      });
    } else {
      // Icon fade in
      if (iconRef.current) {
        gsap.fromTo(
          iconRef.current,
          { scale: 0.5, opacity: 0, rotation: 180 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.3,
            ease: "back.out(1.7)",
          }
        );
      }

      // Stop wave animation
      waveRefs.current.forEach((wave) => {
        if (wave) {
          gsap.to(wave, {
            scaleY: 1,
            duration: 0.3,
          });
        }
      });
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);

      // Button bounce animation
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 0.9,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
      }
    }
  };

  return (
    <div className="fixed top-6 left-6 z-50">
      <div className="relative flex items-center gap-3">
        {/* Main button */}
        <button
          ref={buttonRef}
          onClick={togglePlay}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${
            isPlaying
              ? "bg-gradient-to-br from-amber-500/60 to-amber-600/60 shadow-lg shadow-amber-500/40"
              : "bg-gradient-to-br from-amber-800/40 to-amber-900/40 hover:from-amber-700/50 hover:to-amber-800/50"
          } backdrop-blur-md border border-amber-700/30`}
          title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
        >
          {isPlaying ? (
            <Music
              ref={iconRef}
              className="w-6 h-6 text-amber-100"
              strokeWidth={2}
            />
          ) : (
            <Music2
              ref={iconRef}
              className="w-6 h-6 text-amber-400/60"
              strokeWidth={2}
            />
          )}
        </button>

        {/* Wave bars - only show when playing */}
        {isPlaying && (
          <div className="flex items-center gap-1 h-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  waveRefs.current[i] = el;
                }}
                className="w-1 h-3 bg-amber-400/70 rounded-full"
                style={{
                  transformOrigin: "center",
                }}
              />
            ))}
          </div>
        )}

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="/music/nguoi_di_tim_hinh_cua_nuoc.mp3"
          loop
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
};

export default MusicPlay;
