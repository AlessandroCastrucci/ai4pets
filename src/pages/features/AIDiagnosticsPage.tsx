import { useState, useRef, useEffect } from 'react';
import {
  Camera, Upload, ChevronRight, AlertTriangle, CheckCircle, XCircle,
  BookOpen, Save, MessageSquare, Zap, Lightbulb, ArrowRight, Loader, X, RefreshCw, Image,
} from 'lucide-react';
import TopBar from '../../components/TopBar';
import { useApp } from '../../context/AppContext';
import type { BodyArea, UrgencyLevel, DiagnosticResult, DiagnosticFollowUp, Reminder } from '../../types';

/* ─── Mock SDK Config ─────────────────────────────────────────────────── */
const SDK_QUESTIONNAIRE_ENABLED = true;

/* ─── Custom illustrated SVG icons ─────────────────────────────────────── */

function IllustrationEye() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="20" cy="20" rx="14" ry="8" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.8"/>
      <circle cx="20" cy="20" r="5" fill="#0ea5e9"/>
      <circle cx="20" cy="20" r="2.5" fill="#0c4a6e"/>
      <circle cx="22" cy="18" r="1.2" fill="white"/>
      <path d="M6 20 Q20 8 34 20" stroke="#7dd3fc" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function IllustrationEar() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M12 8 C8 8 6 14 6 20 C6 28 10 34 16 34 C20 34 22 30 22 28 C22 26 20 24 20 22 C20 18 24 16 24 12 C24 8 20 6 16 6 C14.5 6 13 6.8 12 8Z" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 12 C12 14 12 18 14 22 C15 24 16 26 16 28" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function IllustrationSkinFur() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="20" cy="22" rx="13" ry="11" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="1.8"/>
      <circle cx="14" cy="14" r="5" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="1.8"/>
      <circle cx="26" cy="14" r="5" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="1.8"/>
      <line x1="15" y1="18" x2="13" y2="22" stroke="#14b8a6" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="20" y1="17" x2="20" y2="22" stroke="#14b8a6" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="25" y1="18" x2="27" y2="22" stroke="#14b8a6" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="20" cy="26" r="1.5" fill="#f87171"/>
      <circle cx="24" cy="24" r="1" fill="#fca5a5"/>
      <circle cx="16" cy="25" r="1" fill="#fca5a5"/>
    </svg>
  );
}

function IllustrationPaws() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="20" cy="26" rx="8" ry="7" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.8"/>
      <ellipse cx="12" cy="18" rx="3.5" ry="3" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.6"/>
      <ellipse cx="28" cy="18" rx="3.5" ry="3" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.6"/>
      <ellipse cx="16" cy="14" rx="3.2" ry="2.8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.6"/>
      <ellipse cx="24" cy="14" rx="3.2" ry="2.8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.6"/>
    </svg>
  );
}

function IllustrationMouth() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M8 18 Q8 10 20 10 Q32 10 32 18 L32 24 Q32 34 20 34 Q8 34 8 24 Z" fill="#d1fae5" stroke="#10b981" strokeWidth="1.8"/>
      <rect x="12" y="18" width="4" height="5" rx="1.5" fill="white" stroke="#10b981" strokeWidth="1"/>
      <rect x="18" y="17" width="4" height="6" rx="1.5" fill="white" stroke="#10b981" strokeWidth="1"/>
      <rect x="24" y="18" width="4" height="5" rx="1.5" fill="white" stroke="#10b981" strokeWidth="1"/>
      <ellipse cx="20" cy="29" rx="6" ry="3.5" fill="#fda4af"/>
      <line x1="20" y1="25.5" x2="20" y2="32" stroke="#fb7185" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

const AREA_ILLUSTRATIONS: Partial<Record<BodyArea, React.ElementType>> = {
  'skin-fur': IllustrationSkinFur,
  eyes: IllustrationEye,
  ears: IllustrationEar,
  paws: IllustrationPaws,
  'mouth-teeth': IllustrationMouth,
};

interface AreaDef {
  id: BodyArea;
  label: string;
  sublabel: string;
}

const BODY_AREAS_DOG: AreaDef[] = [
  { id: 'skin-fur',    label: 'Skin / Fur',    sublabel: 'Itching, rash, hair loss' },
  { id: 'eyes',        label: 'Eyes',           sublabel: 'Redness, discharge' },
  { id: 'ears',        label: 'Ears',           sublabel: 'Scratching, bad smell' },
  { id: 'paws',        label: 'Paws',           sublabel: 'Licking, limping' },
  { id: 'mouth-teeth', label: 'Teeth / Mouth',  sublabel: 'Bad breath, gums' },
];

const BODY_AREAS_CAT: AreaDef[] = [
  { id: 'eyes',        label: 'Eyes',           sublabel: 'Redness, discharge' },
  { id: 'mouth-teeth', label: 'Teeth / Mouth',  sublabel: 'Bad breath, gums' },
];

type MockResult = Omit<DiagnosticResult, 'id' | 'petId' | 'date' | 'bodyArea' | 'symptoms'>;

const MOCK_RESULTS: Record<string, MockResult> = {
  'skin-fur': {
    possibleIssue: 'Possible contact dermatitis or environmental allergy',
    urgency: 'low',
    possibleCauses: ['Grass or pollen contact allergy', 'New detergent or cleaning product', 'Dry skin due to seasonal change'],
    whatToDoNow: ['Rinse affected area with lukewarm water', 'Apply pet-safe soothing balm to the skin', 'Remove possible irritant from the environment'],
    whatToMonitor: ['Size and spread of affected area over 48-72 hours', 'Signs of excessive scratching or hot spots', 'Hair loss developing around the affected area'],
    whatNotToDo: ['Do not apply human cortisone or antiseptics', 'Avoid bathing too frequently as it strips natural oils'],
    followUpRecommendation: 'If redness or scratching persists beyond 5 days, consult a vet for a full allergy evaluation.',
  },
  eyes: {
    possibleIssue: 'Mild conjunctivitis or eye irritation',
    urgency: 'medium',
    possibleCauses: ['Dust or airborne allergens', 'Early bacterial infection', 'Foreign body irritation'],
    whatToDoNow: ['Gently wipe discharge with sterile gauze', 'Keep area clean and dry', 'Prevent pawing at the eye'],
    whatToMonitor: ['Colour of discharge (clear vs. yellow/green)', 'Frequency of squinting', 'Redness progression over 24-48 hours'],
    whatNotToDo: ['Do not use human eye drops', 'Do not apply any ointments without veterinary guidance'],
    followUpRecommendation: 'If discharge turns yellow/green or persists beyond 48 hours, consult a veterinarian promptly.',
  },
  ears: {
    possibleIssue: 'Possible ear canal irritation or early otitis',
    urgency: 'medium',
    possibleCauses: ['Moisture buildup after bathing or swimming', 'Ear mites', 'Bacterial or yeast infection'],
    whatToDoNow: ['Gently inspect ear canal for redness or dark discharge', 'Keep ears dry and ventilated', 'Use pet-safe ear cleaning solution if already prescribed'],
    whatToMonitor: ['Head shaking or ear scratching frequency', 'Odour from ear canal', 'Dark brown or black discharge'],
    whatNotToDo: ['Do not insert cotton swabs deep into the ear canal', 'Do not use alcohol-based products'],
    followUpRecommendation: 'If shaking, scratching, or discharge persists beyond 48 hours, a veterinary ear examination is recommended.',
  },
  paws: {
    possibleIssue: 'Paw pad irritation or minor contact allergy',
    urgency: 'low',
    possibleCauses: ['Hot pavement burns', 'Chemical irritant from treated surfaces', 'Grass allergy after outdoor walks'],
    whatToDoNow: ['Rinse paws with lukewarm water after every walk', 'Check for cracks, cuts, or foreign objects', 'Apply pet paw balm if skin looks dry'],
    whatToMonitor: ['Frequency of paw licking', 'Limping or reluctance to walk', 'Swelling between toes'],
    whatNotToDo: ['Do not walk on hot asphalt during peak hours', 'Do not use human antiseptic sprays'],
    followUpRecommendation: 'If licking or swelling continues beyond 72 hours, seek veterinary assessment for possible allergy testing.',
  },
  'mouth-teeth': {
    possibleIssue: 'Early-stage tartar buildup or mild gum inflammation',
    urgency: 'low',
    possibleCauses: ['Plaque accumulation from diet', 'Insufficient dental hygiene', 'Natural progression with age'],
    whatToDoNow: ['Introduce toothbrushing with pet-safe toothpaste', 'Offer dental chews appropriate for body size', 'Check gum colour - healthy gums should be pink'],
    whatToMonitor: ['Persistent bad breath', 'Reluctance to eat hard food', 'Bleeding or swollen gums'],
    whatNotToDo: ['Do not use human toothpaste - xylitol is toxic to pets', 'Avoid giving bones that can splinter'],
    followUpRecommendation: 'Schedule a professional dental cleaning with a veterinarian within the next 2-3 months.',
  },
};

const FOLLOW_UP_REPLIES: Record<string, Record<UrgencyLevel, string>> = {
  improved: {
    low: "That's great news! Continued improvement is a very positive sign. Keep monitoring the area and maintain current care.",
    medium: "Improvement is encouraging. Continue the care steps and keep the area clean. Watch for any regression over the next 48 hours.",
    high: "Glad to hear some improvement. Close monitoring remains essential. Ensure the area stays clean and protected.",
  },
  same: {
    low: "No change may simply mean the issue needs more time. Continue recommended care and monitor closely for 3-5 days.",
    medium: "Symptoms staying the same after 24-48 hours means the issue hasn't resolved on its own. A veterinary assessment this week is recommended.",
    high: "For a high-urgency condition showing no change, professional veterinary evaluation should not be delayed further.",
  },
  worse: {
    low: "Worsening symptoms should be taken seriously. Book a veterinary appointment within the next 24-48 hours.",
    medium: "Worsening symptoms at this urgency level require prompt attention. Please arrange a veterinary visit today or tomorrow.",
    high: "Worsening symptoms at high urgency require immediate veterinary care. Contact your nearest emergency veterinary clinic today.",
  },
};

type UrgencyConfig = { bg: string; text: string; Icon: typeof AlertTriangle; label: string };
const URGENCY_CONFIG: Record<UrgencyLevel, UrgencyConfig> = {
  low: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', Icon: CheckCircle, label: 'Low Urgency' },
  medium: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', Icon: AlertTriangle, label: 'Medium Urgency' },
  high: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', Icon: AlertTriangle, label: 'High Urgency' },
};

type Step = 'area' | 'photo' | 'questionnaire' | 'analyzing' | 'result' | 'saved';

/* ─── Questionnaire questions ────────────────────────────────────────── */
interface QuestionDef {
  id: string;
  question: string;
  options: string[];
}

function getQuestions(petName: string): QuestionDef[] {
  return [
    { id: 'duration', question: 'How long has this issue been present?', options: ['Today', '1-3 days', '4-7 days', 'More than a week'] },
    { id: 'scratching', question: `Is ${petName} scratching or licking the area?`, options: ['Yes, frequently', 'Occasionally', 'No'] },
    { id: 'discharge', question: 'Is there redness, swelling or discharge?', options: ['Yes', 'Mild', 'No'] },
    { id: 'appetite', question: 'Has appetite or energy changed?', options: ['Both normal', 'Eating less', 'Less energy', 'Both changed'] },
    { id: 'recurring', question: 'Has this happened before?', options: ['First time', 'Has occurred before', 'Chronic / ongoing'] },
  ];
}

/* ─── Shared components ──────────────────────────────────────────────── */

function PetContextBanner({ pet }: { pet: { photo: string; name: string; breed: string; age: number; weight: number } }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl shadow-card px-3 py-2.5">
      <img src={pet.photo} alt={pet.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
      <div>
        <p className="text-sm font-bold text-slate-800">{pet.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">{pet.breed} · {pet.age} {pet.age === 1 ? 'year' : 'years'} · {pet.weight} kg</p>
      </div>
    </div>
  );
}

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 py-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`rounded-full transition-all ${i === current ? 'w-6 h-2 bg-sky-500' : i < current ? 'w-2 h-2 bg-sky-300' : 'w-2 h-2 bg-slate-200'}`} />
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────── */

export default function AIDiagnosticsPage() {
  const { getSelectedPet, addDiagnosticResult, addDiagnosticFollowUp, addReminder } = useApp();
  const pet = getSelectedPet();

  const [step, setStep] = useState<Step>('area');
  const [selectedArea, setSelectedArea] = useState<BodyArea | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [photoSource, setPhotoSource] = useState<'camera' | 'gallery' | null>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Questionnaire
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionnaireSkipped, setQuestionnaireSkipped] = useState(false);

  // Analysis
  const [analysisStep, setAnalysisStep] = useState(0);

  // Result
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  // Follow-up
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [followUpStatus, setFollowUpStatus] = useState<string | null>(null);
  const [followUpReply, setFollowUpReply] = useState('');

  if (!pet) return null;

  const safePet = pet;
  const areas = pet.species === 'dog' ? BODY_AREAS_DOG : BODY_AREAS_CAT;
  const areaLabel = areas.find((a) => a.id === selectedArea)?.label ?? '';
  const questions = getQuestions(pet.name);

  function resetDiagnostic() {
    setStep('area');
    setSelectedArea(null);
    setPhotoPreviewUrl(null);
    setPhotoSource(null);
    setAnswers({});
    setQuestionnaireSkipped(false);
    setAnalysisStep(0);
    setResult(null);
    setFollowUpOpen(false);
    setFollowUpStatus(null);
    setFollowUpReply('');
  }

  function handleFileSelect(file: File, source: 'camera' | 'gallery') {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreviewUrl(e.target?.result as string);
      setPhotoSource(source);
    };
    reader.readAsDataURL(file);
  }

  function handleRemovePhoto() {
    setPhotoPreviewUrl(null);
    setPhotoSource(null);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  }

  function startAnalysis(skipped: boolean) {
    setQuestionnaireSkipped(skipped);
    setStep('analyzing');
    setAnalysisStep(0);
  }

  const analysisMessages = [
    'Checking image quality',
    'Detecting visible abnormalities',
    `Comparing scan with ${areaLabel.toLowerCase()}`,
    ...(questionnaireSkipped ? [] : ['Combining questionnaire answers']),
    'Generating AI insights',
  ];

  useEffect(() => {
    if (step !== 'analyzing') return;
    if (analysisStep >= analysisMessages.length) {
      const timeout = setTimeout(() => {
        const mock = MOCK_RESULTS[selectedArea!] ?? MOCK_RESULTS['skin-fur'];
        const newResult: DiagnosticResult = {
          id: Date.now().toString(),
          petId: safePet.id,
          date: '2026-06-22',
          bodyArea: selectedArea!,
          symptoms: Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join(' | ') || 'Photo scan only',
          photoUrl: photoPreviewUrl ?? undefined,
          ...mock,
        };
        setResult(newResult);
        setStep('result');
      }, 600);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setAnalysisStep((s) => s + 1);
    }, 700);
    return () => clearTimeout(timeout);
  }, [step, analysisStep]);

  function handleSave() {
    if (!result) return;
    addDiagnosticResult(result);
    const followUpDate = new Date('2026-06-22');
    followUpDate.setDate(followUpDate.getDate() + 2);
    const followUpReminder: Reminder = {
      id: `fu-reminder-${result.id}`,
      petId: safePet.id,
      type: 'checkup',
      title: `Follow-up: ${result.possibleIssue}`,
      datetime: `${followUpDate.toISOString().slice(0, 10)}T09:00:00`,
      notes: `2-day follow-up for AI Diagnostic (${areaLabel})`,
      done: false,
    };
    addReminder(followUpReminder);
    setStep('saved');
  }

  function handleFollowUpStatusSelect(status: string) {
    setFollowUpStatus(status);
    const urgency = result?.urgency ?? 'low';
    setFollowUpReply(FOLLOW_UP_REPLIES[status]?.[urgency] ?? '');
    if (result && (status === 'improved' || status === 'same' || status === 'worse')) {
      const followUp: DiagnosticFollowUp = {
        id: `${Date.now()}`,
        petId: safePet.id,
        diagnosticId: result.id,
        date: '2026-06-22',
        status: status as 'improved' | 'same' | 'worse',
      };
      addDiagnosticFollowUp(followUp);
    }
  }

  const urgencyConf = result ? URGENCY_CONFIG[result.urgency] : null;
  const stepIndex = step === 'area' ? 0 : step === 'photo' ? 1 : step === 'questionnaire' ? 2 : step === 'analyzing' ? 3 : 4;

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="AI Diagnostics" showBack subtitle={pet.name} />
      {step !== 'saved' && <StepDots current={stepIndex} total={5} />}

      <main className="flex-1 px-4 py-4 pb-28 space-y-4 overflow-y-auto">

        {/* ─── STEP: Body Part Selection ─── */}
        {step === 'area' && (
          <>
            <PetContextBanner pet={pet} />
            <p className="text-sm font-bold text-slate-800 px-1">Where is {pet.name}'s problem?</p>
            <p className="text-xs text-slate-400 px-1 -mt-2">Select the body area you want to scan</p>
            <div className="grid grid-cols-3 gap-2.5">
              {areas.map((area) => {
                const Illustration = AREA_ILLUSTRATIONS[area.id];
                return (
                  <button
                    key={area.id}
                    onClick={() => { setSelectedArea(area.id); setStep('photo'); }}
                    className="bg-white rounded-2xl shadow-card p-3 flex flex-col items-center gap-2 hover:shadow-card-md active:scale-[0.97] transition-all border border-transparent hover:border-sky-200"
                  >
                    <div className="w-14 h-14">
                      {Illustration ? <Illustration /> : <div className="w-full h-full rounded-full bg-slate-100" />}
                    </div>
                    <p className="text-[11px] font-semibold text-slate-700 text-center leading-tight">{area.label}</p>
                    <p className="text-[10px] text-slate-400 text-center leading-tight">{area.sublabel}</p>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* ─── STEP: Photo Capture ─── */}
        {step === 'photo' && (
          <>
            <PetContextBanner pet={pet} />
            <div>
              <p className="text-sm font-bold text-slate-800">Take a clear photo of {pet.name}'s {areaLabel.toLowerCase()}</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Good lighting helps the AI analysis. Keep the affected area centered and in focus.
              </p>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file, 'camera');
              }}
            />
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file, 'gallery');
              }}
            />

            {!photoPreviewUrl ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => cameraInputRef.current?.click()}
                    className="bg-white rounded-2xl border-2 border-dashed border-sky-300 py-8 flex flex-col items-center gap-2 hover:bg-sky-50 active:bg-sky-100 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                      <Camera size={22} className="text-sky-500" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-semibold text-sky-600">Take Photo</p>
                  </button>
                  <button
                    onClick={() => galleryInputRef.current?.click()}
                    className="bg-white rounded-2xl border-2 border-dashed border-slate-200 py-8 flex flex-col items-center gap-2 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center">
                      <Upload size={22} className="text-slate-400" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-semibold text-slate-500">Choose from Gallery</p>
                  </button>
                </div>

                {/* Photo tips */}
                <div className="bg-amber-50 rounded-2xl px-4 py-3 flex items-start gap-2.5 border border-amber-100">
                  <Lightbulb size={16} className="text-amber-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-amber-800">Tips for a better scan</p>
                    <ul className="text-[11px] text-amber-700 space-y-0.5 leading-relaxed">
                      <li>Use natural daylight or a bright lamp</li>
                      <li>Fill the frame with the affected area</li>
                      <li>Keep steady to avoid blur</li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-white rounded-2xl overflow-hidden shadow-card">
                  <img src={photoPreviewUrl} alt="Photo preview" className="w-full h-52 object-cover" />
                  <div className="px-4 py-3 flex items-center justify-between border-t border-slate-50">
                    <button
                      onClick={() => {
                        if (photoSource === 'camera') cameraInputRef.current?.click();
                        else galleryInputRef.current?.click();
                      }}
                      className="flex items-center gap-1.5 text-xs text-sky-500 font-semibold"
                    >
                      {photoSource === 'camera' ? <><RefreshCw size={13} strokeWidth={2} /> Retake Photo</> : <><Image size={13} strokeWidth={2} /> Choose Another</>}
                    </button>
                    <button onClick={handleRemovePhoto} className="flex items-center gap-1.5 text-xs text-red-500 font-semibold">
                      <X size={13} strokeWidth={2} /> Remove
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setStep(SDK_QUESTIONNAIRE_ENABLED ? 'questionnaire' : 'analyzing')}
                  className="w-full bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors"
                >
                  Continue
                </button>
              </div>
            )}
          </>
        )}

        {/* ─── STEP: SDK Questionnaire ─── */}
        {step === 'questionnaire' && (
          <>
            <PetContextBanner pet={pet} />
            <div>
              <p className="text-sm font-bold text-slate-800">Help improve the analysis</p>
              <p className="text-xs text-slate-400 mt-0.5">Answer a few quick questions for a more accurate result.</p>
            </div>

            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="bg-white rounded-2xl shadow-card p-4 space-y-2.5">
                  <p className="text-xs font-semibold text-slate-700">{q.question}</p>
                  <div className="flex flex-wrap gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          answers[q.id] === opt ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => startAnalysis(true)}
                className="flex-1 bg-white border border-slate-200 text-slate-500 font-medium text-sm py-3.5 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                Skip questionnaire
              </button>
              <button
                onClick={() => startAnalysis(false)}
                className="flex-1 bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </>
        )}

        {/* ─── STEP: Analysis Loading ─── */}
        {step === 'analyzing' && (
          <div className="space-y-6 pt-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-4">
                <Loader size={28} className="text-sky-500 animate-spin" strokeWidth={2} />
              </div>
              <p className="text-base font-bold text-slate-800">Analyzing {areaLabel.toLowerCase()}...</p>
              <p className="text-xs text-slate-400 mt-1">This usually takes a few seconds</p>
            </div>
            <div className="bg-white rounded-2xl shadow-card p-5 space-y-3">
              {analysisMessages.map((msg, i) => {
                const done = analysisStep > i;
                const active = analysisStep === i;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      done ? 'bg-emerald-100' : active ? 'bg-sky-100' : 'bg-slate-50'
                    }`}>
                      {done ? (
                        <CheckCircle size={14} className="text-emerald-500" strokeWidth={2.5} />
                      ) : active ? (
                        <Loader size={14} className="text-sky-500 animate-spin" strokeWidth={2.5} />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                      )}
                    </div>
                    <span className={`text-sm transition-colors ${
                      done ? 'text-emerald-700 font-medium' : active ? 'text-sky-700 font-medium' : 'text-slate-400'
                    }`}>
                      {msg}{active ? '...' : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── STEP: Result ─── */}
        {step === 'result' && result && urgencyConf && (
          <>
            <PetContextBanner pet={pet} />

            {/* Uploaded photo + heatmap overlay */}
            {photoPreviewUrl && (
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="relative">
                  <img src={photoPreviewUrl} alt="Scan" className="w-full h-44 object-cover" />
                  {/* Simulated heatmap overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-orange-400/15 to-transparent pointer-events-none" />
                  <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 rounded-full bg-red-500/25 blur-md pointer-events-none" />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-[10px] text-white font-medium">AI heatmap: abnormal areas detected</span>
                  </div>
                </div>
              </div>
            )}

            {/* Urgency banner */}
            <div className={`rounded-2xl border px-4 py-3.5 flex items-center gap-3 ${urgencyConf.bg}`}>
              <urgencyConf.Icon size={22} className={urgencyConf.text} strokeWidth={2} />
              <div>
                <p className={`text-sm font-bold ${urgencyConf.text}`}>{urgencyConf.label}</p>
                <p className={`text-xs ${urgencyConf.text} opacity-80 mt-0.5 leading-snug`}>{result.possibleIssue}</p>
              </div>
            </div>

            {/* Source note */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
              <p className="text-[11px] text-slate-500">
                {questionnaireSkipped
                  ? 'Questionnaire skipped. Accuracy may be lower.'
                  : 'Photo scan and questionnaire used for this result.'}
              </p>
            </div>

            {/* Sections */}
            {[
              { Icon: Zap, title: 'Possible Causes', items: result.possibleCauses, color: 'text-sky-500', bg: 'bg-sky-50' },
              { Icon: CheckCircle, title: 'What To Do Now', items: result.whatToDoNow, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { Icon: BookOpen, title: 'What To Monitor', items: result.whatToMonitor, color: 'text-amber-500', bg: 'bg-amber-50' },
              { Icon: XCircle, title: 'What NOT To Do', items: result.whatNotToDo, color: 'text-red-500', bg: 'bg-red-50' },
            ].map(({ Icon, title, items, color, bg }) => (
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
                      <span className="text-slate-300 mt-1 flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-slate-800 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Follow-up Recommendation</p>
              <p className="text-sm text-slate-100 leading-relaxed">{result.followUpRecommendation}</p>
            </div>

            {/* Action buttons */}
            <button
              onClick={handleSave}
              className="w-full bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} strokeWidth={2} />
              Save to Health Timeline
            </button>
          </>
        )}

        {/* ─── STEP: Saved + Follow-up ─── */}
        {step === 'saved' && result && urgencyConf && (
          <>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle size={22} className="text-emerald-600 flex-shrink-0" strokeWidth={2} />
              <div>
                <p className="text-sm font-bold text-emerald-800">Saved to Health Timeline</p>
                <p className="text-xs text-emerald-600 mt-0.5">{pet.name}'s record has been updated</p>
              </div>
            </div>

            <div className={`rounded-2xl border px-4 py-3 flex items-center gap-3 ${urgencyConf.bg}`}>
              <urgencyConf.Icon size={18} className={urgencyConf.text} strokeWidth={2} />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${urgencyConf.text}`}>{urgencyConf.label} · {areaLabel}</p>
                <p className={`text-xs ${urgencyConf.text} opacity-80 mt-0.5 truncate`}>{result.possibleIssue}</p>
              </div>
            </div>

            {!followUpOpen && (
              <div className="space-y-3">
                <button
                  onClick={() => setFollowUpOpen(true)}
                  className="w-full bg-white border border-slate-200 text-slate-700 font-semibold text-sm py-3.5 rounded-2xl hover:bg-slate-50 active:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} className="text-sky-500" strokeWidth={2} />
                  Start Follow-up
                </button>
                <button
                  onClick={resetDiagnostic}
                  className="w-full text-sky-500 font-semibold text-sm py-2.5 rounded-2xl hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight size={15} strokeWidth={2} />
                  Start New Analysis
                </button>
              </div>
            )}

            {followUpOpen && (
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="px-4 pt-4 pb-3 border-b border-slate-50">
                  <p className="text-sm font-bold text-slate-800">How is {pet.name} today?</p>
                  <p className="text-xs text-slate-400 mt-0.5">Following up on: {areaLabel} · {result.possibleIssue}</p>
                </div>

                {!followUpStatus && (
                  <div className="px-4 py-3 space-y-2">
                    {[
                      { id: 'improved', label: 'Improved', Icon: CheckCircle, iconColor: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200 hover:border-emerald-300' },
                      { id: 'same', label: 'Same', Icon: AlertTriangle, iconColor: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200 hover:border-amber-300' },
                      { id: 'worse', label: 'Worse', Icon: XCircle, iconColor: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200 hover:border-red-300' },
                    ].map(({ id, label, Icon, iconColor, bg, border }) => (
                      <button
                        key={id}
                        onClick={() => handleFollowUpStatusSelect(id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-white transition-all ${border} active:scale-[0.99]`}
                      >
                        <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                          <Icon size={17} className={iconColor} strokeWidth={2} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{label}</span>
                        <ChevronRight size={14} className="text-slate-300 ml-auto" />
                      </button>
                    ))}
                  </div>
                )}

                {followUpStatus && (
                  <div className="px-4 py-4 space-y-3">
                    <div className={`rounded-xl border px-3 py-2 flex items-center gap-2 ${
                      followUpStatus === 'improved' ? 'bg-emerald-50 border-emerald-200' :
                      followUpStatus === 'same' ? 'bg-amber-50 border-amber-200' :
                      'bg-red-50 border-red-200'
                    }`}>
                      <span className="text-xs font-bold text-slate-600 capitalize">{followUpStatus}</span>
                      <span className="text-[10px] text-slate-400">· {areaLabel}</span>
                    </div>
                    {followUpReply && (
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-xs text-slate-700 leading-relaxed">{followUpReply}</p>
                      </div>
                    )}
                    <button
                      onClick={resetDiagnostic}
                      className="w-full text-sky-500 font-semibold text-sm py-2.5 rounded-xl hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowRight size={15} strokeWidth={2} />
                      Start New Analysis
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
