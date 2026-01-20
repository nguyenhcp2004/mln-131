"use client";

import React from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatSession } from "@/lib/idb/chatIdb";

interface ChatSidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string, e: React.MouseEvent) => void;
}

export default function ChatSidebar({
  sessions,
  currentSessionId,
  onSelectSession,
  onDeleteSession,
}: ChatSidebarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMinutes < 1) return "Vừa xong";
    if (diffInMinutes < 60) return `${diffInMinutes} phút`;
    if (diffInHours < 24) return `${diffInHours} giờ`;

    return new Intl.DateTimeFormat("vi-VN", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="w-full sm:w-[280px] border-r border-amber-600/30 bg-amber-900/20 backdrop-blur-sm flex flex-col">
      <div className="p-3 sm:p-4 border-b border-amber-600/30">
        <h2 className="text-sm font-semibold text-amber-100">Lịch sử chat</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 shadow-lg border border-amber-500/30">
              <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
            </div>
            <p className="text-xs text-amber-200/70">Chưa có lịch sử chat</p>
          </div>
        ) : (
          <div className="p-2 space-y-1.5">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "group relative rounded-xl p-2.5 sm:p-3 cursor-pointer transition-all",
                  currentSessionId === session.id
                    ? "bg-amber-600/30 border border-amber-500/50 shadow-md"
                    : "hover:bg-amber-800/20 border border-transparent"
                )}
                onClick={() => onSelectSession(session.id)}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-xs truncate flex-1 text-amber-100 pr-2">
                    {session.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-amber-300/70 shrink-0">
                      {formatDate(session.updatedAt)}
                    </span>
                    <button
                      onClick={(e) => onDeleteSession(session.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                      title="Xóa"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
