import React, { useState } from 'react';
import { Chapter, Question } from '../types/physics';
import { formatMathEquation } from '../utils/physicsCalculations';
import {
  ArrowLeft,
  BookOpen,
  FileCheck2,
  AlertTriangle,
  HelpCircle,
  FlaskConical,
  CheckCircle,
  XCircle,
  Lightbulb,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

interface ChapterDetailProps {
  chapter: Chapter;
  onBack: () => void;
  onLaunchSim: (chapterId: number) => void;
  onAskAi: (prompt: string) => void;
}

export const ChapterDetail: React.FC<ChapterDetailProps> = ({
  chapter,
  onBack,
  onLaunchSim,
  onAskAi,
}) => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'derivations' | 'traps' | 'practice'>('concepts');

  // Practice quiz states
  const [userAnswers, setUserAnswers] = useState<Record<string, number | string>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [expandedDerivation, setExpandedDerivation] = useState<string | null>(chapter.derivations[0]?.id || null);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleNumericalSubmit = (questionId: string, val: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: val }));
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  const toggleHint = (questionId: string) => {
    setRevealedHints((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono font-bold text-[#c2ceb8] hover:text-[#A1CB35] transition-colors bg-[#12180e] border border-[#2d3b25] px-3.5 py-1.5 rounded-xl shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-[#A1CB35]" />
          <span>Back to Syllabus Master</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#8b9982]">Category:</span>
          <span className="text-[#A1CB35] uppercase font-bold">{chapter.category}</span>
          <span className="text-[#2d3b25]">|</span>
          <span className="text-[#FFDE4E] font-bold">HSC: {chapter.hscMarks} Marks</span>
          <span className="text-[#2d3b25]">|</span>
          <span className="text-[#FF9D4D] font-bold">JEE: {chapter.jeeMarks} Marks</span>
        </div>
      </div>

      {/* Chapter Hero Header */}
      <div className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#769826]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs bg-[#769826] text-white px-2.5 py-0.5 rounded-lg font-bold border border-[#A1CB35]/60 shadow-sm">
                Chapter {chapter.numberStr}
              </span>
              <span className="font-mono text-xs text-[#FFDE4E] bg-[#182114] border border-[#2d3b25] px-2 py-0.5 rounded font-bold">
                Class 11 Physics
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#f2f6ee] tracking-tight">
              {chapter.title}
            </h1>
            <p className="text-sm sm:text-base text-[#c2ceb8] mt-2 leading-relaxed">
              {chapter.description}
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <button
              onClick={() => onLaunchSim(chapter.id)}
              className="px-4 py-2.5 rounded-xl bg-[#FF9D4D] hover:bg-[#ff8f38] text-[#0c1109] font-mono text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Launch Virtual Lab Sim</span>
            </button>
            <button
              onClick={() => onAskAi(`Explain key concepts and derivations for ${chapter.title}`)}
              className="px-4 py-2.5 rounded-xl bg-[#182114] hover:bg-[#202a1b] text-[#f2f6ee] border border-[#2d3b25] font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#FFDE4E]" />
              <span>Ask AI Physics Tutor</span>
            </button>
          </div>
        </div>

        {/* Key Formulas Ribbon */}
        <div className="mt-6 pt-4 border-t border-[#2d3b25] flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-[#8b9982] uppercase mr-2 font-bold">
            Core Equations:
          </span>
          {chapter.keyFormulas.map((kf, i) => (
            <div
              key={i}
              className="bg-[#0c1109] border border-[#2d3b25] px-3 py-1.5 rounded-xl font-mono text-xs text-[#f2f6ee] flex items-center gap-2"
            >
              <span className="text-[#FFDE4E] font-bold">{formatMathEquation(kf.latex)}</span>
              <span className="text-[10px] text-[#8b9982] hidden sm:inline">({kf.description})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#2d3b25] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('concepts')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'concepts'
              ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
              : 'text-[#8b9982] hover:text-[#f2f6ee] hover:bg-[#12180e]'
          }`}
        >
          <BookOpen className="w-4 h-4 text-[#A1CB35]" />
          <span>Concepts & Subtopics ({chapter.subtopics.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('derivations')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'derivations'
              ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
              : 'text-[#8b9982] hover:text-[#f2f6ee] hover:bg-[#12180e]'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-[#A1CB35]" />
          <span>Board Derivations ({chapter.derivations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('traps')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'traps'
              ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
              : 'text-[#8b9982] hover:text-[#f2f6ee] hover:bg-[#12180e]'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-[#FF9D4D]" />
          <span>JEE Speed & Traps ({chapter.jeeTraps.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'practice'
              ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
              : 'text-[#8b9982] hover:text-[#f2f6ee] hover:bg-[#12180e]'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-[#FFDE4E]" />
          <span>Practice Question Bank ({chapter.questions.length})</span>
        </button>
      </div>

      {/* TAB 1: CONCEPTS & SUBTOPICS */}
      {activeTab === 'concepts' && (
        <div className="flex flex-col gap-6">
          {chapter.subtopics.map((sub) => (
            <div
              key={sub.id}
              className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 flex flex-col gap-4 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs bg-[#769826] text-white px-2 py-0.5 rounded font-bold">
                    {sub.id}
                  </span>
                  <h3 className="text-lg font-bold text-[#f2f6ee]">{sub.title}</h3>
                </div>
              </div>

              <p className="text-sm text-[#c2ceb8] leading-relaxed">
                {sub.conceptSummary}
              </p>

              {/* Key Principles List */}
              <div className="bg-[#182114] border border-[#2d3b25] rounded-xl p-4 flex flex-col gap-2">
                <span className="font-mono text-xs text-[#A1CB35] uppercase tracking-wider font-bold">
                  Key Principles & Invariants:
                </span>
                <ul className="flex flex-col gap-2 text-xs text-[#c2ceb8]">
                  {sub.keyPoints.map((kp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#A1CB35] mt-0.5">✔</span>
                      <span className="text-[#f2f6ee] leading-relaxed">{kp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solved Step-by-Step Example */}
              {sub.solvedExample && (
                <div className="bg-[#0c1109] border border-[#2d3b25] rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#FFDE4E] uppercase tracking-wider">
                      Master Solved Example: {sub.solvedExample.title}
                    </span>
                    <span className="font-mono text-[10px] text-[#A1CB35] bg-[#182114] border border-[#769826]/40 px-2 py-0.5 rounded font-bold">
                      Step-by-Step Rigor
                    </span>
                  </div>

                  <p className="text-xs font-medium text-[#f2f6ee]">
                    <strong className="text-[#FF9D4D]">Problem: </strong>
                    {sub.solvedExample.problem}
                  </p>

                  <div className="bg-[#12180e] border border-[#2d3b25] p-3 rounded-lg flex flex-col gap-1.5 font-mono text-xs">
                    <span className="text-[11px] text-[#8b9982] uppercase">Step-by-step Solution:</span>
                    {sub.solvedExample.solution.map((step, sIdx) => (
                      <div key={sIdx} className="text-[#c2ceb8] flex items-start gap-2">
                        <span className="text-[#A1CB35] font-bold">{sIdx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                    <div className="mt-2 pt-2 border-t border-[#2d3b25] text-[#FFDE4E] font-bold">
                      Answer: {sub.solvedExample.finalAnswer}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: BOARD MANDATORY DERIVATIONS */}
      {activeTab === 'derivations' && (
        <div className="flex flex-col gap-6">
          <div className="bg-[#182114] border border-[#2d3b25] p-4 rounded-xl flex items-center justify-between text-xs font-mono">
            <span className="text-[#f2f6ee]">
              Maharashtra State Board HSC Physics: Step-by-step mathematical proofs required for Section C & D.
            </span>
            <span className="text-[#A1CB35] font-bold">3 - 4 Marks Each</span>
          </div>

          {chapter.derivations.map((der) => {
            const isExpanded = expandedDerivation === der.id;
            return (
              <div
                key={der.id}
                className="bg-[#12180e] border border-[#2d3b25] rounded-2xl overflow-hidden shadow-md"
              >
                <div
                  onClick={() => setExpandedDerivation(isExpanded ? null : der.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-[#182114] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#A1CB35]/15 border border-[#A1CB35]/40 flex items-center justify-center text-[#A1CB35]">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#f2f6ee]">{der.title}</h3>
                      <span className="text-xs font-mono text-[#8b9982]">
                        Final Result:{' '}
                        <code className="text-[#FFDE4E] font-bold">{formatMathEquation(der.finalEquation)}</code>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#A1CB35] bg-[#182114] border border-[#769826]/40 px-2 py-0.5 rounded font-bold">
                      {der.expectedMarks} Marks
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#8b9982]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#8b9982]" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-[#2d3b25] flex flex-col gap-4">
                    <div className="bg-[#0c1109] border border-[#2d3b25] p-3 rounded-xl font-mono text-sm text-[#FFDE4E] text-center font-bold">
                      {formatMathEquation(der.finalEquation)}
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-xs text-[#8b9982] uppercase">
                        Rigorous Step-by-Step Derivation:
                      </span>
                      {der.steps.map((st, i) => (
                        <div
                          key={i}
                          className="bg-[#182114] border border-[#2d3b25] p-3 rounded-lg text-xs text-[#f2f6ee] leading-relaxed flex items-start gap-2.5"
                        >
                          <span className="w-5 h-5 rounded-full bg-[#769826] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span className="pt-0.5">{st}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="bg-[#182114] border border-[#2d3b25] p-3 rounded-xl">
                        <span className="font-mono text-[10px] text-[#FF9D4D] uppercase font-bold block mb-1">
                          Key Physical Condition:
                        </span>
                        <span className="text-[#c2ceb8]">{der.keyCondition}</span>
                      </div>
                      <div className="bg-[#182114] border border-[#2d3b25] p-3 rounded-xl">
                        <span className="font-mono text-[10px] text-[#A1CB35] uppercase font-bold block mb-1">
                          HSC Board Presentation Tip:
                        </span>
                        <span className="text-[#c2ceb8]">{der.boardTip}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: JEE TRAPS & SHORTCUTS */}
      {activeTab === 'traps' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapter.jeeTraps.map((trap, idx) => (
            <div
              key={idx}
              className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-md"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#FF9D4D]">
                  <AlertTriangle className="w-4 h-4" />
                  <h3 className="font-bold text-sm text-[#f2f6ee]">{trap.title}</h3>
                </div>
                <p className="text-xs text-[#c2ceb8] leading-relaxed">
                  {trap.detail}
                </p>
              </div>

              {trap.shortcutFormula && (
                <div className="bg-[#0c1109] border border-[#2d3b25] p-3 rounded-xl flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-[#A1CB35] uppercase font-bold">
                    30-Second Shortcut Formula:
                  </span>
                  <code className="font-mono text-xs text-[#FFDE4E] font-bold">
                    {trap.shortcutFormula}
                  </code>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: PRACTICE QUESTION BANK */}
      {activeTab === 'practice' && (
        <div className="flex flex-col gap-6">
          <div className="bg-[#182114] border border-[#2d3b25] p-4 rounded-xl flex items-center justify-between text-xs font-mono">
            <span className="text-[#f2f6ee]">
              Target Practice: Authentic JEE Main & HSC board format questions with instant validation and complete solutions.
            </span>
            <span className="text-[#A1CB35] font-bold">{chapter.questions.length} Questions Bank</span>
          </div>

          {chapter.questions.map((q, qIndex) => {
            const userAnswer = userAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isMcq = q.type === 'mcq';
            const isCorrect =
              isMcq
                ? userAnswer === q.correctOptionIndex
                : Math.abs(Number(userAnswer) - (q.correctNumericalValue || 0)) <=
                  (q.tolerance || 0.1);
            const isHintVisible = revealedHints[q.id];
            const isExplanationVisible = showExplanations[q.id];

            return (
              <div
                key={q.id}
                className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 flex flex-col gap-4 shadow-md"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#769826] text-white font-mono text-xs font-bold flex items-center justify-center">
                      Q{qIndex + 1}
                    </span>
                    <span className="font-mono text-[10px] text-[#A1CB35] bg-[#182114] border border-[#2d3b25] px-2 py-0.5 rounded font-bold">
                      {q.difficulty}
                    </span>
                    {q.yearTag && (
                      <span className="font-mono text-[10px] text-[#FFDE4E] bg-[#182114] border border-[#FFDE4E]/30 px-2 py-0.5 rounded font-bold">
                        {q.yearTag}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleHint(q.id)}
                    className="flex items-center gap-1 text-[11px] font-mono text-[#8b9982] hover:text-[#FFDE4E] transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-[#FFDE4E]" />
                    <span>{isHintVisible ? 'Hide Hint' : 'Need Hint?'}</span>
                  </button>
                </div>

                {/* Hint banner */}
                {isHintVisible && (
                  <div className="bg-[#1a2010] border border-[#FFDE4E]/40 p-3 rounded-xl text-xs text-[#FFDE4E] flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-[#FFDE4E]" />
                    <span><strong>Hint: </strong>{q.hint}</span>
                  </div>
                )}

                {/* Question Text */}
                <p className="text-sm text-[#f2f6ee] font-medium leading-relaxed">
                  {q.text}
                </p>

                {/* Question Body: MCQ Options vs Numerical Input */}
                {isMcq && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = userAnswer === oIdx;
                      const isRightOption = q.correctOptionIndex === oIdx;

                      let btnStyle = 'bg-[#182114] border-[#2d3b25] text-[#f2f6ee] hover:bg-[#202a1b]';
                      if (isAnswered) {
                        if (isRightOption) {
                          btnStyle = 'bg-[#1a2e16] border-[#A1CB35] text-[#A1CB35] font-bold';
                        } else if (isSelected && !isRightOption) {
                          btnStyle = 'bg-[#331812] border-[#FF9D4D] text-[#FF9D4D] font-bold';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-[#0c1109] text-[#8b9982] font-mono text-[10px] flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isAnswered && isRightOption && (
                            <Check className="w-4 h-4 text-[#A1CB35] shrink-0" />
                          )}
                          {isAnswered && isSelected && !isRightOption && (
                            <XCircle className="w-4 h-4 text-[#FF9D4D] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Numerical Input format */}
                {!isMcq && (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter numerical answer..."
                      disabled={isAnswered}
                      className="bg-[#0c1109] border border-[#2d3b25] rounded-xl px-3.5 py-2 text-xs font-mono text-[#f2f6ee] focus:outline-none focus:border-[#A1CB35]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleNumericalSubmit(q.id, (e.target as HTMLInputElement).value);
                        }
                      }}
                      id={`num-input-${q.id}`}
                    />
                    {!isAnswered ? (
                      <button
                        onClick={() => {
                          const el = document.getElementById(`num-input-${q.id}`) as HTMLInputElement;
                          if (el && el.value) handleNumericalSubmit(q.id, el.value);
                        }}
                        className="px-4 py-2 bg-[#769826] hover:bg-[#688620] text-white rounded-xl text-xs font-mono font-bold transition-colors"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <span className="font-mono text-xs flex items-center gap-1.5">
                        {isCorrect ? (
                          <span className="text-[#A1CB35] font-bold flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Correct Answer! (+4 Marks)
                          </span>
                        ) : (
                          <span className="text-[#FF9D4D] font-bold flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Incorrect (Expected: {q.correctNumericalValue})
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                )}

                {/* Step-by-Step Explanation Banner */}
                {isExplanationVisible && (
                  <div className="mt-3 pt-3 border-t border-[#2d3b25] bg-[#0c1109] rounded-xl p-3.5 flex flex-col gap-1.5 font-mono text-xs">
                    <div className="flex items-center gap-1.5 text-[#A1CB35] font-bold">
                      <span>Step-by-Step Solution & Physics Rigor:</span>
                    </div>
                    <p className="text-[#c2ceb8] leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
