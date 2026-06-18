import { ChevronRight, Trash2, LogOut, Pencil } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden divide-y divide-slate-100">
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800 truncate ml-4 max-w-[56%] text-right">{value}</span>
    </div>
  );
}

function ActionRow({
  Icon,
  label,
  sublabel,
  iconBg = 'bg-slate-100',
  iconColor = 'text-slate-500',
  destructive = false,
  onClick,
}: {
  Icon: typeof Trash2;
  label: string;
  sublabel?: string;
  iconBg?: string;
  iconColor?: string;
  destructive?: boolean;
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
        <p className={`text-sm font-medium ${destructive ? 'text-red-500' : 'text-slate-800'}`}>{label}</p>
        {sublabel && <p className="text-xs text-slate-500 mt-0.5">{sublabel}</p>}
      </div>
      {onClick && <ChevronRight size={16} className={destructive ? 'text-red-300' : 'text-slate-300'} />}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-2">{children}</p>
  );
}

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { navigateToEditProfile } = useApp();

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const memberSince = 'January 2025';

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="My Account" showBack />

      <main className="flex-1 px-4 pb-10 space-y-5">

        {/* Profile hero */}
        <div className="flex flex-col items-center pt-8 pb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg mb-4">
            <span className="text-white font-bold text-3xl leading-none">{initials}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900">{user?.name ?? 'My Account'}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{user?.email ?? ''}</p>
          <button
            onClick={navigateToEditProfile}
            className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 transition-colors shadow-sm"
          >
            <Pencil size={14} className="text-white" strokeWidth={2} />
            <span className="text-sm font-semibold text-white">Edit Profile</span>
          </button>
        </div>

        {/* Personal Information */}
        <div>
          <SectionLabel>Personal Information</SectionLabel>
          <SectionCard>
            <InfoRow label="Name" value={user?.name ?? '—'} />
            <InfoRow label="Email" value={user?.email ?? '—'} />
            <InfoRow label="Member Since" value={memberSince} />
          </SectionCard>
        </div>

        {/* Session */}
        <div>
          <SectionLabel>Session</SectionLabel>
          <SectionCard>
            <ActionRow
              Icon={Trash2}
              label="Delete Account"
              sublabel="Permanently remove your account"
              iconBg="bg-red-50"
              iconColor="text-red-400"
              destructive
              onClick={() => {}}
            />
          </SectionCard>
          <button
            onClick={logout}
            className="w-full mt-3 bg-white rounded-2xl shadow-card px-4 py-3.5 flex items-center gap-3 hover:bg-red-50 active:bg-red-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
              <LogOut size={16} className="text-red-500" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-red-500">Sign Out</span>
          </button>
        </div>

      </main>
    </div>
  );
}
