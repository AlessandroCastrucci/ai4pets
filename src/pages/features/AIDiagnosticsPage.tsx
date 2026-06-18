import { useState } from 'react';
import {
  Camera, Upload, ChevronRight, AlertTriangle, CheckCircle, XCircle,
  Eye, BookOpen, Save, MessageSquare, Zap, Smile, Droplets, Wind,
  Shield, HelpCircle, Layers, Volume2, Dog, Lightbulb, ArrowRight,
  Sparkles, FileText, Pill, History,
} from 'lucide-react';

// ─── Quick Check Illustrations ────────────────────────────────────────────────

function EyeIllustration({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Upper eyelid */}
      <path d="M6 24 C12 12, 36 12, 42 24" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Lower eyelid */}
      <path d="M6 24 C12 35, 36 35, 42 24" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Iris */}
      <circle cx="24" cy="24" r="7" stroke={stroke} strokeWidth="2" fill="none" />
      {/* Pupil */}
      <circle cx="24" cy="24" r="3" fill={stroke} opacity="0.7" />
      {/* Highlight */}
      <circle cx="26.5" cy="21.5" r="1.5" fill="white" opacity="0.9" />
      {/* Teardrop */}
      <path d="M10 28 Q9 31 11 33 Q13 31 12 28 Z" fill={stroke} opacity="0.5" />
      {/* Eyelashes top */}
      <line x1="16" y1="14" x2="15" y2="11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="24" y1="12" x2="24" y2="9"  stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="32" y1="14" x2="33" y2="11" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function EarIllustration({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ear shape – floppy dog ear */}
      <path d="M14 8 Q10 6 10 14 L11 36 Q11 41 18 42 Q26 43 28 36 L30 18 Q30 9 24 7 Z"
            stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            fill={stroke} fillOpacity="0.1" />
      {/* Inner canal curve 1 */}
      <path d="M17 14 Q16 22 17 30" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      {/* Inner canal curve 2 */}
      <path d="M21 12 Q20 22 21 32" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
      {/* Irritation dots */}
      <circle cx="15" cy="37" r="1.5" fill={stroke} opacity="0.45" />
      <circle cx="19" cy="39" r="1.5" fill={stroke} opacity="0.45" />
    </svg>
  );
}

function SkinIllustration({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Dog body */}
      <ellipse cx="23" cy="28" rx="14" ry="9" stroke={stroke} strokeWidth="2.2" fill={stroke} fillOpacity="0.1" />
      {/* Head */}
      <circle cx="36" cy="20" r="7" stroke={stroke} strokeWidth="2.2" fill={stroke} fillOpacity="0.1" />
      {/* Snout bump */}
      <ellipse cx="41" cy="22" rx="3" ry="2" stroke={stroke} strokeWidth="1.5" fill={stroke} fillOpacity="0.1" />
      {/* Ear */}
      <path d="M33 14 Q31 9 27 11 Q28 15 33 16 Z" stroke={stroke} strokeWidth="1.5" fill={stroke} fillOpacity="0.2" />
      {/* Front legs */}
      <line x1="15" y1="35" x2="13" y2="43" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="20" y1="36" x2="19" y2="44" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      {/* Back legs */}
      <line x1="30" y1="35" x2="31" y2="43" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M9 26 Q4 22 6 17" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* Rash dots on back */}
      <circle cx="18" cy="22" r="2"   stroke={stroke} strokeWidth="1.5" strokeDasharray="2 1" fill="none" opacity="0.7" />
      <circle cx="24" cy="20" r="1.5" stroke={stroke} strokeWidth="1.5" strokeDasharray="2 1" fill="none" opacity="0.7" />
      <circle cx="14" cy="25" r="1.5" stroke={stroke} strokeWidth="1.5" strokeDasharray="2 1" fill="none" opacity="0.7" />
    </svg>
  );
}

function PawIllustration({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Central pad */}
      <ellipse cx="24" cy="31" rx="9" ry="7.5" stroke={stroke} strokeWidth="2.2"
               fill={stroke} fillOpacity="0.18" />
      {/* Toe pad 1 */}
      <ellipse cx="12" cy="22" rx="4.5" ry="4"   stroke={stroke} strokeWidth="2" fill={stroke} fillOpacity="0.18" />
      {/* Toe pad 2 */}
      <ellipse cx="20" cy="17" rx="4.5" ry="4"   stroke={stroke} strokeWidth="2" fill={stroke} fillOpacity="0.18" />
      {/* Toe pad 3 */}
      <ellipse cx="29" cy="17" rx="4.5" ry="4"   stroke={stroke} strokeWidth="2" fill={stroke} fillOpacity="0.18" />
      {/* Toe pad 4 */}
      <ellipse cx="37" cy="22" rx="4.5" ry="4"   stroke={stroke} strokeWidth="2" fill={stroke} fillOpacity="0.18" />
    </svg>
  );
}

function VomitIllustration({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Stomach shape */}
      <path d="M14 30 Q10 24 14 18 Q18 12 24 13 Q31 13 34 19 Q38 26 34 31 Q30 38 24 38 Q17 38 14 30 Z"
            stroke={stroke} strokeWidth="2.2" fill={stroke} fillOpacity="0.12" />
      {/* Nausea wave lines rising upward */}
      <path d="M18 10 Q20 7 22 10 Q24 13 26 10" stroke={stroke} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M20 5  Q22 2 24 5  Q26 8  28 5"  stroke={stroke} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.45" />
      {/* Discomfort curved line inside belly */}
      <path d="M18 25 Q24 22 30 25" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}

function DiarrheaIllustration({ stroke }: { stroke: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Stool pile – bottom layer */}
      <ellipse cx="24" cy="38" rx="12" ry="4.5" stroke={stroke} strokeWidth="2" fill={stroke} fillOpacity="0.15" />
      {/* Middle layer */}
      <ellipse cx="24" cy="32" rx="9"  ry="4"   stroke={stroke} strokeWidth="2" fill={stroke} fillOpacity="0.15" />
      {/* Top layer */}
      <ellipse cx="24" cy="27" rx="6"  ry="3.5" stroke={stroke} strokeWidth="2" fill={stroke} fillOpacity="0.15" />
      {/* Tip swirl */}
      <path d="M24 24 Q26 21 24 19 Q22 17 24 15" stroke={stroke} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Motion lines – urgency */}
      <line x1="10" y1="28" x2="6"  y2="28" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <line x1="10" y1="33" x2="5"  y2="33" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"  />
      <line x1="38" y1="28" x2="42" y2="28" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <line x1="38" y1="33" x2="43" y2="33" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.4"  />
    </svg>
  );
}
import TopBar from '../../components/TopBar';
import { useApp } from '../../context/AppContext';
import type { BodyArea, UrgencyLevel, DiagnosticResult } from '../../types';

// ─── Types ────────────────────────────────────────────────────────────────────

type DiagStep =
  | 'start'
  | 'photo'
  | 'ai-suggest'
  | 'confirm-area'
  | 'area-history'
  | 'dont-know'
  | 'optional-photo'
  | 'symptoms'
  | 'result'
  | 'saved';

type EntryMode = 'photo' | 'quick-check' | 'dont-know' | null;

interface AreaDef {
  id: BodyArea;
  label: string;
  sublabel: string;
  Icon: React.ElementType;
  bg: string;
  iconColor: string;
}

interface QuickCheck {
  label: string;
  hint: string;
  area: BodyArea;
  Illustration: ({ stroke }: { stroke: string }) => React.ReactElement;
  stroke: string;
  bg: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BODY_AREAS: AreaDef[] = [
  { id: 'skin-fur',    label: 'Skin / Fur',    sublabel: 'Rashes, hair loss, itching',      Icon: Layers,     bg: 'bg-teal-50',    iconColor: 'text-teal-500'    },
  { id: 'eyes',        label: 'Eyes',           sublabel: 'Discharge, redness, squinting',   Icon: Eye,        bg: 'bg-sky-50',     iconColor: 'text-sky-500'     },
  { id: 'ears',        label: 'Ears',           sublabel: 'Scratching, odour, discharge',    Icon: Volume2,    bg: 'bg-violet-50',  iconColor: 'text-violet-500'  },
  { id: 'paws',        label: 'Paws',           sublabel: 'Licking, swelling, limping',      Icon: Dog,        bg: 'bg-amber-50',   iconColor: 'text-amber-500'   },
  { id: 'mouth-teeth', label: 'Teeth / Mouth',  sublabel: 'Bad breath, tartar, gums',        Icon: Smile,      bg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
  { id: 'stool',       label: 'Stool',          sublabel: 'Diarrhea, blood, consistency',    Icon: Droplets,   bg: 'bg-slate-100',  iconColor: 'text-slate-500'   },
  { id: 'vomit',       label: 'Vomit',          sublabel: 'Frequency, content, colour',      Icon: Wind,       bg: 'bg-rose-50',    iconColor: 'text-rose-500'    },
  { id: 'wound',       label: 'Wound',          sublabel: 'Cuts, bites, lacerations',        Icon: Shield,     bg: 'bg-red-50',     iconColor: 'text-red-500'     },
  { id: 'other',       label: 'Other',          sublabel: 'Something else entirely',         Icon: HelpCircle, bg: 'bg-slate-50',   iconColor: 'text-slate-400'   },
];

const QUICK_CHECKS: QuickCheck[] = [
  { label: 'Eye problem',  hint: 'Discharge · Redness',    area: 'eyes',     Illustration: EyeIllustration,       stroke: '#0ea5e9', bg: 'bg-sky-50'    },
  { label: 'Ear problem',  hint: 'Scratching · Odour',     area: 'ears',     Illustration: EarIllustration,       stroke: '#8b5cf6', bg: 'bg-violet-50' },
  { label: 'Skin problem', hint: 'Rash · Itching',         area: 'skin-fur', Illustration: SkinIllustration,      stroke: '#14b8a6', bg: 'bg-teal-50'   },
  { label: 'Paw problem',  hint: 'Licking · Limping',      area: 'paws',     Illustration: PawIllustration,       stroke: '#f59e0b', bg: 'bg-amber-50'  },
  { label: 'Vomiting',     hint: 'Nausea · Upset',         area: 'vomit',    Illustration: VomitIllustration,     stroke: '#f43f5e', bg: 'bg-rose-50'   },
  { label: 'Diarrhea',     hint: 'Loose stool · Urgency',  area: 'stool',    Illustration: DiarrheaIllustration,  stroke: '#64748b', bg: 'bg-slate-100' },
];

const AREA_KEYWORDS: Record<BodyArea, string[]> = {
  eyes:          ['eye', 'ocular', 'drop', 'redness', 'squint', 'discharge', 'blink', 'tear', 'vision'],
  ears:          ['ear', 'otitis', 'scratch', 'shake', 'odour', 'dark', 'wax'],
  'skin-fur':    ['skin', 'fur', 'coat', 'rash', 'itch', 'dermatit', 'allerg', 'hair', 'hot spot', 'flake'],
  paws:          ['paw', 'lick', 'limp', 'toe', 'claw', 'foot', 'feet'],
  'mouth-teeth': ['mouth', 'teeth', 'tooth', 'gum', 'breath', 'tartar', 'dental', 'oral'],
  stool:         ['stool', 'diarrhea', 'bowel', 'blood', 'consisten', 'soft', 'loose', 'feces'],
  vomit:         ['vomit', 'nausea', 'sick', 'bile', 'regurgit', 'throw up'],
  wound:         ['wound', 'cut', 'bite', 'bleed', 'lacerat', 'injury', 'sore'],
  other:         [],
};

const PHOTO_SUGGESTIONS: Record<string, { primary: BodyArea; secondary: BodyArea }> = {
  luna:  { primary: 'paws',     secondary: 'skin-fur' },
  rocky: { primary: 'skin-fur', secondary: 'ears'     },
  micio: { primary: 'eyes',     secondary: 'skin-fur' },
};

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

const SYMPTOMS_LIST = ['Itching', 'Redness', 'Swelling', 'Loss of appetite', 'Vomiting', 'Diarrhea', 'Fatigue', 'Pain'];
const DURATION_OPTIONS = ['Today', '1–3 days', '4–7 days', 'More than a week'];
const EATING_OPTIONS   = [{ id: 'normally', label: 'Normally' }, { id: 'less', label: 'Less than usual' }, { id: 'not-eating', label: 'Not eating' }];
const DRINKING_OPTIONS = [{ id: 'normally', label: 'Normally' }, { id: 'less', label: 'Less than usual' }, { id: 'more', label: 'More than usual' }];
const ACTIVITY_OPTIONS = [{ id: 'active', label: 'Active' }, { id: 'tired', label: 'Tired' }, { id: 'apathetic', label: 'Apathetic' }];

type UrgencyConfig = { bg: string; text: string; Icon: typeof AlertTriangle; label: string };
const URGENCY_CONFIG: Record<UrgencyLevel, UrgencyConfig> = {
  low:    { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', Icon: CheckCircle, label: 'Low Urgency'    },
  medium: { bg: 'bg-amber-50 border-amber-200',     text: 'text-amber-700',   Icon: AlertTriangle, label: 'Medium Urgency' },
  high:   { bg: 'bg-red-50 border-red-200',         text: 'text-red-700',     Icon: AlertTriangle, label: 'High Urgency'   },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function areaMatchesText(area: BodyArea, text: string): boolean {
  const lower = text.toLowerCase();
  return AREA_KEYWORDS[area].some((kw) => lower.includes(kw));
}

function suggestAreaFromText(text: string): BodyArea {
  const lower = text.toLowerCase();
  for (const area of Object.keys(AREA_KEYWORDS) as BodyArea[]) {
    if (area === 'other') continue;
    if (AREA_KEYWORDS[area].some((kw) => lower.includes(kw))) return area;
  }
  return 'other';
}

// ─── Small components ─────────────────────────────────────────────────────────

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

function AreaGrid({ selectedArea, onSelect }: { selectedArea: BodyArea | null; onSelect: (a: BodyArea) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {BODY_AREAS.map((area) => {
        const active = selectedArea === area.id;
        return (
          <button
            key={area.id}
            onClick={() => onSelect(area.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all active:scale-95 ${
              active ? 'border-sky-400 bg-sky-50' : 'border-slate-100 bg-white hover:border-sky-200'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl ${area.bg} flex items-center justify-center`}>
              <area.Icon size={20} className={area.iconColor} strokeWidth={1.5} />
            </div>
            <span className={`text-[11px] font-semibold text-center leading-tight ${active ? 'text-sky-700' : 'text-slate-700'}`}>{area.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function HealthContextCard({
  pet, lastDiagIssue, lastDiagDate, activeTherapyText, vaccineStatus, vaccineColor,
}: {
  pet: { photo: string; name: string; species: string; breed: string; age: number; weight: number };
  lastDiagIssue: string | null;
  lastDiagDate: string | null;
  activeTherapyText: string;
  vaccineStatus: string;
  vaccineColor: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-50">
        <img src={pet.photo} alt={pet.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-slate-800">{pet.name}</p>
          <p className="text-[11px] text-slate-400 capitalize">{pet.species} · {pet.breed} · {pet.age} yrs · {pet.weight} kg</p>
        </div>
      </div>
      <div className="px-4 py-3 grid grid-cols-3 divide-x divide-slate-100">
        <div className="pr-3">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Last issue</p>
          {lastDiagIssue ? (
            <>
              <p className="text-[11px] font-semibold text-slate-700 leading-snug line-clamp-2">{lastDiagIssue}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{lastDiagDate}</p>
            </>
          ) : (
            <p className="text-[11px] text-slate-400">No records</p>
          )}
        </div>
        <div className="px-3">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Therapy</p>
          <p className="text-[11px] font-semibold text-slate-700 leading-snug line-clamp-2">{activeTherapyText}</p>
        </div>
        <div className="pl-3">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Vaccines</p>
          <p className={`text-[11px] font-semibold leading-snug ${vaccineColor}`}>{vaccineStatus}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AIDiagnosticsPage() {
  const { getSelectedPet, addDiagnosticResult, setActiveTab, getPetDiagnostics, getPetTherapies, getPetVaccines, getPetDocuments } = useApp();
  const pet = getSelectedPet();

  const [step, setStep]                           = useState<DiagStep>('start');
  const [entryMode, setEntryMode]                 = useState<EntryMode>(null);
  const [selectedArea, setSelectedArea]           = useState<BodyArea | null>(null);
  const [suggestedArea, setSuggestedArea]         = useState<BodyArea | null>(null);
  const [photoSimulated, setPhotoSimulated]       = useState(false);
  const [tipsOpen, setTipsOpen]                   = useState(false);
  const [dontKnowText, setDontKnowText]           = useState('');
  const [description, setDescription]             = useState('');
  const [duration, setDuration]                   = useState('');
  const [checkedSymptoms, setCheckedSymptoms]     = useState<Set<string>>(new Set());
  const [eating, setEating]                       = useState('');
  const [drinking, setDrinking]                   = useState('');
  const [activity, setActivity]                   = useState('');
  const [result, setResult]                       = useState<DiagnosticResult | null>(null);
  const [resultFromDontKnow, setResultFromDontKnow] = useState(false);
  const [followUpOpen, setFollowUpOpen]           = useState(false);
  const [followUpStatus, setFollowUpStatus]       = useState<string | null>(null);
  const [followUpReply, setFollowUpReply]         = useState('');
  const [followUpQuestion, setFollowUpQuestion]   = useState('');
  const [followUpQuestionReply, setFollowUpQuestionReply] = useState('');
  const [followUpNewPhoto, setFollowUpNewPhoto]   = useState(false);

  if (!pet) return null;

  const safePet = pet;

  // ── Context data ────────────────────────────────────────────────────────────
  const petDiags     = getPetDiagnostics(safePet.id);
  const petTherapies = getPetTherapies(safePet.id);
  const petVaccines  = getPetVaccines(safePet.id);
  const petDocs      = getPetDocuments(safePet.id);

  const lastDiag = [...petDiags].sort((a, b) => b.date.localeCompare(a.date))[0] ?? null;
  const activeTherapy = petTherapies.find((t) => t.status === 'active');
  const overdueVaccine = petVaccines.find((v) => v.nextDue <= '2026-06-18');

  const healthCtxProps = {
    pet: safePet,
    lastDiagIssue: lastDiag ? lastDiag.possibleIssue : null,
    lastDiagDate: lastDiag ? fmtDate(lastDiag.date) : null,
    activeTherapyText: activeTherapy ? activeTherapy.name : 'None active',
    vaccineStatus: overdueVaccine ? 'Overdue' : 'Up to date',
    vaccineColor: overdueVaccine ? 'text-amber-600' : 'text-emerald-600',
  };

  // ── Area-specific history ───────────────────────────────────────────────────
  const relatedDiags     = selectedArea ? petDiags.filter((d) => d.bodyArea === selectedArea) : [];
  const relatedDocs      = selectedArea ? petDocs.filter((d) => areaMatchesText(selectedArea, d.label)) : [];
  const relatedTherapies = selectedArea ? petTherapies.filter((t) =>
    areaMatchesText(selectedArea, t.name) || areaMatchesText(selectedArea, t.notes ?? ''),
  ) : [];
  const areaLabel = BODY_AREAS.find((a) => a.id === selectedArea)?.label ?? '';

  // ── Navigation helpers ──────────────────────────────────────────────────────
  function startPhotoPath() {
    setEntryMode('photo');
    setPhotoSimulated(false);
    setStep('photo');
  }

  function startQuickCheck(area: BodyArea) {
    setEntryMode('quick-check');
    setSelectedArea(area);
    setStep('area-history');
  }

  function startDontKnow() {
    setEntryMode('dont-know');
    setDontKnowText('');
    setStep('dont-know');
  }

  function handlePhotoAnalyze() {
    const suggestion = PHOTO_SUGGESTIONS[safePet.id] ?? { primary: 'other', secondary: 'other' };
    setSuggestedArea(suggestion.primary);
    setStep('ai-suggest');
  }

  function acceptSuggestion() {
    setSelectedArea(suggestedArea!);
    setStep('area-history');
  }

  function rejectSuggestion() {
    setSelectedArea(null);
    setStep('confirm-area');
  }

  function handleConfirmArea(area: BodyArea) {
    setSelectedArea(area);
    setStep('area-history');
  }

  function handleDontKnowAnalyze() {
    const area = suggestAreaFromText(dontKnowText);
    setSuggestedArea(area);
    setSelectedArea(area);
    setStep('area-history');
  }

  function continueFromAreaHistory() {
    if (entryMode === 'photo')        setStep('symptoms');
    else if (entryMode === 'quick-check') setStep('photo');
    else                              setStep('optional-photo');
  }

  function handleAnalyze() {
    if (!selectedArea) return;
    const mock = MOCK_RESULTS[selectedArea];
    const symptomsText = [
      description,
      duration ? `Duration: ${duration}` : '',
      checkedSymptoms.size > 0 ? `Symptoms: ${[...checkedSymptoms].join(', ')}` : '',
      eating   ? `Eating: ${eating}`     : '',
      drinking ? `Drinking: ${drinking}` : '',
      activity ? `Activity: ${activity}` : '',
    ].filter(Boolean).join(' | ');

    const newResult: DiagnosticResult = {
      id: Date.now().toString(),
      petId: safePet.id,
      date: '2026-06-18',
      bodyArea: selectedArea,
      symptoms: symptomsText,
      photoUrl: photoSimulated ? 'simulated' : undefined,
      ...mock,
    };
    setResult(newResult);
    setResultFromDontKnow(entryMode === 'dont-know');
    setStep('result');
  }

  function handleSave() {
    if (result) {
      addDiagnosticResult(result);
      setStep('saved');
    }
  }

  function handleFollowUpStatusSelect(status: string) {
    setFollowUpStatus(status);
    if (status === 'upload-photo') return;
    const urgency = result?.urgency ?? 'low';
    setFollowUpReply(FOLLOW_UP_REPLIES[status]?.[urgency] ?? '');
  }

  function handleAskFollowUpQuestion() {
    if (!followUpQuestion.trim()) return;
    setFollowUpQuestionReply(
      `Based on ${safePet.name}'s ${areaLabel.toLowerCase()} issue and your follow-up, the key priority is to monitor closely for the next 24–48 hours. Keep the area clean, avoid irritants, and maintain the recommended care steps from the original analysis.`,
    );
  }

  function toggleSymptom(s: string) {
    setCheckedSymptoms((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
  }

  const urgencyConf = result ? URGENCY_CONFIG[result.urgency] : null;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="AI Diagnostics" showBack subtitle={safePet.name} />

      <main className="flex-1 px-4 py-4 pb-28 space-y-4 overflow-y-auto">

        {/* ── START ── */}
        {step === 'start' && (
          <>
            <HealthContextCard {...healthCtxProps} />

            {/* Recent issues */}
            {petDiags.length > 0 && (
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Recent Issues</p>
                {[...petDiags].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2).map((d) => {
                  const areaDef = BODY_AREAS.find((x) => x.id === d.bodyArea);
                  const uc = URGENCY_CONFIG[d.urgency];
                  return (
                    <div key={d.id} className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${areaDef?.bg ?? 'bg-slate-50'} flex items-center justify-center flex-shrink-0`}>
                        {areaDef && <areaDef.Icon size={18} className={areaDef.iconColor} strokeWidth={1.5} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{d.possibleIssue}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{areaDef?.label} · {fmtDate(d.date)}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${uc.bg} ${uc.text}`}>{d.urgency}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Checks */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Quick Checks</p>
              <div className="grid grid-cols-3 gap-2">
                {QUICK_CHECKS.map((qc) => (
                  <button
                    key={qc.area}
                    onClick={() => startQuickCheck(qc.area)}
                    className={`${qc.bg} rounded-2xl flex flex-col items-center gap-1 pt-4 pb-3 px-2 hover:brightness-95 active:scale-95 transition-all border border-transparent hover:border-sky-200`}
                  >
                    <div className="w-12 h-12">
                      <qc.Illustration stroke={qc.stroke} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 text-center leading-tight mt-1">{qc.label}</span>
                    <span className="text-[9.5px] text-slate-400 text-center leading-tight">{qc.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Entry options */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Full Analysis</p>
              <button
                onClick={startPhotoPath}
                className="w-full bg-sky-500 text-white rounded-2xl px-4 py-3.5 flex items-center gap-3 hover:bg-sky-600 active:bg-sky-700 transition-colors"
              >
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Camera size={18} className="text-white" strokeWidth={2} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-bold">Photo-based analysis</p>
                  <p className="text-xs opacity-80 mt-0.5">Take or upload a photo — AI suggests the area</p>
                </div>
                <ChevronRight size={16} className="text-white/60" />
              </button>

              <button
                onClick={startDontKnow}
                className="w-full bg-white rounded-2xl shadow-card px-4 py-3.5 flex items-center gap-3 hover:shadow-card-md active:scale-[0.99] transition-all border border-transparent hover:border-sky-200"
              >
                <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <HelpCircle size={18} className="text-slate-400" strokeWidth={1.5} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-slate-800">I don't know where the problem is</p>
                  <p className="text-xs text-slate-400 mt-0.5">Describe symptoms — AI identifies the area</p>
                </div>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            </div>
          </>
        )}

        {/* ── PHOTO ── */}
        {(step === 'photo' || step === 'optional-photo') && (
          <>
            <div className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
              <img src={safePet.photo} alt={safePet.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-800">
                  {step === 'optional-photo' ? `Photo of ${safePet.name} (optional)` : `Photo for analysis`}
                </p>
                <p className="text-xs text-slate-400 capitalize">{safePet.species} · {safePet.name}</p>
              </div>
            </div>

            {step === 'optional-photo' && selectedArea && (
              <div className="bg-sky-50 border border-sky-100 rounded-2xl px-4 py-3">
                <p className="text-xs text-sky-700 leading-relaxed">
                  AI identified area: <span className="font-bold">{areaLabel}</span>. A photo can help, but you can skip and go straight to results.
                </p>
              </div>
            )}

            {!photoSimulated ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPhotoSimulated(true)}
                    className="bg-white rounded-2xl border-2 border-dashed border-sky-300 py-10 flex flex-col items-center gap-2.5 hover:bg-sky-50 active:bg-sky-100 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center">
                      <Camera size={22} className="text-sky-500" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-semibold text-sky-600">Take Photo</p>
                  </button>
                  <button
                    onClick={() => setPhotoSimulated(true)}
                    className="bg-white rounded-2xl border-2 border-dashed border-slate-200 py-10 flex flex-col items-center gap-2.5 hover:bg-slate-50 active:bg-slate-100 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center">
                      <Upload size={22} className="text-slate-400" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs font-semibold text-slate-500">From Gallery</p>
                  </button>
                </div>

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

                {step === 'optional-photo' ? (
                  <button
                    onClick={() => { setPhotoSimulated(false); setStep('symptoms'); }}
                    className="w-full bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 transition-colors"
                  >
                    Skip — analyze without photo
                  </button>
                ) : (
                  <button onClick={() => setStep('start')} className="w-full text-sm text-slate-400 hover:text-slate-600 py-2 transition-colors">
                    Back
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-white rounded-2xl overflow-hidden shadow-card">
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-48 flex flex-col items-center justify-center gap-2">
                    <Camera size={32} className="text-slate-400" strokeWidth={1.5} />
                    <p className="text-xs text-slate-400">Photo captured</p>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="text-xs text-slate-500">photo_{safePet.name.toLowerCase()}_2026.jpg</span>
                    <button onClick={() => setPhotoSimulated(false)} className="text-xs text-sky-500 font-semibold">Retake</button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (step === 'photo') handlePhotoAnalyze();
                    else setStep('symptoms');
                  }}
                  className="w-full bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors flex items-center justify-center gap-2"
                >
                  {step === 'photo' ? (
                    <><Sparkles size={16} strokeWidth={2} /> Analyze Photo</>
                  ) : (
                    <>Continue</>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* ── AI SUGGEST ── */}
        {step === 'ai-suggest' && suggestedArea && (() => {
          const def = BODY_AREAS.find((a) => a.id === suggestedArea)!;
          return (
            <>
              <div className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
                <img src={safePet.photo} alt={safePet.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-slate-800">Photo analyzed</p>
                  <p className="text-xs text-slate-400">{safePet.name} · AI area suggestion</p>
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-sky-500" strokeWidth={2} />
                  <p className="text-sm font-bold text-sky-700">AI identified a possible area</p>
                </div>
                <div className={`flex items-center gap-3 bg-white rounded-xl px-3 py-3 border-2 border-sky-300`}>
                  <div className={`w-10 h-10 rounded-xl ${def.bg} flex items-center justify-center flex-shrink-0`}>
                    <def.Icon size={20} className={def.iconColor} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{def.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{def.sublabel}</p>
                  </div>
                </div>
                <p className="text-xs text-sky-700 leading-relaxed">
                  Based on the photo, the AI suggests <span className="font-bold">{def.label}</span> as the area of concern. Does this look right?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={rejectSuggestion}
                  className="bg-white border border-slate-200 text-slate-700 font-semibold text-sm py-3.5 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  Change area
                </button>
                <button
                  onClick={acceptSuggestion}
                  className="bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors"
                >
                  Yes, that's it
                </button>
              </div>
            </>
          );
        })()}

        {/* ── CONFIRM AREA ── */}
        {step === 'confirm-area' && (
          <>
            <div className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
              <img src={safePet.photo} alt={safePet.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-800">Select the problem area</p>
                <p className="text-xs text-slate-400">{safePet.name}</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 px-1">Where is {safePet.name} showing symptoms?</p>
            <AreaGrid selectedArea={selectedArea} onSelect={handleConfirmArea} />
          </>
        )}

        {/* ── DONT KNOW ── */}
        {step === 'dont-know' && (
          <>
            <div className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
              <img src={safePet.photo} alt={safePet.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-800">Describe {safePet.name}'s symptoms</p>
                <p className="text-xs text-slate-400">AI will identify the area</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">What did you notice? <span className="text-red-400">*</span></p>
              <textarea
                value={dontKnowText}
                onChange={(e) => setDontKnowText(e.target.value)}
                placeholder={`e.g. "${safePet.name} has been shaking their head a lot and scratching near the ear, there's a slight smell..."`}
                className="w-full bg-slate-50 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-sky-400 resize-none leading-relaxed"
                rows={5}
              />
              <p className="text-[11px] text-slate-400 leading-relaxed">Describe what you see, feel, or smell. Be as specific as possible. The AI will find the most likely area.</p>
            </div>

            <button
              onClick={handleDontKnowAnalyze}
              disabled={dontKnowText.trim().length < 10}
              className="w-full bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <Sparkles size={16} strokeWidth={2} />
              Identify area with AI
            </button>

            <button onClick={() => setStep('start')} className="w-full text-sm text-slate-400 hover:text-slate-600 py-2 transition-colors">
              Back
            </button>
          </>
        )}

        {/* ── AREA HISTORY ── */}
        {step === 'area-history' && selectedArea && (
          <>
            <div className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
              <img src={safePet.photo} alt={safePet.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800">Before we analyze</p>
                <p className="text-xs text-slate-400">{safePet.name} · {areaLabel} history</p>
              </div>
              {(() => {
                const def = BODY_AREAS.find((a) => a.id === selectedArea)!;
                return (
                  <div className={`w-9 h-9 rounded-xl ${def.bg} flex items-center justify-center flex-shrink-0`}>
                    <def.Icon size={18} className={def.iconColor} strokeWidth={1.5} />
                  </div>
                );
              })()}
            </div>

            {relatedDiags.length === 0 && relatedDocs.length === 0 && relatedTherapies.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-card px-4 py-6 flex flex-col items-center gap-2 text-center">
                <History size={28} className="text-slate-300" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-slate-600">No related history found</p>
                <p className="text-xs text-slate-400">No past diagnoses, documents or therapies related to {areaLabel.toLowerCase()} were found for {safePet.name}.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {relatedDiags.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Past Diagnoses</p>
                    {relatedDiags.map((d) => {
                      const uc = URGENCY_CONFIG[d.urgency];
                      return (
                        <div key={d.id} className="bg-white rounded-2xl shadow-card px-4 py-3">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-semibold text-slate-800 leading-snug flex-1">{d.possibleIssue}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${uc.bg} ${uc.text}`}>{d.urgency}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{fmtDate(d.date)}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {relatedTherapies.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Related Therapies</p>
                    {relatedTherapies.map((t) => (
                      <div key={t.id} className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Pill size={15} className="text-emerald-500" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">{t.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 capitalize">{t.status} · {t.dosage} · {t.frequency}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {relatedDocs.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">Related Documents</p>
                    {relatedDocs.map((d) => (
                      <div key={d.id} className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText size={15} className="text-sky-500" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">{d.label}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{fmtDate(d.uploadedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={continueFromAreaHistory}
              className="w-full bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors flex items-center justify-center gap-2"
            >
              Continue to Analysis
              <ArrowRight size={15} strokeWidth={2} />
            </button>
          </>
        )}

        {/* ── SYMPTOMS ── */}
        {step === 'symptoms' && (
          <>
            <div className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
              <img src={safePet.photo} alt={safePet.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-800">Describe the symptoms</p>
                <p className="text-xs text-slate-400">{safePet.name} · {areaLabel}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-4 space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Describe the problem <span className="text-red-400">*</span></p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`e.g. "${safePet.name} has been scratching frequently, there's slight redness, and it started 3 days ago..."`}
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
                { label: 'Eating',        opts: EATING_OPTIONS,   val: eating,    set: setEating    },
                { label: 'Drinking',      opts: DRINKING_OPTIONS, val: drinking,  set: setDrinking  },
                { label: 'Activity level',opts: ACTIVITY_OPTIONS, val: activity,  set: setActivity  },
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

            <button
              onClick={handleAnalyze}
              disabled={description.trim().length < 5}
              className="w-full bg-sky-500 text-white font-semibold text-sm py-3.5 rounded-2xl hover:bg-sky-600 active:bg-sky-700 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <Sparkles size={16} strokeWidth={2} />
              Analyze
            </button>
          </>
        )}

        {/* ── RESULT ── */}
        {step === 'result' && result && urgencyConf && (
          <>
            <div className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
              <img src={safePet.photo} alt={safePet.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-slate-800">AI Analysis — {safePet.name}</p>
                <p className="text-xs text-slate-400">{areaLabel} · 2026-06-18</p>
              </div>
            </div>

            <div className={`rounded-2xl border px-4 py-3.5 flex items-center gap-3 ${urgencyConf.bg}`}>
              <urgencyConf.Icon size={22} className={urgencyConf.text} strokeWidth={2} />
              <div>
                <p className={`text-sm font-bold ${urgencyConf.text}`}>{urgencyConf.label}</p>
                <p className={`text-xs ${urgencyConf.text} opacity-80 mt-0.5 leading-snug`}>{result.possibleIssue}</p>
              </div>
            </div>

            {[
              { Icon: Zap,         title: 'Possible Causes',  items: result.possibleCauses, color: 'text-sky-500',     bg: 'bg-sky-50'     },
              { Icon: CheckCircle, title: 'What To Do Now',   items: result.whatToDoNow,    color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { Icon: BookOpen,    title: 'What To Monitor',  items: result.whatToMonitor,  color: 'text-amber-500',   bg: 'bg-amber-50'   },
              { Icon: XCircle,     title: 'What NOT To Do',   items: result.whatNotToDo,    color: 'text-red-500',     bg: 'bg-red-50'     },
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

            <div className="bg-slate-100 rounded-2xl px-4 py-3">
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {resultFromDontKnow && (
                  <>AI identified area: <span className="font-semibold text-slate-700">{areaLabel}</span> · </>
                )}
                This result was generated using <span className="font-semibold text-slate-700">{safePet.name}'s</span> profile
                {photoSimulated ? ', uploaded photo,' : ''}
                {' '}selected symptoms and previous related health history.
              </p>
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

        {/* ── SAVED ── */}
        {step === 'saved' && result && urgencyConf && (
          <>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle size={22} className="text-emerald-600 flex-shrink-0" strokeWidth={2} />
              <div>
                <p className="text-sm font-bold text-emerald-800">Saved to Health Timeline</p>
                <p className="text-xs text-emerald-600 mt-0.5">{safePet.name}'s record has been updated in Health History</p>
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
                  <p className="text-sm font-bold text-slate-800">How is {safePet.name} today?</p>
                  <p className="text-xs text-slate-400 mt-0.5">Following up on: {areaLabel} · {result.possibleIssue}</p>
                </div>

                {!followUpStatus && (
                  <div className="px-4 py-3 space-y-2">
                    {[
                      { id: 'improved',     label: 'Improved',          Icon: CheckCircle,  iconColor: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200 hover:border-emerald-300' },
                      { id: 'same',         label: 'Same',              Icon: AlertTriangle,iconColor: 'text-amber-500',   bg: 'bg-amber-50',   border: 'border-amber-200 hover:border-amber-300'   },
                      { id: 'worse',        label: 'Worse',             Icon: XCircle,      iconColor: 'text-red-500',     bg: 'bg-red-50',     border: 'border-red-200 hover:border-red-300'       },
                      { id: 'upload-photo', label: 'Upload new photo',  Icon: Camera,       iconColor: 'text-sky-500',     bg: 'bg-sky-50',     border: 'border-sky-200 hover:border-sky-300'       },
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
                      The AI will use this alongside the original {areaLabel.toLowerCase()} diagnosis to track {safePet.name}'s progression.
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
                      followUpStatus === 'same'     ? 'bg-amber-50 border-amber-200'     :
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
