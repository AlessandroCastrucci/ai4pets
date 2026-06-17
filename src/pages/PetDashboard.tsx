import { Dog, Cat, Scan, Stethoscope, Utensils, Syringe, HeartPulse, Bell, Clock } from 'lucide-react';
import TopBar from '../components/TopBar';
import ReminderCard from '../components/ReminderCard';
import StatusBadge from '../components/StatusBadge';
import { useApp } from '../context/AppContext';

const FEATURES = [
  {
    id: 'ai-diagnostics' as const,
    label: 'AI Diagnostics',
    sublabel: 'Photo-based analysis',
    Icon: Scan,
    bg: 'bg-sky-50',
    iconColor: 'text-sky-500',
    border: 'border-sky-100',
  },
  {
    id: 'ai-checkup' as const,
    label: 'AI Checkup',
    sublabel: 'Monthly & annual',
    Icon: Stethoscope,
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    border: 'border-emerald-100',
  },
  {
    id: 'nutrition' as const,
    label: 'Nutrition',
    sublabel: 'Diet tracking',
    Icon: Utensils,
    bg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    border: 'border-amber-100',
  },
  {
    id: 'vaccines' as const,
    label: 'Vaccines',
    sublabel: 'Vaccination history',
    Icon: Syringe,
    bg: 'bg-violet-50',
    iconColor: 'text-violet-500',
    border: 'border-violet-100',
  },
  {
    id: 'therapies' as const,
    label: 'Therapies',
    sublabel: 'Treatments & meds',
    Icon: HeartPulse,
    bg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    border: 'border-rose-100',
  },
] as const;

function getVaccineStatus(nextDue: string): { label: string; color: 'amber' | 'emerald' | 'red' } {
  const today = new Date('2026-06-17');
  const due = new Date(nextDue);
  const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: 'Overdue', color: 'red' };
  if (diff <= 30) return { label: 'Due Soon', color: 'amber' };
  return { label: 'Up to Date', color: 'emerald' };
}

export default function PetDashboard() {
  const { getSelectedPet, navigateToFeature, getPetReminders, getPetVaccines, getPetDiagnostics } = useApp();
  const pet = getSelectedPet();

  if (!pet) return null;

  const reminders = getPetReminders(pet.id).filter((r) => !r.done).slice(0, 2);
  const vaccines = getPetVaccines(pet.id);
  const diagnostics = getPetDiagnostics(pet.id);
  const SpeciesIcon = pet.species === 'dog' ? Dog : Cat;

  const vaccineStatuses = vaccines.map((v) => getVaccineStatus(v.nextDue));
  const hasOverdue = vaccineStatuses.some((s) => s.label === 'Overdue');
  const hasDueSoon = vaccineStatuses.some((s) => s.label === 'Due Soon');
  const vaccineAlertLabel = hasOverdue ? 'Overdue' : hasDueSoon ? 'Due Soon' : 'Up to Date';

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title={pet.name} showBack subtitle={pet.breed} />

      <main className="flex-1 px-4 py-4 pb-24 space-y-5">
        {/* Pet profile card */}
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="h-28 bg-gradient-to-br from-sky-50 via-blue-50 to-violet-50 relative">
            <img
              src={pet.photo}
              alt={pet.name}
              className="absolute right-4 -bottom-8 w-28 h-28 rounded-2xl object-cover shadow-card-md ring-2 ring-white"
            />
          </div>
          <div className="px-4 pb-4 pt-10">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{pet.name}</h2>
                <p className="text-sm text-slate-500">{pet.breed}</p>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <SpeciesIcon size={14} className="text-slate-400" strokeWidth={2} />
                <span className="text-xs text-slate-500 capitalize">{pet.species}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
              <div className="text-center">
                <p className="text-lg font-bold text-slate-800">{pet.age}</p>
                <p className="text-[11px] text-slate-500">years</p>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div className="text-center">
                <p className="text-lg font-bold text-slate-800">{pet.weight}</p>
                <p className="text-[11px] text-slate-500">kg</p>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-800 capitalize">{pet.gender}</p>
                <p className="text-[11px] text-slate-500">gender</p>
              </div>
              <div className="w-px h-8 bg-slate-100" />
              <div className="text-center">
                <StatusBadge
                  label={vaccineAlertLabel}
                  variant="vaccine"
                />
                <p className="text-[11px] text-slate-500 mt-0.5">vaccines</p>
              </div>
            </div>
          </div>
        </div>

        {/* Health features grid */}
        <section>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-3">Health Features</p>
          <div className="grid grid-cols-2 gap-3">
            {FEATURES.map((feature) => (
              <button
                key={feature.id}
                onClick={() => navigateToFeature(feature.id)}
                className={`bg-white rounded-2xl shadow-card p-4 flex flex-col gap-2 border ${feature.border} hover:shadow-card-md active:scale-[0.98] transition-all text-left`}
              >
                <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center`}>
                  <feature.Icon size={20} className={feature.iconColor} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{feature.label}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{feature.sublabel}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Upcoming reminders */}
        {reminders.length > 0 && (
          <section>
            <div className="flex items-center justify-between px-1 mb-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Upcoming Reminders</p>
              <Bell size={14} className="text-slate-400" />
            </div>
            <div className="space-y-3">
              {reminders.map((r) => (
                <ReminderCard key={r.id} reminder={r} />
              ))}
            </div>
          </section>
        )}

        {/* Health timeline */}
        {diagnostics.length > 0 && (
          <section>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-3">Health Timeline</p>
            <div className="space-y-2">
              {diagnostics.slice(0, 3).map((d) => (
                <div key={d.id} className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    d.urgency === 'high' ? 'bg-red-400' : d.urgency === 'medium' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{d.possibleIssue}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock size={11} className="text-slate-400" />
                      <span className="text-xs text-slate-400">{d.date}</span>
                      <span className="text-slate-200 text-xs">·</span>
                      <span className="text-xs text-slate-400 capitalize">{d.bodyArea.replace('-', ' ')}</span>
                    </div>
                  </div>
                  <StatusBadge label={d.urgency} urgency={d.urgency} variant="urgency" />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
