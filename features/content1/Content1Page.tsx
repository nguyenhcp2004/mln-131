"use client";

import { useState } from "react";
import contentData from "./data/content.json";
import { Anchor, Compass, Ship, Users, Sparkles, BookOpen, Award, Target } from "lucide-react";
import ContentNavigation from "@/components/ContentNavigation";

export default function Content1Page() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header with Ship Metaphor */}
          <div className="text-center mb-12 animate-slideUp">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Ship className="w-12 h-12 text-amber-500 animate-pulse" />
              <Compass className="w-16 h-16 text-amber-400" />
              <Ship className="w-12 h-12 text-amber-500 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
              {contentData.title}
            </h1>
          </div>

          {/* Introduction Quote */}
          <div className="mb-12 animate-slideUp">
            <div className="rounded-2xl p-8 border-2 border-amber-700/40 bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm shadow-2xl">
              <div className="flex items-start gap-4 mb-6">
                <BookOpen className="w-10 h-10 text-amber-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-amber-300 mb-2 italic">{contentData.introduction.source}</p>
                  <blockquote className="text-2xl md:text-3xl font-bold text-amber-100 mb-4 italic leading-relaxed">
                    "{contentData.introduction.quote}"
                  </blockquote>
                  <p className="text-amber-200/90 text-lg">— {contentData.introduction.author}</p>
                </div>
              </div>

              {/* Metaphor Section */}
              <div className="mt-6 pt-6 border-t border-amber-700/30 bg-amber-900/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Anchor className="w-8 h-8 text-amber-400" />
                  <h3 className="text-2xl font-bold text-amber-100">{contentData.introduction.metaphor.title}</h3>
                </div>
                <p className="text-amber-100/90 text-lg leading-relaxed">
                  {contentData.introduction.metaphor.description}
                </p>
              </div>
            </div>
          </div>

          {/* Necessity Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-100 mb-6 flex items-center gap-3">
              <Target className="w-8 h-8 text-amber-500" />
              {contentData.necessity.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentData.necessity.mainPoints.map((point, index) => (
                <div
                  key={point.id}
                  className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-700/40 hover:border-amber-600/60 transition-all duration-300 animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center border-2 border-amber-500">
                      <span className="text-white font-bold text-xl">{point.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-amber-100 mt-2">{point.title}</h3>
                  </div>
                  <p className="text-amber-100/90 leading-relaxed ml-16">
                    {point.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Foundation Section */}
          <div className="mb-12 animate-slideUp">
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/40">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-10 h-10 text-amber-500" />
                <h2 className="text-3xl font-bold text-amber-100">{contentData.foundation.title}</h2>
              </div>
              <p className="text-amber-100/90 text-lg leading-relaxed mb-6">
                {contentData.foundation.description}
              </p>

              <div className="bg-amber-900/20 rounded-xl p-6 border border-amber-700/30">
                <h3 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                  {contentData.foundation.hoChiMinhContribution.title}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 text-2xl">✓</span>
                    <p className="text-amber-100/90 text-lg">{contentData.foundation.hoChiMinhContribution.loyalty}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-amber-400 text-2xl">✓</span>
                    <p className="text-amber-100/90 text-lg">{contentData.foundation.hoChiMinhContribution.creativity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Birth of Party - Comparison */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-100 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-amber-500" />
              {contentData.birthOfParty.title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* World */}
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-700/40">
                <h3 className="text-2xl font-bold text-amber-200 mb-4">{contentData.birthOfParty.comparison.world.title}</h3>
                <div className="bg-amber-900/20 rounded-xl p-6 mb-4">
                  <p className="text-amber-100 text-center text-lg font-semibold">
                    {contentData.birthOfParty.comparison.world.formula}
                  </p>
                </div>
                <div className="space-y-3">
                  {contentData.birthOfParty.comparison.world.elements.map((element, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-amber-900/20 rounded-lg p-3">
                      <span className="text-amber-400 text-xl">●</span>
                      <span className="text-amber-100/90">{element}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vietnam */}
              <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-600/50 shadow-xl">
                <h3 className="text-2xl font-bold text-amber-100 mb-4">{contentData.birthOfParty.comparison.vietnam.title}</h3>
                <div className="bg-amber-800/30 rounded-xl p-6 mb-4 border border-amber-600/40">
                  <p className="text-amber-50 text-center text-lg font-bold">
                    {contentData.birthOfParty.comparison.vietnam.formula}
                  </p>
                </div>
                <div className="space-y-3 mb-4">
                  {contentData.birthOfParty.comparison.vietnam.elements.map((element, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-amber-800/30 rounded-lg p-3 border border-amber-700/30">
                      <span className="text-amber-300 text-xl">★</span>
                      <span className="text-amber-50 font-medium">{element}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-4 text-center">
                  <p className="text-white font-bold text-lg">
                    💡 {contentData.birthOfParty.comparison.vietnam.innovation}
                  </p>
                </div>
              </div>
            </div>

            {/* Reasoning */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-700/40">
              <h3 className="text-2xl font-bold text-amber-100 mb-4">{contentData.birthOfParty.reasoning.title}</h3>
              <p className="text-amber-100/90 text-lg mb-6">{contentData.birthOfParty.reasoning.context}</p>

              <div className="bg-amber-900/20 rounded-xl p-6 border border-amber-700/30">
                <h4 className="text-xl font-bold text-amber-200 mb-3">{contentData.birthOfParty.reasoning.contradictions.title}</h4>
                <p className="text-amber-100/90 mb-4">{contentData.birthOfParty.reasoning.contradictions.description}</p>
                <div className="bg-gradient-to-r from-orange-900/40 to-red-900/40 rounded-lg p-4 border-l-4 border-amber-500">
                  <p className="text-amber-50 font-semibold text-lg">
                    ⚡ {contentData.birthOfParty.reasoning.contradictions.mainContradiction}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Development */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-amber-100 mb-6">{contentData.historicalDevelopment.title}</h2>
            <div className="space-y-4">
              {contentData.historicalDevelopment.movements.map((movement, index) => (
                <div
                  key={movement.id}
                  className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-amber-700/40 hover:border-amber-600/60 transition-all duration-300 animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center border-2 border-amber-500">
                      <span className="text-white font-bold">{movement.id}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-amber-100 mb-2">{movement.title}</h3>
                      <p className="text-amber-100/90 leading-relaxed">{movement.description}</p>
                      {movement.milestone && (
                        <div className="mt-3 inline-block bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                          📅 {movement.milestone}
                        </div>
                      )}
                      {movement.founder && (
                        <div className="mt-3 inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                          👤 Người sáng lập: {movement.founder}
                        </div>
                      )}
                      {movement.commonGoal && (
                        <div className="mt-3 bg-amber-900/30 rounded-lg p-3 border border-amber-700/30">
                          <p className="text-amber-200 font-semibold">
                            🎯 Mục tiêu chung: {movement.commonGoal}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conclusion */}
          <div className="mb-12 animate-slideUp">
            <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl p-8 border-2 border-amber-500 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                  <Award className="w-10 h-10 text-amber-600" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">{contentData.conclusion.title}</h2>
              </div>

              <div className="space-y-6">
                {contentData.conclusion.mainPoints.map((point, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-3">{point.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-4">{point.content}</p>
                    {point.milestone && (
                      <div className="inline-block bg-white text-amber-600 px-4 py-2 rounded-lg font-bold">
                        📅 Năm {point.milestone}
                      </div>
                    )}
                    {point.missions && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {point.missions.map((mission, mIdx) => (
                          <div key={mIdx} className="bg-white/10 rounded-lg p-3 border border-white/20">
                            <p className="text-white font-semibold">✓ {mission}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Navigation */}
          <ContentNavigation />
        </div>
      </div>
    </div>
  );
}
