import { Calendar, Clock, CheckCircle, Pill } from 'lucide-react';
import TopBar from '../../components/TopBar';
import { useApp } from '../../context/AppContext';
import type { Therapy } from '../../types';

function TherapyCard({ therapy }: { therapy: Therapy }) {
  const isActive = therapy.status === 'active';

  function daysLeft(): string | null {
    if (!therapy.endDate) return null;
    const today = new Date('2026-06-17');
    const end = new Date(therapy.endDate);
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'Ended';
    if (diff === 0) return 'Ends today';
    return `${diff} days left`;
 }

  const daysLeftStr = daysLeft();

  return (
    <div className={`bg-white rounded-2xl shadow-card p-4 ${!isActive ? 'opacity-70' : ''}`}>
   <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
      isActive ? 'bg-violet-50' : 'bg-slate-100'
          }`}>
      <Pill size={18} className={isActive ? 'text-violet-500' : 'text-slate-400'} strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 leading-snug">{therapy.name}</p>
            {therapy.medication && (
              <p className="text-xs text-slate-500 mt-0.5">{therapy.medication}</p>
            )}
          </div>
        </div>
        <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
     isActive
            ? 'bg-violet-50 text-violet-700 border border-violet-200'
            : 'bg-slate-100 text-slate-500 border border-slate-200'
        }`}>
     {isActive ? 'Active' : 'Completed'}
        </span>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Pill size={12} className="text-slate-400" strokeWidth={2} />
          <span className="font-medium">{therapy.dosage}</span>
          <span className="text-slate-300">·</span>
          <span>{therapy.frequency}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar size={12} className="text-slate-400" strokeWidth={2} />
            <span>Started {therapy.startDate}</span>
          </div>
          {therapy.endDate && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock size={12} className="text-slate-400" strokeWidth={2} />
              <span className={daysLeftStr === 'Ended' ? 'text-slate-400' : daysLeftStr?.includes('days left') ? 'text-amber-600 font-medium' : 'text-slate-500'}>
                {daysLeftStr}
              </span>
            </div>
          )}
        </div>
      </div>

      {therapy.notes && (
        <div className="mt-3 bg-slate-50 rounded-xl px-3 py-2">
          <p className="text-xs text-slate-500 leading-relaxed">{therapy.notes}</p>
        </div>
      )}
    </div>
  );
}

export default function TherapiesPage() {
  const { getSelectedPet, getPetTherapies } = useApp();
  const pet = getSelectedPet();
  if (!pet) return null;

  const therapies = getPetTherapies(pet.id);
  const active = therapies.filter((t) => t.status === 'active');
  const completed = therapies.filter((t) => t.status === 'completed');

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="Therapies" showBack subtitle={pet.name} />
      <main className="flex-1 px-4 py-4 pb-24 space-y-4 overflow-y-auto">

        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-violet-600">{active.length}</p>
            <p className="text-xs font-medium text-violet-500 mt-0.5">Active</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-center">
            <p className="text-2xl font-bold text-slate-500">{completed.length}</p>
            <p className="text-xs font-medium text-slate-400 mt-0.5">Completed</p>
          </div>
        </div>

        {active.length > 0 && (
          <section className="space-y-3">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide px-1">Active Therapies</p>
            {active.map((t) => <TherapyCard key={t.id} therapy={t} />)}
          </section>
        )}

        {completed.length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <CheckCircle size={14} className="text-slate-400" strokeWidth={2} />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Completed</p>
            </div>
            {completed.map((t) => <TherapyCard key={t.id} therapy={t} />)}
          </section>
        )}

        {therapies.length === 0 && (
          <div className="bg-white rounded-2xl shadow-card px-4 py-12 text-center">
            <p className="text-sm text-slate-400">No therapy records for {pet.name}</p>
          </div>
        )}
      </main>
    </div>
  );
}
