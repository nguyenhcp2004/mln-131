import { Sparkles } from "lucide-react";

interface ParagraphBlockProps {
  content: string;
}

export default function ParagraphBlock({ content }: ParagraphBlockProps) {
  return (
    <div className="mb-6 p-6 bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-yellow-900/40 backdrop-blur-md rounded-xl border border-amber-600/40 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-3">
        <Sparkles className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
        <p className="text-lg leading-relaxed text-amber-50 font-medium">{content}</p>
      </div>
    </div>
  );
}

