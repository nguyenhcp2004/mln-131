"use client";

import Image from "next/image";
import { ReactNode } from "react";
import NavigateButton from "./NavigateButton";
import MusicPlay from "../MusicPlay";
import { ChatProvider } from "@/providers/ChatProvider";
import { ChatUI, TextExplainerUI } from "@/features/chat";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ChatProvider>
      <div className="relative min-h-screen w-full overflow-hidden">
        {/* Background Image Layer */}
        <div className="fixed inset-0 z-0">
          <Image
            src="/images/bg-3.png"
            alt="Background"
            fill
            priority
            quality={75}
            className="object-cover"
            sizes="100vw"
          />
          {/* Optional: Add overlay for better content readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Navigation Sidebar */}
        <NavigateButton />

        {/* Music Player */}
        <MusicPlay />

        {/* Content Layer */}
        <div className="relative z-10">{children}</div>
        <ChatUI />
        <TextExplainerUI />
      </div>
    </ChatProvider>
  );
};

export default MainLayout;
