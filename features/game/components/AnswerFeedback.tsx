'use client';

import { CheckCircle, XCircle } from 'lucide-react';
import { FeedbackType } from '@/types/game';

interface AnswerFeedbackProps {
  type: FeedbackType;
  correctAnswer?: string;
}

export default function AnswerFeedback({ type, correctAnswer }: AnswerFeedbackProps) {
  if (!type) return null;

  return (
    <div className="mt-4">
      {type === 'correct' ? (
        <div className="flex items-center gap-3 bg-green-500/20 backdrop-blur-sm border-2 border-green-500 rounded-xl p-4">
          <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
          <div>
            <p className="text-green-200 font-bold">Chính xác!</p>
            <p className="text-green-300 text-sm">Bạn đã nhận được một mảnh ghép</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-red-500/20 backdrop-blur-sm border-2 border-red-500 rounded-xl p-4">
          <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-200 font-bold">Chưa đúng!</p>
            {correctAnswer && (
              <p className="text-red-300 text-sm mt-1">
                Đáp án đúng: <span className="font-semibold">{correctAnswer}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
