'use client';

import { useState, useEffect } from 'react';
import { Question, FeedbackType } from '@/types/game';
import QuestionCard from './QuestionCard';
import AnswerFeedback from './AnswerFeedback';

interface Stage1Props {
  question: Question;
  onAnswer: (answer: string) => FeedbackType;
  onNext: () => void;
  attempts: number;
}

export default function Stage1MultipleChoice({ question, onAnswer, onNext, attempts }: Stage1Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setFeedback(null);
    setIsDisabled(false);
    setShowCorrectAnswer(false);
  }, [question.id]);

  const handleAnswerClick = (answer: string) => {
    if (isDisabled) return;

    setSelectedAnswer(answer);
    setIsDisabled(true);

    const result = onAnswer(answer);
    setFeedback(result);

    if (result === 'correct') {
      // Auto advance after 1.5 seconds
      setTimeout(() => {
        onNext();
      }, 1500);
    } else {
      // Check current attempts (will be incremented after onAnswer)
      const currentAttempts = attempts + 1;

      // Allow retry after 1 second if attempts < 2
      setTimeout(() => {
        if (currentAttempts < 2) {
          setIsDisabled(false);
          setSelectedAnswer(null);
          setFeedback(null);
        } else {
          // Show correct answer and move on after 2 seconds
          setShowCorrectAnswer(true);
          setTimeout(() => {
            onNext();
          }, 2000);
        }
      }, 1000);
    }
  };

  const getButtonClass = (option: string) => {
    const baseClass = 'w-full text-left p-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2';

    if (!selectedAnswer) {
      return `${baseClass} bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 hover:border-amber-400 hover:scale-102`;
    }

    if (option === selectedAnswer) {
      if (feedback === 'correct') {
        return `${baseClass} bg-green-500 text-white border-green-600 scale-105 shadow-lg shadow-green-500/50`;
      } else if (feedback === 'wrong') {
        return `${baseClass} bg-red-500 text-white border-red-600 animate-shake`;
      }
    }

    // Show correct answer after 2 failed attempts
    if (showCorrectAnswer && option === question.correct_answer) {
      return `${baseClass} bg-green-500 text-white border-green-600 shadow-lg shadow-green-500/50`;
    }

    return `${baseClass} bg-white/10 border-white/20 opacity-50 text-white/70`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-[140px]">
      <div className="w-full max-w-3xl">
        <QuestionCard question={question.content} questionNumber={question.id}>
          <div className="space-y-3 mt-6">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option.charAt(0))}
                disabled={isDisabled}
                className={getButtonClass(option.charAt(0))}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && (
            <AnswerFeedback
              type={feedback}
              correctAnswer={showCorrectAnswer ? question.correct_answer : undefined}
            />
          )}
        </QuestionCard>
      </div>
    </div>
  );
}
