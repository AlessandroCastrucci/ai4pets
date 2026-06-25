import { PlusCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import PetCard from '../components/PetCard';
import { useApp } from '../context/AppContext';

const TODAY = '2026-06-17';
const IN_10_DAYS = '2026-06-27';

// Demo toggle: 'one' = show only first pet, 'three' = show all pets
const DEMO_PETS_MODE: 'one' | 'three' = 'one';

function getPetBadge(petId: string, reminders: ReturnType<typeof useApp>['reminders'], vaccines: ReturnType<typeof useApp>['vaccines']) {
  const todayReminder = reminders.find(
    (r) => r.petId === petId && !r.done && r.datetime.startsWith(TODAY),
  );
  if (todayReminder) return { label: `${todayReminder.title} today`, color: 'amber' as const };

  const soonVaccine = vaccines.find(
    (v) => v.petId === petId && v.nextDue === IN_10_DAYS,
  );
  if (soonVaccine) return { label: `${soonVaccine.name} in 10 days`, color: 'sky' as const };

  return null;
}

export default function MyPetsPage() {
  const { pets, reminders, vaccines, navigateToAddPet } = useApp();
  const visiblePets = DEMO_PETS_MODE === 'one' ? pets.slice(0, 1) : pets;

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="My Pets" />
      <main className="flex-1 px-4 py-4 space-y-4 pb-24">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide px-1">
          {visiblePets.length} {visiblePets.length === 1 ? 'pet' : 'pets'}
        </p>
        {visiblePets.map((pet) => {
          const badge = getPetBadge(pet.id, reminders, vaccines);
          return (
            <PetCard
              key={pet.id}
              pet={pet}
              badge={badge?.label}
              badgeColor={badge?.color}
            />
          );
        })}
        <div className="pt-2">
          <button
            onClick={navigateToAddPet}
            className="w-full border-2 border-dashed border-slate-200 rounded-2xl py-5 flex flex-col items-center gap-2 text-slate-400 hover:border-sky-300 hover:text-sky-400 hover:bg-sky-50/50 active:bg-sky-50 transition-all"
          >
            <PlusCircle size={24} strokeWidth={1.5} />
            <span className="text-sm font-medium">Add a new pet</span>
          </button>
        </div>
      </main>
    </div>
  );
}
