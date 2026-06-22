import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  Pet,
  PetDocument,
  Reminder,
  Vaccine,
  Therapy,
  NutritionPlan,
  DiagnosticResult,
  DiagnosticFollowUp,
  MonthlyCheckup,
  CalendarEvent,
  ParasiteProtectionPlan,
  TabName,
  ScreenName,
} from '../types';
import {
  PETS,
  REMINDERS,
  VACCINES,
  THERAPIES,
  NUTRITION_PLANS,
  DIAGNOSTIC_RESULTS,
  DIAGNOSTIC_FOLLOW_UPS,
  MONTHLY_CHECKUPS,
  CALENDAR_EVENTS,
  PET_DOCUMENTS,
  PARASITE_PROTECTION_PLANS,
} from '../data/mockData';

interface AppContextType {
  // Navigation
  activeTab: TabName;
  currentScreen: ScreenName;
  selectedPetId: string | null;
  navigateToPet: (petId: string) => void;
  navigateToFeature: (screen: Exclude<ScreenName, null | 'pet-dashboard' | 'add-pet' | 'edit-pet' | 'pet-health-history'>) => void;
  navigateToAddPet: () => void;
  navigateToEditPet: () => void;
  navigateToHealthHistory: () => void;
  navigateToAccount: () => void;
  navigateToEditProfile: () => void;
  navigateBack: () => void;
  setActiveTab: (tab: TabName) => void;
  switchPet: (petId: string) => void;
  startDiagnosticsForPet: (petId: string) => void;

  // Data — read
  pets: Pet[];
  reminders: Reminder[];
  vaccines: Vaccine[];
  therapies: Therapy[];
  nutritionPlans: NutritionPlan[];
  diagnosticResults: DiagnosticResult[];
  diagnosticFollowUps: DiagnosticFollowUp[];
  monthlyCheckups: MonthlyCheckup[];
  calendarEvents: CalendarEvent[];
  petDocuments: PetDocument[];
  parasiteProtectionPlans: ParasiteProtectionPlan[];

  // Data — write
  addPet: (pet: Pet) => void;
  updatePet: (pet: Pet) => void;
  deletePet: (petId: string) => void;
  addReminder: (reminder: Reminder) => void;
  removeReminder: (id: string) => void;
  addVaccine: (vaccine: Vaccine) => void;
  updateVaccine: (vaccine: Vaccine) => void;
  removeVaccine: (id: string) => void;
  addTherapy: (therapy: Therapy) => void;
  updateTherapy: (therapy: Therapy) => void;
  removeTherapy: (id: string) => void;
  addDiagnosticResult: (result: DiagnosticResult) => void;
  addDiagnosticFollowUp: (followUp: DiagnosticFollowUp) => void;
  addMonthlyCheckup: (checkup: MonthlyCheckup) => void;
  updateNutritionPlan: (plan: NutritionPlan) => void;
  toggleReminderDone: (id: string) => void;
  addPetDocument: (doc: PetDocument) => void;
  updateParasiteProtectionPlan: (plan: ParasiteProtectionPlan) => void;

  // Helpers
  getPet: (id: string) => Pet | undefined;
  getSelectedPet: () => Pet | undefined;
  getPetReminders: (petId: string) => Reminder[];
  getPetVaccines: (petId: string) => Vaccine[];
  getPetTherapies: (petId: string) => Therapy[];
  getPetNutrition: (petId: string) => NutritionPlan | undefined;
  getPetDiagnostics: (petId: string) => DiagnosticResult[];
  getPetFollowUps: (petId: string) => DiagnosticFollowUp[];
  getPetCheckups: (petId: string) => MonthlyCheckup[];
  getPetDocuments: (petId: string) => PetDocument[];
  getPetParasiteProtection: (petId: string) => ParasiteProtectionPlan | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<TabName>('pets');
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(null);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const [pets, setPets] = useState<Pet[]>(PETS);
  const [reminders, setReminders] = useState<Reminder[]>(REMINDERS);
  const [vaccines, setVaccines] = useState<Vaccine[]>(VACCINES);
  const [therapies, setTherapies] = useState<Therapy[]>(THERAPIES);
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>(NUTRITION_PLANS);
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>(DIAGNOSTIC_RESULTS);
  const [diagnosticFollowUps, setDiagnosticFollowUps] = useState<DiagnosticFollowUp[]>(DIAGNOSTIC_FOLLOW_UPS);
  const [monthlyCheckups, setMonthlyCheckups] = useState<MonthlyCheckup[]>(MONTHLY_CHECKUPS);
  const [calendarEvents] = useState<CalendarEvent[]>(CALENDAR_EVENTS);
  const [petDocuments, setPetDocuments] = useState<PetDocument[]>(PET_DOCUMENTS);
  const [parasiteProtectionPlans, setParasiteProtectionPlans] = useState<ParasiteProtectionPlan[]>(PARASITE_PROTECTION_PLANS);

  const navigateToPet = useCallback((petId: string) => {
    setSelectedPetId(petId);
    setCurrentScreen('pet-dashboard');
  }, []);

  const navigateToFeature = useCallback(
    (screen: Exclude<ScreenName, null | 'pet-dashboard' | 'add-pet' | 'edit-pet' | 'pet-health-history'>) => {
      setCurrentScreen(screen);
    },
    [],
  );

  const navigateToAddPet = useCallback(() => {
    setSelectedPetId(null);
    setCurrentScreen('add-pet');
  }, []);

  const navigateToEditPet = useCallback(() => {
    setCurrentScreen('edit-pet');
  }, []);

  const navigateToHealthHistory = useCallback(() => {
    setCurrentScreen('pet-health-history');
  }, []);

  const navigateToAccount = useCallback(() => {
    setCurrentScreen('account');
  }, []);

  const navigateToEditProfile = useCallback(() => {
    setCurrentScreen('edit-profile');
  }, []);

  const navigateBack = useCallback(() => {
    if (currentScreen === 'add-pet') {
      setCurrentScreen(null);
      setSelectedPetId(null);
      setActiveTabState('pets');
    } else if (currentScreen === 'edit-pet') {
      setCurrentScreen('pet-dashboard');
    } else if (currentScreen === 'pet-health-history') {
      setCurrentScreen('pet-dashboard');
    } else if (currentScreen === 'edit-profile') {
      setCurrentScreen('account');
    } else if (currentScreen === 'account') {
      setCurrentScreen(null);
      setActiveTabState('more');
    } else if (currentScreen === 'ai-diagnostics' && activeTab === 'diagnostics') {
      setCurrentScreen(null);
    } else if (currentScreen !== null && currentScreen !== 'pet-dashboard') {
      setCurrentScreen('pet-dashboard');
    } else {
      setCurrentScreen(null);
      setSelectedPetId(null);
    }
  }, [currentScreen, activeTab]);

  const setActiveTab = useCallback((tab: TabName) => {
    setActiveTabState(tab);
    setCurrentScreen(null);
    setSelectedPetId(null);
  }, []);

  const switchPet = useCallback((petId: string) => {
    setSelectedPetId(petId);
  }, []);

  const startDiagnosticsForPet = useCallback((petId: string) => {
    setSelectedPetId(petId);
    setCurrentScreen('ai-diagnostics');
  }, []);

  const addPet = useCallback((pet: Pet) => {
    setPets((prev) => [...prev, pet]);
  }, []);

  const updatePet = useCallback((pet: Pet) => {
    setPets((prev) => prev.map((p) => (p.id === pet.id ? pet : p)));
  }, []);

  const deletePet = useCallback((petId: string) => {
    setPets((prev) => prev.filter((p) => p.id !== petId));
  }, []);

  const addReminder = useCallback((reminder: Reminder) => {
    setReminders((prev) => [...prev, reminder]);
  }, []);

  const removeReminder = useCallback((id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const addVaccine = useCallback((vaccine: Vaccine) => {
    setVaccines((prev) => [...prev, vaccine]);
  }, []);

  const updateVaccine = useCallback((vaccine: Vaccine) => {
    setVaccines((prev) => prev.map((v) => (v.id === vaccine.id ? vaccine : v)));
  }, []);

  const removeVaccine = useCallback((id: string) => {
    setVaccines((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const addTherapy = useCallback((therapy: Therapy) => {
    setTherapies((prev) => [...prev, therapy]);
  }, []);

  const updateTherapy = useCallback((therapy: Therapy) => {
    setTherapies((prev) => prev.map((t) => (t.id === therapy.id ? therapy : t)));
  }, []);

  const removeTherapy = useCallback((id: string) => {
    setTherapies((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addDiagnosticResult = useCallback((result: DiagnosticResult) => {
    setDiagnosticResults((prev) => [result, ...prev]);
  }, []);

  const addDiagnosticFollowUp = useCallback((followUp: DiagnosticFollowUp) => {
    setDiagnosticFollowUps((prev) => [followUp, ...prev]);
  }, []);

  const addMonthlyCheckup = useCallback((checkup: MonthlyCheckup) => {
    setMonthlyCheckups((prev) => [checkup, ...prev]);
  }, []);

  const updateNutritionPlan = useCallback((plan: NutritionPlan) => {
    setNutritionPlans((prev) => {
      const exists = prev.some((p) => p.petId === plan.petId);
      if (exists) return prev.map((p) => (p.petId === plan.petId ? plan : p));
      return [...prev, plan];
    });
  }, []);

  const toggleReminderDone = useCallback((id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r)),
    );
  }, []);

  const addPetDocument = useCallback((doc: PetDocument) => {
    setPetDocuments((prev) => [doc, ...prev]);
  }, []);

  const updateParasiteProtectionPlan = useCallback((plan: ParasiteProtectionPlan) => {
    setParasiteProtectionPlans((prev) => {
      const exists = prev.some((p) => p.petId === plan.petId);
      if (exists) return prev.map((p) => (p.petId === plan.petId ? plan : p));
      return [...prev, plan];
    });
  }, []);

  const getPet = useCallback((id: string) => pets.find((p) => p.id === id), [pets]);
  const getSelectedPet = useCallback(() => (selectedPetId ? pets.find((p) => p.id === selectedPetId) : undefined), [pets, selectedPetId]);
  const getPetReminders = useCallback((petId: string) => reminders.filter((r) => r.petId === petId), [reminders]);
  const getPetVaccines = useCallback((petId: string) => vaccines.filter((v) => v.petId === petId), [vaccines]);
  const getPetTherapies = useCallback((petId: string) => therapies.filter((t) => t.petId === petId), [therapies]);
  const getPetNutrition = useCallback((petId: string) => nutritionPlans.find((n) => n.petId === petId), [nutritionPlans]);
  const getPetDiagnostics = useCallback((petId: string) => diagnosticResults.filter((d) => d.petId === petId), [diagnosticResults]);
  const getPetFollowUps = useCallback((petId: string) => diagnosticFollowUps.filter((f) => f.petId === petId), [diagnosticFollowUps]);
  const getPetCheckups = useCallback((petId: string) => monthlyCheckups.filter((c) => c.petId === petId), [monthlyCheckups]);
  const getPetDocuments = useCallback((petId: string) => petDocuments.filter((d) => d.petId === petId), [petDocuments]);
  const getPetParasiteProtection = useCallback((petId: string) => parasiteProtectionPlans.find((p) => p.petId === petId), [parasiteProtectionPlans]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        currentScreen,
        selectedPetId,
        navigateToPet,
        navigateToFeature,
        navigateToAddPet,
        navigateToEditPet,
        navigateToHealthHistory,
        navigateToAccount,
        navigateToEditProfile,
        navigateBack,
        setActiveTab,
        switchPet,
        startDiagnosticsForPet,
        pets,
        reminders,
        vaccines,
        therapies,
        nutritionPlans,
        diagnosticResults,
        diagnosticFollowUps,
        monthlyCheckups,
        calendarEvents,
        petDocuments,
        parasiteProtectionPlans,
        addPet,
        updatePet,
        deletePet,
        addReminder,
        removeReminder,
        addVaccine,
        updateVaccine,
        removeVaccine,
        addTherapy,
        updateTherapy,
        removeTherapy,
        addDiagnosticResult,
        addDiagnosticFollowUp,
        addMonthlyCheckup,
        updateNutritionPlan,
        toggleReminderDone,
        addPetDocument,
        updateParasiteProtectionPlan,
        getPet,
        getSelectedPet,
        getPetReminders,
        getPetVaccines,
        getPetTherapies,
        getPetNutrition,
        getPetDiagnostics,
        getPetFollowUps,
        getPetCheckups,
        getPetDocuments,
        getPetParasiteProtection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
