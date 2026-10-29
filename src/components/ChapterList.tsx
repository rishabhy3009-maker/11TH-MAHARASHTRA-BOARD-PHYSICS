import React, { useState, useMemo } from 'react';
import { Chapter, ChapterCategory } from '../types/physics';
import { formatMathEquation } from '../utils/physicsCalculations';
import {
  Terminal,
  Search,
  LayoutGrid,
  FileText,
  FlaskConical,
  HelpCircle,
  ShieldCheck,
  AlertTriangle,
  PlayCircle,
  BookOpen,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface ChapterListProps {
  chapters: Chapter[];
  selectedChapterId: number;
  onSelectChapter: (id: number) => void;
  onOpenDossier: (id: number) => void;
  onLaunchSim: (chapterId: number) => void;
  onOpenQuiz: (chapterId: number) => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({
  chapters,
  selectedChapterId,
  onSelectChapter,
  onOpenDossier,
  onLaunchSim,
  onOpenQuiz,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ChapterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDenseView, setIsDenseView] = useState(false);

  // Inspector mini-sim interactive state
  const [inspectorAngle, setInspectorAngle] = useState(45);
  const [inspectorSpeed, setInspectorSpeed] = useState(25);

  const selectedChapter = useMemo(() => {
    return chapters.find((c) => c.id === selectedChapterId) || chapters[2]; // defaults to Ch 3
  }, [chapters, selectedChapterId]);

  // Mini-sim real-time calculations
  const miniSimResults = useMemo(() => {
    const rad = (inspectorAngle * Math.PI) / 180;
    const g = 9.8;
    const vx = inspectorSpeed * Math.cos(rad);
    const vy = inspectorSpeed * Math.sin(rad);
    const timeOfFlight = (2 * vy) / g;
    const maxHeight = (vy * vy) / (2 * g);
    const range = (inspectorSpeed * inspectorSpeed * Math.sin(2 * rad)) / g;

    return {
      vx: vx.toFixed(1),
      range: range.toFixed(1),
      flightTime: timeOfFlight.toFixed(2),
      maxHeight: maxHeight.toFixed(1),
    };
  }, [inspectorAngle, inspectorSpeed]);

  const filteredChapters = useMemo(() => {
    return chapters.filter((ch) => {
      const matchesCategory = selectedCategory === 'all' || ch.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ch.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [chapters, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col w-full">
      {/* Command Hub Sub-Navigation & Syllabus Control */}
      <div className="w-full bg-[#12180e] px-4 sm:px-6 py-6 flex flex-col gap-6 border-b border-[#2d3b25]">
        {/* Top Bar: Academic Context & Filter Engine */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[#A1CB35] mb-1">
              <Terminal className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#A1CB35]">
                Maharashtra HSC Class 11 • Target JEE Main 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f2f6ee] tracking-tight">
              Syllabus Master Architecture
            </h1>
            <p className="text-sm text-[#c2ceb8] max-w-2xl mt-1 leading-relaxed">
              14 calibrated physics modules calibrated to Maharashtra State Board benchmarks and elevated to JEE Main single-choice, numerical integer, and graphical analysis standards.
            </p>
          </div>

          {/* Quick Metrics Ribbon in 4 Colors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#182114] border border-[#2d3b25] px-3.5 py-2.5 rounded-xl flex flex-col shadow-sm">
              <span className="font-mono text-[10px] text-[#8b9982] uppercase">Chapters</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-bold text-[#f2f6ee]">14</span>
                <span className="font-mono text-[11px] font-bold text-[#A1CB35]">100% Synced</span>
              </div>
            </div>

            <div className="bg-[#182114] border border-[#2d3b25] px-3.5 py-2.5 rounded-xl flex flex-col shadow-sm">
              <span className="font-mono text-[10px] text-[#8b9982] uppercase">Virtual Labs</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-bold text-[#FF9D4D]">42</span>
                <span className="font-mono text-[11px] text-[#8b9982]">Live Sims</span>
              </div>
            </div>

            <div className="bg-[#182114] border border-[#2d3b25] px-3.5 py-2.5 rounded-xl flex flex-col shadow-sm">
              <span className="font-mono text-[10px] text-[#8b9982] uppercase">Formula Cards</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-bold text-[#FFDE4E]">350+</span>
                <span className="font-mono text-[11px] font-bold text-[#A1CB35]">SI Rigor</span>
              </div>
            </div>

            <div className="bg-[#182114] border border-[#2d3b25] px-3.5 py-2.5 rounded-xl flex flex-col shadow-sm">
              <span className="font-mono text-[10px] text-[#8b9982] uppercase">JEE Mocks</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-lg font-bold text-[#f2f6ee]">5</span>
                <span className="font-mono text-[11px] font-bold text-[#FF9D4D]">NTA Pattern</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Filter Bar & Interactive Category Switcher */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#182114]/80 backdrop-blur-md p-2 rounded-xl border border-[#2d3b25]">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0" id="filter-container">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                  : 'text-[#8b9982] hover:bg-[#202a1b] hover:text-[#f2f6ee]'
              }`}
            >
              ALL (14)
            </button>
            <button
              onClick={() => setSelectedCategory('mechanics')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'mechanics'
                  ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                  : 'text-[#8b9982] hover:bg-[#202a1b] hover:text-[#f2f6ee]'
              }`}
            >
              MECHANICS (1-6)
            </button>
            <button
              onClick={() => setSelectedCategory('thermal-sound')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'thermal-sound'
                  ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                  : 'text-[#8b9982] hover:bg-[#202a1b] hover:text-[#f2f6ee]'
              }`}
            >
              THERMAL & SOUND (7-8)
            </button>
            <button
              onClick={() => setSelectedCategory('optics')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'optics'
                  ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                  : 'text-[#8b9982] hover:bg-[#202a1b] hover:text-[#f2f6ee]'
              }`}
            >
              OPTICS (9)
            </button>
            <button
              onClick={() => setSelectedCategory('electromagnetism')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'electromagnetism'
                  ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                  : 'text-[#8b9982] hover:bg-[#202a1b] hover:text-[#f2f6ee]'
              }`}
            >
              ELECTROMAGNETISM (10-12)
            </button>
            <button
              onClick={() => setSelectedCategory('modern')}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === 'modern'
                  ? 'bg-[#769826] text-white shadow-md border border-[#A1CB35]/60'
                  : 'text-[#8b9982] hover:bg-[#202a1b] hover:text-[#f2f6ee]'
              }`}
            >
              MODERN & WAVES (13-14)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter subtopics, laws..."
                className="w-full bg-[#0c1109] text-[#f2f6ee] placeholder:text-[#8b9982] text-xs px-3.5 py-1.5 rounded-xl border border-[#2d3b25] focus:outline-none focus:border-[#A1CB35]"
              />
              <Search className="w-3.5 h-3.5 text-[#8b9982] absolute right-3 top-2 pointer-events-none" />
            </div>
            <button
              onClick={() => setIsDenseView(!isDenseView)}
              className="p-1.5 bg-[#182114] hover:bg-[#202a1b] border border-[#2d3b25] text-[#8b9982] hover:text-[#f2f6ee] rounded-xl transition-colors"
              title="Toggle Grid Density"
              aria-label="Toggle Grid Density"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Workstation Layout: 12-Column Grid */}
      <div className="w-full px-4 sm:px-6 py-6 grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Chapter Cards Matrix (7 Columns on xl, 8 on 2xl) */}
        <div className="xl:col-span-7 2xl:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#f2f6ee]">Curriculum Stream</h2>
              <span className="font-mono text-xs text-[#8b9982]">
                {filteredChapters.length} Modules Active
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#8b9982]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#A1CB35]"></span> Board Direct
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF9D4D]"></span> JEE Weightage
              </span>
            </div>
          </div>

          {/* Grid of Chapter Cards */}
          <div
            className={`grid gap-4 ${
              isDenseView
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 lg:grid-cols-2'
            }`}
          >
            {filteredChapters.map((ch) => {
              const isSelected = ch.id === selectedChapterId;
              return (
                <div
                  key={ch.id}
                  onClick={() => onSelectChapter(ch.id)}
                  className={`group rounded-2xl p-5 transition-all flex flex-col justify-between border cursor-pointer relative overflow-hidden shadow-md ${
                    isSelected
                      ? 'bg-[#182114] border-[#A1CB35] shadow-[0_0_20px_-4px_rgba(161,203,53,0.3)]'
                      : 'bg-[#12180e] border-[#2d3b25] hover:bg-[#182114] hover:border-[#769826]'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -right-10 -top-10 w-28 h-28 bg-[#A1CB35]/15 rounded-full blur-xl pointer-events-none" />
                  )}

                  <div>
                    {/* Top Row: Chapter Badge & Marks */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-mono text-xs px-2.5 py-0.5 rounded-lg font-bold ${
                            isSelected
                              ? 'text-[#0c1109] bg-[#A1CB35]'
                              : 'text-[#A1CB35] bg-[#769826]/20 border border-[#769826]/40'
                          }`}
                        >
                          CH {ch.numberStr}
                        </span>
                        {ch.status === 'Completed' && (
                          <span className="font-mono text-[10px] text-[#A1CB35] bg-[#1a2514] border border-[#769826]/30 px-2 py-0.5 rounded font-bold">
                            Completed
                          </span>
                        )}
                        {ch.status === 'Active' && (
                          <span className="font-mono text-[10px] text-[#FF9D4D] bg-[#241a10] border border-[#FF9D4D]/30 px-2 py-0.5 rounded font-bold">
                            Active
                          </span>
                        )}
                        {ch.status === 'Pending' && (
                          <span className="font-mono text-[10px] text-[#8b9982] bg-[#0c1109] px-2 py-0.5 rounded">
                            Pending
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 font-mono text-[11px]">
                        <span className="text-[#FFDE4E]">HSC: {ch.hscMarks}M</span>
                        <span className="text-[#8b9982]">•</span>
                        <span className="text-[#FF9D4D] font-bold">JEE: {ch.jeeMarks}M</span>
                      </div>
                    </div>

                    {/* Chapter Title & Tagline */}
                    <h3
                      className={`font-bold text-base transition-colors ${
                        isSelected ? 'text-[#A1CB35]' : 'text-[#f2f6ee] group-hover:text-[#A1CB35]'
                      }`}
                    >
                      {ch.title}
                    </h3>
                    <p className="text-xs text-[#c2ceb8] mt-1.5 line-clamp-2 leading-relaxed">
                      {ch.description}
                    </p>

                    {/* Key Equations Snippet in #FFDE4E */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ch.keyFormulas.slice(0, 2).map((kf, idx) => (
                        <span
                          key={idx}
                          className="font-mono text-[11px] bg-[#182114] border border-[#2d3b25] px-2.5 py-0.5 rounded-lg text-[#FFDE4E] font-medium"
                        >
                          {formatMathEquation(kf.latex)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-[#2d3b25] flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDossier(ch.id);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#202a1b] hover:bg-[#769826] text-[#f2f6ee] font-mono text-[11px] transition-colors flex items-center gap-1 font-semibold border border-[#2d3b25]"
                      >
                        <FileText className="w-3 h-3 text-[#A1CB35]" />
                        <span>Dossier</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLaunchSim(ch.id);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#241a10] hover:bg-[#FF9D4D]/25 text-[#FF9D4D] font-mono text-[11px] transition-colors flex items-center gap-1 font-semibold border border-[#FF9D4D]/30"
                      >
                        <FlaskConical className="w-3 h-3" />
                        <span>Lab</span>
                      </button>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuiz(ch.id);
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#182114] hover:bg-[#202a1b] text-[#c2ceb8] hover:text-[#FFDE4E] font-mono text-[11px] transition-colors flex items-center gap-1 border border-[#2d3b25]"
                    >
                      <HelpCircle className="w-3 h-3 text-[#FFDE4E]" />
                      <span>{ch.questions.length * 20 + 28} MCQs</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Chapter Deep Dive Inspector (5 Columns on xl, 4 on 2xl) */}
        <div className="xl:col-span-5 2xl:col-span-4 flex flex-col gap-4">
          <div className="bg-[#12180e] border border-[#2d3b25] rounded-2xl p-5 sticky top-20 flex flex-col gap-4 shadow-xl">
            {/* Deck Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#A1CB35]" />
                <span className="font-mono text-xs uppercase text-[#A1CB35] tracking-widest font-extrabold">
                  Active Analysis Hub
                </span>
              </div>
              <span className="font-mono text-xs text-[#0c1109] bg-[#A1CB35] px-2 py-0.5 rounded font-extrabold">
                HSC-11.{selectedChapter.numberStr}
              </span>
            </div>

            <div className="flex flex-col">
              <h2 className="text-xl font-extrabold text-[#f2f6ee]">{selectedChapter.title}</h2>
              <span className="text-xs text-[#c2ceb8] mt-0.5">{selectedChapter.tagline}</span>
            </div>

            {/* Interactive Simulation HUD Canvas Preview */}
            <div className="relative w-full h-56 bg-[#0c1109] border border-[#2d3b25] rounded-xl overflow-hidden flex flex-col justify-between p-3 group">
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #A1CB35 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Dynamic SVG Projectile Trajectory Visualizer */}
              <svg className="absolute inset-0 w-full h-full p-2 pointer-events-none" viewBox="0 0 320 180">
                {/* Axis Lines */}
                <line x1="20" y1="150" x2="300" y2="150" stroke="#2d3b25" strokeWidth="1.5" />
                <line x1="20" y1="150" x2="20" y2="20" stroke="#2d3b25" strokeWidth="1.5" />

                {/* Parabolic Trajectory Curve in #A1CB35 */}
                <path
                  d={`M 20 150 Q ${20 + Number(miniSimResults.range) * 1.8} ${150 - Number(miniSimResults.maxHeight) * 3.5} ${Math.min(300, 20 + Number(miniSimResults.range) * 3.6)} 150`}
                  fill="none"
                  stroke="#A1CB35"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />

                {/* Apex Point & Vector in #FFDE4E */}
                <circle
                  cx={Math.min(290, 20 + Number(miniSimResults.range) * 1.8)}
                  cy={Math.max(25, 150 - Number(miniSimResults.maxHeight) * 1.75)}
                  r="4"
                  fill="#FFDE4E"
                />
                <line
                  x1={Math.min(290, 20 + Number(miniSimResults.range) * 1.8)}
                  y1={Math.max(25, 150 - Number(miniSimResults.maxHeight) * 1.75)}
                  x2={Math.min(310, 20 + Number(miniSimResults.range) * 1.8 + 30)}
                  y2={Math.max(25, 150 - Number(miniSimResults.maxHeight) * 1.75)}
                  stroke="#FFDE4E"
                  strokeWidth="2"
                />

                <text
                  x={Math.min(250, 20 + Number(miniSimResults.range) * 1.8 - 15)}
                  y={Math.max(20, 150 - Number(miniSimResults.maxHeight) * 1.75 - 8)}
                  fill="#FFDE4E"
                  className="font-mono text-[10px] font-bold"
                >
                  H_max: {miniSimResults.maxHeight}m
                </text>

                {/* Launch Angle Arc Indicator in #FF9D4D */}
                <path
                  d={`M 20 150 L ${20 + 35 * Math.cos((inspectorAngle * Math.PI) / 180)} ${150 - 35 * Math.sin((inspectorAngle * Math.PI) / 180)}`}
                  stroke="#FF9D4D"
                  strokeWidth="2.5"
                />
              </svg>

              {/* Top HUD Overlay Readout */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono">
                <span className="bg-[#12180e]/95 border border-[#2d3b25] px-2 py-0.5 rounded text-[#A1CB35] font-bold">
                  u = {inspectorSpeed} m/s
                </span>
                <span className="bg-[#12180e]/95 border border-[#2d3b25] px-2 py-0.5 rounded text-[#FFDE4E] font-bold">
                  θ = {inspectorAngle}°
                </span>
                <span className="bg-[#12180e]/95 border border-[#2d3b25] px-2 py-0.5 rounded text-[#FF9D4D] font-bold">
                  g = 9.80 m/s²
                </span>
              </div>

              {/* Interactive Controls Overlay inside HUD */}
              <div className="relative z-10 bg-[#12180e]/95 border border-[#2d3b25] p-2.5 rounded-xl flex flex-col gap-2 backdrop-blur-sm">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#FFDE4E]">Angle: {inspectorAngle}°</span>
                  <input
                    type="range"
                    min="15"
                    max="75"
                    value={inspectorAngle}
                    onChange={(e) => setInspectorAngle(Number(e.target.value))}
                    className="w-24 h-1.5 bg-[#202a1b] rounded-lg accent-[#FFDE4E] cursor-pointer"
                  />
                  <span className="text-[#A1CB35]">Speed: {inspectorSpeed} m/s</span>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={inspectorSpeed}
                    onChange={(e) => setInspectorSpeed(Number(e.target.value))}
                    className="w-20 h-1.5 bg-[#202a1b] rounded-lg accent-[#A1CB35] cursor-pointer"
                  />
                </div>

                {/* Bottom Readouts */}
                <div className="flex items-center justify-between text-xs font-mono pt-1.5 border-t border-[#2d3b25]">
                  <div>
                    <span className="text-[#8b9982]">Range R: </span>
                    <span className="text-[#f2f6ee] font-bold">{miniSimResults.range} m</span>
                  </div>
                  <div>
                    <span className="text-[#8b9982]">T_flight: </span>
                    <span className="text-[#FFDE4E] font-bold">{miniSimResults.flightTime} s</span>
                  </div>
                  <div>
                    <span className="text-[#8b9982]">Apex H: </span>
                    <span className="text-[#A1CB35] font-bold">{miniSimResults.maxHeight} m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* High-Yield Derivations & Board Blueprint */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-[#8b9982] font-bold">
                  HSC Board Mandatory Derivations
                </span>
                <span className="font-mono text-[11px] font-bold text-[#A1CB35]">
                  {selectedChapter.derivations[0]?.expectedMarks || 3} Marks Expected
                </span>
              </div>

              {selectedChapter.derivations.slice(0, 2).map((der) => (
                <div
                  key={der.id}
                  className="bg-[#182114] border border-[#2d3b25] p-3 rounded-xl flex flex-col gap-1.5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#f2f6ee]">
                      {der.title}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A1CB35]" />
                  </div>
                  <div className="bg-[#0c1109] border border-[#2d3b25] p-2 rounded-lg font-mono text-xs text-[#FFDE4E] font-bold break-all">
                    {formatMathEquation(der.finalEquation)}
                  </div>
                  <p className="text-[11px] text-[#c2ceb8] leading-relaxed">
                    {der.steps[0]}
                  </p>
                </div>
              ))}
            </div>

            {/* JEE Main Speed Traps / Shortcuts in #FF9D4D */}
            <div className="flex flex-col gap-2 bg-[#241a10] border border-[#FF9D4D]/30 p-3.5 rounded-xl">
              <div className="flex items-center gap-1.5 text-[#FF9D4D]">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#FF9D4D]">
                  JEE Speed & Precision Traps
                </span>
              </div>
              <ul className="flex flex-col gap-2 text-xs text-[#c2ceb8]">
                {selectedChapter.jeeTraps.map((trap, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#FF9D4D] mt-0.5">•</span>
                    <div>
                      <strong className="text-[#f2f6ee]">{trap.title}: </strong>
                      <span>{trap.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instant Actions */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <button
                onClick={() => onLaunchSim(selectedChapter.id)}
                className="w-full bg-[#FF9D4D] hover:bg-[#ff8f38] text-[#0c1109] font-mono text-xs py-2.5 rounded-xl font-extrabold tracking-wider transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <PlayCircle className="w-4 h-4 fill-current" />
                <span>Interactive Sim</span>
              </button>
              <button
                onClick={() => onOpenDossier(selectedChapter.id)}
                className="w-full bg-[#769826] hover:bg-[#688620] text-white font-mono text-xs py-2.5 rounded-xl font-extrabold tracking-wider transition-all border border-[#A1CB35]/60 flex items-center justify-center gap-1.5 shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                <span>Full Study Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Systematic Chapter Progress Summary Strip */}
      <div className="w-full bg-[#12180e] px-4 sm:px-6 py-6 border-t border-[#2d3b25]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#182114] border border-[#2d3b25] p-5 rounded-2xl shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#A1CB35]/10 border border-[#A1CB35]/30 flex items-center justify-center text-[#A1CB35]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold text-[#f2f6ee]">
                Dual-Exam Readiness: <strong className="text-[#A1CB35]">68% Complete</strong>
              </span>
              <span className="text-xs text-[#c2ceb8]">
                Class 11 HSC board syllabus verified against Maharashtra Textbook Bureau • NTA JEE Main Physics 2026 aligned
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onOpenDossier(selectedChapter.id)}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-[#769826] hover:bg-[#688620] text-white font-mono text-xs uppercase font-extrabold rounded-xl transition-all shadow-md border border-[#A1CB35]/60"
            >
              Export Revision Notes
            </button>
            <button
              onClick={() => onOpenQuiz(selectedChapter.id)}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-[#FF9D4D] hover:bg-[#ff8f38] text-[#0c1109] font-mono text-xs uppercase font-extrabold rounded-xl transition-all shadow-md"
            >
              Practice Chapter Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
