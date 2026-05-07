import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  Plus, 
  Search, 
  MoreVertical,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  ArrowUpRight,
  Filter,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatDate } from '../../lib/utils';
import { Associate, Task, TaskStatus } from '../../types';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ASSOCIATES: Associate[] = [
  { 
    id: '1', 
    name: 'James Wilson', 
    role: 'Junior Associate', 
    email: 'j.wilson@lexcase.com',
    phone: '(555) 010-1234',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f34e8fb3-70fc-4bcc-9ac1-2524b5b9795a/associate-1-6b6fbac6-1772037911591.webp', 
    taskCount: 12, 
    completedTasks: 8, 
    efficiency: 92, 
    load: 75,
    specialization: 'Corporate Law',
    status: 'Active',
    joined: '2023-01-15'
  },
  { 
    id: '2', 
    name: 'Elena Rodriguez', 
    role: 'Mid-level Associate', 
    email: 'e.rodriguez@lexcase.com',
    phone: '(555) 010-5678',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f34e8fb3-70fc-4bcc-9ac1-2524b5b9795a/associate-2-ff4f04a0-1772037911384.webp', 
    taskCount: 15, 
    completedTasks: 12, 
    efficiency: 95, 
    load: 85,
    specialization: 'Civil Litigation',
    status: 'Active',
    joined: '2023-03-20'
  },
  { 
    id: '3', 
    name: 'Marcus Chen', 
    role: 'Senior Associate', 
    email: 'm.chen@lexcase.com',
    phone: '(555) 010-9012',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f34e8fb3-70fc-4bcc-9ac1-2524b5b9795a/associate-3-2e5ec989-1772037911388.webp', 
    taskCount: 9, 
    completedTasks: 7, 
    efficiency: 88, 
    load: 60,
    specialization: 'Real Estate',
    status: 'Active',
    joined: '2022-11-05'
  },
];

const TASKS: Task[] = [
  { id: '1', title: 'Review Merger Agreement v2', caseName: 'Green Energy Merger', caseId: 'c1', dueDate: '2023-11-25', status: 'In Progress', priority: 'High', completed: false, assignedTo: 'James Wilson' },
  { id: '2', title: 'Draft Motion for Summary Judgment', caseName: 'Johnson v. TechCorp', caseId: 'c2', dueDate: '2023-11-26', status: 'Todo', priority: 'High', completed: false, assignedTo: 'Elena Rodriguez' },
  { id: '3', title: 'Title Search: 452 Oak Street', caseName: 'Property Dispute', caseId: 'c3', dueDate: '2023-11-24', status: 'Review', priority: 'Medium', completed: false, assignedTo: 'Marcus Chen' },
  { id: '4', title: 'Prepare Client Briefing', caseName: 'Estate of Smith', caseId: 'c4', dueDate: '2023-11-23', status: 'Completed', priority: 'Low', completed: true, assignedTo: 'James Wilson' },
];

export default function PartnerDashboard() {
  const [selectedAssociate, setSelectedAssociate] = useState<Associate | null>(null);
  const [isAssigningTask, setIsAssigningTask] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Partner Control Center</h1>
          <p className="text-slate-500 mt-1">Oversee associate workflows, task distribution, and performance metrics.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/employee/signin')}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-slate-50"
          >
            <ExternalLink size={18} />
            Staff Portal
          </button>
          <button 
            onClick={() => setIsAssigningTask(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-200"
          >
            <Plus size={18} />
            Assign New Task
          </button>
        </div>
      </header>

      {/* High-level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Overall Efficiency', value: '91.4%', trend: '+2.4%', icon: BarChart3, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Tasks', value: '36', sub: 'Across 8 associates', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Reviews', value: '12', sub: '4 Critical deadlines', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg)}>
                <stat.icon className={stat.color} size={24} />
              </div>
              {stat.trend && (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                  <ArrowUpRight size={14} />
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              {stat.sub && <span className="text-xs text-slate-400 font-medium">{stat.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Associate Performance Grid */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="text-indigo-600" size={22} />
              Team Performance
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs w-48" placeholder="Search associates..." />
              </div>
              <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <Filter size={18} className="text-slate-500" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ASSOCIATES.map((associate) => (
              <motion.div
                layoutId={associate.id}
                key={associate.id}
                onClick={() => setSelectedAssociate(associate)}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-3">
                    <img src={associate.avatar} alt={associate.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100" />
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{associate.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">{associate.role}</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
                      <span>Workload</span>
                      <span className={cn(
                        associate.load > 80 ? "text-red-600" : "text-indigo-600"
                      )}>{associate.load}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${associate.load}%` }}
                        className={cn(
                          "h-full rounded-full",
                          associate.load > 80 ? "bg-red-500" : "bg-indigo-50"
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Tasks</p>
                      <p className="text-lg font-bold text-slate-900">{associate.completedTasks}/{associate.taskCount}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-2xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Efficiency</p>
                      <p className="text-lg font-bold text-slate-900">{associate.efficiency}%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Task Monitoring Section */}
          <div className="space-y-4 mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Active Workflow Monitor</h3>
              <div className="flex gap-2">
                {['All', 'High Priority', 'Overdue'].map(f => (
                  <button key={f} className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Task & Case</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Associate</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Progress</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {TASKS.map(task => (
                      <tr key={task.id} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{task.title}</p>
                            <p className="text-[10px] text-slate-500 font-medium">{task.caseName}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                              <img src={ASSOCIATES.find(a => a.name === task.assignedTo)?.avatar} alt="" />
                            </div>
                            <span className="text-xs font-semibold text-slate-700">{task.assignedTo}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "w-2 h-2 rounded-full",
                              task.status === 'Completed' ? "bg-emerald-500" :
                              task.status === 'In Progress' ? "bg-indigo-500" :
                              task.status === 'Review' ? "bg-amber-500" : "bg-slate-300"
                            )} />
                            <span className="text-xs font-bold text-slate-700">{task.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className={cn(
                              task.priority === 'High' ? "text-red-500" : "text-slate-400"
                            )} />
                            <span className={cn(
                              "text-xs font-medium",
                              task.priority === 'High' ? "text-red-600 font-bold" : "text-slate-500"
                            )}>{formatDate(task.dueDate)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Sidebar / Quick Stats */}
        <div className="lg:col-span-4">
          <AnimatePresence mode="wait">
            {selectedAssociate ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sticky top-24"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4">
                    <img src={selectedAssociate.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover" />
                    <div>
                      <h3 className="text-xl font-bold">{selectedAssociate.name}</h3>
                      <p className="text-xs text-slate-500">{selectedAssociate.role}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedAssociate(null)} className="p-1 text-slate-400 hover:bg-slate-100 rounded-lg">
                    <Plus size={20} className="rotate-45" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <p className="text-[10px] font-bold text-indigo-400 uppercase">Current Capacity</p>
                      <p className="text-2xl font-black text-indigo-700">{100 - selectedAssociate.load}%</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase">Avg Finish</p>
                      <p className="text-2xl font-black text-emerald-700">4.2d</p>
                    </div>
                  </div>

                  <section>
                    <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                      <Briefcase size={16} />
                      Current Assignments
                    </h4>
                    <div className="space-y-3">
                      {TASKS.filter(t => t.assignedTo === selectedAssociate.name).map(t => (
                        <div key={t.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-slate-700">{t.title}</span>
                            <span className={cn(
                              "px-2 py-0.5 rounded text-[8px] font-black uppercase",
                              t.priority === 'High' ? "bg-red-100 text-red-700" : "bg-slate-200 text-slate-600"
                            )}>{t.priority}</span>
                          </div>
                          <p className="text-[10px] text-slate-500">{t.caseName}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm font-bold mb-4">Skill Assessment</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Drafting', 'Research', 'Litigation', 'Counseling'].map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  <button className="w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all">
                    View Full Performance Review
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Users className="text-slate-300" size={32} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Associate Insights</h4>
                  <p className="text-xs text-slate-500 max-w-[200px] mt-1">Select an associate to view detailed analytics and manage their workload.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Assignment Modal Placeholder */}
      <AnimatePresence>
        {isAssigningTask && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAssigningTask(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold">New Task Assignment</h3>
                  <button onClick={() => setIsAssigningTask(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                    <Plus size={24} className="rotate-45" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Task Title</label>
                    <input className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Legal Research on Case XYZ" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Associate</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                        {ASSOCIATES.map(a => <option key={a.id}>{a.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Priority</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Due Date</label>
                    <input type="date" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>

                  <button 
                    onClick={() => {
                      setIsAssigningTask(false);
                      toast.success('Task successfully assigned!');
                    }}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                  >
                    Confirm Assignment
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}