import express from 'express';
import cors from 'cors';
import { getDb } from './db';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Submit an exam attempt
app.post('/api/exam/submit', (req, res) => {
  const db = getDb();
  const { startedAt, completedAt, sections, totalQuestions, correctAnswers, scorePercent, passed, timeTakenSeconds, answers } = req.body;

  const insertAttempt = db.prepare(`
    INSERT INTO attempts (started_at, completed_at, sections, total_questions, correct_answers, score_percent, passed, time_taken_seconds)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertAnswer = db.prepare(`
    INSERT INTO attempt_answers (attempt_id, question_id, section_id, user_answer, correct_answer, is_correct, time_spent_seconds)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const transaction = db.transaction(() => {
    const result = insertAttempt.run(
      startedAt, completedAt, JSON.stringify(sections), totalQuestions, correctAnswers, scorePercent, passed ? 1 : 0, timeTakenSeconds
    );
    const attemptId = result.lastInsertRowid;

    for (const ans of answers) {
      insertAnswer.run(
        attemptId, ans.questionId, ans.sectionId,
        JSON.stringify(ans.userAnswer), JSON.stringify(ans.correctAnswer),
        ans.isCorrect ? 1 : 0, ans.timeSpent
      );
    }

    return attemptId;
  });

  const attemptId = transaction();
  res.json({ id: attemptId });
});

// Get all attempts
app.get('/api/history', (_req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM attempts ORDER BY started_at DESC').all() as any[];
  const attempts = rows.map(r => ({
    id: r.id,
    startedAt: r.started_at,
    completedAt: r.completed_at,
    sections: JSON.parse(r.sections),
    totalQuestions: r.total_questions,
    correctAnswers: r.correct_answers,
    scorePercent: r.score_percent,
    passed: r.passed === 1,
    timeTakenSeconds: r.time_taken_seconds,
  }));
  res.json(attempts);
});

// Get a specific attempt with answers
app.get('/api/history/:id', (req, res) => {
  const db = getDb();
  const attempt = db.prepare('SELECT * FROM attempts WHERE id = ?').get(Number(req.params.id)) as any;
  if (!attempt) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  const answers = db.prepare('SELECT * FROM attempt_answers WHERE attempt_id = ? ORDER BY id').all(Number(req.params.id)) as any[];

  res.json({
    id: attempt.id,
    startedAt: attempt.started_at,
    completedAt: attempt.completed_at,
    sections: JSON.parse(attempt.sections),
    totalQuestions: attempt.total_questions,
    correctAnswers: attempt.correct_answers,
    scorePercent: attempt.score_percent,
    passed: attempt.passed === 1,
    timeTakenSeconds: attempt.time_taken_seconds,
    answers: answers.map(a => ({
      questionId: a.question_id,
      sectionId: a.section_id,
      userAnswer: JSON.parse(a.user_answer),
      correctAnswer: JSON.parse(a.correct_answer),
      isCorrect: a.is_correct === 1,
      timeSpent: a.time_spent_seconds,
    })),
  });
});

// Delete an attempt
app.delete('/api/history/:id', (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM attempt_answers WHERE attempt_id = ?').run(Number(req.params.id));
  db.prepare('DELETE FROM attempts WHERE id = ?').run(Number(req.params.id));
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AZ-104 Exam API running on http://localhost:${PORT}`);
});
