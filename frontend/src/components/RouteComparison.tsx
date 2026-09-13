import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Zap, CheckCircle2, TrendingDown } from 'lucide-react';
import { RouteOption } from '../types';

interface RouteComparisonProps {
  primaryRoute: RouteOption;
  saferRoute?: RouteOption;
  activeRouteId: string;
  onSelectRoute: (routeId: string) => void;
}

export const RouteComparison: React.FC<RouteComparisonProps> = ({
  primaryRoute,
  saferRoute,
  activeRouteId,
  onSelectRoute
}) => {
  if (!saferRoute) return null;

  const isSaferActive = activeRouteId === saferRoute.route_id;
  const riskDelta = primaryRoute.risk_score - saferRoute.risk_score;
  const distDelta = (saferRoute.distance_km - primaryRoute.distance_km).toFixed(1);
  const timeDelta = Math.round(saferRoute.duration_min - primaryRoute.duration_min);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white text-base">Route Safety Comparison</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-1">
          <TrendingDown className="w-3.5 h-3.5" /> -{riskDelta} Risk Points
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Primary Highway Route Card */}
        <div
          onClick={() => onSelectRoute(primaryRoute.route_id)}
          className={`p-4 rounded-xl cursor-pointer transition-all border ${
            !isSaferActive
              ? 'bg-red-500/10 border-red-500/50 shadow-glow-red'
              : 'bg-dark-800/60 border-slate-800 hover:border-slate-700 opacity-70'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Current Fastest Route
            </span>
            <span className="text-xs font-bold text-red-400 px-2 py-0.5 rounded bg-red-950/60 border border-red-800/40">
              Risk: {primaryRoute.risk_score}/100
            </span>
          </div>

          <div className="flex items-baseline gap-3 my-2 font-mono">
            <div className="text-xl font-extrabold text-white">
              {Math.floor(primaryRoute.duration_min / 60)}h {Math.round(primaryRoute.duration_min % 60)}m
            </div>
            <div className="text-sm text-slate-400">{primaryRoute.distance_km} km</div>
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 mt-2">
            {primaryRoute.primary_factors[0]}
          </p>

          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800">
            <span className="text-red-400 font-medium">3 High-risk Hotspots</span>
            {!isSaferActive && (
              <span className="flex items-center gap-1 text-slate-300 font-semibold">
                Active <CheckCircle2 className="w-4 h-4 text-red-400" />
              </span>
            )}
          </div>
        </div>

        {/* Safer Alternative Route Card */}
        <div
          onClick={() => onSelectRoute(saferRoute.route_id)}
          className={`p-4 rounded-xl cursor-pointer transition-all border relative ${
            isSaferActive
              ? 'bg-emerald-500/10 border-emerald-500/60 shadow-glow-emerald'
              : 'bg-dark-800/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> AI Recommended Safer Route
            </span>
            <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
              Risk: {saferRoute.risk_score}/100
            </span>
          </div>

          <div className="flex items-baseline gap-3 my-2 font-mono">
            <div className="text-xl font-extrabold text-white">
              {Math.floor(saferRoute.duration_min / 60)}h {Math.round(saferRoute.duration_min % 60)}m
            </div>
            <div className="text-sm text-slate-400">{saferRoute.distance_km} km</div>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 mt-2">
            Bypasses hazardous collision blackspots via grade-separated divided expressways.
          </p>

          <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800">
            <span className="text-emerald-400 font-medium">
              +{distDelta} km ({timeDelta > 0 ? `+${timeDelta}m` : 'equal'})
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectRoute(saferRoute.route_id);
              }}
              className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-dark-900 font-bold rounded-lg transition-all flex items-center gap-1 text-xs"
            >
              {isSaferActive ? 'Route Selected' : 'Take Safer Route'} <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-dark-900/60 rounded-xl border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
        <span className="text-cyber-cyan font-bold">Why this matters:</span>
        <span>
          Traditional navigation prioritizes raw arrival minutes. SafeRoute AI evaluates weather, crash history, and infrastructure safety, giving you the choice to trade 20 minutes for a 50% safer drive.
        </span>
      </div>
    </div>
  );
};
