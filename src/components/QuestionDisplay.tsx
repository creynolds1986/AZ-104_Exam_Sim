import React from 'react';
import { Question } from '../types';
import { learnLinks } from '../data/learnLinks';
import SingleChoice from './questions/SingleChoice';
import MultipleChoice from './questions/MultipleChoice';
import DragDrop from './questions/DragDrop';
import Dropdown from './questions/Dropdown';
import YesNoStatements from './questions/YesNoStatements';
import CaseStudy from './questions/CaseStudy';

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  answer: any;
  flagged: boolean;
  onAnswer: (answer: any) => void;
  onToggleFlag: () => void;
  reviewMode: boolean;
  correctAnswer?: any;
}

const typeLabels: Record<string, string> = {
  'single-choice': 'Single Answer',
  'multiple-choice': 'Multiple Answers',
  'drag-drop': 'Drag & Drop',
  'dropdown': 'Dropdown',
  'yes-no': 'Yes / No',
  'case-study': 'Case Study',
};

export default function QuestionDisplay({
  question, questionNumber, totalQuestions, answer, flagged, onAnswer, onToggleFlag, reviewMode, correctAnswer,
}: Props) {
  return (
    <div>
      <div className="question-header">
        <span className="question-number">Question {questionNumber} of {totalQuestions}</span>
        <span className="question-type-badge">{typeLabels[question.type] || question.type}</span>
        {!reviewMode && (
          <button className={`flag-btn ${flagged ? 'flagged' : ''}`} onClick={onToggleFlag}>
            {flagged ? '⚑ Flagged' : '⚐ Flag for Review'}
          </button>
        )}
      </div>

      {question.type === 'single-choice' && (
        <SingleChoice question={question} answer={answer} onAnswer={onAnswer} reviewMode={reviewMode} />
      )}
      {question.type === 'multiple-choice' && (
        <MultipleChoice question={question} answer={answer} onAnswer={onAnswer} reviewMode={reviewMode} />
      )}
      {question.type === 'drag-drop' && (
        <DragDrop question={question} answer={answer} onAnswer={onAnswer} reviewMode={reviewMode} />
      )}
      {question.type === 'dropdown' && (
        <Dropdown question={question} answer={answer} onAnswer={onAnswer} reviewMode={reviewMode} />
      )}
      {question.type === 'yes-no' && (
        <YesNoStatements question={question} answer={answer} onAnswer={onAnswer} reviewMode={reviewMode} />
      )}
      {question.type === 'case-study' && (
        <CaseStudy question={question} answer={answer} onAnswer={onAnswer} reviewMode={reviewMode} />
      )}

      {reviewMode && question.explanation && (
        <div className="explanation-box">
          <strong>Explanation:</strong> {question.explanation}
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
