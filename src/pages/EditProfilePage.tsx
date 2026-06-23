import { useState } from 'react';
import { Camera, Trash2 } from 'lucide-react';
import TopBar from '../components/TopBar';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function EditProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const { navigateBack } = useApp();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  function handleDeleteAccount() {
    logout();
    setShowDeleteModal(false);
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

        {/* Account Removal */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide px-1 mb-3">Account Removal</p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-1 py-2 text-red-500 hover:text-red-600 transition-colors"
          >
            <Trash2 size={14} strokeWidth={2} />
            <span className="text-sm font-medium">Delete Account</span>
          </button>
        </div>

      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-slate-900">Delete your account?</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              This will permanently remove your account and all associated pet health data.
            </p>
            <div className="mt-6 space-y-2.5">
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold text-sm rounded-xl py-3 transition-colors"
              >
                Delete Account
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-semibold text-sm rounded-xl py-3 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
