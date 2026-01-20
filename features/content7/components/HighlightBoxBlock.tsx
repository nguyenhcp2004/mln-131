import { AlertTriangle } from "lucide-react";

interface HighlightBoxBlockProps {
  title: string;
  items: string[];
}

export default function HighlightBoxBlock({ title, items }: HighlightBoxBlockProps) {
  return (
    <div className="my-6 p-6 bg-gradient-to-br from-red-900/40 via-orange-900/40 to-amber-900/40 backdrop-blur-md rounded-xl border-2 border-red-500/40 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        <h4 className="text-xl font-bold text-red-200">{title}</h4>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 text-amber-100 leading-relaxed"
          >
            <span className="text-red-400 text-lg flex-shrink-0 mt-1">▸</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

