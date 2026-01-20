import { Heart, Users, CheckCircle2, Sparkles, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface HumanisticSectionProps {
  data: {
    definition: string;
    humanRights: {
      title: string;
      approach: string;
      categories: Array<{
        id: number;
        title: string;
        description: string;
        icon: string;
      }>;
      revolutionaryGoal: string;
      constitutionalRecognition: string;
    };
    humanisticLaw: {
      title: string;
      abolishment: string;
      characteristics: Array<{
        id: number;
        title: string;
        description: string;
        quote?: string;
        author?: string;
      }>;
      essence: string;
    };
  };
}

export default function HumanisticSection({ data }: HumanisticSectionProps) {
  return (
    <div className="space-y-8">
      {/* Definition */}
      <div className="relative bg-gradient-to-br from-rose-900/50 via-red-900/40 to-orange-900/50 backdrop-blur-md p-8 rounded-2xl border-2 border-rose-500/40 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
        <div className="relative flex items-start gap-4">
          <Heart className="w-8 h-8 text-rose-400 flex-shrink-0 mt-1 animate-pulse" />
          <p className="text-rose-50 leading-relaxed text-xl font-semibold">{data.definition}</p>
        </div>
      </div>

      {/* Human Rights */}
      <div className="relative bg-gradient-to-br from-stone-900/90 via-red-950/90 to-orange-950/90 backdrop-blur-md p-8 rounded-2xl border-2 border-red-400/50 shadow-2xl overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-rose-300">
              {data.humanRights.title}
            </h3>
          </div>

          <p className="text-red-50 mb-8 text-lg leading-relaxed bg-red-900/40 p-5 rounded-xl border border-red-500/30">
            {data.humanRights.approach}
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {data.humanRights.categories.map((category) => (
              <div
                key={category.id}
                className="relative bg-gradient-to-br from-red-900/70 to-rose-900/70 p-6 rounded-2xl border-2 border-red-400/40 hover:border-red-400/70 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/20 rounded-full blur-2xl group-hover:bg-red-500/30 transition-all duration-500"></div>

                <div className="relative flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 text-white flex-shrink-0 shadow-lg">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-red-200 mb-2 text-lg">{category.title}</h4>
                    <p className="text-sm text-red-50 leading-relaxed">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="bg-gradient-to-r from-red-900/70 to-orange-900/70 p-6 rounded-2xl border-l-4 border-red-400 shadow-xl">
              <div className="flex items-start gap-4">
                <Sparkles className="w-7 h-7 text-red-400 flex-shrink-0 mt-1 animate-pulse" />
                <p className="text-red-50 leading-relaxed text-lg">{data.humanRights.revolutionaryGoal}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/70 to-red-900/70 p-6 rounded-2xl border-2 border-orange-400/50 shadow-xl">
              <div className="flex items-start gap-4">
                <Shield className="w-7 h-7 text-orange-400 flex-shrink-0 mt-1" />
                <p className="text-orange-50 leading-relaxed text-lg">{data.humanRights.constitutionalRecognition}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Humanistic Law */}
      <div className="relative bg-gradient-to-br from-rose-950/90 via-red-950/90 to-orange-950/90 backdrop-blur-md p-8 rounded-2xl border-2 border-rose-400/50 shadow-2xl overflow-hidden">
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-rose-600 to-red-600 rounded-xl shadow-lg">
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-red-300">
              {data.humanisticLaw.title}
            </h3>
          </div>

          <p className="text-rose-50 mb-8 text-lg leading-relaxed bg-rose-900/40 p-5 rounded-xl border border-rose-500/30">
            {data.humanisticLaw.abolishment}
          </p>

          <div className="space-y-8">
            {data.humanisticLaw.characteristics.map((char, index) => (
              <div key={char.id}>
                {index > 0 && <Separator className="my-8 bg-rose-500/40" />}

                <div className="space-y-5 bg-rose-900/30 p-6 rounded-2xl border border-rose-500/40">
                  <h4 className="text-2xl font-bold text-rose-200 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-rose-600 to-red-600 text-white text-lg font-bold shadow-lg">
                      {char.id}
                    </span>
                    {char.title}
                  </h4>

                  <p className="text-rose-50 leading-relaxed text-lg bg-rose-900/40 p-4 rounded-xl border border-rose-500/30">
                    {char.description}
                  </p>

                  {char.quote && (
                    <div className="bg-gradient-to-r from-rose-900/70 to-red-900/70 p-6 rounded-xl border-l-4 border-rose-400 shadow-lg">
                      <p className="text-rose-50 italic mb-3 text-lg leading-relaxed">"{char.quote}"</p>
                      {char.author && (
                        <p className="text-sm text-rose-300 font-bold flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          {char.author}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-8 bg-rose-500/40" />

          <div className="relative bg-gradient-to-r from-rose-900/70 to-red-900/70 p-8 rounded-2xl border-2 border-rose-400/60 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/10 rounded-full blur-2xl"></div>

            <div className="relative flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-rose-400 flex-shrink-0 mt-1 animate-pulse" />
              <p className="text-rose-50 font-bold text-2xl leading-relaxed">{data.humanisticLaw.essence}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
