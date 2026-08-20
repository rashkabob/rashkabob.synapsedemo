import React, { useState } from 'react';
import { X, Plus, Check, Trash2 } from 'lucide-react';
import { PriorityItem } from '../types';

interface PrioritiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  priorities: PriorityItem[];
  onTogglePriority: (id: string) => void;
  onAddPriority: (title: string, priorityLevel: 'high' | 'medium' | 'low') => void;
  onDeletePriority: (id: string) => void;
}

export const PrioritiesModal: React.FC<PrioritiesModalProps> = ({
  isOpen,
  onClose,
  priorities,
  onTogglePriority,
  onAddPriority,
  onDeletePriority,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newLevel, setNewLevel] = useState<'high' | 'medium' | 'low'>('high');

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddPriority(newTitle.trim(), newLevel);
    setNewTitle('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-left relative flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Manage Workspace Priorities</h3>
            <p className="text-xs text-slate-500 font-normal mt-0.5">Track and prioritize today&apos;s active deliverables</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Priority Form */}
        <form onSubmit={handleAdd} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Add a new priority item..."
            className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-slate-400 text-slate-900 placeholder:text-slate-400 font-normal"
          />
          <select
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value as 'high' | 'medium' | 'low')}
            className="px-2.5 py-2 text-xs border border-slate-200 rounded-xl outline-none text-slate-700 bg-white font-medium cursor-pointer"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-[#15803d] hover:bg-[#166534] text-[#fcfcfc] text-xs font-bold rounded-xl flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" /> Add
          </button>
        </form>

        {/* Priorities List */}
        <div className="space-y-2 mt-4 overflow-y-auto flex-1 pr-1">
          {priorities.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl border border-slate-200/80 bg-white flex items-center justify-between hover:bg-slate-50/80 transition-colors"
            >
              <div
                onClick={() => onTogglePriority(item.id)}
                className="flex items-center gap-3 cursor-pointer flex-1 select-none"
              >
                <div
                  className={`w-4.5 h-4.5 rounded-md flex items-center justify-center transition-all ${
                    item.completed
                      ? 'bg-[#15803d] text-white border-transparent'
                      : 'border-2 border-slate-300 bg-white'
                  }`}
                >
                  {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span
                  className={`text-xs font-normal ${
                    item.completed ? 'line-through text-slate-400' : 'text-slate-800'
                  }`}
                >
                  {item.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.priorityLevel === 'high'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {item.priorityLevel.toUpperCase()}
                </span>
                <button
                  onClick={() => onDeletePriority(item.id)}
                  className="text-slate-300 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-normal">
            {priorities.filter((p) => p.completed).length} of {priorities.length} completed
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-[#fcfcfc] text-xs font-bold rounded-xl cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
