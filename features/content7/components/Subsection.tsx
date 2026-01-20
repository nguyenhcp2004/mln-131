"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ContentBlockRenderer from "./ContentBlockRenderer";

interface ContentBlock {
  type: string;
  [key: string]: any;
}

interface SubsectionProps {
  subsectionId: string;
  title: string;
  type: string;
  contentBlocks: ContentBlock[];
}

export default function Subsection({ subsectionId, title, type, contentBlocks }: SubsectionProps) {
  if (type === "accordion") {
    return (
      <Accordion type="single" collapsible className="w-full mb-6">
        <AccordionItem
          value={subsectionId}
          className="border-none bg-gradient-to-r from-amber-900/40 via-orange-900/40 to-red-900/40 backdrop-blur-md rounded-xl overflow-hidden border border-amber-600/40 shadow-lg"
        >
          <AccordionTrigger className="text-left hover:no-underline hover:bg-amber-800/30 px-6 py-4 transition-all duration-300">
            <h3 className="text-xl font-bold text-amber-100">{title}</h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="px-6 pb-6 space-y-4">
              {contentBlocks.map((block, index) => (
                <ContentBlockRenderer key={index} block={block} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <div className="mb-8 bg-gradient-to-br from-amber-900/40 via-orange-900/40 to-red-900/40 backdrop-blur-md rounded-xl p-6 border border-amber-600/40 shadow-lg">
      <h3 className="text-2xl font-bold text-amber-100 mb-6 pb-4 border-b-2 border-amber-500/40">
        {title}
      </h3>
      <div className="space-y-4">
        {contentBlocks.map((block, index) => (
          <ContentBlockRenderer key={index} block={block} />
        ))}
      </div>
    </div>
  );
}

