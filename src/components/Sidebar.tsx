import React from 'react';
import { Chapter } from '../types/physics';
import { BookOpen, CheckCircle, Sliders, ChevronRight } from 'lucide-react';

interface SidebarProps {
  chapters: Chapter[];
  selectedChapterId: number;
  onSelectChapter: (id: number) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chapters,
  selectedChapterId,
  onSelectChapter,
  isOpenMobile,
  onCloseMobile,
}) => {
  const completedCount = chapters.filter((c) => c.status === 'Completed').length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-16 bottom-0 w-80 bg-[#12180e] border-r border-[#2d3b25] z-40 flex flex-col shadow-[0_4px_24px_-2px_rgba(0,0,0,0.6)] transition-transform duration-200 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        aria-label="Curriculum Navigation"
      >
        {/* Sidebar Header & Syllabus Stats */}
        <div className="px-4 py-3.5 bg-[#12180e] border-b border-[#2d3b25]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#A1CB35]" />
              <span className="font-mono text-xs font-bold text-[#f2f6ee] tracking-wider uppercase">
                Class 11 Physics (HSC)
              </span>
            </div>
            <span className="font-mono text-[11px] font-bold text-[#FFDE4E] bg-[#1a2315] border border-[#2d3b25] px-2 py-0.5 rounded">
              14 Ch
            </span>
          </div>

          {/* Progress bar with 4-color gradient */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8b9982] mb-1.5">
            <span>Progress: <strong className="text-[#A1CB35]">{progressPercent}%</strong></span>
            <span>{completedCount}/14 Completed</span>
          </div>
          <div className="w-full bg-[#080c06] h-2 rounded-full overflow-hidden border border-[#2d3b25]">
            <div
              className="bg-gradient-to-r from-[#769826] via-[#A1CB35] to-[#FFDE4E] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(161,203,53,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Scrollable Chapter List */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1" aria-label="Chapters">
          {chapters.map((ch) => {
            const isSelected = ch.id === selectedChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => {
                  onSelectChapter(ch.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all group ${
                  isSelected
                    ? 'bg-[#769826] text-white shadow-[0_0_16px_rgba(118,152,38,0.4)] border border-[#A1CB35]/70 font-semibold'
                    : 'text-[#c2ceb8] hover:bg-[#1a2315] hover:text-[#f2f6ee]'
                }`}
                aria-current={isSelected ? 'page' : undefined}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-[#FFDE4E]' : 'text-[#8b9982] group-hover:text-[#A1CB35]'
                    }`}
                  >
                    {ch.numberStr}
                  </span>
                  <span className="text-xs truncate tracking-tight">
                    {ch.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {ch.status === 'Completed' && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isSelected
                          ? 'bg-[#182114] text-[#A1CB35] border border-[#A1CB35]/40'
                          : 'bg-[#1a2514] text-[#A1CB35] border border-[#769826]/30'
                      }`}
                    >
                      Done
                    </span>
                  )}
                  {ch.status === 'Active' && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isSelected
                          ? 'bg-[#291e14] text-[#FF9D4D] border border-[#FF9D4D]/40'
                          : 'bg-[#241a10] text-[#FF9D4D] border border-[#FF9D4D]/30'
                      }`}
                    >
                      Active
                    </span>
                  )}
                  {ch.status === 'Pending' && (
                    <span className="text-[10px] font-mono text-[#8b9982] bg-[#0c1109] px-1.5 py-0.5 rounded">
                      Pending
                    </span>
                  )}
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'opacity-100 text-[#FFDE4E]' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Precision HUD Footer */}
        <div className="p-3 bg-[#12180e] border-t border-[#2d3b25]">
          <div className="bg-[#182114] border border-[#2d3b25] rounded-xl p-2.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#202a1b] flex items-center justify-center text-[#FFDE4E]">
                <Sliders className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#f2f6ee]">Precision HUD</span>
                <span className="text-[10px] font-mono text-[#8b9982]">LaTeX & SI-Rigorous</span>
              </div>
            </div>
            <CheckCircle className="w-4 h-4 text-[#A1CB35]" />
          </div>
        </div>
      </aside>
    </>
  );
};
