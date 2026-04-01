import React, { useEffect, useState } from 'react';
import { AttemptDetail, Question, Section, SectionScore } from '../types';
import QuestionDisplay from './QuestionDisplay';

interface Props {
  attemptId: number;
  questions: Question[];
  sections: Section[];
  onBack: () => void;
}

export default function HistoryDetail({ attemptId, questions, sections, onBack }: Props) {
  const [attempt, setAttempt] = useState<AttemptDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/history/${attemptId}`)
      .then(r => r.json())
      .then(data => { setAttempt(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [attemptId]);

  if (loading || !attempt) {
    return <div className="review-container"><p>Loading...</p></div>;
  }

  const sectionMap = new Map<string, { correct: number; total: number }>();
  attempt.answers.forEach(a => {
    const entry = sectionMap.get(a.sectionId) || { correct: 0, total: 0 };
    entry.total++;
    if (a.isCorrect) entry.correct++;
    sectionMap.set(a.sectionId, entry);
  });

  const sectionScores: SectionScore[] = sections
    .filter(s => sectionMap.has(s.id))
    .map(s => {
      const data = sectionMap.get(s.id)!;
      return { sectionId: s.id, sectionTitle: s.title, correct: data.correct, total: data.total, percent: Math.round((data.correct / data.total) * 100) };
    });

  if (reviewIndex !== null) {
    const ans = attempt.answers[reviewIndex];
    const q = questions.find(q => q.id === ans.questionId);
    if (!q) return null;

    return (
      <div className="review-container">
        <button className="nav-btn" onClick={() => setReviewIndex(null)} style={{ marginBottom: 16 }}>← Back to Summary</button>
        <div className="review-question">
          <div className="review-question-header">
            <span className={`review-badge ${ans.isCorrect ? 'correct' : 'incorrect'}`}>
              {ans.isCorrect ? '✓' : '✗'}
            </span>
            <span style={{ fontWeight: 600 }}>Question {reviewIndex + 1}</span>
          </div>
          <QuestionDisplay
            question={q}
            questionNumber={reviewIndex + 1}
            totalQuestions={attempt.answers.length}
            answer={ans.userAnswer}
            flagged={false}
            onAnswer={() => {}}
            onToggleFlag={() => {}}
            reviewMode={true}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <button className="nav-btn" disabled={reviewIndex === 0} onClick={() => setReviewIndex(reviewIndex - 1)}>← Previous</button>
          <button className="nav-btn" disabled={reviewIndex === attempt.answers.length - 1} onClick={() => setReviewIndex(reviewIndex + 1)}>Next →</button>
        </div>
      </div>
    );
  }

  const scaledScore = Math.round((attempt.correctAnswers / attempt.totalQuestions) * 1000);
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const formatTime = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

  return (
    <div className="review-container">
      <button className="nav-btn" onClick={onBack} style={{ marginBottom: 16 }}>← Back to History</button>

      <div className="score-card">
        <div className="score-detail">{formatDate(attempt.startedAt)} | Time: {formatTime(attempt.timeTakenSeconds)}</div>
        <div className="score-label" style={{ marginTop: 8 }}>Score</div>
        <div className={`score-big ${attempt.passed ? 'pass' : 'fail'}`}>{scaledScore}</div>
        <div className="score-detail">{attempt.correctAnswers} of {attempt.totalQuestions} correct ({attempt.scorePercent}%)</div>
        <div className={`pass-badge ${attempt.passed ? 'pass' : 'fail'}`}>{attempt.passed ? 'PASSED' : 'FAILED'}</div>
      </div>

      <div className="section-breakdown">
        <h3>Section Breakdown</h3>
        {sectionScores.map(ss => (
          <div key={ss.sectionId} className="breakdown-bar">
            <div className="breakdown-label">
              <span>{ss.sectionTitle}</span>
              <span>{ss.correct}/{ss.total} ({ss.percent}%)</span>
            </div>
            <div className="breakdown-track">
              <div className={`breakdown-fill ${ss.percent >= 70 ? 'pass' : 'fail'}`} style={{ width: `${ss.percent}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="section-breakdown">
        <h3>Question Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))', gap: 6 }}>
          {attempt.answers.map((a, i) => (
            <button
              key={i}
              onClick={() => setReviewIndex(i)}
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
                background: a.isCorrect ? 'var(--ms-green)' : 'var(--ms-red)',
                cursor: 'pointer',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
