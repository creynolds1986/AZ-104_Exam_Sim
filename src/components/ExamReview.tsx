import React, { useState, useMemo } from 'react';
import { Question, UserAnswer, Section, SectionScore } from '../types';
import QuestionDisplay from './QuestionDisplay';

interface Props {
  questions: Question[];
  answers: UserAnswer[];
  sections: Section[];
  onNewExam: () => void;
  onViewHistory: () => void;
}

export default function ExamReview({ questions, answers, sections, onNewExam, onViewHistory }: Props) {
  const [showQuestions, setShowQuestions] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const results = useMemo(() => {
    let correct = 0;
    const sectionMap = new Map<string, { correct: number; total: number }>();

    questions.forEach((q, i) => {
      const isCorrect = isAnswerCorrect(q, answers[i]?.answer);
      if (isCorrect) correct++;

      const entry = sectionMap.get(q.sectionId) || { correct: 0, total: 0 };
      entry.total++;
      if (isCorrect) entry.correct++;
      sectionMap.set(q.sectionId, entry);
    });

    const scorePercent = Math.round((correct / questions.length) * 100);
    const scaledScore = Math.round((correct / questions.length) * 1000);
    const passed = scorePercent >= 70;

    const sectionScores: SectionScore[] = sections
      .filter(s => sectionMap.has(s.id))
      .map(s => {
        const data = sectionMap.get(s.id)!;
        return {
          sectionId: s.id,
          sectionTitle: s.title,
          correct: data.correct,
          total: data.total,
          percent: Math.round((data.correct / data.total) * 100),
        };
      });

    return { correct, total: questions.length, scorePercent, scaledScore, passed, sectionScores };
  }, [questions, answers, sections]);

  if (showQuestions) {
    const q = questions[reviewIndex];
    const a = answers[reviewIndex];
    return (
      <div className="review-container">
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button className="nav-btn" onClick={() => setShowQuestions(false)}>← Back to Summary</button>
        </div>
        <div className="review-question">
          <div className="review-question-header">
            <span className={`review-badge ${isAnswerCorrect(q, a?.answer) ? 'correct' : 'incorrect'}`}>
              {isAnswerCorrect(q, a?.answer) ? '✓' : '✗'}
            </span>
            <span style={{ fontWeight: 600 }}>Question {reviewIndex + 1}</span>
          </div>
          <QuestionDisplay
            question={q}
            questionNumber={reviewIndex + 1}
            totalQuestions={questions.length}
            answer={a?.answer}
            flagged={false}
            onAnswer={() => {}}
            onToggleFlag={() => {}}
            reviewMode={true}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <button className="nav-btn" disabled={reviewIndex === 0} onClick={() => setReviewIndex(reviewIndex - 1)}>
            ← Previous
          </button>
          <button className="nav-btn" disabled={reviewIndex === questions.length - 1} onClick={() => setReviewIndex(reviewIndex + 1)}>
            Next →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-container">
      <div className="score-card">
        <div className="score-label">Your Score</div>
        <div className={`score-big ${results.passed ? 'pass' : 'fail'}`}>
          {results.scaledScore}
        </div>
        <div className="score-detail">
          {results.correct} of {results.total} correct ({results.scorePercent}%)
        </div>
        <div className={`pass-badge ${results.passed ? 'pass' : 'fail'}`}>
          {results.passed ? 'PASSED' : 'FAILED'}
        </div>
        <div className="score-detail" style={{ marginTop: 8 }}>
          Passing score: 700 / 1000 (70%)
        </div>
      </div>

      <div className="section-breakdown">
        <h3>Section Breakdown</h3>
        {results.sectionScores.map(ss => (
          <div key={ss.sectionId} className="breakdown-bar">
            <div className="breakdown-label">
              <span>{ss.sectionTitle}</span>
              <span>{ss.correct}/{ss.total} ({ss.percent}%)</span>
            </div>
            <div className="breakdown-track">
              <div
                className={`breakdown-fill ${ss.percent >= 70 ? 'pass' : 'fail'}`}
                style={{ width: `${ss.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button className="nav-btn btn-primary" onClick={() => setShowQuestions(true)}>
          Review All Questions
        </button>
        <button className="nav-btn" onClick={onNewExam}>New Exam</button>
        <button className="nav-btn" onClick={onViewHistory}>View History</button>
      </div>

      {/* Quick overview of all questions */}
      <div className="section-breakdown">
        <h3>Question Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))', gap: 6 }}>
          {questions.map((q, i) => {
            const correct = isAnswerCorrect(q, answers[i]?.answer);
            return (
              <button
                key={i}
                onClick={() => { setReviewIndex(i); setShowQuestions(true); }}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'white',
                  background: correct ? 'var(--ms-green)' : 'var(--ms-red)',
                  cursor: 'pointer',
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function isAnswerCorrect(q: Question, answer: any): boolean {
  if (answer === null || answer === undefined) return false;
  switch (q.type) {
    case 'single-choice': return answer === q.correctOptionId;
    case 'multiple-choice': {
      if (!Array.isArray(answer)) return false;
      const s1 = [...answer].sort();
      const s2 = [...q.correctOptionIds].sort();
      return s1.length === s2.length && s1.every((v, i) => v === s2[i]);
    }
    case 'drag-drop': return q.targets.every(t => answer?.[t.id] === t.correctItemId);
    case 'dropdown':
      return q.segments
        .filter((s): s is { type: 'dropdown'; id: string; options: string[]; correctOption: string } => s.type === 'dropdown')
        .every(s => answer?.[s.id] === s.correctOption);
    case 'yes-no': return q.statements.every(s => answer?.[s.id] === s.correct);
    case 'case-study':
      return q.subQuestions.every(sq => {
        const sa = answer?.[sq.id];
        if (sa === null || sa === undefined) return false;
        if (sq.type === 'single-choice') return sa === sq.correctOptionId;
        if (sq.type === 'multiple-choice') {
          if (!Array.isArray(sa) || !sq.correctOptionIds) return false;
          const a = [...sa].sort(), b = [...sq.correctOptionIds].sort();
          return a.length === b.length && a.every((v, i) => v === b[i]);
        }
        if (sq.type === 'yes-no') return sq.statements?.every(s => sa?.[s.id] === s.correct) ?? false;
        if (sq.type === 'dropdown')
          return sq.segments
            ?.filter((s): s is { type: 'dropdown'; id: string; options: string[]; correctOption: string } => s.type === 'dropdown')
            .every(s => sa?.[s.id] === s.correctOption) ?? false;
        return false;
      });
    default: return false;
  }
}
