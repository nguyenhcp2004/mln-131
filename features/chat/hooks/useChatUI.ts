import { useState, useEffect, useRef } from "react";
import { useChat } from "@/providers/ChatProvider";
import { useAutoSendMode } from "./useAutoSendMode";

export function useChatUI() {
  const {
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
    closeChat,
  } = useChat();

  const { isAutoSendEnabled, toggleAutoSend } = useAutoSendMode();

  const [inputValue, setInputValue] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const prevLoadingRef = useRef(false);

  const currentSession = sessions.find((s) => s.id === currentSessionId);

  // Clear input when AI finishes responding
  useEffect(() => {
    if (prevLoadingRef.current && !isLoading) {
      // Was loading, now finished
      setInputValue("");
    }
    prevLoadingRef.current = isLoading;
  }, [isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue("");
    await sendMessage(message);
  };

  const handleNewChat = async () => {
    const newSessionId = await createNewSession("New Chat");
    setCurrentSessionId(newSessionId);
    setIsHistoryOpen(false);
  };

  const handleDeleteSession = async (
    sessionId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (confirm("Bạn có chắc muốn xóa cuộc trò chuyện này?")) {
      await removeSession(sessionId);
    }
  };

  return {
    // State
    inputValue,
    setInputValue,
    isHistoryOpen,
    setIsHistoryOpen,
    currentSession,

    // From provider
    sessions,
    currentSessionId,
    setCurrentSessionId,
    messages,
    isLoading,
    isChatOpen,
    toggleChat,
    closeChat,

    // Auto-send mode
    isAutoSendEnabled,
    toggleAutoSend,

    // Handlers
    handleSend,
    handleNewChat,
    handleDeleteSession,
  };
}
