import React from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  FileText,
  Briefcase,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useEmployeeAuth } from '../../context/EmployeeAuthContext';

const RECENT_ANNOUNCEMENTS = [
  { id: '1', title: 'New Firm Policy on Remote Work', date: '2 hours ago', tag: 'Policy' },
  { id: '2', title: 'Happy Hour this Friday at the Lounge', date: '5 hours ago', tag: 'Social' },
  { id: '3', title: 'Update: Case Management Training', date: '1 day ago', tag: 'Training' },
];

export default function EmployeeDashboard() {
  const { employee } = useEmployeeAuth();

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Staff Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, {employee?.name}. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-xl flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-bold text-slate-700">Shifting Active</span>
            <span className="text-xs text-slate-400 font-medium">Started at 8:45 AM</span>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Weekly Hours', value: '32.5', sub: 'Target: 40h', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Assigned Tasks', value: '8', sub: '2 Due Today', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Docs', value: '4', sub: 'Requires Review', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Case Load', value: '12', sub: 'Active Support', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.bg)}>
              <stat.icon className={stat.color} size={20} />
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
              <span className="text-[10px] text-slate-500 font-medium">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: My Workflow */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Calendar className="text-indigo-600" size={20} />
                My Schedule Today
              </h2>
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View Calendar</button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { time: '10:00 AM', title: 'Team Sync - Litigation Group', location: 'Meeting Room A' },
                { time: '1:30 PM', title: 'Client Document Intake', location: 'Reception' },
                { time: '3:00 PM', title: 'Filing Deadline: Johnson Case', location: 'E-File Portal' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <span className="text-sm font-bold text-slate-400 w-16 pt-1">{item.time}</span>
                  <div className="flex-1 p-4 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-200 group-hover:bg-white transition-all">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={120} />
            </div>
            <div className="relative z-10">
              <span className="px-3 py-1 bg-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Growth Opportunity</span>
              <h3 className="text-2xl font-bold mt-4 mb-2">Advance Your Career</h3>
              <p className="text-slate-400 max-w-md">Our new 'Associate Path' program is now open for staff applications. Gain certification in legal operations.</p>
              <button className="mt-6 px-6 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-slate-100 transition-all">
                Learn More
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Feed & Resources */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-600" />
              Firm Feed
            </h3>
            <div className="space-y-6">
              {RECENT_ANNOUNCEMENTS.map((ann) => (
                <div key={ann.id} className="relative pl-4 border-l-2 border-slate-100 hover:border-indigo-600 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{ann.tag}</span>
                    <span className="text-[10px] text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{ann.title}</h4>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all">
              View All News
            </button>
          </div>

          <div className="bg-indigo-50 rounded-[2rem] border border-indigo-100 p-6">
            <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <Briefcase size={18} />
              Partner Connection
            </h3>
            <p className="text-xs text-indigo-700 leading-relaxed mb-6">
              Need to coordinate with a Managing Partner? Access the direct scheduling portal for internal briefings.
            </p>
            <button className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
              <ExternalLink size={14} />
              Open Partner Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}