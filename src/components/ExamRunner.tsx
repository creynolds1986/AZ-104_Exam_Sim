import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Question, UserAnswer, ExamMode } from '../types';
import QuestionDisplay from './QuestionDisplay';

interface Props {
  questions: Question[];
  initialAnswers: UserAnswer[];
  timerEnabled: boolean;
  timerMinutes: number;
  examMode: ExamMode;
  onSubmit: (answers: UserAnswer[]) => void;
}

export default function ExamRunner({ questions, initialAnswers, timerEnabled, timerMinutes, examMode, onSubmit }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>(initialAnswers);
  const [answerChecked, setAnswerChecked] = useState<boolean[]>(() => initialAnswers.map(() => false));
  const [timeRemaining, setTimeRemaining] = useState(timerMinutes * 60);
  const [showConfirm, setShowConfirm] = useState(false);
  const questionStartTime = useRef(Date.now());

  useEffect(() => {
    if (!timerEnabled) return;
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerEnabled]);

  const trackTime = useCallback(() => {
    const elapsed = Math.floor((Date.now() - questionStartTime.current) / 1000);
    setAnswers(prev => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], timeSpent: next[currentIndex].timeSpent + elapsed };
      return next;
    });
    questionStartTime.current = Date.now();
  }, [currentIndex]);

  const goToQuestion = (index: number) => {
    trackTime();
    setCurrentIndex(index);
  };

  const updateAnswer = (answer: any) => {
    setAnswers(prev => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], answer };
      return next;
    });
    if (inPracticeMode) {
      setAnswerChecked(prev => {
        const next = [...prev];
        next[currentIndex] = false;
        return next;
      });
    }
  };

  const toggleFlag = () => {
    setAnswers(prev => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], flagged: !next[currentIndex].flagged };
      return next;
    });
  };

  const handleSubmit = () => {
    trackTime();
    onSubmit(answers);
  };

  const inPracticeMode = examMode === 'practice';
  const showCorrect = inPracticeMode && answerChecked[currentIndex];
  const showExplanation = inPracticeMode && answerChecked[currentIndex];

  const isQuestionCorrect = useCallback((question: Question, answer: any) => {
    if (answer === null || answer === undefined) return false;
    switch (question.type) {
      case 'single-choice':
        return answer === question.correctOptionId;
      case 'multiple-choice': {
        if (!Array.isArray(answer)) return false;
        const sorted1 = [...answer].sort();
        const sorted2 = [...question.correctOptionIds].sort();
        return sorted1.length === sorted2.length && sorted1.every((v, i) => v === sorted2[i]);
      }
      case 'drag-drop': {
        if (typeof answer !== 'object') return false;
        return question.targets.every(t => answer[t.id] === t.correctItemId);
      }
      case 'dropdown': {
        if (typeof answer !== 'object') return false;
        return question.segments
          .filter((s): s is { type: 'dropdown'; id: string; options: string[]; correctOption: string } => s.type === 'dropdown')
          .every(s => answer[s.id] === s.correctOption);
      }
      case 'yes-no': {
        if (typeof answer !== 'object') return false;
        return question.statements.every(s => answer[s.id] === s.correct);
      }
      case 'case-study': {
        if (typeof answer !== 'object') return false;
        return question.subQuestions.every(sq => {
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
  }, []);

  const currentQuestionCorrect = showCorrect && isQuestionCorrect(questions[currentIndex], answers[currentIndex]?.answer);
  const currentQuestionClass = showCorrect ? (currentQuestionCorrect ? 'question-correct' : 'question-incorrect') : '';

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const timerClass = timeRemaining < 300 ? 'critical' : timeRemaining < 600 ? 'warning' : '';
  const answeredCount = answers.filter(a => a.answer !== null).length;
  const flaggedCount = answers.filter(a => a.flagged).length;

  return (
    <div className="exam-layout">
      <aside className="exam-sidebar">
        <div className="exam-sidebar-header">
          {timerEnabled && (
            <div className={`exam-timer ${timerClass}`}>
              {formatTime(timeRemaining)}
            </div>
          )}
          <div className="exam-progress">
            {answeredCount}/{questions.length} answered
            {flaggedCount > 0 && ` | ${flaggedCount} flagged`}
          </div>
        </div>

        <div className="question-nav">
          <div className="question-nav-grid">
            {questions.map((_, i) => {
              const classes = ['q-nav-btn'];
              if (i === currentIndex) classes.push('current');
              if (answers[i]?.answer !== null) classes.push('answered');
              if (answers[i]?.flagged) classes.push('flagged');
              return (
                <button
                  key={i}
                  className={classes.join(' ')}
                  onClick={() => goToQuestion(i)}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>

        <button className="sidebar-end-btn" onClick={() => setShowConfirm(true)}>
          End Exam
        </button>
      </aside>

      <div className="exam-content">
        <div className={`question-area ${currentQuestionClass}`}>
          <QuestionDisplay
            question={questions[currentIndex]}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            answer={answers[currentIndex]?.answer}
            flagged={answers[currentIndex]?.flagged ?? false}
            onAnswer={updateAnswer}
            onToggleFlag={toggleFlag}
            reviewMode={false}
            showCorrect={showCorrect}
            showExplanation={showExplanation}
          />
          {inPracticeMode && (
            <div className="check-answer-panel">
              <button
                className="check-answer-btn flag-btn"
                disabled={answers[currentIndex]?.answer === null}
                onClick={() => setAnswerChecked(prev => {
                  const next = [...prev];
                  next[currentIndex] = true;
                  return next;
                })}
              >
                Check Answer
              </button>
            </div>
          )}
        </div>

        <div className="exam-bottom-bar">
          <button
            className="nav-btn"
            disabled={currentIndex === 0}
            onClick={() => goToQuestion(currentIndex - 1)}
          >
            ← Previous
          </button>
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            Question {currentIndex + 1} of {questions.length}
          </span>
          <button
            className="nav-btn"
            disabled={currentIndex === questions.length - 1}
            onClick={() => goToQuestion(currentIndex + 1)}
          >
            Next →
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="confirm-overlay" onClick={() => setShowConfirm(false)}>
          <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
            <h3>End Exam?</h3>
            <p>
              You have answered {answeredCount} of {questions.length} questions.
              {questions.length - answeredCount > 0 && (
                <> <strong>{questions.length - answeredCount}</strong> questions are unanswered and will be marked incorrect.</>
              )}
              {flaggedCount > 0 && (
                <> You have {flaggedCount} flagged question(s) for review.</>
              )}
            </p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                Continue Exam
              </button>
              <button className="btn-confirm" onClick={handleSubmit}>
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
