"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CONTENT_ROUTES } from "@/common/constants/routes";

export default function ContentNavigation() {
  const pathname = usePathname();
  
  // Find current content index
  const currentIndex = CONTENT_ROUTES.findIndex(route => route.path === pathname);
  
  // Get previous and next content
  const previousContent = currentIndex > 0 ? CONTENT_ROUTES[currentIndex - 1] : null;
  const nextContent = currentIndex < CONTENT_ROUTES.length - 1 ? CONTENT_ROUTES[currentIndex + 1] : null;

  if (currentIndex === -1) return null;

  return (
    <div className="mt-16 pt-8 border-t-2 border-amber-500/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Button */}
        {previousContent ? (
          <Link
            href={previousContent.path}
            className="group relative flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border-2 border-amber-500/40 hover:border-amber-400/70 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]"
          >
            {/* Decorative blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center gap-4 w-full">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ChevronLeft className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-amber-400/70 text-sm font-medium mb-1">Nội dung trước</div>
                <div className="text-amber-100 font-bold text-lg truncate group-hover:text-amber-50 transition-colors">
                  {previousContent.number}. {previousContent.name}
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}

        {/* Next Button */}
        {nextContent ? (
          <Link
            href={nextContent.path}
            className="group relative flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border-2 border-amber-500/40 hover:border-amber-400/70 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]"
          >
            {/* Decorative blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative flex items-center gap-4 w-full">
              <div className="flex-1 min-w-0 text-right">
                <div className="text-amber-400/70 text-sm font-medium mb-1">Nội dung tiếp theo</div>
                <div className="text-amber-100 font-bold text-lg truncate group-hover:text-amber-50 transition-colors">
                  {nextContent.number}. {nextContent.name}
                </div>
              </div>
              
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
    </div>
  );
}
