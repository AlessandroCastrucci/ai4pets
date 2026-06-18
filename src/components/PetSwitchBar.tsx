import { useState } from 'react';
import { Dog, Cat, ChevronDown, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PetSwitchBar() {
  const { pets, getSelectedPet, switchPet } = useApp();
  const [open, setOpen] = useState(false);
  const current = getSelectedPet();

  if (!current) return null;

  const others = pets.filter((p) => p.id !== current.id);

  return (
    <div className="relative bg-white border-b border-slate-100 px-4 py-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 w-full"
      >
        <img
          src={current.photo}
          alt={current.name}
          className="w-7 h-7 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 text-left">
          <span className="text-sm font-semibold text-slate-800">{current.name}</span>
          <span className="text-xs text-slate-400 ml-1.5">{current.breed} · {current.age}y · {current.weight}kg</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-sky-500">
          <span>Switch</span>
          <ChevronDown size={13} strokeWidth={2.5} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-4 right-4 top-full mt-1 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden z-50">
            {others.map((pet) => {
              const SpeciesIcon = pet.species === 'dog' ? Dog : Cat;
              return (
                <button
                  key={pet.id}
                  onClick={() => { switchPet(pet.id); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                >
                  <img src={pet.photo} alt={pet.name} className="w-9 h-9 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-slate-800">{pet.name}</p>
                    <p className="text-xs text-slate-400">{pet.breed} · {pet.age}y · {pet.weight}kg</p>
                  </div>
                  <SpeciesIcon size={14} className="text-slate-400 flex-shrink-0" strokeWidth={1.8} />
                </button>
              );
            })}
            <div className="px-4 py-2.5 border-t border-slate-100 flex items-center gap-2">
              <Check size={13} className="text-sky-500" strokeWidth={2.5} />
              <span className="text-xs font-semibold text-sky-600">Viewing: {current.name}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
