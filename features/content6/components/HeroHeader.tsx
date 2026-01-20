import { Shield, Scale, Sparkles } from "lucide-react";

interface HeroHeaderProps {
  title: string;
  subtitle: string;
}

export default function HeroHeader({ title, subtitle }: HeroHeaderProps) {
  return (
    <div className="relative mb-16 animate-slideUp">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-orange-900/20 to-red-900/20 rounded-3xl blur-3xl -z-10"></div>

      <div className="relative bg-gradient-to-br from-amber-950/95 via-orange-950/95 to-red-950/95 rounded-3xl p-12 border-2 border-amber-500/40 shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* Icon arrangement */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="relative">
              <Shield className="w-16 h-16 text-amber-400 animate-pulse" />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
            </div>
            <div className="relative">
              <Scale className="w-24 h-24 text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
            </div>
            <div className="relative">
              <Shield className="w-16 h-16 text-orange-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -left-2 animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-orange-200 mb-6 text-center leading-tight drop-shadow-lg">
            {title}
          </h1>

          {/* Subtitle with decorative line */}
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            <p className="text-xl md:text-2xl text-amber-100 text-center px-6 py-3 bg-amber-900/40 rounded-full border border-amber-400/40 backdrop-blur-sm">
              {subtitle}
            </p>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
