export type ChapterCategory = 'all' | 'mechanics' | 'thermal-sound' | 'optics' | 'electromagnetism' | 'modern';

export type ChapterStatus = 'Completed' | 'Active' | 'Pending';

export interface SolvedExample {
  title: string;
  problem: string;
  given: Record<string, string>;
  solution: string[];
  finalAnswer: string;
}

export interface Subtopic {
  id: string;
  title: string;
  conceptSummary: string;
  keyPoints: string[];
  formulaHighlights?: string[];
  solvedExample?: SolvedExample;
}

export interface Derivation {
  id: string;
  title: string;
  expectedMarks: number;
  finalEquation: string;
  steps: string[];
  keyCondition: string;
  boardTip: string;
}

export interface Question {
  id: string;
  chapterId: number;
  type: 'mcq' | 'numerical';
  text: string;
  options?: string[];
  correctOptionIndex?: number; // for mcq
  correctNumericalValue?: number; // for numerical
  tolerance?: number; // acceptable numerical deviation
  explanation: string;
  hint: string;
  difficulty: 'Board Level' | 'JEE Main' | 'JEE Advanced';
  yearTag?: string;
}

export interface Chapter {
  id: number;
  numberStr: string; // "01", "02"
  title: string;
  category: ChapterCategory;
  status: ChapterStatus;
  hscMarks: number;
  jeeMarks: number;
  tagline: string;
  description: string;
  keyFormulas: {
    latex: string;
    description: string;
    dimensions?: string;
  }[];
  keywords: string[];
  subtopics: Subtopic[];
  derivations: Derivation[];
  jeeTraps: {
    title: string;
    detail: string;
    shortcutFormula?: string;
  }[];
  questions: Question[];
  defaultSimId?: string;
}

export interface FormulaVaultItem {
  id: string;
  chapterId: number;
  chapterTitle: string;
  name: string;
  equation: string;
  dimensionalFormula: string;
  siUnit: string;
  category: ChapterCategory;
  variables: {
    symbol: string;
    label: string;
    defaultValue: number;
    unit: string;
    min?: number;
    max?: number;
    step?: number;
  }[];
  compute: (inputs: Record<string, number>) => {
    value: number;
    unit: string;
    steps: string[];
  };
}
