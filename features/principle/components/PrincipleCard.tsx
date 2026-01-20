"use client";

import Card from "@/components/Card";

interface PrinciplePoint {
  label: string;
  content: string;
}

interface PrincipleCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  points: PrinciplePoint[];
  index: number;
  isLast: boolean;
}

const PrincipleCard = ({
  number,
  title,
  subtitle,
  description,
  points,
  index,
  isLast,
}: PrincipleCardProps) => {
  return (
    <div className="relative">
      {/* Connecting line between cards */}
      {!isLast && (
        <div className="absolute left-8 top-full h-16 w-px bg-gradient-to-b from-amber-500/50 to-transparent" />
      )}

      <Card
        variant="list"
        delay={index * 0.15}
        className="!bg-black/35 relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Principle Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-xl" />

              {/* Badge */}
              <div className="relative w-20 h-20 rounded-xl bg-gradient-to-br from-amber-600/40 to-amber-800/40 border-2 border-amber-500/50 flex items-center justify-center shadow-lg shadow-amber-900/50">
                <span className="text-3xl font-bold text-amber-300">
                  {number}
                </span>
              </div>
            </div>

            <div className="flex-1 pt-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 mb-3 leading-tight">
                {title}
              </h2>
              <div className="inline-block px-4 py-1.5 rounded-full bg-amber-900/30 border border-amber-700/30">
                <p className="text-amber-300/90 text-base sm:text-lg italic">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-8" />

          {/* Description */}
          <div className="mb-8 pl-26">
            <p className="text-amber-200/90 text-base sm:text-lg leading-relaxed">
              {description}
            </p>
          </div>

          {/* Points */}
          <div className="space-y-5 pl-26">
            {points.map((point, idx) => (
              <div key={idx} className="group relative">
                {/* Accent line with dot */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500/60 mt-2 group-hover:bg-amber-400 transition-colors" />
                  <div className="flex-1 w-px bg-gradient-to-b from-amber-500/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="pl-6 py-3 rounded-lg group-hover:bg-amber-900/10 transition-colors">
                  <h3 className="text-amber-200 font-semibold mb-2.5 text-base sm:text-lg">
                    {point.label}
                  </h3>
                  <p className="text-amber-200/70 text-sm sm:text-base leading-relaxed">
                    {point.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PrincipleCard;
