import React, { useState, useRef, useEffect } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate, 
  Outlet, 
  NavLink,
  useNavigate
} from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  Search, 
  Bell, 
  Menu, 
  Plus,
  Globe,
  ShieldCheck,
  Contact,
  LogOut,
  Loader2,
  Camera,
  Upload,
  User as UserIcon,
  Trash2
} from 'lucide-react';
import { cn } from './lib/utils';
import { Toaster, toast } from 'sonner';
import Dashboard from './components/Dashboard';
import CaseManagement from './components/CaseManagement';
import ClientManagement from './components/ClientManagement';
import StaffManagement from './components/StaffManagement';
import TaskManagement from './components/TaskManagement';
import LawyerPortal from './components/portal/LawyerPortal';
import PartnerDashboard from './components/partner/PartnerDashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "./components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { supabase } from './lib/supabase';
import NewCaseModal from './components/NewCaseModal';

// Employee Portal Components
import { EmployeeAuthProvider } from './context/EmployeeAuthContext';
import EmployeeSignIn from './components/auth/EmployeeSignIn';
import EmployeeLayout from './components/employee/EmployeeLayout';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import EmployeeCalendar from './components/employee/EmployeeCalendar';

const NAVIGATION = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Lawyer Portal', icon: Globe, path: '/portal' },
  { name: 'Partner Hub', icon: ShieldCheck, path: '/partner' },
  { name: 'Team Directory', icon: Users, path: '/staff' },
  { name: 'Cases', icon: Briefcase, path: '/cases' },
  { name: 'Clients', icon: Contact, path: '/clients' },
  { name: 'Tasks & Calendar', icon: Calendar, path: '/tasks' },
  { name: 'Documents', icon: FileText, path: '/documents' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

function CameraModal({ isOpen, onClose, onCapture }: { isOpen: boolean, onClose: () => void, onCapture: (img: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(s => {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => {
          toast.error("Camera access denied", { description: err.message });
          onClose();
        });
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
        onCapture(dataUrl);
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Take a Profile Photo</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-slate-700">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-semibold hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
          >
            Cancel
          </button>
          <button 
            onClick={capture} 
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 text-white shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            <Camera size={18} />
            Capture Photo
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UserProfileSection({ session, handleSignOut }: { session: any, handleSignOut: () => void }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateAvatar = async (input: string | File | null) => {
    if (!session?.user) return;
    
    setIsUploading(true);
    const loadingToast = toast.loading(input ? "Updating profile photo..." : "Removing profile photo...");
    
    try {
      const userId = session.user.id;
      let newAvatarUrl = null;

      if (input) {
        let fileBody: any = input;
        const fileName = `avatar-${Date.now()}.jpg`;
        const filePath = `${userId}/${fileName}`;

        if (typeof input === 'string') {
          const res = await fetch(input);
          fileBody = await res.blob();
        }

        // 1. Upload new file
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, fileBody, { 
            upsert: true,
            contentType: 'image/jpeg'
          });

        if (uploadError) throw uploadError;

        // 2. Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);
        
        newAvatarUrl = publicUrl;

        // 3. Clean up old files
        const { data: files } = await supabase.storage.from('avatars').list(userId);
        if (files && files.length > 0) {
          const filesToDelete = files
            .filter(f => f.name !== fileName)
            .map(f => `${userId}/${f.name}`);
          
          if (filesToDelete.length > 0) {
            await supabase.storage.from('avatars').remove(filesToDelete);
          }
        }
      } else {
        // Removal Logic
        const { data: files, error: listError } = await supabase.storage
          .from('avatars')
          .list(userId);
        
        if (listError) {
          console.error("Error listing files for removal:", listError);
        } else if (files && files.length > 0) {
          const filesToDelete = files.map(f => `${userId}/${f.name}`);
          const { error: removeError } = await supabase.storage
            .from('avatars')
            .remove(filesToDelete);
          
          if (removeError) {
            console.error("Error removing files from storage:", removeError);
          }
        }
        // Explicitly set to null
        newAvatarUrl = null;
      }

      // 4. Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: newAvatarUrl }
      });

      if (updateError) throw updateError;
      
      toast.dismiss(loadingToast);
      toast.success(newAvatarUrl ? "Profile photo updated" : "Profile photo removed successfully");
    } catch (error: any) {
      console.error("Avatar update error:", error);
      toast.dismiss(loadingToast);
      toast.error("Update failed", { description: error.message || "An unexpected error occurred" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", { description: "Please select an image smaller than 5MB" });
        return;
      }
      updateAvatar(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const avatarUrl = session.user.user_metadata?.avatar_url;

  return (
    <div className="p-4 mt-auto">
      <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  className="relative block group focus:outline-none"
                  disabled={isUploading}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-700 group-hover:ring-indigo-500 transition-all shadow-sm bg-slate-700 flex items-center justify-center">
                    {avatarUrl ? (
                      <img 
                        src={avatarUrl} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserIcon size={20} className="text-slate-400" />
                    )}
                  </div>
                  
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera size={14} className="text-white" />
                  </div>

                  {isUploading && (
                    <div className="absolute inset-0 bg-slate-900/60 rounded-full flex items-center justify-center">
                      <Loader2 size={14} className="text-indigo-400 animate-spin" />
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-slate-900 border-slate-800 text-slate-300 shadow-2xl">
                <DropdownMenuLabel className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Profile Photo</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="hover:bg-slate-800 focus:bg-slate-800 focus:text-white cursor-pointer gap-2 py-2.5">
                  <Upload size={16} />
                  Upload from Gallery
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsCameraOpen(true)} className="hover:bg-slate-800 focus:bg-slate-800 focus:text-white cursor-pointer gap-2 py-2.5">
                  <Camera size={16} />
                  Take Picture
                </DropdownMenuItem>
                {avatarUrl && (
                  <>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem 
                      onClick={() => updateAvatar(null)} 
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20 focus:bg-red-900/20 focus:text-red-300 cursor-pointer gap-2 py-2.5"
                    >
                      <Trash2 size={16} />
                      Remove Photo
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
          
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">
              {session.user.user_metadata?.full_name || session.user.email?.split('@')[0]}
            </p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Firm Member</p>
          </div>
        </div>

        <div className="mb-4 px-3 py-2 bg-slate-900/50 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Status: Online</span>
        </div>

        <button 
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-2 text-xs font-bold text-center py-2.5 border border-slate-700 rounded-xl hover:bg-slate-700 hover:text-white transition-all text-slate-300"
        >
          <LogOut size={14} />
          Sign Out
        </button>

        <CameraModal 
          isOpen={isCameraOpen} 
          onClose={() => setIsCameraOpen(false)} 
          onCapture={updateAvatar} 
        />
      </div>
    </div>
  );
}

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.info('Session Ended', { description: 'You have been signed out safely.' });
      navigate('/signin');
    } catch (error: any) {
      toast.error('Sign Out Failed', { description: error.message });
    }
  };

  if (!session) return null;

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
        <div className="h-full flex flex-col">
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Briefcase className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">Kairos Law Firm</h1>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.15em]">Case Management System</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
            {NAVIGATION.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "hover:bg-slate-800/50 hover:text-white"
                )}
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={20} className={cn(
                      "transition-colors",
                      isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                    )} />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <UserProfileSection session={session} handleSignOut={handleSignOut} />
        </div>
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
                placeholder="Search cases, clients, documents..."
                className="pl-12 pr-6 py-2.5 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl text-sm w-80 lg:w-[400px] transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all group">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full group-hover:scale-110 transition-transform"></span>
            </button>
            <button 
              onClick={() => setIsNewCaseModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Case</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-10 max-w-7xl mx-auto pb-20">
            <Outlet context={{ onNewCase: () => setIsNewCaseModalOpen(true) }} />
          </div>
        </div>
      </main>

      <NewCaseModal 
        isOpen={isNewCaseModalOpen} 
        onClose={() => setIsNewCaseModalOpen(false)} 
      />
    </div>
  );
}

function DocumentsPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-500 bg-white rounded-3xl border-2 border-dashed border-slate-100 p-12 text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <FileText size={40} className="text-slate-300" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Document Vault</h2>
      <p className="text-slate-500 max-w-sm">Secure, encrypted storage for all your legal documents and evidence files.</p>
      <button 
        onClick={() => toast.info('Vault activation requested')}
        className="mt-8 bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
      >
        Enable Document Storage
      </button>
    </div>
  );
}

function SettingsPlaceholder() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Firm Settings</h2>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            System Active
          </div>
        </div>
        <div className="space-y-8">
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Firm Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Firm Name</label>
                <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" defaultValue="Kairos Law Firm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Principal Attorney</label>
                <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" defaultValue="Sarah Lexington, J.D." />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">Mailing Address</label>
                <input className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" defaultValue="123 Justice Way, Suite 400, Capital City, ST 54321" />
              </div>
            </div>
          </section>

          <section className="pt-8 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {['Email notifications for case updates', 'Desktop alerts for upcoming deadlines', 'SMS reminders for client meetings'].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
                  <span className="text-sm font-medium text-slate-700">{pref}</span>
                  <div className="w-10 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <div className="pt-4">
            <button 
              onClick={() => toast.success('Settings updated successfully')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <EmployeeAuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" richColors />
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Employee Portal Routes */}
            <Route path="/employee/signin" element={<EmployeeSignIn />} />
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="calendar" element={<EmployeeCalendar />} />
              <Route path="timesheets" element={<div className="p-8 bg-white rounded-3xl border border-slate-200">Timesheets Placeholder</div>} />
              <Route path="docs" element={<div className="p-8 bg-white rounded-3xl border border-slate-200">Internal Docs Placeholder</div>} />
              <Route path="directory" element={<div className="p-8 bg-white rounded-3xl border border-slate-200">Staff Directory Placeholder</div>} />
              <Route path="support" element={<div className="p-8 bg-white rounded-3xl border border-slate-200">Support Placeholder</div>} />
              <Route index element={<Navigate to="/employee/dashboard" replace />} />
            </Route>

            {/* Protected Routes (Partners/Lawyers) */}
            <Route element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/portal" element={<LawyerPortal />} />
              <Route path="/partner" element={<PartnerDashboard />} />
              <Route path="/staff" element={<StaffManagement />} />
              <Route path="/cases" element={<CaseManagement />} />
              <Route path="/clients" element={<ClientManagement />} />
              <Route path="/tasks" element={<TaskManagement />} />
              <Route path="/documents" element={<DocumentsPlaceholder />} />
              <Route path="/settings" element={<SettingsPlaceholder />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </EmployeeAuthProvider>
    </AuthProvider>
  );
}