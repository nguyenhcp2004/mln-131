import { Building2, Flag } from "lucide-react";
import Subsection from "./Subsection";

interface Subsection {
  subsectionId: string;
  title: string;
  type: string;
  contentBlocks: any[];
}

interface SectionProps {
  sectionId: string;
  sectionTitle: string;
  icon?: string;
  subsections: Subsection[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  government: Building2,
  flag: Flag,
};

export default function Section({ sectionId, sectionTitle, icon, subsections }: SectionProps) {
  const Icon = icon ? iconMap[icon] || Building2 : Building2;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-amber-500/40">
        <div className="p-4 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
          {sectionTitle}
        </h2>
      </div>
      <div className="space-y-4">
        {subsections.map((subsection) => (
          <Subsection
            key={subsection.subsectionId}
            subsectionId={subsection.subsectionId}
            title={subsection.title}
            type={subsection.type}
            contentBlocks={subsection.contentBlocks}
          />
        ))}
      </div>
    </div>
  );
}

