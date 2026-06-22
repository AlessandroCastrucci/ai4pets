import { Dog, Cat, Scan, Stethoscope, Utensils, Syringe, HeartPulse, Bell, Clock, Pencil, ClipboardList, ShieldCheck, ChevronRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import ReminderCard from '../components/ReminderCard';
import StatusBadge from '../components/StatusBadge';
import { useApp } from '../context/AppContext';

const GRID_FEATURES = [
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
    id: 'health-history' as const,
    label: 'Health History',
    sublabel: 'Medical records & docs',
    Icon: ClipboardList,
    bg: 'bg-teal-50',
    iconColor: 'text-teal-500',
    border: 'border-teal-100',
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
  {
    id: 'parasite-protection' as const,
    label: 'Parasite Protection',
    sublabel: 'Flea, tick & worm reminders',
    Icon: ShieldCheck,
    bg: 'bg-lime-50',
    iconColor: 'text-lime-600',
    border: 'border-lime-100',
  },
];

function getVaccineStatus(nextDue: string): 'Overdue' | 'Due Soon' | 'Up to Date' {
  const today = new Date('2026-06-18');
  const due = new Date(nextDue);
  const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return 'Overdue';
  if (diff <= 30) return 'Due Soon';
  return 'Up to Date';
}

export default function PetDashboard() {
  const {
    getSelectedPet,
    navigateToFeature,
    navigateToEditPet,
    navigateToHealthHistory,
    getPetReminders,
    getPetVaccines,
    getPetDiagnostics,
  } = useApp();
  const pet = getSelectedPet();

  if (!pet) return null;

  const reminders = getPetReminders(pet.id).filter((r) => !r.done).slice(0, 2);
  const vaccines = getPetVaccines(pet.id);
  const diagnostics = getPetDiagnostics(pet.id);
  const SpeciesIcon = pet.species === 'dog' ? Dog : Cat;

  const vaccineStatuses = vaccines.map((v) => getVaccineStatus(v.nextDue));
  const vaccineAlertLabel = vaccineStatuses.includes('Overdue')
    ? 'Overdue'
    : vaccineStatuses.includes('Due Soon')
    ? 'Due Soon'
    : vaccines.length > 0
    ? 'Up to Date'
    : '\u2014';

  function handleFeatureClick(id: string) {
    if (id === 'health-history') {
      navigateToHealthHistory();
    } else if (id === 'parasite-protection') {
      navigateToFeature('vaccines');
    } else {
      navigateToFeature(id as Parameters<typeof navigateToFeature>[0]);
    }
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar
        title={pet.name}
        showBack
        subtitle={pet.breed}
        rightSlot={
          <button
            onClick={navigateToEditPet}
            className="flex items-center gap-1.5 text-sky-500 text-sm font-medium py-1 px-2 rounded-lg hover:bg-sky-50"
          >
            <Pencil size={15} strokeWidth={2} />
            Edit
          </button>
        }
      />
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
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100 overflow-x-auto no-scrollbar">
              <div className="text-center flex-shrink-0">
                <p className="text-lg font-bold text-slate-800">{pet.age}</p>
                <p className="text-[11px] text-slate-500">years</p>
              </div>
              <div className="w-px h-8 bg-slate-100 flex-shrink-0" />
              <div className="text-center flex-shrink-0">
                <p className="text-lg font-bold text-slate-800">{pet.weight}</p>
                <p className="text-[11px] text-slate-500">kg</p>
              </div>
              <div className="w-px h-8 bg-slate-100 flex-shrink-0" />
              <div className="text-center flex-shrink-0">
                <p className="text-sm font-semibold text-slate-800 capitalize">{pet.gender}</p>
                <p className="text-[11px] text-slate-500">sex</p>
              </div>
              {pet.sterilized !== undefined && (
                <>
                  <div className="w-px h-8 bg-slate-100 flex-shrink-0" />
                  <div className="text-center flex-shrink-0">
                    <p className="text-sm font-semibold text-slate-800">{pet.sterilized ? 'Yes' : 'No'}</p>
                    <p className="text-[11px] text-slate-500">sterilized</p>
                  </div>
                </>
              )}
              <div className="w-px h-8 bg-slate-100 flex-shrink-0" />
              <div className="text-center flex-shrink-0">
                <StatusBadge label={vaccineAlertLabel} variant="vaccine" />
                <p className="text-[11px] text-slate-500 mt-0.5">vaccines</p>
              </div>
            </div>

            {(pet.knownDiseases || (pet.allergies && pet.allergies.length > 0) || pet.activeMedications || pet.currentFood) && (
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                {pet.knownDiseases && (
                  <div className="flex gap-2">
                    <span className="text-[11px] font-semibold text-slate-400 w-24 flex-shrink-0">Diseases</span>
                    <span className="text-[11px] text-slate-600">{pet.knownDiseases}</span>
                  </div>
                )}
                {pet.allergies && pet.allergies.length > 0 && (
                  <div className="flex gap-2 items-start">
                    <span className="text-[11px] font-semibold text-slate-400 w-24 flex-shrink-0">Allergies</span>
                    <div className="flex flex-wrap gap-1">
                      {pet.allergies.map((a) => (
                        <span key={a} className="text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded-full">{a}</span>
                      ))}
                    </div>
                  </div>
                )}
                {pet.activeMedications && (
                  <div className="flex gap-2">
                    <span className="text-[11px] font-semibold text-slate-400 w-24 flex-shrink-0">Medications</span>
                    <span className="text-[11px] text-slate-600">{pet.activeMedications}</span>
                  </div>
                )}
                {pet.currentFood && (
                  <div className="flex gap-2">
                    <span className="text-[11px] font-semibold text-slate-400 w-24 flex-shrink-0">Food</span>
                    <span className="text-[11px] text-slate-600">{pet.currentFood}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Featured AI Diagnostics card */}
        <button
          onClick={() => navigateToFeature('ai-diagnostics')}
          className="w-full bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 flex items-center gap-4 shadow-card hover:shadow-card-md active:scale-[0.99] transition-all text-left"
        >
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <Scan size={28} className="text-white" strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-bold text-white">AI Diagnostics</p>
            <p className="text-[13px] text-white/75 mt-0.5 leading-snug">
              Take a photo and get AI-powered health insights for {pet.name}.
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <ChevronRight size={18} className="text-white/60" />
            <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wide">Start</span>
          </div>
        </button>

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

        {/* Health features grid */}
        <section>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-3">Health Features</p>
          <div className="grid grid-cols-2 gap-3">
            {GRID_FEATURES.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(feature.id)}
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

        {/* Recent AI diagnostics */}
        {diagnostics.length > 0 && (
          <section>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-3">Recent Diagnostics</p>
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
