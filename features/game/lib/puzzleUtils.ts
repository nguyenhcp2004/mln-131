import { PuzzlePiece } from '@/types/game';

export const GRID_ROWS = 3;
export const GRID_COLS = 6;
export const TOTAL_PIECES = GRID_ROWS * GRID_COLS; // 18

export function calculatePiecePosition(pieceId: number): { row: number; col: number } {
  const row = Math.floor(pieceId / GRID_COLS);
  const col = pieceId % GRID_COLS;
  return { row, col };
}

export function generatePuzzlePieces(collectedPieceIds: number[]): PuzzlePiece[] {
  const pieces: PuzzlePiece[] = [];
  
  collectedPieceIds.forEach((id) => {
    const { row, col } = calculatePiecePosition(id);
    
    // Generate random initial position outside the board
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    
    pieces.push({
      id,
      position: { x: randomX, y: randomY },
      correctPosition: { row, col },
      isPlaced: false,
    });
  });
  
  // Shuffle pieces
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
  }
  
  return pieces;
}

export function checkPiecePlacement(
  pieceId: number,
  dropRow: number,
  dropCol: number
): boolean {
  const { row, col } = calculatePiecePosition(pieceId);
  return row === dropRow && col === dropCol;
}

export function getGridPosition(index: number): { row: number; col: number } {
  const row = Math.floor(index / GRID_COLS);
  const col = index % GRID_COLS;
  return { row, col };
}
