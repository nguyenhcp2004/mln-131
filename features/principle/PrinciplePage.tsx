"use client";

import PrincipleHeader from "./components/PrincipleHeader";
import PrincipleCard from "./components/PrincipleCard";
import { PRINCIPLES_DATA } from "./constants/principles";
import ContentNavigation from "@/components/ContentNavigation";

const PrinciplePage = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <PrincipleHeader />

        {/* Principles */}
        <div className="space-y-16">
          {PRINCIPLES_DATA.map((principle, index) => (
            <PrincipleCard
              key={principle.number}
              {...principle}
              index={index}
              isLast={index === PRINCIPLES_DATA.length - 1}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-4 mt-20">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-500/50" />
          <div className="w-3 h-3 rounded-full bg-amber-500/60" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        {/* Content Navigation */}
        <ContentNavigation />
      </div>
    </div>
  );
};

export default PrinciplePage;
