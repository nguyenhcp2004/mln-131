"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  ChatMessage,
  ChatSession,
  getAllSessions,
  getMessages,
  saveMessage,
  createSession,
  deleteSession,
} from "@/lib/idb/chatIdb";
import { sendChatMessage } from "@/actions/chatActions";

interface ChatContextValue {
  // Sessions
  sessions: ChatSession[];
  currentSessionId: string | null;
  setCurrentSessionId: (id: string) => void;
  createNewSession: (firstMessage: string) => Promise<string>;
  removeSession: (sessionId: string) => Promise<void>;

  // Messages
  messages: ChatMessage[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;

  // UI State
  isChatOpen: boolean;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Define callbacks first
  const loadMessages = useCallback(async (sessionId: string) => {
    try {
      const sessionMessages = await getMessages(sessionId);
      setMessages(sessionMessages);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  }, []);

  const loadSessions = useCallback(async () => {
    try {
      const allSessions = await getAllSessions();
      setSessions(allSessions);

      // Set first session as current if none selected
      if (!currentSessionId && allSessions.length > 0) {
        setCurrentSessionId(allSessions[0].id);
      }
    } catch (error) {
      console.error("Failed to load sessions:", error);
    }
  }, [currentSessionId]);

  // Load sessions on mount
  useEffect(() => {
    loadSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load messages when session changes
  useEffect(() => {
    if (currentSessionId) {
      loadMessages(currentSessionId);
    } else {
      setMessages([]);
    }
  }, [currentSessionId, loadMessages]);

  const createNewSession = useCallback(
    async (firstMessage: string): Promise<string> => {
      try {
        const sessionId = await createSession(firstMessage);
        await loadSessions();
        setCurrentSessionId(sessionId);
        return sessionId;
      } catch (error) {
        console.error("Failed to create session:", error);
        throw error;
      }
    },
    [loadSessions]
  );

  const removeSession = useCallback(
    async (sessionId: string) => {
      try {
        await deleteSession(sessionId);
        await loadSessions();

        // If deleted current session, switch to first available
        if (sessionId === currentSessionId) {
          const remaining = sessions.filter((s) => s.id !== sessionId);
          setCurrentSessionId(remaining.length > 0 ? remaining[0].id : null);
        }
      } catch (error) {
        console.error("Failed to delete session:", error);
      }
    },
    [currentSessionId, sessions, loadSessions]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setIsLoading(true);

      try {
        let sessionId = currentSessionId;

        // Create new session if none exists
        if (!sessionId) {
          sessionId = await createNewSession(content);
        }

        // Save user message to IDB
        const userMessage: ChatMessage = {
          sessionId,
          role: "user",
          content: content.trim(),
          createdAt: new Date().toISOString(),
        };
        await saveMessage(userMessage);

        // Reload messages to show user message immediately
        await loadMessages(sessionId);

        // Call Server Action for assistant response
        const data = await sendChatMessage(
          content.trim(),
          messages.map((m) => ({
            role: m.role,
            content: m.content,
          }))
        );

        if (data.error) {
          throw new Error(data.error);
        }

        // Save assistant message to IDB
        const assistantMessage: ChatMessage = {
          sessionId,
          role: "assistant",
          content: data.answer || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
          createdAt: new Date().toISOString(),
        };
        await saveMessage(assistantMessage);

        // Reload messages to show assistant response
        await loadMessages(sessionId);
        await loadSessions(); // Update session timestamp
      } catch (error) {
        console.error("Failed to send message:", error);

        // Show error message to user
        if (currentSessionId) {
          const errorMessage: ChatMessage = {
            sessionId: currentSessionId,
            role: "assistant",
            content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.",
            createdAt: new Date().toISOString(),
          };
          await saveMessage(errorMessage);
          await loadMessages(currentSessionId);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      currentSessionId,
      messages,
      isLoading,
      createNewSession,
      loadMessages,
      loadSessions,
    ]
  );

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  const value: ChatContextValue = {
    sessions,
    currentSessionId,
    setCurrentSessionId,
    createNewSession,
    removeSession,
    messages,
    sendMessage,
    isLoading,
    isChatOpen,
    toggleChat,
    openChat,
    closeChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
