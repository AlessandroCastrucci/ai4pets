import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type AuthScreen = 'welcome' | 'login' | 'signup' | 'forgot-password';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  authScreen: AuthScreen;
  navigateToAuth: (screen: AuthScreen) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (name: string, email: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('welcome');

  const navigateToAuth = useCallback((screen: AuthScreen) => {
    setAuthScreen(screen);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (!email.includes('@') || password.length < 6) {
      throw new Error('Invalid email or password. Use any valid email and a password of at least 6 characters.');
    }
    await new Promise((r) => setTimeout(r, 900));
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    setUser({ name, email });
    setIsAuthenticated(true);
    setAuthScreen('welcome');
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    if (name.trim().length < 2) throw new Error('Please enter your full name.');
    if (!email.includes('@')) throw new Error('Please enter a valid email address.');
    if (password.length < 6) throw new Error('Password must be at least 6 characters.');
    await new Promise((r) => setTimeout(r, 900));
    setUser({ name: name.trim(), email });
    setIsAuthenticated(true);
    setAuthScreen('welcome');
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    setAuthScreen('welcome');
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    if (!email.includes('@')) throw new Error('Please enter a valid email address.');
    await new Promise((r) => setTimeout(r, 900));
  }, []);

  const updateUser = useCallback((name: string, email: string) => {
    setUser({ name: name.trim(), email: email.trim() });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, authScreen, navigateToAuth, login, signup, logout, resetPassword, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
