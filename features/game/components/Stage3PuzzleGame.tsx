'use client';

import { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import PuzzleBoard from './PuzzleBoard';
import PuzzlePiece from './PuzzlePiece';
import ImageReveal from './ImageReveal';
import { generatePuzzlePieces, checkPiecePlacement, GRID_ROWS, GRID_COLS, getGridPosition } from '../lib/puzzleUtils';
import { PuzzlePiece as PuzzlePieceType } from '@/types/game';

function DroppableSlot({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`relative bg-white/5 border transition-colors rounded-lg ${isOver ? 'border-amber-400 bg-amber-400/20 shadow-lg shadow-amber-400/50' : 'border-amber-500/30'
        }`}
      style={{ width: '120px', height: '120px' }}
    >
      {children}
    </div>
  );
}

interface Stage3Props {
  collectedPieces: number[];
  imageId: number;
  onComplete: () => void;
  onRevealStateChange?: (isRevealing: boolean) => void;
  onPauseTimer?: () => void;
  onResumeTimer?: () => void;
}

export default function Stage3PuzzleGame({ collectedPieces, imageId, onComplete, onRevealStateChange, onPauseTimer, onResumeTimer }: Stage3Props) {
  const [pieces, setPieces] = useState<PuzzlePieceType[]>([]);
  const [placedPieces, setPlacedPieces] = useState<Set<number>>(new Set());
  const [activePiece, setActivePiece] = useState<PuzzlePieceType | null>(null);
  const [showImageReveal, setShowImageReveal] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    const puzzlePieces = generatePuzzlePieces(collectedPieces);
    setPieces(puzzlePieces);
  }, [collectedPieces]);

  useEffect(() => {
    if (placedPieces.size === collectedPieces.length && collectedPieces.length > 0 && !isCompleted) {
      setIsCompleted(true);
      // Show the reveal modal directly with image
      setTimeout(() => {
        setShowImageReveal(true);
        onRevealStateChange?.(true);
        onPauseTimer?.(); // Pause timer when showing modal
      }, 500);
    }
  }, [placedPieces, collectedPieces.length, isCompleted, onRevealStateChange, onPauseTimer]);

  const handleCloseReveal = () => {
    setShowImageReveal(false);
    onRevealStateChange?.(false);
    // Don't resume timer - go straight to victory which will stop timer
    onComplete();
  };

  const handleDragStart = (event: any) => {
    const pieceId = parseInt(event.active.id.replace('piece-', ''));
    const piece = pieces.find(p => p.id === pieceId);
    if (piece) {
      setActivePiece(piece);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActivePiece(null);

    const { active, over } = event;
    if (!over) return;

    const pieceId = parseInt(active.id.toString().replace('piece-', ''));
    const piece = pieces.find(p => p.id === pieceId);
    if (!piece || piece.isPlaced) return;

    // Check if dropped on a grid slot
    if (over.id.toString().startsWith('slot-')) {
      const slotIndex = parseInt(over.id.toString().replace('slot-', ''));
      const { row, col } = getGridPosition(slotIndex);

      if (checkPiecePlacement(pieceId, row, col)) {
        // Correct placement
        setPieces(prev =>
          prev.map(p =>
            p.id === pieceId ? { ...p, isPlaced: true } : p
          )
        );
        setPlacedPieces(prev => new Set([...prev, pieceId]));

        // Play success sound (will implement in audio task)
      }
    }
  };

  const imageUrl = `/image/anh${imageId}.jpg`;
  const imageName = `anh${imageId}.jpg`;

  return (
    <>
      {showImageReveal && (
        <ImageReveal imageName={imageName} onClose={handleCloseReveal} />
      )}

      <div className="min-h-screen p-4 overflow-hidden">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-amber-300 mb-2">
                Màn 3: Ghép hình
              </h1>
              <p className="text-white text-lg">
                Đã ghép: {placedPieces.size}/{collectedPieces.length} mảnh
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Puzzle Board */}
              <div className="flex justify-center">
                <PuzzleBoard rows={GRID_ROWS} cols={GRID_COLS}>
                  {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, index) => {
                    const { row, col } = getGridPosition(index);
                    const placedPiece = pieces.find(
                      p => p.isPlaced && p.correctPosition.row === row && p.correctPosition.col === col
                    );

                    return (
                      <DroppableSlot key={index} id={`slot-${index}`}>
                        {placedPiece && (
                          <PuzzlePiece
                            id={placedPiece.id}
                            row={row}
                            col={col}
                            totalRows={GRID_ROWS}
                            totalCols={GRID_COLS}
                            isPlaced={true}
                            imageUrl={imageUrl}
                          />
                        )}
                      </DroppableSlot>
                    );
                  })}
                </PuzzleBoard>
              </div>

              {/* Available Pieces */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-bold text-amber-300 mb-4">
                  Mảnh ghép chưa đặt
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {pieces
                    .filter(p => !p.isPlaced)
                    .map(piece => (
                      <PuzzlePiece
                        key={`available-${piece.id}`}
                        id={piece.id}
                        row={piece.correctPosition.row}
                        col={piece.correctPosition.col}
                        totalRows={GRID_ROWS}
                        totalCols={GRID_COLS}
                        isPlaced={false}
                        imageUrl={imageUrl}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          <DragOverlay>
            {activePiece && (
              <PuzzlePiece
                id={activePiece.id}
                row={activePiece.correctPosition.row}
                col={activePiece.correctPosition.col}
                totalRows={GRID_ROWS}
                totalCols={GRID_COLS}
                isPlaced={false}
                imageUrl={imageUrl}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
