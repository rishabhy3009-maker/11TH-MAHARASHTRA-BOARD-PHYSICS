import React, { useState } from 'react';
import { FORMULA_VAULT } from '../data/formulaVaultData';
import { FormulaVaultItem, ChapterCategory } from '../types/physics';
import { formatMathEquation } from '../utils/physicsCalculations';
import {
  Calculator,
  Search,
  Sliders,
  Layers,
  Sparkles,
  RotateCcw,
  Check,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export const FormulaVault: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ChapterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFormula, setActiveFormula] = useState<FormulaVaultItem>(FORMULA_VAULT[0]);
  const [variableInputs, setVariableInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    FORMULA_VAULT[0].variables.forEach((v) => {
      initial[v.symbol] = v.defaultValue;
    });
    return initial;
  });

  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleSelectFormula = (item: FormulaVaultItem) => {
    setActiveFormula(item);
    const initial: Record<string, number> = {};
    item.variables.forEach((v) => {
      initial[v.symbol] = v.defaultValue;
    });
    setVariableInputs(initial);
  };

  const handleInputChange = (symbol: string, val: number) => {
    setVariableInputs((prev) => ({ ...prev, [symbol]: val }));
  };

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFormulas = FORMULA_VAULT.filter((f) => {
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.equation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const calculationResult = activeFormula.compute(variableInputs);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#A1CB35] mb-1">
            <Calculator className="w-5 h-5 text-[#FFDE4E]" />
            <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#A1CB35]">
              Formula Vault & SI Precision Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f2f6ee]">
            Physics Formula Master Vault
          </h1>
          <p className="text-xs sm:text-sm text-[#c2ceb8] mt-1">
            Dimensional formulas [M^a L^b T^c], SI standard units, and interactive calculators with step-by-step substitution.
          </p>
        </div>

        <button
          onClick={() => setIsFlashcardMode(!isFlashcardMode)}
          className={`px-4 py-2.5 rounded-xl font-mono text-xs transition-all flex items-center gap-2 ${
            isFlashcardMode
              ? 'bg-[#769826] text-white shadow-md font-bold border border-[#A1CB35]'
              : 'bg-[#182114] hover:bg-[#202a1b] text-[#f2f6ee] border border-[#2d3b25]'
          }`}
        >
          <Layers className="w-4 h-4 text-[#FF9D4D]" />
          <span>{isFlashcardMode ? 'Exit Flashcard Mode' : 'Flashcard Recall Mode'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#12180e] p-3 rounded-xl border border-[#2d3b25]">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {(['all', 'mechanics', 'thermal-sound', 'optics', 'electromagnetism'] as ChapterCategory[]).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs capitalize whitespace-nowrap transition-all font-bold ${
                  selectedCategory === cat
                    ? 'bg-[#769826] text-white shadow-sm border border-[#A1CB35]/60'
                    : 'text-[#8b9982] hover:text-[#f2f6ee]'
                }`}
              >
                {cat.replace('-', ' & ')}
              </button>
            )
          )}
        </div>

        <div className="relative md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search equation or physical concept..."
            className="w-full bg-[#0c1109] text-[#f2f6ee] placeholder:text-[#8b9982] text-xs px-3.5 py-2 rounded-xl border border-[#2d3b25] focus:outline-none focus:border-[#A1CB35]"
          />
          <Search className="w-3.5 h-3.5 text-[#8b9982] absolute right-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Main Grid: Calculator Workstation + Formula Library */}
      {!isFlashcardMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Formula Calculator */}
          <div className="lg:col-span-7 bg-[#12180e] border border-[#2d3b25] rounded-2xl p-6 flex flex-col gap-5 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs text-[#A1CB35] bg-[#182114] border border-[#2d3b25] px-2 py-0.5 rounded font-bold">
                  {activeFormula.chapterTitle}
                </span>
                <h2 className="text-xl font-extrabold text-[#f2f6ee] mt-2">{activeFormula.name}</h2>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="text-[#8b9982] block">Dimensions:</span>
                <span className="text-[#A1CB35] font-bold">{activeFormula.dimensionalFormula}</span>
              </div>
            </div>

            {/* Formula Equation Banner */}
            <div className="bg-[#0c1109] border border-[#2d3b25] rounded-xl p-4 text-center">
              <span className="font-mono text-xl text-[#FFDE4E] font-extrabold">
                {formatMathEquation(activeFormula.equation)}
              </span>
              <div className="text-xs font-mono text-[#8b9982] mt-1">
                SI Unit: <strong className="text-[#A1CB35]">{activeFormula.siUnit}</strong>
              </div>
            </div>

            {/* Variable Sliders */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs uppercase text-[#f2f6ee] font-bold">
                Adjust Variables & Constants:
              </span>
              {activeFormula.variables.map((v) => {
                const currentVal = variableInputs[v.symbol] ?? v.defaultValue;
                return (
                  <div key={v.symbol} className="bg-[#182114] border border-[#2d3b25] p-3.5 rounded-xl flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#f2f6ee]">
                        {v.label} ({v.symbol}):
                      </span>
                      <span className="text-[#FFDE4E] font-bold">
                        {currentVal} {v.unit}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={v.min ?? 0}
                        max={v.max ?? 100}
                        step={v.step ?? 1}
                        value={currentVal}
                        onChange={(e) => handleInputChange(v.symbol, Number(e.target.value))}
                        className="flex-1 h-1.5 bg-[#202a1b] rounded-lg accent-[#A1CB35] cursor-pointer"
                      />
                      <input
                        type="number"
                        step={v.step ?? 1}
                        value={currentVal}
                        onChange={(e) => handleInputChange(v.symbol, Number(e.target.value))}
                        className="w-20 bg-[#0c1109] border border-[#2d3b25] rounded-lg px-2 py-1 text-xs font-mono text-[#f2f6ee]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step-by-Step Mathematical Substitution */}
            <div className="bg-[#0c1109] border border-[#2d3b25] rounded-xl p-4 flex flex-col gap-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-[#A1CB35] font-bold">
                <span>Calculated Solution:</span>
                <span className="text-base text-[#FFDE4E]">
                  {calculationResult.value} {calculationResult.unit}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 pt-2 border-t border-[#2d3b25] text-[#c2ceb8]">
                {calculationResult.steps.map((st, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-[#A1CB35] font-bold">{i + 1}.</span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formula List Directory */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="font-mono text-xs uppercase text-[#8b9982] font-bold">
              Select Formula to Compute ({filteredFormulas.length} Available)
            </span>

            <div className="flex flex-col gap-2.5 max-h-[650px] overflow-y-auto pr-1">
              {filteredFormulas.map((f) => {
                const isSelected = activeFormula.id === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => handleSelectFormula(f)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#182114] border-[#A1CB35] shadow-[0_0_12px_rgba(161,203,53,0.25)] text-[#f2f6ee]'
                        : 'bg-[#12180e] border-[#2d3b25] hover:bg-[#182114] text-[#c2ceb8]'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-[10px] text-[#8b9982] block">
                        {f.chapterTitle}
                      </span>
                      <h4 className="text-xs font-bold text-[#f2f6ee] mt-0.5">{f.name}</h4>
                      <code className="font-mono text-[11px] text-[#FFDE4E] block mt-1 font-bold">
                        {formatMathEquation(f.equation)}
                      </code>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-[#A1CB35] translate-x-1' : 'text-[#8b9982]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Flashcard Revision Mode in 4 Colors */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFormulas.map((f) => {
            const isFlipped = flippedCards[f.id];
            return (
              <div
                key={f.id}
                onClick={() => toggleFlip(f.id)}
                className="h-64 bg-[#12180e] border border-[#2d3b25] hover:border-[#A1CB35] rounded-2xl p-6 cursor-pointer transition-all flex flex-col justify-between shadow-lg relative group"
              >
                {!isFlipped ? (
                  <>
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-[#A1CB35] uppercase font-bold">
                        {f.chapterTitle}
                      </span>
                      <h3 className="text-base font-bold text-[#f2f6ee]">{f.name}</h3>
                      <p className="text-xs text-[#c2ceb8] mt-2 leading-relaxed">
                        Click card to reveal formula equation, dimensional formula, and SI units!
                      </p>
                    </div>

                    <span className="font-mono text-[11px] text-[#FFDE4E] flex items-center gap-1 font-bold">
                      <Sparkles className="w-3.5 h-3.5" /> Tap to Flip
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      <span className="font-mono text-[10px] text-[#FF9D4D] uppercase font-bold">
                        Formula Unveiled
                      </span>
                      <div className="bg-[#0c1109] border border-[#2d3b25] p-3 rounded-xl text-center font-mono text-sm text-[#FFDE4E] font-bold">
                        {formatMathEquation(f.equation)}
                      </div>
                      <div className="flex flex-col gap-1 font-mono text-xs">
                        <span className="text-[#8b9982]">
                          Dimensions: <strong className="text-[#f2f6ee]">{f.dimensionalFormula}</strong>
                        </span>
                        <span className="text-[#8b9982]">
                          SI Unit: <strong className="text-[#A1CB35]">{f.siUnit}</strong>
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-[11px] text-[#8b9982]">
                      Click to flip back
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
