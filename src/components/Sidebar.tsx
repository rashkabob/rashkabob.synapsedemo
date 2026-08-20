import React from 'react';
import { Menu, MessageSquare, SlidersHorizontal, SquarePen, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: 'home' | 'chat' | 'tools' | 'settings';
  setActiveTab: (tab: 'home' | 'chat' | 'tools' | 'settings') => void;
  onNewChat: () => void;
  onOpenSettings?: () => void;
  onOpenTools?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onNewChat,
  onOpenSettings,
  onOpenTools,
}) => {
  return (
    <aside
      id="app-sidebar"
      aria-label="Main Navigation"
      className="w-16 md:w-16 h-screen flex-shrink-0 bg-white border-r border-slate-200/80 flex flex-col justify-between items-center py-4.5 px-2 select-none z-50 transition-all duration-200 relative"
    >
      {/* Top Menu Icon (decorative) */}
      <div className="flex flex-col items-center gap-6 w-full">
        <div
          id="sidebar-menu-icon"
          className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 select-none"
          title="Synapse Menu"
        >
          <Menu className="w-5 h-5 stroke-[1.75]" />
        </div>

        {/* Navigation Icon Group */}
        <nav className="flex flex-col items-center gap-3 w-full mt-2">
          <button
            id="nav-btn-chat"
            aria-label="AI Conversations"
            onClick={() => setActiveTab('chat')}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-150 relative group cursor-pointer ${
              activeTab === 'chat'
                ? 'text-slate-900 bg-slate-100 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="AI Assistant Chat"
          >
            <MessageSquare className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute left-14 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Synapse Chat
            </span>
          </button>

          <button
            id="nav-btn-tools"
            aria-label="Workspace Connectors"
            onClick={() => {
              if (onOpenTools) onOpenTools();
            }}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-150 relative group cursor-pointer ${
              activeTab === 'tools'
                ? 'text-slate-900 bg-slate-100 font-semibold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Workspace Connectors"
          >
            <SlidersHorizontal className="w-5 h-5 stroke-[1.8]" />
            <span className="absolute left-14 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Workspace Connectors
            </span>
          </button>
        </nav>
      </div>

      {/* Bottom Actions: New Chat (SquarePen) & Settings */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* New Chat / Start New Session Button */}
        <button
          id="btn-new-chat"
          aria-label="Start new chat"
          onClick={onNewChat}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-900 text-slate-700 hover:text-white transition-all duration-150 group relative shadow-xs cursor-pointer active:scale-95"
          title="New Chat Session"
        >
          <SquarePen className="w-4.5 h-4.5 stroke-[2]" />
          <span className="absolute left-14 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[100] whitespace-nowrap">
            New Chat
          </span>
        </button>

        {/* Settings Button */}
        <button
          id="btn-settings"
          aria-label="Settings"
          onClick={onOpenSettings}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors group relative cursor-pointer"
          title="Settings & Preferences"
        >
          <Settings className="w-5 h-5 stroke-[1.8]" />
          <span className="absolute left-14 px-2.5 py-1 bg-slate-900 text-white text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-[100] whitespace-nowrap">
            Settings
          </span>
        </button>
      </div>
    </aside>
  );
};
