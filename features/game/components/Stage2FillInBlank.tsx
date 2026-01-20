'use client';

import { useState, useEffect } from 'react';
import { Question, FeedbackType } from '@/types/game';
import QuestionCard from './QuestionCard';
import AnswerFeedback from './AnswerFeedback';

interface Stage2Props {
  question: Question;
  onAnswer: (answer: string) => FeedbackType;
  onNext: () => void;
  attempts: number;
}

export default function Stage2FillInBlank({ question, onAnswer, onNext, attempts }: Stage2Props) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    // Reset state when question changes
    setAnswer('');
    setFeedback(null);
    setIsDisabled(false);
    setShowCorrectAnswer(false);
  }, [question.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || isDisabled) return;

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
          setAnswer('');
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-[140px]">
      <div className="w-full max-w-3xl">
        <QuestionCard question={question.content} questionNumber={question.id}>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={isDisabled}
                placeholder="Nhập đáp án..."
                className="w-full p-4 text-lg bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/50 disabled:bg-white/10 disabled:cursor-not-allowed text-white placeholder:text-white/50 transition-all"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={!answer.trim() || isDisabled}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Xác nhận
            </button>
          </form>

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
