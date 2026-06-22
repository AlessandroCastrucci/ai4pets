import { Dog, Cat, ChevronRight } from 'lucide-react';
import type { Pet } from '../types';
import { useApp } from '../context/AppContext';

interface PetCardProps {
  pet: Pet;
  badge?: string;
  badgeColor?: 'amber' | 'sky' | 'emerald' | 'red';
}

export default function PetCard({ pet, badge, badgeColor = 'amber' }: PetCardProps) {
  const { navigateToPet } = useApp();
  const SpeciesIcon = pet.species === 'dog' ? Dog : Cat;

  const badgeStyles: Record<string, string> = {
    amber: 'bg-amber-50 text-amber-700',
    sky: 'bg-sky-50 text-sky-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    red: 'bg-red-50 text-red-700',
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
          className="w-20 h-20 rounded-2xl object-cover shadow-sm"
        />
        <div className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full ${pet.species === 'dog' ? 'bg-sky-50' : 'bg-amber-50'} flex items-center justify-center shadow-sm`}>
          <SpeciesIcon size={13} className={pet.species === 'dog' ? 'text-sky-500' : 'text-amber-500'} strokeWidth={2} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[17px] font-bold text-slate-900 truncate">{pet.name}</h3>
          <ChevronRight size={16} className="text-slate-300 flex-shrink-0" />
        </div>
        <p className="text-sm text-slate-500 mt-0.5">{pet.breed}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-slate-500">
            {pet.age} {pet.age === 1 ? 'yr' : 'yrs'}
          </span>
          <span className="text-slate-300 text-xs">·</span>
          <span className="text-xs text-slate-500">{pet.weight} kg</span>
          <span className="text-slate-300 text-xs">·</span>
          <span className="text-xs text-slate-500 capitalize">{pet.gender}</span>
        </div>
        {badge && (
          <div className="mt-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${badgeStyles[badgeColor]}`}>
              {badge}
            </span>
          </div>
        )}
      </div>
    </button>
  );
}
