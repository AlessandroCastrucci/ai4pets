import { useState, type FormEvent } from 'react';
import { ChevronLeft, Loader, CheckCircle, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPasswordPage() {
  const { resetPassword, navigateToAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-50 via-blue-50 to-slate-100">
      {/* Back button */}
      <div className="px-4 pt-4" style={{ paddingTop: 'max(16px, env(safe-area-inset-top))' }}>
        <button
          onClick={() => navigateToAuth('login')}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-700 transition-colors py-2"
        >
          <ChevronLeft size={18} strokeWidth={2} />
          <span className="text-sm font-medium">Back to Sign In</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-5 py-6">
        {!sent ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mb-4">
                <Mail size={26} className="text-sky-500" strokeWidth={1.8} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">Reset password</h1>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-card-md p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-500 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-sky-600 active:bg-sky-700 disabled:opacity-60 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader size={16} className="animate-spin" strokeWidth={2.5} />
                      Sending…
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            </div>
          </>
        ) : (
          /* Success state */
          <div className="text-center px-4">
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-emerald-500" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Check your email</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              If an account exists for <strong className="text-slate-700">{email}</strong>, a password reset link has been sent.
            </p>
            <button
              onClick={() => navigateToAuth('login')}
              className="w-full bg-sky-500 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-sky-600 active:bg-sky-700 transition-all"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
