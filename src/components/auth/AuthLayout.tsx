import React from 'react';
import { Briefcase } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-sans">
      {/* Left Side - Design */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/f34e8fb3-70fc-4bcc-9ac1-2524b5b9795a/auth-background-6f86a18d-1777562324416.webp" 
          alt="Office" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <Briefcase className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Kairos Law Firm</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Case Management System</p>
            </div>
          </div>

          <div className="max-w-md">
            <h3 className="text-4xl font-bold text-white mb-6 leading-tight">
              Precision Intelligence for Modern Legal Practice.
            </h3>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Streamline your workflow, manage client relations, and track cases with institutional-grade security.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400 font-medium">
                Joined by <span className="text-indigo-400 font-bold">50+ Senior Partners</span> this week
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-widest">
            <span>\u00a9 2025 Kairos Law Firm</span>
            <span>v2.4.0 Active</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 bg-white relative">
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <Briefcase className="text-indigo-600" size={24} />
          <span className="font-bold text-slate-900">Kairos Law</span>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">{title}</h1>
            <p className="text-slate-500 font-medium leading-relaxed">{subtitle}</p>
          </div>

          {children}

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
             <p className="text-xs text-slate-400 text-center leading-relaxed">
              By continuing, you agree to Kairos Law Firm's <br />
              <span className="text-indigo-600 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-indigo-600 cursor-pointer hover:underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}