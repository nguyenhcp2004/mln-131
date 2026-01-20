"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, ReactNode, useState } from "react";
import { gsap } from "gsap";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;

    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
        setDisplayChildren(children);
      },
    });

    // Fade out old content
    tl.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    });

    // Fade overlay in
    tl.to(
      overlayRef.current,
      { opacity: 1, duration: 0.2, ease: "power2.inOut" },
      "-=0.1"
    );

    // Update content (happens during overlay)
    tl.call(() => {
      setDisplayChildren(children);
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    // Fade overlay out
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    // Fade in new content with effects
    tl.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.98,
        filter: "blur(10px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.2"
    );
  }, [pathname, children]);

  return (
    <>
      {/* Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(217, 119, 6, 0.1) 0%, rgba(180, 83, 9, 0.15) 100%)",
          opacity: 0,
        }}
      />

      {/* Content Container */}
      <div
        ref={containerRef}
        className="w-full"
        style={{
          willChange: isTransitioning ? "transform, opacity, filter" : "auto",
        }}
      >
        {displayChildren}
      </div>
    </>
  );
};

export default PageTransition;
