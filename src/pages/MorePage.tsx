import { Bell, Shield, Info, ChevronRight, User, Moon, LogOut } from 'lucide-react';
import { useState } from 'react';
import TopBar from '../components/TopBar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 relative ${checked ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-600'}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}
      />
    </button>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-card overflow-hidden divide-y divide-slate-100 dark:divide-slate-700">
      {children}
    </div>
  );
}

function Row({
  Icon,
  label,
  sublabel,
  right,
  iconBg = 'bg-sky-50',
  iconColor = 'text-sky-500',
}: {
  Icon: typeof Bell;
  label: string;
  sublabel?: string;
  right?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={16} className={iconColor} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{label}</p>
        {sublabel && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sublabel}</p>}
      </div>
      {right ?? <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />}
    </div>
  );
}

export default function MorePage() {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [notifReminders, setNotifReminders] = useState(true);
  const [notifVaccines, setNotifVaccines] = useState(true);
  const [notifCheckups, setNotifCheckups] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-slate-50 dark:bg-slate-900">
      <TopBar title="More" />
      <main className="flex-1 px-4 py-4 pb-24 space-y-5">
        {/* Profile */}
        <SectionCard>
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <User size={22} className="text-white" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user?.name ?? 'My Account'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{user?.email ?? 'Manage your profile and preferences'}</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
          </div>
        </SectionCard>

        {/* Notification Preferences */}
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1 mb-2">Notifications</p>
          <SectionCard>
            <Row
              Icon={Bell}
              label="Reminders & Therapies"
              sublabel="Daily medication and therapy alerts"
              iconBg="bg-violet-50"
              iconColor="text-violet-500"
              right={<Toggle checked={notifReminders} onChange={setNotifReminders} />}
            />
            <Row
              Icon={Shield}
              label="Vaccine Due Dates"
              sublabel="Upcoming vaccine reminders"
              iconBg="bg-sky-50"
              iconColor="text-sky-500"
              right={<Toggle checked={notifVaccines} onChange={setNotifVaccines} />}
            />
            <Row
              Icon={Info}
              label="Checkup Reminders"
              sublabel="Monthly and annual checkup alerts"
              iconBg="bg-emerald-50"
              iconColor="text-emerald-500"
              right={<Toggle checked={notifCheckups} onChange={setNotifCheckups} />}
            />
          </SectionCard>
        </div>

        {/* Appearance */}
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1 mb-2">Appearance</p>
          <SectionCard>
            <Row
              Icon={Moon}
              label="Dark Mode"
              sublabel={isDark ? 'Currently dark — tap to switch to light' : 'Currently light — tap to switch to dark'}
              iconBg={isDark ? 'bg-slate-700' : 'bg-slate-100'}
              iconColor={isDark ? 'text-sky-400' : 'text-slate-500'}
              right={<Toggle checked={isDark} onChange={() => toggleTheme()} />}
            />
          </SectionCard>
        </div>

        {/* About */}
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide px-1 mb-2">About</p>
          <SectionCard>
            <Row Icon={Info} label="About PetCare AI" sublabel="Version 1.0.0 (MVP)" iconBg="bg-slate-100" iconColor="text-slate-500" />
            <Row Icon={Shield} label="Privacy Policy" iconBg="bg-slate-100" iconColor="text-slate-500" />
          </SectionCard>
        </div>

        {/* Sign Out */}
        <button
          onClick={logout}
          className="w-full bg-white dark:bg-slate-800 rounded-2xl shadow-card px-4 py-3.5 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 active:bg-red-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
            <LogOut size={16} className="text-red-500" strokeWidth={2} />
          </div>
          <span className="text-sm font-semibold text-red-500">Sign Out</span>
        </button>
      </main>
    </div>
  );
}
