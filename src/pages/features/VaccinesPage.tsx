import { CheckCircle, AlertTriangle, XCircle, Calendar } from 'lucide-react';
import TopBar from '../../components/TopBar';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';
import type { Vaccine } from '../../types';

function getVaccineStatus(nextDue: string): { label: string; urgency: 'low' | 'medium' | 'high' } {
  const today = new Date('2026-06-17');
  const due = new Date(nextDue);
  const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: 'Overdue', urgency: 'high' };
  if (diff <= 30) return { label: 'Due Soon', urgency: 'medium' };
  return { label: 'Up to Date', urgency: 'low' };
}

function daysUntil(dateStr: string): number {
  const today = new Date('2026-06-17');
  const date = new Date(dateStr);
  return Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function VaccineCard({ vaccine }: { vaccine: Vaccine }) {
  const { label, urgency } = getVaccineStatus(vaccine.nextDue);
  const days = daysUntil(vaccine.nextDue);
  const StatusIcon = urgency === 'low' ? CheckCircle : urgency === 'medium' ? AlertTriangle : XCircle;
  const iconColor = urgency === 'low' ? 'text-emerald-500' : urgency === 'medium' ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="bg-white rounded-2xl shadow-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
      urgency === 'low' ? 'bg-emerald-50' : urgency === 'medium' ? 'bg-amber-50' : 'bg-red-50'
          }`}>
      <StatusIcon size={18} className={iconColor} strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 leading-snug">{vaccine.name}</p>
            {vaccine.vet && <p className="text-xs text-slate-400 mt-0.5">{vaccine.vet}</p>}
          </div>
        </div>
        <StatusBadge label={label} variant="vaccine" />
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] text-slate-400 mb-0.5">Last administered</p>
          <div className="flex items-center gap-1.5">
            <Calendar size={11} className="text-slate-400" strokeWidth={2} />
            <p className="text-xs font-medium text-slate-700">{vaccine.dateAdministered}</p>
          </div>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 mb-0.5">Next due</p>
          <div className="flex items-center gap-1.5">
            <Calendar size={11} className={iconColor} strokeWidth={2} />
            <p className={`text-xs font-semibold ${iconColor}`}>
       {vaccine.nextDue}
              {days >= 0 && days <= 60 && (
                <span className="ml-1 text-[10px] font-normal">
                  {days === 0 ? '(today)' : `(in ${days}d)`}
        </span>
              )}
              {days < 0 && (
                <span className="ml-1 text-[10px] font-normal">({Math.abs(days)}d ago)</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {vaccine.notes && (
        <div className="mt-3 bg-slate-50 rounded-xl px-3 py-2">
          <p className="text-xs text-slate-500 leading-relaxed">{vaccine.notes}</p>
        </div>
      )}
    </div>
  );
}

export default function VaccinesPage() {
  const { getSelectedPet, getPetVaccines } = useApp();
  const pet = getSelectedPet();
  if (!pet) return null;

  const vaccines = getPetVaccines(pet.id);
  const sorted = [...vaccines].sort((a, b) => {
    const sa = getVaccineStatus(a.nextDue).urgency;
    const sb = getVaccineStatus(b.nextDue).urgency;
    const order = { high: 0, medium: 1, low: 2 };
    return order[sa] - order[sb];
  });

  const overdue = sorted.filter((v) => getVaccineStatus(v.nextDue).label === 'Overdue');
  const dueSoon = sorted.filter((v) => getVaccineStatus(v.nextDue).label === 'Due Soon');
  const upToDate = sorted.filter((v) => getVaccineStatus(v.nextDue).label === 'Up to Date');

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="Vaccines" showBack subtitle={pet.name} />
      <main className="flex-1 px-4 py-4 pb-24 space-y-4 overflow-y-auto">

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Overdue', count: overdue.length, bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
            { label: 'Due Soon', count: dueSoon.length, bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
            { label: 'Up to Date', count: upToDate.length, bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
          ].map(({ label, count, bg, text, border }) => (
            <div key={label} className={`${bg} border ${border} rounded-2xl p-3 text-center`}>
       <p className={`text-xl font-bold ${text}`}>{count}</p>
       <p className={`text-[11px] font-medium ${text} mt-0.5`}>{label}</p>
      </div>
          ))}
        </div>

        {overdue.length > 0 && (
          <section className="space-y-3">
            <p className="text-xs font-semibold text-red-600 uppercase tracking-wide px-1">Overdue</p>
            {overdue.map((v) => <VaccineCard key={v.id} vaccine={v} />)}
          </section>
        )}

        {dueSoon.length > 0 && (
          <section className="space-y-3">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide px-1">Due Soon</p>
            {dueSoon.map((v) => <VaccineCard key={v.id} vaccine={v} />)}
          </section>
        )}

        {upToDate.length > 0 && (
          <section className="space-y-3">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide px-1">Up to Date</p>
            {upToDate.map((v) => <VaccineCard key={v.id} vaccine={v} />)}
          </section>
        )}

        {vaccines.length === 0 && (
          <div className="bg-white rounded-2xl shadow-card px-4 py-12 text-center">
            <p className="text-sm text-slate-400">No vaccine records for {pet.name}</p>
          </div>
        )}
      </main>
    </div>
  );
}
