import { BookOpen, CheckCircle2, Award, AlertCircle, Sparkles, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SupremacySectionProps {
  data: {
    introduction: string;
    legislation: {
      title: string;
      description: string;
      achievements: {
        role: string;
        constitutions: Array<{ year: string; role: string }>;
        statistics: {
          laws: number;
          decrees: number;
          stateOrganizationDecrees: number;
          otherDocuments: string;
        };
        context: string;
      };
    };
    implementation: {
      title: string;
      aspects: Array<{
        id: number;
        title: string;
        quote?: string;
        author?: string;
        description?: string;
        actions?: string[];
        requirements?: string[];
        criticism?: string;
        supervision?: string;
        exemplary?: {
          quote: string;
          author: string;
          target: string;
        };
        hoChiMinhExample?: string;
      }>;
    };
  };
}

export default function SupremacySection({ data }: SupremacySectionProps) {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="relative bg-gradient-to-br from-amber-900/50 via-orange-900/40 to-red-900/50 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-500/40 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
        <div className="relative flex items-start gap-4">
          <Scale className="w-7 h-7 text-amber-400 flex-shrink-0 mt-1 animate-pulse" />
          <p className="text-amber-50 leading-relaxed text-lg">{data.introduction}</p>
        </div>
      </div>

      {/* Legislation */}
      <div className="relative bg-gradient-to-br from-stone-900/90 via-amber-950/90 to-orange-950/90 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-400/50 shadow-2xl overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
              {data.legislation.title}
            </h3>
          </div>

          <p className="text-amber-50 mb-8 text-lg leading-relaxed">{data.legislation.description}</p>

          <div className="space-y-6">
            <div>
              <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-none px-4 py-2 text-sm shadow-lg mb-4">
                {data.legislation.achievements.role}
              </Badge>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {data.legislation.achievements.constitutions.map((item, index) => (
                  <div key={index} className="bg-gradient-to-br from-amber-900/60 to-orange-900/60 p-5 rounded-xl border border-amber-500/40 hover:border-amber-400/60 transition-all duration-300">
                    <p className="font-bold text-amber-300 text-xl mb-2">Năm {item.year}</p>
                    <p className="text-amber-50 text-sm leading-relaxed">{item.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900/60 to-red-900/60 p-8 rounded-2xl border-2 border-orange-400/50 shadow-xl">
              <h4 className="font-bold text-orange-200 mb-6 text-2xl flex items-center gap-3">
                <Award className="w-7 h-7 text-orange-400" />
                Thành tựu lập pháp:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center bg-orange-900/50 p-6 rounded-xl border border-orange-500/40">
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-orange-400 mb-2">
                    {data.legislation.achievements.statistics.laws}
                  </div>
                  <div className="text-sm text-orange-200 font-semibold">Đạo luật</div>
                </div>
                <div className="text-center bg-orange-900/50 p-6 rounded-xl border border-orange-500/40">
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-300 to-orange-400 mb-2">
                    {data.legislation.achievements.statistics.decrees}
                  </div>
                  <div className="text-sm text-orange-200 font-semibold">Sắc lệnh</div>
                </div>
                <div className="text-center bg-orange-900/50 p-6 rounded-xl border border-orange-500/40">
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-300 to-red-400 mb-2">
                    {data.legislation.achievements.statistics.stateOrganizationDecrees}
                  </div>
                  <div className="text-sm text-orange-200 font-semibold">Sắc lệnh tổ chức NN</div>
                </div>
                <div className="text-center bg-orange-900/50 p-6 rounded-xl border border-orange-500/40 flex items-center justify-center">
                  <div className="text-lg font-bold text-orange-300">+ {data.legislation.achievements.statistics.otherDocuments}</div>
                </div>
              </div>
            </div>

            <p className="text-amber-200 italic text-sm bg-amber-900/30 p-4 rounded-xl border border-amber-500/30">
              {data.legislation.achievements.context}
            </p>
          </div>
        </div>
      </div>

      {/* Implementation */}
      <div className="relative bg-gradient-to-br from-red-950/90 via-orange-950/90 to-amber-950/90 backdrop-blur-md p-8 rounded-2xl border-2 border-red-400/50 shadow-2xl overflow-hidden">
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl shadow-lg">
              <Award className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-300">
              {data.implementation.title}
            </h3>
          </div>

          <div className="space-y-8">
            {data.implementation.aspects.map((aspect, index) => (
              <div key={aspect.id}>
                {index > 0 && <Separator className="my-8 bg-red-500/40" />}

                <div className="space-y-5 bg-red-900/30 p-6 rounded-2xl border border-red-500/40">
                  <h4 className="text-2xl font-bold text-red-200 flex items-center gap-3">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-orange-600 text-white text-lg font-bold shadow-lg">
                      {aspect.id}
                    </span>
                    {aspect.title}
                  </h4>

                  {aspect.quote && (
                    <div className="bg-gradient-to-r from-red-900/70 to-orange-900/70 p-6 rounded-xl border-l-4 border-red-400 shadow-lg">
                      <p className="text-red-50 italic mb-3 text-lg leading-relaxed">"{aspect.quote}"</p>
                      {aspect.author && (
                        <p className="text-sm text-red-300 font-bold flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          {aspect.author}
                        </p>
                      )}
                    </div>
                  )}

                  {aspect.description && (
                    <p className="text-red-50 leading-relaxed text-lg">{aspect.description}</p>
                  )}

                  {aspect.actions && (
                    <ul className="space-y-3">
                      {aspect.actions.map((action, idx) => (
                        <li key={idx} className="flex gap-3 bg-red-900/40 p-4 rounded-xl border border-red-500/30">
                          <CheckCircle2 className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                          <span className="text-red-50 leading-relaxed">{action}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {aspect.requirements && (
                    <div className="bg-orange-900/40 p-5 rounded-xl border border-orange-500/40">
                      <h5 className="font-bold text-orange-200 mb-4 text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-orange-400" />
                        Yêu cầu:
                      </h5>
                      <ul className="space-y-3">
                        {aspect.requirements.map((req, idx) => (
                          <li key={idx} className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                            <span className="text-orange-50 leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {aspect.criticism && (
                    <div className="bg-gradient-to-r from-red-900/60 to-orange-900/60 p-5 rounded-xl border-l-4 border-red-500 flex gap-4 shadow-lg">
                      <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                      <p className="text-red-50 leading-relaxed">{aspect.criticism}</p>
                    </div>
                  )}

                  {aspect.supervision && (
                    <p className="text-red-50 leading-relaxed bg-red-900/40 p-4 rounded-xl border border-red-500/30">
                      {aspect.supervision}
                    </p>
                  )}

                  {aspect.exemplary && (
                    <div className="bg-gradient-to-r from-amber-900/70 to-orange-900/70 p-6 rounded-xl border-l-4 border-amber-400 shadow-lg">
                      <p className="text-amber-50 italic mb-3 text-lg leading-relaxed">"{aspect.exemplary.quote}"</p>
                      <p className="text-sm text-amber-300 font-bold mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        {aspect.exemplary.author}
                      </p>
                      <p className="text-sm text-amber-200 italic bg-amber-900/40 p-3 rounded-lg">
                        Đối tượng: {aspect.exemplary.target}
                      </p>
                    </div>
                  )}

                  {aspect.hoChiMinhExample && (
                    <div className="bg-gradient-to-r from-orange-900/60 to-red-900/60 p-6 rounded-xl border-2 border-orange-400/50 shadow-lg">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                        <p className="text-orange-50 leading-relaxed text-lg">{aspect.hoChiMinhExample}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
