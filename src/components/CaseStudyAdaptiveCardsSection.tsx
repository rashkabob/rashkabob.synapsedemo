import React, { useState } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  CheckSquare, 
  Copy, 
  Check, 
  Info, 
  ExternalLink 
} from 'lucide-react';

interface CaseStudyAdaptiveCardsSectionProps {
  onBackToDemo?: () => void;
}

export const CaseStudyAdaptiveCardsSection: React.FC<CaseStudyAdaptiveCardsSectionProps> = ({ onBackToDemo }) => {
  const [copied, setCopied] = useState(false);

  const portfolioJSX = `// AdaptiveCardsCaseStudySection.tsx
import React from 'react';
import { 
  Calendar, 
  MessageSquare, 
  CheckSquare, 
  Info, 
  ExternalLink 
} from 'lucide-react';

export const AdaptiveCardsSection = () => {
  return (
    <section className="w-full font-sans select-none" aria-label="Adaptive Cards Case Study Section">
      
      {/* Header Eyebrow & Badge */}
      <header className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs font-bold text-[#65a30d] tracking-widest uppercase">
            DEEP CUT
          </span>
          <span className="bg-[#ecfccb] text-[#3f6212] border border-[#bef264] px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap">
            Universal Component Anatomy
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Adaptive cards
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-700 font-normal leading-relaxed max-w-3xl">
          A universal interaction framework that standardizes how the AI surfaces context, 
          explains its rationale, and provides in-situ decision gates across any connected workspace tool.
        </p>
      </header>

      {/* Standardized Structural Legend (1 - 5) */}
      <div 
        className="flex flex-wrap items-center gap-x-6 gap-y-3 p-4 mb-8 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-[11px] text-slate-700"
        aria-label="Component Anatomy Legend"
      >
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]" aria-hidden="true">1</span>
          <span>Source & Priority</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]" aria-hidden="true">2</span>
          <span>AI Rationale (ⓘ)</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]" aria-hidden="true">3</span>
          <span>Source Outlink (↗)</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]" aria-hidden="true">4</span>
          <span>Dynamic Payload</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]" aria-hidden="true">5</span>
          <span>Decision Gate</span>
        </div>
      </div>

      {/* Responsive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        
        {/* CARD 1: Scheduling (Annotated Reference Schematic) */}
        <article className="space-y-2.5 flex flex-col h-full min-w-0">
          <h3 className="font-mono text-xs font-bold text-slate-800 tracking-tight truncate">
            A card for resolving schedule conflicts
          </h3>

          <div className="rounded-2xl border border-slate-300 bg-white p-5 flex flex-col justify-between flex-1 space-y-4 shadow-xs">
            <div className="space-y-3 min-w-0">
              
              {/* Header Utility Bar (Zones 1, 2, 3) */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[9px] font-mono shrink-0" aria-label="Zone 1">
                    1
                  </span>
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1 shrink-0">
                    <Calendar className="w-3 h-3 text-[#65a30d]" aria-hidden="true" />
                    MS Teams
                  </span>
                  <span className="font-mono text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded font-medium shrink-0">
                    High
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
                  <div className="flex items-center gap-0.5">
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[9px] font-mono" aria-label="Zone 2">
                      2
                    </span>
                    <div title="Why AI surfaced this" className="p-1 text-slate-600 bg-slate-100 rounded">
                      <Info className="w-3 h-3" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[9px] font-mono" aria-label="Zone 3">
                      3
                    </span>
                    <div title="Open in MS Teams" className="p-1 text-slate-600 bg-slate-100 rounded">
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtitle / Context description */}
              <p className="font-mono text-xs text-slate-600 leading-relaxed">
                Resolved 30m overlap between Sprint Planning & 1:1.
              </p>

              {/* Zone 4: Dynamic Payload Slot (Timeline UI) */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[9px]" aria-label="Zone 4">
                      4
                    </span>
                    <span className="font-semibold text-slate-700">Proposed Solutions:</span>
                  </div>
                  <span className="font-bold text-slate-800">Option 1 of 2</span>
                </div>

                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="flex items-center gap-2 pl-2">
                    <span className="w-14 text-slate-400 text-right shrink-0">10:00 AM</span>
                    <div className="flex-1 bg-rose-50 border border-rose-200 text-rose-700 px-2 py-1 rounded truncate">
                      Sprint Planning (Overlap)
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pl-2">
                    <span className="w-14 text-slate-900 font-bold text-right shrink-0">10:30 AM</span>
                    <div className="flex-1 bg-emerald-50 border-2 border-dashed border-[#76B900] text-emerald-900 font-bold px-2 py-1 rounded truncate flex items-center justify-between">
                      <span className="truncate">1:1 Reschedule Slot</span>
                      <span className="text-[9px] bg-[#76B900]/20 text-slate-900 px-1 rounded shrink-0 ml-1">Open</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone 5: Primary Decision Gate */}
            <div className="w-full bg-[#76B900] text-slate-950 font-bold py-2.5 rounded-xl text-xs font-mono text-center tracking-wide flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full bg-slate-950 text-white font-bold flex items-center justify-center text-[9px]" aria-label="Zone 5">
                5
              </span>
              <span>Apply Reschedule</span>
            </div>
          </div>
        </article>

        {/* CARD 2: Thread Synthesis (Clean Companion) */}
        <article className="space-y-2.5 flex flex-col h-full min-w-0">
          <h3 className="font-mono text-xs font-bold text-slate-800 tracking-tight truncate">
            A card for synthesizing comm. threads
          </h3>

          <div className="rounded-2xl border border-slate-300 bg-white p-5 flex flex-col justify-between flex-1 space-y-4 shadow-xs">
            <div className="space-y-3 min-w-0">
              
              {/* Header Utility Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1 shrink-0">
                    <MessageSquare className="w-3 h-3 text-[#65a30d]" aria-hidden="true" />
                    Slack
                  </span>
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded font-medium shrink-0">
                    #design
                  </span>
                </div>

                <div className="flex items-center gap-1 text-slate-400 shrink-0">
                  <div title="Why AI surfaced this" className="p-1 text-slate-600 bg-slate-100 rounded">
                    <Info className="w-3 h-3" aria-hidden="true" />
                  </div>
                  <div title="Open in Slack" className="p-1 text-slate-600 bg-slate-100 rounded">
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Subtitle / Context description */}
              <p className="font-mono text-xs text-slate-600 leading-relaxed">
                15 replies in #design-system condensed to milestones.
              </p>

              {/* Dynamic Payload Slot (Summary Receipts) */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pb-1 border-b border-slate-200/80">
                  <span className="font-semibold text-slate-700">Summary Receipts:</span>
                  <span>4 participants</span>
                </div>
                <ul className="space-y-1.5 font-mono text-[11px] text-slate-800">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#65a30d] font-bold shrink-0">•</span>
                    <span><strong>75% complete:</strong> Button & form tokens signed off</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#65a30d] font-bold shrink-0">•</span>
                    <span><strong>3-4 days:</strong> Data table token refactor remaining</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Primary Decision Gate */}
            <div className="w-full bg-white border border-slate-300 text-slate-900 font-mono py-2.5 rounded-xl text-xs font-semibold text-center">
              View 15 Source Messages
            </div>
          </div>
        </article>

        {/* CARD 3: Timely Work Updates (Clean Companion) */}
        <article className="space-y-2.5 flex flex-col h-full min-w-0 md:col-span-2 lg:col-span-1">
          <h3 className="font-mono text-xs font-bold text-slate-800 tracking-tight truncate">
            A card for acting on timely work updates
          </h3>

          <div className="rounded-2xl border border-slate-300 bg-white p-5 flex flex-col justify-between flex-1 space-y-4 shadow-xs">
            <div className="space-y-3 min-w-0">
              
              {/* Header Utility Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-mono text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1 shrink-0">
                    <CheckSquare className="w-3 h-3 text-[#65a30d]" aria-hidden="true" />
                    Jira
                  </span>
                  <span className="font-mono text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-bold shrink-0">
                    PROJ-456
                  </span>
                </div>

                <div className="flex items-center gap-1 text-slate-400 shrink-0">
                  <div title="Why AI surfaced this" className="p-1 text-slate-600 bg-slate-100 rounded">
                    <Info className="w-3 h-3" aria-hidden="true" />
                  </div>
                  <div title="Open in Jira" className="p-1 text-slate-600 bg-slate-100 rounded">
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* Subtitle / Context description */}
              <p className="font-mono text-xs text-slate-600 leading-relaxed">
                &quot;remind me to close auth ticket reviewed with Krishna&quot;
              </p>

              {/* Dynamic Payload Slot (Entity State Validation) */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-700 font-semibold">Ticket Status:</span>
                  <span className="text-emerald-700 font-bold">Ready to Close ✓</span>
                </div>
                <p className="font-mono text-[11px] text-slate-800 leading-snug">
                  Auth middleware security review signed off; ready for ticket closure.
                </p>
              </div>
            </div>

            {/* Primary Decision Gate */}
            <div className="w-full bg-[#76B900] text-slate-950 font-bold py-2.5 rounded-xl text-xs font-mono text-center tracking-wide">
              Approve & Sync Ticket
            </div>
          </div>
        </article>

      </div>
    </section>
  );
};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioJSX);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 py-8 px-4 sm:px-6 md:px-8 lg:px-12 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Utility Bar for Copying Code into Portfolio */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          {onBackToDemo && (
            <button
              onClick={onBackToDemo}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              ← Back to Assistant Demo
            </button>
          )}
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Case Study Component (Fluid Layout)
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Clean JSX!' : 'Copy Code for Portfolio'}</span>
        </button>
      </div>

      {/* Rendered Case Study Section (No Outer Rigid Border - Pure Parent Fluidity) */}
      <section className="w-full max-w-6xl mx-auto font-sans select-none" aria-label="Adaptive Cards Case Study Section">
        
        {/* Header Eyebrow & Badge */}
        <header className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-[#65a30d] tracking-widest uppercase">
              DEEP CUT
            </span>
            <span className="bg-[#ecfccb] text-[#3f6212] border border-[#bef264] px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap">
              Universal Component Anatomy
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Adaptive cards
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-700 font-normal leading-relaxed max-w-3xl">
            A universal interaction framework that standardizes how the AI surfaces context, explains its rationale, and provides in-situ decision gates across any connected workspace tool.
          </p>
        </header>

        {/* Standardized Structural Legend (1 - 5) */}
        <div 
          className="flex flex-wrap items-center gap-x-6 gap-y-3 p-4 mb-8 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-[11px] text-slate-700"
          aria-label="Component Anatomy Legend"
        >
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]" aria-hidden="true">1</span>
            <span>Source & Priority</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]" aria-hidden="true">2</span>
            <span>AI Rationale (ⓘ)</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]" aria-hidden="true">3</span>
            <span>Source Outlink (↗)</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]" aria-hidden="true">4</span>
            <span>Dynamic Payload</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[10px]" aria-hidden="true">5</span>
            <span>Decision Gate</span>
          </div>
        </div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          
          {/* CARD 1: Scheduling */}
          <article className="space-y-2.5 flex flex-col h-full min-w-0">
            <h3 className="font-mono text-xs font-bold text-slate-800 tracking-tight truncate">
              A card for resolving schedule conflicts
            </h3>

            <div className="rounded-2xl border border-slate-300 bg-white p-5 flex flex-col justify-between flex-1 space-y-4 shadow-xs">
              <div className="space-y-3 min-w-0">
                
                {/* Header Utility Bar (Zones 1, 2, 3) */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[9px] font-mono shrink-0" aria-label="Zone 1">
                      1
                    </span>
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1 shrink-0">
                      <Calendar className="w-3 h-3 text-[#65a30d]" aria-hidden="true" />
                      MS Teams
                    </span>
                    <span className="font-mono text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-1.5 py-0.5 rounded font-medium shrink-0">
                      High
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
                    <div className="flex items-center gap-0.5">
                      <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[9px] font-mono" aria-label="Zone 2">
                        2
                      </span>
                      <div title="Why AI surfaced this" className="p-1 text-slate-600 bg-slate-100 rounded cursor-pointer">
                        <Info className="w-3 h-3" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[9px] font-mono" aria-label="Zone 3">
                        3
                      </span>
                      <div title="Open in MS Teams" className="p-1 text-slate-600 bg-slate-100 rounded cursor-pointer">
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle / Context description */}
                <p className="font-mono text-xs text-slate-600 leading-relaxed">
                  Resolved 30m overlap between Sprint Planning & 1:1.
                </p>

                {/* Zone 4: Dynamic Payload Slot (Timeline UI) */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-[9px]" aria-label="Zone 4">
                        4
                      </span>
                      <span className="font-semibold text-slate-700">Proposed Solutions:</span>
                    </div>
                    <span className="font-bold text-slate-800">Option 1 of 2</span>
                  </div>

                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-400 text-right shrink-0">10:00 AM</span>
                      <div className="flex-1 bg-rose-50 border border-rose-200 text-rose-700 px-2 py-1 rounded truncate">
                        Sprint Planning (Overlap)
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-900 font-bold text-right shrink-0">10:30 AM</span>
                      <div className="flex-1 bg-emerald-50 border-2 border-dashed border-[#76B900] text-emerald-900 font-bold px-2 py-1 rounded truncate flex items-center justify-between">
                        <span className="truncate">1:1 Reschedule Slot</span>
                        <span className="text-[9px] bg-[#76B900]/20 text-slate-900 px-1 rounded shrink-0 ml-1">Open</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone 5: Primary Decision Gate */}
              <div className="w-full bg-[#76B900] text-slate-950 font-bold py-2.5 rounded-xl text-xs font-mono text-center tracking-wide flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full bg-slate-950 text-white font-bold flex items-center justify-center text-[9px]" aria-label="Zone 5">
                  5
                </span>
                <span>Apply Reschedule</span>
              </div>
            </div>
          </article>

          {/* CARD 2: Thread Synthesis */}
          <article className="space-y-2.5 flex flex-col h-full min-w-0">
            <h3 className="font-mono text-xs font-bold text-slate-800 tracking-tight truncate">
              A card for synthesizing comm. threads
            </h3>

            <div className="rounded-2xl border border-slate-300 bg-white p-5 flex flex-col justify-between flex-1 space-y-4 shadow-xs">
              <div className="space-y-3 min-w-0">
                
                {/* Header Utility Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1 shrink-0">
                      <MessageSquare className="w-3 h-3 text-[#65a30d]" aria-hidden="true" />
                      Slack
                    </span>
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded font-medium shrink-0">
                      #design
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 shrink-0">
                    <div title="Why AI surfaced this" className="p-1 text-slate-600 bg-slate-100 rounded cursor-pointer">
                      <Info className="w-3 h-3" aria-hidden="true" />
                    </div>
                    <div title="Open in Slack" className="p-1 text-slate-600 bg-slate-100 rounded cursor-pointer">
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Subtitle / Context description */}
                <p className="font-mono text-xs text-slate-600 leading-relaxed">
                  15 replies in #design-system condensed to milestones.
                </p>

                {/* Dynamic Payload Slot (Summary Receipts) */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pb-1 border-b border-slate-200/80">
                    <span className="font-semibold text-slate-700">Summary Receipts:</span>
                    <span>4 participants</span>
                  </div>
                  <ul className="space-y-1.5 font-mono text-[11px] text-slate-800">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#65a30d] font-bold shrink-0">•</span>
                      <span><strong>75% complete:</strong> Button & form tokens signed off</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#65a30d] font-bold shrink-0">•</span>
                      <span><strong>3-4 days:</strong> Data table token refactor remaining</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Primary Decision Gate */}
              <div className="w-full bg-white border border-slate-300 text-slate-900 font-mono py-2.5 rounded-xl text-xs font-semibold text-center">
                View 15 Source Messages
              </div>
            </div>
          </article>

          {/* CARD 3: Timely Work Updates */}
          <article className="space-y-2.5 flex flex-col h-full min-w-0 md:col-span-2 lg:col-span-1">
            <h3 className="font-mono text-xs font-bold text-slate-800 tracking-tight truncate">
              A card for acting on timely work updates
            </h3>

            <div className="rounded-2xl border border-slate-300 bg-white p-5 flex flex-col justify-between flex-1 space-y-4 shadow-xs">
              <div className="space-y-3 min-w-0">
                
                {/* Header Utility Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-mono text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-semibold flex items-center gap-1 shrink-0">
                      <CheckSquare className="w-3 h-3 text-[#65a30d]" aria-hidden="true" />
                      Jira
                    </span>
                    <span className="font-mono text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-bold shrink-0">
                      PROJ-456
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 shrink-0">
                    <div title="Why AI surfaced this" className="p-1 text-slate-600 bg-slate-100 rounded cursor-pointer">
                      <Info className="w-3 h-3" aria-hidden="true" />
                    </div>
                    <div title="Open in Jira" className="p-1 text-slate-600 bg-slate-100 rounded cursor-pointer">
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Subtitle / Context description */}
                <p className="font-mono text-xs text-slate-600 leading-relaxed">
                  &quot;remind me to close auth ticket reviewed with Krishna&quot;
                </p>

                {/* Dynamic Payload Slot (Entity State Validation) */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-700 font-semibold">Ticket Status:</span>
                    <span className="text-emerald-700 font-bold">Ready to Close ✓</span>
                  </div>
                  <p className="font-mono text-[11px] text-slate-800 leading-snug">
                    Auth middleware security review signed off; ready for ticket closure.
                  </p>
                </div>
              </div>

              {/* Primary Decision Gate */}
              <div className="w-full bg-[#76B900] text-slate-950 font-bold py-2.5 rounded-xl text-xs font-mono text-center tracking-wide">
                Approve & Sync Ticket
              </div>
            </div>
          </article>

        </div>
      </section>
    </div>
  );
};
