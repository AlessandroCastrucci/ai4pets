import type { UrgencyLevel } from '../types';

type Variant = 'urgency' | 'vaccine' | 'reminder' | 'therapy' | 'tag';

interface StatusBadgeProps {
  label: string;
  variant?: Variant;
  urgency?: UrgencyLevel;
  className?: string;
}

const URGENCY_STYLES: Record<UrgencyLevel, string> = {
  low: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  medium: 'bg-amber-50 text-amber-700 border border-amber-200',
  high: 'bg-red-50 text-red-700 border border-red-200',
};

const VACCINE_STATUS_STYLES: Record<string, string> = {
  'Up to Date': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Due Soon': 'bg-amber-50 text-amber-700 border border-amber-200',
  Overdue: 'bg-red-50 text-red-700 border border-red-200',
};

export default function StatusBadge({ label, variant = 'tag', urgency, className = '' }: StatusBadgeProps) {
  let styles = 'bg-slate-100 text-slate-600 border border-slate-200';

  if (variant === 'urgency' && urgency) {
    styles = URGENCY_STYLES[urgency];
  } else if (variant === 'vaccine') {
    styles = VACCINE_STATUS_STYLES[label] ?? styles;
  } else if (variant === 'reminder') {
    styles = 'bg-sky-50 text-sky-700 border border-sky-200';
  } else if (variant === 'therapy') {
    styles = 'bg-violet-50 text-violet-700 border border-violet-200';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles} ${className}`}>
      {label}
    </span>
  );
}
