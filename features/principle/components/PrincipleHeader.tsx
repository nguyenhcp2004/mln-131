"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const PrincipleHeader = () => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <div ref={titleRef} className="text-center mb-20 relative">
      {/* Decorative top line */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
        <div className="w-2 h-2 rounded-full bg-amber-500" />
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-amber-100 mb-6">
        Nguyên Tắc Tổ Chức và Sinh Hoạt
      </h1>

      {/* Subtitle with accent */}
      <div className="inline-block relative">
        <p className="text-amber-200/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed px-6 py-4 rounded-xl bg-amber-900/10 border border-amber-700/20">
          Để đảm bảo vai trò lãnh đạo và duy trì bản chất cách mạng, Chủ tịch Hồ
          Chí Minh đã xác định các nguyên tắc nền tảng cho việc xây dựng Đảng
          Cộng sản Việt Nam trở nên trong sạch, vững mạnh.
        </p>
      </div>

      {/* Decorative bottom line */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>
    </div>
  );
};

export default PrincipleHeader;
