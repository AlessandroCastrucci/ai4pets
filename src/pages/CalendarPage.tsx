import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useApp } from '../context/AppContext';

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

const TODAY = new Date('2026-06-17');
const TODAY_STR = '2026-06-17';

function getEndOfWeek(date: Date): string {
  const d = new Date(date);
  const day = d.getDay();
  const daysUntilSat = 6 - day;
  d.setDate(d.getDate() + daysUntilSat);
  return d.toISOString().slice(0, 10);
}

export default function CalendarPage() {
  const { calendarEvents, getPet } = useApp();

  const [viewYear, setViewYear] = useState(TODAY.getFullYear());
  const [viewMonth, setViewMonth] = useState(TODAY.getMonth());
  const [selectedDate, setSelectedDate] = useState<string>(TODAY_STR);

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

  const endOfWeekStr = getEndOfWeek(TODAY);
  const thisWeekEvents = calendarEvents
    .filter((e) => e.date > TODAY_STR && e.date <= endOfWeekStr)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''));

  const upcomingEvents = calendarEvents
    .filter((e) => e.date > endOfWeekStr)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? '').localeCompare(b.time ?? ''))
    .slice(0, 5);

  function EventCard({ event, onClick }: { event: typeof calendarEvents[number]; onClick?: () => void }) {
    const pet = getPet(event.petId);
    const styles = EVENT_TYPE_STYLES[event.type] ?? EVENT_TYPE_STYLES.appointment;
    const Tag = onClick ? 'button' : 'div';
    return (
      <Tag
        onClick={onClick}
        className={`w-full bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-3 text-left ${onClick ? 'hover:shadow-card-md transition-shadow' : ''}`}
      >
        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${styles.dot}`} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate">{event.title}</p>
          <div className="flex items-center gap-2 mt-0.5">
            {pet && (
              <>
                <img src={pet.photo} alt={pet.name} className="w-4 h-4 rounded-full object-cover" />
                <span className="text-xs text-slate-500">{pet.name}</span>
                <span className="text-slate-300 text-xs">&middot;</span>
              </>
            )}
            <span className="text-xs text-slate-400">{event.date}</span>
            {event.time && <><span className="text-slate-300 text-xs">&middot;</span><span className="text-xs text-slate-400">{event.time}</span></>}
          </div>
        </div>
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${styles.badge}`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
        </span>
      </Tag>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="Calendar" />
      <main className="flex-1 px-4 py-4 pb-24 space-y-4">
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

        {/* Today's Events */}
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
              {selectedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

        {/* This Week */}
        {thisWeekEvents.length > 0 && (
          <section>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-3">
              This Week &middot; {thisWeekEvents.length}
            </p>
            <div className="space-y-2">
              {thisWeekEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => setSelectedDate(event.date)} />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming */}
        {upcomingEvents.length > 0 && (
          <section>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-1 mb-3">
              Upcoming &middot; {upcomingEvents.length}
            </p>
            <div className="space-y-2">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => setSelectedDate(event.date)} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
