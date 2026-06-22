import { Home, Bell, Scan, Calendar, MoreHorizontal } from 'lucide-react';
import type { TabName } from '../types';
import { useApp } from '../context/AppContext';

const LEFT_TABS: { id: TabName; label: string; Icon: typeof Home }[] = [
  { id: 'pets', label: 'My Pets', Icon: Home },
  { id: 'reminders', label: 'Reminders', Icon: Bell },
];

const RIGHT_TABS: { id: TabName; label: string; Icon: typeof Home }[] = [
  { id: 'calendar', label: 'Calendar', Icon: Calendar },
  { id: 'more', label: 'More', Icon: MoreHorizontal },
];

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="relative bg-white border-t border-slate-100 rounded-t-2xl shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
        <div className="flex items-stretch">
          {LEFT_TABS.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] transition-colors ${
                  active ? 'text-sky-500' : 'text-slate-400'
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                <span className={`text-[10px] font-medium leading-tight ${active ? 'text-sky-500' : 'text-slate-400'}`}>
                  {label}
                </span>
              </button>
            );
          })}

          {/* Spacer for center button */}
          <div className="flex-1" />

          {RIGHT_TABS.map(({ id, label, Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] transition-colors ${
                  active ? 'text-sky-500' : 'text-slate-400'
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                <span className={`text-[10px] font-medium leading-tight ${active ? 'text-sky-500' : 'text-slate-400'}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Floating AI Diagnostics center button */}
        <button
          onClick={() => setActiveTab('diagnostics')}
          className="absolute left-1/2 -translate-x-1/2 -top-7 flex flex-col items-center"
        >
          <div className="relative">
            <div className="absolute inset-[-6px] rounded-full bg-white" />
            <div
              className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 40%, #0369a1 100%)' }}
            >
              <Scan size={26} className="text-white" strokeWidth={2.2} />
            </div>
          </div>
          <span className="text-[10px] font-semibold text-sky-500 mt-1">AI Diagnostics</span>
        </button>
      </div>
    </nav>
  );
}
