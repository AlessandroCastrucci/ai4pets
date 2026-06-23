import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, Mail, Lock, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/icons/200x200bb-75.png';

export default function LoginPage() {
  const { login, navigateToAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: 'linear-gradient(165deg, #38BDF8 0%, #2563EB 45%, #1D4ED8 100%)' }}
    >
      {/* Decorative circles */}
      <div
        className="absolute pointer-events-none"
        style={{ width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: -100, right: -100 }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', top: 60, right: -40 }}
      />
      <div
        className="absolute pointer-events-none"
        style={{ width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', bottom: 180, left: -60 }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center px-6 relative z-10 pt-14 pb-8 overflow-y-auto">
        {/* Logo */}
        <img
          src={logoImg}
          alt="TTCARE VET"
          className="w-20 h-20 rounded-[18px] shadow-lg mb-5"
          draggable={false}
        />

        {/* Title */}
        <h1 className="text-white text-2xl font-light mb-1">Welcome to</h1>
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="text-white text-3xl font-extrabold tracking-wide">TTCARE</span>
          <span className="text-sky-200 text-2xl font-semibold tracking-wide">VET</span>
        </div>
        <p className="text-white/70 text-sm mb-7">Your AI Pet Health Manager</p>

        {/* Login card */}
        <div className="w-full bg-white rounded-3xl shadow-2xl p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-800 block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-gray-800">Password</label>
                <button
                  type="button"
                  onClick={() => navigateToAuth('forgot-password')}
                  className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={1.8} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-11 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}
                </button>
              </div>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2563EB] text-white font-bold text-base py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#1d4ed8] active:bg-[#1e40af] active:scale-[0.98] transition-all disabled:opacity-60 shadow-md"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" strokeWidth={2.5} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-xs italic">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social login buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full bg-white border border-gray-200 rounded-xl py-3.5 flex items-center justify-center gap-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button
              type="button"
              className="w-full bg-white border border-gray-200 rounded-xl py-3.5 flex items-center justify-center gap-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>
          </div>

          {/* Sign up link */}
          <div className="text-center pt-1">
            <p className="text-gray-500 text-sm">Don't have an account?</p>
            <button
              onClick={() => navigateToAuth('signup')}
              className="text-[#2563EB] font-bold text-sm mt-1 hover:opacity-80 transition-opacity"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
