import { useState, useRef } from 'react';
import { Camera, X, Plus, Trash2, Dog, Cat, FileText, FlaskConical, Pill, Syringe } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useApp } from '../context/AppContext';
import type { Pet } from '../types';

const ACCENT_COLORS: Pet['accentColor'][] = ['sky', 'amber', 'emerald', 'violet', 'rose'];
const PEXELS_DEFAULTS = {
  dog: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
  cat: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=400',
};

function calcAge(dob: string): number {
  if (!dob) return 0;
  const diff = Date.now() - new Date(dob).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)));
}

function nextAccentColor(pets: Pet[]): Pet['accentColor'] {
  const used = pets.map((p) => p.accentColor);
  return ACCENT_COLORS.find((c) => !used.includes(c)) ?? ACCENT_COLORS[pets.length % ACCENT_COLORS.length];
}

interface FormState {
  name: string;
  species: 'dog' | 'cat';
  breed: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  weight: string;
  sterilized: boolean;
  knownDiseases: string;
  allergies: string[];
  allergyInput: string;
  activeMedications: string;
  currentFood: string;
  vetNotes: string;
}

function initForm(pet?: Pet): FormState {
  return {
    name: pet?.name ?? '',
    species: pet?.species ?? 'dog',
    breed: pet?.breed ?? '',
    dateOfBirth: pet?.dateOfBirth ?? '',
    gender: pet?.gender ?? 'male',
    weight: pet?.weight ? String(pet.weight) : '',
    sterilized: pet?.sterilized ?? false,
    knownDiseases: pet?.knownDiseases ?? '',
    allergies: pet?.allergies ?? [],
    allergyInput: '',
    activeMedications: pet?.activeMedications ?? '',
    currentFood: pet?.currentFood ?? '',
    vetNotes: pet?.vetNotes ?? '',
  };
}

function ToggleChip({ value, active, onClick }: { value: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
        active
          ? 'bg-sky-500 text-white border-sky-500'
          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
      }`}
    >
      {value}
    </button>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
      </div>
      <div className="px-4 py-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-600 block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all';
const textareaCls = `${inputCls} resize-none`;

export default function AddEditPetPage() {
  const { currentScreen, getSelectedPet, pets, addPet, updatePet, deletePet, navigateToPet, setActiveTab } = useApp();
  const isEdit = currentScreen === 'edit-pet';
  const existing = isEdit ? getSelectedPet() : undefined;

  const [form, setForm] = useState<FormState>(() => initForm(existing));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function addAllergy() {
    const tag = form.allergyInput.trim();
    if (!tag || form.allergies.includes(tag)) return;
    setForm((f) => ({ ...f, allergies: [...f.allergies, tag], allergyInput: '' }));
  }

  function removeAllergy(tag: string) {
    setForm((f) => ({ ...f, allergies: f.allergies.filter((a) => a !== tag) }));
  }

  function validate(): boolean {
    const errs: typeof errors = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.breed.trim()) errs.breed = 'Breed is required.';
    const w = parseFloat(form.weight);
    if (!form.weight || isNaN(w) || w <= 0) errs.weight = 'Enter a valid weight.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    const age = form.dateOfBirth ? calcAge(form.dateOfBirth) : (existing?.age ?? 0);
    const pet: Pet = {
      id: existing?.id ?? `pet-${Date.now()}`,
      name: form.name.trim(),
      species: form.species,
      breed: form.breed.trim(),
      dateOfBirth: form.dateOfBirth || undefined,
      age,
      weight: parseFloat(form.weight),
      gender: form.gender,
      sterilized: form.sterilized,
      photo: existing?.photo ?? PEXELS_DEFAULTS[form.species],
      accentColor: existing?.accentColor ?? nextAccentColor(pets),
      knownDiseases: form.knownDiseases.trim() || undefined,
      allergies: form.allergies.length > 0 ? form.allergies : undefined,
      activeMedications: form.activeMedications.trim() || undefined,
      currentFood: form.currentFood.trim() || undefined,
      vetNotes: form.vetNotes.trim() || undefined,
    };

    if (isEdit) {
      updatePet(pet);
    } else {
      addPet(pet);
    }
    navigateToPet(pet.id);
  }

  function handleDelete() {
    if (!existing) return;
    deletePet(existing.id);
    setActiveTab('pets');
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title={isEdit ? 'Edit Pet Profile' : 'New Pet'} showBack subtitle={isEdit ? existing?.name : undefined} />

      <main className="flex-1 px-4 py-4 pb-32 space-y-4 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl px-4 py-4">
          <p className="text-white font-bold text-base leading-tight">Create a health profile for this pet</p>
          <p className="text-white/75 text-xs mt-1 leading-relaxed">
            Each pet gets its own dashboard, timeline, diagnostics, nutrition, therapies, vaccines and reminders.
          </p>
        </div>

        {/* Photo placeholder */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative w-24 h-24 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 hover:border-sky-400 hover:bg-sky-50 transition-all overflow-hidden"
          >
            {existing?.photo ? (
              <img src={existing.photo} alt="" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <Camera size={22} className="text-slate-400" strokeWidth={1.5} />
                <span className="text-[10px] font-semibold text-slate-400">Add Photo</span>
              </>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />
        </div>

        {/* Identity */}
        <SectionCard title="Identity">
          <Field label="Pet name">
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="e.g. Luna"
              className={`${inputCls} ${errors.name ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </Field>

          <Field label="Species">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => set('species', 'dog')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  form.species === 'dog'
                    ? 'bg-sky-500 text-white border-sky-500'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <Dog size={16} strokeWidth={2} />
                Dog
              </button>
              <button
                type="button"
                onClick={() => set('species', 'cat')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  form.species === 'cat'
                    ? 'bg-sky-500 text-white border-sky-500'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <Cat size={16} strokeWidth={2} />
                Cat
              </button>
            </div>
          </Field>

          <Field label="Breed">
            <input
              type="text"
              value={form.breed}
              onChange={(e) => set('breed', e.target.value)}
              placeholder="e.g. Labrador"
              className={`${inputCls} ${errors.breed ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
            />
            {errors.breed && <p className="text-xs text-red-500 mt-1">{errors.breed}</p>}
          </Field>
        </SectionCard>

        {/* Physical */}
        <SectionCard title="Physical Profile">
          <Field label="Date of birth">
            <input
              type="date"
              value={form.dateOfBirth}
              onChange={(e) => set('dateOfBirth', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className={inputCls}
            />
            {form.dateOfBirth && (
              <p className="text-xs text-slate-500 mt-1">Age: {calcAge(form.dateOfBirth)} year{calcAge(form.dateOfBirth) !== 1 ? 's' : ''}</p>
            )}
          </Field>

          <Field label="Sex">
            <div className="flex gap-2">
              <ToggleChip value="Male" active={form.gender === 'male'} onClick={() => set('gender', 'male')} />
              <ToggleChip value="Female" active={form.gender === 'female'} onClick={() => set('gender', 'female')} />
            </div>
          </Field>

          <Field label="Weight (kg)">
            <input
              type="number"
              value={form.weight}
              onChange={(e) => set('weight', e.target.value)}
              placeholder="e.g. 22"
              min="0.1"
              step="0.1"
              className={`${inputCls} ${errors.weight ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : ''}`}
            />
            {errors.weight && <p className="text-xs text-red-500 mt-1">{errors.weight}</p>}
          </Field>

          <Field label="Sterilized">
            <div className="flex gap-2">
              <ToggleChip value="Yes" active={form.sterilized} onClick={() => set('sterilized', true)} />
              <ToggleChip value="No" active={!form.sterilized} onClick={() => set('sterilized', false)} />
            </div>
          </Field>
        </SectionCard>

        {/* Medical History */}
        <SectionCard title="Medical History">
          <Field label="Known diseases">
            <textarea
              rows={2}
              value={form.knownDiseases}
              onChange={(e) => set('knownDiseases', e.target.value)}
              placeholder="e.g. Hip dysplasia, atopic dermatitis…"
              className={textareaCls}
            />
          </Field>

          <Field label="Allergies">
            <div className="flex gap-2">
              <input
                type="text"
                value={form.allergyInput}
                onChange={(e) => set('allergyInput', e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAllergy(); } }}
                placeholder="e.g. Chicken, pollen…"
                className={`${inputCls} flex-1`}
              />
              <button
                type="button"
                onClick={addAllergy}
                className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center hover:bg-sky-600 flex-shrink-0"
              >
                <Plus size={16} className="text-white" strokeWidth={2.5} />
              </button>
            </div>
            {form.allergies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {form.allergies.map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {tag}
                    <button type="button" onClick={() => removeAllergy(tag)} className="hover:text-rose-900">
                      <X size={11} strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Field>

          <Field label="Active medications">
            <textarea
              rows={2}
              value={form.activeMedications}
              onChange={(e) => set('activeMedications', e.target.value)}
              placeholder="e.g. Apoquel 10mg once daily…"
              className={textareaCls}
            />
          </Field>
        </SectionCard>

        {/* Nutrition & Care */}
        <SectionCard title="Nutrition & Care">
          <Field label="Current food">
            <input
              type="text"
              value={form.currentFood}
              onChange={(e) => set('currentFood', e.target.value)}
              placeholder="e.g. Royal Canin Labrador Adult"
              className={inputCls}
            />
          </Field>
        </SectionCard>

        {/* Vet Notes */}
        <SectionCard title="Veterinarian Notes">
          <textarea
            rows={3}
            value={form.vetNotes}
            onChange={(e) => set('vetNotes', e.target.value)}
            placeholder="Any notes from your vet, previous diagnoses, lab results summary…"
            className={textareaCls}
          />
        </SectionCard>

        {/* Documents */}
        <SectionCard title="Documents">
          <p className="text-xs text-slate-400 -mt-2 mb-1">Uploaded documents appear in this pet's Health History.</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Vaccination card', Icon: Syringe, color: 'text-violet-400', bg: 'bg-violet-50' },
              { label: 'Blood test', Icon: FlaskConical, color: 'text-sky-400', bg: 'bg-sky-50' },
              { label: 'Prescription', Icon: Pill, color: 'text-rose-400', bg: 'bg-rose-50' },
              { label: 'Health document', Icon: FileText, color: 'text-amber-400', bg: 'bg-amber-50' },
            ].map(({ label, Icon, color, bg }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50">
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon size={18} className={color} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-medium text-slate-500 text-center leading-tight">{label}</span>
                <span className="text-[9px] text-slate-300 font-semibold uppercase tracking-wide">Coming soon</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Delete (edit mode only) */}
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} strokeWidth={2} />
            Remove Pet
          </button>
        )}
      </main>

      {/* Sticky Save button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 py-4 bg-slate-50/95 backdrop-blur-sm border-t border-slate-200">
        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-sky-500 text-white font-bold text-sm py-4 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-all shadow-lg"
        >
          {isEdit ? 'Save Changes' : 'Create Pet Profile'}
        </button>
      </div>
    </div>
  );
}
