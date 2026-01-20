export function chunkText(
  text: string,
  chunkSize = 1000,
  overlap = 200
): string[] {
  const cleanText = text.replace(/\s+/g, " ").trim();

  const chunks: string[] = [];
  let start = 0;

  while (start < cleanText.length) {
    let end = start + chunkSize;

    // Tìm vị trí gần nhất của dấu chấm / xuống dòng để tránh cắt ngang câu
    if (end < cleanText.length) {
      const nextPeriod = cleanText.lastIndexOf(".", end);
      const nextNewline = cleanText.lastIndexOf("\n", end);
      const splitPoint = Math.max(nextPeriod, nextNewline);

      if (splitPoint > start + chunkSize * 0.5) {
        end = splitPoint + 1;
      }
    }

    const chunk = cleanText.slice(start, end).trim();
    if (chunk.length > 0) chunks.push(chunk);

    start = end - overlap;
  }

  return chunks;
}
