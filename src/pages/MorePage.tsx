import { Bell, Shield, Info, ChevronRight, UtensilsCrossed, Bot, Stethoscope, Syringe } from 'lucide-react';
import { useState } from 'react';
import TopBar from '../components/TopBar';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{ width: 44, height: 24 }}
      className={`rounded-full transition-colors flex-shrink-0 relative ${checked ? 'bg-sky-500' : 'bg-slate-200'}`}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: 2,
          width: 20,
          height: 20,
          transform: checked ? 'translateX(20px)' : 'translateX(0)',
        }}
        className="rounded-full bg-white shadow-sm transition-transform"
      />
    </button>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden divide-y divide-slate-100">
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
  onClick,
}: {
  Icon: typeof Bell;
  label: string;
  sublabel?: string;
  right?: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3.5 ${onClick ? 'cursor-pointer active:bg-slate-50' : ''}`}
      onClick={onClick}
    >
      <div className={`w-8 h-8 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={16} className={iconColor} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {sublabel && <p className="text-xs text-slate-500 mt-0.5">{sublabel}</p>}
      </div>
      {right !== undefined ? right : (onClick !== undefined ? <ChevronRight size={16} className="text-slate-300" /> : null)}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-2">{children}</p>
  );
}

export default function MorePage() {
  const { user } = useAuth();
  const { navigateToAccount } = useApp();

  const [notifTherapy, setNotifTherapy] = useState(true);
  const [notifVaccines, setNotifVaccines] = useState(true);
  const [notifMeals, setNotifMeals] = useState(false);
  const [notifAiFollowUp, setNotifAiFollowUp] = useState(false);
  const [notifMonthly, setNotifMonthly] = useState(true);
  const [notifAnnual, setNotifAnnual] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="More" />
      <main className="flex-1 px-4 py-4 pb-24 space-y-5">

        {/* Account card */}
        <SectionCard>
          <button
            onClick={navigateToAccount}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-slate-50 active:bg-slate-100 transition-colors"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-base leading-none">{initials}</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-slate-800">{user?.name ?? 'My Account'}</p>
              <p className="text-xs text-slate-500 mt-0.5">{user?.email ?? 'Manage your profile'}</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 flex-shrink-0" />
          </button>
        </SectionCard>

        {/* Notifications */}
        <div>
          <SectionLabel>Notifications</SectionLabel>
          <SectionCard>
            <Row
              Icon={Stethoscope}
              label="Therapy Reminders"
              sublabel="Daily medication and therapy alerts"
              iconBg="bg-violet-50"
              iconColor="text-violet-500"
              right={<Toggle checked={notifTherapy} onChange={setNotifTherapy} />}
            />
            <Row
              Icon={Syringe}
              label="Vaccine Due Dates"
              sublabel="Upcoming vaccine reminders"
              iconBg="bg-sky-50"
              iconColor="text-sky-500"
              right={<Toggle checked={notifVaccines} onChange={setNotifVaccines} />}
            />
            <Row
              Icon={UtensilsCrossed}
              label="Meal Reminders"
              sublabel="Scheduled feeding time alerts"
              iconBg="bg-amber-50"
              iconColor="text-amber-500"
              right={<Toggle checked={notifMeals} onChange={setNotifMeals} />}
            />
            <Row
              Icon={Bot}
              label="AI Follow-up Reminders"
              sublabel="Follow-up on AI diagnostics"
              iconBg="bg-emerald-50"
              iconColor="text-emerald-500"
              right={<Toggle checked={notifAiFollowUp} onChange={setNotifAiFollowUp} />}
            />
            <Row
              Icon={Info}
              label="Monthly Checkup Reminders"
              sublabel="Monthly health checkup alerts"
              iconBg="bg-blue-50"
              iconColor="text-blue-500"
              right={<Toggle checked={notifMonthly} onChange={setNotifMonthly} />}
            />
            <Row
              Icon={Bell}
              label="Annual Checkup Reminders"
              sublabel="Yearly vet checkup alerts"
              iconBg="bg-rose-50"
              iconColor="text-rose-500"
              right={<Toggle checked={notifAnnual} onChange={setNotifAnnual} />}
            />
          </SectionCard>
        </div>

        {/* Data & Privacy */}
        <div>
          <SectionLabel>Data &amp; Privacy</SectionLabel>
          <SectionCard>
            <Row
              Icon={Shield}
              label="Privacy Policy"
              iconBg="bg-slate-100"
              iconColor="text-slate-500"
              onClick={() => {}}
            />
            <Row
              Icon={Shield}
              label="Data Management"
              sublabel="View and manage your data"
              iconBg="bg-slate-100"
              iconColor="text-slate-500"
              onClick={() => {}}
            />
          </SectionCard>
        </div>

        {/* About */}
        <div>
          <SectionLabel>About</SectionLabel>
          <SectionCard>
            <Row
              Icon={Info}
              label="About TTCARE VET"
              sublabel="Your premium pet health companion"
              iconBg="bg-slate-100"
              iconColor="text-slate-500"
              onClick={() => {}}
            />
            <Row
              Icon={Info}
              label="App Version"
              sublabel="1.0.0 (MVP)"
              iconBg="bg-slate-100"
              iconColor="text-slate-500"
              right={null}
            />
            <Row
              Icon={Bell}
              label="Support"
              sublabel="Get help and contact us"
              iconBg="bg-slate-100"
              iconColor="text-slate-500"
              onClick={() => {}}
            />
          </SectionCard>
        </div>

      </main>
    </div>
  );
}
