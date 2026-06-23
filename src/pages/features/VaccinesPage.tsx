import { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Calendar, Pencil, X, Check, Bell, Trash2 } from 'lucide-react';
import TopBar from '../../components/TopBar';
import PetSwitchBar from '../../components/PetSwitchBar';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';
import type { Vaccine } from '../../types';

function getVaccineStatus(nextDue: string): { label: string; urgency: 'low' | 'medium' | 'high' } {
  const today = new Date('2026-06-18');
  const due = new Date(nextDue);
  const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: 'Overdue', urgency: 'high' };
  if (diff <= 30) return { label: 'Due Soon', urgency: 'medium' };
  return { label: 'Up to Date', urgency: 'low' };
}

function daysUntil(dateStr: string): number {
  const today = new Date('2026-06-18');
  const date = new Date(dateStr);
  return Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

function VaccineCard({ vaccine, onEdit }: { vaccine: Vaccine; onEdit?: () => void }) {
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
        <div className="flex items-center gap-2">
          <StatusBadge label={label} variant="vaccine" />
          {onEdit && (
            <button onClick={onEdit} className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center hover:bg-slate-100">
              <Pencil size={13} className="text-slate-400" strokeWidth={2} />
            </button>
          )}
        </div>
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

const EMPTY_VACCINE: Omit<Vaccine, 'id' | 'petId'> = {
  name: '',
  dateAdministered: '',
  nextDue: '',
  vet: '',
  notes: '',
};

export default function VaccinesPage() {
  const { getSelectedPet, getPetVaccines, addVaccine, updateVaccine, removeVaccine, addReminder } = useApp();
  const pet = getSelectedPet();
  const [editing, setEditing] = useState<Vaccine | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY_VACCINE);
  const [reminderEnabled, setReminderEnabled] = useState(true);

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

  function startAdd() {
    setForm(EMPTY_VACCINE);
    setReminderEnabled(true);
    setAdding(true);
    setEditing(null);
  }

  function startEdit(vaccine: Vaccine) {
    setForm({ name: vaccine.name, dateAdministered: vaccine.dateAdministered, nextDue: vaccine.nextDue, vet: vaccine.vet ?? '', notes: vaccine.notes ?? '' });
    setReminderEnabled(true);
    setEditing(vaccine);
    setAdding(false);
  }

  function handleSave() {
    if (!form.name || !form.nextDue) return;
    if (editing) {
      updateVaccine({ ...editing, ...form });
    } else {
      const id = Date.now().toString();
      addVaccine({ id, petId: pet!.id, ...form });
    }
    if (reminderEnabled && form.nextDue) {
      addReminder({
        id: `vac-rem-${Date.now()}`,
        petId: pet!.id,
        type: 'vaccine',
        title: `${form.name} due`,
        datetime: form.nextDue,
        done: false,
      });
    }
    setAdding(false);
    setEditing(null);
  }

  function handleDelete() {
    if (editing) {
      removeVaccine(editing.id);
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
        title="Vaccines"
        showBack
        subtitle={pet.name}
        rightSlot={
          showForm ? (
            <div className="flex gap-2">
              <button onClick={handleCancel} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                <X size={16} className="text-slate-600" strokeWidth={2} />
              </button>
              <button onClick={handleSave} className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center hover:bg-sky-600">
                <Check size={16} className="text-white" strokeWidth={2.5} />
              </button>
            </div>
          ) : undefined
        }
      />
      <PetSwitchBar />
      <main className="flex-1 px-4 py-4 pb-24 space-y-4 overflow-y-auto">
        {showForm ? (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-800">{editing ? 'Edit Vaccine' : 'Add Vaccine'} for {pet.name}</p>
            <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Vaccine Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Rabies"
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Date Administered</label>
                <input
                  type="date"
                  value={form.dateAdministered}
                  onChange={(e) => setForm((f) => ({ ...f, dateAdministered: e.target.value }))}
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Next Due Date</label>
                <input
                  type="date"
                  value={form.nextDue}
                  onChange={(e) => setForm((f) => ({ ...f, nextDue: e.target.value }))}
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Veterinarian</label>
                <input
                  value={form.vet}
                  onChange={(e) => setForm((f) => ({ ...f, vet: e.target.value }))}
                  placeholder="e.g. Dr. Smith"
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
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
                  <p className="text-sm font-medium text-slate-700">Create Reminder</p>
                  <p className="text-xs text-slate-400">Get notified when due</p>
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
                Remove Vaccine
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!form.name || !form.nextDue}
              className="w-full bg-violet-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-violet-600 active:bg-violet-700 transition-colors disabled:opacity-40"
            >
              {editing ? 'Save Changes' : 'Add Vaccine'}
            </button>
          </div>
        ) : (
          <>
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
                {overdue.map((v) => <VaccineCard key={v.id} vaccine={v} onEdit={() => startEdit(v)} />)}
              </section>
            )}

            {dueSoon.length > 0 && (
              <section className="space-y-3">
                <p className="text-xs font-semibold text-amber-600 uppercase tracking-wide px-1">Due Soon</p>
                {dueSoon.map((v) => <VaccineCard key={v.id} vaccine={v} onEdit={() => startEdit(v)} />)}
              </section>
            )}

            {upToDate.length > 0 && (
              <section className="space-y-3">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide px-1">Up to Date</p>
                {upToDate.map((v) => <VaccineCard key={v.id} vaccine={v} onEdit={() => startEdit(v)} />)}
              </section>
            )}

            {vaccines.length === 0 && (
              <div className="bg-white rounded-2xl shadow-card px-4 py-12 text-center">
                <p className="text-sm text-slate-400">No vaccine records for {pet.name}</p>
              </div>
            )}

            <button
              onClick={startAdd}
              className="w-full bg-violet-50 border border-violet-200 text-violet-700 font-semibold text-sm py-3.5 rounded-2xl hover:bg-violet-100 transition-colors flex items-center justify-center gap-2"
            >
              <Bell size={16} strokeWidth={2} />
              Manage Vaccine Schedule
            </button>
          </>
        )}
      </main>
    </div>
  );
}
