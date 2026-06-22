import { useEffect, useState } from 'react';
import slide1Img from '../../assets/onboarding/01_2.png';
import slide2Img from '../../assets/onboarding/02_(1).png';
import slide3Img from '../../assets/onboarding/03_2.png';
import { TTCareLogoIcon, TTCareWordmark, BrandGradientBg, LoadingDots } from '../../components/brand';

// ─── localStorage helpers ────────────────────────────────────────────────────
const ONBOARDING_KEY = 'ttcare_onboarding_done';

export function markOnboardingDone() {
  localStorage.setItem(ONBOARDING_KEY, '1');
}

export function hasSeenOnboarding(): boolean {
  return localStorage.getItem(ONBOARDING_KEY) !== null;
}

// ─── Screen 1 — Animated Splash ─────────────────────────────────────────────
function SplashScreen() {
  return (
    <BrandGradientBg className="items-center justify-center">
      {/* Logo container */}
      <div className="ob-logo-in flex flex-col items-center gap-5 relative z-10">
        <TTCareLogoIcon size={100} />
        <div className="flex flex-col items-center gap-1">
          <TTCareWordmark variant="on-gradient" />
          <span className="text-white/65 text-xs font-medium tracking-widest uppercase mt-1">
            Your pet's health. Our priority.
          </span>
        </div>
      </div>

      {/* Loader */}
      <div className="ob-fade-in absolute bottom-16 z-10" style={{ animationDelay: '0.9s' }}>
        <LoadingDots variant="on-gradient" />
      </div>
    </BrandGradientBg>
  );
}

// ─── Illustration 1 — Owner with dog and cat (warm cozy scene) ───────────────
function Illustration1() {
  return (
    <img
      src={slide1Img}
      alt="Person sitting with a golden dog and a grey cat"
      className="w-full h-full object-contain"
      draggable={false}
    />
  );
}

// ─── Illustration 2 — Health timeline / record cards ─────────────────────────
function Illustration2() {
  return (
    <img
      src={slide2Img}
      alt="Pet health timeline"
      style={{ width: '100%', maxWidth: 'none', height: 'auto', display: 'block' }}
      draggable={false}
    />
  );
}

// ─── Illustration 3 — AI robot with dog and cat ───────────────────────────────
function Illustration3() {
  return (
    <img
      src={slide3Img}
      alt="AI assistant with a golden dog and a grey cat"
      style={{ width: '100%', maxWidth: 'none', height: '100%', objectFit: 'contain', objectPosition: 'top center', display: 'block' }}
      draggable={false}
    />
  );
}

// ─── Slides configuration ────────────────────────────────────────────────────
const SLIDES = [
  {
    Illustration: Illustration1,
    accent: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21 C12 21 3 14 3 8 C3 5 5 3 7.5 3 C9 3 12 5.5 12 5.5 C12 5.5 15 3 16.5 3 C19 3 21 5 21 8 C21 14 12 21 12 21Z" fill="#FF8A80" />
      </svg>
    ),
    title: 'Every pet deserves\nthe best care',
    subtitle: 'Because they are more than pets.\nThey are family.',
  },
  {
    Illustration: Illustration2,
    accent: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="4" width="18" height="18" rx="4" stroke="#1A3A8F" strokeWidth="2" />
        <line x1="8" y1="2" x2="8" y2="6" stroke="#1A3A8F" strokeWidth="2" strokeLinecap="round" />
        <line x1="16" y1="2" x2="16" y2="6" stroke="#1A3A8F" strokeWidth="2" strokeLinecap="round" />
        <line x1="7" y1="13" x2="17" y2="13" stroke="#1A3A8F" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="7" y1="17" x2="13" y2="17" stroke="#1A3A8F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Keep every health\nmoment together',
    subtitle: 'Track diagnostics, therapies,\nvaccines and checkups in one place.',
  },
  {
    Illustration: Illustration3,
    accent: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21 C12 21 3 14 3 8 C3 5 5 3 7.5 3 C9 3 12 5.5 12 5.5 C12 5.5 15 3 16.5 3 C19 3 21 5 21 8 C21 14 12 21 12 21Z" fill="#3B82F6" />
      </svg>
    ),
    title: 'Care with\nconfidence',
    subtitle: 'AI-powered insights, reminders and guidance\nto help you make better decisions every day.',
  },
] as const;

// ─── Main component ───────────────────────────────────────────────────────────
interface Props {
  onComplete: () => void;
}

type Screen = 'splash' | 'slides';

export default function OnboardingPage({ onComplete }: Props) {
  const [screen, setScreen] = useState<Screen>('splash');
  const [slide, setSlide] = useState(0);
  const [visible, setVisible] = useState(true);

  // Auto-advance from splash
  useEffect(() => {
    if (screen !== 'splash') return;
    const t = setTimeout(() => {
      setScreen('slides');
    }, 2600);
    return () => clearTimeout(t);
  }, [screen]);

  function handleSkip() {
    markOnboardingDone();
    onComplete();
  }

  function handleNext() {
    if (slide < SLIDES.length - 1) {
      setVisible(false);
      setTimeout(() => {
        setSlide((s) => s + 1);
        setVisible(true);
      }, 220);
    }
  }

  function handleGetStarted() {
    markOnboardingDone();
    onComplete();
  }

  const isLast = slide === SLIDES.length - 1;
  const { Illustration, accent, title, subtitle } = SLIDES[slide];

  if (screen === 'splash') {
    return <SplashScreen />;
  }

  return (
    <div className="h-screen flex flex-col bg-white max-w-md mx-auto relative overflow-hidden select-none">
      {/* Skip */}
      <div className="flex justify-end px-6 pt-12 pb-0 relative z-10">
        <button
          onClick={handleSkip}
          className="text-slate-400 text-sm font-semibold px-2 py-1 hover:text-slate-600 active:text-slate-700 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          width: '100%',
          height: 'calc(100vh - 280px)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {slide === 0 ? (
          <img
            src={slide1Img}
            alt="Person sitting with a golden dog and a grey cat"
            style={{ width: '100%', maxWidth: 'none', height: '100%', objectFit: 'cover', objectPosition: 'center bottom', display: 'block' }}
            draggable={false}
          />
        ) : (
          <Illustration />
        )}
      </div>

      {/* Text block */}
      <div
        className="px-8 pb-2 text-center"
        style={{
          paddingTop: slide === 0 ? 8 : 16,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.28s ease 0.06s, transform 0.28s ease 0.06s',
        }}
      >
        {/* Accent icon */}
        <div className="flex justify-center mb-3">{accent}</div>

        <h1 className="text-[1.65rem] font-extrabold text-[#1A2E60] leading-tight mb-3 whitespace-pre-line">
          {title}
        </h1>
        <p className="text-slate-500 text-[0.95rem] leading-relaxed whitespace-pre-line">
          {subtitle}
        </p>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 py-5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i < slide) {
                setVisible(false);
                setTimeout(() => { setSlide(i); setVisible(true); }, 220);
              }
            }}
            className="focus:outline-none"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              style={{
                width: i === slide ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === slide ? '#2779F5' : '#D1D5DB',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </button>
        ))}
      </div>

      {/* CTA button */}
      <div className="px-6 pb-12">
        {isLast ? (
          <button
            onClick={handleGetStarted}
            className="w-full bg-[#2779F5] text-white font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#1a6ae0] active:bg-[#155dcc] active:scale-[0.98] transition-all shadow-lg"
            style={{ boxShadow: '0 8px 24px rgba(39,121,245,0.28)' }}
          >
            Get Started
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-[#2779F5] text-white font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#1a6ae0] active:bg-[#155dcc] active:scale-[0.98] transition-all shadow-lg"
            style={{ boxShadow: '0 8px 24px rgba(39,121,245,0.28)' }}
          >
            Next
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
