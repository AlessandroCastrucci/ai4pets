import { useEffect, useState } from 'react';
import slide1Img from '../../assets/onboarding/01_cura_pet_family.png';
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
    <svg viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Background */}
      <rect width="360" height="300" fill="#F0F6FF" rx="24" />

      {/* Decorative leaf left */}
      <ellipse cx="38" cy="180" rx="14" ry="24" fill="#A8D8A8" transform="rotate(-20 38 180)" opacity="0.7" />
      <ellipse cx="26" cy="200" rx="11" ry="20" fill="#88C888" transform="rotate(-35 26 200)" opacity="0.5" />
      {/* Decorative leaf right */}
      <ellipse cx="322" cy="170" rx="14" ry="24" fill="#A8D8A8" transform="rotate(20 322 170)" opacity="0.7" />
      <ellipse cx="334" cy="190" rx="11" ry="20" fill="#88C888" transform="rotate(35 334 190)" opacity="0.5" />

      {/* Phone frame */}
      <rect x="86" y="20" width="188" height="268" rx="26" fill="white" stroke="#D8E4F8" strokeWidth="2.5" />
      {/* Phone notch */}
      <rect x="152" y="26" width="56" height="10" rx="5" fill="#D8E4F8" />

      {/* Pet avatars row */}
      {/* Dog avatar */}
      <circle cx="148" cy="70" r="22" fill="#FFF0D8" stroke="#FFD8A8" strokeWidth="2" />
      {/* Mini golden dog face */}
      <circle cx="148" cy="68" r="13" fill="#E8B45A" />
      <ellipse cx="141" cy="62" rx="5" ry="8" fill="#D4A045" transform="rotate(-12 141 62)" />
      <ellipse cx="155" cy="62" rx="5" ry="8" fill="#D4A045" transform="rotate(12 155 62)" />
      <ellipse cx="150" cy="72" rx="6" ry="5" fill="#D4A045" />
      <circle cx="145" cy="67" r="2" fill="white" />
      <circle cx="151" cy="67" r="2" fill="white" />
      <circle cx="145" cy="67" r="1.2" fill="#3D2208" />
      <circle cx="151" cy="67" r="1.2" fill="#3D2208" />
      <ellipse cx="148" cy="71" rx="2.5" ry="2" fill="#3D2208" />
      <text x="148" y="102" textAnchor="middle" fill="#4A5568" fontSize="11" fontWeight="600">Buddy</text>

      {/* Cat avatar */}
      <circle cx="212" cy="70" r="22" fill="#EEF2FF" stroke="#C8D4F8" strokeWidth="2" />
      {/* Mini grey cat face */}
      <circle cx="212" cy="68" r="13" fill="#B0B8C8" />
      <polygon points="204,62 207,52 213,62" fill="#9AA4B4" />
      <polygon points="211,62 217,52 220,62" fill="#9AA4B4" />
      <circle cx="208" cy="66" r="2" fill="white" />
      <circle cx="216" cy="66" r="2" fill="white" />
      <circle cx="208" cy="66" r="1.2" fill="#2D3A4A" />
      <circle cx="216" cy="66" r="1.2" fill="#2D3A4A" />
      <polygon points="212,70 210,73 214,73" fill="#E87878" />
      <text x="212" y="102" textAnchor="middle" fill="#4A5568" fontSize="11" fontWeight="600">Luna</text>

      {/* Timeline vertical line */}
      <line x1="118" y1="124" x2="118" y2="272" stroke="#D8E4F8" strokeWidth="2.5" />

      {/* Row 1 — Checkup */}
      <circle cx="118" cy="138" r="12" fill="#1A3A8F" />
      {/* Stethoscope icon */}
      <circle cx="118" cy="135" r="4" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M122 135 Q126 135 126 139 Q126 143 122 143" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="122" cy="143" r="1.5" fill="white" />
      <rect x="135" y="126" width="120" height="24" rx="8" fill="white" stroke="#EDF2FF" strokeWidth="1.5" />
      <text x="145" y="138" fill="#1E3A8F" fontSize="12" fontWeight="700">Checkup</text>
      <text x="145" y="149" fill="#8898AA" fontSize="10">12 May 2024</text>
      <line x1="240" y1="132" x2="250" y2="132" stroke="#C8D8F8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="240" y1="136" x2="246" y2="136" stroke="#C8D8F8" strokeWidth="1.5" strokeLinecap="round" />

      {/* Row 2 — Vaccine */}
      <circle cx="118" cy="176" r="12" fill="#1CB87E" />
      {/* Syringe icon */}
      <rect x="114" y="171" width="8" height="10" rx="2" fill="white" />
      <rect x="115.5" y="169" width="5" height="4" rx="1" fill="white" />
      <line x1="118" y1="181" x2="118" y2="184" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="135" y="164" width="120" height="24" rx="8" fill="white" stroke="#EDF2FF" strokeWidth="1.5" />
      <text x="145" y="176" fill="#1E3A8F" fontSize="12" fontWeight="700">Vaccine</text>
      <text x="145" y="187" fill="#8898AA" fontSize="10">25 Apr 2024</text>

      {/* Row 3 — Therapy */}
      <circle cx="118" cy="214" r="12" fill="#9B5DE5" />
      {/* Pill icon */}
      <rect x="113" y="209" width="10" height="10" rx="5" fill="white" />
      <line x1="113" y1="214" x2="123" y2="214" stroke="#9B5DE5" strokeWidth="1.5" />
      <rect x="135" y="202" width="120" height="24" rx="8" fill="white" stroke="#EDF2FF" strokeWidth="1.5" />
      <text x="145" y="214" fill="#1E3A8F" fontSize="12" fontWeight="700">Therapy</text>
      <text x="145" y="225" fill="#8898AA" fontSize="10">18 Mar 2024</text>

      {/* Row 4 — Note */}
      <circle cx="118" cy="252" r="12" fill="#FF6B6B" />
      {/* Heart icon */}
      <path d="M118 255 C118 255 112 249 112 246 C112 244 113.5 242 115.5 242 C116.8 242 118 244 118 244 C118 244 119.2 242 120.5 242 C122.5 242 124 244 124 246 C124 249 118 255 118 255Z" fill="white" />
      <rect x="135" y="240" width="120" height="24" rx="8" fill="white" stroke="#EDF2FF" strokeWidth="1.5" />
      <text x="145" y="252" fill="#1E3A8F" fontSize="12" fontWeight="700">Note</text>
      <text x="145" y="263" fill="#8898AA" fontSize="10">10 Feb 2024</text>

      {/* Small dot accents */}
      <circle cx="58" cy="90" r="5" fill="#C8D8F8" opacity="0.8" />
      <circle cx="44" cy="118" r="3.5" fill="#A8D8A8" opacity="0.8" />
      <circle cx="302" cy="100" r="5" fill="#C8D8F8" opacity="0.8" />
      <circle cx="316" cy="130" r="3.5" fill="#A8D8A8" opacity="0.8" />
    </svg>
  );
}

// ─── Illustration 3 — AI robot with dog and cat ───────────────────────────────
function Illustration3() {
  return (
    <svg viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Background */}
      <rect width="360" height="300" fill="#F0F6FF" rx="24" />

      {/* Soft backdrop glow */}
      <circle cx="180" cy="148" r="108" fill="#DBEAFE" opacity="0.35" />

      {/* Decorative leaves */}
      <ellipse cx="42" cy="210" rx="16" ry="28" fill="#A8D8A8" transform="rotate(-15 42 210)" opacity="0.6" />
      <ellipse cx="28" cy="238" rx="12" ry="22" fill="#88C888" transform="rotate(-30 28 238)" opacity="0.4" />
      <ellipse cx="318" cy="200" rx="16" ry="28" fill="#A8D8A8" transform="rotate(15 318 200)" opacity="0.6" />
      <ellipse cx="332" cy="228" rx="12" ry="22" fill="#88C888" transform="rotate(30 332 228)" opacity="0.4" />

      {/* Shield (top center — protection) */}
      <path d="M180 30 L214 46 L214 78 Q214 104 180 118 Q146 104 146 78 L146 46 Z" fill="#1A3A8F" />
      <path d="M180 38 L208 52 L208 78 Q208 100 180 112 Q152 100 152 78 L152 52 Z" fill="#2550B8" />
      {/* Paw inside shield (inline, centered) */}
      <g transform="translate(163, 60)">
        <ellipse cx="17" cy="24" rx="9" ry="7" fill="white" />
        <ellipse cx="6" cy="18" rx="5" ry="4" fill="white" />
        <ellipse cx="12" cy="12" rx="5" ry="4" fill="white" />
        <ellipse cx="22" cy="12" rx="5" ry="4" fill="white" />
        <ellipse cx="28" cy="18" rx="5" ry="4" fill="white" />
      </g>

      {/* Notification badge — bell, top-left */}
      <circle cx="74" cy="98" r="28" fill="#FF8FA3" />
      <path d="M74 84 C74 84 64 88 64 96 L64 104 L84 104 L84 96 C84 88 74 84 74 84Z" fill="white" />
      <rect x="68" y="104" width="12" height="4" rx="2" fill="white" />
      <circle cx="74" cy="108" r="3" fill="white" />
      <circle cx="80" cy="86" r="6" fill="#FF4D6A" />
      <text x="80" y="90" textAnchor="middle" fill="white" fontSize="8" fontWeight="800">1</text>

      {/* Check badge — top-right */}
      <circle cx="286" cy="98" r="28" fill="#00C896" />
      <path d="M274 98 L280 104 L298 88" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Robot body */}
      {/* Body */}
      <rect x="144" y="136" width="72" height="80" rx="18" fill="white" stroke="#D8E4F8" strokeWidth="2" />
      {/* Neck */}
      <rect x="168" y="126" width="24" height="16" rx="6" fill="#D8E4F8" />
      {/* Head */}
      <rect x="148" y="88" width="64" height="48" rx="18" fill="white" stroke="#D8E4F8" strokeWidth="2" />
      {/* Antenna */}
      <line x1="180" y1="88" x2="180" y2="74" stroke="#A8B8D8" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="180" cy="70" r="5" fill="#1A3A8F" />
      {/* Eyes — happy screen eyes */}
      <rect x="160" y="102" width="16" height="14" rx="6" fill="#1A3A8F" />
      <rect x="184" y="102" width="16" height="14" rx="6" fill="#1A3A8F" />
      {/* Eye shine */}
      <circle cx="164" cy="106" r="2.5" fill="white" />
      <circle cx="188" cy="106" r="2.5" fill="white" />
      {/* Smile */}
      <path d="M165 124 Q180 132 195 124" stroke="#1A3A8F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Robot chest — paw badge */}
      <circle cx="180" cy="172" r="16" fill="#EEF4FF" stroke="#C8D8F8" strokeWidth="1.5" />
      <g transform="translate(168, 163)">
        <ellipse cx="12" cy="16" rx="6" ry="5" fill="#1A3A8F" />
        <ellipse cx="4" cy="12" rx="3.5" ry="3" fill="#1A3A8F" />
        <ellipse cx="8.5" cy="7" rx="3.5" ry="3" fill="#1A3A8F" />
        <ellipse cx="15.5" cy="7" rx="3.5" ry="3" fill="#1A3A8F" />
        <ellipse cx="20" cy="12" rx="3.5" ry="3" fill="#1A3A8F" />
      </g>
      {/* Robot pointing finger */}
      <path d="M216 148 Q238 138 246 126" stroke="#D8E4F8" strokeWidth="14" strokeLinecap="round" fill="none" />
      <circle cx="248" cy="124" r="8" fill="#A8B8D8" />
      {/* Left arm */}
      <path d="M144 156 Q118 156 112 164" stroke="#D8E4F8" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Robot legs */}
      <rect x="156" y="214" width="18" height="28" rx="9" fill="#D8E4F8" />
      <rect x="186" y="214" width="18" height="28" rx="9" fill="#D8E4F8" />
      <ellipse cx="165" cy="242" rx="11" ry="6" fill="#C8D4E8" />
      <ellipse cx="195" cy="242" rx="11" ry="6" fill="#C8D4E8" />

      {/* Dog — golden, bottom-left */}
      <ellipse cx="88" cy="268" rx="28" ry="16" fill="#E8B45A" />
      <circle cx="96" cy="248" r="18" fill="#E8B45A" />
      <ellipse cx="80" cy="240" rx="7" ry="12" fill="#D4A045" transform="rotate(-15 80 240)" />
      <ellipse cx="110" cy="238" rx="6" ry="10" fill="#D4A045" transform="rotate(10 110 238)" />
      <ellipse cx="100" cy="253" rx="7" ry="5.5" fill="#D4A045" />
      <circle cx="91" cy="246" r="3" fill="white" />
      <circle cx="101" cy="246" r="3" fill="white" />
      <circle cx="91" cy="247" r="1.8" fill="#2D1A08" />
      <circle cx="101" cy="247" r="1.8" fill="#2D1A08" />
      <ellipse cx="98" cy="252" rx="3" ry="2.5" fill="#3D2208" />
      <path d="M95 256 Q98 259 102 256" stroke="#3D2208" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="98" cy="259" rx="3.5" ry="2.5" fill="#FF8A80" />
      <rect x="84" y="260" width="22" height="5" rx="2.5" fill="#1A3A8F" />
      <circle cx="95" cy="262.5" r="2" fill="#C0C0C0" />

      {/* Cat — grey, bottom-right */}
      <ellipse cx="272" cy="268" rx="26" ry="15" fill="#B0B8C8" />
      <circle cx="264" cy="250" r="17" fill="#B0B8C8" />
      <polygon points="252,244 256,230 263,244" fill="#9AA4B4" />
      <polygon points="265,244 271,230 276,244" fill="#9AA4B4" />
      <polygon points="254,243 256,233 261,243" fill="#D8C8C8" />
      <polygon points="266,243 271,233 274,243" fill="#D8C8C8" />
      <circle cx="258" cy="248" r="2.8" fill="white" />
      <circle cx="270" cy="248" r="2.8" fill="white" />
      <circle cx="258" cy="249" r="1.7" fill="#2D3A4A" />
      <circle cx="270" cy="249" r="1.7" fill="#2D3A4A" />
      <polygon points="264,253 261,257 267,257" fill="#E87878" />
      <line x1="256" y1="255" x2="241" y2="252" stroke="#8890A0" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="256" y1="257" x2="241" y2="257" stroke="#8890A0" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="272" y1="255" x2="287" y2="252" stroke="#8890A0" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="272" y1="257" x2="287" y2="257" stroke="#8890A0" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="252" y="262" width="20" height="5" rx="2.5" fill="#E87878" />
      <circle cx="262" cy="264.5" r="2" fill="#C0C0C0" />

      {/* Sparkles */}
      <path d="M54 60 L56 54 L58 60 L64 62 L58 64 L56 70 L54 64 L48 62 Z" fill="#93C5FD" opacity="0.9" />
      <path d="M300 56 L302 50 L304 56 L310 58 L304 60 L302 66 L300 60 L294 58 Z" fill="#7DD3FC" opacity="0.9" />
      <circle cx="52" cy="162" r="5" fill="#BFDBFE" />
      <circle cx="308" cy="168" r="4" fill="#BAE6FD" />
    </svg>
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
          ...(slide === 0
            ? { width: '100%', height: 'calc(100vh - 280px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflow: 'hidden' }
            : { flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 16px' }),
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
          <div className="w-full max-w-sm" style={{ aspectRatio: '6/5' }}>
            <Illustration />
          </div>
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
                backgroundColor: i === slide ? '#1A3A8F' : '#D1D5DB',
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
            className="w-full bg-[#1A3A8F] text-white font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#153080] active:bg-[#102870] active:scale-[0.98] transition-all shadow-lg"
            style={{ boxShadow: '0 8px 24px rgba(26,58,143,0.28)' }}
          >
            Get Started
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-[#1A3A8F] text-white font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-[#153080] active:bg-[#102870] active:scale-[0.98] transition-all shadow-lg"
            style={{ boxShadow: '0 8px 24px rgba(26,58,143,0.28)' }}
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
