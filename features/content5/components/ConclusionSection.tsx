import { BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

interface ConclusionSectionProps {
  data: {
    title: string;
    content: string;
    keyPoints: string[];
  };
}

export default function ConclusionSection({ data }: ConclusionSectionProps) {
  return (
    <div className="mt-12 mb-8">
      <div className="relative bg-gradient-to-br from-amber-900/60 via-orange-900/50 to-red-900/60 backdrop-blur-xl p-10 rounded-3xl border-4 border-amber-500/50 shadow-2xl overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-amber-400 to-amber-600 rounded-full"></div>
            <div className="p-4 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-2xl shadow-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-red-300">
              {data.title}
            </h2>
            <div className="p-4 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-2xl shadow-xl">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="h-1 w-16 bg-gradient-to-r from-red-600 via-orange-400 to-transparent rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-400/40 shadow-xl mb-6">
            <p className="text-amber-50 text-xl leading-relaxed text-center font-medium">
              {data.content}
            </p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.keyPoints.map((point, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-amber-950/80 via-orange-950/80 to-red-950/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-amber-500/40 shadow-lg hover:border-amber-400/60 hover:shadow-amber-500/30 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-all duration-300"></div>
                <div className="relative flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <p className="text-amber-100 leading-relaxed font-medium">{point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
