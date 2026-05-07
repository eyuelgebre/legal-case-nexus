import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MoreVertical, 
  Search, 
  UserPlus, 
  ExternalLink,
  MessageSquare,
  Shield,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle2,
  X,
  Filter
} from 'lucide-react';
import { cn, formatDate } from '../lib/utils';
import { toast } from 'sonner';
import { Associate } from '../types';

const MOCK_STAFF: Associate[] = [
  { 
    id: '1', 
    name: 'James Wilson', 
    role: 'Senior Associate', 
    email: 'j.wilson@lexcase.com', 
    phone: '(555) 010-1234', 
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f34e8fb3-70fc-4bcc-9ac1-2524b5b9795a/male-associate-1-ec040241-1772038437641.webp',
    taskCount: 12,
    completedTasks: 85,
    efficiency: 94,
    load: 75,
    specialization: 'Corporate Law',
    status: 'Active',
    joined: '2021-03-15'
  },
  { 
    id: '2', 
    name: 'Elena Rodriguez', 
    role: 'Junior Associate', 
    email: 'e.rodriguez@lexcase.com', 
    phone: '(555) 010-5678', 
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f34e8fb3-70fc-4bcc-9ac1-2524b5b9795a/female-associate-1-719a1dc1-1772038438061.webp',
    taskCount: 18,
    completedTasks: 42,
    efficiency: 88,
    load: 90,
    specialization: 'Family Law',
    status: 'Active',
    joined: '2022-06-20'
  },
  { 
    id: '3', 
    name: 'Marcus Chen', 
    role: 'Senior Paralegal', 
    email: 'm.chen@lexcase.com', 
    phone: '(555) 010-9012', 
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f34e8fb3-70fc-4bcc-9ac1-2524b5b9795a/male-paralegal-1-853baacd-1772038437093.webp',
    taskCount: 25,
    completedTasks: 156,
    efficiency: 97,
    load: 65,
    specialization: 'Litigation Support',
    status: 'Active',
    joined: '2019-11-05'
  },
  { 
    id: '4', 
    name: 'Sarah Miller', 
    role: 'Legal Assistant', 
    email: 's.miller@lexcase.com', 
    phone: '(555) 010-3456', 
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f34e8fb3-70fc-4bcc-9ac1-2524b5b9795a/female-paralegal-1-df8ffc89-1772038437314.webp',
    taskCount: 8,
    completedTasks: 64,
    efficiency: 91,
    load: 40,
    specialization: 'Admin',
    status: 'Active',
    joined: '2023-01-12'
  }
];

export default function StaffManagement() {
  const [staff, setStaff] = useState<Associate[]>(MOCK_STAFF);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Junior Associate',
    specialization: 'General Practice',
    phone: ''
  });

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStaff: Associate = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      role: formData.role,
      email: formData.email,
      phone: formData.phone,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
      taskCount: 0,
      completedTasks: 0,
      efficiency: 0,
      load: 0,
      specialization: formData.specialization,
      status: 'Active',
      joined: new Date().toISOString().split('T')[0]
    };

    setStaff([newStaff, ...staff]);
    setIsAddingStaff(false);
    setFormData({ name: '', email: '', role: 'Junior Associate', specialization: 'General Practice', phone: '' });
    toast.success(`${formData.name} added to the team!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Team Directory</h2>
          <p className="text-slate-500">Manage your firm's associates, paralegals, and support staff.</p>
        </div>
        <button 
          onClick={() => setIsAddingStaff(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          <UserPlus size={18} />
          Add New Member
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Staff', value: staff.length, icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Efficiency', value: '92%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Cases', value: '34', icon: Shield, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Team Load', value: '68%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={cn("p-3 rounded-xl", stat.bg)}>
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name, role, or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl text-sm transition-all outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <Filter size={18} />
              Filter
            </button>
            <select className="bg-slate-50 border-transparent text-sm font-semibold rounded-xl px-4 py-2 focus:bg-white focus:border-indigo-500 transition-all outline-none">
              <option>All Departments</option>
              <option>Legal</option>
              <option>Admin</option>
              <option>Management</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Member</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Role & Specialty</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Efficiency</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Current Load</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.map((member) => (
                <tr key={member.id} className="group hover:bg-slate-50/80 transition-all">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{member.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Mail size={12} className="text-slate-400" />
                          <p className="text-xs text-slate-500">{member.email}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-700">{member.role}</p>
                    <p className="text-xs text-slate-500">{member.specialization}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 h-2 rounded-full min-w-[100px] overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-1000",
                            member.efficiency > 90 ? "bg-emerald-500" : member.efficiency > 70 ? "bg-indigo-500" : "bg-amber-500"
                          )}
                          style={{ width: `${member.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{member.efficiency}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>{member.taskCount} ACTIVE TASKS</span>
                        <span>{member.load}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all",
                            member.load > 85 ? "bg-red-500" : "bg-indigo-500"
                          )}
                          style={{ width: `${member.load}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => toast.info(`Contacting ${member.name}`)}
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                      >
                        <MessageSquare size={18} />
                      </button>
                      <button 
                         onClick={() => toast.info(`Viewing ${member.name}'s profile`)}
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                      >
                        <ExternalLink size={18} />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-xl transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStaff.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <UserPlus size={48} className="mb-4 opacity-20" />
              <p className="font-medium">No team members found matching your search</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Staff Modal Overlay */}
      {isAddingStaff && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-100">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Add Team Member</h3>
                <p className="text-slate-500 text-sm">Register a new associate or staff member.</p>
              </div>
              <button 
                onClick={() => setIsAddingStaff(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Full Name</label>
                  <input 
                    required
                    type="text"
                    placeholder="e.g. Jonathan Harker"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <input 
                      required
                      type="email"
                      placeholder="j.harker@lexcase.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      placeholder="(555) 000-0000"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Role</label>
                    <select 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option>Senior Associate</option>
                      <option>Junior Associate</option>
                      <option>Senior Paralegal</option>
                      <option>Junior Paralegal</option>
                      <option>Legal Assistant</option>
                      <option>Admin Staff</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Specialization</label>
                    <select 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none"
                      value={formData.specialization}
                      onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                    >
                      <option>Corporate Law</option>
                      <option>Family Law</option>
                      <option>Criminal Defense</option>
                      <option>Litigation</option>
                      <option>Real Estate</option>
                      <option>Admin</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsAddingStaff(false)}
                  className="flex-1 px-6 py-4 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={18} />
                  Confirm Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}