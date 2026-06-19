import { useState } from 'react';

const ONBOARDING_KEY = 'ttcare_onboarding_done';

export function markOnboardingDone() {
  localStorage.setItem(ONBOARDING_KEY, '1');
}

export function hasSeenOnboarding(): boolean {
  return localStorage.getItem(ONBOARDING_KEY) !== null;
}

// ─── Slide 1 illustration: dog + cat with AI/health elements ─────────────────
function Illustration1() {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Soft background glow */}
      <circle cx="160" cy="148" r="108" fill="#EFF6FF" />
      <circle cx="160" cy="148" r="80" fill="#DBEAFE" opacity="0.5" />

      {/* AI ring */}
      <circle cx="160" cy="148" r="104" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="6 5" opacity="0.6" />

      {/* Dog body */}
      <ellipse cx="114" cy="172" rx="36" ry="26" fill="#60A5FA" />
      {/* Dog head */}
      <circle cx="114" cy="140" r="24" fill="#60A5FA" />
      {/* Dog ears */}
      <ellipse cx="96" cy="124" rx="9" ry="13" fill="#3B82F6" transform="rotate(-10 96 124)" />
      <ellipse cx="132" cy="124" rx="9" ry="13" fill="#3B82F6" transform="rotate(10 132 124)" />
      {/* Dog face */}
      <circle cx="108" cy="138" r="3" fill="white" />
      <circle cx="120" cy="138" r="3" fill="white" />
      <circle cx="108" cy="138" r="1.5" fill="#1D4ED8" />
      <circle cx="120" cy="138" r="1.5" fill="#1D4ED8" />
      <ellipse cx="114" cy="147" rx="6" ry="4" fill="#93C5FD" />
      <ellipse cx="114" cy="148" rx="4" ry="2.5" fill="#2563EB" />
      {/* Dog tail */}
      <path d="M150 168 Q168 152 162 140" stroke="#60A5FA" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* Dog legs */}
      <rect x="95" y="190" width="10" height="18" rx="5" fill="#3B82F6" />
      <rect x="110" y="192" width="10" height="16" rx="5" fill="#3B82F6" />
      <rect x="122" y="192" width="10" height="16" rx="5" fill="#3B82F6" />
      <rect x="134" y="190" width="10" height="18" rx="5" fill="#3B82F6" />

      {/* Cat body */}
      <ellipse cx="206" cy="172" rx="32" ry="24" fill="#38BDF8" />
      {/* Cat head */}
      <circle cx="206" cy="141" r="22" fill="#38BDF8" />
      {/* Cat ears */}
      <polygon points="188,126 194,108 202,126" fill="#0EA5E9" />
      <polygon points="210,126 216,108 224,126" fill="#0EA5E9" />
      <polygon points="190,125 194,113 200,125" fill="#7DD3FC" />
      <polygon points="212,125 216,113 220,125" fill="#7DD3FC" />
      {/* Cat face */}
      <circle cx="200" cy="139" r="2.5" fill="white" />
      <circle cx="212" cy="139" r="2.5" fill="white" />
      <circle cx="200" cy="139" r="1.5" fill="#0369A1" />
      <circle cx="212" cy="139" r="1.5" fill="#0369A1" />
      {/* Cat nose */}
      <polygon points="206,145 203,149 209,149" fill="#0284C7" />
      {/* Cat whiskers */}
      <line x1="195" y1="147" x2="180" y2="144" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="195" y1="149" x2="180" y2="149" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="217" y1="147" x2="232" y2="144" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="217" y1="149" x2="232" y2="149" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      {/* Cat tail */}
      <path d="M174 170 Q158 156 164 140" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Cat legs */}
      <rect x="188" y="188" width="9" height="16" rx="4.5" fill="#0EA5E9" />
      <rect x="200" y="190" width="9" height="14" rx="4.5" fill="#0EA5E9" />
      <rect x="211" y="190" width="9" height="14" rx="4.5" fill="#0EA5E9" />
      <rect x="222" y="188" width="9" height="16" rx="4.5" fill="#0EA5E9" />

      {/* Heartbeat line */}
      <path d="M60 148 L80 148 L88 130 L96 164 L104 138 L112 148 L260 148"
        stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />

      {/* Health cross icon (top center) */}
      <circle cx="160" cy="62" r="16" fill="white" />
      <rect x="155" y="56" width="10" height="12" rx="2" fill="#3B82F6" />
      <rect x="153" y="58" width="14" height="8" rx="2" fill="#3B82F6" />

      {/* Sparkles */}
      {/* Top-left sparkle */}
      <path d="M72 84 L74 78 L76 84 L82 86 L76 88 L74 94 L72 88 L66 86 Z" fill="#93C5FD" />
      {/* Top-right sparkle */}
      <path d="M240 70 L241.5 65 L243 70 L248 71.5 L243 73 L241.5 78 L240 73 L235 71.5 Z" fill="#7DD3FC" />
      {/* Bottom-right sparkle */}
      <path d="M262 118 L263 114 L264 118 L268 119 L264 120 L263 124 L262 120 L258 119 Z" fill="#BAE6FD" />
      {/* Small dots */}
      <circle cx="58" cy="116" r="3" fill="#BFDBFE" />
      <circle cx="258" cy="90" r="4" fill="#BAE6FD" />
      <circle cx="52" cy="172" r="2.5" fill="#93C5FD" />
      <circle cx="272" cy="160" r="2.5" fill="#7DD3FC" />
    </svg>
  );
}

// ─── Slide 2 illustration: health timeline / records ─────────────────────────
function Illustration2() {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background */}
      <rect x="40" y="24" width="240" height="232" rx="24" fill="#EFF6FF" />

      {/* Dog profile card */}
      <rect x="52" y="36" width="96" height="64" rx="14" fill="white" />
      <circle cx="78" cy="60" r="16" fill="#DBEAFE" />
      {/* Mini dog */}
      <circle cx="78" cy="56" r="8" fill="#60A5FA" />
      <ellipse cx="74" cy="51" rx="3" ry="5" fill="#3B82F6" transform="rotate(-8 74 51)" />
      <ellipse cx="82" cy="51" rx="3" ry="5" fill="#3B82F6" transform="rotate(8 82 51)" />
      <ellipse cx="78" cy="68" rx="10" ry="7" fill="#60A5FA" />
      <rect x="100" y="48" width="38" height="6" rx="3" fill="#BFDBFE" />
      <rect x="100" y="58" width="26" height="5" rx="2.5" fill="#DBEAFE" />
      <rect x="100" y="68" width="32" height="5" rx="2.5" fill="#DBEAFE" />
      <rect x="58" y="82" width="82" height="12" rx="6" fill="#EFF6FF" />
      <rect x="62" y="85" width="36" height="6" rx="3" fill="#93C5FD" />

      {/* Cat profile card */}
      <rect x="172" y="36" width="96" height="64" rx="14" fill="white" />
      <circle cx="198" cy="60" r="16" fill="#E0F2FE" />
      {/* Mini cat */}
      <circle cx="198" cy="57" r="8" fill="#38BDF8" />
      <polygon points="191,52 194,44 198,52" fill="#0EA5E9" />
      <polygon points="198,52 202,44 205,52" fill="#0EA5E9" />
      <ellipse cx="198" cy="68" rx="9" ry="7" fill="#38BDF8" />
      <rect x="220" y="48" width="38" height="6" rx="3" fill="#BAE6FD" />
      <rect x="220" y="58" width="26" height="5" rx="2.5" fill="#E0F2FE" />
      <rect x="220" y="68" width="32" height="5" rx="2.5" fill="#E0F2FE" />
      <rect x="178" y="82" width="82" height="12" rx="6" fill="#F0F9FF" />
      <rect x="182" y="85" width="36" height="6" rx="3" fill="#7DD3FC" />

      {/* Timeline vertical line */}
      <line x1="160" y1="116" x2="160" y2="242" stroke="#BFDBFE" strokeWidth="2.5" />

      {/* Timeline node 1 – Checkup */}
      <circle cx="160" cy="128" r="10" fill="#3B82F6" />
      <path d="M155 128 L158 131 L165 124" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="176" y="118" width="100" height="20" rx="8" fill="white" />
      <rect x="182" y="122" width="52" height="6" rx="3" fill="#BFDBFE" />
      <rect x="182" y="130" width="36" height="4" rx="2" fill="#DBEAFE" />

      {/* Timeline node 2 – Vaccine */}
      <circle cx="160" cy="168" r="10" fill="#0EA5E9" />
      {/* Syringe icon */}
      <rect x="156" y="163" width="8" height="10" rx="2" fill="white" />
      <rect x="158" y="161" width="4" height="4" rx="1" fill="white" />
      <line x1="160" y1="173" x2="160" y2="176" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="44" y="158" width="100" height="20" rx="8" fill="white" />
      <rect x="50" y="162" width="52" height="6" rx="3" fill="#BAE6FD" />
      <rect x="50" y="170" width="36" height="4" rx="2" fill="#E0F2FE" />

      {/* Timeline node 3 – Diagnostic notes */}
      <circle cx="160" cy="208" r="10" fill="#60A5FA" />
      {/* Notes icon */}
      <rect x="155" y="202" width="10" height="12" rx="2" fill="white" />
      <line x1="157" y1="206" x2="163" y2="206" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="157" y1="209" x2="163" y2="209" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="176" y="198" width="100" height="20" rx="8" fill="white" />
      <rect x="182" y="202" width="52" height="6" rx="3" fill="#BFDBFE" />
      <rect x="182" y="210" width="36" height="4" rx="2" fill="#DBEAFE" />

      {/* Small date labels */}
      <rect x="48" y="122" width="80" height="14" rx="7" fill="#DBEAFE" />
      <rect x="54" y="125" width="38" height="5" rx="2.5" fill="#93C5FD" />
    </svg>
  );
}

// ─── Slide 3 illustration: owner + pets + protection elements ─────────────────
function Illustration3() {
  return (
    <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background glow */}
      <circle cx="160" cy="150" r="110" fill="#EFF6FF" />
      <circle cx="160" cy="150" r="82" fill="#DBEAFE" opacity="0.4" />

      {/* Protection shield */}
      <path d="M160 52 L196 68 L196 104 Q196 130 160 144 Q124 130 124 104 L124 68 Z"
        fill="#BFDBFE" stroke="#93C5FD" strokeWidth="2" />
      {/* Heart inside shield */}
      <path d="M160 116 C160 116 144 106 144 96 C144 90 148 86 154 86 C157 86 160 89 160 89 C160 89 163 86 166 86 C172 86 176 90 176 96 C176 106 160 116 160 116 Z"
        fill="#3B82F6" />

      {/* Human figure (owner) */}
      {/* Head */}
      <circle cx="160" cy="162" r="20" fill="#FED7AA" />
      {/* Hair */}
      <path d="M142 158 Q142 138 160 136 Q178 138 178 158" fill="#92400E" />
      {/* Body */}
      <rect x="140" y="180" width="40" height="48" rx="12" fill="#60A5FA" />
      {/* Arms */}
      <rect x="108" y="182" width="34" height="14" rx="7" fill="#60A5FA" />
      <rect x="178" y="182" width="34" height="14" rx="7" fill="#60A5FA" />
      {/* Legs */}
      <rect x="144" y="224" width="14" height="32" rx="7" fill="#2563EB" />
      <rect x="162" y="224" width="14" height="32" rx="7" fill="#2563EB" />
      {/* Face */}
      <circle cx="153" cy="160" r="2.5" fill="#92400E" />
      <circle cx="167" cy="160" r="2.5" fill="#92400E" />
      <path d="M153 168 Q160 174 167 168" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Dog (left) */}
      <ellipse cx="96" cy="222" rx="24" ry="18" fill="#93C5FD" />
      <circle cx="96" cy="202" r="17" fill="#93C5FD" />
      <ellipse cx="84" cy="190" rx="7" ry="10" fill="#60A5FA" transform="rotate(-8 84 190)" />
      <ellipse cx="108" cy="190" rx="7" ry="10" fill="#60A5FA" transform="rotate(8 108 190)" />
      <circle cx="91" cy="200" r="2.5" fill="white" />
      <circle cx="101" cy="200" r="2.5" fill="white" />
      <circle cx="91" cy="200" r="1.5" fill="#1D4ED8" />
      <circle cx="101" cy="200" r="1.5" fill="#1D4ED8" />
      <ellipse cx="96" cy="208" rx="5" ry="3.5" fill="#7DD3FC" />
      <rect x="80" y="232" width="8" height="14" rx="4" fill="#60A5FA" />
      <rect x="90" y="234" width="8" height="12" rx="4" fill="#60A5FA" />
      <rect x="100" y="234" width="8" height="12" rx="4" fill="#60A5FA" />
      <rect x="110" y="232" width="8" height="14" rx="4" fill="#60A5FA" />

      {/* Cat (right) */}
      <ellipse cx="224" cy="222" rx="22" ry="17" fill="#7DD3FC" />
      <circle cx="224" cy="204" r="16" fill="#7DD3FC" />
      <polygon points="210,198 215,184 222,198" fill="#38BDF8" />
      <polygon points="226,198 233,184 238,198" fill="#38BDF8" />
      <polygon points="212,197 215,188 220,197" fill="#BAE6FD" />
      <polygon points="228,197 233,188 236,197" fill="#BAE6FD" />
      <circle cx="219" cy="202" r="2.5" fill="white" />
      <circle cx="229" cy="202" r="2.5" fill="white" />
      <circle cx="219" cy="202" r="1.5" fill="#0369A1" />
      <circle cx="229" cy="202" r="1.5" fill="#0369A1" />
      <polygon points="224,208 221,212 227,212" fill="#0284C7" />
      {/* Cat whiskers */}
      <line x1="216" y1="210" x2="204" y2="208" stroke="#BAE6FD" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="216" y1="212" x2="204" y2="212" stroke="#BAE6FD" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="232" y1="210" x2="244" y2="208" stroke="#BAE6FD" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="232" y1="212" x2="244" y2="212" stroke="#BAE6FD" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="208" y="232" width="7" height="12" rx="3.5" fill="#38BDF8" />
      <rect x="218" y="234" width="7" height="10" rx="3.5" fill="#38BDF8" />
      <rect x="228" y="234" width="7" height="10" rx="3.5" fill="#38BDF8" />
      <rect x="238" y="232" width="7" height="12" rx="3.5" fill="#38BDF8" />

      {/* Sparkles */}
      <path d="M56 100 L57.5 95 L59 100 L64 101.5 L59 103 L57.5 108 L56 103 L51 101.5 Z" fill="#93C5FD" />
      <path d="M254 86 L255.5 81 L257 86 L262 87.5 L257 89 L255.5 94 L254 89 L249 87.5 Z" fill="#7DD3FC" />
      <circle cx="54" cy="140" r="4" fill="#BFDBFE" />
      <circle cx="268" cy="126" r="3" fill="#BAE6FD" />
      <circle cx="272" cy="196" r="3" fill="#93C5FD" />
      <circle cx="50" cy="200" r="2.5" fill="#BFDBFE" />
    </svg>
  );
}

// ─── Slide data ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    Illustration: Illustration1,
    title: "Your pet's AI health companion",
    subtitle: 'Understand symptoms and monitor your pet\'s wellbeing.',
    supporting: undefined,
  },
  {
    Illustration: Illustration2,
    title: 'Keep every health moment in one place',
    subtitle: 'Track diagnostics, therapies, vaccines and checkups.',
    supporting: 'Complete health history for every pet.',
  },
  {
    Illustration: Illustration3,
    title: 'Care with confidence',
    subtitle: "Peace of mind for every stage of your pet's life.",
    supporting: undefined,
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────
interface Props {
  onComplete: () => void;
}

export default function OnboardingPage({ onComplete }: Props) {
  const [slide, setSlide] = useState(0);
  const isLast = slide === SLIDES.length - 1;

  function handleComplete() {
    markOnboardingDone();
    onComplete();
  }

  function handleNext() {
    if (isLast) {
      handleComplete();
    } else {
      setSlide((s) => s + 1);
    }
  }

  const { Illustration, title, subtitle, supporting } = SLIDES[slide];

  return (
    <div className="min-h-screen flex flex-col bg-white max-w-md mx-auto relative overflow-hidden">
      {/* Skip */}
      <div className="flex justify-end px-6 pt-12 pb-2">
        <button
          onClick={handleComplete}
          className="text-slate-400 text-sm font-semibold hover:text-slate-600 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center px-8 pt-2 pb-4">
        <div className="w-full max-w-xs" key={slide}>
          <Illustration />
        </div>
      </div>

      {/* Text */}
      <div className="px-8 text-center space-y-3 pb-6" key={`text-${slide}`}>
        <h1 className="text-2xl font-bold text-slate-900 leading-tight">
          {title}
        </h1>
        <p className="text-slate-500 text-base leading-relaxed">
          {subtitle}
        </p>
        {supporting && (
          <p className="text-slate-400 text-sm">
            {supporting}
          </p>
        )}
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 pb-6">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              i === slide
                ? 'w-6 h-2.5 bg-sky-500'
                : 'w-2.5 h-2.5 bg-slate-200'
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 pb-12">
        <button
          onClick={handleNext}
          className="w-full bg-sky-500 text-white font-bold text-base py-4 rounded-2xl hover:bg-sky-600 active:bg-sky-700 active:scale-[0.98] transition-all shadow-lg shadow-sky-200"
        >
          {isLast ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
}
