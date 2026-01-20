import { CheckCircle2 } from "lucide-react";

interface ListBlockProps {
    items: string[];
    style?: "check" | "number" | "bullet";
}

export default function ListBlock({ items, style = "check" }: ListBlockProps) {
    return (
        <div className="my-6 space-y-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="flex gap-4 bg-amber-900/30 p-4 rounded-xl border border-amber-500/30 hover:border-amber-400/50 transition-all duration-300"
                >
                    {style === "check" && (
                        <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                    )}
                    {style === "number" && (
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-sm shadow-lg flex-shrink-0">
                            {index + 1}
                        </span>
                    )}
                    {style === "bullet" && (
                        <span className="text-amber-400 text-xl flex-shrink-0 mt-1">✦</span>
                    )}
                    <span className="text-amber-50 leading-relaxed text-base">{item}</span>
                </div>
            ))}
        </div>
    );
}

