import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Circle, 
  AlertCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Globe,
  Timer,
  MapPin,
  ExternalLink,
  RefreshCw,
  LogOut,
  CalendarDays
} from 'lucide-react';
import { cn, formatDate, formatTime, WORLD_CITIES } from '../../lib/utils';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Task, GoogleCalendarEvent } from '../../types';
import { useEmployeeAuth } from '../../context/EmployeeAuthContext';
import { GoogleCalendarService } from '../../lib/google-calendar';

const STAFF_TASKS: Task[] = [
  { id: 's1', title: 'Process Case Filing: Miller vs. State', caseName: 'Miller Litigation', caseId: 'm1', dueDate: '2023-11-25', priority: 'High', completed: false, status: 'Todo' },
  { id: 's2', title: 'Update Client Billing Records', caseName: 'Internal Ops', caseId: 'i1', dueDate: '2023-11-24', priority: 'Medium', completed: true, status: 'Completed' },
  { id: 's3', title: 'Review Document Submission: Apex Corp', caseName: 'Apex Merger', caseId: 'a1', dueDate: '2023-11-26', priority: 'High', completed: false, status: 'Todo' },
  { id: 's4', title: 'Schedule Staff Meeting', caseName: 'Administration', caseId: 'adm1', dueDate: '2023-11-23', priority: 'Low', completed: false, status: 'Todo' },
];

function WorldClock({ name, zone, time }: { name: string, zone: string, time: Date }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl border border-slate-100">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{name}</span>
        <span className="text-xs font-medium text-slate-500">{zone.split('/')[1].replace('_', ' ')}</span>
      </div>
      <div className="text-sm font-mono font-bold text-indigo-600">
        {formatTime(time, zone)}
      </div>
    </div>
  );
}

export default function EmployeeCalendar() {
  const { isGoogleConnected, connectGoogle, disconnectGoogle } = useEmployeeAuth();
  const [tasks, setTasks] = useState(STAFF_TASKS);
  const [googleEvents, setGoogleEvents] = useState<GoogleCalendarEvent[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'google'>('all');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isGoogleConnected) {
      loadGoogleEvents();
    } else {
      setGoogleEvents([]);
    }
  }, [isGoogleConnected]);

  const loadGoogleEvents = async () => {
    setIsLoadingEvents(true);
    try {
      const events = await GoogleCalendarService.fetchEvents();
      setGoogleEvents(events);
    } catch (error) {
      toast.error('Failed to sync Google Calendar');
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed, status: !t.completed ? 'Completed' : 'Todo' } : t));
    const task = tasks.find(t => t.id === id);
    if (!task?.completed) toast.success('Task marked as complete!');
  };

  const handleConnectGoogle = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));
    toast.promise(promise, {
      loading: 'Connecting to Google Calendar...',
      success: () => {
        connectGoogle();
        return 'Google Calendar integrated successfully!';
      },
      error: 'Failed to connect'
    });
  };

  const handleDisconnectGoogle = () => {
    disconnectGoogle();
    toast.info('Google Calendar disconnected');
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    if (filter === 'google') return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header with Live Clock */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
             <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Unified Schedule</h1>
             <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-100">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                Live System
             </div>
          </div>
          <p className="text-slate-500">Manage internal assignments and Google Calendar appointments.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Timer size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Local Time</p>
              <p className="text-xl font-mono font-bold text-slate-900">{formatTime(currentTime)}</p>
            </div>
          </div>

          <button 
            onClick={() => toast.info('New assignment modal opened')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            <Plus size={18} />
            New Assignment
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Section */}
        <div className="lg:col-span-4 space-y-6">
          {/* Google Calendar Connection Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-hidden relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                  <CalendarDays size={18} />
                </div>
                <h3 className="font-bold text-slate-900">Google Calendar</h3>
              </div>
              {isGoogleConnected && (
                <button 
                  onClick={loadGoogleEvents}
                  disabled={isLoadingEvents}
                  className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors text-slate-400"
                >
                  <RefreshCw size={14} className={cn(isLoadingEvents && "animate-spin")} />
                </button>
              )}
            </div>

            {!isGoogleConnected ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sync your external appointments and meetings directly into your firm dashboard.
                </p>
                <button 
                  onClick={handleConnectGoogle}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700 rounded-2xl text-xs font-bold transition-all"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                  Connect Google Account
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    G
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-blue-900">Connected</p>
                    <p className="text-[10px] text-blue-700 truncate">your-email@gmail.com</p>
                  </div>
                  <button 
                    onClick={handleDisconnectGoogle}
                    className="p-1.5 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors"
                    title="Disconnect"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {googleEvents.length} Active Events
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                    Live Syncing
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Calendar Card */}
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
                const hasInternalTask = [24, 25, 26].includes(day);
                const hasGoogleTask = isGoogleConnected && [23, 24, 25].includes(day);
                
                return (
                  <div 
                    key={i} 
                    className={cn(
                      "h-10 flex flex-col items-center justify-center rounded-xl text-sm transition-all relative cursor-pointer group",
                      isToday ? "bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200" : "hover:bg-indigo-50",
                      (hasInternalTask || hasGoogleTask) && !isToday && "font-bold text-slate-900"
                    )}
                  >
                    {day}
                    <div className="absolute bottom-1.5 flex gap-0.5">
                      {hasInternalTask && !isToday && (
                        <span className="w-1 h-1 bg-indigo-400 rounded-full" />
                      )}
                      {hasGoogleTask && !isToday && (
                        <span className="w-1 h-1 bg-blue-400 rounded-full" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* World Clocks Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Globe size={18} />
              </div>
              <h3 className="font-bold text-slate-900">World Clocks</h3>
            </div>
            
            <div className="space-y-3">
              {WORLD_CITIES.map((city) => (
                <WorldClock 
                  key={city.zone} 
                  name={city.name} 
                  zone={city.zone} 
                  time={currentTime} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex bg-white p-1 rounded-xl border border-slate-200 w-fit">
              {(['all', 'pending', 'completed', 'google'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all",
                    filter === f ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  {f === 'google' ? 'External' : f}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Filter size={14} />
                Sort by Time
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <AnimatePresence mode="popLayout">
              {/* Google Events First (if applicable) */}
              {(filter === 'all' || filter === 'google') && isGoogleConnected && googleEvents.map((event, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: idx * 0.05 }}
                  key={event.id}
                  className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <CalendarDays size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 truncate">{event.summary}</h4>
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md border border-blue-100 uppercase tracking-tighter">
                        Google Cal
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <p className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Clock size={12} className="text-slate-300" />
                        {new Date(event.start.dateTime || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {' - '}
                        {new Date(event.end.dateTime || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {event.location && (
                        <p className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <MapPin size={12} className="text-slate-300" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <a 
                      href="https://calendar.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </motion.div>
              ))}

              {/* Internal Tasks */}
              {filteredTasks.map((task, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: idx * 0.02 }}
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
            </AnimatePresence>

            {filteredTasks.length === 0 && (!isGoogleConnected || googleEvents.length === 0 || filter === 'completed') && (
              <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-slate-200" size={32} />
                </div>
                <h4 className="font-bold text-slate-900">No assignments found</h4>
                <p className="text-sm text-slate-400 mt-1">All caught up! Great job.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}