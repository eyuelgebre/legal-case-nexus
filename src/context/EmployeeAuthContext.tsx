import React, { createContext, useContext, useState, useEffect } from 'react';

interface EmployeeUser {
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface EmployeeAuthContextType {
  employee: EmployeeUser | null;
  isLoading: boolean;
  isGoogleConnected: boolean;
  login: (email: string) => void;
  logout: () => void;
  connectGoogle: () => void;
  disconnectGoogle: () => void;
}

const EmployeeAuthContext = createContext<EmployeeAuthContextType | undefined>(undefined);

export function EmployeeAuthProvider({ children }: { children: React.ReactNode }) {
  const [employee, setEmployee] = useState<EmployeeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('employee_session');
    if (stored) {
      setEmployee(JSON.parse(stored));
    }
    const googleConnected = localStorage.getItem('employee_google_connected') === 'true';
    setIsGoogleConnected(googleConnected);
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    const user: EmployeeUser = {
      email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      role: 'Staff Member',
      avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f34e8fb3-70fc-4bcc-9ac1-2524b5b9795a/employee-avatar-1-b8b7f9ee-1778077733249.webp'
    };
    setEmployee(user);
    localStorage.setItem('employee_session', JSON.stringify(user));
  };

  const logout = () => {
    setEmployee(null);
    localStorage.removeItem('employee_session');
    localStorage.removeItem('employee_google_connected');
    setIsGoogleConnected(false);
  };

  const connectGoogle = () => {
    // In a real app, this would trigger OAuth redirect or popup
    setIsGoogleConnected(true);
    localStorage.setItem('employee_google_connected', 'true');
  };

  const disconnectGoogle = () => {
    setIsGoogleConnected(false);
    localStorage.setItem('employee_google_connected', 'false');
  };

  return (
    <EmployeeAuthContext.Provider value={{ 
      employee, 
      isLoading, 
      isGoogleConnected, 
      login, 
      logout, 
      connectGoogle, 
      disconnectGoogle 
    }}>
      {children}
    </EmployeeAuthContext.Provider>
  );
}

export function useEmployeeAuth() {
  const context = useContext(EmployeeAuthContext);
  if (context === undefined) {
    throw new Error('useEmployeeAuth must be used within an EmployeeAuthProvider');
  }
  return context;
}