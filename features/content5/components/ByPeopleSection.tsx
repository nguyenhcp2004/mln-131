import { Users, CheckCircle2, Sparkles, ShieldCheck, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ByPeopleSectionProps {
  data: {
    introduction: string;
    principles: Array<{
      title: string;
      description: string;
      points: string[];
      highlight?: {
        date: string;
        event: string;
        significance: string;
      };
    }>;
  };
}

export default function ByPeopleSection({ data }: ByPeopleSectionProps) {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="relative bg-gradient-to-br from-amber-900/50 via-orange-900/40 to-red-900/50 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-500/40 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
        <div className="relative flex items-start gap-4">
          <Sparkles className="w-7 h-7 text-amber-400 flex-shrink-0 mt-1 animate-pulse" />
          <p className="text-amber-50 leading-relaxed text-lg">{data.introduction}</p>
        </div>
      </div>

      {/* Principles */}
      {data.principles.map((principle, index) => (
        <div
          key={index}
          className="relative bg-gradient-to-br from-stone-900/90 via-amber-950/90 to-orange-950/90 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-400/50 shadow-2xl overflow-hidden group hover:border-amber-400/70 transition-all duration-300"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all duration-500"></div>

          <div className="relative">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                {principle.title}
              </h3>
            </div>

            <ul className="space-y-4">
              {principle.points.map((point, idx) => (
                <li key={idx} className="flex gap-4 bg-amber-900/30 p-4 rounded-xl border border-amber-500/30 hover:border-amber-400/50 transition-all duration-300">
                  <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <span className="text-amber-50 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Highlight Section */}
            {principle.highlight && (
              <div className="mt-6 bg-gradient-to-r from-amber-900/60 to-orange-900/60 p-6 rounded-2xl border-l-4 border-amber-400 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-none px-4 py-2 text-sm shadow-lg">
                    {principle.highlight.date}
                  </Badge>
                  <h4 className="text-xl font-bold text-amber-200">{principle.highlight.event}</h4>
                </div>
                <p className="text-amber-50 leading-relaxed">
                  {principle.highlight.significance}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
