import { useCallback, useRef } from "react";
import { useTextSelection } from "./useTextSelection";
import { useChat } from "@/providers/ChatProvider";
import { useAutoSendMode } from "./useAutoSendMode";
import { extractTextContext } from "../utils/contextExtractor";

export function useTextExplainer(isEnabled = true) {
  const { openChat, sendMessage, isChatOpen } = useChat();
  const { isAutoSendEnabled, enableAutoSend } = useAutoSendMode();
  const lastSentTextRef = useRef<string>("");

  const handleTextSelected = useCallback(
    (text: string) => {
      // Only auto-send if:
      // 1. Auto-send is enabled
      // 2. Chat is already open
      // 3. Text is not empty
      // 4. This is a NEW selection (not the same text)
      if (
        isAutoSendEnabled &&
        isChatOpen &&
        text &&
        text !== lastSentTextRef.current
      ) {
        lastSentTextRef.current = text;
        setTimeout(() => {
          const context = extractTextContext(text, 200);
          const enrichedPrompt = buildEnrichedPrompt(context);
          sendMessage(enrichedPrompt);
        }, 100);
      }
    },
    [isAutoSendEnabled, isChatOpen, sendMessage]
  );

  const { selectedText, position, isVisible, clearSelection } =
    useTextSelection(isEnabled, handleTextSelected);

  const buildEnrichedPrompt = (
    context: ReturnType<typeof extractTextContext>
  ) => {
    let prompt = `Giải thích: "${context.selectedText}"`;

    if (context.contextBefore || context.contextAfter) {
      prompt += `\n\nNgữ cảnh: ${context.contextBefore.substring(
        0,
        100
      )}... ${context.contextAfter.substring(0, 100)}`;
    }

    if (context.pageTitle) {
      prompt += `\n(Từ: ${context.pageTitle})`;
    }

    return prompt;
  };

  const handleExplain = async () => {
    if (!selectedText) return;

    const context = extractTextContext(selectedText, 200);
    const enrichedPrompt = buildEnrichedPrompt(context);

    openChat();

    setTimeout(() => {
      sendMessage(enrichedPrompt);
      clearSelection();
    }, 100);
  };

  const handleAutoSend = async () => {
    if (!selectedText) return;

    const context = extractTextContext(selectedText, 200);
    const enrichedPrompt = buildEnrichedPrompt(context);

    // Mark this text as sent to avoid duplicate
    lastSentTextRef.current = selectedText;

    // Enable auto-send mode if not already enabled
    await enableAutoSend();

    openChat();

    setTimeout(() => {
      sendMessage(enrichedPrompt);
      clearSelection();
    }, 100);
  };

  // Hide popup if auto-send is enabled AND chat is open
  const shouldShowPopup = isVisible && (!isAutoSendEnabled || !isChatOpen);

  return {
    selectedText,
    position,
    isVisible: shouldShowPopup,
    clearSelection,
    handleExplain,
    handleAutoSend,
    isAutoSendEnabled,
    isChatOpen,
  };
}
