/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA } from './data/chaptersData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChapterList } from './components/ChapterList';
import { ChapterDetail } from './components/ChapterDetail';
import { VirtualLabs } from './components/VirtualLabs';
import { FormulaVault } from './components/FormulaVault';
import { MockTestEngine } from './components/MockTestEngine';
import { AiTutor } from './components/AiTutor';
import { CommandKModal } from './components/CommandKModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'chapters' | 'virtual-labs' | 'formula-vault' | 'mock-tests' | 'ai-tutor'
  >('chapters');

  // Currently inspected chapter (default to Ch 3 as in user mockup)
  const [selectedChapterId, setSelectedChapterId] = useState<number>(3);
  const [chapterViewMode, setChapterViewMode] = useState<'list' | 'detail'>('list');

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Mobile sidebar drawer
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // AI Tutor initial prompt trigger
  const [aiPrompt, setAiPrompt] = useState<string>('');

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const completedCount = CHAPTERS_DATA.filter((c) => c.status === 'Completed').length;

  const currentChapter =
    CHAPTERS_DATA.find((c) => c.id === selectedChapterId) || CHAPTERS_DATA[2];

  const handleOpenDossier = (chapterId: number) => {
    setSelectedChapterId(chapterId);
    setChapterViewMode('detail');
    setActiveTab('chapters');
  };

  const handleLaunchSim = (chapterId: number) => {
    setSelectedChapterId(chapterId);
    setActiveTab('virtual-labs');
  };

  const handleOpenQuiz = (chapterId: number) => {
    setSelectedChapterId(chapterId);
    setChapterViewMode('detail');
    setActiveTab('chapters');
  };

  const handleAskAiFromChapter = (prompt: string) => {
    setAiPrompt(prompt);
    setActiveTab('ai-tutor');
  };

  return (
    <div className="min-h-screen bg-[#0c1109] text-[#f2f6ee] flex flex-col font-sans selection:bg-[#769826] selection:text-white">
      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'chapters') setChapterViewMode('list');
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        completedChaptersCount={completedCount}
        totalChapters={CHAPTERS_DATA.length}
      />

      {/* Main Layout Shell */}
      <div className="flex flex-1 pt-16">
        {/* Left Fixed/Drawer Sidebar */}
        <Sidebar
          chapters={CHAPTERS_DATA}
          selectedChapterId={selectedChapterId}
          onSelectChapter={(id) => {
            setSelectedChapterId(id);
            setActiveTab('chapters');
            setChapterViewMode('list');
          }}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Primary Main Content Canvas (offset by sidebar width on large screens) */}
        <main className="flex-1 lg:pl-80 bg-[#0c1109] min-h-[calc(100vh-4rem)] flex flex-col">
          {activeTab === 'chapters' && chapterViewMode === 'list' && (
            <ChapterList
              chapters={CHAPTERS_DATA}
              selectedChapterId={selectedChapterId}
              onSelectChapter={(id) => setSelectedChapterId(id)}
              onOpenDossier={handleOpenDossier}
              onLaunchSim={handleLaunchSim}
              onOpenQuiz={handleOpenQuiz}
            />
          )}

          {activeTab === 'chapters' && chapterViewMode === 'detail' && (
            <ChapterDetail
              chapter={currentChapter}
              onBack={() => setChapterViewMode('list')}
              onLaunchSim={handleLaunchSim}
              onAskAi={handleAskAiFromChapter}
            />
          )}

          {activeTab === 'virtual-labs' && <VirtualLabs />}

          {activeTab === 'formula-vault' && <FormulaVault />}

          {activeTab === 'mock-tests' && <MockTestEngine />}

          {activeTab === 'ai-tutor' && <AiTutor initialPrompt={aiPrompt} />}
        </main>
      </div>

      {/* Global Command+K Spotlight Modal */}
      <CommandKModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectChapter={(id) => {
          setSelectedChapterId(id);
          setActiveTab('chapters');
          setChapterViewMode('list');
        }}
        onSelectFormula={() => {
          setActiveTab('formula-vault');
        }}
        onSelectSim={(chId) => {
          setSelectedChapterId(chId);
          setActiveTab('virtual-labs');
        }}
      />
    </div>
  );
}
