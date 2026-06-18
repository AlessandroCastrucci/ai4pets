export interface PetDocument {
  id: string;
  petId: string;
  label: string;
  type: 'vaccination-card' | 'blood-test' | 'prescription' | 'health-document';
  uploadedAt: string;
  fileUrl?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  breed: string;
  dateOfBirth?: string;
  age: number;
  weight: number;
  gender: 'male' | 'female';
  sterilized?: boolean;
  photo: string;
  accentColor: 'sky' | 'amber' | 'emerald' | 'violet' | 'rose';
  knownDiseases?: string;
  allergies?: string[];
  activeMedications?: string;
  currentFood?: string;
  vetNotes?: string;
}

export interface Reminder {
  id: string;
  petId: string;
  type: 'therapy' | 'vaccine' | 'medication' | 'checkup' | 'appointment';
  title: string;
  datetime: string;
  notes?: string;
  done: boolean;
}

export interface Vaccine {
  id: string;
  petId: string;
  name: string;
  dateAdministered: string;
  nextDue: string;
  vet?: string;
  notes?: string;
}

export interface Therapy {
  id: string;
  petId: string;
  name: string;
  medication?: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed';
  notes?: string;
}

export interface NutritionPlan {
  id: string;
  petId: string;
  brand: string;
  productLine: string;
  foodType: 'normal' | 'veterinary';
  dailyQuantity: number;
  mealsPerDay: number;
  mealTimes: string[];
  remindersEnabled: boolean;
  notes?: string;
}

export type BodyArea =
  | 'skin-fur'
  | 'eyes'
  | 'ears'
  | 'paws'
  | 'mouth-teeth'
  | 'stool'
  | 'vomit'
  | 'wound'
  | 'other';

export type UrgencyLevel = 'low' | 'medium' | 'high';

export interface DiagnosticResult {
  id: string;
  petId: string;
  date: string;
  bodyArea: BodyArea;
  symptoms: string;
  photoUrl?: string;
  possibleIssue: string;
  urgency: UrgencyLevel;
  possibleCauses: string[];
  whatToDoNow: string[];
  whatToMonitor: string[];
  whatNotToDo: string[];
  followUpRecommendation: string;
}

export type StoolQuality = 'normal' | 'soft' | 'hard' | 'liquid';

export interface MonthlyCheckup {
  id: string;
  petId: string;
  date: string;
  weight: number;
  appetite: 1 | 2 | 3 | 4 | 5;
  energyLevel: 1 | 2 | 3 | 4 | 5;
  stoolQuality: StoolQuality;
  behaviorChanges: string;
  photoEyes?: string;
  photoTeeth?: string;
  photoSkin?: string;
}

export interface DiagnosticFollowUp {
  id: string;
  petId: string;
  diagnosticId: string;
  date: string;
  status: 'improved' | 'same' | 'worse';
  notes?: string;
  photoUrl?: string;
}

export interface CalendarEvent {
  id: string;
  petId: string;
  title: string;
  date: string;
  time?: string;
  type: 'vaccine' | 'therapy' | 'checkup' | 'medication' | 'appointment';
}

export type TabName = 'pets' | 'reminders' | 'assistant' | 'calendar' | 'more';
export type ScreenName =
  | null
  | 'pet-dashboard'
  | 'add-pet'
  | 'edit-pet'
  | 'pet-health-history'
  | 'ai-diagnostics'
  | 'ai-checkup'
  | 'nutrition'
  | 'vaccines'
  | 'therapies'
  | 'account'
  | 'edit-profile';
