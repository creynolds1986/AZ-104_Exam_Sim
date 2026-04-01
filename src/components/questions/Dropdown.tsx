import React from 'react';
import { DropdownQuestion } from '../../types';

interface Props {
  question: DropdownQuestion;
  answer: Record<string, string> | null;
  onAnswer: (answer: Record<string, string>) => void;
  reviewMode: boolean;
}

export default function Dropdown({ question, answer, onAnswer, reviewMode }: Props) {
  const selections = answer || {};

  const handleChange = (dropdownId: string, value: string) => {
    if (reviewMode) return;
    onAnswer({ ...selections, [dropdownId]: value });
  };

  return (
    <div>
      <div className="question-stem">{question.stem}</div>
      <div className="dropdown-segment" style={{ fontSize: 15, lineHeight: 2.4 }}>
        {question.segments.map((seg, i) => {
          if (seg.type === 'text') {
            return <span key={i}>{seg.text}</span>;
          }
          const selected = selections[seg.id] || '';
          let selectClass = '';
          if (reviewMode) {
            selectClass = selected === seg.correctOption ? 'correct' : 'incorrect';
          }

          return (
            <React.Fragment key={i}>
              <select
                className={selectClass}
                value={selected}
                onChange={e => handleChange(seg.id, e.target.value)}
                disabled={reviewMode}
              >
                <option value="">-- Select --</option>
                {seg.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {reviewMode && selected !== seg.correctOption && (
                <span style={{ fontSize: 12, color: 'var(--ms-green)', marginLeft: 4 }}>
                  (Correct: {seg.correctOption})
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
