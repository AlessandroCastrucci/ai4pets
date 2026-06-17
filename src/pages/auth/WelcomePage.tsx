import { useAuth } from '../../context/AuthContext';

function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="32" cy="43" rx="15" ry="12" />
      <ellipse cx="14" cy="32" rx="7" ry="6" />
      <ellipse cx="25" cy="22" rx="7" ry="6" />
      <ellipse cx="39" cy="22" rx="7" ry="6" />
      <ellipse cx="50" cy="32" rx="7" ry="6" />
    </svg>
  );
}

export default function WelcomePage() {
  const { navigateToAuth } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-500 via-blue-600 to-blue-800 relative overflow-hidden">
      {/* Background decorative circles */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5" />
      <div className="absolute top-1/3 -left-20 w-56 h-56 rounded-full bg-white/5" />
      <div className="absolute -bottom-16 right-8 w-48 h-48 rounded-full bg-white/5" />

      {/* Hero section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8 text-center relative z-10">
        {/* Logo */}
        <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 shadow-lg">
          <PawIcon className="w-12 h-12 text-white" />
        </div>

        <span className="text-white/80 text-sm font-semibold tracking-widest uppercase mb-4">PetCare AI</span>

        <h1 className="text-3xl font-bold text-white leading-tight mb-4">
          Your AI Pet Health Manager
        </h1>

        <p className="text-white/75 text-base leading-relaxed max-w-xs">
          Manage the health, prevention and care of all your pets in one place.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {['AI Diagnostics', 'Vaccine Tracking', 'Nutrition', 'Reminders'].map((f) => (
            <span key={f} className="bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div className="px-6 pb-12 relative z-10 space-y-3" style={{ paddingBottom: 'max(48px, env(safe-area-inset-bottom))' }}>
        <button
          onClick={() => navigateToAuth('signup')}
          className="w-full bg-white text-blue-700 font-bold text-base py-4 rounded-2xl shadow-lg hover:bg-blue-50 active:scale-[0.98] transition-all"
        >
          Get Started
        </button>
        <button
          onClick={() => navigateToAuth('login')}
          className="w-full bg-white/15 text-white font-semibold text-base py-4 rounded-2xl border border-white/30 hover:bg-white/25 active:scale-[0.98] transition-all backdrop-blur-sm"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
