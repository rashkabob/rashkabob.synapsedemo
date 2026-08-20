import React, { useState } from 'react';
import { X, Sliders, Shield, Bell, Cpu, Link2, ExternalLink } from 'lucide-react';
import { NvidiaLogo, SlackIcon, TeamsIcon, OutlookIcon, JiraIcon, GoogleCalendarIcon } from './BrandIcons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'connectors' | 'preferences' | 'ai';
  onToast?: (message: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'connectors',
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'connectors' | 'preferences' | 'ai'>(initialTab);

  const [connectors, setConnectors] = useState([
    { id: 'slack', name: 'Slack', desc: 'Syncs channels & direct messages', connected: true, icon: SlackIcon },
    { id: 'teams', name: 'Microsoft Teams', desc: 'Syncs meetings & group chats', connected: true, icon: TeamsIcon },
    { id: 'outlook', name: 'Microsoft Outlook', desc: 'Syncs executive inbox & threads', connected: true, icon: OutlookIcon },
    { id: 'jira', name: 'Atlassian Jira', desc: 'Syncs sprint issues & blockers', connected: true, icon: JiraIcon },
    { id: 'gcal', name: 'Google Calendar', desc: 'Syncs working hours & focus slots', connected: true, icon: GoogleCalendarIcon },
  ]);

  const [aiPreferences, setAiPreferences] = useState({
    autoConflictDetection: true,
    transparencyAnatomy: true,
    suggestedFreeWindows: true,
    realTimeTicker: true,
    conciseBulletSummaries: true,
  });

  if (!isOpen) return null;

  const toggleConnector = (id: string) => {
    setConnectors((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextState = !c.connected;
          if (onToast) {
            onToast(`${c.name} ${nextState ? 'connected' : 'disconnected'}`);
          }
          return { ...c, connected: nextState };
        }
        return c;
      })
    );
  };

  return (
    <div
      id="settings-modal-backdrop"
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="settings-modal-dialog"
        className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <NvidiaLogo className="w-6 h-6" />
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Workspace & AI Settings</h2>
              <p className="text-xs text-slate-500 font-normal mt-0.5">Configure connected tools and agent reasoning preferences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200/80 px-6 gap-6 text-xs font-semibold text-slate-500">
          <button
            onClick={() => setActiveTab('connectors')}
            className={`py-3 relative cursor-pointer ${
              activeTab === 'connectors'
                ? 'text-slate-900 font-bold border-b-2 border-[#15803d]'
                : 'hover:text-slate-800'
            }`}
          >
            Connected Workspace Tools
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`py-3 relative cursor-pointer ${
              activeTab === 'ai'
                ? 'text-slate-900 font-bold border-b-2 border-[#15803d]'
                : 'hover:text-slate-800'
            }`}
          >
            AI Agent Reasoning
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'connectors' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 mb-2 font-normal">
                Synapse retrieves real-time signals from authorized tools to curate high-leverage updates.
              </div>
              {connectors.map((c) => {
                const IconComponent = c.icon;
                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-6 h-6" />
                      <div>
                        <div className="text-[13.5px] font-bold text-slate-900">{c.name}</div>
                        <div className="text-[11.5px] text-slate-500 font-normal">{c.desc}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleConnector(c.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        c.connected
                          ? 'bg-emerald-50 text-[#15803d] border border-emerald-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
                          : 'bg-slate-100 text-slate-700 hover:bg-[#15803d] hover:text-[#fcfcfc]'
                      }`}
                    >
                      {c.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 mb-2 font-normal">
                Tune how the AI formulates transparent rationale and interaction cards.
              </div>
              
              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-white">
                <div>
                  <div className="text-[13.5px] font-bold text-slate-900">Automatic Conflict Detection</div>
                  <div className="text-[11.5px] text-slate-500 font-normal">Scan calendar overlaps against priority settings</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiPreferences.autoConflictDetection}
                  onChange={(e) => setAiPreferences({ ...aiPreferences, autoConflictDetection: e.target.checked })}
                  className="w-4.5 h-4.5 accent-[#15803d] rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-white">
                <div>
                  <div className="text-[13.5px] font-bold text-slate-900">Structured Adaptive Card Anatomy</div>
                  <div className="text-[11.5px] text-slate-500 font-normal">Render 3-part cards (Context · Rationale · Action Gate)</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiPreferences.transparencyAnatomy}
                  onChange={(e) => setAiPreferences({ ...aiPreferences, transparencyAnatomy: e.target.checked })}
                  className="w-4.5 h-4.5 accent-[#15803d] rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/80 bg-white">
                <div>
                  <div className="text-[13.5px] font-bold text-slate-900">Calculated Multi-Slot Rescheduling</div>
                  <div className="text-[11.5px] text-slate-500 font-normal">Offer Preferred (Option 1) vs Alternative (Option 2)</div>
                </div>
                <input
                  type="checkbox"
                  checked={aiPreferences.suggestedFreeWindows}
                  onChange={(e) => setAiPreferences({ ...aiPreferences, suggestedFreeWindows: e.target.checked })}
                  className="w-4.5 h-4.5 accent-[#15803d] rounded cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={() => {
              if (onToast) onToast("Settings saved successfully");
              onClose();
            }}
            className="bg-slate-900 hover:bg-slate-800 text-[#fcfcfc] font-bold text-xs px-5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
