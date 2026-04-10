import React, { useState } from 'react';
import { CaseStudyQuestion, CaseStudySubQuestion } from '../../types';
import { learnLinks } from '../../data/learnLinks';

interface Props {
  question: CaseStudyQuestion;
  answer: Record<string, any> | null;
  onAnswer: (answer: Record<string, any>) => void;
  reviewMode: boolean;
}

export default function CaseStudy({ question, answer, onAnswer, reviewMode }: Props) {
  const answers = answer || {};
  const [activeTab, setActiveTab] = useState(0);

  const updateSubAnswer = (subId: string, value: any) => {
    if (reviewMode) return;
    onAnswer({ ...answers, [subId]: value });
  };

  const renderSubQuestion = (sq: CaseStudySubQuestion, idx: number) => {
    const subAnswer = answers[sq.id];

    if (sq.type === 'single-choice') {
      const letters = 'ABCDEFGH';
      return (
        <div>
          <div className="question-stem" style={{ fontSize: 14 }}>{sq.stem}</div>
          <div className="options-list">
            {sq.options?.map((opt, i) => {
              let className = 'option-item';
              if (subAnswer === opt.id) className += ' selected';
              if (reviewMode) {
                if (opt.id === sq.correctOptionId) className += ' correct';
                else if (subAnswer === opt.id && opt.id !== sq.correctOptionId) className += ' incorrect';
              }
              return (
                <div key={opt.id} className={className} onClick={() => updateSubAnswer(sq.id, opt.id)}>
                  <span className="option-letter">{letters[i]}</span>
                  <span className="option-text">{opt.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (sq.type === 'multiple-choice') {
      const selected = Array.isArray(subAnswer) ? subAnswer : [];
      const letters = 'ABCDEFGH';
      return (
        <div>
          <div className="question-stem" style={{ fontSize: 14 }}>{sq.stem}</div>
          <div className="multi-hint">Select {sq.requiredSelections} answer(s)</div>
          <div className="options-list">
            {sq.options?.map((opt, i) => {
              let className = 'option-item';
              if (selected.includes(opt.id)) className += ' selected';
              if (reviewMode) {
                if (sq.correctOptionIds?.includes(opt.id)) className += ' correct';
                else if (selected.includes(opt.id)) className += ' incorrect';
              }
              return (
                <div
                  key={opt.id}
                  className={className}
                  onClick={() => {
                    if (reviewMode) return;
                    if (selected.includes(opt.id)) {
                      updateSubAnswer(sq.id, selected.filter((id: string) => id !== opt.id));
                    } else {
                      updateSubAnswer(sq.id, [...selected, opt.id]);
                    }
                  }}
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

    if (sq.type === 'yes-no') {
      const selections = typeof subAnswer === 'object' && subAnswer !== null ? subAnswer : {};
      return (
        <div>
          <div className="question-stem" style={{ fontSize: 14 }}>{sq.stem}</div>
          <table className="yesno-table">
            <thead>
              <tr><th>Statement</th><th style={{ width: 80 }}>Yes</th><th style={{ width: 80 }}>No</th></tr>
            </thead>
            <tbody>
              {sq.statements?.map(stmt => {
                const sel = selections[stmt.id];
                let rowClass = '';
                if (reviewMode && sel !== undefined) {
                  rowClass = sel === stmt.correct ? 'correct-row' : 'incorrect-row';
                }
                return (
                  <tr key={stmt.id} className={rowClass}>
                    <td>
                      {stmt.text}
                      {reviewMode && sel !== stmt.correct && (
                        <span style={{ fontSize: 12, color: 'var(--ms-green)', marginLeft: 8 }}>
                          (Correct: {stmt.correct ? 'Yes' : 'No'})
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="radio"
                        className="yesno-radio"
                        name={`cs-${sq.id}-${stmt.id}`}
                        checked={sel === true}
                        onChange={() => {
                          if (reviewMode) return;
                          updateSubAnswer(sq.id, { ...selections, [stmt.id]: true });
                        }}
                        disabled={reviewMode}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        className="yesno-radio"
                        name={`cs-${sq.id}-${stmt.id}`}
                        checked={sel === false}
                        onChange={() => {
                          if (reviewMode) return;
                          updateSubAnswer(sq.id, { ...selections, [stmt.id]: false });
                        }}
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

    if (sq.type === 'dropdown') {
      const selections = typeof subAnswer === 'object' && subAnswer !== null ? subAnswer : {};
      return (
        <div>
          <div className="question-stem" style={{ fontSize: 14 }}>{sq.stem}</div>
          <div className="dropdown-segment" style={{ fontSize: 14, lineHeight: 2.4 }}>
            {sq.segments?.map((seg, i) => {
              if (seg.type === 'text') return <span key={i}>{seg.text}</span>;
              const sel = selections[seg.id] || '';
              let selectClass = '';
              if (reviewMode) {
                selectClass = sel === seg.correctOption ? 'correct' : 'incorrect';
              }
              return (
                <React.Fragment key={i}>
                  <select
                    className={selectClass}
                    value={sel}
                    onChange={e => {
                      if (reviewMode) return;
                      updateSubAnswer(sq.id, { ...selections, [seg.id]: e.target.value });
                    }}
                    disabled={reviewMode}
                  >
                    <option value="">-- Select --</option>
                    {seg.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {reviewMode && sel !== seg.correctOption && (
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

    return null;
  };

  return (
    <div>
      <div className="case-study-scenario">{question.scenario}</div>

      <div className="case-study-tabs">
        {question.subQuestions.map((sq, i) => (
          <button
            key={sq.id}
            className={`case-study-tab ${activeTab === i ? 'active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            Question {i + 1}
          </button>
        ))}
      </div>

      {renderSubQuestion(question.subQuestions[activeTab], activeTab)}

      {reviewMode && question.subQuestions[activeTab].explanation && (
        <div className="explanation-box" style={{ marginTop: 16 }}>
          <strong>Explanation:</strong> {question.subQuestions[activeTab].explanation}
          {learnLinks[question.bulletPoint] && (
            <div className="learn-link">
              <a href={learnLinks[question.bulletPoint]} target="_blank" rel="noopener noreferrer">
                Learn more: {question.bulletPoint}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
