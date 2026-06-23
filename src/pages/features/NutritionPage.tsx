import { useState } from 'react';
import { Pencil as Edit3, Check, X, Bell, BellOff } from 'lucide-react';
import TopBar from '../../components/TopBar';
import PetSwitchBar from '../../components/PetSwitchBar';
import { useApp } from '../../context/AppContext';
import type { NutritionPlan } from '../../types';

const MEAL_TIME_OPTIONS = ['06:00', '07:00', '07:30', '08:00', '12:00', '13:00', '17:00', '18:00', '19:00', '20:00'];

export default function NutritionPage() {
  const { getSelectedPet, getPetNutrition, updateNutritionPlan } = useApp();
  const pet = getSelectedPet();
  const existing = getPetNutrition(pet?.id ?? '');

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<NutritionPlan>(
    existing ?? {
      id: Date.now().toString(),
      petId: pet?.id ?? '',
      brand: '',
      productLine: '',
      foodType: 'normal',
      dailyQuantity: 0,
      mealsPerDay: 2,
      mealTimes: ['07:00', '18:00'],
      remindersEnabled: false,
      notes: '',
    },
  );

  if (!pet) return null;

  const plan = editing ? form : (existing ?? form);

  function handleSave() {
    updateNutritionPlan(form);
    setEditing(false);
  }

  function handleCancel() {
    setForm(existing ?? form);
    setEditing(false);
  }

  function updateMealCount(count: number) {
    const clamped = Math.max(1, Math.min(6, count));
    const times = Array.from({ length: clamped }, (_, i) => form.mealTimes[i] ?? MEAL_TIME_OPTIONS[i] ?? '08:00');
    setForm((f) => ({ ...f, mealsPerDay: clamped, mealTimes: times }));
  }

  function updateMealTime(index: number, time: string) {
    setForm((f) => {
      const times = [...f.mealTimes];
      times[index] = time;
      return { ...f, mealTimes: times };
    });
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar
        title="Nutrition"
        showBack
        subtitle={pet.name}
        rightSlot={
          editing ? (
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
        {!editing ? (
          /* View mode */
          <div className="space-y-4">
            {/* Food info card */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="bg-amber-50 px-4 py-3 border-b border-amber-100">
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Current Food Plan</p>
              </div>
              <div className="px-4 py-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-base font-bold text-slate-900">{plan.brand || '—'}</p>
                    <p className="text-sm text-slate-500">{plan.productLine || '—'}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    plan.foodType === 'veterinary'
                      ? 'bg-violet-50 text-violet-700 border border-violet-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {plan.foodType === 'veterinary' ? 'Veterinary' : 'Standard'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-800">{plan.dailyQuantity}</p>
                    <p className="text-[11px] text-slate-500">g/day</p>
                  </div>
                  <div className="text-center border-x border-slate-100">
                    <p className="text-lg font-bold text-slate-800">{plan.mealsPerDay}</p>
                    <p className="text-[11px] text-slate-500">meals/day</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-800">{Math.round(plan.dailyQuantity / plan.mealsPerDay)}</p>
                    <p className="text-[11px] text-slate-500">g/meal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Meal times */}
            <div className="bg-white rounded-2xl shadow-card px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Meal Schedule</p>
                {plan.remindersEnabled
                  ? <span className="flex items-center gap-1 text-xs text-sky-600"><Bell size={12} strokeWidth={2} />Reminders On</span>
                  : <span className="flex items-center gap-1 text-xs text-slate-400"><BellOff size={12} strokeWidth={2} />No Reminders</span>
                }
              </div>
              <div className="space-y-2">
                {plan.mealTimes.map((time, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-semibold text-amber-600">{i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{time}</p>
                    <p className="text-xs text-slate-400">— {Math.round(plan.dailyQuantity / plan.mealsPerDay)} g</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {plan.notes && (
              <div className="bg-white rounded-2xl shadow-card px-4 py-4">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Notes</p>
                <p className="text-sm text-slate-600 leading-relaxed">{plan.notes}</p>
              </div>
            )}

            <button
              onClick={() => { setForm(existing ?? form); setEditing(true); }}
              className="w-full bg-amber-50 border border-amber-200 text-amber-700 font-semibold text-sm py-3.5 rounded-2xl hover:bg-amber-100 transition-colors flex items-center justify-center gap-2"
            >
              <Edit3 size={16} strokeWidth={2} />
              Edit Nutrition Plan
            </button>
          </div>
        ) : (
          /* Edit mode */
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-800">Edit Nutrition Plan for {pet.name}</p>

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Food Details</p>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Brand</label>
                <input
                  value={form.brand}
                  onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                  placeholder="e.g. Royal Canin"
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Product Line</label>
                <input
                  value={form.productLine}
                  onChange={(e) => setForm((f) => ({ ...f, productLine: e.target.value }))}
                  placeholder="e.g. Labrador Adult"
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-2">Food Type</label>
                <div className="flex gap-3">
                  {(['normal', 'veterinary'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setForm((f) => ({ ...f, foodType: type }))}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                        form.foodType === type
                          ? 'bg-sky-500 text-white border-sky-500'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      {type === 'normal' ? 'Standard' : 'Veterinary'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Quantities & Schedule</p>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Daily Quantity (g)</label>
                <input
                  type="number"
                  value={form.dailyQuantity || ''}
                  onChange={(e) => setForm((f) => ({ ...f, dailyQuantity: parseInt(e.target.value) || 0 }))}
                  placeholder="e.g. 380"
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-2">Meals per Day</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateMealCount(form.mealsPerDay - 1)} className="w-9 h-9 rounded-xl border border-slate-200 text-slate-600 text-lg font-semibold hover:bg-slate-50 flex items-center justify-center">−</button>
                  <span className="text-lg font-bold text-slate-800 w-8 text-center">{form.mealsPerDay}</span>
                  <button onClick={() => updateMealCount(form.mealsPerDay + 1)} className="w-9 h-9 rounded-xl border border-slate-200 text-slate-600 text-lg font-semibold hover:bg-slate-50 flex items-center justify-center">+</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600 block">Meal Times</label>
                {form.mealTimes.map((time, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-16">Meal {i + 1}</span>
                    <select
                      value={time}
                      onChange={(e) => updateMealTime(i, e.target.value)}
                      className="flex-1 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-sky-400"
                    >
                      {MEAL_TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-1">
                <div>
                  <p className="text-sm font-medium text-slate-700">Enable Reminders</p>
                  <p className="text-xs text-slate-400">Notify at each meal time</p>
                </div>
                <button
                  onClick={() => setForm((f) => ({ ...f, remindersEnabled: !f.remindersEnabled }))}
                  className={`w-11 h-6 rounded-full transition-colors relative ${form.remindersEnabled ? 'bg-sky-500' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${form.remindersEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4">
              <label className="text-xs font-medium text-slate-600 block mb-1.5">Notes</label>
              <textarea
                value={form.notes ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Any notes about this diet plan..."
                className="w-full bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400 resize-none"
                rows={3}
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-amber-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-amber-600 active:bg-amber-700 transition-colors"
            >
              Save Nutrition Plan
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
