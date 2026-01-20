'use client';

import { ReactNode } from 'react';

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  children: ReactNode;
}

export default function QuestionCard({ question, questionNumber, children }: QuestionCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-amber-500/30">
      <div className="mb-6">


        <h3 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
          {question}
        </h3>
      </div>

      {children}
    </div>
  );
}
