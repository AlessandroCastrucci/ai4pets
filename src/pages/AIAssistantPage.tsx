import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Dog, Cat } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useApp } from '../context/AppContext';
import type { Pet } from '../types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const QUICK_QUESTIONS = [
  'Is this normal?',
  'What should I feed?',
  'How often to bathe?',
  'Vaccine schedule?',
];

const MOCK_RESPONSES: Record<string, string> = {
  default:
    "That's a great question! Based on what you've described, I recommend observing your pet for the next 24–48 hours. If symptoms persist or worsen, please consult a veterinarian. Keep fresh water available and avoid strenuous activity in the meantime.",
  vaccine:
    'Vaccine schedules vary by species and lifestyle. For dogs, core vaccines include Rabies, DHPP, and Bordetella. Cats need FVRCP and Rabies. Most boosters are annual or every 3 years. Your vet can tailor a schedule to your pet.',
  food:
    "Nutrition depends on your pet's age, weight, and health status. Look for a food with high-quality protein as the first ingredient, appropriate life-stage formulation, and no unnecessary fillers. Always transition foods gradually over 7–10 days.",
  bathe:
    "Most dogs need a bath every 4–6 weeks, though this varies by coat type. Cats are generally self-grooming and rarely need baths. Use species-appropriate shampoo and make sure to rinse thoroughly to avoid skin irritation.",
  normal:
    "It depends on the context! Many behaviors that seem unusual are normal for pets. If you notice sudden changes in appetite, energy, bathroom habits, or behavior that last more than 48 hours, it's worth a veterinary check.",
};

function getMockResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('vaccine') || q.includes('shot')) return MOCK_RESPONSES.vaccine;
  if (q.includes('food') || q.includes('feed') || q.includes('eat') || q.includes('diet')) return MOCK_RESPONSES.food;
  if (q.includes('bath') || q.includes('wash') || q.includes('groom')) return MOCK_RESPONSES.bathe;
  if (q.includes('normal')) return MOCK_RESPONSES.normal;
  return MOCK_RESPONSES.default;
}

function PetSelector({ pets, onSelect }: { pets: Pet[]; onSelect: (petId: string) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-6">
      <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center">
        <Bot size={32} className="text-sky-500" />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold text-slate-800">AI Pet Assistant</h2>
        <p className="text-sm text-slate-500 mt-1">Select a pet to start a health conversation</p>
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
                <p className="text-xs text-slate-500">{pet.breed} · {pet.age}y · {pet.weight}kg</p>
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
  const { pets, getPet } = useApp();
  const [chatPetId, setChatPetId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const chatPet = chatPetId ? getPet(chatPetId) : null;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function selectPet(petId: string) {
    const pet = getPet(petId);
    if (!pet) return;
    setChatPetId(petId);
    setMessages([
      {
        id: '0',
        role: 'assistant',
        text: `Hello! I'm your AI pet health assistant. I'm here to help you with questions about ${pet.name}'s health, nutrition, and wellbeing. What would you like to know?`,
      },
    ]);
  }

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getMockResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', text: reply },
      ]);
      setTyping(false);
    }, 1200);
  }

  if (!chatPetId) {
    return (
      <div className="flex flex-col min-h-full bg-slate-50">
        <TopBar title="AI Assistant" />
        <PetSelector pets={pets} onSelect={selectPet} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar
        title="AI Assistant"
        subtitle={chatPet?.name}
        rightSlot={
          <button
            onClick={() => { setChatPetId(null); setMessages([]); }}
            className="text-xs text-sky-500 font-medium py-1 px-2 rounded-lg hover:bg-sky-50"
          >
            Change
          </button>
        }
      />

      {/* Pet context chip */}
      {chatPet && (
        <div className="px-4 py-2 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2">
            <img src={chatPet.photo} alt={chatPet.name} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-xs font-medium text-slate-600">Chatting about <strong>{chatPet.name}</strong></span>
            <span className="text-xs text-slate-400">· {chatPet.breed}</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-32">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                <Bot size={15} className="text-sky-500" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
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

      {/* Quick questions */}
      <div className="fixed bottom-[72px] left-0 right-0 max-w-md mx-auto bg-gradient-to-t from-slate-50 pt-4 pb-2 px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {QUICK_QUESTIONS.map((q) => (
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
            placeholder={`Ask about ${chatPet?.name}...`}
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
