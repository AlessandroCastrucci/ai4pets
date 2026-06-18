import { useState } from 'react';
import { Camera } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function EditProfilePage() {
  const { user, updateUser } = useAuth();
  const { navigateBack } = useApp();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [error, setError] = useState('');

  const initials = name
    ? name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  function handleSave() {
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    updateUser(name.trim(), email.trim());
    navigateBack();
  }

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <TopBar title="Edit Profile" showBack />

      <main className="flex-1 px-4 pb-10">

        {/* Avatar placeholder */}
        <div className="flex flex-col items-center pt-8 pb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl leading-none">{initials}</span>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center">
              <Camera size={14} className="text-slate-500" strokeWidth={2} />
            </div>
          </div>
          <button className="mt-2 text-xs font-medium text-sky-500 hover:text-sky-600 transition-colors">
            Change Photo
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 px-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="Your full name"
              className="w-full bg-white rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition shadow-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 px-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="your@email.com"
              className="w-full bg-white rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition shadow-sm"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 px-1">{error}</p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={handleSave}
            className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-semibold text-sm rounded-xl py-3.5 transition-colors shadow-sm"
          >
            Save Changes
          </button>
          <button
            onClick={navigateBack}
            className="w-full bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-600 font-semibold text-sm rounded-xl py-3.5 border border-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>

      </main>
    </div>
  );
}
