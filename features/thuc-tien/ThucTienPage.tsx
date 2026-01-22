"use client";

import { useState } from "react";
import contentData from "./data/content.json";
import {
  Heart,
  Users,
  Shield,
  Scale,
  AlertTriangle,
  CheckCircle,
  Award,
  UserCheck,
  Briefcase,
  HandHeart,
  BookOpen
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentNavigation from "@/components/ContentNavigation";
import Image from "next/image";

export default function ThucTienPage() {
  const [activeTab, setActiveTab] = useState("chinh-sach");

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12 animate-slideUp">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Shield className="w-12 h-12 text-amber-500 animate-pulse" />
              <Scale className="w-16 h-16 text-amber-400" />
              <Shield className="w-12 h-12 text-amber-500 animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-4">
              {contentData.title}
            </h1>
            <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
              {contentData.subtitle}
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-12 animate-slideUp">
            <div className="rounded-2xl p-8 border-2 border-amber-700/40 bg-gradient-to-br from-amber-900/30 to-orange-900/30 backdrop-blur-sm shadow-2xl">
              <div className="flex items-start gap-4">
                <BookOpen className="w-10 h-10 text-amber-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-amber-100/90 text-lg leading-relaxed">
                    Suốt hành trình của mình, Đảng đã ban hành nhiều chính sách
                    nhằm hỗ trợ người dân và tạo điều kiện cho người dân được
                    phát triển bình đẳng cho phụ nữ và những người thuộc diện
                    yếu thế trong xã hội.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-4 bg-gradient-to-r from-amber-950/90 via-orange-950/90 to-red-950/90 backdrop-blur-xl p-4 rounded-2xl border-2 border-amber-500/40 shadow-2xl mb-10">
              <TabsTrigger
                value="chinh-sach"
                className="flex items-center justify-center gap-3 py-4 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:via-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_30px_rgba(251,146,60,0.5)] transition-all duration-300 hover:bg-amber-900/40 text-amber-200 hover:text-white border border-transparent data-[state=active]:border-amber-400/50"
              >
                <Heart className="w-5 h-5 flex-shrink-0" />
                <span className="font-bold text-sm md:text-base">
                  Chính sách hỗ trợ
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="kho-khan"
                className="flex items-center justify-center gap-3 py-4 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:via-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_30px_rgba(251,146,60,0.5)] transition-all duration-300 hover:bg-amber-900/40 text-amber-200 hover:text-white border border-transparent data-[state=active]:border-amber-400/50"
              >
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span className="font-bold text-sm md:text-base">
                  Khó khăn & Thách thức
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="trach-nhiem"
                className="flex items-center justify-center gap-3 py-4 px-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:via-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_30px_rgba(251,146,60,0.5)] transition-all duration-300 hover:bg-amber-900/40 text-amber-200 hover:text-white border border-transparent data-[state=active]:border-amber-400/50"
              >
                <UserCheck className="w-5 h-5 flex-shrink-0" />
                <span className="font-bold text-sm md:text-base">
                  Trách nhiệm công dân
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Chính sách hỗ trợ Tab */}
            <TabsContent value="chinh-sach" className="animate-fadeIn">
              <div className="space-y-8">
                {/* Phụ nữ Section */}
                <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 backdrop-blur-sm rounded-2xl p-8 border border-pink-700/40">
                  <div className="flex items-center gap-3 mb-6">
                    <Heart className="w-10 h-10 text-pink-400" />
                    <h2 className="text-2xl md:text-3xl font-bold text-amber-100">
                      {contentData.sections[0].title}
                    </h2>
                  </div>
                  <p className="text-amber-100/90 text-lg leading-relaxed mb-6">
                    {contentData.sections[0].description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contentData.sections[0].images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-64 rounded-xl overflow-hidden border border-amber-700/30"
                      >
                        <Image
                          src={img}
                          alt={`Chính sách cho phụ nữ ${idx + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Người nghèo Section */}
                <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm rounded-2xl p-8 border border-blue-700/40">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-10 h-10 text-blue-400" />
                    <h2 className="text-2xl md:text-3xl font-bold text-amber-100">
                      {contentData.sections[1].title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {contentData.sections[1].policies?.map((policy, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-black/20 rounded-xl p-4 border border-blue-700/30"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                        <p className="text-amber-100/90">{policy}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contentData.sections[1].images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative h-64 rounded-xl overflow-hidden border border-amber-700/30"
                      >
                        <Image
                          src={img}
                          alt={`Hỗ trợ người nghèo ${idx + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Khó khăn Tab */}
            <TabsContent value="kho-khan" className="animate-fadeIn">
              <div className="space-y-8">
                {/* Tham nhũng Section */}
                <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl p-8 border border-red-700/40">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-400" />
                    <h2 className="text-2xl md:text-3xl font-bold text-amber-100">
                      {contentData.challenges.corruption.title}
                    </h2>
                  </div>
                  <p className="text-amber-100/90 text-lg leading-relaxed mb-6 bg-black/20 rounded-xl p-6 border border-red-700/30">
                    {contentData.challenges.corruption.definition}
                  </p>

                  <h3 className="text-xl font-bold text-amber-100 mb-4">
                    Những hành vi tham nhũng bao gồm:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {contentData.challenges.corruption.behaviors.map(
                      (behavior, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-black/20 rounded-xl p-4 border border-red-700/30"
                        >
                          <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {idx + 1}
                          </span>
                          <p className="text-amber-100/90">{behavior}</p>
                        </div>
                      )
                    )}
                  </div>

                  {/* Why Important */}
                  <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 rounded-xl p-6 border border-amber-600/40 mb-6">
                    <h3 className="text-xl font-bold text-amber-100 mb-4 flex items-center gap-2">
                      <Shield className="w-6 h-6 text-amber-400" />
                      {contentData.challenges.corruption.whyImportant.title}
                    </h3>
                    <p className="text-amber-100/90 leading-relaxed">
                      {contentData.challenges.corruption.whyImportant.content}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contentData.challenges.corruption.images.map(
                      (img, idx) => (
                        <div
                          key={idx}
                          className="relative h-64 rounded-xl overflow-hidden border border-amber-700/30"
                        >
                          <Image
                            src={img}
                            alt={`Chống tham nhũng ${idx + 1}`}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Trách nhiệm công dân Tab */}
            <TabsContent value="trach-nhiem" className="animate-fadeIn">
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-8 border border-green-700/40">
                  <div className="flex items-center gap-3 mb-6">
                    <Award className="w-10 h-10 text-green-400" />
                    <h2 className="text-2xl md:text-3xl font-bold text-amber-100">
                      {contentData.citizenResponsibilities.title}
                    </h2>
                  </div>
                  <p className="text-amber-100/90 text-lg leading-relaxed mb-8">
                    {contentData.citizenResponsibilities.intro}
                  </p>

                  <div className="space-y-4 mb-8">
                    {contentData.citizenResponsibilities.responsibilities.map(
                      (item) => {
                        const icons = [
                          UserCheck,
                          Scale,
                          Briefcase,
                          Shield,
                          HandHeart
                        ];
                        const Icon = icons[item.id - 1] || UserCheck;
                        return (
                          <div
                            key={item.id}
                            className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-green-700/40 hover:border-green-600/60 transition-all duration-300"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center border-2 border-green-500">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-amber-100 mb-2">
                                  {item.id}. {item.title}
                                </h3>
                                <p className="text-amber-100/90 leading-relaxed">
                                  {item.content}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  <div className="relative h-80 rounded-xl overflow-hidden border border-amber-700/30">
                    <Image
                      src={contentData.citizenResponsibilities.image}
                      alt="Quyền và nghĩa vụ công dân"
                      fill
                      className="object-contain bg-white/10"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
