import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, Shield, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import AuthLayout from './AuthLayout';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      toast.error('Missing Information', {
        description: 'Please fill in all required fields.'
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid Email', {
        description: 'Please enter a valid email address.'
      });
      return;
    }

    if (password.length < 6) {
      toast.error('Weak Password', {
        description: 'Password must be at least 6 characters long.'
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          }
        }
      });

      if (error) throw error;

      if (data.user && !data.session) {
        toast.success('Registration Initiated', {
          description: 'A confirmation link has been sent to your email. Please verify to log in.',
          icon: <AlertCircle className="text-amber-500" size={18} />,
          duration: 6000
        });
        navigate('/signin');
      } else {
        toast.success('Registration Successful', {
          description: 'Your professional account is ready. Welcome to the firm.'
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error('Registration Failed', {
        description: error.message || 'An error occurred during sign up.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Establish Profile" 
      subtitle="Join the Kairos Law Firm digital ecosystem."
    >
      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Professional Name</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <User size={18} />
            </div>
            <input 
              type="text"
              placeholder="e.g. Johnathan S. Doe, J.D."
              required
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-medium"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Work Email</label>
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

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Security Password</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <Lock size={18} />
            </div>
            <input 
              type="password"
              placeholder="Min. 6 characters"
              required
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 mb-2">
          <Shield className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs text-amber-800 leading-relaxed">
            Your credentials will be encrypted using 256-bit institutional grade protocols before transmission.
          </p>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-70 shadow-xl shadow-indigo-100 mt-4"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Register Professional Profile
              <ArrowRight size={18} />
            </>
          )}
        </button>

        <p className="text-center text-sm font-medium text-slate-500 mt-6">
          Already have an account?{' '}
          <Link 
            to="/signin"
            className="text-indigo-600 font-bold hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}