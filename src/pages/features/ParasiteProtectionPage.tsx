import { useState } from 'react';
import { ShieldCheck, Bug, Check, X, Bell, BellOff, Pencil, Clock } from 'lucide-react';
import TopBar from '../../components/TopBar';
import PetSwitchBar from '../../components/PetSwitchBar';
import { useApp } from '../../context/AppContext';
import type { ParasiteProtectionPlan, ParasiteTreatment, ParasiteTreatmentFrequency } from '../../types';

const FREQUENCY_OPTIONS: ParasiteTreatmentFrequency[] = ['Every month', 'Every 3 months', 'Every 6 months', 'Custom'];
const TIME_OPTIONS = ['06:00', '07:00', '08:00', '09:00', '10:00', '12:00', '18:00', '20:00'];

function getTreatmentStatus(nextDate: string): { label: string; urgency: 'low' | 'medium' | 'high' } {
  const today = new Date('2026-06-22');
  const due = new Date(nextDate);
  const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: 'Overdue', urgency: 'high' };
  if (diff <= 14) return { label: 'Due Soon', urgency: 'medium' };
  return { label: 'Up to Date', urgency: 'low' };
}

function StatusBadge({ label, urgency }: { label: string; urgency: 'low' | 'medium' | 'high' }) {
  const styles = {
    low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-red-50 text-red-700 border-red-200',
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${styles[urgency]}`}>
      {label}
    </span>
  );
}

function TreatmentCard({ type, treatment }: { type: string; treatment: ParasiteTreatment }) {
  const { label, urgency } = getTreatmentStatus(treatment.nextDate);
  const daysUntil = Math.ceil((new Date(treatment.nextDate).getTime() - new Date('2026-06-22').getTime()) / (1000 * 60 * 60 * 24));

  const iconBg = type === 'Flea' ? 'bg-lime-50' : type === 'Tick' ? 'bg-teal-50' : 'bg-cyan-50';
  const iconColor = type === 'Flea' ? 'text-lime-600' : type === 'Tick' ? 'text-teal-600' : 'text-cyan-600';

  return (
    <div className="bg-white rounded-2xl shadow-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            <Bug size={18} className={iconColor} strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 leading-snug">{type} Treatment</p>
            <p className="text-xs text-slate-500 mt-0.5">{treatment.productName || 'Not configured'}</p>
          </div>
        </div>
        <StatusBadge label={label} urgency={urgency} />
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[11px] text-slate-400 mb-0.5">Last treatment</p>
          <p className="text-xs font-medium text-slate-700">{treatment.lastDate || '—'}</p>
        </div>
        <div>
          <p className="text-[11px] text-slate-400 mb-0.5">Next due</p>
          <p className={`text-xs font-semibold ${urgency === 'high' ? 'text-red-600' : urgency === 'medium' ? 'text-amber-600' : 'text-slate-700'}`}>
            {treatment.nextDate || '—'}
            {daysUntil >= 0 && daysUntil <= 30 && (
              <span className="ml-1 text-[10px] font-normal">
                {daysUntil === 0 ? '(today)' : `(in ${daysUntil}d)`}
              </span>
            )}
            {daysUntil < 0 && (
              <span className="ml-1 text-[10px] font-normal">({Math.abs(daysUntil)}d ago)</span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock size={11} className="text-slate-400" strokeWidth={2} />
          <span>{treatment.frequency}</span>
        </div>
        {treatment.reminderEnabled ? (
          <span className="flex items-center gap-1 text-[11px] text-sky-600 font-medium">
            <Bell size={11} strokeWidth={2} />
            Reminder on
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <BellOff size={11} strokeWidth={2} />
            No reminder
          </span>
        )}
      </div>

      {treatment.notes && (
        <div className="mt-2 bg-slate-50 rounded-xl px-3 py-2">
          <p className="text-[11px] text-slate-500 leading-relaxed">{treatment.notes}</p>
        </div>
      )}
    </div>
  );
}

const EMPTY_TREATMENT: ParasiteTreatment = {
  productName: '',
  lastDate: '',
  nextDate: '',
  frequency: 'Every month',
  reminderEnabled: false,
  reminderTime: '08:00',
  notes: '',
};

function TreatmentForm({ label, treatment, onChange }: {
  label: string;
  treatment: ParasiteTreatment;
  onChange: (t: ParasiteTreatment) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{label} Treatment</p>
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1.5">Product Name</label>
        <input
          value={treatment.productName}
          onChange={(e) => onChange({ ...treatment, productName: e.target.value })}
          placeholder="e.g. Frontline Plus"
          className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1.5">Last Treatment</label>
          <input
            type="date"
            value={treatment.lastDate}
            onChange={(e) => onChange({ ...treatment, lastDate: e.target.value })}
            className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1.5">Next Due</label>
          <input
            type="date"
            value={treatment.nextDate}
            onChange={(e) => onChange({ ...treatment, nextDate: e.target.value })}
            className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-2">Frequency</label>
        <div className="flex flex-wrap gap-2">
          {FREQUENCY_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => onChange({ ...treatment, frequency: opt })}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                treatment.frequency === opt
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-sm font-medium text-slate-700">Reminder</p>
          <p className="text-xs text-slate-400">Get notified when due</p>
        </div>
        <button
          onClick={() => onChange({ ...treatment, reminderEnabled: !treatment.reminderEnabled })}
          className={`w-11 h-6 rounded-full transition-colors relative ${treatment.reminderEnabled ? 'bg-sky-500' : 'bg-slate-200'}`}
        >
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${treatment.reminderEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
      </div>
      {treatment.reminderEnabled && (
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1.5">Reminder Time</label>
          <select
            value={treatment.reminderTime}
            onChange={(e) => onChange({ ...treatment, reminderTime: e.target.value })}
            className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
          >
            {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      )}
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1.5">Notes</label>
        <textarea
          value={treatment.notes}
          onChange={(e) => onChange({ ...treatment, notes: e.target.value })}
          placeholder="Optional notes..."
          className="w-full bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400 resize-none"
          rows={2}
        />
      </div>
    </div>
  );
}

export default function ParasiteProtectionPage() {
  const { getSelectedPet, getPetParasiteProtection, updateParasiteProtectionPlan, addReminder, getPetReminders } = useApp();
  const pet = getSelectedPet();
  const existing = getPetParasiteProtection(pet?.id ?? '');

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<ParasiteProtectionPlan>(
    existing ?? {
      id: Date.now().toString(),
      petId: pet?.id ?? '',
      fleaTreatment: { ...EMPTY_TREATMENT },
      tickTreatment: { ...EMPTY_TREATMENT },
      wormTreatment: { ...EMPTY_TREATMENT },
    },
  );

  if (!pet) return null;

  const plan = editing ? form : (existing ?? form);
  const parasiteReminders = getPetReminders(pet.id).filter((r) => r.type === 'parasite' && !r.done);

  function handleSave() {
    const planToSave = { ...form, petId: pet!.id };
    if (!planToSave.id || planToSave.id === '') {
      planToSave.id = Date.now().toString();
    }
    updateParasiteProtectionPlan(planToSave);

    const treatments = [
      { label: 'Flea', t: form.fleaTreatment },
      { label: 'Tick', t: form.tickTreatment },
      { label: 'Worm', t: form.wormTreatment },
    ];
    for (const { label, t } of treatments) {
      if (t.reminderEnabled && t.nextDate) {
        addReminder({
          id: `parasite-${label.toLowerCase()}-${pet!.id}-${Date.now()}`,
          petId: pet!.id,
          type: 'parasite',
          title: `${label} treatment due — ${t.productName || label}`,
          datetime: `${t.nextDate}T${t.reminderTime || '08:00'}:00`,
          notes: `Parasite Protection: ${label} treatment`,
          done: false,
        });
      }
    }

    setEditing(false);
  }

  function handleCancel() {
    setForm(existing ?? form);
    setEditing(false);
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar
        title="Parasite Protection"
        showBack
        subtitle={pet.name}
        rightSlot={
          !editing ? (
            <button
              onClick={() => { setForm(existing ?? form); setEditing(true); }}
              className="flex items-center gap-1.5 text-sky-500 text-sm font-medium py-1 px-2 rounded-lg hover:bg-sky-50"
            >
              <Pencil size={15} strokeWidth={2} />
              Edit
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
        {!editing ? (
          <div className="space-y-4">
            {/* Current Protection Plan */}
            <section>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-3">Current Protection Plan</p>
              <div className="space-y-3">
                <TreatmentCard type="Flea" treatment={plan.fleaTreatment} />
                <TreatmentCard type="Tick" treatment={plan.tickTreatment} />
                <TreatmentCard type="Worm" treatment={plan.wormTreatment} />
              </div>
            </section>

            {/* Upcoming Protection Reminders */}
            {parasiteReminders.length > 0 && (
              <section>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-3">Upcoming Protection Reminders</p>
                <div className="space-y-2">
                  {parasiteReminders.map((r) => (
                    <div key={r.id} className="bg-white rounded-xl shadow-card px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-lime-50 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck size={15} className="text-lime-600" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">{r.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{r.datetime.split('T')[0]}</p>
                      </div>
                      <span className="text-[10px] font-semibold text-lime-700 bg-lime-50 border border-lime-200 px-2 py-0.5 rounded-full">
                        Parasite
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Manage CTA */}
            <button
              onClick={() => { setForm(existing ?? form); setEditing(true); }}
              className="w-full bg-lime-50 border border-lime-200 text-lime-700 font-semibold text-sm py-3.5 rounded-2xl hover:bg-lime-100 transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck size={16} strokeWidth={2} />
              Manage Protection Plan
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-800">Edit Protection Plan for {pet.name}</p>

            <TreatmentForm
              label="Flea"
              treatment={form.fleaTreatment}
              onChange={(t) => setForm((f) => ({ ...f, fleaTreatment: t }))}
            />
            <TreatmentForm
              label="Tick"
              treatment={form.tickTreatment}
              onChange={(t) => setForm((f) => ({ ...f, tickTreatment: t }))}
            />
            <TreatmentForm
              label="Worm"
              treatment={form.wormTreatment}
              onChange={(t) => setForm((f) => ({ ...f, wormTreatment: t }))}
            />

            <button
              onClick={handleSave}
              className="w-full bg-lime-600 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-lime-700 active:bg-lime-800 transition-colors"
            >
              Save Protection Plan
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
