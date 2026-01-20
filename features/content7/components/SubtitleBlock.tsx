import { Award } from "lucide-react";

interface SubtitleBlockProps {
  text: string;
}

export default function SubtitleBlock({ text }: SubtitleBlockProps) {
  return (
    <div className="my-8">
      <h3 className="text-2xl md:text-3xl font-bold text-amber-200 flex items-center gap-3 pb-4 border-b-2 border-amber-500/40">
        <Award className="w-8 h-8 text-amber-400" />
        {text}
      </h3>
    </div>
  );
}

