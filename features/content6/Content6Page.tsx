"use client";

import { useState } from "react";
import contentData from "./data/content.json";
import { Scale, Gavel, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroHeader from "./components/HeroHeader";
import ConstitutionalSection from "./components/ConstitutionalSection";
import SupremacySection from "./components/SupremacySection";
import HumanisticSection from "./components/HumanisticSection";
import ContentNavigation from "@/components/ContentNavigation";

const iconMap = {
  scale: Scale,
  gavel: Gavel,
  heart: Heart,
};

export default function Content6Page() {
  const [activeTab, setActiveTab] = useState("constitutional");

  const sections = contentData.sections;
  const constitutionalData = sections.find(s => s.id === "constitutional") as any;
  const supremacyData = sections.find(s => s.id === "supremacy") as any;
  const humanisticData = sections.find(s => s.id === "humanistic") as any;

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
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-4 bg-gradient-to-r from-amber-950/90 via-orange-950/90 to-red-950/90 backdrop-blur-xl p-3 rounded-2xl border-2 border-amber-500/40 shadow-2xl mb-10">
              {sections.map((section) => {
                const Icon = iconMap[section.icon as keyof typeof iconMap];
                return (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex items-center gap-3 py-5 px-6 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:via-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_30px_rgba(251,146,60,0.5)] data-[state=active]:scale-105 transition-all duration-300 hover:bg-amber-900/40 text-amber-200 hover:text-white border border-transparent data-[state=active]:border-amber-400/50"
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-bold text-sm md:text-base">{section.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Constitutional Section */}
            <TabsContent value="constitutional" className="animate-fadeIn">
              {constitutionalData && (
                <ConstitutionalSection data={constitutionalData} />
              )}
            </TabsContent>

            {/* Supremacy Section */}
            <TabsContent value="supremacy" className="animate-fadeIn">
              {supremacyData && (
                <SupremacySection data={supremacyData} />
              )}
            </TabsContent>

            {/* Humanistic Section */}
            <TabsContent value="humanistic" className="animate-fadeIn">
              {humanisticData && (
                <HumanisticSection data={humanisticData} />
              )}
            </TabsContent>
          </Tabs>

          {/* Content Navigation */}
          <ContentNavigation />
        </div>
      </div>
    </div>
  );
}
