import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface NumberedCard {
  number: number;
  title: string;
  content: string;
  quote?: string;
}

interface NumberedCardsBlockProps {
  items: NumberedCard[];
}

export default function NumberedCardsBlock({ items }: NumberedCardsBlockProps) {
  return (
    <div className="space-y-6 my-8">
      {items.map((item, index) => (
        <Card
          key={index}
          className="bg-gradient-to-br from-amber-900/50 via-orange-900/40 to-red-900/50 backdrop-blur-md border-2 border-amber-500/40 shadow-xl hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500"></div>
          <CardHeader className="relative">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-lg shadow-lg">
                {item.number}
              </div>
              <CardTitle className="text-xl font-bold text-amber-100">
                {item.title}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <p className="text-amber-50 leading-relaxed text-base">
              {item.content}
            </p>
            {item.quote && (
              <div className="mt-4 p-4 bg-gradient-to-r from-amber-900/60 to-orange-900/60 rounded-xl border-l-4 border-amber-400">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                  <p className="text-amber-100 italic text-sm leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

