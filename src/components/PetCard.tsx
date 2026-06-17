import { Dog, Cat, ChevronRight } from 'lucide-react';
import type { Pet } from '../types';
import { useApp } from '../context/AppContext';

const ACCENT_CLASSES: Record<Pet['accentColor'], { ring: string; badge: string; text: string; bg: string }> = {
  sky: { ring: 'ring-sky-200', badge: 'bg-sky-50 text-sky-700', text: 'text-sky-600', bg: 'bg-sky-50' },
  amber: { ring: 'ring-amber-200', badge: 'bg-amber-50 text-amber-700', text: 'text-amber-600', bg: 'bg-amber-50' },
  emerald: { ring: 'ring-emerald-200', badge: 'bg-emerald-50 text-emerald-700', text: 'text-emerald-600', bg: 'bg-emerald-50' },
  violet: { ring: 'ring-violet-200', badge: 'bg-violet-50 text-violet-700', text: 'text-violet-600', bg: 'bg-violet-50' },
  rose: { ring: 'ring-rose-200', badge: 'bg-rose-50 text-rose-700', text: 'text-rose-600', bg: 'bg-rose-50' },
};

interface PetCardProps {
  pet: Pet;
  badge?: string;
  badgeColor?: 'amber' | 'sky' | 'emerald' | 'red';
}

export default function PetCard({ pet, badge, badgeColor = 'amber' }: PetCardProps) {
  const { navigateToPet } = useApp();
  const accent = ACCENT_CLASSES[pet.accentColor];
  const SpeciesIcon = pet.species === 'dog' ? Dog : Cat;

  const badgeStyles: Record<string, string> = {
    amber: 'bg-amber-50 text-amber-700 border border-amber-200',
    sky: 'bg-sky-50 text-sky-700 border border-sky-200',
    emerald: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    red: 'bg-red-50 text-red-700 border border-red-200',
  };

  return (
    <button
      onClick={() => navigateToPet(pet.id)}
      className="w-full bg-white rounded-2xl shadow-card p-4 flex items-center gap-4 hover:shadow-card-md active:scale-[0.99] transition-all text-left"
    >
      <div className="relative flex-shrink-0">
        <img
          src={pet.photo}
          alt={pet.name}
          className={`w-16 h-16 rounded-2xl object-cover ring-2 ${accent.ring}`}
        />
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${accent.bg} flex items-center justify-center shadow-sm`}>
          <SpeciesIcon size={13} className={accent.text} strokeWidth={2} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">{pet.name}</h3>
          <ChevronRight size={16} className="text-slate-400 flex-shrink-0" />
        </div>
        <p className="text-sm text-slate-500 mt-0.5">{pet.breed}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-slate-500">
            {pet.age} {pet.age === 1 ? 'year' : 'years'}
          </span>
          <span className="text-slate-200 text-xs">·</span>
          <span className="text-xs text-slate-500">{pet.weight} kg</span>
          <span className="text-slate-200 text-xs">·</span>
          <span className="text-xs text-slate-500 capitalize">{pet.gender}</span>
        </div>
        {badge && (
          <div className="mt-2">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${badgeStyles[badgeColor]}`}>
              {badge}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
