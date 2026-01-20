import { Star, Award } from "lucide-react";

interface HeroHeaderProps {
    title: string;
}

export default function HeroHeader({ title }: HeroHeaderProps) {
    return (
        <div className="mb-12 bg-gradient-to-r from-amber-900/50 via-orange-900/50 to-red-900/50 backdrop-blur-xl rounded-2xl p-10 border-2 border-amber-600/50 shadow-2xl">
            <div className="flex items-center justify-center gap-4 mb-4">
                <Star className="w-8 h-8 text-amber-400" />
                <Award className="w-10 h-10 text-amber-400" />
                <Star className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-amber-100 text-center leading-relaxed drop-shadow-lg">
                {title}
            </h1>
        </div>
    );
}

