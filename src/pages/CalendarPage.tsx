import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import ReminderCard from '../components/ReminderCard';
import { useApp } from '../context/AppContext';
import type { Reminder } from '../types';

type ReminderType = 'therapy' | 'vaccine' | 'medication' | 'checkup' | 'appointment' | 'parasite';

const EVENT_TYPE_STYLES: Record<string, { dot: string; badge: string }> = {
  vaccine: { dot: 'bg-sky-400', badge: 'bg-sky-50 text-sky-700 border border-sky-200' },
  therapy: { dot: 'bg-violet-400', badge: 'bg-violet-50 text-violet-700 border border-violet-200' },
  checkup: { dot: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  medication: { dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700 border border-amber-200' },
  appointment: { dot: 'bg-blue-400', badge: 'bg-blue-50 text-blue-700 border border-blue-200' },
  parasite: { dot: 'bg-lime-400', badge: 'bg-lime-50 text-lime-700 border border-lime-200' },
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TYPE_FILTERS: { value: ReminderType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'vaccine', label: 'Vaccines' },
  { value: 'therapy', label: 'Therapy' },
  { value: 'medication', label: 'Meds' },
  { value: 'checkup', label: 'Checkups' },
  { value: 'parasite', label: 'Parasite' },
];

const TODAY = new Date('2026-06-17');
const TODAY_STR = '2026-06-17';

function getEndOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const daysUntilSunday = 6 - day;
  d.setDate(d.getDate() + daysUntilSunday);
  d.setHours(23, 59, 59, 999);
  return d;
}

function groupReminders(reminders: Reminder[]): { label: string; items: Reminder[] }[] {
  const tomorrow = new Date(TODAY);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);
  const endOfWeek = getEndOfWeek(TODAY);

  const groups: { label: string; items: Reminder[] }[] = [
    { label: 'Today', items: [] },
    { label: 'Tomorrow', items: [] },
    { label: 'This Week', items: [] },
    { label: 'Upcoming', items: [] },
  ];

  for (const r of reminders) {
    const rDate = new Date(r.datetime);
    const rDateStr = r.datetime.slice(0, 10);

    if (rDateStr === TODAY_STR) {
      groups[0].items.push(r);
    } else if (rDateStr === tomorrowStr) {
      groups[1].items.push(r);
    } else if (rDate <= endOfWeek) {
      groups[2].items.push(r);
    } else {
      groups[3].items.push(r);
    }
  }

  return groups.filter((g) => g.items.length > 0);
}

export default function CalendarPage() {
  const { calendarEvents, reminders, pets, getPet } = useApp();
  const [segment, setSegment] = useState<'calendar' | 'agenda'>('calendar');

  // Calendar state
  const [viewYear, setViewYear] = useState(TODAY.getFullYear());
  const [viewMonth, setViewMonth] = useState(TODAY.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(TODAY_STR);

  // Agenda state
  const [petFilter, setPetFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<ReminderType | 'all'>('all');

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const eventDateSet = new Set(calendarEvents.map((e) => e.date));

  function dateStr(day: number) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  const selectedEvents = calendarEvents.filter((e) => e.date === selectedDate);

  // Agenda filtering
  const filteredReminders = reminders
    .filter((r) => !r.done)
    .filter((r) => {
      const pet = getPet(r.petId);
      const matchPet = petFilter === 'All' || pet?.name === petFilter;
      const matchType = typeFilter === 'all' || r.type === typeFilter;
      return matchPet && matchType;
    })
    .filter((r) => r.datetime.slice(0, 10) >= TODAY_STR)
    .sort((a, b) => a.datetime.localeCompare(b.datetime));

  const grouped = groupReminders(filteredReminders);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="Calendar" />
      <main className="flex-1 px-4 py-4 pb-24 space-y-4">
        {/* Segmented control */}
        <div className="bg-slate-200/70 rounded-xl p-1 flex">
          <button
            onClick={() => setSegment('calendar')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              segment === 'calendar'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => setSegment('agenda')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              segment === 'agenda'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Agenda
          </button>
        </div>

        {segment === 'calendar' ? (
          <>
            {/* Month navigator */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <button onClick={prevMonth} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">
                  <ChevronLeft size={18} className="text-slate-600" />
                </button>
                <span className="text-sm font-semibold text-slate-800">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <button onClick={nextMonth} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">
                  <ChevronRight size={18} className="text-slate-600" />
                </button>
              </div>

              {/* Day names */}
              <div className="grid grid-cols-7 px-2 pt-2">
                {DAY_NAMES.map((d) => (
                  <div key={d} className="text-center text-[11px] font-medium text-slate-400 py-1">{d}</div>
                ))}
              </div>

              {/* Day grid */}
              <div className="grid grid-cols-7 px-2 pb-3 gap-y-0.5">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const ds = dateStr(day);
                  const isToday = ds === TODAY_STR;
                  const isSelected = ds === selectedDate;
                  const hasEvent = eventDateSet.has(ds);
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(ds)}
                      className={`relative flex flex-col items-center justify-center w-full aspect-square rounded-xl transition-colors ${
                        isSelected
                          ? 'bg-sky-500'
                          : isToday
                          ? 'bg-sky-50'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <span className={`text-sm font-medium ${
                        isSelected ? 'text-white' : isToday ? 'text-sky-600' : 'text-slate-700'
                      }`}>
                        {day}
                      </span>
                      {hasEvent && (
                        <div className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-white/70' : 'bg-sky-400'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Events for selected date */}
            <section>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-3">
                {selectedDate === TODAY_STR ? "Today's Events" : `Events \u00b7 ${selectedDate}`}
                {selectedEvents.length > 0 && ` \u00b7 ${selectedEvents.length}`}
              </p>
              {selectedEvents.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-card px-4 py-8 text-center">
                  <p className="text-sm text-slate-400">No events on this day</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedEvents.map((event) => {
                    const pet = getPet(event.petId);
                    const styles = EVENT_TYPE_STYLES[event.type] ?? EVENT_TYPE_STYLES.appointment;
                    return (
                      <div key={event.id} className="bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${styles.dot}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800">{event.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {pet && (
                              <>
                                <img src={pet.photo} alt={pet.name} className="w-4 h-4 rounded-full object-cover" />
                                <span className="text-xs text-slate-500">{pet.name}</span>
                                <span className="text-slate-300 text-xs">&middot;</span>
                              </>
                            )}
                            {event.time && <span className="text-xs text-slate-400">{event.time}</span>}
                          </div>
                        </div>
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${styles.badge}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Upcoming events */}
            <section>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-3">Upcoming</p>
              <div className="space-y-2">
                {calendarEvents
                  .filter((e) => e.date >= TODAY_STR && e.date !== selectedDate)
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .slice(0, 5)
                  .map((event) => {
                    const pet = getPet(event.petId);
                    const styles = EVENT_TYPE_STYLES[event.type] ?? EVENT_TYPE_STYLES.appointment;
                    return (
                      <button
                        key={event.id}
                        onClick={() => setSelectedDate(event.date)}
                        className="w-full bg-white rounded-xl shadow-card px-4 py-3 flex items-center gap-3 text-left hover:shadow-card-md transition-shadow"
                      >
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${styles.dot}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">{event.title}</p>
                          <p className="text-xs text-slate-400">{pet?.name} &middot; {event.date}{event.time ? ` \u00b7 ${event.time}` : ''}</p>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </section>
          </>
        ) : (
          /* Agenda view */
          <>
            {/* Filters */}
            <div className="space-y-3">
              {/* Pet filter */}
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
                {['All', ...pets.map((p) => p.name)].map((name) => {
                  const pet = pets.find((p) => p.name === name);
                  const active = petFilter === name;
                  return (
                    <button
                      key={name}
                      onClick={() => setPetFilter(name)}
                      className={`flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                        active
                          ? 'bg-sky-500 text-white border-sky-500'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      {pet && (
                        <img src={pet.photo} alt={pet.name} className="w-4 h-4 rounded-full object-cover" />
                      )}
                      {name === 'All' ? 'All Pets' : name}
                    </button>
                  );
                })}
              </div>

              {/* Type filter */}
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
                {TYPE_FILTERS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setTypeFilter(value)}
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      typeFilter === value
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grouped reminders */}
            {grouped.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <p className="text-sm">No upcoming reminders</p>
                <p className="text-xs mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="space-y-5">
                {grouped.map(({ label, items }) => (
                  <section key={label} className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1">
                      {label} &middot; {items.length}
                    </p>
                    {items.map((r) => (
                      <ReminderCard key={r.id} reminder={r} pet={getPet(r.petId)} showPet />
                    ))}
                  </section>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
