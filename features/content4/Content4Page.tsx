"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote, Sparkles, Star, Award } from "lucide-react";
import contentData from "./data/nha-nuoc-content.json";
import ContentNavigation from "@/components/ContentNavigation";

interface Content {
  type: string;
  text?: string;
  author?: string;
  title?: string;
  description?: string;
  items?: any[];
}

export default function Content4Page() {
  const [currentSection, setCurrentSection] = useState(0);

  const nextSection = () => {
    if (currentSection < contentData.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const renderContent = (content: Content) => {
    switch (content.type) {
      case "intro":
        return (
          <div className="mb-6 p-6 bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-yellow-900/40 backdrop-blur-md rounded-xl border border-amber-600/40 shadow-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <p className="text-lg leading-relaxed text-amber-50 font-medium">{content.text}</p>
            </div>
          </div>
        );

      case "quote":
        return (
          <div className="my-6 p-8 bg-gradient-to-r from-orange-900/30 via-red-900/30 to-rose-900/30 backdrop-blur-md border-l-4 border-amber-500 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <Quote className="w-10 h-10 text-amber-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-2xl italic mb-4 text-amber-50 font-semibold leading-relaxed">&ldquo;{content.text}&rdquo;</p>
                <p className="text-base text-amber-300 font-medium flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  {content.author}
                </p>
              </div>
            </div>
          </div>
        );

      case "points":
        return (
          <div className="space-y-4">
            {content.title && (
              <h4 className="text-xl font-bold mb-6 text-amber-200 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                {content.title}
              </h4>
            )}
            <Accordion type="single" collapsible className="w-full space-y-3">
              {content.items?.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-none bg-gradient-to-r from-amber-900/40 via-orange-900/40 to-red-900/40 backdrop-blur-md rounded-xl overflow-hidden border border-amber-600/40">
                  <AccordionTrigger className="text-left hover:no-underline hover:bg-amber-800/30 px-6 py-4 transition-all duration-300">
                    <div className="text-amber-50 flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold text-sm shadow-lg">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-bold text-amber-400">{item.number}:</span>{" "}
                        <span className="font-semibold text-lg">{item.title}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-6 pb-4 space-y-3 bg-gradient-to-br from-orange-950/60 to-red-950/60 backdrop-blur-sm rounded-lg mx-4 p-5 border border-amber-700/30">
                      <p className="text-amber-100 italic text-base leading-relaxed">{item.description}</p>
                      {item.details && (
                        <ul className="space-y-3 mt-4">
                          {item.details.map((detail: string, detailIdx: number) => (
                            <li key={detailIdx} className="text-sm text-amber-200/90 flex items-start gap-3">
                              <span className="text-amber-400 text-lg flex-shrink-0">▸</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        );

      case "subsection":
        return (
          <div className="mb-4 bg-gradient-to-br from-yellow-900/40 to-amber-900/40 backdrop-blur-md rounded-xl p-6 border border-yellow-700/40 shadow-lg transition-all duration-300">
            <h4 className="text-xl font-bold text-amber-200 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              {content.title}
            </h4>
            <p className="text-amber-100 text-base leading-relaxed">{content.description}</p>
          </div>
        );

      case "principles":
        return (
          <div className="space-y-6">
            {content.items?.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-red-900/40 via-orange-900/40 to-amber-900/40 backdrop-blur-md rounded-xl p-6 border-l-4 border-l-amber-500 border border-amber-600/40 shadow-xl transition-all duration-300">
                <h4 className="text-xl font-bold text-amber-200 mb-5 flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  {item.title}
                </h4>
                <div className="space-y-5">
                  {item.quotes?.map((quote: any, qIdx: number) => (
                    <div key={qIdx} className="p-5 bg-gradient-to-r from-orange-950/60 to-red-950/60 backdrop-blur-sm rounded-xl border border-amber-700/40 shadow-lg">
                      <Quote className="w-7 h-7 text-amber-400 mb-3" />
                      <p className="italic mb-3 text-amber-50 text-lg leading-relaxed">&ldquo;{quote.text}&rdquo;</p>
                      <p className="text-sm text-amber-300 font-medium flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {quote.author}
                      </p>
                    </div>
                  ))}
                  {item.keyPoints && (
                    <div className="mt-5 p-5 bg-gradient-to-br from-amber-950/60 to-orange-950/60 rounded-xl border border-amber-700/30">
                      <p className="font-bold mb-4 text-amber-300 text-lg flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        Điểm chính:
                      </p>
                      <ul className="space-y-3">
                        {item.keyPoints.map((point: string, pIdx: number) => (
                          <li key={pIdx} className="text-base text-amber-100 flex items-start gap-3">
                            <span className="text-amber-400 text-xl flex-shrink-0">✦</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const currentSectionData = contentData.sections[currentSection];

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-amber-900/50 via-orange-900/50 to-red-900/50 backdrop-blur-xl rounded-2xl p-10 border-2 border-amber-600/50 shadow-2xl">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Star className="w-8 h-8 text-amber-400" />
            <Award className="w-10 h-10 text-amber-400" />
            <Star className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-5xl font-extrabold text-amber-100 text-center leading-relaxed drop-shadow-lg">
            {contentData.title}
          </h1>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={currentSection.toString()} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 h-auto bg-gradient-to-r from-amber-900/50 via-orange-900/50 to-red-900/50 backdrop-blur-xl border-2 border-amber-600/50 p-3 rounded-xl shadow-xl">
            {contentData.sections.map((section, idx) => (
              <TabsTrigger
                key={section.id}
                value={idx.toString()}
                onClick={() => setCurrentSection(idx)}
                className="text-xs sm:text-sm py-4 px-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-amber-200/70 hover:text-amber-100 hover:bg-amber-800/30 transition-all duration-300 rounded-lg"
              >
                <div className="text-left">
                  <div className="font-bold flex items-center gap-2">
                    <span className="text-amber-400">✦</span>
                    Phần {idx + 1}
                  </div>
                  <div className="text-xs opacity-80 hidden sm:block mt-1">
                    {section.title.split(".")[1]?.substring(0, 30)}...
                  </div>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Content */}
        <div className="mb-8 bg-gradient-to-br from-stone-900/70 via-amber-950/70 to-stone-900/70 backdrop-blur-xl rounded-2xl p-10 border-2 border-amber-700/50 shadow-2xl">
          <div className="mb-8 pb-6 border-b-2 border-amber-700/50">
            <h2 className="text-4xl font-extrabold text-amber-100 mb-4 flex items-center gap-3 drop-shadow-lg">
              <Award className="w-10 h-10 text-amber-400" />
              {currentSectionData.title}
            </h2>
            <p className="text-2xl text-amber-300 font-semibold">
              {currentSectionData.subtitle}
            </p>
          </div>
          <div className="space-y-8">
            {currentSectionData.content.map((content, idx) => (
              <div key={idx}>{renderContent(content)}</div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center bg-gradient-to-r from-amber-900/50 via-orange-900/50 to-red-900/50 backdrop-blur-xl rounded-xl p-8 border-2 border-amber-600/50 shadow-xl">
          <Button
            onClick={prevSection}
            disabled={currentSection === 0}
            variant="outline"
            size="lg"
            className="bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-600 hover:to-orange-600 text-white border-none disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-base px-6 py-6"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Phần trước
          </Button>

          <div className="text-xl font-bold text-amber-100 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-400" />
            Phần {currentSection + 1} / {contentData.sections.length}
            <Star className="w-6 h-6 text-amber-400" />
          </div>

          <Button
            onClick={nextSection}
            disabled={currentSection === contentData.sections.length - 1}
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white border-none disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 font-bold text-base px-6 py-6"
          >
            Phần tiếp theo
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Content Navigation */}
        <ContentNavigation />
      </div>
    </div>
  );
}
