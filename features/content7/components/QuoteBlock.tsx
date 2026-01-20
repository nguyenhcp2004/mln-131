import { Quote, Star } from "lucide-react";

interface QuoteBlockProps {
  content: string;
  author?: string;
}

export default function QuoteBlock({ content, author }: QuoteBlockProps) {
  return (
    <div className="my-6 p-8 bg-gradient-to-r from-orange-900/30 via-red-900/30 to-rose-900/30 backdrop-blur-md border-l-4 border-amber-500 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-start gap-4">
        <Quote className="w-10 h-10 text-amber-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-2xl italic mb-4 text-amber-50 font-semibold leading-relaxed">
            &ldquo;{content}&rdquo;
          </p>
          {author && (
            <p className="text-base text-amber-300 font-medium flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              {author}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

