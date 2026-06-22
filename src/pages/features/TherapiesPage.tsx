import { useState } from 'react';
import { Calendar, Clock, CheckCircle, Pill, Pencil, Plus, X, Check, Bell, Trash2 } from 'lucide-react';
import TopBar from '../../components/TopBar';
import PetSwitchBar from '../../components/PetSwitchBar';
import { useApp } from '../../context/AppContext';
import type { Therapy } from '../../types';

function TherapyCard({ therapy, onEdit }: { therapy: Therapy; onEdit?: () => void }) {
  const isActive = therapy.status === 'active';

  function daysLeft(): string | null {
    if (!therapy.endDate) return null;
    const today = new Date('2026-06-18');
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
        <div className="flex items-center gap-2">
          <span className={`flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
            isActive
              ? 'bg-violet-50 text-violet-700 border border-violet-200'
              : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}>
            {isActive ? 'Active' : 'Completed'}
          </span>
          {onEdit && (
            <button onClick={onEdit} className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-slate-100">
              <Pencil size={13} className="text-slate-400" strokeWidth={2} />
            </button>
          )}
        </div>
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

const FREQUENCY_OPTIONS = ['Once daily', 'Twice daily', '3x daily', 'Every other day', 'Weekly', 'As needed'];

interface TherapyForm {
  name: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
  notes: string;
}

const EMPTY_FORM: TherapyForm = {
  name: '',
  medication: '',
  dosage: '',
  frequency: 'Once daily',
  startDate: '',
  endDate: '',
  status: 'active',
  notes: '',
};

export default function TherapiesPage() {
  const { getSelectedPet, getPetTherapies, addTherapy, updateTherapy, removeTherapy, addReminder } = useApp();
  const pet = getSelectedPet();
  const [editing, setEditing] = useState<Therapy | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<TherapyForm>(EMPTY_FORM);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  if (!pet) return null;

  const therapies = getPetTherapies(pet.id);
  const active = therapies.filter((t) => t.status === 'active');
  const completed = therapies.filter((t) => t.status === 'completed');

  function startAdd() {
    setForm(EMPTY_FORM);
    setReminderEnabled(true);
    setAdding(true);
    setEditing(null);
  }

  function startEdit(therapy: Therapy) {
    setForm({
      name: therapy.name,
      medication: therapy.medication ?? '',
      dosage: therapy.dosage,
      frequency: therapy.frequency,
      startDate: therapy.startDate,
      endDate: therapy.endDate ?? '',
      status: therapy.status,
      notes: therapy.notes ?? '',
    });
    setReminderEnabled(true);
    setEditing(therapy);
    setAdding(false);
  }

  function handleSave() {
    if (!form.name || !form.dosage) return;
    if (editing) {
      updateTherapy({
        ...editing,
        name: form.name,
        medication: form.medication || undefined,
        dosage: form.dosage,
        frequency: form.frequency,
        startDate: form.startDate,
        endDate: form.endDate || undefined,
        status: form.status,
        notes: form.notes || undefined,
      });
    } else {
      const id = Date.now().toString();
      addTherapy({
        id,
        petId: pet!.id,
        name: form.name,
        medication: form.medication || undefined,
        dosage: form.dosage,
        frequency: form.frequency,
        startDate: form.startDate || '2026-06-22',
        endDate: form.endDate || undefined,
        status: form.status,
        notes: form.notes || undefined,
      });
    }
    if (reminderEnabled) {
      addReminder({
        id: `ther-rem-${Date.now()}`,
        petId: pet!.id,
        type: 'medication',
        title: `${form.name} — ${form.dosage}`,
        datetime: form.startDate || '2026-06-22',
        done: false,
      });
    }
    setAdding(false);
    setEditing(null);
  }

  function handleDelete() {
    if (editing) {
      removeTherapy(editing.id);
      setEditing(null);
    }
  }

  function handleCancel() {
    setAdding(false);
    setEditing(null);
  }

  const showForm = adding || editing !== null;

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar
        title="Therapies"
        showBack
        subtitle={pet.name}
        rightSlot={
          !showForm ? (
            <button
              onClick={startAdd}
              className="flex items-center gap-1.5 text-sky-500 text-sm font-medium py-1 px-2 rounded-lg hover:bg-sky-50"
            >
              <Plus size={15} strokeWidth={2} />
              Add
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleCancel} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                <X size={16} className="text-slate-600" strokeWidth={2} />
              </button>
              <button onClick={handleSave} className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center hover:bg-sky-600">
                <Check size={16} className="text-white" strokeWidth={2.5} />
              </button>
            </div>
          )
        }
      />
      <PetSwitchBar />
      <main className="flex-1 px-4 py-4 pb-24 space-y-4 overflow-y-auto">
        {showForm ? (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-800">{editing ? 'Edit Therapy' : 'Add Therapy'} for {pet.name}</p>
            <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Therapy Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Anti-inflammatory"
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Medication</label>
                <input
                  value={form.medication}
                  onChange={(e) => setForm((f) => ({ ...f, medication: e.target.value }))}
                  placeholder="e.g. Meloxicam 1.5mg"
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Dosage</label>
                <input
                  value={form.dosage}
                  onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))}
                  placeholder="e.g. 1 tablet"
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-2">Frequency</label>
                <div className="flex flex-wrap gap-2">
                  {FREQUENCY_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setForm((f) => ({ ...f, frequency: opt }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                        form.frequency === opt
                          ? 'bg-sky-500 text-white border-sky-500'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1.5">Start Date</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                    className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 block mb-1.5">End Date</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                    className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-2">Status</label>
                <div className="flex gap-3">
                  {(['active', 'completed'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setForm((f) => ({ ...f, status: s }))}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                        form.status === s
                          ? 'bg-sky-500 text-white border-sky-500'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      {s === 'active' ? 'Active' : 'Completed'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Optional notes..."
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400 resize-none"
                  rows={2}
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-sm font-medium text-slate-700">Create Medication Reminder</p>
                  <p className="text-xs text-slate-400">Get notified for dosing</p>
                </div>
                <button
                  onClick={() => setReminderEnabled(!reminderEnabled)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${reminderEnabled ? 'bg-sky-500' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${reminderEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
            {editing && (
              <button
                onClick={handleDelete}
                className="w-full bg-red-50 border border-red-200 text-red-600 font-medium text-sm py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
              >
                <Trash2 size={15} strokeWidth={2} />
                Remove Therapy
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!form.name || !form.dosage}
              className="w-full bg-rose-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-rose-600 active:bg-rose-700 transition-colors disabled:opacity-40"
            >
              {editing ? 'Save Changes' : 'Add Therapy'}
            </button>
          </div>
        ) : (
          <>
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
                {active.map((t) => <TherapyCard key={t.id} therapy={t} onEdit={() => startEdit(t)} />)}
              </section>
            )}

            {completed.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <CheckCircle size={14} className="text-slate-400" strokeWidth={2} />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Completed</p>
                </div>
                {completed.map((t) => <TherapyCard key={t.id} therapy={t} onEdit={() => startEdit(t)} />)}
              </section>
            )}

            {therapies.length === 0 && (
              <div className="bg-white rounded-2xl shadow-card px-4 py-12 text-center">
                <p className="text-sm text-slate-400">No therapy records for {pet.name}</p>
              </div>
            )}

            <button
              onClick={startAdd}
              className="w-full bg-rose-50 border border-rose-200 text-rose-700 font-semibold text-sm py-3.5 rounded-2xl hover:bg-rose-100 transition-colors flex items-center justify-center gap-2"
            >
              <Bell size={16} strokeWidth={2} />
              Manage Therapy
            </button>
          </>
        )}
      </main>
    </div>
  );
}
