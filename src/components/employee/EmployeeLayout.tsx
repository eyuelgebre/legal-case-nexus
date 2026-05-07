import React, { useState } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, LogOut, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useEmployeeAuth } from '../../context/EmployeeAuthContext';
import EmployeeNav from './EmployeeNav';
import { toast } from 'sonner';

export default function EmployeeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { employee, isLoading, logout } = useEmployeeAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    toast.info('Session Ended', { description: 'Staff session closed successfully.' });
    navigate('/employee/signin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!employee) {
    return <Navigate to="/employee/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <EmployeeNav />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-500 lg:hidden hover:bg-slate-100 rounded-lg transition-all"
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search resources, docs, staff..."
                className="pl-12 pr-6 py-2.5 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl text-sm w-80 lg:w-[400px] transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all group">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 border-2 border-white rounded-full group-hover:scale-110 transition-transform"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2" />
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-2 text-slate-500 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-all font-bold text-xs"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Exit Portal</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-10 max-w-7xl mx-auto pb-20">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}