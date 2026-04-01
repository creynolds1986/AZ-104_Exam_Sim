export interface Section {
  id: string;
  title: string;
  weight: string;
  subsections: Subsection[];
}

export interface Subsection {
  id: string;
  title: string;
  bulletPoints: string[];
}

export type QuestionType =
  | 'single-choice'
  | 'multiple-choice'
  | 'drag-drop'
  | 'dropdown'
  | 'yes-no'
  | 'case-study';

export interface BaseQuestion {
  id: string;
  sectionId: string;
  subsectionId: string;
  bulletPoint: string;
  type: QuestionType;
  explanation: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single-choice';
  stem: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  stem: string;
  options: { id: string; text: string }[];
  correctOptionIds: string[];
  requiredSelections: number;
}

export interface DragDropQuestion extends BaseQuestion {
  type: 'drag-drop';
  stem: string;
  items: { id: string; text: string }[];
  targets: { id: string; label: string; correctItemId: string }[];
}

export interface DropdownQuestion extends BaseQuestion {
  type: 'dropdown';
  stem: string;
  segments: ({ type: 'text'; text: string } | { type: 'dropdown'; id: string; options: string[]; correctOption: string })[];
}

export interface YesNoQuestion extends BaseQuestion {
  type: 'yes-no';
  scenario: string;
  statements: { id: string; text: string; correct: boolean }[];
}

export interface CaseStudySubQuestion {
  id: string;
  type: 'single-choice' | 'multiple-choice' | 'yes-no' | 'dropdown';
  stem: string;
  options?: { id: string; text: string }[];
  correctOptionId?: string;
  correctOptionIds?: string[];
  requiredSelections?: number;
  statements?: { id: string; text: string; correct: boolean }[];
  segments?: ({ type: 'text'; text: string } | { type: 'dropdown'; id: string; options: string[]; correctOption: string })[];
  explanation: string;
}

export interface CaseStudyQuestion extends BaseQuestion {
  type: 'case-study';
  scenario: string;
  subQuestions: CaseStudySubQuestion[];
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | DragDropQuestion
  | DropdownQuestion
  | YesNoQuestion
  | CaseStudyQuestion;

export interface UserAnswer {
  questionId: string;
  answer: any;
  flagged: boolean;
  timeSpent: number;
}

export interface AttemptSummary {
  id: number;
  startedAt: string;
  completedAt: string;
  sections: string[];
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  passed: boolean;
  timeTakenSeconds: number;
}

export interface AttemptDetail extends AttemptSummary {
  answers: {
    questionId: string;
    sectionId: string;
    userAnswer: any;
    correctAnswer: any;
    isCorrect: boolean;
    timeSpent: number;
  }[];
}

export interface SectionScore {
  sectionId: string;
  sectionTitle: string;
  correct: number;
  total: number;
  percent: number;
}

export type ExamPhase = 'setup' | 'running' | 'review' | 'history' | 'history-detail';
