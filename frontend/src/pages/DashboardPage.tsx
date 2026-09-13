import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Map, AlertTriangle, TrendingDown, ArrowRight, Clock, Navigation, CheckCircle2 } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const userJson = localStorage.getItem('saferoute_user');
  const user = userJson ? JSON.parse(userJson) : { full_name: "Driver" };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyber-cyan font-bold">
            Road Safety Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Good evening, {user.full_name?.split(' ')[0]}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Zero active incidents along your registered daily corridors.
          </p>
        </div>

        <button
          onClick={() => navigate('/plan-route?demo=true')}
          className="px-5 py-3 rounded-xl bg-cyber-cyan hover:bg-cyan-300 text-dark-900 font-bold text-xs shadow-glow-cyan transition-all flex items-center gap-2 self-start sm:self-center"
        >
          <Navigation className="w-4 h-4" /> Plan a New Safe Route
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Preventable Crashes Avoided</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-white">482</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <TrendingDown className="w-3.5 h-3.5" /> +18% safer than baseline
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>High-Risk Blackspots Mapped</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-white">1,240</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Across Maharashtra & NH corridors
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Safer Routes Chosen</span>
            <CheckCircle2 className="w-4 h-4 text-cyber-cyan" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-white">74.2%</div>
          <div className="text-[11px] text-cyber-cyan mt-1">
            Drivers prioritize safety over speed
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Average Corridor Risk</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">38.4</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Low to moderate hazard tier
          </div>
        </div>
      </div>

      {/* Quick Route Search Banner */}
      <div className="glass-panel-glow p-6 rounded-2xl border border-cyber-cyan/30">
        <h2 className="text-lg font-bold text-white mb-2">
          Where are you driving tonight?
        </h2>
        <p className="text-xs text-slate-300 mb-4">
          Pre-calculate hydroplaning potential, blackspot density, and night freight risks.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            defaultValue="Nagpur, Maharashtra"
            placeholder="From"
            className="w-full sm:w-1/3 px-4 py-2.5 bg-dark-900/90 border border-slate-700 rounded-xl text-xs text-white"
          />
          <span className="text-slate-500">➔</span>
          <input
            type="text"
            defaultValue="Pune, Maharashtra"
            placeholder="To"
            className="w-full sm:w-1/3 px-4 py-2.5 bg-dark-900/90 border border-slate-700 rounded-xl text-xs text-white"
          />
          <button
            onClick={() => navigate('/plan-route?demo=true')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyber-cyan hover:bg-cyan-300 text-dark-900 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-glow-cyan"
          >
            Analyze Corridor Risk
          </button>
        </div>
      </div>

      {/* Recent Trips & Live Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyber-cyan" /> Recent Evaluated Journeys
          </h3>
          <div className="space-y-3">
            <div
              onClick={() => navigate('/plan-route?demo=true')}
              className="p-3.5 rounded-xl bg-dark-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex items-center justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-white">Nagpur ➔ Pune</div>
                <div className="text-xs text-slate-400 mt-0.5">720 km • Fast route risk: 74 • Safer route risk: 34</div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Safer Route Taken
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">Mumbai ➔ Pune Expressway</div>
                <div className="text-xs text-slate-400 mt-0.5">148 km • Route risk: 42 • Heavy fog in Bhor Ghat</div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Moderate Risk
              </span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" /> Active Regional Warnings
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/40 text-xs">
              <div className="font-bold text-red-400">Karanja Lad NH-53 Junction</div>
              <div className="text-slate-300 mt-1">
                Heavy waterlogging + intense commercial freight traffic reported. Maintain under 50 km/h.
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs">
              <div className="font-bold text-cyber-cyan">Sindkhed Raja Ghat Section</div>
              <div className="text-slate-300 mt-1">
                Dense mist reducing forward line-of-sight below 2.0 km. Low beams recommended.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
