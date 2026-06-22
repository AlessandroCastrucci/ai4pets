import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type AuthScreen = 'welcome' | 'login' | 'signup' | 'forgot-password';

interface User {
  name: string;
  email: string;
}

interface StoredSession {
  name: string;
  email: string;
  isAuthenticated: boolean;
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

const STORAGE_KEY = 'ttcare_auth_user';

function loadSession(): { user: User; isAuthenticated: true } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: StoredSession = JSON.parse(raw);
    if (parsed.isAuthenticated && parsed.name && parsed.email) {
      return { user: { name: parsed.name, email: parsed.email }, isAuthenticated: true };
    }
  } catch {
    // corrupted entry — ignore
  }
  return null;
}

function saveSession(name: string, email: string) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email, isAuthenticated: true }));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const restored = loadSession();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(restored?.isAuthenticated ?? false);
  const [user, setUser] = useState<User | null>(restored?.user ?? null);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');

  const navigateToAuth = useCallback((screen: AuthScreen) => {
    setAuthScreen(screen);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (!email.includes('@') || password.length < 6) {
      throw new Error('Invalid email or password. Use any valid email and a password of at least 6 characters.');
    }
    await new Promise((r) => setTimeout(r, 900));
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    saveSession(name, email);
    setUser({ name, email });
    setIsAuthenticated(true);
    setAuthScreen('login');
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    if (name.trim().length < 2) throw new Error('Please enter your full name.');
    if (!email.includes('@')) throw new Error('Please enter a valid email address.');
    if (password.length < 6) throw new Error('Password must be at least 6 characters.');
    await new Promise((r) => setTimeout(r, 900));
    const trimmedName = name.trim();
    saveSession(trimmedName, email);
    setUser({ name: trimmedName, email });
    setIsAuthenticated(true);
    setAuthScreen('login');
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setIsAuthenticated(false);
    setUser(null);
    setAuthScreen('login');
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    if (!email.includes('@')) throw new Error('Please enter a valid email address.');
    await new Promise((r) => setTimeout(r, 900));
  }, []);

  const updateUser = useCallback((name: string, email: string) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    saveSession(trimmedName, trimmedEmail);
    setUser({ name: trimmedName, email: trimmedEmail });
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
