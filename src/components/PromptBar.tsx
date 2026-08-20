import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Mic, 
  Send, 
  Paperclip, 
  SlidersHorizontal, 
  Cpu, 
  Sparkles, 
  Calendar, 
  CheckSquare, 
  MessageSquare, 
  FileText 
} from 'lucide-react';

interface PromptBarProps {
  onSubmitPrompt: (prompt: string) => void;
  disabled?: boolean;
  initialValue?: string;
  className?: string;
  onToast?: (message: string) => void;
  onOpenConnectors?: () => void;
}

export const PromptBar: React.FC<PromptBarProps> = ({
  onSubmitPrompt,
  disabled = false,
  initialValue = '',
  className = '',
  onToast,
  onOpenConnectors,
}) => {
  const [inputVal, setInputVal] = useState(initialValue);
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowAttachMenu(false);
      }
    };
    if (showAttachMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAttachMenu]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputVal.trim();
    if (!query || disabled) return;
    onSubmitPrompt(query);
    setInputVal('');
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setTimeout(() => {
        setInputVal("What are today's updates that I should know about?");
        setIsRecording(false);
        if (inputRef.current) inputRef.current.focus();
      }, 1500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onToast) onToast(`Attached file: ${file.name}`);
      setShowAttachMenu(false);
    }
  };

  return (
    <div className={`w-full max-w-3xl mx-auto relative ${className}`}>
      {/* Hidden file input for attachment */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        aria-hidden="true"
      />

      <form
        id="prompt-form"
        onSubmit={handleSubmit}
        className={`w-full bg-white rounded-full border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-slate-300 focus-within:border-slate-400 focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.09)] transition-all duration-200 flex items-center px-3.5 py-2.5 gap-2.5 ${
          disabled ? 'opacity-70 pointer-events-none' : ''
        }`}
      >
        {/* Left Plus Attachment / Context Menu */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            id="btn-prompt-attach"
            aria-label="Add context, attachments, connectors or MCP"
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              showAttachMenu ? 'bg-slate-900 text-white' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Attach context, tools & connectors"
          >
            <Plus className={`w-5 h-5 stroke-[2] transition-transform duration-200 ${showAttachMenu ? 'rotate-45' : ''}`} />
          </button>

          {showAttachMenu && (
            <div
              id="prompt-attach-dropdown"
              className="absolute left-0 bottom-12 mb-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-left"
            >
              {/* Category 1: Standard Chatbot Capabilities */}
              <div className="text-[10.5px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                Context & Integrations
              </div>

              <button
                type="button"
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                  setShowAttachMenu(false);
                }}
                className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl flex items-center gap-2.5 font-semibold transition-colors text-left cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                  <Paperclip className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-slate-900 text-xs font-semibold">Upload Attachment</div>
                  <div className="text-[10.5px] text-slate-400 font-normal">PDF, Docs, spreadsheets, or images</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAttachMenu(false);
                  if (onOpenConnectors) onOpenConnectors();
                }}
                className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl flex items-center gap-2.5 font-semibold transition-colors text-left cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-50 text-[#15803d] flex items-center justify-center">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-slate-900 text-xs font-semibold">Workspace Connectors</div>
                  <div className="text-[10.5px] text-slate-400 font-normal">Slack, Teams, Jira, Outlook, GCal</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onToast) onToast("Model Context Protocol (MCP) servers connected & active");
                  setShowAttachMenu(false);
                }}
                className="w-full px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-xl flex items-center gap-2.5 font-semibold transition-colors text-left cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-slate-900 text-xs font-semibold">Model Context Protocol (MCP)</div>
                  <div className="text-[10.5px] text-slate-400 font-normal">Local tool servers & custom APIs</div>
                </div>
              </button>

              <div className="border-t border-slate-100 my-1.5" />

              {/* Category 2: Suggested Prompts */}
              <div className="text-[10.5px] font-bold text-slate-400 px-3 py-1 uppercase tracking-wider">
                Suggested Prompts
              </div>

              {[
                { title: "What are today's updates that I should know about?", icon: Sparkles },
                { title: "Schedule a progress check with the team", icon: Calendar },
                { title: "Show my team schedule for this week", icon: Calendar },
                { title: "Summarize priorities and blockers for this week", icon: CheckSquare },
              ].map((p, idx) => {
                const IconComponent = p.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputVal(p.title);
                      setShowAttachMenu(false);
                      if (inputRef.current) inputRef.current.focus();
                    }}
                    className="w-full px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl flex items-center gap-2 font-normal transition-colors text-left truncate cursor-pointer"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{p.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Search / Prompt Input */}
        <input
          ref={inputRef}
          id="prompt-main-input"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={
            isRecording
              ? "Listening for voice prompt..."
              : "Ask about projects, team updates, or schedule a progress check..."
          }
          className={`flex-1 bg-transparent border-none outline-none text-[14.5px] text-slate-900 placeholder:text-slate-400 font-normal px-1 ${
            isRecording ? 'italic text-emerald-700 font-medium' : ''
          }`}
        />

        {/* Microphone Button */}
        <button
          type="button"
          id="btn-prompt-mic"
          aria-label="Voice input"
          onClick={handleVoiceToggle}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isRecording
              ? 'text-red-500 bg-red-50 animate-pulse ring-2 ring-red-400'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Voice prompt"
        >
          <Mic className="w-4.5 h-4.5 stroke-[2]" />
        </button>

        {/* Dark Green Send Button with high contrast */}
        <button
          type="submit"
          id="btn-prompt-send"
          aria-label="Submit prompt"
          disabled={!inputVal.trim() && !isRecording}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 cursor-pointer ${
            inputVal.trim()
              ? 'bg-[#15803d] text-[#fcfcfc] hover:bg-[#166534] shadow-sm hover:scale-105 active:scale-95'
              : 'bg-slate-200 text-slate-400 opacity-80 cursor-default'
          }`}
          title="Send"
        >
          <Send className="w-4 h-4 translate-x-px stroke-[2.2]" />
        </button>
      </form>
    </div>
  );
};
