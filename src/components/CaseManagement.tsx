import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight, 
  Calendar,
  User,
  Shield,
  FileText
} from 'lucide-react';
import { cn, formatDate } from '../lib/utils';
import { toast } from 'sonner';
import { useOutletContext } from 'react-router-dom';

const MOCK_CASES = [
  { id: 'C-001', title: 'Estate Planning: Harrison', client: 'Robert Harrison', type: 'Wills & Estates', status: 'Active', priority: 'Medium', assigned: 'S. Lexington', date: '2023-10-15' },
  { id: 'C-002', title: 'TechCorp v. Startup Inc', client: 'TechCorp', type: 'Intellectual Property', status: 'Active', priority: 'High', assigned: 'M. Chen', date: '2023-11-02' },
  { id: 'C-003', title: 'Divorce: Miller vs Miller', client: 'Jane Miller', type: 'Family Law', status: 'Pending', priority: 'High', assigned: 'S. Lexington', date: '2023-11-10' },
  { id: 'C-004', title: 'Real Estate: 452 Oak St', client: 'Mark Stevenson', type: 'Property Law', status: 'Closed', priority: 'Low', assigned: 'J. Doe', date: '2023-09-20' },
  { id: 'C-005', title: 'Personal Injury: Highway 1', client: 'Sarah Connor', type: 'Tort Law', status: 'Active', priority: 'Medium', assigned: 'M. Chen', date: '2023-10-25' },
  { id: 'C-006', title: 'Corporate Restructuring', client: 'Global Logistics', type: 'Corporate', status: 'On Hold', priority: 'Medium', assigned: 'S. Lexington', date: '2023-08-12' },
];

interface CaseOutletContext {
  onNewCase: () => void;
}

export default function CaseManagement() {
  const [filter, setFilter] = useState('All');
  const { onNewCase } = useOutletContext<CaseOutletContext>();

  const filteredCases = filter === 'All' 
    ? MOCK_CASES 
    : MOCK_CASES.filter(c => c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Case Management</h2>
          <p className="text-slate-500">Track and manage all legal matters.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
            <FileText size={18} />
            Export
          </button>
          <button 
            onClick={onNewCase}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm shadow-indigo-100"
          >
            <Plus size={18} />
            New Case
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
          {['All', 'Active', 'Pending', 'On Hold', 'Closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                filter === status 
                  ? "bg-white text-indigo-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              {status}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search by case ID or title..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-lg text-sm transition-all"
          />
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCases.map((item) => (
          <div 
            key={item.id} 
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all overflow-hidden flex flex-col"
          >
            <div className="p-5 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.id}</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide",
                  item.priority === 'High' ? "bg-red-50 text-red-600" :
                  item.priority === 'Medium' ? "bg-amber-50 text-amber-600" :
                  "bg-blue-50 text-blue-600"
                )}>
                  {item.priority}
                </span>
              </div>
              
              <h4 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">
                {item.title}
              </h4>
              <p className="text-sm text-slate-500 mb-6">{item.type}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <User size={16} className="text-slate-400" />
                  <span className="font-medium">{item.client}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Shield size={16} className="text-slate-400" />
                  <span>Assigned to <span className="font-medium text-slate-800">{item.assigned}</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Calendar size={16} className="text-slate-400" />
                  <span>Opened on {formatDate(item.date)}</span>
                </div>
              </div>
            </div>

            <div className="px-5 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold",
                item.status === 'Active' ? "bg-emerald-100 text-emerald-700" :
                item.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                item.status === 'On Hold' ? "bg-slate-200 text-slate-600" :
                "bg-slate-100 text-slate-400"
              )}>
                {item.status}
              </span>
              <button 
                onClick={() => toast.info(`Viewing details for ${item.id}`)}
                className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all"
              >
                Case Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <Search size={48} className="text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900">No cases found</h3>
          <p className="text-slate-500">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}