import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Dog, Cat } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useApp } from '../context/AppContext';
import type { Pet, NutritionPlan, Vaccine, Therapy, DiagnosticResult, MonthlyCheckup } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

interface PetCtx {
  pet: Pet;
  nutrition: NutritionPlan | undefined;
  vaccines: Vaccine[];
  therapies: Therapy[];
  diagnostics: DiagnosticResult[];
  checkups: MonthlyCheckup[];
  pronoun: 'her' | 'his';
}

const TODAY = new Date('2026-06-18');

function getPersonalizedGreeting(ctx: PetCtx): string {
  const { pet, pronoun } = ctx;
  return `Hi, I'm your AI assistant for ${pet.name}. I know ${pronoun} profile and health history. How can I help?`;
}

function getContextualQuestions(ctx: PetCtx): string[] {
  const { pet, vaccines, therapies, diagnostics, nutrition } = ctx;
  const qs: string[] = [];
  if (diagnostics.length > 0) qs.push('Explain my last AI result');
  qs.push('Is this normal?');
  if (pet.allergies && pet.allergies.length > 0) qs.push('How to manage allergies?');
  if (therapies.some((t) => t.status === 'active')) qs.push('Active therapy details');
  const hasVaccineAlert = vaccines.some((v) => {
    const diff = Math.ceil((new Date(v.nextDue).getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));
    return diff <= 90;
  });
  if (hasVaccineAlert) qs.push('Vaccine schedule?');
  qs.push('Prepare vet questions');
  if (nutrition && qs.length < 6) qs.push('Review the diet');
  if (qs.length < 6) qs.push('Prevention tips');
  return qs.slice(0, 6);
}

function getMockResponse(question: string, ctx: PetCtx): string {
  const q = question.toLowerCase();
  const { pet, nutrition, vaccines, therapies, diagnostics, checkups, pronoun } = ctx;
  const name = pet.name;
  const he = pronoun === 'her' ? 'She' : 'He';
  const his = pronoun;

  // Last AI diagnostic result
  if (
    (q.includes('last') || q.includes('previous') || q.includes('explain')) &&
    (q.includes('result') || q.includes('diagnos') || q.includes('ai'))
  ) {
    if (diagnostics.length === 0) {
      return `${name} hasn't had any AI diagnostics yet. You can start one from ${his} dashboard using the AI Diagnostics feature.`;
    }
    const last = diagnostics[0];
    const urgencyLabel =
      last.urgency === 'high' ? 'high urgency' : last.urgency === 'medium' ? 'medium urgency' : 'low urgency';
    return (
      `${name}'s most recent AI diagnostic (${last.date}):\n\n` +
      `Diagnosis: ${last.possibleIssue}\n` +
      `Area: ${last.bodyArea.replace('-', '/')}\n` +
      `Urgency: ${urgencyLabel}\n` +
      `Symptoms recorded: ${last.symptoms}\n\n` +
      `Recommendation: ${last.followUpRecommendation}`
    );
  }

  // Vaccines
  if (
    q.includes('vaccine') ||
    q.includes('shot') ||
    q.includes('vaccin') ||
    q.includes('booster') ||
    q.includes('immuniz')
  ) {
    if (vaccines.length === 0) {
      return `No vaccine records found for ${name} yet. You can add ${his} vaccination history in the Vaccines section.`;
    }
    const overdue = vaccines.filter((v) => new Date(v.nextDue) < TODAY);
    const dueSoon = vaccines.filter((v) => {
      const diff = Math.ceil((new Date(v.nextDue).getTime() - TODAY.getTime()) / (1000 * 60 * 60 * 24));
      return diff >= 0 && diff <= 90;
    });
    if (overdue.length > 0) {
      return (
        `${name} has ${overdue.length} overdue vaccine(s): ${overdue.map((v) => v.name).join(', ')}.\n\n` +
        `Please contact your vet to schedule these as soon as possible.`
      );
    }
    if (dueSoon.length > 0) {
      return (
        `${name}'s upcoming vaccines within the next 90 days:\n` +
        dueSoon.map((v) => `• ${v.name} — due ${v.nextDue}`).join('\n') +
        `\n\nI recommend scheduling an appointment with your vet soon.`
      );
    }
    return (
      `${name}'s vaccines are up to date. Current schedule:\n` +
      vaccines.map((v) => `• ${v.name} — next due ${v.nextDue}`).join('\n')
    );
  }

  // Food / diet / nutrition
  if (
    q.includes('food') ||
    q.includes('feed') ||
    q.includes('eat') ||
    q.includes('diet') ||
    q.includes('nutrition') ||
    q.includes('meal') ||
    q.includes('review')
  ) {
    if (!nutrition) {
      return `No nutrition plan is saved for ${name} yet. You can set one up in the Nutrition section from ${his} dashboard.`;
    }
    return (
      `${name} is on ${nutrition.brand} – ${nutrition.productLine}.\n\n` +
      `• Daily quantity: ${nutrition.dailyQuantity}g\n` +
      `• Meals per day: ${nutrition.mealsPerDay}\n` +
      `• Feeding times: ${nutrition.mealTimes.join(', ')}` +
      (nutrition.notes
        ? `\n\nNote: ${nutrition.notes}`
        : `\n\nThe plan looks appropriate for ${name}'s age and weight.`)
    );
  }

  // Allergies
  if (q.includes('allerg')) {
    if (!pet.allergies || pet.allergies.length === 0) {
      return `No known allergies are recorded for ${name}. If you notice any reactions after meals or outdoor activities, update ${his} profile and consult your vet.`;
    }
    return (
      `${name} has recorded allergies to: ${pet.allergies.join(', ')}.\n\n` +
      `Avoid these in ${his} diet and environment. If you notice a reaction — itching, swelling, or digestive upset — contact your vet promptly. Ask about formal allergy testing for a complete picture.`
    );
  }

  // Therapies / medications
  if (
    q.includes('medicat') ||
    q.includes('therap') ||
    q.includes('treatment') ||
    q.includes('progress') ||
    q.includes('active')
  ) {
    const active = therapies.filter((t) => t.status === 'active');
    const completed = therapies.filter((t) => t.status === 'completed');
    if (active.length === 0 && completed.length === 0) {
      return `${name} has no therapy records at the moment.`;
    }
    let response = '';
    if (active.length > 0) {
      response +=
        `Active ${active.length > 1 ? 'therapies' : 'therapy'} for ${name}:\n` +
        active
          .map((t) => `• ${t.name}: ${t.dosage}, ${t.frequency}${t.notes ? ` — ${t.notes}` : ''}`)
          .join('\n');
    }
    if (completed.length > 0) {
      response += `${active.length > 0 ? '\n\n' : ''}Completed: ${completed.map((t) => t.name).join(', ')}`;
    }
    return response;
  }

  // Diseases / conditions
  if (q.includes('disease') || q.includes('condition') || q.includes('sick') || q.includes('ill')) {
    if (!pet.knownDiseases) {
      return `No known diseases are recorded for ${name}. ${he} appears healthy based on the health history. Keep up regular checkups and monitor for any sudden changes.`;
    }
    return (
      `${name}'s recorded conditions: ${pet.knownDiseases}.\n\n` +
      `Regular monitoring and vet check-ins are important. ` +
      (pet.activeMedications
        ? `${he} is currently on ${pet.activeMedications}.`
        : `Ask your vet about the best long-term management plan.`)
    );
  }

  // Checkup / weight
  if (q.includes('checkup') || q.includes('check up') || q.includes('weight') || q.includes('monthly')) {
    if (checkups.length === 0) {
      return `No monthly checkup data found for ${name} yet. You can run a new AI Checkup from ${his} dashboard.`;
    }
    const last = checkups[0];
    return (
      `${name}'s last checkup (${last.date}):\n\n` +
      `• Weight: ${last.weight} kg\n` +
      `• Appetite: ${last.appetite}/5\n` +
      `• Energy: ${last.energyLevel}/5\n` +
      `• Stool quality: ${last.stoolQuality}` +
      (last.behaviorChanges ? `\n• Notes: ${last.behaviorChanges}` : '')
    );
  }

  // Vet visit preparation
  if (
    q.includes('vet') ||
    q.includes('visit') ||
    q.includes('appointment') ||
    q.includes('prepar') ||
    q.includes('question')
  ) {
    const topics: string[] = [];
    if (pet.knownDiseases) topics.push(`Follow-up on ${pet.knownDiseases}`);
    if (pet.allergies && pet.allergies.length > 0)
      topics.push(`Allergy management for ${pet.allergies.join(', ')}`);
    const activeTh = therapies.filter((t) => t.status === 'active');
    if (activeTh.length > 0) topics.push(`Therapy review: ${activeTh.map((t) => t.name).join(', ')}`);
    const overdueV = vaccines.filter((v) => new Date(v.nextDue) < TODAY);
    if (overdueV.length > 0) topics.push(`Overdue vaccines: ${overdueV.map((v) => v.name).join(', ')}`);
    if (diagnostics.length > 0) topics.push(`AI diagnostic follow-up: ${diagnostics[0].possibleIssue}`);
    if (topics.length === 0) {
      topics.push(
        'Annual health screening',
        'Dental health check',
        'Weight management review',
        'Any behavioral changes to discuss',
      );
    }
    return (
      `Suggested questions for ${name}'s next vet visit:\n\n` +
      topics.map((t, i) => `${i + 1}. ${t}`).join('\n') +
      `\n\nTip: Write these down before the appointment so you don't forget anything.`
    );
  }

  // Normal / behavior
  if (q.includes('normal') || q.includes('behav')) {
    const lastCheckup = checkups[0];
    return (
      `${name} is a ${pet.age}-year-old ${pet.breed}` +
      (lastCheckup
        ? `, with a recent checkup showing appetite ${lastCheckup.appetite}/5 and energy ${lastCheckup.energyLevel}/5`
        : '') +
      `. Many behaviors are perfectly normal — brief changes in appetite, short lethargy after activity, or increased sleep. If a change persists beyond 48–72 hours, or feels "off," a vet visit is the right call. What specific behavior are you concerned about?`
    );
  }

  // Prevention
  if (q.includes('prevent')) {
    const speciesTips =
      pet.species === 'dog'
        ? 'Regular deworming, monthly flea/tick prevention, and annual heartworm testing are key for dogs.'
        : 'For cats, regular deworming, flea prevention, and a clean indoor environment are essential.';
    return (
      `Prevention tips for ${name}:\n\n` +
      `• Keep vaccines current${vaccines.length > 0 ? ` (next: ${vaccines[0].nextDue})` : ''}\n` +
      `• Monthly flea and tick protection\n` +
      `• Annual dental cleaning\n` +
      `• Weight monitoring — ${name} is currently ${pet.weight} kg\n` +
      `• ${speciesTips}` +
      (pet.allergies && pet.allergies.length > 0
        ? `\n• Avoid known allergens: ${pet.allergies.join(', ')}`
        : '')
    );
  }

  // Symptoms / signs
  if (q.includes('symptom') || q.includes('sign') || q.includes('problem')) {
    return (
      `When evaluating symptoms for ${name}, look for: duration (over 48 hours is a flag), severity (mild vs. affecting daily activity), and patterns (always after meals? only outdoors?).\n\n` +
      (pet.knownDiseases
        ? `Given ${his} history of ${pet.knownDiseases}, be especially alert to related symptoms. `
        : '') +
      `Can you describe what you're observing? I can give you more specific guidance.`
    );
  }

  // Default
  return (
    `That's a great question about ${name}. As a ${pet.age}-year-old ${pet.breed}, ${he.toLowerCase()} has a specific health profile I can help you interpret.\n\n` +
    (pet.knownDiseases
      ? `Given ${his} history of ${pet.knownDiseases}, I'd pay close attention to related symptoms. `
      : '') +
    `I recommend observing any changes over 48–72 hours. Would you like to explore ${name}'s symptoms, nutrition, vaccines, or prepare for an upcoming vet visit?`
  );
}

function PetSelector({ pets, onSelect }: { pets: Pet[]; onSelect: (petId: string) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6">
      <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center">
        <Bot size={32} className="text-sky-500" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-slate-800">AI Pet Assistant</h2>
        <p className="text-sm text-slate-500 mt-1">Which pet do you want to talk about?</p>
      </div>
      <div className="w-full space-y-3">
        {pets.map((pet) => {
          const SpeciesIcon = pet.species === 'dog' ? Dog : Cat;
          return (
            <button
              key={pet.id}
              onClick={() => onSelect(pet.id)}
              className="w-full bg-white rounded-2xl shadow-card p-4 flex items-center gap-3 hover:shadow-card-md active:scale-[0.99] transition-all"
            >
              <img src={pet.photo} alt={pet.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-slate-800">{pet.name}</p>
                <p className="text-xs text-slate-500">
                  {pet.breed} · {pet.age}y · {pet.weight}kg
                </p>
              </div>
              <SpeciesIcon size={16} className="text-slate-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AIAssistantPage() {
  const {
    pets,
    getPet,
    getPetNutrition,
    getPetVaccines,
    getPetTherapies,
    getPetDiagnostics,
    getPetCheckups,
    assistantInitPetId,
    clearAssistantInitPet,
  } = useApp();

  const [chatPetCtx, setChatPetCtx] = useState<PetCtx | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  function buildPetCtx(petId: string): PetCtx | null {
    const pet = getPet(petId);
    if (!pet) return null;
    return {
      pet,
      nutrition: getPetNutrition(petId),
      vaccines: getPetVaccines(petId),
      therapies: getPetTherapies(petId),
      diagnostics: getPetDiagnostics(petId),
      checkups: getPetCheckups(petId),
      pronoun: pet.gender === 'female' ? 'her' : 'his',
    };
  }

  function selectPet(petId: string) {
    const ctx = buildPetCtx(petId);
    if (!ctx) return;
    setChatPetCtx(ctx);
    setMessages([{ id: '0', role: 'assistant', text: getPersonalizedGreeting(ctx) }]);
    setInput('');
  }

  // Auto-initialize when navigated here from a pet dashboard
  useEffect(() => {
    if (assistantInitPetId) {
      selectPet(assistantInitPetId);
      clearAssistantInitPet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistantInitPetId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim() || !chatPetCtx) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getMockResponse(text, chatPetCtx);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', text: reply },
      ]);
      setTyping(false);
    }, 1200);
  }

  if (!chatPetCtx) {
    return (
      <div className="flex flex-col min-h-full bg-slate-50">
        <TopBar title="AI Assistant" />
        <PetSelector pets={pets} onSelect={selectPet} />
      </div>
    );
  }

  const { pet } = chatPetCtx;
  const quickQuestions = getContextualQuestions(chatPetCtx);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar
        title="AI Assistant"
        subtitle={pet.name}
        rightSlot={
          <button
            onClick={() => {
              setChatPetCtx(null);
              setMessages([]);
            }}
            className="text-xs text-sky-500 font-medium py-1 px-2 rounded-lg hover:bg-sky-50"
          >
            Change
          </button>
        }
      />

      {/* Pet context chip */}
      <div className="px-4 py-2 bg-white border-b border-slate-100">
        <div className="flex items-center gap-2">
          <img src={pet.photo} alt={pet.name} className="w-6 h-6 rounded-full object-cover" />
          <span className="text-xs font-medium text-slate-600">
            Chatting about <strong>{pet.name}</strong>
          </span>
          <span className="text-xs text-slate-400">
            · {pet.breed} · {pet.age}y · {pet.weight}kg
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-36">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <Bot size={15} className="text-sky-500" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-sky-500 text-white rounded-tr-sm'
                  : 'bg-white text-slate-800 shadow-card rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
              <Bot size={15} className="text-sky-500" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-card flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick questions + input */}
      <div className="fixed bottom-[72px] left-0 right-0 max-w-md mx-auto bg-gradient-to-t from-slate-50 pt-4 pb-2 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-600 hover:border-sky-300 hover:text-sky-600 transition-colors shadow-card"
            >
              {q}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-slate-200 shadow-card px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder={`Ask about ${pet.name}...`}
            className="flex-1 text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
          >
            <Send size={14} className="text-white" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
