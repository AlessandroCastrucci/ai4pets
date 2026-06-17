import { useApp } from './context/AppContext';
import BottomNav from './components/BottomNav';
import MyPetsPage from './pages/MyPetsPage';
import PetDashboard from './pages/PetDashboard';
import RemindersPage from './pages/RemindersPage';
import AIAssistantPage from './pages/AIAssistantPage';
import CalendarPage from './pages/CalendarPage';
import MorePage from './pages/MorePage';
import AIDiagnosticsPage from './pages/features/AIDiagnosticsPage';
import AICheckupPage from './pages/features/AICheckupPage';
import NutritionPage from './pages/features/NutritionPage';
import VaccinesPage from './pages/features/VaccinesPage';
import TherapiesPage from './pages/features/TherapiesPage';

function Screen() {
  const { activeTab, currentScreen } = useApp();

  // Feature screens (no bottom nav)
  if (currentScreen === 'ai-diagnostics') return <AIDiagnosticsPage />;
  if (currentScreen === 'ai-checkup') return <AICheckupPage />;
  if (currentScreen === 'nutrition') return <NutritionPage />;
  if (currentScreen === 'vaccines') return <VaccinesPage />;
  if (currentScreen === 'therapies') return <TherapiesPage />;
  if (currentScreen === 'pet-dashboard') return <PetDashboard />;

  // Tab screens (with bottom nav)
  switch (activeTab) {
    case 'pets': return <MyPetsPage />;
    case 'reminders': return <RemindersPage />;
    case 'assistant': return <AIAssistantPage />;
    case 'calendar': return <CalendarPage />;
    case 'more': return <MorePage />;
  }
}

export default function App() {
  const { currentScreen } = useApp();
  const showBottomNav = currentScreen === null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative">
      <div
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: showBottomNav ? '72px' : '0' }}
      >
        <Screen />
      </div>
      {showBottomNav && <BottomNav />}
    </div>
  );
}
