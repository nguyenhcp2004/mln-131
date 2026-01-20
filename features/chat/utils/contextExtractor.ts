/**
 * Extract context around selected text
 * @param selectedText - The text that was selected
 * @param contextChars - Number of characters to include before and after (default: 200)
 * @returns Object with extended context and page metadata
 */
export function extractTextContext(
  selectedText: string,
  contextChars: number = 200
): {
  selectedText: string;
  contextBefore: string;
  contextAfter: string;
  fullContext: string;
  pageTitle: string;
  pageContent: string;
} {
  // Get page title from data-page-title attribute or h1
  const titleElement =
    document.querySelector("[data-page-title]") || document.querySelector("h1");
  const pageTitle = titleElement?.textContent?.trim() || "";

  // Get main content from data-page-content or main element
  const contentElement =
    document.querySelector("[data-page-content]") ||
    document.querySelector("main") ||
    document.body;

  const pageContent = contentElement?.textContent?.trim() || "";

  // Find the selected text in the page content
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return {
      selectedText,
      contextBefore: "",
      contextAfter: "",
      fullContext: selectedText,
      pageTitle,
      pageContent: "",
    };
  }

  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer;

  // Get the full text of the container
  let fullText = "";
  let startOffset = 0;

  if (container.nodeType === Node.TEXT_NODE) {
    // If it's a text node, get parent element's text
    const parentElement = container.parentElement;
    if (parentElement) {
      fullText = parentElement.textContent || "";
      // Find where our text node starts in the parent
      const walker = document.createTreeWalker(
        parentElement,
        NodeFilter.SHOW_TEXT
      );
      let currentNode;
      while ((currentNode = walker.nextNode())) {
        if (currentNode === container) {
          break;
        }
        startOffset += currentNode.textContent?.length || 0;
      }
      startOffset += range.startOffset;
    }
  } else {
    // If it's an element node
    fullText = container.textContent || "";
    startOffset = range.startOffset;
  }

  // Calculate positions
  const selectedStart = fullText.indexOf(selectedText, startOffset);
  const selectedEnd = selectedStart + selectedText.length;

  // Extract context before and after
  const contextStart = Math.max(0, selectedStart - contextChars);
  const contextEnd = Math.min(fullText.length, selectedEnd + contextChars);

  let contextBefore = fullText.substring(contextStart, selectedStart).trim();
  let contextAfter = fullText.substring(selectedEnd, contextEnd).trim();

  // Add ellipsis if truncated
  if (contextStart > 0) contextBefore = "..." + contextBefore;
  if (contextEnd < fullText.length) contextAfter = contextAfter + "...";

  const fullContext = `${contextBefore} **${selectedText}** ${contextAfter}`;

  return {
    selectedText,
    contextBefore,
    contextAfter,
    fullContext,
    pageTitle,
    pageContent: pageContent.substring(0, 500), // Limit page content to 500 chars
  };
}
