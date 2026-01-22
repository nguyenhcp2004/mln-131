"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Bot,
  ClipboardList,
  Landmark,
  Scale,
  PersonStanding
} from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const NavigateButton = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const routes = [
    { name: "Trang chủ", path: "/", icon: Home },

    { name: "So sánh quan điểm", path: "/compare", icon: Scale },
    {
      name: "Con người trong XHCN",
      path: "/human-rights",
      icon: PersonStanding
    },
    { name: "Used AI", path: "/used-ai", icon: Bot },
    {
      name: "Board",
      path: "https://museum3d.vercel.app/",
      icon: Landmark,
      external: true
    },
    {
      name: "Thực tiễn tại Việt Nam",
      path: "/thuc-tien-hien-nay",
      icon: ClipboardList
    }
  ];

  // Initial animation on mount
  useEffect(() => {
    if (navRef.current && itemsRef.current.length > 0) {
      // Animate container
      gsap.fromTo(
        navRef.current,
        {
          x: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }
      );

      // Stagger animation for items
      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        {
          scale: 0,
          opacity: 0,
          rotation: -180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)",
          delay: 0.3
        }
      );
    }
  }, []);

  // Hover animations
  const handleMouseEnter = (index: number) => {
    const item = itemsRef.current[index];
    if (!item) return;

    const icon = item.querySelector("svg");
    const tooltip = item.querySelector(".tooltip");

    // Kill any ongoing animations to prevent overlap
    gsap.killTweensOf(item);
    if (icon) gsap.killTweensOf(icon);
    if (tooltip) gsap.killTweensOf(tooltip);

    gsap.to(item, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });

    if (icon) {
      gsap.to(icon, {
        rotation: 360,
        scale: 1.2,
        duration: 0.5,
        ease: "back.out(1.7)"
      });
    }

    if (tooltip) {
      gsap.to(tooltip, {
        opacity: 1,
        x: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const item = itemsRef.current[index];
    if (!item) return;

    const icon = item.querySelector("svg");
    const tooltip = item.querySelector(".tooltip");

    // Kill any ongoing animations to prevent overlap
    gsap.killTweensOf(item);
    if (icon) gsap.killTweensOf(icon);
    if (tooltip) gsap.killTweensOf(tooltip);

    gsap.to(item, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    if (icon) {
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }

    if (tooltip) {
      gsap.to(tooltip, {
        opacity: 0,
        x: 0,
        duration: 0.2,
        ease: "power2.in"
      });
    }
  };

  return (
    <nav ref={navRef} className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <div className="flex flex-col gap-3 bg-gradient-to-b from-amber-900/40 to-amber-950/40 backdrop-blur-sm p-4 rounded-3xl border border-amber-700/30 shadow-2xl">
        {routes.map((route, index) => {
          const Icon = route.icon;
          const isActive = pathname === route.path;

          return (
            <Link
              key={route.path}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              href={route.path}
              {...(route.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`group relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300 ${
                isActive
                  ? "bg-amber-600/60 shadow-lg shadow-amber-600/30"
                  : "bg-amber-800/30 hover:bg-amber-700/50"
              }`}
              title={route.name}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? "text-amber-200" : "text-amber-500"
                }`}
                strokeWidth={2}
              />

              {/* Tooltip with GSAP animation */}
              <span className="tooltip absolute right-full mr-3 px-3 py-1.5 bg-amber-900/90 text-amber-100 text-sm font-medium rounded-lg opacity-0 whitespace-nowrap pointer-events-none">
                {route.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavigateButton;
