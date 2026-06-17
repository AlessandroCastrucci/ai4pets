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
  navigateToFeature: (screen: Exclude<ScreenName, null | 'pet-dashboard'>) => void;
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

  const [pets] = useState<Pet[]>(PETS);
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
    (screen: Exclude<ScreenName, null | 'pet-dashboard'>) => {
      setCurrentScreen(screen);
    },
    [],
  );

  const navigateBack = useCallback(() => {
    if (currentScreen !== null && currentScreen !== 'pet-dashboard') {
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

  const addDiagnosticResult = useCallback((result: DiagnosticResult) => {
    setDiagnosticResults((prev) => [result, ...prev]);
  }, []);

  const addMonthlyCheckup = useCallback((checkup: MonthlyCheckup) => {
    setMonthlyCheckups((prev) => [checkup, ...prev]);
  }, []);

  const updateNutritionPlan = useCallback((plan: NutritionPlan) => {
    setNutritionPlans((prev) => prev.map((p) => (p.petId === plan.petId ? plan : p)));
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
