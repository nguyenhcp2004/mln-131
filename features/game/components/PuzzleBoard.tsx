'use client';

import { useDroppable } from '@dnd-kit/core';

interface PuzzleBoardProps {
  rows: number;
  cols: number;
  children: React.ReactNode;
}

export default function PuzzleBoard({ rows, cols, children }: PuzzleBoardProps) {
  const { setNodeRef } = useDroppable({
    id: 'puzzle-board',
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-[#FFD700] text-center">
        Ghép các mảnh vào đúng vị trí
      </h2>

      <div
        ref={setNodeRef}
        className="relative bg-white/10 backdrop-blur-sm rounded-lg p-4 border-4 border-[#FFD700]"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '2px',
        }}
      >
        {children}
      </div>
    </div>
  );
}
