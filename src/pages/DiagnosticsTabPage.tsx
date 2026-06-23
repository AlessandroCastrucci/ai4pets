import { useEffect } from 'react';
import { Dog, Cat, Scan, ChevronRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useApp } from '../context/AppContext';
import type { Pet } from '../types';

function DiagnosticsPetCard({ pet, onSelect }: { pet: Pet; onSelect: (petId: string) => void }) {
  const SpeciesIcon = pet.species === 'dog' ? Dog : Cat;

  return (
    <button
      onClick={() => onSelect(pet.id)}
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
      </div>
    </button>
  );
}

export default function DiagnosticsTabPage() {
  const { pets, startDiagnosticsForPet } = useApp();

  useEffect(() => {
    if (pets.length === 1) {
      startDiagnosticsForPet(pets[0].id);
    }
  }, [pets, startDiagnosticsForPet]);

  if (pets.length === 1) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="AI Diagnostics" />
      <main className="flex-1 px-4 py-4 space-y-4 pb-24">
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mx-auto mb-3">
            <Scan size={28} className="text-sky-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Which pet needs help?</h2>
          <p className="text-sm text-slate-500 mt-1">Select a pet to start the AI diagnostic analysis</p>
        </div>
        <div className="space-y-3">
          {pets.map((pet) => (
            <DiagnosticsPetCard
              key={pet.id}
              pet={pet}
              onSelect={startDiagnosticsForPet}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
