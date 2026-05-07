import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { cn, formatDate } from '../lib/utils';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Task } from '../types';

const TASKS: Task[] = [
  { id: '1', title: 'Draft Motion for Summary Judgment', caseName: 'Johnson v. TechCorp', caseId: 'c1', dueDate: '2023-11-25', priority: 'High', completed: false, status: 'Todo' },
  { id: '2', title: 'Call Client: Settlement Discussion', caseName: 'Estate Planning: Harrison', caseId: 'c2', dueDate: '2023-11-24', priority: 'Medium', completed: true, status: 'Completed' },
  { id: '3', title: 'File Articles of Incorporation', caseName: 'Green Energy Merger', caseId: 'c3', dueDate: '2023-11-26', priority: 'High', completed: false, status: 'Todo' },
  { id: '4', title: 'Initial Consultation: New Prospect', caseName: 'General Inquiry', caseId: 'c4', dueDate: '2023-11-23', priority: 'Low', completed: false, status: 'Todo' },
  { id: '5', title: 'Review Property Deeds', caseName: '452 Oak St Dispute', caseId: 'c5', dueDate: '2023-11-27', priority: 'Medium', completed: false, status: 'In Progress' },
];

export default function TaskManagement() {
  const [tasks, setTasks] = useState(TASKS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed, status: !t.completed ? 'Completed' : 'Todo' } : t));
    const task = tasks.find(t => t.id === id);
    if (!task?.completed) toast.success('Task marked as complete!');
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tasks & Calendar</h1>
          <p className="text-slate-500 mt-1">Manage your personal schedule and deadlines.</p>
        </div>
        <button 
          onClick={() => toast.info('New task modal opened')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-100"
        >
          <Plus size={18} />
          Create Task
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Section */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold flex items-center gap-2 text-slate-900">
                <CalendarIcon size={20} className="text-indigo-600" />
                November 2023
              </h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><ChevronLeft size={18} /></button>
                <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><ChevronRight size={18} /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-4">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <span key={d} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</span>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const isToday = day === 23;
                const hasTask = [24, 25, 26, 27].includes(day);
                
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "h-10 flex flex-col items-center justify-center rounded-xl text-sm transition-all relative cursor-pointer group",
                      isToday ? "bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200" : "hover:bg-indigo-50",
                      hasTask && !isToday && "font-bold text-slate-900"
                    )}
                  >
                    {day}
                    {hasTask && !isToday && (
                      <span className="absolute bottom-1.5 w-1 h-1 bg-indigo-400 rounded-full group-hover:bg-indigo-600" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Today's Schedule</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1.5 bg-indigo-600 rounded-full shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Client Consultation</p>
                    <p className="text-xs text-slate-500 font-medium">10:00 AM - 11:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1.5 bg-amber-500 rounded-full shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">Court Hearing: Johnson</p>
                    <p className="text-xs text-slate-500 font-medium">02:00 PM - 03:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <div className="relative z-10">
              <h4 className="font-bold mb-2">Weekly Outlook</h4>
              <p className="text-xs text-indigo-200 leading-relaxed mb-4">
                You have 8 high-priority tasks due this week. Stay ahead of the curve.
              </p>
              <button className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 rounded-xl text-xs font-bold transition-all">
                View Detailed Report
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-800 rounded-full blur-3xl opacity-50" />
          </div>
        </div>

        {/* Tasks Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 w-fit">
              {(['all', 'pending', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all",
                    filter === f ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Filter size={14} />
                Filter by Priority
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredTasks.map((task, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={task.id}
                className={cn(
                  "group flex items-center gap-4 p-5 bg-white rounded-2xl border transition-all",
                  task.completed ? "border-slate-100 bg-slate-50/50" : "border-slate-200 hover:border-indigo-200 hover:shadow-md"
                )}
              >
                <button 
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "transition-all shrink-0",
                    task.completed ? "text-emerald-500 scale-110" : "text-slate-300 hover:text-indigo-500 hover:scale-110"
                  )}
                >
                  {task.completed ? <CheckCircle2 size={26} /> : <Circle size={26} />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={cn(
                      "font-bold text-slate-900 truncate",
                      task.completed && "line-through text-slate-400"
                    )}>
                      {task.title}
                    </h4>
                    {!task.completed && task.priority === 'High' && (
                      <AlertCircle size={16} className="text-red-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{task.caseName}</p>
                </div>

                <div className="hidden md:flex flex-col items-end gap-1.5 shrink-0">
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
                      task.priority === 'High' ? "bg-red-100 text-red-600" :
                      task.priority === 'Medium' ? "bg-amber-100 text-amber-600" :
                      "bg-blue-100 text-blue-600"
                    )}>
                      {task.priority}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                      <Clock size={14} className="text-slate-400" />
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredTasks.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-slate-200" size={32} />
                </div>
                <h4 className="font-bold text-slate-900">No tasks found</h4>
                <p className="text-sm text-slate-400 mt-1">All caught up or try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}