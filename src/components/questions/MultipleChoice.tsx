import React from 'react';
import { MultipleChoiceQuestion } from '../../types';

interface Props {
  question: MultipleChoiceQuestion;
  answer: string[] | null;
  onAnswer: (answer: string[]) => void;
  reviewMode: boolean;
}

export default function MultipleChoice({ question, answer, onAnswer, reviewMode }: Props) {
  const selected = answer || [];
  const letters = 'ABCDEFGH';

  const toggle = (optId: string) => {
    if (reviewMode) return;
    if (selected.includes(optId)) {
      onAnswer(selected.filter(id => id !== optId));
    } else {
      onAnswer([...selected, optId]);
    }
  };

  return (
    <div>
      <div className="question-stem">{question.stem}</div>
      <div className="multi-hint">
        Select {question.requiredSelections} answer(s)
      </div>
      <div className="options-list">
        {question.options.map((opt, i) => {
          let className = 'option-item';
          if (selected.includes(opt.id)) className += ' selected';
          if (reviewMode) {
            if (question.correctOptionIds.includes(opt.id)) className += ' correct';
            else if (selected.includes(opt.id)) className += ' incorrect';
          }

          return (
            <div key={opt.id} className={className} onClick={() => toggle(opt.id)}>
              <span className="option-letter">{letters[i]}</span>
              <span className="option-text">{opt.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
