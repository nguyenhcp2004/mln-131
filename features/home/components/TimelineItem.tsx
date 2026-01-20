"use client";

import { PostType } from "@/common/types/post.type";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Calendar, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TimelineItemProps {
  post: PostType;
  index: number;
  linkPrefix?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  post,
  index,
  linkPrefix = "/timeline",
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate card from side
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            x: isEven ? -80 : 80,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: itemRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Animate circle from center (scale up)
      if (circleRef.current) {
        gsap.fromTo(
          circleRef.current,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: itemRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert(); // Cleanup
  }, [isEven]);

  return (
    <div
      ref={itemRef}
      className={`relative flex items-center mb-12 ${
        isEven ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {/* Content Card */}
      <div
        ref={cardRef}
        className={`w-5/12 ${isEven ? "text-right pr-8" : "text-left pl-8"}`}
      >
        <Link
          href={`${linkPrefix}/${post.slug}`}
          className="block group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer"
        >
          {/* Milestone Badge */}
          <div
            className={`flex items-center gap-2 mb-3 ${
              isEven ? "justify-end" : "justify-start"
            }`}
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-bold text-sm">
              {post.milestone}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
            {post.title}
          </h3>

          {/* Short Description */}
          {post.shortDescription && (
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {post.shortDescription}
            </p>
          )}

          {/* Image */}
          {post.image && post.image.length > 0 && (
            <div className="mb-4 overflow-hidden rounded-lg bg-amber-900/20">
              <img
                src={post.image[0]}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                crossOrigin="anonymous"
              />
            </div>
          )}

          {/* Read More Button */}
          <div
            className={`flex items-center gap-2 ${
              isEven ? "justify-end" : "justify-start"
            }`}
          >
            <span className="text-amber-300 text-sm font-medium group-hover:text-amber-200 transition-colors">
              Xem chi tiết
            </span>
            <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Center Circle Node */}
      <div className="w-2/12 flex justify-center relative z-10">
        <div
          ref={circleRef}
          className="w-6 h-6 bg-amber-500 rounded-full border-4 border-amber-900/40 shadow-lg shadow-amber-500/50 group-hover:scale-125 transition-transform duration-300"
        />
      </div>

      {/* Empty space on other side */}
      <div className="w-5/12" />
    </div>
  );
};
