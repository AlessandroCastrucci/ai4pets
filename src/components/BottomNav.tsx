import { Home, Bell, Bot, Calendar, MoreHorizontal } from 'lucide-react';
import type { TabName } from '../types';
import { useApp } from '../context/AppContext';

const TABS: { id: TabName; label: string; Icon: typeof Home }[] = [
  { id: 'pets', label: 'My Pets', Icon: Home },
  { id: 'reminders', label: 'Reminders', Icon: Bell },
  { id: 'assistant', label: 'AI Assistant', Icon: Bot },
  { id: 'calendar', label: 'Calendar', Icon: Calendar },
  { id: 'more', label: 'More', Icon: MoreHorizontal },
];

export default function BottomNav() {
  const { activeTab, setActiveTab } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50 max-w-md mx-auto">
      <div className="flex items-stretch" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {TABS.map(({ id, label, Icon }) => {
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
    </nav>
  );
}
