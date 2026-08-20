import React, { useState } from 'react';
import { Calendar, Bell, Check, Sparkles } from 'lucide-react';

interface TopHeaderProps {
  onOpenCalendar: () => void;
  isCalendarOpen?: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenCalendar, isCalendarOpen = false }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifications = [
    {
      id: 'n1',
      title: 'Sprint Planning Overlap',
      desc: '1:1 with Jordan overlaps with Sprint Planning at 10:00 AM',
      time: '12m ago',
      type: 'warning',
    },
    {
      id: 'n2',
      title: 'Jensen shared new roadmap',
      desc: 'Q4 milestones requested in executive email',
      time: '34m ago',
      type: 'info',
    },
    {
      id: 'n3',
      title: 'Authentication module approved',
      desc: 'PROJ-456 marked complete by Krishna',
      time: '1h ago',
      type: 'success',
    },
  ];

  return (
    <header
      id="top-header"
      className="w-full h-14 flex items-center justify-end px-8 bg-transparent select-none relative z-20 flex-shrink-0"
    >
      <div className="flex items-center gap-3">
        {/* Calendar Trigger */}
        <button
          id="btn-header-calendar"
          aria-label="Open Calendar"
          onClick={onOpenCalendar}
          className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors relative cursor-pointer ${
            isCalendarOpen
              ? 'bg-emerald-50 text-[#15803d] border border-emerald-300 shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Open Workspace Calendar"
        >
          <Calendar className="w-5 h-5 stroke-[1.8]" />
        </button>

        {/* Notifications Trigger */}
        <div className="relative">
          <button
            id="btn-header-notifications"
            aria-label="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (unreadCount > 0) setUnreadCount(0);
            }}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              id="notifications-popover"
              className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="flex items-center justify-between px-2 py-1.5 border-b border-slate-100 mb-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#15803d]" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Workspace Alerts
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left border border-transparent hover:border-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold text-slate-800">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-normal line-clamp-2">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-bold text-[#15803d] hover:text-[#166534] flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> All caught up
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
