'use client';

import { Clock, Pause, Play, HelpCircle, Star } from 'lucide-react';
import { useTimer } from '../hooks/useTimer';

interface GameHeaderProps {
  stage: number;
  collectedPieces: number;
  totalPieces: number;
  correctAnswers: number;
  wrongAnswers: number;
  onPause: () => void;
  onShowInstructions: () => void;
}

export default function GameHeader({
  stage,
  collectedPieces,
  totalPieces,
  correctAnswers,
  wrongAnswers,
  onPause,
  onShowInstructions,
}: GameHeaderProps) {
  const { formattedTime, isPaused, pause, resume } = useTimer();

  const handlePauseToggle = () => {
    if (isPaused) {
      resume();
    } else {
      pause();
      onPause();
    }
  };

  const stageName = stage === 1 ? 'Trắc nghiệm' : stage === 2 ? 'Điền từ' : 'Ghép hình';

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-amber-900/90 to-amber-800/90 backdrop-blur-md border-b-2 border-amber-500/30 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
            <div>
              <h2 className="text-amber-300 font-bold text-lg">Màn {stage}: {stageName}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/20">
              <Clock className="w-5 h-5 text-amber-300" />
              <span className="text-white font-mono font-bold">{formattedTime}</span>
            </div>

            <button
              onClick={handlePauseToggle}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
              aria-label={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? (
                <Play className="w-5 h-5 text-white" />
              ) : (
                <Pause className="w-5 h-5 text-white" />
              )}
            </button>

            <button
              onClick={onShowInstructions}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
              aria-label="Instructions"
            >
              <HelpCircle className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/90">
              Mảnh ghép: {collectedPieces}/{totalPieces}
            </span>
            <span className="text-white/90">
              Đúng: <span className="text-green-300 font-bold">{correctAnswers}</span> |
              Sai: <span className="text-red-300 font-bold">{wrongAnswers}</span>
            </span>
          </div>

          <div className="w-full bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-white/30">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500 ease-out shadow-lg"
              style={{ width: `${(collectedPieces / totalPieces) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
