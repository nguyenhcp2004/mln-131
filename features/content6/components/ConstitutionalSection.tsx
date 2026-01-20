import { Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ConstitutionalSectionProps {
  data: {
    introduction: string;
    historicalDemand: {
      title: string;
      event: string;
      year: string;
      demands: string[];
    };
    foundingActions: {
      title: string;
      date: string;
      context: string;
      proposal: {
        quote: string;
        author: string;
        purpose: string[];
      };
    };
    historicElection: {
      title: string;
      date: string;
      characteristics: string[];
      significance: string[];
      outcome: {
        date: string;
        event: string;
        result: string;
        legitimacy: string;
      };
    };
  };
}

export default function ConstitutionalSection({ data }: ConstitutionalSectionProps) {
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

      {/* Historical Demand */}
      <div className="relative bg-gradient-to-br from-stone-900/90 via-amber-950/90 to-orange-950/90 backdrop-blur-md p-8 rounded-2xl border-2 border-amber-400/50 shadow-2xl overflow-hidden group hover:border-amber-400/70 transition-all duration-300">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all duration-500"></div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
              {data.historicalDemand.title}
            </h3>
          </div>

          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white border-none px-4 py-2 text-sm shadow-lg">
              {data.historicalDemand.event} - {data.historicalDemand.year}
            </Badge>
          </div>

          <ul className="space-y-4">
            {data.historicalDemand.demands.map((demand, index) => (
              <li key={index} className="flex gap-4 bg-amber-900/30 p-4 rounded-xl border border-amber-500/30 hover:border-amber-400/50 transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <span className="text-amber-50 leading-relaxed">{demand}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Founding Actions */}
      <div className="relative bg-gradient-to-br from-orange-950/90 via-red-950/90 to-amber-950/90 backdrop-blur-md p-8 rounded-2xl border-2 border-orange-400/50 shadow-2xl overflow-hidden">
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>

        <div className="relative">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300 mb-6">
            {data.foundingActions.title}
          </h3>

          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white border-none px-4 py-2 text-sm shadow-lg">
              {data.foundingActions.date}
            </Badge>
          </div>

          <p className="text-orange-100 mb-6 italic text-lg bg-orange-900/30 p-4 rounded-xl border border-orange-500/30">
            {data.foundingActions.context}
          </p>

          <div className="bg-gradient-to-r from-amber-900/60 to-orange-900/60 p-6 rounded-2xl border-l-4 border-amber-400 mb-6 shadow-xl">
            <p className="text-amber-50 italic mb-4 text-lg leading-relaxed">"{data.foundingActions.proposal.quote}"</p>
            <p className="text-sm text-amber-300 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {data.foundingActions.proposal.author}
            </p>
          </div>

          <div className="mt-6">
            <h4 className="font-bold text-orange-200 mb-4 text-xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-orange-400" />
              Mục đích:
            </h4>
            <ul className="space-y-3">
              {data.foundingActions.proposal.purpose.map((item, index) => (
                <li key={index} className="flex gap-4 bg-orange-900/30 p-4 rounded-xl border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300">
                  <CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <span className="text-orange-50 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Historic Election */}
      <div className="relative bg-gradient-to-br from-red-950/90 via-amber-950/90 to-orange-950/90 backdrop-blur-md p-8 rounded-2xl border-2 border-red-400/50 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>

        <div className="relative">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-amber-300 mb-6">
            {data.historicElection.title}
          </h3>

          <div className="mb-6">
            <Badge className="bg-gradient-to-r from-red-600 to-amber-600 text-white border-none px-4 py-2 text-sm shadow-lg">
              {data.historicElection.date}
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-900/40 p-6 rounded-2xl border border-red-500/40">
              <h4 className="font-bold text-red-200 mb-4 text-xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-red-400" />
                Đặc điểm:
              </h4>
              <ul className="space-y-3">
                {data.historicElection.characteristics.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                    <span className="text-red-50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-900/40 p-6 rounded-2xl border border-amber-500/40">
              <h4 className="font-bold text-amber-200 mb-4 text-xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-400" />
                Ý nghĩa:
              </h4>
              <ul className="space-y-3">
                {data.historicElection.significance.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                    <span className="text-amber-50">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-900/60 to-amber-900/60 p-6 rounded-2xl border-2 border-red-400/40 shadow-xl">
            <h4 className="font-bold text-red-200 mb-4 text-xl flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-red-400" />
              Kết quả:
            </h4>
            <p className="text-red-50 mb-3 leading-relaxed">
              <span className="font-bold text-red-300">{data.historicElection.outcome.date}:</span> {data.historicElection.outcome.event}
            </p>
            <p className="text-red-50 mb-3 leading-relaxed">{data.historicElection.outcome.result}</p>
            <p className="text-red-50 italic leading-relaxed bg-red-900/30 p-4 rounded-xl border border-red-500/30">
              {data.historicElection.outcome.legitimacy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
