import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  EyeOff,
  Eye,
  X,
  Plus,
} from 'lucide-react';
import {
  SlackIcon,
  TeamsIcon,
  OutlookIcon,
  JiraIcon,
  FigmaIcon,
  GitHubIcon,
  NotionIcon,
} from './BrandIcons';

interface CalendarSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onToast?: (msg: string) => void;
}

export const CalendarSidePanel: React.FC<CalendarSidePanelProps> = ({ isOpen, onClose, onToast }) => {
  const [selectedSource, setSelectedSource] = useState<string>('Teams');
  const [selectedDay, setSelectedDay] = useState<number>(16);
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(true);
  const [event1SummaryOpen, setEvent1SummaryOpen] = useState<boolean>(true);
  const [event2SummaryOpen, setEvent2SummaryOpen] = useState<boolean>(false);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    if (onToast) onToast(msg);
  };

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const calendarRows = [
    [
      { day: 29, currentMonth: false },
      { day: 30, currentMonth: false },
      { day: 31, currentMonth: false },
      { day: 1, currentMonth: true },
      { day: 2, currentMonth: true },
      { day: 3, currentMonth: true },
      { day: 4, currentMonth: true },
    ],
    [
      { day: 5, currentMonth: true },
      { day: 6, currentMonth: true },
      { day: 7, currentMonth: true },
      { day: 8, currentMonth: true },
      { day: 9, currentMonth: true },
      { day: 10, currentMonth: true },
      { day: 11, currentMonth: true },
    ],
    [
      { day: 12, currentMonth: true },
      { day: 13, currentMonth: true },
      { day: 14, currentMonth: true },
      { day: 15, currentMonth: true },
      { day: 16, currentMonth: true },
      { day: 17, currentMonth: true },
      { day: 18, currentMonth: true },
    ],
    [
      { day: 19, currentMonth: true },
      { day: 20, currentMonth: true },
      { day: 21, currentMonth: true },
      { day: 22, currentMonth: true },
      { day: 23, currentMonth: true },
      { day: 24, currentMonth: true },
      { day: 25, currentMonth: true },
    ],
    [
      { day: 26, currentMonth: true },
      { day: 27, currentMonth: true },
      { day: 28, currentMonth: true },
      { day: 29, currentMonth: true },
      { day: 30, currentMonth: true },
      { day: 31, currentMonth: true },
      { day: 1, currentMonth: false },
    ],
  ];

  return (
    <aside
      id="calendar-side-panel"
      className="w-80 md:w-96 h-screen bg-white border-l border-slate-200/90 flex flex-col justify-between overflow-y-auto p-5 select-none z-30 flex-shrink-0 animate-in slide-in-from-right duration-200"
    >
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">Calendar</h2>
          <div className="flex items-center gap-1.5 text-slate-400">
            <button
              onClick={() => {
                const next = !isCalendarVisible;
                setIsCalendarVisible(next);
                showToast(next ? "Calendar view expanded" : "Calendar hidden (showing sources and items)");
              }}
              className="p-1 hover:text-slate-600 transition-colors cursor-pointer"
              title={isCalendarVisible ? "Hide Calendar View" : "Show Calendar View"}
            >
              {isCalendarVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-[#15803d]" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:text-slate-600 transition-colors cursor-pointer"
              title="Close Calendar Panel"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Month Selector (Conditionally rendered when calendar is not hidden) */}
        {isCalendarVisible && (
          <div className="animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-3 px-1">
              <button className="p-1 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <span className="text-[15px] font-bold text-slate-900">August 2026</span>
              <button className="p-1 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 text-center mb-1 px-1">
              {daysOfWeek.map((dow) => (
                <div
                  key={dow}
                  className="text-[11px] font-bold text-slate-400 py-1"
                >
                  {dow}
                </div>
              ))}
            </div>

            {/* Month Days Grid */}
            <div className="grid grid-cols-7 gap-y-1 text-center px-1">
              {calendarRows.flat().map((item, idx) => {
                const isSelected = item.currentMonth && item.day === selectedDay;
                return (
                  <button
                    key={idx}
                    onClick={() => item.currentMonth && setSelectedDay(item.day)}
                    className={`h-8 w-8 mx-auto flex items-center justify-center text-[13px] rounded-lg transition-colors cursor-pointer ${
                      !item.currentMonth
                        ? 'text-slate-300 font-normal cursor-default'
                        : isSelected
                        ? 'bg-emerald-50 text-[#15803d] font-bold border border-emerald-300'
                        : 'text-slate-700 hover:bg-slate-100 font-medium'
                    }`}
                  >
                    {item.day}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter Sources */}
        <div className="space-y-2.5 pt-1">
          <h3 className="text-[14px] font-bold text-slate-900">Filter Sources</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'Slack', name: 'Slack', icon: SlackIcon },
              { id: 'Teams', name: 'Teams', icon: TeamsIcon },
              { id: 'GitHub', name: 'GitHub', icon: GitHubIcon },
              { id: 'Notion', name: 'Notion', icon: NotionIcon },
              { id: 'Outlook', name: 'Outlook', icon: OutlookIcon },
              { id: 'Jira', name: 'Jira', icon: JiraIcon },
              { id: 'Figma', name: 'Figma', icon: FigmaIcon },
            ].map((tool) => {
              const ToolIcon = tool.icon;
              const isSel = selectedSource === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedSource(isSel ? '' : tool.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-colors cursor-pointer ${
                    isSel
                      ? 'bg-emerald-50 border-emerald-300 text-[#15803d]'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <ToolIcon className="w-3.5 h-3.5" />
                  <span>{tool.name}</span>
                </button>
              );
            })}

            <button
              onClick={() => showToast("Add new integration source")}
              className="flex items-center justify-center w-8 h-7 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-medium transition-colors cursor-pointer"
              title="Add source"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-3 pt-1 pb-4">
          <h3 className="text-[14px] font-bold text-slate-900">Upcoming Events</h3>

          {/* Event 1: Teams Standup */}
          <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/20 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TeamsIcon className="w-5 h-5" />
                <span className="text-[14px] font-bold text-slate-900">Teams Standup</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={() => showToast("Opening Teams Standup session...")}
                  className="hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Open Teams"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setEvent1SummaryOpen(!event1SummaryOpen)}
                  className="hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Toggle Summary"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Today • Now</span>
              <span className="bg-[#ede9fe] text-[#6d28d9] font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                Meeting
              </span>
            </div>

            {/* Generated Summary Accordion */}
            <div className="bg-white rounded-xl border border-slate-200/80 overflow-hidden text-left">
              <button
                onClick={() => setEvent1SummaryOpen(!event1SummaryOpen)}
                className="w-full px-3 py-2 flex items-center justify-between text-[11.5px] font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <span>Generated Summary</span>
                {event1SummaryOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
              {event1SummaryOpen && (
                <div className="px-3 pb-3 text-xs text-slate-600 font-normal leading-relaxed">
                  John shared updates on the Q4 planning timeline.
                </div>
              )}
            </div>
          </div>

          {/* Event 2: Design System Component Deadline */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FigmaIcon className="w-4 h-4" />
                <span className="text-[13.5px] font-bold text-slate-900">
                  Design System Component Deadline
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <button
                  onClick={() => showToast("Opening Figma components board...")}
                  className="hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Open Figma"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setEvent2SummaryOpen(!event2SummaryOpen)}
                  className="hover:text-slate-600 p-0.5 cursor-pointer"
                  title="Toggle Summary"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Today • 5:00 PM</span>
              <span className="bg-[#fef3c7] text-[#b45309] font-bold text-[11px] px-2.5 py-0.5 rounded-full">
                Deadline
              </span>
            </div>

            {/* Generated Summary Accordion */}
            <div className="bg-[#f8fafc] rounded-xl border border-slate-200/80 overflow-hidden text-left">
              <button
                onClick={() => setEvent2SummaryOpen(!event2SummaryOpen)}
                className="w-full px-3 py-2 flex items-center justify-between text-[11.5px] font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <span>Generated Summary</span>
                {event2SummaryOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
              {event2SummaryOpen && (
                <div className="px-3 pb-3 text-xs text-slate-600 font-normal leading-relaxed">
                  Final token library QA for tables, charts, and modal navigation states before v1.2 tag.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
