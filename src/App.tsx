import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { EmptyState } from './components/EmptyState';
import { OutputState } from './components/OutputState';
import { PromptBar } from './components/PromptBar';
import { CalendarSidePanel } from './components/CalendarSidePanel';
import { PrioritiesModal } from './components/PrioritiesModal';
import { SettingsModal } from './components/SettingsModal';
import { INITIAL_PRIORITIES, INITIAL_STOCKS } from './data';
import { PriorityItem } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'empty' | 'output'>('empty');
  const [userPrompt, setUserPrompt] = useState<string>("What are today's updates that I should know about?");
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'tools' | 'settings'>('home');
  const [priorities, setPriorities] = useState<PriorityItem[]>(INITIAL_PRIORITIES);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isPrioritiesOpen, setIsPrioritiesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'connectors' | 'preferences' | 'ai'>('connectors');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Handle prompt submission
  const handleSelectPrompt = (promptText: string) => {
    setUserPrompt(promptText);
    setCurrentView('output');
    setActiveTab('chat');
  };

  // Reset to initial empty state
  const handleReset = () => {
    setCurrentView('empty');
    setActiveTab('home');
    setUserPrompt("What are today's updates that I should know about?");
    showToast("Started fresh assistant session");
  };

  // Toggle priority item
  const handleTogglePriority = (id: string) => {
    setPriorities((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Add priority item
  const handleAddPriority = (title: string, priorityLevel: 'high' | 'medium' | 'low') => {
    const newItem: PriorityItem = {
      id: `p-${Date.now()}`,
      title,
      completed: false,
      priorityLevel,
    };
    setPriorities((prev) => [newItem, ...prev]);
    showToast(`Added priority: "${title}"`);
  };

  // Delete priority item
  const handleDeletePriority = (id: string) => {
    setPriorities((prev) => prev.filter((item) => item.id !== id));
    showToast("Priority item removed");
  };

  return (
    <div
      id="synapse-app-root"
      className="flex h-screen w-screen overflow-hidden bg-white text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#15803d]/15 selection:text-slate-900 relative"
    >
      {/* 1. Left Icon Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'home') setCurrentView('empty');
          if (tab === 'chat') setCurrentView('output');
        }}
        onNewChat={handleReset}
        onOpenSettings={() => {
          setSettingsTab('ai');
          setIsSettingsOpen(true);
        }}
        onOpenTools={() => {
          setSettingsTab('connectors');
          setIsSettingsOpen(true);
        }}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
        {/* Top Header Bar */}
        <TopHeader
          isCalendarOpen={isCalendarOpen}
          onOpenCalendar={() => setIsCalendarOpen(!isCalendarOpen)}
        />

        {/* Scrollable View Area */}
        <main
          id="main-content-scroll"
          className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col items-center"
        >
          {currentView === 'empty' ? (
            <EmptyState
              onSelectPrompt={handleSelectPrompt}
              priorities={priorities}
              onTogglePriority={handleTogglePriority}
              onManagePriorities={() => setIsPrioritiesOpen(true)}
              stocks={INITIAL_STOCKS}
              onToast={showToast}
              onOpenConnectors={() => {
                setSettingsTab('connectors');
                setIsSettingsOpen(true);
              }}
            />
          ) : (
            <OutputState
              userPrompt={userPrompt}
              onSubmitNewPrompt={handleSelectPrompt}
              onOpenCalendar={() => setIsCalendarOpen(true)}
              onOpenPriorities={() => setIsPrioritiesOpen(true)}
              onToast={showToast}
              onOpenConnectors={() => {
                setSettingsTab('connectors');
                setIsSettingsOpen(true);
              }}
            />
          )}
        </main>

        {/* Persistent Bottom Prompt Bar (Docked below scroll view, never covering content) */}
        <div
          id="app-docked-prompt-bar-container"
          className="w-full bg-white/95 border-t border-slate-200/80 pb-5 pt-3.5 px-4 flex justify-center flex-shrink-0 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]"
        >
          <div className="w-full max-w-3xl">
            <PromptBar
              onSubmitPrompt={handleSelectPrompt}
              onToast={showToast}
              onOpenConnectors={() => {
                setSettingsTab('connectors');
                setIsSettingsOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* 3. Right Calendar Side Panel */}
      <CalendarSidePanel
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onToast={showToast}
      />

      {/* 4. Priorities Management Modal */}
      <PrioritiesModal
        isOpen={isPrioritiesOpen}
        onClose={() => setIsPrioritiesOpen(false)}
        priorities={priorities}
        onTogglePriority={handleTogglePriority}
        onAddPriority={handleAddPriority}
        onDeletePriority={handleDeletePriority}
      />

      {/* 5. Settings & Workspace Connectors Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        initialTab={settingsTab}
        onToast={showToast}
      />

      {/* 6. In-App Micro Toast Notification */}
      {toastMessage && (
        <div
          id="app-toast"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#15803d]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
