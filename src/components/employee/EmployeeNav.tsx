import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  Users, 
  MessageSquare, 
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useEmployeeAuth } from '../../context/EmployeeAuthContext';

const EMPLOYEE_NAV = [
  { name: 'Employee Hub', icon: LayoutDashboard, path: '/employee/dashboard' },
  { name: 'My Schedule', icon: Calendar, path: '/employee/calendar' },
  { name: 'My Timesheets', icon: Clock, path: '/employee/timesheets' },
  { name: 'Internal Docs', icon: FileText, path: '/employee/docs' },
  { name: 'Firm Directory', icon: Users, path: '/employee/directory' },
  { name: 'Support Tickets', icon: HelpCircle, path: '/employee/support' },
];

export default function EmployeeNav() {
  const { employee, logout } = useEmployeeAuth();

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-300">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <div className="w-5 h-5 border-2 border-white rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">Kairos Staff</h1>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.15em]">Internal Resource Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
        {EMPLOYEE_NAV.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all group",
              isActive 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                : "hover:bg-slate-800/50 hover:text-white"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className="transition-colors" />
              {item.name}
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-5 bg-slate-800/40 rounded-2xl border border-slate-700/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-700 bg-slate-700">
              <img src={employee?.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{employee?.name}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{employee?.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 border border-slate-700 rounded-xl hover:bg-slate-700 hover:text-white transition-all text-slate-400"
          >
            <LogOut size={14} />
            Secure Logout
          </button>
        </div>
      </div>
    </div>
  );
}