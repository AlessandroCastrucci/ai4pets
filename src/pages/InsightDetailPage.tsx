import { AlertCircle, CheckCircle, Eye, ShieldAlert, XCircle } from 'lucide-react';
import TopBar from '../components/TopBar';
import StatusBadge from '../components/StatusBadge';
import { useApp } from '../context/AppContext';
import type { BodyArea } from '../types';

const BODY_AREA_LABELS: Record<BodyArea, string> = {
  'skin-fur': 'Skin & Fur',
  eyes: 'Eye Scan',
  ears: 'Ear Scan',
  paws: 'Paw Scan',
  'mouth-teeth': 'Dental Scan',
  stool: 'Stool Analysis',
  vomit: 'Vomit Analysis',
  wound: 'Wound Scan',
  other: 'General Scan',
};

const FOLLOW_UP_STATUS = {
  improved: { label: 'Improved', color: 'text-emerald-600', bg: 'bg-emerald-50', Icon: CheckCircle },
  same: { label: 'No change', color: 'text-amber-600', bg: 'bg-amber-50', Icon: Eye },
  worse: { label: 'Worsened', color: 'text-rose-600', bg: 'bg-rose-50', Icon: AlertCircle },
};

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function InsightDetailPage() {
  const { selectedInsightId, insightResults, insightFollowUps, getPet } = useApp();

  const result = insightResults.find((d) => d.id === selectedInsightId);
  if (!result) {
    return (
      <div className="flex flex-col min-h-full bg-slate-50">
        <TopBar title="Insight Detail" showBack />
        <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
          Insight not found.
        </div>
      </div>
    );
  }

  const pet = getPet(result.petId);
  const followUps = insightFollowUps.filter((f) => f.insightId === result.id);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="Insight Detail" showBack />
      <main className="flex-1 px-4 py-4 pb-10 space-y-4">
        {/* Header card */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <div className="flex items-center gap-3 mb-3">
            {pet && (
              <img src={pet.photo} alt={pet.name} className="w-12 h-12 rounded-full object-cover" />
            )}
            <div>
              <p className="text-base font-bold text-slate-800">{pet?.name}</p>
              <p className="text-xs text-slate-500">{fmtDate(result.date)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              AI Insight
            </span>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {BODY_AREA_LABELS[result.bodyArea]}
            </span>
          </div>

          <h2 className="text-lg font-bold text-slate-900 mt-2">{result.possibleIssue}</h2>
          <div className="mt-2">
            <StatusBadge
              label={result.urgency === 'low' ? 'Low Urgency' : result.urgency === 'medium' ? 'Medium Urgency' : 'High Urgency'}
              variant="urgency"
              urgency={result.urgency}
            />
          </div>

          {result.symptoms && (
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">{result.symptoms}</p>
          )}
        </div>

        {/* Possible causes */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Possible Causes</h3>
          <ul className="space-y-2">
            {result.possibleCauses.map((cause, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">{cause}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to do now */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <h3 className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <CheckCircle size={13} strokeWidth={2.5} />
            What To Do Now
          </h3>
          <ul className="space-y-2">
            {result.whatToDoNow.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What to monitor */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <h3 className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <Eye size={13} strokeWidth={2.5} />
            What To Monitor
          </h3>
          <ul className="space-y-2">
            {result.whatToMonitor.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What not to do */}
        <div className="bg-white rounded-2xl shadow-card p-5">
          <h3 className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <XCircle size={13} strokeWidth={2.5} />
            What Not To Do
          </h3>
          <ul className="space-y-2">
            {result.whatNotToDo.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendation */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5">
          <h3 className="text-xs font-semibold text-sky-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <ShieldAlert size={13} strokeWidth={2.5} />
            Recommendation
          </h3>
          <p className="text-sm text-sky-800 leading-relaxed">{result.followUpRecommendation}</p>
        </div>

        {/* Follow-ups */}
        {followUps.length > 0 && (
          <div className="bg-white rounded-2xl shadow-card p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Follow-up Updates</h3>
            <div className="space-y-3">
              {followUps.map((fu) => {
                const cfg = FOLLOW_UP_STATUS[fu.status];
                return (
                  <div key={fu.id} className={`${cfg.bg} rounded-xl p-3`}>
                    <div className="flex items-center gap-2 mb-1">
                      <cfg.Icon size={14} className={cfg.color} strokeWidth={2} />
                      <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
                      <span className="text-xs text-slate-400 ml-auto">{fmtDate(fu.date)}</span>
                    </div>
                    {fu.notes && <p className="text-sm text-slate-600">{fu.notes}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
