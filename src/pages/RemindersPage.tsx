import { useState } from 'react';
import TopBar from '../components/TopBar';
import ReminderCard from '../components/ReminderCard';
import { useApp } from '../context/AppContext';

type ReminderType = 'therapy' | 'vaccine' | 'medication' | 'checkup' | 'appointment';

const PET_FILTERS = ['All', 'Luna', 'Rocky', 'Micio'] as const;
const TYPE_FILTERS: { value: ReminderType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'vaccine', label: 'Vaccines' },
  { value: 'therapy', label: 'Therapy' },
  { value: 'medication', label: 'Meds' },
  { value: 'checkup', label: 'Checkups' },
];

export default function RemindersPage() {
  const { reminders, pets, getPet } = useApp();
  const [petFilter, setPetFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<ReminderType | 'all'>('all');

  const filtered = reminders.filter((r) => {
    const pet = getPet(r.petId);
    const matchPet = petFilter === 'All' || pet?.name === petFilter;
    const matchType = typeFilter === 'all' || r.type === typeFilter;
    return matchPet && matchType;
  });

  const pending = filtered.filter((r) => !r.done);
  const done = filtered.filter((r) => r.done);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="Reminders" />
      <main className="flex-1 px-4 py-4 pb-24 space-y-4">
        {/* Filters */}
        <div className="space-y-4">
          {/* Pet filter */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-1">Pets</p>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
              {PET_FILTERS.map((name) => {
                const pet = pets.find((p) => p.name === name);
                const active = petFilter === name;
                return (
                  <button
                    key={name}
                    onClick={() => setPetFilter(name)}
                    className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                      active
                        ? 'bg-sky-500 text-white border-sky-500'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                    }`}
                  >
                    {pet && (
                      <img src={pet.photo} alt={pet.name} className="w-4 h-4 rounded-full object-cover" />
                    )}
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Type filter */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-1">Reminder Type</p>
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
              {TYPE_FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setTypeFilter(value)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    typeFilter === value
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {pending.length > 0 && (
          <section className="space-y-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1">
              Upcoming · {pending.length}
            </p>
            {pending.map((r) => (
              <ReminderCard key={r.id} reminder={r} pet={getPet(r.petId)} showPet />
            ))}
          </section>
        )}

        {done.length > 0 && (
          <section className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide px-1">
              Completed · {done.length}
            </p>
            {done.map((r) => (
              <ReminderCard key={r.id} reminder={r} pet={getPet(r.petId)} showPet />
            ))}
          </section>
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <p className="text-sm">No reminders found</p>
            <p className="text-xs mt-1">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
