import React, { useState, useEffect } from 'react';
import { SAMPLE_JEE_MOCK_TEST, MockTest } from '../data/mockTestData';
import { Question } from '../types/physics';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  ChevronRight,
  Bookmark,
  Check,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

export const MockTestEngine: React.FC = () => {
  const test: MockTest = SAMPLE_JEE_MOCK_TEST;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({ [test.questions[0].id]: true });

  const [secondsRemaining, setSecondsRemaining] = useState(test.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted || secondsRemaining <= 0) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, secondsRemaining]);

  const currentQ = test.questions[currentQIndex];

  const handleSelectQuestion = (index: number) => {
    setCurrentQIndex(index);
    setVisited((prev) => ({ ...prev, [test.questions[index].id]: true }));
  };

  const handleOptionSelect = (optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIdx }));
  };

  const handleNumericalInput = (val: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: val }));
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleToggleMarkReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleNext = () => {
    if (currentQIndex < test.questions.length - 1) {
      handleSelectQuestion(currentQIndex + 1);
    }
  };

  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  test.questions.forEach((q) => {
    const userAns = answers[q.id];
    if (userAns === undefined || userAns === '') {
      unattemptedCount++;
    } else if (q.type === 'mcq') {
      if (userAns === q.correctOptionIndex) {
        totalScore += 4;
        correctCount++;
      } else {
        totalScore -= 1;
        incorrectCount++;
      }
    } else {
      const num = Number(userAns);
      const isCorrect =
        Math.abs(num - (q.correctNumericalValue || 0)) <= (q.tolerance || 0.1);
      if (isCorrect) {
        totalScore += 4;
        correctCount++;
      } else {
        totalScore -= 1;
        incorrectCount++;
      }
    }
  });

  const maxPossibleScore = test.questions.length * 4;
  const percentile = Math.min(
    99.9,
    Math.max(40, (totalScore / maxPossibleScore) * 100 * 0.8 + 20)
  ).toFixed(1);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRestart = () => {
    setAnswers({});
    setMarkedForReview({});
    setVisited({ [test.questions[0].id]: true });
    setCurrentQIndex(0);
    setSecondsRemaining(test.durationMinutes * 60);
    setIsSubmitted(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#FFDE4E] mb-1">
            <FileText className="w-5 h-5 text-[#A1CB35]" />
            <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#A1CB35]">
              NTA Examination Pattern • JEE Main Full Mock
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#f2f6ee]">{test.title}</h1>
          <span className="text-xs text-[#c2ceb8] mt-0.5 block">{test.syllabusCovered}</span>
        </div>

        {/* Live Timer Countdown */}
        <div className="flex items-center gap-3">
          <div className="bg-[#0c1109] border border-[#2d3b25] px-4 py-2 rounded-xl flex items-center gap-2 font-mono">
            <Clock className="w-4 h-4 text-[#FFDE4E]" />
            <span className="text-sm font-bold text-[#f2f6ee]">
              {formatTimer(secondsRemaining)}
            </span>
          </div>

          {!isSubmitted && (
            <button
              onClick={() => setIsSubmitted(true)}
              className="px-4 py-2 bg-[#FF9D4D] hover:bg-[#ff8f38] text-[#0c1109] font-mono text-xs font-extrabold rounded-xl transition-all shadow-md"
            >
              Submit Test
            </button>
          )}
        </div>
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Workspace (8 Columns) */}
          <div className="lg:col-span-8 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 flex flex-col justify-between shadow-xl min-h-[520px]">
            <div>
              {/* Question Meta Header */}
              <div className="flex items-center justify-between border-b border-[#2d3b25] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#769826] text-white font-mono text-xs font-bold flex items-center justify-center">
                    Q{currentQIndex + 1}
                  </span>
                  <span className="font-mono text-xs text-[#A1CB35] bg-[#182114] border border-[#2d3b25] px-2 py-0.5 rounded font-bold">
                    {currentQ.type === 'mcq' ? 'Section A: Single Choice' : 'Section B: Numerical Value'}
                  </span>
                  <span className="font-mono text-xs text-[#FFDE4E] font-bold">+4 Marks / -1 Mark</span>
                </div>

                <button
                  onClick={handleToggleMarkReview}
                  className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg border transition-colors ${
                    markedForReview[currentQ.id]
                      ? 'bg-[#331812] border-[#FF9D4D] text-[#FF9D4D] font-bold'
                      : 'border-[#2d3b25] text-[#8b9982] hover:text-[#f2f6ee]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{markedForReview[currentQ.id] ? 'Marked for Review' : 'Mark for Review'}</span>
                </button>
              </div>

              {/* Question Text */}
              <p className="text-sm sm:text-base text-[#f2f6ee] font-medium leading-relaxed mb-6">
                {currentQ.text}
              </p>

              {/* MCQ Options */}
              {currentQ.type === 'mcq' && currentQ.options && (
                <div className="grid grid-cols-1 gap-3">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = answers[currentQ.id] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleOptionSelect(oIdx)}
                        className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-[#182114] border-[#A1CB35] text-white font-bold shadow-[0_0_12px_rgba(161,203,53,0.3)]'
                            : 'bg-[#182114] border-[#2d3b25] text-[#f2f6ee] hover:bg-[#202a1b]'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-md bg-[#0c1109] text-[#A1CB35] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numerical Integer Input */}
              {currentQ.type === 'numerical' && (
                <div className="flex flex-col gap-2 max-w-sm mt-4">
                  <span className="text-xs font-mono text-[#8b9982]">
                    Enter your calculated numerical value:
                  </span>
                  <input
                    type="number"
                    step="any"
                    value={answers[currentQ.id] ?? ''}
                    onChange={(e) => handleNumericalInput(e.target.value)}
                    placeholder="e.g. 8 or 79.6"
                    className="bg-[#0c1109] border border-[#2d3b25] rounded-xl px-4 py-2.5 text-sm font-mono text-[#f2f6ee] focus:outline-none focus:border-[#A1CB35]"
                  />
                </div>
              )}
            </div>

            {/* Bottom Question Controls */}
            <div className="mt-8 pt-4 border-t border-[#2d3b25] flex items-center justify-between gap-2">
              <button
                onClick={handleClearResponse}
                className="px-3.5 py-2 rounded-xl text-xs font-mono text-[#8b9982] hover:text-[#f2f6ee] hover:bg-[#182114] transition-colors"
              >
                Clear Response
              </button>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-[#769826] hover:bg-[#688620] text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2 border border-[#A1CB35]/60"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4 text-[#FFDE4E]" />
              </button>
            </div>
          </div>

          {/* Question Palette (4 Columns) */}
          <div className="lg:col-span-4 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-5 flex flex-col gap-5 shadow-xl">
            <span className="font-mono text-xs uppercase text-[#A1CB35] font-extrabold border-b border-[#2d3b25] pb-2">
              Question Palette (25 Questions)
            </span>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#A1CB35]" />
                <span className="text-[#f2f6ee]">Answered ({Object.keys(answers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#FF9D4D]" />
                <span className="text-[#f2f6ee]">Marked Review ({Object.keys(markedForReview).filter(k => markedForReview[k]).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#FFDE4E]" />
                <span className="text-[#f2f6ee]">Active Item</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-[#202a1b]" />
                <span className="text-[#8b9982]">Not Visited</span>
              </div>
            </div>

            {/* Question Buttons Matrix */}
            <div className="grid grid-cols-5 gap-2 pt-2 border-t border-[#2d3b25]">
              {test.questions.map((q, idx) => {
                const isCurrent = currentQIndex === idx;
                const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
                const isMarked = markedForReview[q.id];
                const isVis = visited[q.id];

                let bgClass = 'bg-[#202a1b] text-[#8b9982]';
                if (isMarked) {
                  bgClass = 'bg-[#FF9D4D] text-[#0c1109] font-extrabold';
                } else if (isAnswered) {
                  bgClass = 'bg-[#A1CB35] text-[#0c1109] font-extrabold';
                } else if (isVis) {
                  bgClass = 'bg-[#182114] border border-[#769826] text-[#A1CB35]';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuestion(idx)}
                    className={`h-9 rounded-xl font-mono text-xs transition-all flex items-center justify-center ${bgClass} ${
                      isCurrent ? 'ring-2 ring-[#FFDE4E] scale-105 shadow-md' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Test Results & Diagnostic Score Deck */
        <div className="flex flex-col gap-6">
          <div className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#A1CB35]/15 border border-[#A1CB35]/40 flex items-center justify-center text-[#A1CB35]">
                <Award className="w-9 h-9" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-[#A1CB35] uppercase font-bold tracking-wider">
                  Test Evaluation Complete
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f2f6ee]">
                  Score: {totalScore} / {maxPossibleScore}
                </h2>
                <span className="text-xs text-[#c2ceb8] mt-0.5">
                  Predicted NTA Percentile: <strong className="text-[#FFDE4E]">{percentile} %ile</strong>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full md:w-auto text-center font-mono text-xs">
              <div className="bg-[#182114] border border-[#2d3b25] p-3 rounded-xl">
                <span className="text-[#A1CB35] text-lg font-bold block">{correctCount}</span>
                <span className="text-[#8b9982]">Correct (+{correctCount * 4})</span>
              </div>
              <div className="bg-[#182114] border border-[#2d3b25] p-3 rounded-xl">
                <span className="text-[#FF9D4D] text-lg font-bold block">{incorrectCount}</span>
                <span className="text-[#8b9982]">Incorrect (-{incorrectCount})</span>
              </div>
              <div className="bg-[#182114] border border-[#2d3b25] p-3 rounded-xl">
                <span className="text-[#8b9982] text-lg font-bold block">{unattemptedCount}</span>
                <span className="text-[#8b9982]">Unattempted</span>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="px-5 py-3 rounded-xl bg-[#769826] hover:bg-[#688620] text-white font-mono text-xs font-bold transition-all shadow-md flex items-center gap-2 border border-[#A1CB35]/60"
            >
              <RotateCcw className="w-4 h-4 text-[#FFDE4E]" />
              <span>Retake Test</span>
            </button>
          </div>

          {/* Question-by-Question Solution Analysis */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-[#f2f6ee]">Detailed Solutions & Error Breakdown</h3>

            {test.questions.map((q, idx) => {
              const userAns = answers[q.id];
              const isMcq = q.type === 'mcq';
              const isAttempted = userAns !== undefined && userAns !== '';
              const isRight = isMcq
                ? userAns === q.correctOptionIndex
                : isAttempted &&
                  Math.abs(Number(userAns) - (q.correctNumericalValue || 0)) <= (q.tolerance || 0.1);

              return (
                <div
                  key={q.id}
                  className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-5 flex flex-col gap-3 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs bg-[#182114] px-2.5 py-0.5 rounded text-[#f2f6ee] font-bold border border-[#2d3b25]">
                        Q{idx + 1}
                      </span>
                      {isRight ? (
                        <span className="font-mono text-xs text-[#A1CB35] flex items-center gap-1 bg-[#1a2514] border border-[#769826]/30 px-2 py-0.5 rounded font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+4)
                        </span>
                      ) : isAttempted ? (
                        <span className="font-mono text-xs text-[#FF9D4D] flex items-center gap-1 bg-[#241a10] border border-[#FF9D4D]/30 px-2 py-0.5 rounded font-bold">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect (-1)
                        </span>
                      ) : (
                        <span className="font-mono text-xs text-[#8b9982] bg-[#0c1109] px-2 py-0.5 rounded">
                          Unattempted (0)
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[#f2f6ee]">{q.text}</p>

                  <div className="bg-[#0c1109] border border-[#2d3b25] p-3.5 rounded-xl font-mono text-xs flex flex-col gap-1.5">
                    <div className="text-[#FFDE4E] font-bold">Explanation:</div>
                    <p className="text-[#c2ceb8] leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
