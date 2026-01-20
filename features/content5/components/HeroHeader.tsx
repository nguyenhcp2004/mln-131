import { Sparkles } from "lucide-react";

interface HeroHeaderProps {
  title: string;
  subtitle: string;
}

export default function HeroHeader({ title, subtitle }: HeroHeaderProps) {
  return (
    <div className="text-center mb-16">
      <div className="inline-block mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-1 h-16 bg-gradient-to-b from-amber-500 via-orange-500 to-red-500 rounded-full"></div>
          <Sparkles className="w-12 h-12 text-amber-400 animate-pulse" />
          <div className="w-1 h-16 bg-gradient-to-b from-red-500 via-orange-500 to-amber-500 rounded-full"></div>
        </div>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 leading-tight">
        {title}
      </h1>
      
      <p className="text-xl md:text-2xl text-amber-200/90 max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
      
      <div className="mt-8 flex justify-center gap-2">
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full"></div>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full"></div>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}
