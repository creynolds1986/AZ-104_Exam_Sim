import React from 'react';
import { SingleChoiceQuestion } from '../../types';

interface Props {
  question: SingleChoiceQuestion;
  answer: string | null;
  onAnswer: (answer: string) => void;
  reviewMode: boolean;
}

export default function SingleChoice({ question, answer, onAnswer, reviewMode }: Props) {
  const letters = 'ABCDEFGH';

  return (
    <div>
      <div className="question-stem">{question.stem}</div>
      <div className="options-list">
        {question.options.map((opt, i) => {
          let className = 'option-item';
          if (answer === opt.id) className += ' selected';
          if (reviewMode) {
            if (opt.id === question.correctOptionId) className += ' correct';
            else if (answer === opt.id && opt.id !== question.correctOptionId) className += ' incorrect';
          }

          return (
            <div
              key={opt.id}
              className={className}
              onClick={() => !reviewMode && onAnswer(opt.id)}
            >
              <span className="option-letter">{letters[i]}</span>
              <span className="option-text">{opt.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
