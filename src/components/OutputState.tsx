import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Info,
  ExternalLink,
  Download,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  User,
  Calendar,
  AlertTriangle,
  Send,
  Sparkles,
} from 'lucide-react';
import {
  SlackIcon,
  OutlookIcon,
  JiraIcon,
  TeamsIcon,
  ExecutiveSummaryIcon,
} from './BrandIcons';
import { PromptBar } from './PromptBar';
import { SourceType } from '../types';

interface OutputStateProps {
  userPrompt: string;
  onSubmitNewPrompt: (prompt: string) => void;
  onOpenCalendar: () => void;
  onOpenPriorities: () => void;
  onToast?: (message: string) => void;
  onOpenConnectors?: () => void;
}

interface ConflictOption {
  optionNumber: number;
  title: string;
  timeRange: string;
  blockedLabel: string;
  proposedLabel: string;
  hourMarks: string[];
  attendees: string[];
}

export const OutputState: React.FC<OutputStateProps> = ({
  userPrompt,
  onSubmitNewPrompt,
  onOpenCalendar,
  onOpenPriorities,
  onToast,
  onOpenConnectors,
}) => {
  // Expansion states for Flow 1 (Today's Updates)
  const [expandedConflictId, setExpandedConflictId] = useState<string | null>('c1');
  const [conflictOptions, setConflictOptions] = useState<Record<string, number>>({
    c1: 1,
    c2: 1,
  });
  const [resolvedConflicts, setResolvedConflicts] = useState<Record<string, { optionNumber: number; time: string }>>({});
  const [openSummaries, setOpenSummaries] = useState<Record<string, boolean>>({
    u1: true,
    u2: true,
  });
  const [selectedSource, setSelectedSource] = useState<SourceType>('All');
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [copied, setCopied] = useState(false);

  // States for Flow 2 (Schedule Progress Check)
  const [progressCheckOption, setProgressCheckOption] = useState<1 | 2>(1);
  const [progressCheckScheduled, setProgressCheckScheduled] = useState(false);

  // States for Flow 3 (Team Schedule for This Week)
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Tue');
  const [teamScheduleOption, setTeamScheduleOption] = useState<1 | 2>(1);
  const [teamSlotBooked, setTeamSlotBooked] = useState(false);
  const [isManualBookingOpen, setIsManualBookingOpen] = useState(false);
  const [manualDate, setManualDate] = useState('2026-08-20');
  const [manualTime, setManualTime] = useState('14:00');
  const [manualTopic, setManualTopic] = useState('Team Strategy & Milestone Check');

  // States for Flow 4 (Priorities & Blockers)
  const [resolvedBlockers, setResolvedBlockers] = useState<Record<string, boolean>>({});

  const showToast = (msg: string) => {
    if (onToast) onToast(msg);
  };

  // Determine prompt category
  const lowerPrompt = userPrompt.toLowerCase();
  const isScheduleCheck = lowerPrompt.includes('progress check') || lowerPrompt.includes('schedule a progress');
  const isTeamSchedule = lowerPrompt.includes('team schedule') || lowerPrompt.includes('week schedule') || lowerPrompt.includes('calendar for this week');
  const isPrioritiesBlockers = lowerPrompt.includes('blocker') || lowerPrompt.includes('priorities and blocker') || lowerPrompt.includes('summarize priorities');

  // Meeting Option Configurations for Flow 1
  const meetingOptionsData: Record<string, { [key: number]: ConflictOption }> = {
    c1: {
      1: {
        optionNumber: 1,
        title: 'Move Design Review to 3:30 PM',
        timeRange: '3:30 - 4:30 PM EST',
        blockedLabel: '2:00 PM - 3:30 PM (Client Demo)',
        proposedLabel: '3:30 - 4:30 PM (Proposed Free Window)',
        hourMarks: ['2', '3', '4', '5'],
        attendees: ['AK', 'SL'],
      },
      2: {
        optionNumber: 2,
        title: 'Move Client Demo to 11:30 AM',
        timeRange: '11:30 AM - 12:30 PM EST',
        blockedLabel: '10:00 AM - 11:30 AM (Sprint Review)',
        proposedLabel: '11:30 AM - 12:30 PM (Proposed Free Window)',
        hourMarks: ['10', '11', '12', '1'],
        attendees: ['AK', 'SL'],
      },
    },
    c2: {
      1: {
        optionNumber: 1,
        title: 'Move 1:1 to 10:30 AM',
        timeRange: '10:30 - 11:00 AM EST',
        blockedLabel: '9:00 AM - 10:30 AM (Sprint Planning)',
        proposedLabel: '10:30 - 11:00 AM (Proposed Free Window)',
        hourMarks: ['9', '10', '11'],
        attendees: ['CM', 'JL'],
      },
      2: {
        optionNumber: 2,
        title: 'Move 1:1 to 1:30 PM',
        timeRange: '1:30 - 2:00 PM EST',
        blockedLabel: '2:00 PM - 3:00 PM (Product Sync)',
        proposedLabel: '1:30 - 2:00 PM (Proposed Free Window)',
        hourMarks: ['1', '2', '3'],
        attendees: ['CM', 'JL'],
      },
    },
  };

  const handleAcceptReschedule = (conflictId: string) => {
    const selectedOptNum = conflictOptions[conflictId] || 1;
    const optData = meetingOptionsData[conflictId][selectedOptNum];
    setResolvedConflicts((prev) => ({
      ...prev,
      [conflictId]: { optionNumber: selectedOptNum, time: optData.timeRange },
    }));
    setExpandedConflictId(null);
    showToast(`Meeting rescheduled to ${optData.timeRange}`);
  };

  const toggleSummary = (id: string) => {
    setOpenSummaries((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopySummary = () => {
    const textToCopy = `NVIDIA Synapse Executive Summary:\n\n` +
      `Prompt: ${userPrompt}\n\n` +
      `Meetings:\n- Meeting Conflict from 2:00 - 3:00 PM (High Priority)\n- Meeting Overlap by 30 min (Medium Priority)\n\n` +
      `Updates:\n- #design-system: 75% complete, 3-4 days remaining\n- Email from Jensen: Q4 milestones feedback\n\n` +
      `Completed Items:\n- Jira: Authentication module implementation (PROJ-456)\n- Priorities: Stakeholder approval on design mockups`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast("Summary copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      title: 'NVIDIA Synapse Executive Summary',
      timestamp: new Date().toISOString(),
      userPrompt,
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'nvidia-synapse-summary.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Summary downloaded");
  };

  const showAll = selectedSource === 'All';
  const showSlack = showAll || selectedSource === 'Slack';
  const showOutlook = showAll || selectedSource === 'Outlook';
  const showJira = showAll || selectedSource === 'Jira';
  const showGCal = showAll || selectedSource === 'GCal';

  // Standardized Shared Timeline UI Component (Used across Flows 1, 2, and 3)
  const renderSharedTimelineCard = ({
    toolName,
    toolIcon: ToolIcon,
    meetingTitle,
    timeRange,
    blockedLabel,
    proposedLabel,
    hourMarks,
    attendees,
    statusBadge = 'Proposed',
    ctaText,
    onCtaClick,
    onSecondaryClick,
  }: {
    toolName: string;
    toolIcon: React.ComponentType<{ className?: string }>;
    meetingTitle: string;
    timeRange: string;
    blockedLabel: string;
    proposedLabel: string;
    hourMarks: string[];
    attendees: string[];
    statusBadge?: string;
    ctaText?: string;
    onCtaClick?: () => void;
    onSecondaryClick?: () => void;
  }) => {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-xs text-left relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ToolIcon className="w-5 h-5" />
            <span className="text-[13.5px] font-semibold text-slate-800">
              {toolName}
            </span>
          </div>
          <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
            {statusBadge}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-[15px] font-bold text-slate-900 tracking-tight">
            {meetingTitle}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              showToast(`Opening ${toolName} meeting session...`);
            }}
            className="text-emerald-700 hover:text-emerald-800 cursor-pointer p-0.5"
            title={`Open in ${toolName}`}
          >
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>

        {/* Timeline Visualizer */}
        <div className="relative pl-5 pr-1 py-1 my-3 border-l border-slate-200 ml-8">
          {hourMarks.map((hr, idx) => (
            <div
              key={hr}
              className="absolute -left-3 -translate-x-full text-[11px] font-semibold text-slate-400 text-right select-none"
              style={{ top: `${(idx / Math.max(1, hourMarks.length - 1)) * 90}%` }}
            >
              {hr}
            </div>
          ))}

          {blockedLabel && (
            <div className="w-full bg-[#ede9fe]/50 border border-[#ddd6fe] rounded-lg p-2 mb-2 relative">
              <div className="text-[11px] text-[#5b21b6] font-medium">
                {blockedLabel}
              </div>
              <div className="border-b border-dashed border-slate-300 w-full my-1" />
            </div>
          )}

          <div className="w-full h-8 rounded-lg border-2 border-[#15803d] bg-white flex items-center justify-between px-3 shadow-xs">
            <span className="text-[11px] font-bold text-[#15803d] truncate">
              {proposedLabel}
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded shrink-0 ml-1">
              Free
            </span>
          </div>
        </div>

        {/* Time text & Attendee Avatars */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{timeRange}</span>
          </div>

          <div className="flex items-center -space-x-1.5">
            {attendees.map((init) => (
              <div
                key={init}
                className="w-6 h-6 rounded-full border-2 border-emerald-700 bg-white text-emerald-800 text-[10px] font-bold flex items-center justify-center shadow-xs"
              >
                {init}
              </div>
            ))}
          </div>
        </div>

        {/* Decision Gate CTA Button */}
        {ctaText && onCtaClick && (
          <div className="mt-3.5 flex justify-end">
            <button
              onClick={onCtaClick}
              className="bg-[#15803d] hover:bg-[#166534] text-[#fcfcfc] text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              {ctaText}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      id="output-state-view"
      className="w-full max-w-4xl px-4 pt-4 pb-12 flex flex-col items-center select-none space-y-4"
    >
      {/* Initial User Prompt Bubble at the Top */}
      <div
        id="user-prompt-bubble-top"
        className="w-full flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-150"
      >
        <div className="bg-slate-100/90 text-slate-800 border border-slate-200/80 rounded-2xl rounded-tr-xs px-4.5 py-2.5 max-w-xl text-[13.5px] font-medium shadow-2xs flex items-center gap-2">
          <span>{userPrompt}</span>
        </div>
      </div>

      {/* Main Executive Summary Card */}
      <div
        id="executive-summary-card"
        className="w-full bg-[#fbfcfb] rounded-3xl border border-slate-200/90 shadow-[0_2px_16px_rgba(0,0,0,0.03)] p-6 md:p-8 space-y-6"
      >
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200/70">
          <div className="flex items-center gap-3">
            <ExecutiveSummaryIcon className="w-7 h-7 text-[#15803d]" />
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {isScheduleCheck
                  ? 'Team Availability & Progress Check'
                  : isTeamSchedule
                  ? 'Core Platform Team Schedule'
                  : isPrioritiesBlockers
                  ? 'Sprint Priorities & Active Blockers'
                  : 'Executive Summary'}
              </h2>
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span>Aug 18, 2026</span>
                <span>•</span>
                <span>Synthesized from 5 connected workspace tools</span>
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs cursor-pointer"
              title="Copy summary text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs cursor-pointer"
              title="Export as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FLOW 2: Schedule a progress check with the team                           */}
        {/* ========================================================================= */}
        {isScheduleCheck && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-sm text-slate-700 leading-relaxed bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4">
              I checked the mutual calendars for <strong>Core Platform Group (4 members)</strong>. Found 2 zero-overlap windows where all key stakeholders are free for a 30-minute sync.
            </div>

            {/* Option 1 vs Option 2 Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
                <button
                  onClick={() => setProgressCheckOption(1)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    progressCheckOption === 1
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Option 1 (Tomorrow)
                </button>
                <button
                  onClick={() => setProgressCheckOption(2)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    progressCheckOption === 2
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Option 2 (Thursday)
                </button>
              </div>

              <span className="text-xs font-medium text-slate-400">
                {progressCheckOption === 1 ? 'Preferred Window' : 'Alternative Window'}
              </span>
            </div>

            {/* Adaptive Timeline Card using Unified Calendar UI */}
            {renderSharedTimelineCard({
              toolName: 'Teams',
              toolIcon: TeamsIcon,
              meetingTitle: 'Team Sprint Progress & Blocker Check',
              timeRange: progressCheckOption === 1 ? '2:30 - 3:00 PM EST (Wednesday)' : '11:00 - 11:30 AM EST (Thursday)',
              blockedLabel: progressCheckOption === 1 ? '1:00 PM - 2:30 PM (Core Architecture Review)' : '9:30 AM - 11:00 AM (Sprint Backlog Refinement)',
              proposedLabel: progressCheckOption === 1 ? '2:30 - 3:00 PM (Zero Conflicts Across 4 Calendars)' : '11:00 - 11:30 AM (All 4 Members Free)',
              hourMarks: progressCheckOption === 1 ? ['1', '2', '3', '4'] : ['9', '10', '11', '12'],
              attendees: ['SL', 'AK', 'JM', 'JH'],
              statusBadge: progressCheckScheduled ? 'Invited ✓' : '100% Available',
              ctaText: progressCheckScheduled ? 'Invites Dispatched ✓' : `Send Invites via Teams (${progressCheckOption === 1 ? 'Opt 1' : 'Opt 2'})`,
              onCtaClick: () => {
                setProgressCheckScheduled(true);
                showToast("Calendar invites dispatched to 4 attendees via Microsoft Teams!");
              },
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* FLOW 3: Show my team schedule for this week                               */}
        {/* ========================================================================= */}
        {isTeamSchedule && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-sm text-slate-700 leading-relaxed bg-slate-100/70 border border-slate-200 rounded-2xl p-4">
              Here is your synchronized team schedule for <strong>Core Platform</strong> this week. You have <strong>scheduled syncs on Tuesday & Thursday</strong>, with open collaborative availability for new team meetings.
            </div>

            {/* Day Selector */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
              {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedDay === day
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {day === 'Tue' ? 'Tuesday (Today)' : day === 'Thu' ? 'Thursday' : day}
                </button>
              ))}
            </div>

            {/* Day Schedule Cards using Unified Calendar UI */}
            <div className="space-y-4">
              {selectedDay === 'Tue' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Tuesday Scheduled Syncs
                    </span>
                    <span className="text-xs text-slate-400 font-medium">2 Meetings Confirmed</span>
                  </div>

                  {renderSharedTimelineCard({
                    toolName: 'Teams',
                    toolIcon: TeamsIcon,
                    meetingTitle: 'Sprint Planning & Scope Review',
                    timeRange: '10:00 - 11:30 AM EST',
                    blockedLabel: '9:00 AM - 10:00 AM (Standup Sync)',
                    proposedLabel: '10:00 - 11:30 AM (Confirmed Slot)',
                    hourMarks: ['9', '10', '11', '12'],
                    attendees: ['SL', 'AK', 'JM'],
                    statusBadge: 'Confirmed',
                  })}

                  {renderSharedTimelineCard({
                    toolName: 'Teams',
                    toolIcon: TeamsIcon,
                    meetingTitle: 'Design System Token Refactor Sync',
                    timeRange: '3:30 - 4:30 PM EST',
                    blockedLabel: '2:00 PM - 3:30 PM (Client Demo)',
                    proposedLabel: '3:30 - 4:30 PM (Confirmed Slot)',
                    hourMarks: ['2', '3', '4', '5'],
                    attendees: ['AK', 'SL'],
                    statusBadge: 'Confirmed',
                    ctaText: 'View in Teams',
                    onCtaClick: () => showToast("Opening Teams event details..."),
                  })}
                </div>
              )}

              {selectedDay === 'Thu' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Thursday Scheduled Syncs
                    </span>
                    <span className="text-xs text-slate-400 font-medium">1 Meeting Confirmed</span>
                  </div>

                  {renderSharedTimelineCard({
                    toolName: 'Teams',
                    toolIcon: TeamsIcon,
                    meetingTitle: 'Cross-Functional Product Architecture Review',
                    timeRange: '1:30 - 2:30 PM EST',
                    blockedLabel: '11:00 AM - 1:00 PM (Focus Coding Window)',
                    proposedLabel: '1:30 - 2:30 PM (Confirmed Slot)',
                    hourMarks: ['11', '12', '1', '2', '3'],
                    attendees: ['SL', 'AK', 'JM', 'JH'],
                    statusBadge: 'Confirmed',
                    ctaText: 'View in Teams',
                    onCtaClick: () => showToast("Opening Thursday architecture review in Teams"),
                  })}
                </div>
              )}

              {selectedDay !== 'Tue' && selectedDay !== 'Thu' && (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/90 text-slate-600 space-y-2 animate-in fade-in duration-150">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto mb-3 border border-slate-200">
                    <Calendar className="w-5 h-5 text-slate-500" />
                  </div>
                  <h4 className="text-[14px] font-bold text-slate-900">No team syncs scheduled for today</h4>
                  <p className="text-xs text-slate-500 font-normal max-w-sm mx-auto leading-relaxed">
                    This day is currently preserved for heads-down execution and focus time.
                  </p>
                </div>
              )}

              {/* Collaborative Availability & "Schedule a Meeting?" Decision Gate */}
              <div className="mt-6 pt-5 border-t border-slate-200/80 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-[14.5px] font-bold text-slate-900">
                      Looking to schedule a new meeting with the team?
                    </h3>
                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                      AI identified collaborative open spots where all team members have mutual availability
                    </p>
                  </div>

                  <button
                    onClick={() => setIsManualBookingOpen(!isManualBookingOpen)}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline cursor-pointer"
                  >
                    {isManualBookingOpen ? 'Close Custom Time' : 'Custom Time & Date'}
                  </button>
                </div>

                {/* Option 1 vs Option 2 Tabs (similar to Flow 1 & Flow 2) */}
                {!isManualBookingOpen ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
                        <button
                          onClick={() => setTeamScheduleOption(1)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            teamScheduleOption === 1
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Option 1: Wednesday 2:30 PM
                        </button>
                        <button
                          onClick={() => setTeamScheduleOption(2)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            teamScheduleOption === 2
                              ? 'bg-white text-slate-900 shadow-xs'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Option 2: Friday 10:00 AM
                        </button>
                      </div>

                      <span className="text-xs font-medium text-slate-400">
                        {teamScheduleOption === 1 ? 'AI Preferred (All 4 Free)' : 'Alternative Free Window'}
                      </span>
                    </div>

                    {renderSharedTimelineCard({
                      toolName: 'Teams',
                      toolIcon: TeamsIcon,
                      meetingTitle: 'Team Sync & Open Working Session',
                      timeRange: teamScheduleOption === 1 ? '2:30 - 3:30 PM EST (Wednesday, Aug 19)' : '10:00 - 11:00 AM EST (Friday, Aug 21)',
                      blockedLabel: teamScheduleOption === 1 ? '1:00 PM - 2:30 PM (Architecture Sync)' : '8:30 AM - 9:30 AM (Individual Focus)',
                      proposedLabel: teamScheduleOption === 1 ? '2:30 - 3:30 PM (Mutual Open Spot)' : '10:00 - 11:00 AM (Mutual Open Spot)',
                      hourMarks: teamScheduleOption === 1 ? ['1', '2', '3', '4'] : ['9', '10', '11', '12'],
                      attendees: ['SL', 'AK', 'JM', 'JH'],
                      statusBadge: teamSlotBooked ? 'Invited ✓' : 'Available',
                      ctaText: teamSlotBooked ? 'Invites Dispatched ✓' : `Schedule This Spot (${teamScheduleOption === 1 ? 'Option 1' : 'Option 2'})`,
                      onCtaClick: () => {
                        setTeamSlotBooked(true);
                        showToast(`Scheduled team meeting for ${teamScheduleOption === 1 ? 'Wednesday at 2:30 PM' : 'Friday at 10:00 AM'}`);
                      },
                    })}
                  </div>
                ) : (
                  /* Custom Manual Time & Date Picker */
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 animate-in fade-in duration-150">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11.5px] font-bold text-slate-700 mb-1">Date</label>
                        <input
                          type="date"
                          value={manualDate}
                          onChange={(e) => setManualDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11.5px] font-bold text-slate-700 mb-1">Time</label>
                        <input
                          type="time"
                          value={manualTime}
                          onChange={(e) => setManualTime(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-slate-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[11.5px] font-bold text-slate-700 mb-1">Topic</label>
                        <input
                          type="text"
                          value={manualTopic}
                          onChange={(e) => setManualTopic(e.target.value)}
                          placeholder="Meeting title..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-slate-400"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-500">Will invite Core Platform group (4 attendees)</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsManualBookingOpen(false)}
                          className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setIsManualBookingOpen(false);
                            setTeamSlotBooked(true);
                            showToast(`Custom meeting "${manualTopic}" scheduled on ${manualDate} at ${manualTime}`);
                          }}
                          className="bg-[#15803d] hover:bg-[#166534] text-[#fcfcfc] text-xs font-bold px-4 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
                        >
                          Send Custom Invites
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FLOW 4: Summarize priorities and blockers for this week                   */}
        {/* ========================================================================= */}
        {isPrioritiesBlockers && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="text-sm text-slate-700 leading-relaxed bg-slate-100/70 border border-slate-200 rounded-2xl p-4">
              Synthesized from <strong>Jira backlog (Sprint 24)</strong>, <strong>Slack #design-system</strong>, and personal priority lists. Found <strong>1 active blocker</strong> and <strong>2 high-priority deliverables</strong> on track.
            </div>

            {/* Active Blocker Alert Card */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Active Blocker: Data Table Token Refactor</span>
                </div>
                <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Blocks 2 Engineers
                </span>
              </div>
              <p className="text-xs text-rose-900 font-normal leading-relaxed">
                Slack thread in #design-system reports Figma tokens mismatch for nested table components. Requires design system lead sign-off.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    setResolvedBlockers((prev) => ({ ...prev, b1: true }));
                    showToast("Notified design lead in Slack #design-system");
                  }}
                  className="bg-[#15803d] hover:bg-[#166534] text-[#fcfcfc] text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  {resolvedBlockers['b1'] ? 'Lead Notified ✓' : 'Ping Design Lead on Slack'}
                </button>
                <button
                  onClick={() => showToast("Opening PROJ-456 in Jira")}
                  className="bg-white border border-slate-300 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Inspect in Jira
                </button>
              </div>
            </div>

            {/* Key Deliverables Status Cards (Consistent with Flow 1 Completed Items Cards) */}
            <div className="space-y-3.5 pt-2">
              <h3 className="text-[15px] font-bold text-slate-900">Key Deliverables Status</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Deliverable 1 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <JiraIcon className="w-5 h-5" />
                      <div>
                        <div className="text-[14px] font-bold text-slate-900">
                          Authentication module implementation
                        </div>
                        <div className="text-[11.5px] text-slate-400 font-mono mt-0.5">
                          PROJ-456
                        </div>
                      </div>
                    </div>

                    <span className="bg-[#e8f5e9] text-[#15803d] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0">
                      Complete
                    </span>
                  </div>

                  <p className="text-[12.5px] text-slate-600 font-normal leading-relaxed mt-2.5">
                    OAuth 2.0 and PKCE authentication pipeline merged and verified against staging environment. Security review signed off by Krishna.
                  </p>
                </div>

                {/* Deliverable 2 */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <SlackIcon className="w-5 h-5" />
                      <div>
                        <div className="text-[14px] font-bold text-slate-900">
                          Button & Form Token Refactor
                        </div>
                        <div className="text-[11.5px] text-slate-400 font-mono mt-0.5">
                          Sprint 24 · #design-system
                        </div>
                      </div>
                    </div>

                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0">
                      75% Progress
                    </span>
                  </div>

                  <p className="text-[12.5px] text-slate-600 font-normal leading-relaxed mt-2.5">
                    Core button and input tokens signed off. Data table token refactoring remains with 3-4 days estimated to completion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FLOW 1: What are today's updates that I should know about? (Default Flow) */}
        {/* ========================================================================= */}
        {!isScheduleCheck && !isTeamSchedule && !isPrioritiesBlockers && (
          <>
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {(['All', 'Slack', 'Teams', 'Outlook', 'Jira', 'GCal'] as SourceType[]).map((source) => (
                <button
                  key={source}
                  onClick={() => setSelectedSource(source)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    selectedSource === source
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>

            {/* SECTION 1: Meetings */}
            {(showGCal || showAll) && (
              <section id="section-meetings" className="space-y-3.5 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-bold text-slate-900">Meetings</h3>
                  <button
                    onClick={onOpenCalendar}
                    className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Calendar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {/* Conflict Card 1 (High Priority) */}
                  <div
                    id="meeting-conflict-card-1"
                    className={`bg-white rounded-2xl border transition-all duration-200 p-4 ${
                      expandedConflictId === 'c1'
                        ? 'border-emerald-300 shadow-sm ring-1 ring-emerald-200'
                        : resolvedConflicts['c1']
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-slate-200/90 hover:border-slate-300'
                    }`}
                  >
                    <div
                      onClick={() =>
                        setExpandedConflictId(expandedConflictId === 'c1' ? null : 'c1')
                      }
                      className="cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-[14px] font-semibold text-slate-900 leading-tight">
                            Meeting Conflict from 2:00 - 3:00 PM
                          </h4>
                          <p className="text-[12px] text-slate-500 mt-1">
                            Design Review is overlapping with Client Demo
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-rose-600 bg-rose-50 border border-rose-200">
                            High Priority
                          </span>
                          <button
                            type="button"
                            aria-label="Toggle conflict details"
                            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                          >
                            {expandedConflictId === 'c1' ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {resolvedConflicts['c1'] && expandedConflictId !== 'c1' && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold animate-in fade-in duration-150">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Rescheduled to {resolvedConflicts['c1'].time}</span>
                        </div>
                        <button
                          onClick={() => setExpandedConflictId('c1')}
                          className="text-slate-400 hover:text-slate-600 text-[11px] font-normal underline cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    )}

                    {expandedConflictId === 'c1' && (
                      <div className="mt-4 pt-3 border-t border-slate-100 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConflictOptions((prev) => ({ ...prev, c1: 1 }));
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                (conflictOptions['c1'] || 1) === 1
                                  ? 'bg-white text-slate-900 shadow-xs'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              Option 1
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConflictOptions((prev) => ({ ...prev, c1: 2 }));
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                (conflictOptions['c1'] || 1) === 2
                                  ? 'bg-white text-slate-900 shadow-xs'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              Option 2
                            </button>
                          </div>
                          <span className="text-xs font-medium text-slate-400">
                            {(conflictOptions['c1'] || 1) === 1 ? 'Preferred' : 'Alternative'}
                          </span>
                        </div>

                        {renderSharedTimelineCard({
                          toolName: 'Teams',
                          toolIcon: TeamsIcon,
                          meetingTitle: 'Design Review',
                          timeRange: meetingOptionsData['c1'][conflictOptions['c1'] || 1].timeRange,
                          blockedLabel: meetingOptionsData['c1'][conflictOptions['c1'] || 1].blockedLabel,
                          proposedLabel: meetingOptionsData['c1'][conflictOptions['c1'] || 1].proposedLabel,
                          hourMarks: meetingOptionsData['c1'][conflictOptions['c1'] || 1].hourMarks,
                          attendees: meetingOptionsData['c1'][conflictOptions['c1'] || 1].attendees,
                          statusBadge: 'Proposed',
                          ctaText: `Apply Reschedule (${(conflictOptions['c1'] || 1) === 1 ? 'Opt 1' : 'Opt 2'})`,
                          onCtaClick: () => handleAcceptReschedule('c1'),
                        })}
                      </div>
                    )}
                  </div>

                  {/* Conflict Card 2 (Medium Priority) */}
                  <div
                    id="meeting-conflict-card-2"
                    className={`bg-white rounded-2xl border transition-all duration-200 p-4 ${
                      expandedConflictId === 'c2'
                        ? 'border-emerald-300 shadow-sm ring-1 ring-emerald-200'
                        : resolvedConflicts['c2']
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-slate-200/90 hover:border-slate-300'
                    }`}
                  >
                    <div
                      onClick={() =>
                        setExpandedConflictId(expandedConflictId === 'c2' ? null : 'c2')
                      }
                      className="cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-[14px] font-semibold text-slate-900 leading-tight">
                            Meeting Overlap by 30 minutes
                          </h4>
                          <p className="text-[12px] text-slate-500 mt-1">
                            Sprint Planning is overlapping your 1:1 w/ Jordan
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-amber-700 bg-amber-50 border border-amber-200">
                            Medium Priority
                          </span>
                          <button
                            type="button"
                            aria-label="Toggle conflict details"
                            className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                          >
                            {expandedConflictId === 'c2' ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {resolvedConflicts['c2'] && expandedConflictId !== 'c2' && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold animate-in fade-in duration-150">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>1:1 Rescheduled to {resolvedConflicts['c2'].time} on Teams</span>
                        </div>
                        <button
                          onClick={() => setExpandedConflictId('c2')}
                          className="text-slate-400 hover:text-slate-600 text-[11px] font-normal underline cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    )}

                    {expandedConflictId === 'c2' && (
                      <div className="mt-4 pt-3 border-t border-slate-100 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConflictOptions((prev) => ({ ...prev, c2: 1 }));
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                (conflictOptions['c2'] || 1) === 1
                                  ? 'bg-white text-slate-900 shadow-xs'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              Option 1
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConflictOptions((prev) => ({ ...prev, c2: 2 }));
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                (conflictOptions['c2'] || 1) === 2
                                  ? 'bg-white text-slate-900 shadow-xs'
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              Option 2
                            </button>
                          </div>
                          <span className="text-xs font-medium text-slate-400">
                            {(conflictOptions['c2'] || 1) === 1 ? 'Preferred' : 'Alternative'}
                          </span>
                        </div>

                        {renderSharedTimelineCard({
                          toolName: 'Teams',
                          toolIcon: TeamsIcon,
                          meetingTitle: '1:1 with Jordan',
                          timeRange: meetingOptionsData['c2'][conflictOptions['c2'] || 1].timeRange,
                          blockedLabel: meetingOptionsData['c2'][conflictOptions['c2'] || 1].blockedLabel,
                          proposedLabel: meetingOptionsData['c2'][conflictOptions['c2'] || 1].proposedLabel,
                          hourMarks: meetingOptionsData['c2'][conflictOptions['c2'] || 1].hourMarks,
                          attendees: meetingOptionsData['c2'][conflictOptions['c2'] || 1].attendees,
                          statusBadge: 'Proposed',
                          ctaText: `Apply Reschedule (${(conflictOptions['c2'] || 1) === 1 ? 'Opt 1' : 'Opt 2'})`,
                          onCtaClick: () => handleAcceptReschedule('c2'),
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* SECTION 2: Updates */}
            {(showSlack || showOutlook) && (
              <section id="section-updates" className="space-y-3.5 pt-2">
                <h3 className="text-[15px] font-bold text-slate-900">Updates</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  {showSlack && (
                    <div
                      id="update-card-slack"
                      className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <SlackIcon className="w-5 h-5" />
                          <div>
                            <div className="text-[14px] font-bold text-slate-900">
                              #design-system
                            </div>
                            <div className="text-[11.5px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <span>💬 15 Messages</span>
                              <span>•</span>
                              <span className="text-emerald-700 font-medium">4 @</span>
                              <span>•</span>
                              <span>⏱ 8 minutes ago</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-slate-400">
                          <button
                            onClick={() => showToast("AI context: Summarized from active unread thread")}
                            className="hover:text-slate-600 p-1 cursor-pointer"
                            title="View context"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => showToast("Opening #design-system on Slack...")}
                            className="hover:text-slate-600 p-1 cursor-pointer"
                            title="Open in Slack"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#f8fafc] rounded-xl border border-slate-200/70 overflow-hidden">
                        <button
                          onClick={() => toggleSummary('u1')}
                          className="w-full px-3.5 py-2 flex items-center justify-between text-[12px] font-semibold text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
                        >
                          <span>Generated Summary</span>
                          {openSummaries['u1'] ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>

                        {openSummaries['u1'] && (
                          <div className="px-3.5 pb-3.5 text-[12.5px] text-slate-600 font-normal leading-relaxed">
                            The design system refactoring is 75% complete. Key components including buttons, forms, and navigation have been updated. Remaining work includes data tables and chart components, estimated 3-4 days. No blockers identified.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {showOutlook && (
                    <div
                      id="update-card-outlook"
                      className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <OutlookIcon className="w-5 h-5" />
                          <div>
                            <div className="text-[14px] font-bold text-slate-900">
                              Jensen Huang
                            </div>
                            <div className="text-[11.5px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <span>Re: Q4 Milestones</span>
                              <span>•</span>
                              <span>⏱ 14m ago</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-slate-400">
                          <button
                            onClick={() => showToast("AI context: Executive priority email flagged")}
                            className="hover:text-slate-600 p-1 cursor-pointer"
                            title="View context"
                          >
                            <Info className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => showToast("Opening thread in Microsoft Outlook...")}
                            className="hover:text-slate-600 p-1 cursor-pointer"
                            title="Open in Outlook"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#f8fafc] rounded-xl border border-slate-200/70 overflow-hidden">
                        <button
                          onClick={() => toggleSummary('u2')}
                          className="w-full px-3.5 py-2 flex items-center justify-between text-[12px] font-semibold text-slate-700 hover:bg-slate-100/80 transition-colors cursor-pointer"
                        >
                          <span>Generated Summary</span>
                          {openSummaries['u2'] ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </button>

                        {openSummaries['u2'] && (
                          <div className="px-3.5 pb-3.5 text-[12.5px] text-slate-600 font-normal leading-relaxed">
                            Jensen approved the proposed Q4 deliverables for the Omniverse AI integration. Requested an interim review presentation deck ahead of the quarterly executive review next Friday.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* SECTION 3: Completed Items */}
            {(showJira || showAll) && (
              <section id="section-completed-items" className="space-y-3.5 pt-2">
                <h3 className="text-[15px] font-bold text-slate-900">Completed Items</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {showJira && (
                    <div
                      id="completed-card-jira"
                      className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <JiraIcon className="w-5 h-5" />
                          <div>
                            <div className="text-[14px] font-bold text-slate-900">
                              Authentication module implementation
                            </div>
                            <div className="text-[11.5px] text-slate-400 font-mono mt-0.5">
                              PROJ-456
                            </div>
                          </div>
                        </div>

                        <span className="bg-[#e8f5e9] text-[#15803d] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0">
                          Complete
                        </span>
                      </div>

                      <p className="text-[12.5px] text-slate-600 font-normal leading-relaxed mt-2.5">
                        OAuth 2.0 and PKCE authentication pipeline merged and verified against staging environment.
                      </p>
                    </div>
                  )}

                  {showAll && (
                    <div
                      id="completed-card-priorities"
                      className="bg-white rounded-2xl border border-slate-200/90 p-4.5 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="text-[#15803d]">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[14px] font-bold text-slate-900">
                              Stakeholder design mockup approval
                            </div>
                            <div className="text-[11.5px] text-slate-400 mt-0.5">
                              Today&apos;s Priorities List
                            </div>
                          </div>
                        </div>

                        <span className="bg-[#e8f5e9] text-[#15803d] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex-shrink-0">
                          Complete
                        </span>
                      </div>

                      <p className="text-[12.5px] text-slate-600 font-normal leading-relaxed mt-2.5">
                        Completed ahead of deadline. Sign-off received from Sarah and design systems review committee.
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};
