"use client";

import React from "react";
import { MessageSquare, History, Plus, X } from "lucide-react";

interface ChatHeaderProps {
  title: string;
  isHistoryOpen: boolean;
  onToggleHistory: () => void;
  onNewChat: () => void;
  onClose: () => void;
}

export default function ChatHeader({
  title,
  isHistoryOpen,
  onToggleHistory,
  onNewChat,
  onClose,
}: ChatHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-4 py-3 flex items-center justify-between border-b border-amber-600/50">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <MessageSquare className="w-4 h-4" />
        </div>
        <h1 className="text-sm font-semibold truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleHistory}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          title={isHistoryOpen ? "Ẩn lịch sử" : "Hiện lịch sử"}
        >
          <History className="w-4 h-4" />
        </button>
        <button
          onClick={onNewChat}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          title="Chat mới"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          title="Đóng"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
