import { Heart, CheckCircle2, Sparkles, ShieldCheck, AlertTriangle } from "lucide-react";

interface ForPeopleSectionProps {
  data: {
    introduction: string;
    principles: Array<{
      title: string;
      description: string;
      points: string[];
      quote?: {
        text: string;
        author: string;
      };
      ethics?: string[];
      warning?: {
        text: string;
        consequences: string[];
      };
    }>;
  };
}

export default function ForPeopleSection({ data }: ForPeopleSectionProps) {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="relative bg-gradient-to-br from-red-900/50 via-orange-900/40 to-amber-900/50 backdrop-blur-md p-8 rounded-2xl border-2 border-red-500/40 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl"></div>
        <div className="relative flex items-start gap-4">
          <Heart className="w-7 h-7 text-red-400 flex-shrink-0 mt-1 animate-pulse" />
          <p className="text-red-50 leading-relaxed text-lg">{data.introduction}</p>
        </div>
      </div>

      {/* Principles */}
      {data.principles.map((principle, index) => (
        <div
          key={index}
          className="relative bg-gradient-to-br from-red-950/90 via-orange-950/90 to-amber-950/90 backdrop-blur-md p-8 rounded-2xl border-2 border-red-400/50 shadow-2xl overflow-hidden group hover:border-red-400/70 transition-all duration-300"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl group-hover:bg-red-500/30 transition-all duration-500"></div>

          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-300">
                {principle.title}
              </h3>
            </div>

            <ul className="space-y-4 mb-6">
              {principle.points.map((point, idx) => (
                <li key={idx} className="flex gap-4 bg-red-900/30 p-4 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
                  <CheckCircle2 className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <span className="text-red-50 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Quote Section */}
            {principle.quote && (
              <div className="bg-gradient-to-r from-red-900/60 to-orange-900/60 p-6 rounded-2xl border-l-4 border-red-400 shadow-xl">
                <p className="text-red-50 italic mb-4 text-lg leading-relaxed">"{principle.quote.text}"</p>
                <p className="text-sm text-red-300 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {principle.quote.author}
                </p>
              </div>
            )}

            {/* Ethics Tags */}
            {principle.ethics && (
              <div className="mt-6">
                <h4 className="font-bold text-red-200 mb-4 text-xl flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-red-400" />
                  Đạo đức công vụ:
                </h4>
                <div className="flex flex-wrap gap-3">
                  {principle.ethics.map((ethic, idx) => (
                    <div
                      key={idx}
                      className="px-5 py-3 bg-gradient-to-r from-red-600/80 to-orange-600/80 text-white rounded-xl font-bold shadow-lg border-2 border-red-400/50 hover:scale-105 transition-transform duration-300"
                    >
                      {ethic}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warning Section */}
            {principle.warning && (
              <div className="mt-6 bg-gradient-to-br from-red-950/80 to-orange-950/80 p-6 rounded-2xl border-2 border-red-500/50 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-7 h-7 text-red-400" />
                  <h4 className="text-xl font-bold text-red-200">{principle.warning.text}</h4>
                </div>
                <div className="space-y-3">
                  {principle.warning.consequences.map((consequence, idx) => (
                    <div key={idx} className="flex gap-3 bg-red-900/40 p-4 rounded-xl border border-red-500/40">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                      <span className="text-red-100">{consequence}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
