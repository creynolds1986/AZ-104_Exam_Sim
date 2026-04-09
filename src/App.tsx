import React, { useState, useCallback, useEffect } from 'react';
import { ExamPhase, Question, UserAnswer, AttemptSummary, AttemptDetail, SectionScore } from './types';
import { sections } from './data/sections';
import { getAllQuestions } from './data/questions';
import ExamSetup from './components/ExamSetup';
import ExamRunner from './components/ExamRunner';
import ExamReview from './components/ExamReview';
import History from './components/History';
import HistoryDetail from './components/HistoryDetail';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function parseWeight(weight: string): number {
  // Parse "20-25%" → midpoint 22.5
  const match = weight.match(/(\d+)-(\d+)/);
  if (match) return (parseInt(match[1]) + parseInt(match[2])) / 2;
  return 15; // fallback
}

function App() {
  const [phase, setPhase] = useState<ExamPhase>('setup');
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [examStartTime, setExamStartTime] = useState<string>('');
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timerMinutes, setTimerMinutes] = useState(150);
  const [lastAttemptId, setLastAttemptId] = useState<number | null>(null);
  const [selectedAttemptId, setSelectedAttemptId] = useState<number | null>(null);

  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const startExam = useCallback((selectedSectionIds: string[], questionCount: number, timer: boolean, minutes: number) => {
    const allQuestions = getAllQuestions();

    // Group questions by section and calculate weighted distribution
    const selectedSections = sections.filter(s => selectedSectionIds.includes(s.id));
    const totalWeight = selectedSections.reduce((sum, s) => sum + parseWeight(s.weight), 0);

    // Allocate question counts proportionally by weight
    let remaining = questionCount;
    const allocations: { sectionId: string; count: number }[] = [];
    selectedSections.forEach((s, i) => {
      const proportion = parseWeight(s.weight) / totalWeight;
      const count = i === selectedSections.length - 1
        ? remaining // last section gets the remainder to avoid rounding issues
        : Math.round(questionCount * proportion);
      allocations.push({ sectionId: s.id, count: Math.min(count, remaining) });
      remaining -= allocations[allocations.length - 1].count;
    });

    // Select questions from each section using Fisher-Yates shuffle
    let selected: Question[] = [];
    for (const { sectionId, count } of allocations) {
      const pool = allQuestions.filter(q => q.sectionId === sectionId);
      const shuffled = shuffle(pool);
      selected = selected.concat(shuffled.slice(0, Math.min(count, shuffled.length)));
    }

    // If we still need more questions (sections had fewer than allocated), backfill
    if (selected.length < questionCount) {
      const selectedIds = new Set(selected.map(q => q.id));
      const remaining = allQuestions
        .filter(q => selectedSectionIds.includes(q.sectionId) && !selectedIds.has(q.id));
      const extra = shuffle(remaining).slice(0, questionCount - selected.length);
      selected = selected.concat(extra);
    }

    // Final shuffle so questions aren't grouped by section
    selected = shuffle(selected);

    setExamQuestions(selected);
    setUserAnswers(selected.map(q => ({ questionId: q.id, answer: null, flagged: false, timeSpent: 0 })));
    setExamStartTime(new Date().toISOString());
    setTimerEnabled(timer);
    setTimerMinutes(minutes);
    setPhase('running');
  }, []);

  const submitExam = useCallback(async (answers: UserAnswer[]) => {
    setUserAnswers(answers);

    // Grade
    let correct = 0;
    const graded = answers.map(ans => {
      const q = examQuestions.find(q => q.id === ans.questionId)!;
      const isCorrect = gradeQuestion(q, ans.answer);
      if (isCorrect) correct++;
      return {
        questionId: ans.questionId,
        sectionId: q.sectionId,
        userAnswer: ans.answer,
        correctAnswer: getCorrectAnswer(q),
        isCorrect,
        timeSpent: ans.timeSpent,
      };
    });

    const scorePercent = Math.round((correct / examQuestions.length) * 100);
    const completedAt = new Date().toISOString();
    const timeTaken = Math.floor((new Date(completedAt).getTime() - new Date(examStartTime).getTime()) / 1000);

    // Save to backend
    try {
      const resp = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startedAt: examStartTime,
          completedAt,
          sections: [...new Set(examQuestions.map(q => q.sectionId))],
          totalQuestions: examQuestions.length,
          correctAnswers: correct,
          scorePercent,
          passed: scorePercent >= 70,
          timeTakenSeconds: timeTaken,
          answers: graded,
        }),
      });
      const data = await resp.json();
      setLastAttemptId(data.id);
    } catch {
      // Continue even if save fails
    }

    setPhase('review');
  }, [examQuestions, examStartTime]);

  const goToSetup = () => setPhase('setup');
  const goToHistory = () => setPhase('history');
  const viewAttempt = (id: number) => {
    setSelectedAttemptId(id);
    setPhase('history-detail');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AZ-104 Exam Simulator</h1>
        <nav>
          <button className={phase === 'setup' ? 'active' : ''} onClick={goToSetup}>
            New Exam
          </button>
          <button className={phase === 'history' || phase === 'history-detail' ? 'active' : ''} onClick={goToHistory}>
            History
          </button>
          <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '\u263E' : '\u2600'}
          </button>
        </nav>
      </header>
      <main className="app-main">
        {phase === 'setup' && (
          <ExamSetup sections={sections} onStart={startExam} />
        )}
        {phase === 'running' && (
          <ExamRunner
            questions={examQuestions}
            initialAnswers={userAnswers}
            timerEnabled={timerEnabled}
            timerMinutes={timerMinutes}
            onSubmit={submitExam}
          />
        )}
        {phase === 'review' && (
          <ExamReview
            questions={examQuestions}
            answers={userAnswers}
            sections={sections}
            onNewExam={goToSetup}
            onViewHistory={goToHistory}
          />
        )}
        {phase === 'history' && (
          <History onViewAttempt={viewAttempt} onNewExam={goToSetup} />
        )}
        {phase === 'history-detail' && selectedAttemptId !== null && (
          <HistoryDetail
            attemptId={selectedAttemptId}
            questions={getAllQuestions()}
            sections={sections}
            onBack={goToHistory}
          />
        )}
      </main>
    </div>
  );
}

function gradeQuestion(q: Question, answer: any): boolean {
  if (answer === null || answer === undefined) return false;

  switch (q.type) {
    case 'single-choice':
      return answer === q.correctOptionId;

    case 'multiple-choice': {
      if (!Array.isArray(answer)) return false;
      const sorted1 = [...answer].sort();
      const sorted2 = [...q.correctOptionIds].sort();
      return sorted1.length === sorted2.length && sorted1.every((v, i) => v === sorted2[i]);
    }

    case 'drag-drop': {
      if (typeof answer !== 'object') return false;
      return q.targets.every(t => answer[t.id] === t.correctItemId);
    }

    case 'dropdown': {
      if (typeof answer !== 'object') return false;
      return q.segments
        .filter((s): s is { type: 'dropdown'; id: string; options: string[]; correctOption: string } => s.type === 'dropdown')
        .every(s => answer[s.id] === s.correctOption);
    }

    case 'yes-no': {
      if (typeof answer !== 'object') return false;
      return q.statements.every(s => answer[s.id] === s.correct);
    }

    case 'case-study': {
      if (typeof answer !== 'object') return false;
      return q.subQuestions.every(sq => {
        const subAns = answer[sq.id];
        if (subAns === null || subAns === undefined) return false;
        if (sq.type === 'single-choice') return subAns === sq.correctOptionId;
        if (sq.type === 'multiple-choice') {
          if (!Array.isArray(subAns) || !sq.correctOptionIds) return false;
          const s1 = [...subAns].sort();
          const s2 = [...sq.correctOptionIds].sort();
          return s1.length === s2.length && s1.every((v, i) => v === s2[i]);
        }
        if (sq.type === 'yes-no') {
          return sq.statements?.every(s => subAns[s.id] === s.correct) ?? false;
        }
        if (sq.type === 'dropdown') {
          return sq.segments
            ?.filter((s): s is { type: 'dropdown'; id: string; options: string[]; correctOption: string } => s.type === 'dropdown')
            .every(s => subAns[s.id] === s.correctOption) ?? false;
        }
        return false;
      });
    }

    default:
      return false;
  }
}

function getCorrectAnswer(q: Question): any {
  switch (q.type) {
    case 'single-choice': return q.correctOptionId;
    case 'multiple-choice': return q.correctOptionIds;
    case 'drag-drop': {
      const map: Record<string, string> = {};
      q.targets.forEach(t => { map[t.id] = t.correctItemId; });
      return map;
    }
    case 'dropdown': {
      const map: Record<string, string> = {};
      q.segments.forEach(s => { if (s.type === 'dropdown') map[s.id] = s.correctOption; });
      return map;
    }
    case 'yes-no': {
      const map: Record<string, boolean> = {};
      q.statements.forEach(s => { map[s.id] = s.correct; });
      return map;
    }
    case 'case-study': {
      const map: Record<string, any> = {};
      q.subQuestions.forEach(sq => {
        if (sq.type === 'single-choice') map[sq.id] = sq.correctOptionId;
        else if (sq.type === 'multiple-choice') map[sq.id] = sq.correctOptionIds;
        else if (sq.type === 'yes-no') {
          const m: Record<string, boolean> = {};
          sq.statements?.forEach(s => { m[s.id] = s.correct; });
          map[sq.id] = m;
        } else if (sq.type === 'dropdown') {
          const m: Record<string, string> = {};
          sq.segments?.forEach(s => { if (s.type === 'dropdown') m[s.id] = s.correctOption; });
          map[sq.id] = m;
        }
      });
      return map;
    }
    default: return null;
  }
}

export default App;
