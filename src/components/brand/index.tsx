import logoImg from '../../assets/icons/200x200bb-75.png';

// ─── Official app icon ────────────────────────────────────────────────────────
interface LogoIconProps {
  size?: number;
  className?: string;
}

export function TTCareLogoIcon({ size = 80, className }: LogoIconProps) {
  return (
    <img
      src={logoImg}
      alt="TTCARE vet"
      width={size}
      height={size}
      className={className}
      style={{ borderRadius: size * 0.22, display: 'block' }}
      draggable={false}
    />
  );
}

// ─── Wordmark ─────────────────────────────────────────────────────────────────
type WordmarkVariant = 'on-gradient' | 'on-light';

interface WordmarkProps {
  variant?: WordmarkVariant;
  className?: string;
}

export function TTCareWordmark({ variant = 'on-gradient', className }: WordmarkProps) {
  const ttcare = variant === 'on-gradient' ? '#FFFFFF' : '#172033';
  const vet = variant === 'on-gradient' ? 'rgba(255,255,255,0.70)' : '#2F8CFF';

  return (
    <div className={`flex items-baseline gap-1 ${className ?? ''}`}>
      <span style={{ color: ttcare, fontWeight: 800, fontSize: '1.35rem', letterSpacing: '0.04em', lineHeight: 1 }}>
        TTCARE
      </span>
      <span style={{ color: vet, fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.06em', lineHeight: 1 }}>
        vet
      </span>
    </div>
  );
}

// ─── Gradient background — luminous blue ─────────────────────────────────────
interface BgProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function BrandGradientBg({ children, className, style }: BgProps) {
  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden ${className ?? ''}`}
      style={{
        background: 'linear-gradient(145deg, #38BDF8 0%, #2563EB 52%, #3B5BFF 100%)',
        ...style,
      }}
    >
      {/* Soft decorative ellipses — consistent across splash & welcome */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.10)',
          top: -80,
          right: -80,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          bottom: -60,
          left: -60,
        }}
      />
      {children}
    </div>
  );
}

// ─── Soft light background for auth pages ────────────────────────────────────
export function BrandLightBg({ children, className, style }: BgProps) {
  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden ${className ?? ''}`}
      style={{
        background: 'linear-gradient(160deg, #EEF7FF 0%, #FFFFFF 50%, #DBEAFE 100%)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Primary CTA button ───────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary-on-gradient' | 'primary-on-light' | 'secondary-on-gradient' | 'secondary-on-light';
  loading?: boolean;
}

export function BrandButton({ children, variant = 'primary-on-gradient', loading, className, ...rest }: ButtonProps) {
  const base = 'w-full font-bold text-base py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60';

  const styles: Record<string, string> = {
    'primary-on-gradient': 'bg-white text-[#1A4FCC] shadow-md hover:bg-blue-50',
    'primary-on-light':    'bg-gradient-to-r from-[#2F8CFF] to-[#2563EB] text-white shadow-md hover:opacity-90',
    'secondary-on-gradient': 'bg-white/15 text-white border border-white/30 backdrop-blur-sm hover:bg-white/25',
    'secondary-on-light':    'bg-white text-[#2F8CFF] border border-[#D8E3F0] hover:bg-[#EEF7FF]',
  };

  return (
    <button className={`${base} ${styles[variant]} ${className ?? ''}`} disabled={loading} {...rest}>
      {children}
    </button>
  );
}

// ─── Loading dots ─────────────────────────────────────────────────────────────
export function LoadingDots({ variant = 'on-gradient' }: { variant?: 'on-gradient' | 'on-light' }) {
  const color = variant === 'on-gradient' ? 'rgba(255,255,255,0.55)' : '#93C5FD';
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: color,
            animation: 'ob-pulse-ring 1.4s ease infinite',
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}
