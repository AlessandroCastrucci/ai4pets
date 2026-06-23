import { useState } from 'react';
import { Scan } from 'lucide-react';
import TopBar from '../components/TopBar';
import StatusBadge from '../components/StatusBadge';
import { useApp } from '../context/AppContext';
import type { BodyArea } from '../types';

const BODY_AREA_LABELS: Record<BodyArea, string> = {
  'skin-fur': 'Skin & Fur',
  eyes: 'Eye Scan',
  ears: 'Ear Scan',
  paws: 'Paw Scan',
  'mouth-teeth': 'Dental Scan',
  stool: 'Stool Analysis',
  vomit: 'Vomit Analysis',
  wound: 'Wound Scan',
  other: 'General Scan',
};

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function HealthHistoryPage() {
  const { pets, diagnosticResults, getPet, navigateToDiagnosticDetail } = useApp();
  const [petFilter, setPetFilter] = useState<string>('all');

  const filtered = diagnosticResults
    .filter((d) => petFilter === 'all' || d.petId === petFilter)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="Health History" />
      <main className="flex-1 px-4 py-4 pb-24 space-y-4">
        {/* Pet filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          <button
            onClick={() => setPetFilter('all')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              petFilter === 'all'
                ? 'bg-sky-500 text-white border-sky-500'
                : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
            }`}
          >
            All Pets
          </button>
          {pets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setPetFilter(pet.id)}
              className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                petFilter === pet.id
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
              }`}
            >
              <img src={pet.photo} alt={pet.name} className="w-4 h-4 rounded-full object-cover" />
              {pet.name}
            </button>
          ))}
        </div>

        {/* Results feed */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Scan size={32} strokeWidth={1.5} className="mb-2" />
            <p className="text-sm">No diagnostic results yet</p>
            <p className="text-xs mt-1">Run an AI Diagnostic to see history here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((result) => {
              const pet = getPet(result.petId);
              return (
                <button
                  key={result.id}
                  onClick={() => navigateToDiagnosticDetail(result.id)}
                  className="w-full bg-white rounded-2xl shadow-card p-4 flex items-start gap-3 text-left hover:shadow-card-md transition-shadow"
                >
                  {/* Pet photo */}
                  {pet && (
                    <img
                      src={pet.photo}
                      alt={pet.name}
                      className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                    />
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-slate-800">{pet?.name}</p>
                      <span className="text-[11px] text-slate-400 flex-shrink-0">{fmtDate(result.date)}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">AI Diagnostic &middot; {BODY_AREA_LABELS[result.bodyArea]}</p>
                    <p className="text-sm font-medium text-slate-700 mt-1 truncate">{result.possibleIssue}</p>
                    <div className="mt-1.5">
                      <StatusBadge
                        label={result.urgency === 'low' ? 'Low' : result.urgency === 'medium' ? 'Medium' : 'High'}
                        variant="urgency"
                        urgency={result.urgency}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
