import { useState } from 'react';
import { Camera, ChevronRight, AlertTriangle, CheckCircle, XCircle, Eye, BookOpen, Save, MessageSquare } from 'lucide-react';
import TopBar from '../../components/TopBar';
import { useApp } from '../../context/AppContext';
import type { BodyArea, UrgencyLevel, DiagnosticResult } from '../../types';

const BODY_AREAS: { id: BodyArea; label: string; emoji: string }[] = [
  { id: 'eyes', label: 'Eyes', emoji: '👁️' },
  { id: 'mouth-teeth', label: 'Mouth & Teeth', emoji: '🦷' },
  { id: 'skin-coat', label: 'Skin & Coat', emoji: '🐾' },
  { id: 'paws', label: 'Paws', emoji: '🐾' },
  { id: 'abdomen', label: 'Abdomen', emoji: '🫀' },
  { id: 'ears', label: 'Ears', emoji: '👂' },
  { id: 'back', label: 'Back & Spine', emoji: '🦴' },
  { id: 'tail', label: 'Tail Area', emoji: '🐕' },
];

const MOCK_RESULTS: Record<BodyArea, Omit<DiagnosticResult, 'id' | 'petId' | 'date' | 'bodyArea' | 'symptoms' | 'photoUrl'>> = {
  eyes: {
    possibleIssue: 'Mild conjunctivitis or eye irritation',
    urgency: 'medium',
    possibleCauses: ['Dust or airborne allergens', 'Early bacterial infection', 'Foreign body irritation'],
    whatToDoNow: ['Gently wipe discharge with sterile gauze', 'Keep area clean and dry', 'Prevent pawing at the eye'],
    whatToMonitor: ['Color of discharge (clear vs. yellow/green)', 'Frequency of squinting', 'Redness progression'],
    whatNotToDo: ['Do not use human eye drops', 'Do not apply any ointments without veterinary guidance'],
    followUpRecommendation: 'If discharge turns yellow/green or persists beyond 48 hours, consult a veterinarian promptly.',
  },
  'mouth-teeth': {
    possibleIssue: 'Early-stage tartar buildup or mild gum inflammation',
    urgency: 'low',
    possibleCauses: ['Plaque accumulation from diet', 'Insufficient dental hygiene', 'Natural progression with age'],
    whatToDoNow: ['Introduce toothbrushing with pet-safe toothpaste', 'Offer dental chews appropriate for size', 'Check gum color (healthy = pink)'],
    whatToMonitor: ['Persistent bad breath', 'Reluctance to eat hard food', 'Bleeding or swollen gums'],
    whatNotToDo: ['Do not use human toothpaste (xylitol is toxic)', 'Avoid giving bones that can splinter'],
    followUpRecommendation: 'Schedule a professional dental cleaning with a veterinarian within the next 2–3 months.',
  },
  'skin-coat': {
    possibleIssue: 'Possible contact dermatitis or mild environmental allergy',
    urgency: 'low',
    possibleCauses: ['Grass or pollen allergy', 'New detergent or cleaning product', 'Dry skin due to seasonal change'],
    whatToDoNow: ['Rinse affected area with lukewarm water', 'Apply pet-safe soothing balm', 'Remove possible irritant from environment'],
    whatToMonitor: ['Size and spread of affected area', 'Signs of excessive scratching', 'Hair loss in the affected area'],
    whatNotToDo: ['Do not apply human cortisone or antiseptics', 'Avoid bathing too frequently (strips natural oils)'],
    followUpRecommendation: 'If redness or scratching persists beyond 5 days, consult a vet for allergy evaluation.',
  },
  paws: {
    possibleIssue: 'Paw pad irritation or minor contact allergy',
    urgency: 'low',
    possibleCauses: ['Hot pavement burns', 'Chemical irritant from treated surfaces', 'Grass allergy after outdoor walks'],
    whatToDoNow: ['Rinse paws with lukewarm water after every walk', 'Check for cracks, cuts, or foreign objects', 'Apply pet paw balm if dry'],
    whatToMonitor: ['Frequency of paw licking', 'Limping or reluctance to walk', 'Swelling between toes'],
    whatNotToDo: ['Do not walk on hot asphalt during peak hours', 'Do not use human antiseptic sprays'],
    followUpRecommendation: 'If licking or swelling continues beyond 72 hours, seek veterinary assessment for possible allergy testing.',
  },
  abdomen: {
    possibleIssue: 'Possible gastrointestinal discomfort or bloating',
    urgency: 'medium',
    possibleCauses: ['Dietary indiscretion (eating too fast or unusual food)', 'Gas accumulation', 'Mild intestinal upset'],
    whatToDoNow: ['Withhold food for 4–6 hours to allow gut rest', 'Ensure access to fresh water', 'Monitor for vomiting or distension'],
    whatToMonitor: ['Abdominal distension (tightness or hardness)', 'Changes in stool frequency or consistency', 'Signs of pain when touching belly'],
    whatNotToDo: ['Do not give human antacids or pain medication', 'Do not exercise immediately after meals'],
    followUpRecommendation: 'If symptoms include repeated vomiting, distension, or pain, seek emergency veterinary care immediately.',
  },
  ears: {
    possibleIssue: 'Possible ear canal irritation or early otitis',
    urgency: 'medium',
    possibleCauses: ['Moisture buildup after bathing or swimming', 'Ear mites', 'Bacterial or yeast infection'],
    whatToDoNow: ['Gently inspect ear canal for redness or dark discharge', 'Keep ears dry and ventilated', 'Use pet-safe ear cleaning solution if prescribed'],
    whatToMonitor: ['Head shaking or ear scratching frequency', 'Odor from ear canal', 'Dark brown or black discharge'],
    whatNotToDo: ['Do not insert cotton swabs deep into ear canal', 'Do not use alcohol-based products'],
    followUpRecommendation: 'If shaking, scratching, or discharge persists beyond 48 hours, a veterinary ear examination is recommended.',
  },
  back: {
    possibleIssue: 'Possible minor muscle tension or spinal sensitivity',
    urgency: 'medium',
    possibleCauses: ['Overexertion during exercise', 'Sleeping on hard surfaces', 'Age-related joint stiffness'],
    whatToDoNow: ['Restrict vigorous exercise for 24–48 hours', 'Ensure a comfortable, padded resting area', 'Observe movement and posture carefully'],
    whatToMonitor: ['Signs of pain when bending or jumping', 'Changes in gait or limping', 'Reluctance to climb stairs'],
    whatNotToDo: ['Do not give human pain medication (ibuprofen, aspirin are toxic)', 'Avoid forceful handling of the back area'],
    followUpRecommendation: 'If pain or stiffness persists beyond 48 hours, consult a veterinarian to rule out spinal issues.',
  },
  tail: {
    possibleIssue: 'Possible tail base irritation or anal gland discomfort',
    urgency: 'low',
    possibleCauses: ['Anal gland fullness requiring expression', 'Flea activity at tail base', 'Minor skin irritation from grooming'],
    whatToDoNow: ['Check tail base and surrounding skin for redness', 'Inspect for flea dirt (tiny dark specks)', 'Keep area clean and dry'],
    whatToMonitor: ['Scooting or dragging on floor', 'Excessive licking or chewing at tail base', 'Swelling near anal area'],
    whatNotToDo: ['Do not attempt anal gland expression at home without training', 'Avoid using scented wipes near the anal area'],
    followUpRecommendation: 'Schedule a routine anal gland check with a groomer or veterinarian if scooting behavior continues.',
  },
};

type Step = 1 | 2 | 3 | 4 | 5;

const URGENCY_CONFIG: Record<UrgencyLevel, { bg: string; text: string; icon: typeof AlertTriangle; label: string }> = {
  low: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', icon: CheckCircle, label: 'Low Urgency' },
  medium: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', icon: AlertTriangle, label: 'Medium Urgency' },
  high: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', icon: AlertTriangle, label: 'High Urgency' },
};

export default function AIDiagnosticsPage() {
  const { getSelectedPet, addDiagnosticResult } = useApp();
  const pet = getSelectedPet();

  const [step, setStep] = useState<Step>(1);
  const [selectedArea, setSelectedArea] = useState<BodyArea | null>(null);
  const [photoSimulated, setPhotoSimulated] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [followUp, setFollowUp] = useState('');
  const [followUpReply, setFollowUpReply] = useState('');

  if (!pet) return null;

  function handleAreaSelect(area: BodyArea) {
    setSelectedArea(area);
    setStep(2);
  }

  function handleAnalyze() {
    if (!selectedArea) return;
    const mockData = MOCK_RESULTS[selectedArea];
    const newResult: DiagnosticResult = {
      id: Date.now().toString(),
      petId: pet!.id,
      date: '2026-06-17',
      bodyArea: selectedArea,
      symptoms,
      photoUrl: photoSimulated ? 'simulated' : undefined,
      ...mockData,
    };
    setResult(newResult);
    setStep(4);
  }

  function handleSave() {
    if (result) {
      addDiagnosticResult(result);
      setStep(5);
    }
  }

  function handleFollowUp() {
    setFollowUpReply(
      `Based on ${pet!.name}'s symptoms and the ${selectedArea?.replace('-', ' ')} area you described, I recommend closely monitoring for the next 24–48 hours. If you notice any worsening, contact your veterinarian. Keep the area clean and avoid potential irritants.`,
    );
  }

  const urgencyConfig = result ? URGENCY_CONFIG[result.urgency] : null;

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="AI Diagnostics" showBack subtitle={pet.name} />

      {/* Step indicator */}
      <div className="bg-white border-b border-slate-100 px-4 py-2">
        <div className="flex items-center gap-1">
          {([1, 2, 3, 4] as const).map((s) => (
            <div key={s} className="flex items-center gap-1">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                step >= s ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'
              }`}>{s}</div>
              {s < 4 && <div className={`flex-1 h-0.5 w-6 ${step > s ? 'bg-sky-400' : 'bg-slate-200'}`} />}
            </div>
          ))}
          <div className="flex-1" />
          <span className="text-xs text-slate-400">
            {step === 1 && 'Select area'}{step === 2 && 'Add photo'}{step === 3 && 'Describe symptoms'}{step === 4 && 'AI result'}{step === 5 && 'Saved'}
          </span>
        </div>
      </div>

      <main className="flex-1 px-4 py-5 pb-24 space-y-4 overflow-y-auto">
        {/* Step 1: Body area selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={pet.photo} alt={pet.name} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Select problem area</p>
                <p className="text-xs text-slate-500">Where is {pet.name} showing symptoms?</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BODY_AREAS.map((area) => (
                <button
                  key={area.id}
                  onClick={() => handleAreaSelect(area.id)}
                  className="bg-white rounded-2xl shadow-card p-4 flex items-center gap-3 hover:shadow-card-md active:scale-[0.98] transition-all text-left border border-transparent hover:border-sky-200"
                >
                  <span className="text-2xl">{area.emoji}</span>
                  <span className="text-sm font-medium text-slate-700">{area.label}</span>
                  <ChevronRight size={14} className="text-slate-300 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Photo */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Add a photo</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Take or upload a close-up photo of {pet.name}'s{' '}
                {BODY_AREAS.find((a) => a.id === selectedArea)?.label.toLowerCase()}
              </p>
            </div>

            {!photoSimulated ? (
              <div className="space-y-3">
                <button
                  onClick={() => setPhotoSimulated(true)}
                  className="w-full bg-white rounded-2xl border-2 border-dashed border-sky-300 py-12 flex flex-col items-center gap-3 hover:bg-sky-50 active:bg-sky-100 transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center">
                    <Camera size={28} className="text-sky-400" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-sky-600">Take Photo</p>
                    <p className="text-xs text-sky-400 mt-0.5">or tap to choose from gallery</p>
                  </div>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-full text-sm text-slate-400 hover:text-slate-600 py-2"
                >
                  Skip — continue without photo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-white rounded-2xl overflow-hidden shadow-card">
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <Camera size={32} className="text-slate-400 mx-auto" strokeWidth={1.5} />
                      <p className="text-xs text-slate-400 mt-2">Photo captured</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-xs text-slate-500">photo_2026_06_17.jpg</span>
                    <button onClick={() => setPhotoSimulated(false)} className="text-xs text-sky-500 font-medium">Retake</button>
                  </div>
                </div>
                <button
                  onClick={() => setStep(3)}
                  className="w-full bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Symptoms */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Describe the symptoms</p>
              <p className="text-xs text-slate-500 mt-0.5">
                What have you noticed about {pet.name}'s{' '}
                {BODY_AREAS.find((a) => a.id === selectedArea)?.label.toLowerCase()}?
              </p>
            </div>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={`e.g. "${pet.name} has been scratching frequently, there's slight redness, and it started 2 days ago..."`}
              className="w-full bg-white rounded-2xl shadow-card border border-slate-200 p-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400 resize-none leading-relaxed"
              rows={5}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-white border border-slate-200 text-slate-600 font-semibold text-sm py-3.5 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleAnalyze}
                disabled={symptoms.trim().length < 5}
                className="flex-1 bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors disabled:opacity-40"
              >
                Analyze
              </button>
            </div>
          </div>
        )}

        {/* Step 4: AI Result */}
        {step === 4 && result && urgencyConfig && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={pet.photo} alt={pet.name} className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className="text-sm font-semibold text-slate-800">AI Analysis for {pet.name}</p>
                <p className="text-xs text-slate-500">{BODY_AREAS.find((a) => a.id === selectedArea)?.label} · Today</p>
              </div>
            </div>

            {/* Urgency banner */}
            <div className={`rounded-2xl border px-4 py-3 flex items-center gap-3 ${urgencyConfig.bg}`}>
              <urgencyConfig.icon size={20} className={urgencyConfig.text} strokeWidth={2} />
              <div>
                <p className={`text-sm font-bold ${urgencyConfig.text}`}>{urgencyConfig.label}</p>
                <p className={`text-xs ${urgencyConfig.text} opacity-80`}>{result.possibleIssue}</p>
              </div>
            </div>

            {/* Result sections */}
            {[
              { icon: Eye, title: 'Possible Causes', items: result.possibleCauses, color: 'text-sky-500', bg: 'bg-sky-50' },
              { icon: CheckCircle, title: 'What To Do Now', items: result.whatToDoNow, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { icon: BookOpen, title: 'What To Monitor', items: result.whatToMonitor, color: 'text-amber-500', bg: 'bg-amber-50' },
              { icon: XCircle, title: 'What NOT To Do', items: result.whatNotToDo, color: 'text-red-500', bg: 'bg-red-50' },
            ].map(({ icon: Icon, title, items, color, bg }) => (
              <div key={title} className="bg-white rounded-2xl shadow-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center`}>
                    <Icon size={15} className={color} strokeWidth={2} />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                </div>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed">
                      <span className="text-slate-300 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Follow-up recommendation */}
            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Follow-up Recommendation</p>
              <p className="text-sm text-slate-100 leading-relaxed">{result.followUpRecommendation}</p>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} strokeWidth={2} />
              Save to Health Timeline
            </button>
          </div>
        )}

        {/* Step 5: Saved + follow-up */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle size={22} className="text-emerald-600" strokeWidth={2} />
              <div>
                <p className="text-sm font-semibold text-emerald-800">Saved to Health Timeline</p>
                <p className="text-xs text-emerald-600">{pet.name}'s record has been updated</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-sky-500" strokeWidth={2} />
                <p className="text-sm font-semibold text-slate-800">Optional Follow-up Question</p>
              </div>
              <p className="text-xs text-slate-500">Have a follow-up question about this result?</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  placeholder="Ask a follow-up question..."
                  className="flex-1 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400"
                />
                <button
                  onClick={handleFollowUp}
                  disabled={!followUp.trim()}
                  className="px-4 py-2 bg-sky-500 text-white text-sm font-medium rounded-xl disabled:opacity-40 hover:bg-sky-600 transition-colors"
                >
                  Ask
                </button>
              </div>
              {followUpReply && (
                <div className="bg-sky-50 rounded-xl p-3 border border-sky-100">
                  <p className="text-xs text-sky-800 leading-relaxed">{followUpReply}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
