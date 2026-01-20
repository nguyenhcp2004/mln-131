export interface Question {
  id: number;
  content: string;
  type: 'MC' | 'text';
  options?: string[];
  correct_answer: string;
}

export interface GameProgress {
  stage: number;
  questionIndex: number;
  collectedPieces: number[];
  correctAnswers: number;
  wrongAnswers: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  time: number; // in seconds
  date: string;
  timestamp: number;
}

export interface PuzzlePiece {
  id: number;
  position: { x: number; y: number };
  correctPosition: { row: number; col: number };
  isPlaced: boolean;
}

export interface GameState {
  stage: 'welcome' | 1 | 2 | 3 | 'victory';
  currentQuestionIndex: number;
  selectedQuestions: Question[];
  collectedPieces: number[];
  attempts: number;
  correctAnswers: number;
  wrongAnswers: number;
  timer: number;
  isPaused: boolean;
  isTimerRunning: boolean;
  selectedImageId: number; // 1-16 for random puzzle image
}

export type FeedbackType = 'correct' | 'wrong' | null;
