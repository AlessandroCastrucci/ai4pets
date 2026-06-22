import { useAuth } from '../../context/AuthContext';
import { TTCareLogoIcon, TTCareWordmark, BrandGradientBg, BrandButton } from '../../components/brand';

export default function WelcomePage() {
  const { navigateToAuth } = useAuth();

  return (
    <BrandGradientBg>
      {/* Hero section */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pt-16 pb-8 text-center relative z-10">
        <div className="ob-logo-in flex flex-col items-center gap-3 mb-6">
          <TTCareLogoIcon size={88} />
          <TTCareWordmark variant="on-gradient" />
        </div>

        <h1 className="text-3xl font-bold text-white leading-tight mb-3">
          Your AI Pet Health Manager
        </h1>

        <p className="text-white/75 text-base leading-relaxed max-w-xs">
          Manage health records, reminders and vet insights for all your pets in one place.
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-7">
          {['AI Diagnostics', 'Vaccine Tracking', 'Reminders', 'Nutrition'].map((f) => (
            <span
              key={f}
              className="bg-white/15 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div
        className="px-6 relative z-10 space-y-3"
        style={{ paddingBottom: 'max(48px, env(safe-area-inset-bottom))' }}
      >
        <BrandButton variant="primary-on-gradient" onClick={() => navigateToAuth('signup')}>
          Create Account
        </BrandButton>
        <BrandButton variant="secondary-on-gradient" onClick={() => navigateToAuth('login')}>
          Sign In
        </BrandButton>
      </div>
    </BrandGradientBg>
  );
}
