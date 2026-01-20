"use client";

import { Type, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutoSendToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function AutoSendToggle({
  enabled,
  onToggle,
}: AutoSendToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative inline-flex items-center rounded-full p-0.5 transition-all duration-300 shadow-lg backdrop-blur-sm",
        "hover:shadow-xl active:scale-95",
        enabled
          ? "bg-gradient-to-r from-amber-700 to-amber-800 border-2 border-amber-600/50"
          : "bg-gradient-to-r from-amber-900/60 to-amber-950/60 border-2 border-amber-700/30"
      )}
      style={{ width: "80px", height: "36px" }}
      title={enabled ? "Bôi text → Tự động gửi" : "Bôi text → Hiện menu"}
    >
      {/* Sliding background */}
      <div
        className={cn(
          "absolute top-0.5 h-[32px] w-[38px] rounded-full shadow-md transition-all duration-300",
          enabled
            ? "bg-amber-100 left-[calc(100%-39px)]"
            : "bg-amber-200 left-0.5"
        )}
      />

      {/* Left icon - Text selection */}
      <div
        className={cn(
          "relative z-10 flex h-[32px] w-[38px] items-center justify-center rounded-full transition-colors duration-300",
          !enabled ? "text-amber-900" : "text-amber-100"
        )}
      >
        <Type className="h-4 w-4" strokeWidth={2.5} />
      </div>

      {/* Right icon - Chat */}
      <div
        className={cn(
          "relative z-10 flex h-[32px] w-[38px] items-center justify-center rounded-full transition-colors duration-300",
          enabled ? "text-amber-900" : "text-amber-200"
        )}
      >
        <MessageSquare className="h-4 w-4" strokeWidth={2.5} />
      </div>
    </button>
  );
}
