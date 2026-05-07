import React from 'react';
import { 
  Users, 
  Briefcase, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  AlertCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, formatDate } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const STATS = [
  { label: 'Total Cases', value: '124', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Clients', value: '86', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Pending Tasks', value: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Monthly Revenue', value: '$42.5k', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const RECENT_CASES = [
  { id: '1', title: 'Johnson v. TechCorp', client: 'Alice Johnson', status: 'Active', type: 'Civil Litigation', lastUpdate: '2023-11-20' },
  { id: '2', title: 'Estate of Robert Smith', client: 'Michael Smith', status: 'Pending', type: 'Probate', lastUpdate: '2023-11-21' },
  { id: '3', title: 'Green Energy Merger', client: 'Solaris Inc.', status: 'On Hold', type: 'Corporate', lastUpdate: '2023-11-18' },
  { id: '4', title: 'Property Dispute: Main St', client: 'David Wilson', status: 'Active', type: 'Real Estate', lastUpdate: '2023-11-22' },
];

const UPCOMING_DEADLINES = [
  { id: '1', task: 'Court Hearing: Johnson v. TechCorp', date: '2023-11-25', priority: 'High' },
  { id: '2', task: 'Review Merger Documents', date: '2023-11-26', priority: 'Medium' },
  { id: '3', task: 'Client Consultation: Smith Estate', date: '2023-11-28', priority: 'Low' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back, {displayName}</h2>
        <p className="text-slate-500">Here's what's happening in your firm today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {STATS.map((stat, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Cases Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent Cases</h3>
            <button 
              onClick={() => navigate('/cases')}
              className="text-indigo-600 text-sm font-semibold flex items-center hover:underline"
            >
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Case Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Type</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Last Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RECENT_CASES.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.client}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{item.type}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-semibold",
                          item.status === 'Active' ? "bg-emerald-100 text-emerald-700" :
                          item.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                          "bg-slate-100 text-slate-700"
                        )}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{formatDate(item.lastUpdate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Deadlines Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Upcoming Deadlines</h3>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
            {UPCOMING_DEADLINES.map((deadline) => (
              <div key={deadline.id} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                <div className={cn(
                  "w-1 h-12 rounded-full",
                  deadline.priority === 'High' ? "bg-red-500" :
                  deadline.priority === 'Medium' ? "bg-amber-500" : "bg-blue-500"
                )} />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold group-hover:text-indigo-600 transition-colors">{deadline.task}</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Clock size={12} /> {formatDate(deadline.date)}
                  </p>
                </div>
                {deadline.priority === 'High' && (
                  <AlertCircle size={16} className="text-red-500 mt-1" />
                )}
              </div>
            ))}
            <button className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-medium hover:border-indigo-300 hover:text-indigo-500 transition-all">
              + Add Deadline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}