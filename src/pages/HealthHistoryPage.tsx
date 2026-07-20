import { useState } from 'react';
import { Scan, CheckCircle, Syringe, Pill, Stethoscope, ShieldCheck } from 'lucide-react';
import TopBar from '../components/TopBar';
import StatusBadge from '../components/StatusBadge';
import { useApp } from '../context/AppContext';
import type { BodyArea, HealthEvent, InsightResult } from '../types';

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

const EVENT_TYPE_CONFIG: Record<string, { Icon: typeof Pill; color: string; bg: string; label: string }> = {
  therapy: { Icon: Pill, color: 'text-violet-500', bg: 'bg-violet-50', label: 'Therapy Completed' },
  vaccine: { Icon: Syringe, color: 'text-sky-500', bg: 'bg-sky-50', label: 'Vaccine Completed' },
  medication: { Icon: Pill, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Medication Completed' },
  checkup: { Icon: Stethoscope, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Checkup Completed' },
  parasite: { Icon: ShieldCheck, color: 'text-lime-600', bg: 'bg-lime-50', label: 'Parasite Protection Completed' },
};

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

type HistoryItem =
  | { kind: 'insight'; date: string; data: InsightResult }
  | { kind: 'event'; date: string; data: HealthEvent };

export default function HealthHistoryPage() {
  const { pets, insightResults, healthEvents, getPet, navigateToInsightDetail } = useApp();
  const [petFilter, setPetFilter] = useState<string>('all');

  const items: HistoryItem[] = [
    ...insightResults.map((d): HistoryItem => ({ kind: 'insight', date: d.date, data: d })),
    ...healthEvents.map((e): HistoryItem => ({ kind: 'event', date: e.completedDate, data: e })),
  ]
    .filter((item) => petFilter === 'all' || item.data.petId === petFilter)
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
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Scan size={32} strokeWidth={1.5} className="mb-2" />
            <p className="text-sm">No health history yet</p>
            <p className="text-xs mt-1">Complete reminders or generate AI insights to build your pet&rsquo;s history</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => {
              if (item.kind === 'insight') {
                const result = item.data;
                const pet = getPet(result.petId);
                return (
                  <button
                    key={`d-${result.id}`}
                    onClick={() => navigateToInsightDetail(result.id)}
                    className="w-full bg-white rounded-2xl shadow-card p-4 flex items-start gap-3 text-left hover:shadow-card-md transition-shadow"
                  >
                    {pet && (
                      <img
                        src={pet.photo}
                        alt={pet.name}
                        className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-bold text-slate-800">{pet?.name}</p>
                        <span className="text-[11px] text-slate-400 flex-shrink-0">{fmtDate(result.date)}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">AI Insight &middot; {BODY_AREA_LABELS[result.bodyArea]}</p>
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
              }

              const event = item.data;
              const pet = getPet(event.petId);
              const typeConfig = EVENT_TYPE_CONFIG[event.type] ?? EVENT_TYPE_CONFIG.checkup;
              return (
                <div
                  key={`e-${event.id}`}
                  className="w-full bg-white rounded-2xl shadow-card p-4 flex items-start gap-3"
                >
                  <div className={`w-11 h-11 rounded-xl ${typeConfig.bg} flex items-center justify-center flex-shrink-0`}>
                    <typeConfig.Icon size={20} className={typeConfig.color} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-slate-800">{event.title}</p>
                      <span className="text-[11px] text-slate-400 flex-shrink-0">{fmtDate(event.completedDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {pet && (
                        <>
                          <img src={pet.photo} alt={pet.name} className="w-4 h-4 rounded-full object-cover" />
                          <span className="text-xs text-slate-500">{pet.name}</span>
                          <span className="text-slate-300 text-xs">&middot;</span>
                        </>
                      )}
                      <span className="text-xs text-slate-400">{fmtTime(event.scheduledDatetime)}</span>
                      <span className="text-slate-300 text-xs">&middot;</span>
                      <span className="text-xs text-slate-400">{typeConfig.label.replace(' Completed', '')}</span>
                    </div>
                    {event.notes && (
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{event.notes}</p>
                    )}
                    <div className="mt-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle size={10} strokeWidth={2.5} />
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
