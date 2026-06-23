import { useState } from 'react';
import { Syringe, Pill, Stethoscope, Calendar, ShieldCheck } from 'lucide-react';
import type { Reminder, Pet } from '../types';
import { useApp } from '../context/AppContext';

const TYPE_CONFIG = {
  therapy: { Icon: Pill, color: 'text-violet-500', bg: 'bg-violet-50', label: 'Therapy' },
  vaccine: { Icon: Syringe, color: 'text-sky-500', bg: 'bg-sky-50', label: 'Vaccine' },
  medication: { Icon: Pill, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Medication' },
  checkup: { Icon: Stethoscope, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Checkup' },
  appointment: { Icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Appointment' },
  parasite: { Icon: ShieldCheck, color: 'text-lime-600', bg: 'bg-lime-50', label: 'Parasite Protection' },
};

interface ReminderCardProps {
  reminder: Reminder;
  pet?: Pet;
  showPet?: boolean;
  onCompleted?: () => void;
}

function formatDateTime(datetime: string): { date: string; time: string; isToday: boolean } {
  const d = new Date(datetime);
  const today = new Date('2026-06-17');
  const isToday =
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();

  const date = isToday
    ? 'Today'
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return { date, time, isToday };
}

export default function ReminderCard({ reminder, pet, showPet = false, onCompleted }: ReminderCardProps) {
  const { completeReminder } = useApp();
  const config = TYPE_CONFIG[reminder.type];
  const { date, time, isToday } = formatDateTime(reminder.datetime);
  const [completing, setCompleting] = useState(false);

  function handleComplete() {
    if (reminder.done || completing) return;
    setCompleting(true);
    setTimeout(() => {
      completeReminder(reminder.id);
      onCompleted?.();
    }, 400);
  }

  return (
    <div className={`bg-white rounded-2xl shadow-card p-4 flex items-start gap-3 transition-all duration-300 ${
      completing ? 'opacity-0 scale-95' : reminder.done ? 'opacity-50' : ''
    }`}>
      <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
        <config.Icon size={18} className={config.color} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{reminder.title}</p>
            {showPet && pet && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <img src={pet.photo} alt={pet.name} className="w-4 h-4 rounded-full object-cover" />
                <span className="text-xs text-slate-500">{pet.name}</span>
              </div>
            )}
          </div>
          <button
            onClick={handleComplete}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 ${
              completing || reminder.done
                ? 'bg-emerald-500 border-emerald-500 scale-110'
                : 'border-slate-300 hover:border-emerald-400'
            } flex items-center justify-center`}
            aria-label={reminder.done ? 'Completed' : 'Mark as done'}
          >
            {(completing || reminder.done) && (
              <svg viewBox="0 0 12 12" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="1,6 4.5,9.5 11,2" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`text-xs font-medium ${isToday ? 'text-amber-600' : 'text-slate-500'}`}>
            {date}
          </span>
          <span className="text-slate-300 text-xs">·</span>
          <span className="text-xs text-slate-400">{time}</span>
          <span className="text-slate-300 text-xs">·</span>
          <span className="text-xs text-slate-400">{config.label}</span>
        </div>
        {reminder.notes && (
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{reminder.notes}</p>
        )}
      </div>
    </div>
  );
}
