import React, { useState } from 'react';
import { User, Mail, Shield, Car, Settings, CheckCircle2 } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const userJson = localStorage.getItem('saferoute_user');
  const initialUser = userJson ? JSON.parse(userJson) : {
    full_name: "Aryan Sharma",
    email: "judge@saferoute.ai",
    created_at: new Date().toISOString()
  };

  const [fullName, setFullName] = useState(initialUser.full_name);
  const [vehicle, setVehicle] = useState('car');
  const [avoidNightTravel, setAvoidNightTravel] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...initialUser, full_name: fullName };
    localStorage.setItem('saferoute_user', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Driver Profile & Preferences</h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize risk weighting, vehicle profile, and defensive routing preferences.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyber-blue to-cyber-cyan text-dark-900 font-extrabold text-2xl flex items-center justify-center shadow-glow-cyan">
            {fullName.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{fullName}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Mail className="w-3.5 h-3.5" /> {initialUser.email}
            </p>
            <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 font-mono">
              Role: Evaluation Judge / Senior Tester
            </span>
          </div>
        </div>

        {saved && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Preferences updated successfully.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Primary Vehicle Class
            </label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-dark-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-cyan"
            >
              <option value="car">Personal Passenger Car (Sedan / SUV)</option>
              <option value="two_wheeler">Two-Wheeler / Motorbike (Higher rain vulnerability)</option>
              <option value="commercial">Heavy Commercial Multi-Axle</option>
            </select>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={avoidNightTravel}
                onChange={(e) => setAvoidNightTravel(e.target.checked)}
                className="w-4 h-4 rounded text-cyber-cyan bg-dark-900 border-slate-700 focus:ring-0"
              />
              <span className="text-xs text-slate-300">
                Prioritize routes with full LED highway illumination during night hours (20:00 - 05:00)
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyber-cyan hover:bg-cyan-300 text-dark-900 font-bold text-xs shadow-glow-cyan transition-all mt-4"
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
};
