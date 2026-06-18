import { useState } from 'react';
import { Camera, FileText, TrendingUp, Syringe, RefreshCw } from 'lucide-react';
import TopBar from '../../components/TopBar';
import PetSwitchBar from '../../components/PetSwitchBar';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';
import type { MonthlyCheckup, StoolQuality } from '../../types';

type Mode = 'select' | 'monthly' | 'annual';

const STOOL_OPTIONS: { value: StoolQuality; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'soft', label: 'Soft' },
  { value: 'hard', label: 'Hard' },
  { value: 'liquid', label: 'Liquid' },
];

function RatingInput({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-600 block mb-2">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-colors ${
              value === n
                ? 'bg-sky-500 text-white border-sky-500'
                : 'bg-white text-slate-500 border-slate-200 hover:border-sky-300'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-slate-400">Poor</span>
        <span className="text-[10px] text-slate-400">Excellent</span>
      </div>
    </div>
  );
}

function PhotoUploadSlot({ label, captured, onCapture }: { label: string; captured: boolean; onCapture: () => void }) {
  return (
    <button
      onClick={onCapture}
      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-colors ${
        captured ? 'border-emerald-300 bg-emerald-50' : 'border-dashed border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50'
      }`}
    >
      <Camera size={20} className={captured ? 'text-emerald-500' : 'text-slate-400'} strokeWidth={1.5} />
      <span className={`text-[11px] font-medium ${captured ? 'text-emerald-600' : 'text-slate-500'}`}>{label}</span>
      {captured && <span className="text-[10px] text-emerald-500">Captured</span>}
    </button>
  );
}

export default function AICheckupPage() {
  const { getSelectedPet, addMonthlyCheckup, getPetCheckups, getPetVaccines } = useApp();
  const pet = getSelectedPet();
  const [mode, setMode] = useState<Mode>('select');

  // Monthly form state
  const [weight, setWeight] = useState('');
  const [appetite, setAppetite] = useState<1|2|3|4|5>(3);
  const [energy, setEnergy] = useState<1|2|3|4|5>(3);
  const [stool, setStool] = useState<StoolQuality>('normal');
  const [behavior, setBehavior] = useState('');
  const [photos, setPhotos] = useState({ eyes: false, teeth: false, skin: false });
  const [submitted, setSubmitted] = useState(false);

  if (!pet) return null;

  const checkups = getPetCheckups(pet.id);
  const vaccines = getPetVaccines(pet.id);

  function handleSubmitMonthly() {
    if (!weight) return;
    const checkup: MonthlyCheckup = {
      id: Date.now().toString(),
      petId: pet!.id,
      date: '2026-06-17',
      weight: parseFloat(weight),
      appetite: appetite as 1|2|3|4|5,
      energyLevel: energy as 1|2|3|4|5,
      stoolQuality: stool,
      behaviorChanges: behavior || 'No notable changes.',
      photoEyes: photos.eyes ? 'captured' : undefined,
      photoTeeth: photos.teeth ? 'captured' : undefined,
      photoSkin: photos.skin ? 'captured' : undefined,
    };
    addMonthlyCheckup(checkup);
    setSubmitted(true);
  }

  function getWeightTrend() {
    const sorted = [...checkups].sort((a, b) => a.date.localeCompare(b.date));
    if (sorted.length < 2) return null;
    const first = sorted[0].weight;
    const last = sorted[sorted.length - 1].weight;
    return { first, last, diff: +(last - first).toFixed(1) };
  }

  const weightTrend = getWeightTrend();

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="AI Checkup" showBack subtitle={pet.name} />
      <PetSwitchBar />
      <main className="flex-1 px-4 py-4 pb-24 space-y-4 overflow-y-auto">
        {mode === 'select' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={pet.photo} alt={pet.name} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Checkup type</p>
                <p className="text-xs text-slate-500">Choose a checkup to perform for {pet.name}</p>
              </div>
            </div>
            <button
              onClick={() => { setMode('monthly'); setSubmitted(false); }}
              className="w-full bg-white rounded-2xl shadow-card p-5 flex items-center gap-4 hover:shadow-card-md active:scale-[0.99] transition-all text-left border border-emerald-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <RefreshCw size={22} className="text-emerald-500" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Monthly Checkup</p>
                <p className="text-xs text-slate-500 mt-0.5">Record photos, weight, appetite, energy, stool quality & behavior</p>
              </div>
            </button>
            <button
              onClick={() => setMode('annual')}
              className="w-full bg-white rounded-2xl shadow-card p-5 flex items-center gap-4 hover:shadow-card-md active:scale-[0.99] transition-all text-left border border-sky-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                <FileText size={22} className="text-sky-500" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Annual Summary</p>
                <p className="text-xs text-slate-500 mt-0.5">Yearly overview, weight trend, vaccines & recurring observations</p>
              </div>
            </button>
            {checkups.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-2">Past Checkups</p>
                <div className="space-y-2">
                  {checkups.slice(0, 3).map((c) => (
                    <div key={c.id} className="bg-white rounded-xl shadow-card px-4 py-3 flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">{c.date}</p>
                        <p className="text-xs text-slate-500">{c.weight} kg · Appetite {c.appetite}/5 · Energy {c.energyLevel}/5</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        c.stoolQuality === 'normal' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>{c.stoolQuality}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'monthly' && !submitted && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">Monthly Checkup · {pet.name}</p>
              <button onClick={() => setMode('select')} className="text-xs text-sky-500">Back</button>
            </div>

            {/* Photos */}
            <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Photo Documentation</p>
              <div className="grid grid-cols-3 gap-3">
                <PhotoUploadSlot label="Eyes" captured={photos.eyes} onCapture={() => setPhotos((p) => ({ ...p, eyes: true }))} />
                <PhotoUploadSlot label="Teeth / Mouth" captured={photos.teeth} onCapture={() => setPhotos((p) => ({ ...p, teeth: true }))} />
                <PhotoUploadSlot label="Skin / Coat" captured={photos.skin} onCapture={() => setPhotos((p) => ({ ...p, skin: true }))} />
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Body Metrics</p>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={`e.g. ${pet.weight}`}
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-sky-400"
                />
              </div>
              <RatingInput value={appetite} onChange={(v) => setAppetite(v as 1|2|3|4|5)} label="Appetite" />
              <RatingInput value={energy} onChange={(v) => setEnergy(v as 1|2|3|4|5)} label="Energy Level" />
            </div>

            {/* Stool + Behavior */}
            <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Observations</p>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-2">Stool Quality</label>
                <div className="grid grid-cols-4 gap-2">
                  {STOOL_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setStool(opt.value)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-colors ${
                        stool === opt.value
                          ? 'bg-sky-500 text-white border-sky-500'
                          : 'bg-white text-slate-500 border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 block mb-1.5">Behavior Changes</label>
                <textarea
                  value={behavior}
                  onChange={(e) => setBehavior(e.target.value)}
                  placeholder="Any changes in behavior, mood, or daily routine..."
                  className="w-full bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400 resize-none"
                  rows={3}
                />
              </div>
            </div>

            <button
              onClick={handleSubmitMonthly}
              disabled={!weight}
              className="w-full bg-emerald-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-emerald-600 active:bg-emerald-700 transition-colors disabled:opacity-40"
            >
              Save Monthly Checkup
            </button>
          </div>
        )}

        {mode === 'monthly' && submitted && (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <p className="text-sm font-semibold text-emerald-800">Checkup Saved!</p>
              <p className="text-xs text-emerald-600 mt-1">Monthly checkup for {pet.name} has been recorded.</p>
            </div>
            <button onClick={() => setMode('select')} className="w-full bg-white border border-slate-200 text-slate-700 font-medium text-sm py-3 rounded-2xl">
              Back to Checkups
            </button>
          </div>
        )}

        {mode === 'annual' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">Annual Summary · {pet.name}</p>
              <button onClick={() => setMode('select')} className="text-xs text-sky-500">Back</button>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={16} className="text-sky-500" strokeWidth={2} />
                <p className="text-sm font-semibold text-slate-800">Weight Trend</p>
              </div>
              {weightTrend ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Earliest record: <strong className="text-slate-700">{weightTrend.first} kg</strong></span>
                    <span>Latest: <strong className="text-slate-700">{weightTrend.last} kg</strong></span>
                  </div>
                  <div className={`rounded-xl p-3 text-sm font-medium ${weightTrend.diff > 0 ? 'bg-amber-50 text-amber-700' : weightTrend.diff < 0 ? 'bg-sky-50 text-sky-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    {weightTrend.diff > 0 ? `+${weightTrend.diff}` : weightTrend.diff} kg change across {checkups.length} recorded checkups
                  </div>
                  <div className="flex gap-1 mt-2">
                    {checkups.slice(-6).map((c, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-sky-400 rounded-sm"
                          style={{ height: `${Math.max(12, (c.weight / (pet.weight + 5)) * 40)}px` }}
                        />
                        <span className="text-[9px] text-slate-400">{c.date.slice(5)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">Not enough data for trend analysis. Complete more monthly checkups.</p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Syringe size={16} className="text-violet-500" strokeWidth={2} />
                <p className="text-sm font-semibold text-slate-800">Vaccine Status</p>
              </div>
              {vaccines.map((v) => {
                const today = new Date('2026-06-17');
                const due = new Date(v.nextDue);
                const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                const status = diff < 0 ? 'Overdue' : diff <= 30 ? 'Due Soon' : 'Up to Date';
                return (
                  <div key={v.id} className="flex items-center justify-between py-1">
                    <p className="text-xs text-slate-700 flex-1 pr-2">{v.name}</p>
                    <StatusBadge label={status} variant="vaccine" />
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Nutrition Changes</p>
              <p className="text-sm text-slate-600 leading-relaxed">No significant diet changes recorded this year. Current plan is consistent with age and weight guidelines.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Recurring Observations</p>
              {checkups.length > 0 ? (
                <div className="space-y-2">
                  {checkups.some((c) => c.stoolQuality !== 'normal') && (
                    <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">Occasional stool consistency changes noted in past checkups.</p>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed">Average appetite: {(checkups.reduce((a, c) => a + c.appetite, 0) / checkups.length).toFixed(1)}/5 · Average energy: {(checkups.reduce((a, c) => a + c.energyLevel, 0) / checkups.length).toFixed(1)}/5</p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No recurring observations yet. Complete monthly checkups to build history.</p>
              )}
            </div>

            <button className="w-full bg-white border border-slate-200 text-slate-600 font-medium text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
              <FileText size={16} strokeWidth={2} />
              Export Report (PDF) — Coming Soon
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
