"use client";

import React, { useRef, useEffect } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpeechToText } from "../hooks/useSpeechToText";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  isLoading,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isResettingRef = useRef(false);
  const {
    isListening,
    isSupported: isSpeechSupported,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText();

  // Update input value when transcript changes (but not when resetting)
  useEffect(() => {
    if (transcript && !isResettingRef.current) {
      onChange(transcript);
    }
  }, [transcript, onChange]);

  // Reset transcript when input is cleared externally (after sending)
  useEffect(() => {
    // If input was cleared and we have transcript
    if (!value && transcript) {
      // Set flag to prevent transcript from filling input again
      isResettingRef.current = true;
      resetTranscript();
      // Clear flag after a short delay to allow new speech
      setTimeout(() => {
        isResettingRef.current = false;
      }, 100);
    }
  }, [value, transcript, resetTranscript]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  const canSend = value.trim() && !isLoading;

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  return (
    <div className="border-t border-amber-600/30 bg-amber-900/20 backdrop-blur-md px-4 py-3">
      {/* Listening indicator */}
      {isListening && (
        <div className="mb-2 flex items-center gap-2 text-xs text-red-400 animate-pulse">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <span className="font-medium">Đang nghe...</span>
        </div>
      )}

      <div
        className={cn(
          "flex items-end gap-2 bg-amber-950/40 rounded-2xl border shadow-sm transition-all duration-200 px-3 py-2 backdrop-blur-sm",
          isListening
            ? "border-red-500/50 shadow-lg ring-2 ring-red-500/20"
            : "border-amber-600/30 focus-within:border-amber-500/50 focus-within:shadow-md"
        )}
      >
        {/* Mic button */}
        {isSpeechSupported && (
          <button
            onClick={handleMicClick}
            disabled={isLoading}
            className={cn(
              "shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200",
              isListening
                ? "bg-red-500 hover:bg-red-600 text-white shadow-md animate-pulse"
                : "bg-amber-800/40 hover:bg-amber-700/40 text-amber-300 hover:text-amber-200",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            title={isListening ? "Dừng ghi âm" : "Nói để nhập text"}
            aria-label={isListening ? "Stop recording" : "Start recording"}
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        )}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={
            isListening ? "Đang nghe bạn nói..." : "Nhập tin nhắn..."
          }
          disabled={isLoading}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent text-sm text-amber-100",
            "focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "placeholder:text-amber-300/40"
          )}
          style={{ minHeight: "24px", maxHeight: "120px" }}
        />

        <button
          onClick={onSend}
          disabled={!canSend}
          className={cn(
            "shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200",
            canSend
              ? "bg-gradient-to-br from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              : "bg-amber-900/40 text-amber-500/40 cursor-not-allowed"
          )}
          aria-label="Gửi tin nhắn"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
