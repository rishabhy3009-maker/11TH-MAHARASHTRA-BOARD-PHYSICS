import React from 'react';
import {
  Atom,
  Search,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  FlaskConical,
  BookOpen,
  FileText,
  Calculator,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'chapters' | 'virtual-labs' | 'formula-vault' | 'mock-tests' | 'ai-tutor';
  setActiveTab: (tab: 'chapters' | 'virtual-labs' | 'formula-vault' | 'mock-tests' | 'ai-tutor') => void;
  onOpenSearch: () => void;
  completedChaptersCount: number;
  totalChapters: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  completedChaptersCount,
  totalChapters,
}) => {
  const completionPercentage = Math.round((completedChaptersCount / totalChapters) * 100);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#12180e]/95 backdrop-blur-xl border-b border-[#2d3b25] shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
      <div className="h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand Logo & Exam Context */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('chapters')}
            className="flex items-center gap-3 text-left group transition-all"
            aria-label="PhysikOS Home"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1e2718] border border-[#769826]/40 flex items-center justify-center text-[#A1CB35] group-hover:scale-105 group-hover:border-[#A1CB35] transition-all shadow-inner">
              <Atom className="w-5 h-5 animate-pulse-glow" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-[#f2f6ee] tracking-tight leading-none group-hover:text-[#A1CB35] transition-colors">
                PhysikOS
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFDE4E] uppercase mt-1">
                MH-XI • JEE MAIN 2026
              </span>
            </div>
          </button>

          {/* Main Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'chapters'
                  ? 'bg-[#769826] text-white shadow-[0_0_16px_rgba(161,203,53,0.35)] border border-[#A1CB35]/60'
                  : 'text-[#c2ceb8] hover:text-[#f2f6ee] hover:bg-[#1a2315]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#A1CB35]" />
              <span>Chapters (1-14)</span>
            </button>

            <button
              onClick={() => setActiveTab('virtual-labs')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'virtual-labs'
                  ? 'bg-[#769826] text-white shadow-[0_0_16px_rgba(161,203,53,0.35)] border border-[#A1CB35]/60'
                  : 'text-[#c2ceb8] hover:text-[#f2f6ee] hover:bg-[#1a2315]'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-[#FF9D4D]" />
              <span>Virtual Labs (Sims)</span>
            </button>

            <button
              onClick={() => setActiveTab('formula-vault')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'formula-vault'
                  ? 'bg-[#769826] text-white shadow-[0_0_16px_rgba(161,203,53,0.35)] border border-[#A1CB35]/60'
                  : 'text-[#c2ceb8] hover:text-[#f2f6ee] hover:bg-[#1a2315]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-[#FFDE4E]" />
              <span>Formula Vault</span>
            </button>

            <button
              onClick={() => setActiveTab('mock-tests')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'mock-tests'
                  ? 'bg-[#769826] text-white shadow-[0_0_16px_rgba(161,203,53,0.35)] border border-[#A1CB35]/60'
                  : 'text-[#c2ceb8] hover:text-[#f2f6ee] hover:bg-[#1a2315]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#FF9D4D]" />
              <span>JEE Mock Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-tutor')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'ai-tutor'
                  ? 'bg-[#769826] text-white shadow-[0_0_16px_rgba(161,203,53,0.35)] border border-[#A1CB35]/60'
                  : 'text-[#c2ceb8] hover:text-[#f2f6ee] hover:bg-[#1a2315]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFDE4E]" />
              <span>AI Doubt Solver</span>
            </button>
          </nav>
        </div>

        {/* Global Search Bar (Trigger) */}
        <div className="flex-1 max-w-sm hidden md:block mx-2">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between bg-[#0c1109] hover:bg-[#182114] border border-[#2d3b25] rounded-xl px-3.5 py-1.5 text-left text-xs text-[#8b9982] transition-all group shadow-inner"
            aria-label="Search physics topics, formulas, derivations, or questions"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#8b9982] group-hover:text-[#A1CB35] transition-colors" />
              <span className="truncate">Search topics, formulas, or JEE questions...</span>
            </div>
            <kbd className="font-mono text-[10px] text-[#FFDE4E] bg-[#1a2315] border border-[#2d3b25] px-1.5 py-0.5 rounded shadow-sm">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* HUD Performance Metrics in 4-Color Palette */}
        <div className="flex items-center gap-3">
          {/* Syllabus Progress */}
          <div className="hidden lg:flex items-center gap-2.5 bg-[#182114] border border-[#2d3b25] px-3 py-1.5 rounded-xl">
            <div className="flex flex-col items-end text-right">
              <span className="text-[10px] font-mono font-bold text-[#A1CB35] uppercase tracking-wider">
                {completionPercentage}% Completed
              </span>
              <span className="text-xs font-mono text-[#c2ceb8]">
                {completedChaptersCount}/{totalChapters} Ch Synced
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#0c1109] border border-[#769826]/40 flex items-center justify-center text-[#A1CB35]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* JEE Mock Target */}
          <div className="hidden 2xl:flex items-center gap-2 bg-[#182114] border border-[#2d3b25] px-3 py-1.5 rounded-xl">
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-mono font-bold text-[#FF9D4D] uppercase tracking-wider">
                JEE Mock Avg
              </span>
              <span className="text-xs font-mono text-[#f2f6ee]">
                84/100 • <strong className="text-[#FFDE4E]">98.8 %ile</strong>
              </span>
            </div>
            <TrendingUp className="w-4 h-4 text-[#FF9D4D]" />
          </div>

          {/* Mobile search toggle */}
          <button
            onClick={onOpenSearch}
            className="md:hidden w-9 h-9 rounded-xl bg-[#182114] border border-[#2d3b25] flex items-center justify-center text-[#8b9982] hover:text-[#f2f6ee]"
            aria-label="Open search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Student Status Avatar with 4-color gradient */}
          <div
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#769826] via-[#A1CB35] to-[#FFDE4E] p-[2px] cursor-pointer shadow-md"
            title="Class 11 Physics Scholar Profile"
          >
            <div className="w-full h-full rounded-full bg-[#0c1109] flex items-center justify-center text-xs font-mono font-extrabold text-[#A1CB35]">
              11th
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Secondary Tab Ribbon */}
      <div className="xl:hidden flex items-center overflow-x-auto px-4 py-2 gap-2 bg-[#0c1109]/95 border-t border-[#2d3b25]">
        <button
          onClick={() => setActiveTab('chapters')}
          className={`px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
            activeTab === 'chapters'
              ? 'bg-[#769826] text-white font-bold'
              : 'text-[#8b9982]'
          }`}
        >
          Chapters (1-14)
        </button>
        <button
          onClick={() => setActiveTab('virtual-labs')}
          className={`px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
            activeTab === 'virtual-labs'
              ? 'bg-[#769826] text-white font-bold'
              : 'text-[#8b9982]'
          }`}
        >
          Virtual Labs
        </button>
        <button
          onClick={() => setActiveTab('formula-vault')}
          className={`px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
            activeTab === 'formula-vault'
              ? 'bg-[#769826] text-white font-bold'
              : 'text-[#8b9982]'
          }`}
        >
          Formula Vault
        </button>
        <button
          onClick={() => setActiveTab('mock-tests')}
          className={`px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
            activeTab === 'mock-tests'
              ? 'bg-[#769826] text-white font-bold'
              : 'text-[#8b9982]'
          }`}
        >
          JEE Mocks
        </button>
        <button
          onClick={() => setActiveTab('ai-tutor')}
          className={`px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
            activeTab === 'ai-tutor'
              ? 'bg-[#769826] text-white font-bold'
              : 'text-[#8b9982]'
          }`}
        >
          AI Doubt Solver
        </button>
      </div>
    </header>
  );
};
