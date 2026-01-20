"use client";

import { useRef, useEffect } from "react";
import { MessageSquare, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/lib/idb/chatIdb";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function ChatMessages({
  messages,
  isLoading,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-amber-950/30">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 bg-amber-600/20 rounded-full flex items-center justify-center mb-4 border border-amber-500/30">
            <MessageSquare className="w-8 h-8 text-amber-300" />
          </div>
          <h2 className="text-sm font-semibold mb-1 text-amber-100">
            Bắt đầu trò chuyện
          </h2>
          <p className="text-xs text-amber-200/70 max-w-xs">
            Gửi tin nhắn để bắt đầu cuộc trò chuyện với trợ lý AI
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 bg-amber-950/30">
      {messages.map((message, index) => {
        const isUser = message.role === "user";
        return (
          <div
            key={index}
            className={cn(
              "flex gap-3 mb-4",
              isUser ? "justify-end" : "justify-start"
            )}
          >
            {!isUser && (
              <div className="shrink-0 w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center border border-amber-500/30">
                <Bot className="w-4 h-4 text-amber-300" />
              </div>
            )}
            <div className="flex flex-col max-w-[85%] min-w-0">
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 overflow-hidden",
                  isUser
                    ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white"
                    : "bg-amber-900/40 text-amber-100 border border-amber-600/30 shadow-sm backdrop-blur-sm"
                )}
              >
                {isUser ? (
                  <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                    {message.content}
                  </p>
                ) : (
                  <div className="text-sm w-full overflow-hidden">
                    <div
                      className="prose prose-sm max-w-none
                      prose-p:my-1 prose-p:leading-relaxed prose-p:text-amber-100 prose-p:break-words
                      prose-ul:my-1.5 prose-ul:pl-4 prose-li:my-0.5 prose-li:text-amber-100
                      prose-ol:my-1.5 prose-ol:pl-4
                      prose-headings:my-1.5 prose-headings:font-semibold prose-headings:text-amber-200
                      prose-h1:text-base prose-h2:text-sm prose-h3:text-sm
                      prose-strong:text-amber-300 prose-strong:font-semibold
                      prose-blockquote:my-1.5 prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:pl-3 prose-blockquote:italic prose-blockquote:text-amber-200
                      prose-code:text-amber-300 prose-code:bg-amber-950/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                      prose-pre:my-1.5 prose-pre:bg-amber-950/50 prose-pre:p-2 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:text-xs
                      prose-a:text-amber-400 prose-a:underline hover:prose-a:text-amber-300
                      [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                      [&_p]:break-words [&_li]:break-words [&_strong]:break-words [&_a]:break-all"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1.5 px-1",
                  isUser ? "text-right" : "text-left",
                  "text-amber-300/60"
                )}
              >
                {formatTime(message.createdAt)}
              </span>
            </div>
            {isUser && (
              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        );
      })}
      {isLoading && (
        <div className="flex gap-3 mb-4">
          <div className="shrink-0 w-8 h-8 rounded-full bg-amber-600/20 flex items-center justify-center border border-amber-500/30">
            <Bot className="w-4 h-4 text-amber-300" />
          </div>
          <div className="bg-amber-900/40 rounded-2xl rounded-bl-md px-4 py-3 border border-amber-600/30 shadow-sm backdrop-blur-sm">
            <div className="flex gap-1.5">
              <div
                className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
