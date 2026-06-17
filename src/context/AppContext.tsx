import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  Pet,
  Reminder,
  Vaccine,
  Therapy,
  NutritionPlan,
  DiagnosticResult,
  MonthlyCheckup,
  CalendarEvent,
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
  MONTHLY_CHECKUPS,
  CALENDAR_EVENTS,
} from '../data/mockData';

interface AppContextType {
  // Navigation
  activeTab: TabName;
  currentScreen: ScreenName;
  selectedPetId: string | null;
  navigateToPet: (petId: string) => void;
  navigateToFeature: (screen: Exclude<ScreenName, null | 'pet-dashboard' | 'add-pet' | 'edit-pet'>) => void;
  navigateToAddPet: () => void;
  navigateToEditPet: () => void;
  navigateBack: () => void;
  setActiveTab: (tab: TabName) => void;

  // Data — read
  pets: Pet[];
  reminders: Reminder[];
  vaccines: Vaccine[];
  therapies: Therapy[];
  nutritionPlans: NutritionPlan[];
  diagnosticResults: DiagnosticResult[];
  monthlyCheckups: MonthlyCheckup[];
  calendarEvents: CalendarEvent[];

  // Data — write
  addPet: (pet: Pet) => void;
  updatePet: (pet: Pet) => void;
  deletePet: (petId: string) => void;
  addDiagnosticResult: (result: DiagnosticResult) => void;
  addMonthlyCheckup: (checkup: MonthlyCheckup) => void;
  updateNutritionPlan: (plan: NutritionPlan) => void;
  toggleReminderDone: (id: string) => void;

  // Helpers
  getPet: (id: string) => Pet | undefined;
  getSelectedPet: () => Pet | undefined;
  getPetReminders: (petId: string) => Reminder[];
  getPetVaccines: (petId: string) => Vaccine[];
  getPetTherapies: (petId: string) => Therapy[];
  getPetNutrition: (petId: string) => NutritionPlan | undefined;
  getPetDiagnostics: (petId: string) => DiagnosticResult[];
  getPetCheckups: (petId: string) => MonthlyCheckup[];
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTabState] = useState<TabName>('pets');
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(null);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const [pets, setPets] = useState<Pet[]>(PETS);
  const [reminders, setReminders] = useState<Reminder[]>(REMINDERS);
  const [vaccines] = useState<Vaccine[]>(VACCINES);
  const [therapies] = useState<Therapy[]>(THERAPIES);
  const [nutritionPlans, setNutritionPlans] = useState<NutritionPlan[]>(NUTRITION_PLANS);
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>(DIAGNOSTIC_RESULTS);
  const [monthlyCheckups, setMonthlyCheckups] = useState<MonthlyCheckup[]>(MONTHLY_CHECKUPS);
  const [calendarEvents] = useState<CalendarEvent[]>(CALENDAR_EVENTS);

  const navigateToPet = useCallback((petId: string) => {
    setSelectedPetId(petId);
    setCurrentScreen('pet-dashboard');
  }, []);

  const navigateToFeature = useCallback(
    (screen: Exclude<ScreenName, null | 'pet-dashboard' | 'add-pet' | 'edit-pet'>) => {
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

  const navigateBack = useCallback(() => {
    if (currentScreen === 'add-pet') {
      setCurrentScreen(null);
      setSelectedPetId(null);
      setActiveTabState('pets');
    } else if (currentScreen === 'edit-pet') {
      setCurrentScreen('pet-dashboard');
    } else if (currentScreen !== null && currentScreen !== 'pet-dashboard') {
      setCurrentScreen('pet-dashboard');
    } else {
      setCurrentScreen(null);
      setSelectedPetId(null);
    }
  }, [currentScreen]);

  const setActiveTab = useCallback((tab: TabName) => {
    setActiveTabState(tab);
    setCurrentScreen(null);
    setSelectedPetId(null);
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

  const addDiagnosticResult = useCallback((result: DiagnosticResult) => {
    setDiagnosticResults((prev) => [result, ...prev]);
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

  const getPet = useCallback((id: string) => pets.find((p) => p.id === id), [pets]);
  const getSelectedPet = useCallback(() => (selectedPetId ? pets.find((p) => p.id === selectedPetId) : undefined), [pets, selectedPetId]);
  const getPetReminders = useCallback((petId: string) => reminders.filter((r) => r.petId === petId), [reminders]);
  const getPetVaccines = useCallback((petId: string) => vaccines.filter((v) => v.petId === petId), [vaccines]);
  const getPetTherapies = useCallback((petId: string) => therapies.filter((t) => t.petId === petId), [therapies]);
  const getPetNutrition = useCallback((petId: string) => nutritionPlans.find((n) => n.petId === petId), [nutritionPlans]);
  const getPetDiagnostics = useCallback((petId: string) => diagnosticResults.filter((d) => d.petId === petId), [diagnosticResults]);
  const getPetCheckups = useCallback((petId: string) => monthlyCheckups.filter((c) => c.petId === petId), [monthlyCheckups]);

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
        navigateBack,
        setActiveTab,
        pets,
        reminders,
        vaccines,
        therapies,
        nutritionPlans,
        diagnosticResults,
        monthlyCheckups,
        calendarEvents,
        addPet,
        updatePet,
        deletePet,
        addDiagnosticResult,
        addMonthlyCheckup,
        updateNutritionPlan,
        toggleReminderDone,
        getPet,
        getSelectedPet,
        getPetReminders,
        getPetVaccines,
        getPetTherapies,
        getPetNutrition,
        getPetDiagnostics,
        getPetCheckups,
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
