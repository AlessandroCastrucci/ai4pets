import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  Pet,
  PetDocument,
  Reminder,
  Vaccine,
  Therapy,
  NutritionPlan,
  InsightResult,
  InsightFollowUp,
  MonthlyCheckup,
  CalendarEvent,
  ParasiteProtectionPlan,
  HealthEvent,
  TabName,
  ScreenName,
} from '../types';
import {
  PETS,
  REMINDERS,
  VACCINES,
  THERAPIES,
  NUTRITION_PLANS,
  INSIGHT_RESULTS,
  INSIGHT_FOLLOW_UPS,
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
  selectedInsightId: string | null;
  navigateToPet: (petId: string) => void;
  navigateToFeature: (screen: Exclude<ScreenName, null | 'pet-dashboard' | 'add-pet' | 'edit-pet' | 'pet-health-history' | 'insight-detail'>) => void;
  navigateToAddPet: () => void;
  navigateToEditPet: () => void;
  navigateToHealthHistory: () => void;
  navigateToInsightDetail: (insightId: string) => void;
  navigateToAccount: () => void;
  navigateToEditProfile: () => void;
  navigateBack: () => void;
  setActiveTab: (tab: TabName) => void;
  switchPet: (petId: string) => void;
  startInsightsForPet: (petId: string) => void;

  // Data — read
  pets: Pet[];
  reminders: Reminder[];
  vaccines: Vaccine[];
  therapies: Therapy[];
  nutritionPlans: NutritionPlan[];
  insightResults: InsightResult[];
  insightFollowUps: InsightFollowUp[];
  monthlyCheckups: MonthlyCheckup[];
  calendarEvents: CalendarEvent[];
  petDocuments: PetDocument[];
  parasiteProtectionPlans: ParasiteProtectionPlan[];
  healthEvents: HealthEvent[];

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
  addInsightResult: (result: InsightResult) => void;
  addInsightFollowUp: (followUp: InsightFollowUp) => void;
  addMonthlyCheckup: (checkup: MonthlyCheckup) => void;
  updateNutritionPlan: (plan: NutritionPlan) => void;
  toggleReminderDone: (id: string) => void;
  completeReminder: (id: string) => void;
  addPetDocument: (doc: PetDocument) => void;
  updateParasiteProtectionPlan: (plan: ParasiteProtectionPlan) => void;

  // Helpers
  getPet: (id: string) => Pet | undefined;
  getSelectedPet: () => Pet | undefined;
  getPetReminders: (petId: string) => Reminder[];
  getPetVaccines: (petId: string) => Vaccine[];
  getPetTherapies: (petId: string) => Therapy[];
  getPetNutrition: (petId: string) => NutritionPlan | undefined;
  getPetInsights: (petId: string) => InsightResult[];
  getPetFollowUps: (petId: string) => InsightFollowUp[];
  getPetCheckups: (petId: string) => MonthlyCheckup[];
  getPetDocuments: (petId: string) => PetDocument[];
  getPetParasiteProtection: (petId: string) => ParasiteProtectionPlan | undefined;
  getPetHealthEvents: (petId: string) => HealthEvent[];

  // Toast
  toast: string | null;
  showToast: (message: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<TabName>('pets');
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(null);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [selectedInsightId, setSelectedInsightId] = useState<string | null>(null);

  const [pets, setPets] = useState<Pet[]>(PETS);
  const [reminders, setReminders] = useState<Reminder[]>(REMINDERS);
  const [vaccines, setVaccines] = useState<Vaccine[]>(VACCINES);
  const [therapies, setTherapies] = useState<Therapy[]>(THERAPIES);
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>(NUTRITION_PLANS);
  const [insightResults, setInsightResults] = useState<InsightResult[]>(INSIGHT_RESULTS);
  const [insightFollowUps, setInsightFollowUps] = useState<InsightFollowUp[]>(INSIGHT_FOLLOW_UPS);
  const [monthlyCheckups, setMonthlyCheckups] = useState<MonthlyCheckup[]>(MONTHLY_CHECKUPS);
  const [calendarEvents] = useState<CalendarEvent[]>(CALENDAR_EVENTS);
  const [petDocuments, setPetDocuments] = useState<PetDocument[]>(PET_DOCUMENTS);
  const [parasiteProtectionPlans, setParasiteProtectionPlans] = useState<ParasiteProtectionPlan[]>(PARASITE_PROTECTION_PLANS);
  const [healthEvents, setHealthEvents] = useState<HealthEvent[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const navigateToPet = useCallback((petId: string) => {
    setSelectedPetId(petId);
    setCurrentScreen('pet-dashboard');
  }, []);

  const navigateToFeature = useCallback(
    (screen: Exclude<ScreenName, null | 'pet-dashboard' | 'add-pet' | 'edit-pet' | 'pet-health-history' | 'insight-detail'>) => {
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

  const navigateToInsightDetail = useCallback((insightId: string) => {
    setSelectedInsightId(insightId);
    setCurrentScreen('insight-detail');
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
    } else if (currentScreen === 'insight-detail') {
      setCurrentScreen(null);
      setSelectedInsightId(null);
      setActiveTabState('history');
    } else if (currentScreen === 'edit-profile') {
      setCurrentScreen('account');
    } else if (currentScreen === 'account') {
      setCurrentScreen(null);
      setActiveTabState('more');
    } else if (currentScreen === 'ai-insights' && activeTab === 'insights') {
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

  const startInsightsForPet = useCallback((petId: string) => {
    setSelectedPetId(petId);
    setCurrentScreen('ai-insights');
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

  const addInsightResult = useCallback((result: InsightResult) => {
    setInsightResults((prev) => [result, ...prev]);
  }, []);

  const addInsightFollowUp = useCallback((followUp: InsightFollowUp) => {
    setInsightFollowUps((prev) => [followUp, ...prev]);
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

  const completeReminder = useCallback((id: string) => {
    setReminders((prev) => {
      const reminder = prev.find((r) => r.id === id);
      if (reminder && !reminder.done) {
        const event: HealthEvent = {
          id: `he-${Date.now()}-${id}`,
          petId: reminder.petId,
          title: reminder.title,
          type: reminder.type,
          completedDate: '2026-06-17',
          scheduledDatetime: reminder.datetime,
          notes: reminder.notes,
        };
        setHealthEvents((events) => [event, ...events]);
        setTimeout(() => setToast('Saved to Health History'), 400);
        setTimeout(() => setToast(null), 3000);
      }
      return prev.map((r) => (r.id === id ? { ...r, done: true } : r));
    });
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
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
  const getPetInsights = useCallback((petId: string) => insightResults.filter((d) => d.petId === petId), [insightResults]);
  const getPetFollowUps = useCallback((petId: string) => insightFollowUps.filter((f) => f.petId === petId), [insightFollowUps]);
  const getPetCheckups = useCallback((petId: string) => monthlyCheckups.filter((c) => c.petId === petId), [monthlyCheckups]);
  const getPetDocuments = useCallback((petId: string) => petDocuments.filter((d) => d.petId === petId), [petDocuments]);
  const getPetParasiteProtection = useCallback((petId: string) => parasiteProtectionPlans.find((p) => p.petId === petId), [parasiteProtectionPlans]);
  const getPetHealthEvents = useCallback((petId: string) => healthEvents.filter((e) => e.petId === petId), [healthEvents]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        currentScreen,
        selectedPetId,
        selectedInsightId,
        navigateToPet,
        navigateToFeature,
        navigateToAddPet,
        navigateToEditPet,
        navigateToHealthHistory,
        navigateToInsightDetail,
        navigateToAccount,
        navigateToEditProfile,
        navigateBack,
        setActiveTab,
        switchPet,
        startInsightsForPet,
        pets,
        reminders,
        vaccines,
        therapies,
        nutritionPlans,
        insightResults,
        insightFollowUps,
        monthlyCheckups,
        calendarEvents,
        petDocuments,
        parasiteProtectionPlans,
        healthEvents,
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
        addInsightResult,
        addInsightFollowUp,
        addMonthlyCheckup,
        updateNutritionPlan,
        toggleReminderDone,
        completeReminder,
        addPetDocument,
        updateParasiteProtectionPlan,
        getPet,
        getSelectedPet,
        getPetReminders,
        getPetVaccines,
        getPetTherapies,
        getPetNutrition,
        getPetInsights,
        getPetFollowUps,
        getPetCheckups,
        getPetDocuments,
        getPetParasiteProtection,
        getPetHealthEvents,
        toast,
        showToast,
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
