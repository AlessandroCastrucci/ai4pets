import { Scan, Stethoscope, Syringe, FileText, FlaskConical, Pill, ChevronRight, Utensils } from 'lucide-react';
import TopBar from '../../components/TopBar';
import PetSwitchBar from '../../components/PetSwitchBar';
import StatusBadge from '../../components/StatusBadge';
import { useApp } from '../../context/AppContext';
import type { PetDocument } from '../../types';

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function docIcon(type: PetDocument['type']) {
  switch (type) {
    case 'vaccination-card': return <Syringe size={18} className="text-violet-500" strokeWidth={1.5} />;
    case 'blood-test': return <FlaskConical size={18} className="text-sky-500" strokeWidth={1.5} />;
    case 'prescription': return <Pill size={18} className="text-rose-500" strokeWidth={1.5} />;
    case 'health-document': return <FileText size={18} className="text-amber-500" strokeWidth={1.5} />;
  }
}

function docTypeName(type: PetDocument['type']): string {
  switch (type) {
    case 'vaccination-card': return 'Vaccination Card';
    case 'blood-test': return 'Blood Test';
    case 'prescription': return 'Prescription';
    case 'health-document': return 'Health Document';
  }
}

function docBg(type: PetDocument['type']): string {
  switch (type) {
    case 'vaccination-card': return 'bg-violet-50 dark:bg-violet-900/20';
    case 'blood-test': return 'bg-sky-50 dark:bg-sky-900/20';
    case 'prescription': return 'bg-rose-50 dark:bg-rose-900/20';
    case 'health-document': return 'bg-amber-50 dark:bg-amber-900/20';
  }
}

interface TimelineEntry {
  date: string;
  type: 'diagnosis' | 'checkup' | 'vaccine' | 'therapy' | 'document' | 'nutrition';
  title: string;
  sub?: string;
}

const TYPE_DOT: Record<TimelineEntry['type'], string> = {
  diagnosis: 'bg-sky-400',
  checkup: 'bg-emerald-400',
  vaccine: 'bg-violet-400',
  therapy: 'bg-rose-400',
  document: 'bg-amber-400',
  nutrition: 'bg-orange-400',
};

const TYPE_LABEL: Record<TimelineEntry['type'], string> = {
  diagnosis: 'Diagnosis',
  checkup: 'Checkup',
  vaccine: 'Vaccine',
  therapy: 'Therapy',
  document: 'Document',
  nutrition: 'Nutrition',
};

const TYPE_CHIP: Record<TimelineEntry['type'], string> = {
  diagnosis: 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400',
  checkup: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
  vaccine: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400',
  therapy: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400',
  document: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  nutrition: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
};

function SectionHeader({ title, count }: { title: string; count?: number }) {
  return (
    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{title}</p>
      {count !== undefined && (
        <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{count}</span>
      )}
    </div>
  );
}

export default function PetHealthHistoryPage() {
  const { getSelectedPet, getPetDiagnostics, getPetCheckups, getPetVaccines, getPetTherapies, getPetDocuments, getPetNutrition } = useApp();
  const pet = getSelectedPet();

  if (!pet) return null;

  const diagnostics = [...getPetDiagnostics(pet.id)].sort((a, b) => b.date.localeCompare(a.date));
  const checkups = [...getPetCheckups(pet.id)].sort((a, b) => b.date.localeCompare(a.date));
  const vaccines = [...getPetVaccines(pet.id)].sort((a, b) => b.dateAdministered.localeCompare(a.dateAdministered));
  const therapies = [...getPetTherapies(pet.id)].sort((a, b) => b.startDate.localeCompare(a.startDate));
  const documents = [...getPetDocuments(pet.id)].sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
  const nutrition = getPetNutrition(pet.id);

  // Merge timeline
  const timeline: TimelineEntry[] = [
    ...diagnostics.map((d) => ({
      date: d.date,
      type: 'diagnosis' as const,
      title: d.possibleIssue,
      sub: d.bodyArea.replace('-', ' '),
    })),
    ...checkups.map((c) => ({
      date: c.date,
      type: 'checkup' as const,
      title: 'Monthly Checkup',
      sub: `Weight: ${c.weight} kg`,
    })),
    ...vaccines.map((v) => ({
      date: v.dateAdministered,
      type: 'vaccine' as const,
      title: v.name,
      sub: v.vet,
    })),
    ...therapies.map((t) => ({
      date: t.startDate,
      type: 'therapy' as const,
      title: t.name,
      sub: t.status === 'active' ? 'Active' : 'Completed',
    })),
    ...documents.map((d) => ({
      date: d.uploadedAt,
      type: 'document' as const,
      title: d.label,
      sub: docTypeName(d.type),
    })),
    ...(nutrition ? [{
      date: nutrition.id,
      type: 'nutrition' as const,
      title: `${nutrition.brand || 'Food plan'} — ${nutrition.productLine || ''}`.trim().replace(/—\s*$/, ''),
      sub: `${nutrition.dailyQuantity}g/day · ${nutrition.mealsPerDay} meals`,
    }] : []),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="flex flex-col min-h-full bg-slate-50 dark:bg-slate-900">
      <TopBar title="Health History" showBack subtitle={pet.name} />
      <PetSwitchBar />

      <main className="flex-1 px-4 py-4 pb-24 space-y-5">

        {/* A. Diagnosis History */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden">
          <SectionHeader title="Diagnosis History" count={diagnostics.length} />
          {diagnostics.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center mx-auto mb-3">
                <Scan size={20} className="text-sky-300" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">No diagnoses recorded yet.</p>
              <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">Use AI Diagnostics to log your first diagnosis.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {diagnostics.map((d) => (
                <div key={d.id} className="px-4 py-3 flex gap-3">
                  {d.photoUrl && (
                    <img src={d.photoUrl} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">{d.possibleIssue}</p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{fmtDate(d.date)}</p>
                      </div>
                      <StatusBadge label={d.urgency} urgency={d.urgency} variant="urgency" />
                    </div>
                    <span className="inline-block mt-2 text-[11px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full capitalize">
                      {d.bodyArea.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* B. Nutrition Plan */}
        {nutrition && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden">
            <SectionHeader title="Current Nutrition Plan" />
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                <Utensils size={18} className="text-amber-500" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{nutrition.brand || 'Unnamed brand'}</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{nutrition.productLine || '—'} · {nutrition.dailyQuantity}g/day · {nutrition.mealsPerDay} meals</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                nutrition.foodType === 'veterinary'
                  ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800'
                  : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              }`}>
                {nutrition.foodType === 'veterinary' ? 'Vet' : 'Standard'}
              </span>
            </div>
          </div>
        )}

        {/* C. Uploaded Documents */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden">
          <SectionHeader title="Uploaded Documents" count={documents.length} />
          {documents.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center mx-auto mb-3">
                <FileText size={20} className="text-amber-300" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">No documents uploaded yet.</p>
              <p className="text-xs text-slate-300 dark:text-slate-600 mt-1">Add documents in Edit Pet Profile.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {documents.map((doc) => (
                <div key={doc.id} className="px-4 py-3 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${docBg(doc.type)} flex items-center justify-center flex-shrink-0`}>
                    {docIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{doc.label}</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{docTypeName(doc.type)} · {fmtDate(doc.uploadedAt)}</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 flex-shrink-0" strokeWidth={1.5} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* D. Full Clinical Timeline */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden">
          <SectionHeader title="Clinical Timeline" count={timeline.length} />
          {timeline.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">No health events recorded yet.</p>
            </div>
          ) : (
            <div className="px-4 py-2">
              <div className="relative">
                <div className="absolute left-[7px] top-3 bottom-3 w-px bg-slate-100 dark:bg-slate-700" />
                <div className="space-y-0">
                  {timeline.map((entry, i) => (
                    <div key={i} className="flex gap-4 py-3 relative">
                      <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 mt-1 ring-2 ring-white dark:ring-slate-800 ${TYPE_DOT[entry.type]}`} />
                      <div className="flex-1 min-w-0 pb-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-md ${TYPE_CHIP[entry.type]}`}>
                            {TYPE_LABEL[entry.type]}
                          </span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500">{fmtDate(entry.date)}</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">{entry.title}</p>
                        {entry.sub && (
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 capitalize">{entry.sub}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* E. AI Checkups */}
        {checkups.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden">
            <SectionHeader title="AI Checkups" count={checkups.length} />
            <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {checkups.map((c) => (
                <div key={c.id} className="px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
                    <Stethoscope size={17} className="text-emerald-500" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Monthly Checkup</p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{fmtDate(c.date)} · Weight: {c.weight} kg</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" strokeWidth={2} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
