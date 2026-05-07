import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeAuth } from '../../context/EmployeeAuthContext';
import { Briefcase, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface EmployeeSignInFormProps {
  onSuccess?: () => void;
}

export function EmployeeSignInForm({ onSuccess }: EmployeeSignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useEmployeeAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Missing Credentials', { description: 'Please enter both email and password.' });
      return;
    }

    setIsSubmitting(true);
    // Simulate a brief delay for a better UX
    setTimeout(() => {
      login(email);
      setIsSubmitting(false);
      toast.success('Welcome back!', { description: `Logged in as ${email}` });
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/employee/dashboard');
      }
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Work Email</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-900 font-medium"
            placeholder="name@firm.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-widest ml-1">Security Password</label>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-900 font-medium"
            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group disabled:opacity-70"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            Access Dashboard
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}

export default function EmployeeSignIn() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="p-8 pb-4">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <Briefcase className="text-white" size={32} />
              </div>
            </div>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900">Employee Portal</h1>
              <p className="text-slate-500 mt-2">Sign in to access firm internal systems</p>
            </div>

            <EmployeeSignInForm />
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Not an employee? <button onClick={() => navigate('/signin')} className="text-indigo-600 font-bold hover:underline">Partner Login</button>
            </p>
          </div>
        </div>
        <p className="text-center mt-8 text-slate-400 text-xs font-medium">
          &copy; 2024 Kairos Law Firm \u2022 Internal Security v2.0
        </p>
      </div>
    </div>
  );
}