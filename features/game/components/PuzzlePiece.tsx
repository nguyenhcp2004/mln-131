'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';

interface PuzzlePieceProps {
  id: number;
  row: number;
  col: number;
  totalRows: number;
  totalCols: number;
  isPlaced: boolean;
  imageUrl: string;
}

export default function PuzzlePiece({
  id,
  row,
  col,
  totalRows,
  totalCols,
  isPlaced,
  imageUrl,
}: PuzzlePieceProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `piece-${id}`,
    disabled: isPlaced,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isPlaced ? 'default' : 'grab',
  };

  const pieceWidth = 120;
  const pieceHeight = 120;

  // Calculate background position for the piece
  const bgPosX = -(col * pieceWidth);
  const bgPosY = -(row * pieceHeight);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        relative rounded-lg overflow-hidden border-2 transition-all duration-200
        ${isPlaced ? 'border-[#FFD700]' : 'border-[#FFD700] shadow-md hover:shadow-xl'}
        ${isDragging ? 'z-50 scale-110' : 'z-10'}
      `}
    >
      <div
        style={{
          width: `${pieceWidth}px`,
          height: `${pieceHeight}px`,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: `${totalCols * pieceWidth}px ${totalRows * pieceHeight}px`,
          backgroundPosition: `${bgPosX}px ${bgPosY}px`,
          backgroundRepeat: 'no-repeat',
        }}
      />
    </div>
  );
}
