import React, { useState, useEffect } from 'react';
import { ChevronRight, Check, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PromptBar } from './PromptBar';
import { PriorityItem, StockTicker } from '../types';

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
  priorities: PriorityItem[];
  onTogglePriority: (id: string) => void;
  onManagePriorities: () => void;
  stocks: StockTicker[];
  onToast?: (message: string) => void;
  onOpenConnectors?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onSelectPrompt,
  priorities,
  onTogglePriority,
  onManagePriorities,
  stocks: initialStocks,
  onToast,
  onOpenConnectors,
}) => {
  const [stocks, setStocks] = useState<StockTicker[]>(initialStocks);
  const [lastUpdated, setLastUpdated] = useState('7:04:45 PM');

  // Simulated live stock ticker fluctuations for realism
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      setStocks((prev) =>
        prev.map((stock) => {
          const delta = (Math.random() - 0.48) * 0.4;
          const newPrice = Math.max(10, +(stock.price + delta).toFixed(2));
          return {
            ...stock,
            price: newPrice,
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const promptPills = [
    "What are today's updates that I should know about?",
    "Schedule a progress check with the team",
    "Show my team schedule for this week",
    "Summarize priorities and blockers for this week",
  ];

  return (
    <div
      id="empty-state-container"
      className="w-full flex-1 flex flex-col items-center justify-start px-4 pt-6 pb-8 max-w-4xl mx-auto"
    >
      <div className="w-full flex flex-col items-center justify-center my-auto py-6">
        {/* Main Greeting / Heading */}
        <h1
          id="home-heading"
          className="text-[28px] md:text-[34px] font-bold text-slate-900 tracking-tight text-center mb-9"
        >
          What should we look at today?
        </h1>

        {/* Suggested Prompt Pills */}
        <div
          id="suggested-prompts-group"
          className="flex flex-col items-center gap-3.5 mb-12 w-full max-w-3xl px-2"
        >
          {/* Row 1 */}
          <div className="flex items-center justify-center gap-3 w-full">
            <button
              id="prompt-pill-0"
              onClick={() => onSelectPrompt(promptPills[0])}
              className="bg-white border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:border-slate-300 hover:bg-slate-50/90 px-4.5 py-2.5 rounded-full text-[13px] sm:text-[13.5px] font-medium transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.02)] active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              {promptPills[0]}
            </button>
            <button
              id="prompt-pill-1"
              onClick={() => onSelectPrompt(promptPills[1])}
              className="bg-white border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:border-slate-300 hover:bg-slate-50/90 px-4.5 py-2.5 rounded-full text-[13px] sm:text-[13.5px] font-medium transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.02)] active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              {promptPills[1]}
            </button>
          </div>

          {/* Row 2 */}
          <div className="flex items-center justify-center gap-3 w-full">
            <button
              id="prompt-pill-2"
              onClick={() => onSelectPrompt(promptPills[2])}
              className="bg-white border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:border-slate-300 hover:bg-slate-50/90 px-4.5 py-2.5 rounded-full text-[13px] sm:text-[13.5px] font-medium transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.02)] active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              {promptPills[2]}
            </button>
            <button
              id="prompt-pill-3"
              onClick={() => onSelectPrompt(promptPills[3])}
              className="bg-white border border-slate-200/90 text-slate-700 hover:text-slate-950 hover:border-slate-300 hover:bg-slate-50/90 px-4.5 py-2.5 rounded-full text-[13px] sm:text-[13.5px] font-medium transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.02)] active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              {promptPills[3]}
            </button>
          </div>
        </div>

        {/* Two Column Bottom Cards: Today's Priorities & Market Watch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">
          {/* Card 1: Today's Priorities */}
          <div
            id="card-todays-priorities"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="text-[#15803d]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </div>
                  <h2 className="text-[15px] font-semibold text-slate-900">
                    Today&apos;s Priorities
                  </h2>
                </div>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {priorities.length}
                </span>
              </div>

              {/* Interactive Priorities List */}
              <div className="space-y-3.5 mt-2">
                {priorities.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    id={`priority-row-${item.id}`}
                    onClick={() => onTogglePriority(item.id)}
                    className="flex items-center justify-between cursor-pointer group select-none py-0.5"
                  >
                    <div className="flex items-center gap-3">
                      {/* Custom Checkbox */}
                      <div
                        className={`w-4.5 h-4.5 rounded-md flex items-center justify-center transition-all ${
                          item.completed
                            ? 'bg-[#15803d] text-white border-transparent'
                            : 'border-2 border-slate-300 group-hover:border-slate-400 bg-white'
                        }`}
                      >
                        {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      {/* Title */}
                      <span
                        className={`text-[14px] font-normal transition-colors ${
                          item.completed
                            ? 'text-slate-400 line-through'
                            : 'text-slate-800 group-hover:text-slate-950'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {/* Red Priority Dot */}
                    <div className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Link */}
            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                id="btn-manage-all-priorities"
                onClick={onManagePriorities}
                className="w-full flex items-center justify-between text-slate-600 hover:text-slate-900 text-[13.5px] font-medium transition-colors cursor-pointer"
              >
                <span>Manage all priorities</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Card 2: Market Watch */}
          <div
            id="card-market-watch"
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#15803d] font-bold text-lg leading-none">$</span>
                  <h2 className="text-[15px] font-semibold text-slate-900">
                    Market Watch
                  </h2>
                </div>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Live
                </span>
              </div>

              {/* Stocks List */}
              <div className="space-y-3 mt-2">
                {stocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center justify-between text-left"
                  >
                    <div>
                      <div className="text-[13.5px] font-semibold text-slate-900 leading-snug">
                        {stock.symbol}
                      </div>
                      <div className="text-[11.5px] text-slate-400 font-normal">
                        {stock.name}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[13.5px] font-medium text-slate-900 leading-snug">
                        ${stock.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11.5px] font-semibold flex items-center justify-end gap-0.5 ${
                          stock.changePercent >= 0
                            ? 'text-emerald-700'
                            : 'text-rose-600'
                        }`}
                      >
                        {stock.changePercent >= 0 ? (
                          <>
                            <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                            +{stock.changePercent.toFixed(1)}%
                          </>
                        ) : (
                          <>
                            <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />
                            {stock.changePercent.toFixed(1)}%
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Timestamp */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 font-normal">
                Updated: {lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
