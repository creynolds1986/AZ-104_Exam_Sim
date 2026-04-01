import React, { useEffect, useState } from 'react';
import { AttemptSummary } from '../types';

interface Props {
  onViewAttempt: (id: number) => void;
  onNewExam: () => void;
}

export default function History({ onViewAttempt, onNewExam }: Props) {
  const [attempts, setAttempts] = useState<AttemptSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/history')
      .then(r => r.json())
      .then(data => { setAttempts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  if (loading) {
    return <div className="history-container"><p>Loading...</p></div>;
  }

  return (
    <div className="history-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600 }}>Exam History</h2>
        <button className="nav-btn btn-primary" onClick={onNewExam}>New Exam</button>
      </div>

      {attempts.length > 0 && (
        <div className="trend-chart">
          <h3>Score Trend</h3>
          <svg className="trend-svg" viewBox={`0 0 ${Math.max(attempts.length * 80, 400)} 200`}>
            {/* Pass line */}
            <line x1="0" y1={200 - 70 * 2} x2="100%" y2={200 - 70 * 2} stroke="#107c10" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
            <text x="5" y={200 - 70 * 2 - 5} fill="#107c10" fontSize="11">70% Pass</text>

            {/* Score points & lines */}
            {[...attempts].reverse().map((a, i, arr) => {
              const x = 40 + i * 70;
              const y = 200 - (a.scorePercent / 100) * 180 - 10;
              const prevX = 40 + (i - 1) * 70;
              const prevY = i > 0 ? 200 - (arr[i - 1].scorePercent / 100) * 180 - 10 : y;

              return (
                <g key={a.id}>
                  {i > 0 && <line x1={prevX} y1={prevY} x2={x} y2={y} stroke="#0078d4" strokeWidth="2" />}
                  <circle cx={x} cy={y} r="5" fill={a.passed ? '#107c10' : '#d13438'} stroke="white" strokeWidth="2" />
                  <text x={x} y={y - 10} textAnchor="middle" fill="#323130" fontSize="11" fontWeight="600">{a.scorePercent}%</text>
                  <text x={x} y="198" textAnchor="middle" fill="#a19f9d" fontSize="9">
                    #{[...attempts].reverse().indexOf(a) + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {attempts.length === 0 ? (
        <div className="empty-state">
          <h3>No exam attempts yet</h3>
          <p>Complete a practice exam to see your results here.</p>
        </div>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Score</th>
              <th>Result</th>
              <th>Questions</th>
              <th>Time</th>
              <th>Sections</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a, i) => (
              <tr key={a.id} onClick={() => onViewAttempt(a.id)}>
                <td>{attempts.length - i}</td>
                <td>{formatDate(a.startedAt)}</td>
                <td style={{ fontWeight: 600 }}>{a.scorePercent}%</td>
                <td><span className={a.passed ? 'status-pass' : 'status-fail'}>{a.passed ? 'PASS' : 'FAIL'}</span></td>
                <td>{a.correctAnswers}/{a.totalQuestions}</td>
                <td>{formatTime(a.timeTakenSeconds)}</td>
                <td style={{ fontSize: 12 }}>{a.sections.length} section(s)</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
