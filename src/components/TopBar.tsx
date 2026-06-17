import { ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TopBarProps {
  title: string;
  showBack?: boolean;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}

export default function TopBar({ title, showBack = false, subtitle, rightSlot }: TopBarProps) {
  const { navigateBack } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="flex items-center px-4 py-3 gap-3 min-h-[56px]" style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}>
        {showBack && (
          <button
            onClick={navigateBack}
            className="flex items-center justify-center w-9 h-9 -ml-1 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors flex-shrink-0"
            aria-label="Go back"
          >
            <ChevronLeft size={22} className="text-slate-700" strokeWidth={2} />
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold text-slate-900 truncate leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-xs text-slate-500 truncate leading-tight mt-0.5">{subtitle}</p>
          )}
        </div>
        {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
      </div>
    </header>
  );
}
