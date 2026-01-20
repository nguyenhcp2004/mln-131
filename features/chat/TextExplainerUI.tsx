"use client";

import { Lightbulb, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextExplainer } from "./hooks/useTextExplainer";

interface TextExplainerUIProps {
  isEnabled?: boolean;
}

export default function TextExplainerUI({
  isEnabled = true,
}: TextExplainerUIProps) {
  const {
    selectedText,
    position,
    isVisible,
    clearSelection,
    handleExplain,
    handleAutoSend,
    isAutoSendEnabled,
  } = useTextExplainer(isEnabled);

  // Don't show popup if auto-send is enabled AND chat is open (text will be sent automatically)
  if (!isVisible || !position) {
    console.log("TextExplainerUI not visible:", { isVisible, position });
    return null;
  }

  console.log("Rendering TextExplainerUI at:", position);

  return (
    <div
      data-text-explainer
      className="fixed z-[9999] animate-in fade-in slide-in-from-bottom-2 duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translateX(-50%)",
      }}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 p-3 max-w-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-600/40 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0 border border-amber-500/50 shadow-lg">
            <Lightbulb className="w-4 h-4 text-amber-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-amber-100 mb-2 line-clamp-2 italic font-medium">
              "
              {selectedText.length > 60
                ? selectedText.substring(0, 60) + "..."
                : selectedText}
              "
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExplain}
                className="text-xs font-medium text-amber-300 hover:text-amber-200 hover:underline"
              >
                Giải thích
              </button>
              {!isAutoSendEnabled && (
                <>
                  <span className="text-xs text-amber-500/50">•</span>
                  <button
                    onClick={handleAutoSend}
                    className="text-xs font-medium text-green-400 hover:text-green-300 hover:underline flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    Gửi ngay
                  </button>
                </>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={clearSelection}
            className="shrink-0 -mt-1 -mr-1 hover:bg-white/10 text-amber-200 h-6 w-6"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Arrow pointing up */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-2">
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-white/10" />
      </div>
    </div>
  );
}
