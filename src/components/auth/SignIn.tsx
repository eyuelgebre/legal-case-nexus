import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, AlertCircle, Shield, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import AuthLayout from './AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { EmployeeSignInForm } from './EmployeeSignIn';

export function PartnerSignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Missing Credentials', {
        description: 'Please enter both your email and password.'
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid Email', {
        description: 'Please enter a valid email address.'
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          toast.error('Email Not Confirmed', {
            description: 'Please check your inbox and confirm your email before logging in.',
            icon: <AlertCircle className="text-amber-500" size={18} />
          });
          return;
        }
        throw error;
      }

      toast.success('Welcome Back', {
        description: 'Successfully authenticated with the firm system.'
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast.error('Authentication Failed', {
        description: error.message || 'Please check your credentials and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Work Email</label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Mail size={18} />
          </div>
          <input 
            type="email"
            placeholder="name@example.com"
            required
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center ml-1">
          <label className="text-sm font-bold text-slate-700">Security Password</label>
          <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">Forgot?</button>
        </div>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <Lock size={18} />
          </div>
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            required
            className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-all"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-70 shadow-xl shadow-slate-200"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            Authorize Access
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <p className="text-center text-sm font-medium text-slate-500 mt-8">
        Not registered with the firm yet?{' '}
        <Link 
          to="/signup"
          className="text-indigo-600 font-bold hover:underline"
        >
          Create Account
        </Link>
      </p>
    </form>
  );
}

export default function SignIn() {
  return (
    <AuthLayout 
      title="Secure Access" 
      subtitle="Log in to your Kairos Law professional account."
    >
      <Tabs defaultValue="partner" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100/80 p-1 rounded-2xl h-12">
          <TabsTrigger 
            value="partner" 
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all font-bold gap-2"
          >
            <Shield size={16} />
            Partner
          </TabsTrigger>
          <TabsTrigger 
            value="employee" 
            className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm transition-all font-bold gap-2"
          >
            <Users size={16} />
            Employee
          </TabsTrigger>
        </TabsList>

        <TabsContent value="partner" className="mt-0 focus-visible:ring-0">
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
              <p className="text-xs text-indigo-700 font-medium leading-relaxed">
                <strong>Managing Partner Access:</strong> Use your official firm credentials to manage high-level operations and case strategy.
              </p>
            </div>
            <PartnerSignInForm />
          </div>
        </TabsContent>

        <TabsContent value="employee" className="mt-0 focus-visible:ring-0">
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                <strong>Internal Staff Portal:</strong> Sign in with your assigned work email to access timesheets and internal documents.
              </p>
            </div>
            <EmployeeSignInForm />
          </div>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
}