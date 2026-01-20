"use client";

import { useState } from "react";
import contentData from "./data/content.json";
import { Users, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroHeader from "./components/HeroHeader";
import ByPeopleSection from "./components/ByPeopleSection";
import ForPeopleSection from "./components/ForPeopleSection";
import ConclusionSection from "./components/ConclusionSection";
import ContentNavigation from "@/components/ContentNavigation";

const iconMap = {
  users: Users,
  heart: Heart,
};

export default function Content5Page() {
  const [activeTab, setActiveTab] = useState("by-people");

  const sections = contentData.sections;
  const byPeopleData = sections.find(s => s.id === "by-people") as any;
  const forPeopleData = sections.find(s => s.id === "for-people") as any;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <HeroHeader
            title={contentData.title}
            subtitle={contentData.subtitle}
          />

          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 h-auto gap-4 bg-gradient-to-r from-amber-950/90 via-orange-950/90 to-red-950/90 backdrop-blur-xl p-4 rounded-2xl border-2 border-amber-500/40 shadow-2xl mb-10">
              {sections.map((section) => {
                const Icon = iconMap[section.icon as keyof typeof iconMap];
                return (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex items-center justify-center gap-3 py-4 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:via-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_30px_rgba(251,146,60,0.5)] transition-all duration-300 hover:bg-amber-900/40 text-amber-200 hover:text-white border border-transparent data-[state=active]:border-amber-400/50 whitespace-nowrap overflow-hidden"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-bold text-sm md:text-base truncate">{section.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* By People Section */}
            <TabsContent value="by-people" className="animate-fadeIn">
              {byPeopleData && (
                <ByPeopleSection data={byPeopleData} />
              )}
            </TabsContent>

            {/* For People Section */}
            <TabsContent value="for-people" className="animate-fadeIn">
              {forPeopleData && (
                <ForPeopleSection data={forPeopleData} />
              )}
            </TabsContent>
          </Tabs>

          {/* Conclusion Section */}
          <ConclusionSection data={contentData.conclusion} />

          {/* Content Navigation */}
          <ContentNavigation />
        </div>
      </div>
    </div>
  );
}
