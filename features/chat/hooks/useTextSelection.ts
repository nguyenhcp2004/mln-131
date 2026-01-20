"use client";

import { useState, useEffect, useCallback } from "react";

interface SelectionPosition {
  x: number;
  y: number;
}

interface UseTextSelectionReturn {
  selectedText: string;
  position: SelectionPosition | null;
  isVisible: boolean;
  clearSelection: () => void;
}

export function useTextSelection(
  isEnabled: boolean = true,
  onTextSelected?: (text: string) => void
): UseTextSelectionReturn {
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState<SelectionPosition | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const clearSelection = useCallback(() => {
    setSelectedText("");
    setPosition(null);
    setIsVisible(false);
    window.getSelection()?.removeAllRanges();
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      console.log("Text selection is disabled");
      return;
    }

    console.log("Text selection hook initialized");

    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      console.log("Selection detected:", text);

      if (text && text.length > 0) {
        setSelectedText(text);

        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          const pos = {
            x: rect.left + rect.width / 2,
            y: rect.bottom + window.scrollY + 10,
          };
          console.log("Setting position:", pos);
          setPosition(pos);
          setIsVisible(true);

          // Call callback if provided
          if (onTextSelected) {
            onTextSelected(text);
          }
        }
      } else {
        setIsVisible(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Don't clear if clicking on the explain popup
      if (target.closest("[data-text-explainer]")) {
        return;
      }

      const selection = window.getSelection();
      if (!selection || selection.toString().trim().length === 0) {
        clearSelection();
      }
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEnabled, clearSelection, onTextSelected]);

  return {
    selectedText,
    position,
    isVisible,
    clearSelection,
  };
}
