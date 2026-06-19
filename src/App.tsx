import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import OnboardingPage, { hasSeenOnboarding } from './pages/onboarding/OnboardingPage';
import BottomNav from './components/BottomNav';

// DEV FLAG — set to true to always show onboarding on every reload (for design review).
// Set to false to restore normal localStorage-gated behaviour before shipping.
const FORCE_SHOW_ONBOARDING = true;
import MyPetsPage from './pages/MyPetsPage';
import PetDashboard from './pages/PetDashboard';
import RemindersPage from './pages/RemindersPage';
import AIAssistantPage from './pages/AIAssistantPage';
import CalendarPage from './pages/CalendarPage';
import MorePage from './pages/MorePage';
import AddEditPetPage from './pages/AddEditPetPage';
import PetHealthHistoryPage from './pages/features/PetHealthHistoryPage';
import AIDiagnosticsPage from './pages/features/AIDiagnosticsPage';
import AICheckupPage from './pages/features/AICheckupPage';
import NutritionPage from './pages/features/NutritionPage';
import VaccinesPage from './pages/features/VaccinesPage';
import TherapiesPage from './pages/features/TherapiesPage';
import AccountPage from './pages/AccountPage';
import EditProfilePage from './pages/EditProfilePage';
import WelcomePage from './pages/auth/WelcomePage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

function AppScreen() {
  const { activeTab, currentScreen } = useApp();

  if (currentScreen === 'add-pet') return <AddEditPetPage />;
  if (currentScreen === 'edit-pet') return <AddEditPetPage />;
  if (currentScreen === 'pet-health-history') return <PetHealthHistoryPage />;
  if (currentScreen === 'ai-diagnostics') return <AIDiagnosticsPage />;
  if (currentScreen === 'ai-checkup') return <AICheckupPage />;
  if (currentScreen === 'nutrition') return <NutritionPage />;
  if (currentScreen === 'vaccines') return <VaccinesPage />;
  if (currentScreen === 'therapies') return <TherapiesPage />;
  if (currentScreen === 'pet-dashboard') return <PetDashboard />;
  if (currentScreen === 'account') return <AccountPage />;
  if (currentScreen === 'edit-profile') return <EditProfilePage />;

  switch (activeTab) {
    case 'pets': return <MyPetsPage />;
    case 'reminders': return <RemindersPage />;
    case 'assistant': return <AIAssistantPage />;
    case 'calendar': return <CalendarPage />;
    case 'more': return <MorePage />;
  }
}

function AuthenticatedApp() {
  const { currentScreen } = useApp();
  const showBottomNav = currentScreen === null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative">
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: showBottomNav ? '72px' : '0' }}>
        <AppScreen />
      </div>
      {showBottomNav && <BottomNav />}
    </div>
  );
}

function AuthScreens() {
  const { authScreen } = useAuth();
  if (authScreen === 'login') return <LoginPage />;
  if (authScreen === 'signup') return <SignUpPage />;
  if (authScreen === 'forgot-password') return <ForgotPasswordPage />;
  return <WelcomePage />;
}

export default function App() {
  const { isAuthenticated } = useAuth();
  const [onboardingDone, setOnboardingDone] = useState(
    () => !FORCE_SHOW_ONBOARDING && hasSeenOnboarding()
  );

  if (!isAuthenticated && !onboardingDone) {
    return <OnboardingPage onComplete={() => setOnboardingDone(true)} />;
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto min-h-screen">
        <AuthScreens />
      </div>
    );
  }

  return (
    <AppProvider>
      <AuthenticatedApp />
    </AppProvider>
  );
}
