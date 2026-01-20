import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Scale, Users } from "lucide-react";
import { Quote } from "lucide-react";

interface Card {
  title: string;
  icon?: string;
  content: string;
  quote?: string;
}

interface CardsBlockProps {
  cards: Card[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  party: Building2,
  "balance-scale": Scale,
  people: Users,
};

export default function CardsBlock({ cards }: CardsBlockProps) {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 my-8">
      {cards.map((card, index) => {
        const Icon = card.icon ? iconMap[card.icon] || Building2 : Building2;
        return (
          <Card
            key={index}
            className="bg-gradient-to-br from-amber-900/50 via-orange-900/40 to-red-900/50 backdrop-blur-md border-2 border-amber-500/40 shadow-xl hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
            <CardHeader className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-amber-100">
                  {card.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="text-amber-50 leading-relaxed text-base">
                {card.content}
              </p>
              {card.quote && (
                <div className="mt-4 p-4 bg-gradient-to-r from-amber-900/60 to-orange-900/60 rounded-xl border-l-4 border-amber-400">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                    <p className="text-amber-100 italic text-sm leading-relaxed">
                      &ldquo;{card.quote}&rdquo;
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

