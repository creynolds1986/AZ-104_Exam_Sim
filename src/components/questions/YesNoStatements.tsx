import React from 'react';
import { YesNoQuestion } from '../../types';

interface Props {
  question: YesNoQuestion;
  answer: Record<string, boolean> | null;
  onAnswer: (answer: Record<string, boolean>) => void;
  reviewMode: boolean;
}

export default function YesNoStatements({ question, answer, onAnswer, reviewMode }: Props) {
  const selections = answer || {};

  const handleSelect = (statementId: string, value: boolean) => {
    if (reviewMode) return;
    onAnswer({ ...selections, [statementId]: value });
  };

  return (
    <div>
      <div className="yesno-scenario">{question.scenario}</div>
      <table className="yesno-table">
        <thead>
          <tr>
            <th>Statement</th>
            <th style={{ width: 80 }}>Yes</th>
            <th style={{ width: 80 }}>No</th>
          </tr>
        </thead>
        <tbody>
          {question.statements.map(stmt => {
            const selected = selections[stmt.id];
            let rowClass = '';
            if (reviewMode && selected !== undefined) {
              rowClass = selected === stmt.correct ? 'correct-row' : 'incorrect-row';
            }

            return (
              <tr key={stmt.id} className={rowClass}>
                <td>
                  {stmt.text}
                  {reviewMode && selected !== stmt.correct && (
                    <span style={{ fontSize: 12, color: 'var(--ms-green)', marginLeft: 8 }}>
                      (Correct: {stmt.correct ? 'Yes' : 'No'})
                    </span>
                  )}
                </td>
                <td>
                  <input
                    type="radio"
                    className="yesno-radio"
                    name={`yesno-${stmt.id}`}
                    checked={selected === true}
                    onChange={() => handleSelect(stmt.id, true)}
                    disabled={reviewMode}
                  />
                </td>
                <td>
                  <input
                    type="radio"
                    className="yesno-radio"
                    name={`yesno-${stmt.id}`}
                    checked={selected === false}
                    onChange={() => handleSelect(stmt.id, false)}
                    disabled={reviewMode}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
