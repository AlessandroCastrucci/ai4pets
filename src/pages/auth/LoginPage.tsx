import { useState, type FormEvent } from 'react';
import { Eye, EyeOff, ChevronLeft, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { TTCareLogoIcon, TTCareWordmark, BrandLightBg, BrandButton } from '../../components/brand';

const inputClass =
  'w-full bg-[#F5F9FF] border border-[#D8E3F0] rounded-2xl px-4 py-3 text-sm text-[#172033] placeholder:text-[#6B7A90] outline-none focus:border-[#2F8CFF] focus:ring-2 focus:ring-[#2F8CFF]/15 transition-all';

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
    <BrandLightBg>
      {/* Back button */}
      <div className="px-4" style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}>
        <button
          onClick={() => navigateToAuth('welcome')}
          className="flex items-center gap-1 text-[#2F8CFF] hover:opacity-80 transition-opacity py-2"
        >
          <ChevronLeft size={18} strokeWidth={2} />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-6">
        {/* Logo header */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <TTCareLogoIcon size={64} />
          <TTCareWordmark variant="on-light" />
        </div>

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#172033]">Welcome back</h1>
          <p className="text-[#6B7A90] text-sm mt-1">Sign in to your TTCARE vet account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-card-md p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#6B7A90] block mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#6B7A90]">Password</label>
                <button
                  type="button"
                  onClick={() => navigateToAuth('forgot-password')}
                  className="text-xs text-[#2F8CFF] font-medium hover:opacity-80"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  autoComplete="current-password"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7A90] hover:text-[#172033] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={1.8} /> : <Eye size={18} strokeWidth={1.8} />}
                </button>
              </div>
            </div>

            <BrandButton
              type="submit"
              variant="primary-on-light"
              loading={loading}
              className="mt-2"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" strokeWidth={2.5} />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </BrandButton>
          </form>
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-[#6B7A90] mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigateToAuth('signup')}
            className="text-[#2F8CFF] font-semibold hover:opacity-80"
          >
            Create one
          </button>
        </p>
      </div>
    </BrandLightBg>
  );
}
