import { useState, useRef, useEffect } from 'react';
import {
  Camera, Upload, ChevronRight, AlertTriangle, CheckCircle, XCircle,
  BookOpen, Save, MessageSquare, Zap, Lightbulb, ArrowRight, Loader, X, RefreshCw, Image,
} from 'lucide-react';
import TopBar from '../../components/TopBar';
import { useApp } from '../../context/AppContext';
import type { BodyArea, UrgencyLevel, DiagnosticResult, DiagnosticFollowUp, Reminder } from '../../types';

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

function IllustrationWound() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="16" width="28" height="8" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.8"/>
      <rect x="15" y="14" width="10" height="12" rx="2" fill="#fecaca" stroke="#ef4444" strokeWidth="1.4"/>
      <line x1="20" y1="16" x2="20" y2="26" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="20" x2="24" y2="20" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="18" x2="9" y2="22" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="31" y1="18" x2="31" y2="22" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

function IllustrationStool() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="20" cy="32" rx="11" ry="3.5" fill="#d1d5db"/>
      <path d="M13 30 Q12 24 16 22 Q14 18 18 16 Q16 12 20 11 Q24 12 22 16 Q26 18 24 22 Q28 24 27 30 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M30 16 Q32 14 30 12 Q32 10 30 8" stroke="#fca5a5" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M33 18 Q35 16 33 14 Q35 12 33 10" stroke="#fca5a5" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function IllustrationVomit() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="20" cy="18" rx="10" ry="9" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.8"/>
      <line x1="15" y1="13" x2="17" y2="15" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="17" y1="13" x2="15" y2="15" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="23" y1="13" x2="25" y2="15" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="25" y1="13" x2="23" y2="15" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 20 Q17 22 20 20 Q23 18 25 20" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M18 27 Q18 32 20 34 Q22 32 22 27" fill="#bbf7d0" stroke="#22c55e" strokeWidth="1.2"/>
    </svg>
  );
}

function IllustrationPaws() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* main pad */}
      <ellipse cx="20" cy="26" rx="8" ry="7" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.8"/>
      {/* toe pads */}
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
      {/* open mouth shape */}
      <path d="M8 18 Q8 10 20 10 Q32 10 32 18 L32 24 Q32 34 20 34 Q8 34 8 24 Z" fill="#d1fae5" stroke="#10b981" strokeWidth="1.8"/>
      {/* upper teeth */}
      <rect x="12" y="18" width="4" height="5" rx="1.5" fill="white" stroke="#10b981" strokeWidth="1"/>
      <rect x="18" y="17" width="4" height="6" rx="1.5" fill="white" stroke="#10b981" strokeWidth="1"/>
      <rect x="24" y="18" width="4" height="5" rx="1.5" fill="white" stroke="#10b981" strokeWidth="1"/>
      {/* tongue */}
      <ellipse cx="20" cy="29" rx="6" ry="3.5" fill="#fda4af"/>
      <line x1="20" y1="25.5" x2="20" y2="32" stroke="#fb7185" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function IllustrationOther() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="20" cy="20" r="14" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.8"/>
      <text x="20" y="26" textAnchor="middle" fontSize="18" fontWeight="700" fill="#64748b" fontFamily="serif">?</text>
    </svg>
  );
}

const AREA_ILLUSTRATIONS: Record<BodyArea, React.ElementType> = {
  'skin-fur': IllustrationSkinFur,
  eyes: IllustrationEye,
  ears: IllustrationEar,
  paws: IllustrationPaws,
  'mouth-teeth': IllustrationMouth,
  wound: IllustrationWound,
  stool: IllustrationStool,
  vomit: IllustrationVomit,
  other: IllustrationOther,
};

interface AreaDef {
  id: BodyArea;
  label: string;
  sublabel: string;
  bg: string;
}

const BODY_AREAS: AreaDef[] = [
  { id: 'skin-fur',    label: 'Skin / Fur',    sublabel: 'Itching, rash, hair loss', bg: 'bg-teal-50' },
  { id: 'eyes',        label: 'Eyes',          sublabel: 'Redness, discharge',       bg: 'bg-sky-50' },
  { id: 'ears',        label: 'Ears',          sublabel: 'Scratching, bad smell',    bg: 'bg-violet-50' },
  { id: 'paws',        label: 'Paws',          sublabel: 'Licking, limping',         bg: 'bg-amber-50' },
  { id: 'mouth-teeth', label: 'Teeth / Mouth', sublabel: 'Bad breath, gums',        bg: 'bg-emerald-50' },
  { id: 'other',       label: 'Other',         sublabel: 'Something else',          bg: 'bg-slate-50' },
];

type MockResult = Omit<DiagnosticResult, 'id' | 'petId' | 'date' | 'bodyArea' | 'symptoms'>;

const MOCK_RESULTS: Record<BodyArea, MockResult> = {
  'skin-fur': {
    possibleIssue: 'Possible contact dermatitis or environmental allergy',
    urgency: 'low',
    possibleCauses: ['Grass or pollen contact allergy', 'New detergent or cleaning product', 'Dry skin due to seasonal change'],
    whatToDoNow: ['Rinse affected area with lukewarm water', 'Apply pet-safe soothing balm to the skin', 'Remove possible irritant from the environment'],
    whatToMonitor: ['Size and spread of affected area over 48–72 hours', 'Signs of excessive scratching or hot spots', 'Hair loss developing around the affected area'],
    whatNotToDo: ['Do not apply human cortisone or antiseptics', 'Avoid bathing too frequently as it strips natural oils'],
    followUpRecommendation: 'If redness or scratching persists beyond 5 days, consult a vet for a full allergy evaluation.',
  },
  eyes: {
    possibleIssue: 'Mild conjunctivitis or eye irritation',
    urgency: 'medium',
    possibleCauses: ['Dust or airborne allergens', 'Early bacterial infection', 'Foreign body irritation'],
    whatToDoNow: ['Gently wipe discharge with sterile gauze', 'Keep area clean and dry', 'Prevent pawing at the eye'],
    whatToMonitor: ['Colour of discharge (clear vs. yellow/green)', 'Frequency of squinting', 'Redness progression over 24–48 hours'],
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
    whatToDoNow: ['Introduce toothbrushing with pet-safe toothpaste', 'Offer dental chews appropriate for body size', 'Check gum colour — healthy gums should be pink'],
    whatToMonitor: ['Persistent bad breath', 'Reluctance to eat hard food', 'Bleeding or swollen gums'],
    whatNotToDo: ['Do not use human toothpaste — xylitol is toxic to pets', 'Avoid giving bones that can splinter'],
    followUpRecommendation: 'Schedule a professional dental cleaning with a veterinarian within the next 2–3 months.',
  },
  stool: {
    possibleIssue: 'Gastrointestinal irregularity or dietary intolerance',
    urgency: 'medium',
    possibleCauses: ['Dietary change or new food introduction', 'Intestinal parasite activity', 'Viral or bacterial gut irritation'],
    whatToDoNow: ['Withhold food for 4–6 hours, keep fresh water available', 'Reintroduce a bland diet such as boiled chicken and rice', 'Monitor frequency and stool consistency closely'],
    whatToMonitor: ['Blood in stool (red or black colouration)', 'Number of diarrhea episodes per hour', 'Signs of dehydration: lethargy, dry gums, sunken eyes'],
    whatNotToDo: ['Do not give human anti-diarrheal medication', 'Avoid fatty or rich foods during recovery'],
    followUpRecommendation: 'If diarrhea persists beyond 48 hours, worsens, or blood is visible, seek veterinary evaluation immediately.',
  },
  vomit: {
    possibleIssue: 'Acute gastric upset or mild nausea',
    urgency: 'medium',
    possibleCauses: ['Eating too quickly or overeating', 'Ingestion of a foreign object or plant', 'Motion sickness or acute stress', 'Mild intestinal irritation'],
    whatToDoNow: ['Withhold food for 2–4 hours after the last vomiting episode', 'Offer small sips of fresh water every 30 minutes', 'Remove access to foreign objects, plants, and garbage'],
    whatToMonitor: ['Frequency of vomiting — once vs. repeated episodes', 'Presence of blood or foreign material in vomit', 'Signs of lethargy or abdominal pain when touching belly'],
    whatNotToDo: ['Do not give human antiemetics or antacids', 'Do not force feed immediately after vomiting'],
    followUpRecommendation: 'If vomiting continues beyond 24 hours, contains blood, or is accompanied by lethargy, seek emergency veterinary care.',
  },
  wound: {
    possibleIssue: 'Open wound or skin laceration requiring immediate attention',
    urgency: 'high',
    possibleCauses: ['Bite or scratch from another animal', 'Sharp object injury during outdoor activity', 'Fall or impact trauma'],
    whatToDoNow: ['Gently clean the wound with sterile saline solution', 'Apply light pressure with a clean cloth to control bleeding', 'Keep the pet calm and prevent licking with an e-collar'],
    whatToMonitor: ['Signs of infection: swelling, pus, increasing redness, warmth', 'Whether the wound is deepening or spreading', 'Changes in behaviour or pain response'],
    whatNotToDo: ['Do not use hydrogen peroxide directly on open wounds', 'Do not allow licking as it introduces bacteria', 'Do not attempt to close the wound yourself with tape or glue'],
    followUpRecommendation: 'Wounds deeper than 1 cm, any bite wound, or wounds with swelling should be assessed by a veterinarian within 24 hours.',
  },
  other: {
    possibleIssue: 'Unspecified health concern requiring observation',
    urgency: 'low',
    possibleCauses: ['Environmental stressor or recent change at home', 'Minor behavioural or physical change', 'Early symptom of a developing condition'],
    whatToDoNow: ['Document the observed symptoms with photos and written notes', 'Monitor behaviour, eating, drinking, and activity levels', 'Create a quiet, comfortable resting environment'],
    whatToMonitor: ['Any progression or worsening of the observed symptoms', 'Changes in appetite, thirst, or bowel habits', 'Signs of discomfort or behavioural changes'],
    whatNotToDo: ['Do not self-medicate with human or leftover pet medications', 'Avoid stressing the pet with excessive handling or examinations'],
    followUpRecommendation: 'If symptoms persist beyond 3 days or new symptoms appear, schedule a veterinary consultation for a thorough evaluation.',
  },
};

const FOLLOW_UP_REPLIES: Record<string, Record<UrgencyLevel, string>> = {
  improved: {
    low: "That's great news! Continued improvement is a very positive sign. Keep monitoring the area and maintain current care. If symptoms fully resolve within the next 24–48 hours, no further action is needed.",
    medium: "Improvement is encouraging. Continue the care steps and keep the area clean. Watch for any regression over the next 48 hours — if symptoms return or worsen, a veterinary assessment is the right next step.",
    high: "Glad to hear some improvement. For a wound of this nature, improvement is positive but close monitoring remains essential. Ensure the area stays clean and protected. If any redness, swelling, or discharge appears, seek veterinary evaluation.",
  },
  same: {
    low: "No change after a day or two may simply mean the issue needs more time to resolve. Continue the recommended care steps and monitor closely. If there is no improvement within 3–5 days, a veterinary consultation is a good idea.",
    medium: "Symptoms staying the same after 24–48 hours means the issue has not resolved on its own. A veterinary assessment this week is recommended to confirm the cause and appropriate treatment.",
    high: "For a high-urgency condition showing no change, professional veterinary evaluation should not be delayed further. Please arrange a visit as soon as possible.",
  },
  worse: {
    low: "Worsening symptoms even in a previously low-urgency situation should be taken seriously. Upgrade care attention, keep the pet rested and away from irritants, and book a veterinary appointment within the next 24–48 hours.",
    medium: "Worsening symptoms at this urgency level require prompt attention. Please arrange a veterinary visit today or tomorrow. Bring photos of the progression if you have them.",
    high: "Worsening symptoms at high urgency require immediate veterinary care. Please do not wait — contact your nearest emergency veterinary clinic today.",
  },
};

const SYMPTOMS_LIST = [
  'Itching', 'Redness', 'Swelling', 'Loss of appetite',
  'Vomiting', 'Diarrhea', 'Fatigue', 'Pain',
];
const DURATION_OPTIONS = ['Today', '1–3 days', '4–7 days', 'More than a week'];
const EATING_OPTIONS = [{ id: 'normally', label: 'Normally' }, { id: 'less', label: 'Less than usual' }, { id: 'not-eating', label: 'Not eating' }];
const DRINKING_OPTIONS = [{ id: 'normally', label: 'Normally' }, { id: 'less', label: 'Less than usual' }, { id: 'more', label: 'More than usual' }];
const ACTIVITY_OPTIONS = [{ id: 'active', label: 'Active' }, { id: 'tired', label: 'Tired' }, { id: 'apathetic', label: 'Apathetic' }];

type UrgencyConfig = { bg: string; text: string; Icon: typeof AlertTriangle; label: string };
const URGENCY_CONFIG: Record<UrgencyLevel, UrgencyConfig> = {
  low: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', Icon: CheckCircle, label: 'Low Urgency' },
  medium: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', Icon: AlertTriangle, label: 'Medium Urgency' },
  high: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', Icon: AlertTriangle, label: 'High Urgency' },
};

type Step = 1 | 2 | 3 | 4 | 5;

function ChipButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
        active ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
      }`}
    >
      {children}
    </button>
  );
}

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

function StepIndicator({ step }: { step: Step }) {
  const labels = ['Area', 'Photo', 'Symptoms', 'Result'];
  return (
    <div className="bg-white border-b border-slate-100 px-4 py-2.5 flex items-center gap-2">
      {labels.map((label, i) => {
        const s = (i + 1) as 1 | 2 | 3 | 4;
        const active = step === s;
        const done = step > s;
        return (
          <div key={s} className="flex items-center gap-1.5 flex-1 last:flex-none">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              done ? 'bg-sky-500 text-white' : active ? 'bg-sky-500 text-white ring-2 ring-sky-200' : 'bg-slate-100 text-slate-400'
            }`}>
              {done ? '✓' : s}
            </div>
            <span className={`text-[10px] font-semibold ${active ? 'text-sky-600' : done ? 'text-slate-400' : 'text-slate-300'}`}>{label}</span>
            {i < 3 && <div className={`flex-1 h-0.5 rounded-full ${done ? 'bg-sky-400' : 'bg-slate-100'}`} />}
          </div>
        );
      })}
    </div>
  );
}

export default function AIDiagnosticsPage() {
  const { getSelectedPet, addDiagnosticResult, addDiagnosticFollowUp, addReminder, setActiveTab } = useApp();
  const pet = getSelectedPet();

  const [step, setStep] = useState<Step>(1);
  const [selectedArea, setSelectedArea] = useState<BodyArea | null>(null);
  const [photoSimulated, setPhotoSimulated] = useState(false);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [photoSource, setPhotoSource] = useState<'camera' | 'gallery' | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [checkedSymptoms, setCheckedSymptoms] = useState<Set<string>>(new Set());
  const [eating, setEating] = useState('');
  const [drinking, setDrinking] = useState('');
  const [activity, setActivity] = useState('');
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [followUpOpen, setFollowUpOpen] = useState(false);
  const [followUpStatus, setFollowUpStatus] = useState<string | null>(null);
  const [followUpReply, setFollowUpReply] = useState('');
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [followUpQuestionReply, setFollowUpQuestionReply] = useState('');
  const [followUpNewPhoto, setFollowUpNewPhoto] = useState(false);

  if (!pet) return null;

  const safePet = pet;
  const areaLabel = BODY_AREAS.find((a) => a.id === selectedArea)?.label ?? '';

  function toggleSymptom(s: string) {
    setCheckedSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
  }

  function handleFileSelect(file: File, source: 'camera' | 'gallery') {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreviewUrl(e.target?.result as string);
      setPhotoSource(source);
      setPhotoSimulated(true);
    };
    reader.readAsDataURL(file);
  }

  function handleRemovePhoto() {
    setPhotoPreviewUrl(null);
    setPhotoSource(null);
    setPhotoSimulated(false);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (galleryInputRef.current) galleryInputRef.current.value = '';
  }

  function handleAnalyze() {
    if (!selectedArea) return;
    setAnalyzing(true);
    setAnalysisStep(0);
  }

  useEffect(() => {
    if (!analyzing) return;
    if (analysisStep >= 3) {
      const timeout = setTimeout(() => {
        const mock = MOCK_RESULTS[selectedArea!];
        const symptomsText = [
          description,
          duration ? `Duration: ${duration}` : '',
          checkedSymptoms.size > 0 ? `Symptoms: ${[...checkedSymptoms].join(', ')}` : '',
          eating ? `Eating: ${eating}` : '',
          drinking ? `Drinking: ${drinking}` : '',
          activity ? `Activity: ${activity}` : '',
        ].filter(Boolean).join(' | ');

        const newResult: DiagnosticResult = {
          id: Date.now().toString(),
          petId: safePet.id,
          date: '2026-06-18',
          bodyArea: selectedArea!,
          symptoms: symptomsText,
          photoUrl: photoSimulated ? 'simulated' : undefined,
          ...mock,
        };
        setResult(newResult);
        setAnalyzing(false);
        setAnalysisStep(0);
        setStep(4);
      }, 700);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setAnalysisStep((s) => s + 1);
    }, 800);
    return () => clearTimeout(timeout);
  }, [analyzing, analysisStep]);

  function handleSave() {
    if (result) {
      addDiagnosticResult(result);
      // Create Day 2 follow-up reminder
      const followUpDate = new Date(result.date);
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
      setStep(5);
    }
  }

  function handleFollowUpStatusSelect(status: string) {
    setFollowUpStatus(status);
    if (status === 'upload-photo') return;
    const urgency = result?.urgency ?? 'low';
    setFollowUpReply(FOLLOW_UP_REPLIES[status]?.[urgency] ?? '');
    if (result && (status === 'improved' || status === 'same' || status === 'worse')) {
      const followUp: DiagnosticFollowUp = {
        id: `${Date.now()}`,
        petId: safePet.id,
        diagnosticId: result.id,
        date: '2026-06-18',
        status: status as 'improved' | 'same' | 'worse',
      };
      addDiagnosticFollowUp(followUp);
    }
  }

  function handleAskFollowUpQuestion() {
    if (!followUpQuestion.trim()) return;
    setFollowUpQuestionReply(
      `Based on ${safePet.name}'s ${areaLabel.toLowerCase()} issue and your follow-up, the key priority is to monitor closely for the next 24–48 hours. Keep the area clean, avoid irritants, and maintain the recommended care steps from the original analysis.`,
    );
  }

  const urgencyConf = result ? URGENCY_CONFIG[result.urgency] : null;

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="AI Diagnostics" showBack subtitle={pet.name} />
      {step <= 4 && <StepIndicator step={step} />}

      <main className="flex-1 px-4 py-4 pb-28 space-y-4 overflow-y-auto">

        {/* Step 1: Area selection */}
        {step === 1 && (
          <>
            <PetContextBanner pet={pet} />
            <p className="text-sm font-bold text-slate-800 px-1">Where is the problem?</p>
            <div className="grid grid-cols-3 gap-2.5">
              {BODY_AREAS.map((area) => {
                const Illustration = AREA_ILLUSTRATIONS[area.id];
                return (
                  <button
                    key={area.id}
                    onClick={() => { setSelectedArea(area.id); setStep(2); }}
                    className="bg-white rounded-2xl shadow-card p-3 flex flex-col items-center gap-2 hover:shadow-card-md active:scale-[0.97] transition-all border border-transparent hover:border-sky-200"
                  >
                    <div className="w-14 h-14">
                      <Illustration />
                    </div>
                    <p className="text-[11px] font-semibold text-slate-700 text-center leading-tight">{area.label}</p>
                    <p className="text-[10px] text-slate-400 text-center leading-tight">{area.sublabel}</p>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Step 2: Photo */}
        {step === 2 && (
          <>
            <PetContextBanner pet={pet} />
            <div>
              <p className="text-sm font-semibold text-slate-800">Add a photo of {pet.name}'s {areaLabel.toLowerCase()}</p>
              <p className="text-xs text-slate-400 mt-0.5">A close-up photo helps the AI produce a more accurate result.</p>
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

            {!photoSimulated ? (
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
                    <p className="text-[10px] text-slate-400 leading-tight">Opens camera on mobile devices</p>
                  </button>
                  <button
                    onClick={() => galleryInputRef.current?.click()}
                    className="bg-white rounded-2xl border-2 border-dashed border-slate-200 py-8 flex flex-col items-center gap-2 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center">
                      <Upload size={22} className="text-slate-400" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-semibold text-slate-500">From Gallery</p>
                    <p className="text-[10px] text-slate-400 leading-tight">Choose from your photos</p>
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 text-center leading-relaxed px-2">
                  Camera capture is available on mobile. On desktop, choose an image to simulate the photo.
                </p>

                {/* Photo tips */}
                <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <button
                    onClick={() => setTipsOpen((p) => !p)}
                    className="w-full flex items-center justify-between px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <Lightbulb size={15} className="text-amber-500" strokeWidth={2} />
                      <span className="text-xs font-semibold text-slate-700">Tips for a better photo</span>
                    </div>
                    <ArrowRight size={14} className={`text-slate-300 transition-transform ${tipsOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {tipsOpen && (
                    <div className="px-4 pb-4 space-y-2">
                      {[
                        'Use natural daylight or a bright lamp — avoid flash directly on the area',
                        'Move close enough to fill the frame with the affected area',
                        'Keep your hand or the pet steady to avoid blur',
                        'Gently clean the area before photographing if it is safe to do so',
                      ].map((tip, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 text-xs mt-0.5 flex-shrink-0">•</span>
                          <p className="text-xs text-slate-500 leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button onClick={() => setStep(3)} className="w-full text-sm text-slate-400 hover:text-slate-600 py-2 transition-colors">
                  Skip — continue without photo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-white rounded-2xl overflow-hidden shadow-card">
                  {photoPreviewUrl ? (
                    <img
                      src={photoPreviewUrl}
                      alt="Photo preview"
                      className="w-full h-52 object-cover"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-52 flex flex-col items-center justify-center gap-2">
                      <Camera size={32} className="text-slate-400" strokeWidth={1.5} />
                      <p className="text-xs text-slate-400">Photo captured</p>
                    </div>
                  )}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (photoSource === 'camera') {
                          cameraInputRef.current?.click();
                        } else {
                          galleryInputRef.current?.click();
                        }
                      }}
                      className="flex items-center gap-1.5 text-xs text-sky-500 font-semibold hover:opacity-80 transition-opacity"
                    >
                      {photoSource === 'camera' ? (
                        <><RefreshCw size={13} strokeWidth={2} /> Retake Photo</>
                      ) : (
                        <><Image size={13} strokeWidth={2} /> Choose Another Photo</>
                      )}
                    </button>
                    <button
                      onClick={handleRemovePhoto}
                      className="flex items-center gap-1.5 text-xs text-red-500 font-semibold hover:opacity-80 transition-opacity"
                    >
                      <X size={13} strokeWidth={2} /> Remove Photo
                    </button>
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
          </>
        )}

        {/* Step 3: Symptoms */}
        {step === 3 && (
          <>
            <PetContextBanner pet={pet} />

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Describe the problem <span className="text-red-400">*</span></p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`e.g. "${pet.name} has been scratching frequently, there's slight redness, and it started 3 days ago..."`}
                className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400 resize-none leading-relaxed"
                rows={4}
              />
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-2.5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">How long has it been present?</p>
              <div className="flex flex-wrap gap-2">
                {DURATION_OPTIONS.map((opt) => (
                  <ChipButton key={opt} active={duration === opt} onClick={() => setDuration(duration === opt ? '' : opt)}>
                    {opt}
                  </ChipButton>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-2.5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Observed symptoms</p>
              <div className="grid grid-cols-2 gap-2">
                {SYMPTOMS_LIST.map((s) => {
                  const checked = checkedSymptoms.has(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSymptom(s)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                        checked ? 'bg-sky-50 border-sky-300 text-sky-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-sky-200'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md border flex-shrink-0 flex items-center justify-center transition-colors ${
                        checked ? 'bg-sky-500 border-sky-500' : 'border-slate-300 bg-white'
                      }`}>
                        {checked && <span className="text-white text-[9px] font-black leading-none">✓</span>}
                      </div>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
              {[
                { label: 'Eating', opts: EATING_OPTIONS, val: eating, set: setEating },
                { label: 'Drinking', opts: DRINKING_OPTIONS, val: drinking, set: setDrinking },
                { label: 'Activity level', opts: ACTIVITY_OPTIONS, val: activity, set: setActivity },
              ].map(({ label, opts, val, set }) => (
                <div key={label}>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{label}</p>
                  <div className="flex flex-wrap gap-2">
                    {opts.map((o) => (
                      <ChipButton key={o.id} active={val === o.id} onClick={() => set(val === o.id ? '' : o.id)}>
                        {o.label}
                      </ChipButton>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                disabled={analyzing}
                className="flex-1 bg-white border border-slate-200 text-slate-600 font-semibold text-sm py-3.5 rounded-2xl hover:bg-slate-50 transition-colors disabled:opacity-40"
              >
                Back
              </button>
              <button
                onClick={handleAnalyze}
                disabled={description.trim().length < 5 || analyzing}
                className="flex-1 bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors disabled:opacity-40"
              >
                Analyze
              </button>
            </div>

            {analyzing && (
              <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
                <div className="text-center mb-2">
                  <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center mx-auto mb-3">
                    <Loader size={24} className="text-sky-500 animate-spin" strokeWidth={2} />
                  </div>
                  <p className="text-sm font-bold text-slate-800">Analyzing image...</p>
                  <p className="text-xs text-slate-400 mt-0.5">Please wait while our AI processes the data</p>
                </div>
                <div className="space-y-3">
                  {[
                    'Checking image quality',
                    'Detecting visible signs',
                    'Generating AI insights',
                  ].map((label, i) => {
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
                          {label}{active ? '...' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Step 4: AI Result */}
        {step === 4 && result && urgencyConf && (
          <>
            <PetContextBanner pet={pet} />

            <div className={`rounded-2xl border px-4 py-3.5 flex items-center gap-3 ${urgencyConf.bg}`}>
              <urgencyConf.Icon size={22} className={urgencyConf.text} strokeWidth={2} />
              <div>
                <p className={`text-sm font-bold ${urgencyConf.text}`}>{urgencyConf.label}</p>
                <p className={`text-xs ${urgencyConf.text} opacity-80 mt-0.5 leading-snug`}>{result.possibleIssue}</p>
              </div>
            </div>

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

            <button
              onClick={handleSave}
              className="w-full bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save size={16} strokeWidth={2} />
              Save to Health Timeline
            </button>
          </>
        )}

        {/* Step 5: Saved + Follow-up */}
        {step === 5 && result && urgencyConf && (
          <>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle size={22} className="text-emerald-600 flex-shrink-0" strokeWidth={2} />
              <div>
                <p className="text-sm font-bold text-emerald-800">Saved to Health Timeline</p>
                <p className="text-xs text-emerald-600 mt-0.5">{pet.name}'s record has been updated in Health History</p>
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
                  onClick={() => setActiveTab('assistant')}
                  className="w-full text-sky-500 font-semibold text-sm py-2.5 rounded-2xl hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowRight size={15} strokeWidth={2} />
                  Ask AI Assistant
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
                      { id: 'upload-photo', label: 'Upload new photo', Icon: Camera, iconColor: 'text-sky-500', bg: 'bg-sky-50', border: 'border-sky-200 hover:border-sky-300' },
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

                {followUpStatus === 'upload-photo' && (
                  <div className="px-4 py-4 space-y-3">
                    {!followUpNewPhoto ? (
                      <button
                        onClick={() => setFollowUpNewPhoto(true)}
                        className="w-full bg-slate-50 rounded-xl border-2 border-dashed border-sky-300 py-10 flex flex-col items-center gap-2 hover:bg-sky-50 transition-colors"
                      >
                        <Camera size={26} className="text-sky-400" strokeWidth={1.5} />
                        <p className="text-xs font-semibold text-sky-600">Take or upload a follow-up photo</p>
                      </button>
                    ) : (
                      <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-36 rounded-xl flex flex-col items-center justify-center gap-2">
                        <Camera size={24} className="text-slate-400" strokeWidth={1.5} />
                        <p className="text-xs text-slate-400">Follow-up photo captured</p>
                      </div>
                    )}
                    <p className="text-xs text-slate-500 leading-relaxed">
                      The AI will use this alongside the original {areaLabel.toLowerCase()} diagnosis to track {pet.name}'s progression.
                    </p>
                    <button
                      onClick={() => setActiveTab('assistant')}
                      className="w-full text-sky-500 font-semibold text-sm py-2.5 rounded-xl hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowRight size={15} strokeWidth={2} />
                      Ask AI Assistant for full analysis
                    </button>
                  </div>
                )}

                {followUpStatus && followUpStatus !== 'upload-photo' && (
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

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Have another question?</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={followUpQuestion}
                          onChange={(e) => setFollowUpQuestion(e.target.value)}
                          placeholder="Ask a follow-up question..."
                          className="flex-1 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400"
                        />
                        <button
                          onClick={handleAskFollowUpQuestion}
                          disabled={!followUpQuestion.trim()}
                          className="px-4 py-2 bg-sky-500 text-white text-sm font-semibold rounded-xl disabled:opacity-40 hover:bg-sky-600 transition-colors"
                        >
                          Ask
                        </button>
                      </div>
                      {followUpQuestionReply && (
                        <div className="bg-sky-50 rounded-xl p-3 border border-sky-100">
                          <p className="text-xs text-sky-800 leading-relaxed">{followUpQuestionReply}</p>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveTab('assistant')}
                      className="w-full text-sky-500 font-semibold text-sm py-2.5 rounded-xl hover:bg-sky-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <ArrowRight size={15} strokeWidth={2} />
                      Ask AI Assistant
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
