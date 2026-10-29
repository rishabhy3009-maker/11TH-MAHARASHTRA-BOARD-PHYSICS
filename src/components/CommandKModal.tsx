import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { FORMULA_VAULT } from '../data/formulaVaultData';
import { formatMathEquation } from '../utils/physicsCalculations';
import { Search, BookOpen, Calculator, FlaskConical, X, ChevronRight } from 'lucide-react';

interface CommandKModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (id: number) => void;
  onSelectFormula: () => void;
  onSelectSim: (chapterId: number) => void;
}

export const CommandKModal: React.FC<CommandKModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  onSelectFormula,
  onSelectSim,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingChapters = CHAPTERS_DATA.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.toLowerCase().includes(q)) ||
      c.description.toLowerCase().includes(q)
  ).slice(0, 5);

  const matchingFormulas = FORMULA_VAULT.filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.equation.toLowerCase().includes(q) ||
      f.chapterTitle.toLowerCase().includes(q)
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-[#12180e] border border-[#2d3b25] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#2d3b25] bg-[#182114]">
          <Search className="w-5 h-5 text-[#A1CB35] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chapters, formulas, derivations, or simulations..."
            className="w-full bg-transparent text-sm text-[#f2f6ee] placeholder:text-[#8b9982] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8b9982] hover:text-[#f2f6ee] hover:bg-[#202a1b]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results list */}
        <div className="max-h-96 overflow-y-auto p-4 flex flex-col gap-4">
          {/* Chapter Matches */}
          {matchingChapters.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-[#A1CB35] uppercase font-bold">
                Chapters & Modules:
              </span>
              {matchingChapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    onSelectChapter(ch.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#182114] hover:bg-[#202a1b] border border-[#2d3b25] text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#A1CB35] bg-[#0c1109] px-2 py-0.5 rounded font-bold">
                      CH {ch.numberStr}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-[#f2f6ee] group-hover:text-[#A1CB35]">
                        {ch.title}
                      </span>
                      <span className="text-[10px] text-[#8b9982] block">
                        HSC {ch.hscMarks}M • JEE {ch.jeeMarks}M
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8b9982] group-hover:text-[#A1CB35]" />
                </button>
              ))}
            </div>
          )}

          {/* Formula Matches */}
          {matchingFormulas.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-[#FFDE4E] uppercase font-bold">
                Formulae & Equations:
              </span>
              {matchingFormulas.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    onSelectFormula();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#182114] hover:bg-[#202a1b] border border-[#2d3b25] text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Calculator className="w-4 h-4 text-[#FFDE4E] shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-[#f2f6ee]">{f.name}</span>
                      <code className="font-mono text-[11px] text-[#FFDE4E] block font-bold">
                        {formatMathEquation(f.equation)}
                      </code>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8b9982] group-hover:text-[#FFDE4E]" />
                </button>
              ))}
            </div>
          )}

          {matchingChapters.length === 0 && matchingFormulas.length === 0 && (
            <div className="text-center py-8 text-xs font-mono text-[#8b9982]">
              No direct matches found for "{query}". Try keywords like "projectile", "lens", "friction", or "vectors".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t border-[#2d3b25] bg-[#182114] flex items-center justify-between text-[11px] font-mono text-[#8b9982]">
          <span>Navigation: Select to open</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
