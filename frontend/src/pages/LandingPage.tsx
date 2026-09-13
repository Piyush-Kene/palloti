import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, AlertTriangle, CloudRain, CheckCircle, Compass, Cpu, Navigation, Sparkles } from 'lucide-react';
import { ApiService } from '../services/api';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleQuickDemo = async () => {
    await ApiService.demoLogin();
    navigate('/plan-route?demo=true');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 selection:bg-cyber-cyan/30">
      {/* Top Banner for Hackathon Evaluation */}
      <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-cyan-900/40 border-b border-white/10 px-4 py-2 text-center text-xs text-cyber-cyan font-mono flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Built for R1-03 — Preventable Road Accidents (Hackathon Prototype)</span>
        <button
          onClick={handleQuickDemo}
          className="ml-2 underline font-bold hover:text-white transition-colors"
        >
          [ 1-Click Judge Demo ]
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-cyber-cyan/30 text-cyber-cyan text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Shield className="w-3.5 h-3.5 text-cyber-cyan" />
            AI-Powered Road Safety Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            Know the Risk. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-cyan via-blue-400 to-indigo-400">
              Before You Reach It.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed"
          >
            Traditional navigation shows you <em>where to go</em>. SafeRoute AI analyzes accident blackspots, live rainfall, visibility bottlenecks, and night-travel hazards to recommend routes that actually keep you alive.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={handleQuickDemo}
              className="px-6 py-3.5 rounded-xl bg-cyber-cyan hover:bg-cyan-300 text-dark-900 font-extrabold text-sm flex items-center gap-2 shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
            >
              Check My Route <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#innovation"
              className="px-6 py-3.5 rounded-xl glass-panel hover:bg-slate-800/60 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              Explore Technology
            </a>
          </motion.div>
        </div>

        {/* Hero Interactive Visualization Simulation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 relative rounded-2xl p-6 glass-panel-glow border border-cyber-cyan/30 overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="w-full lg:w-1/3 space-y-3">
              <div className="text-xs font-bold text-cyber-cyan uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4" /> Journey Risk Flow Model
              </div>
              <h3 className="text-xl font-bold text-white">
                Nagpur ➔ Pune Transit Corridor
              </h3>
              <p className="text-xs text-slate-400">
                Live simulation highlighting high-density accident clusters & precipitation along NH-53.
              </p>

              {/* Step progression */}
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyber-cyan" />
                  <span>START: Nagpur City Outer Ring</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>🟢 Safe Zone (Wardha Stretch - Risk: 32)</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>🟡 Moderate Risk (Amravati Link - Risk: 58)</span>
                </div>
                <div className="flex items-center gap-2 text-red-400 font-bold animate-pulse">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span>🔴 High Risk (Karanja Lad Hotspot - Risk: 84)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>DESTINATION: Pune Metropolis</span>
                </div>
              </div>
            </div>

            {/* Floating Risk Cards Showcase */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-dark-900/80 border border-red-500/30 shadow-glow-red"
              >
                <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-1">
                  <AlertTriangle className="w-4 h-4" /> Accident Hotspot Ahead
                </div>
                <div className="text-sm font-semibold text-white">
                  Karanja Lad NH-53 Merge
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  38 Fatal Crashes recorded in 3-year window. Heavy multi-axle freight blindspots.
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-dark-900/80 border border-blue-500/30"
              >
                <div className="flex items-center gap-2 text-cyber-cyan text-xs font-bold mb-1">
                  <CloudRain className="w-4 h-4" /> Heavy Rain Detected
                </div>
                <div className="text-sm font-semibold text-white">
                  32.4 mm/hr Precipitation
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Surface visibility down to 2.4 km. Severe hydroplaning risk on asphalt.
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-dark-900/80 border border-emerald-500/30 shadow-glow-emerald"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
                  <CheckCircle className="w-4 h-4" /> Safer Route Available
                </div>
                <div className="text-sm font-semibold text-white">
                  Expressway Bypass Corridor
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Adds +24 km (+20 min) but reduces predicted crash probability by 54%.
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-dark-900/80 border border-purple-500/30"
              >
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-1">
                  <Cpu className="w-4 h-4" /> Scikit-learn Risk Engine
                </div>
                <div className="text-sm font-semibold text-white">
                  Explainable Decision Support
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Random Forest multi-variate modeling with zero black-box obscurity.
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Innovation Paradigm Section */}
      <section id="innovation" className="py-20 bg-dark-800/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-widest">
              The Architectural Shift
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              From Reactive Safety to Predictive Safety
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Old Reactive Model */}
            <div className="p-6 rounded-2xl bg-dark-900/80 border border-red-500/20">
              <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">
                Traditional Navigation
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-4">
                The Reactive Loop
              </h3>
              <div className="space-y-4 text-xs font-mono text-slate-400">
                <div className="p-3 bg-red-950/20 rounded-lg border border-red-900/40 text-red-300">
                  1. Speed-only Routing: "Take the fastest path regardless of hazard"
                </div>
                <div className="text-center text-slate-500">↓</div>
                <div className="p-3 bg-red-950/20 rounded-lg border border-red-900/40 text-red-300">
                  2. Severe Crash or Waterlogging Encountered
                </div>
                <div className="text-center text-slate-500">↓</div>
                <div className="p-3 bg-red-950/20 rounded-lg border border-red-900/40 text-red-300">
                  3. Emergency Response & Roadway Paralysis
                </div>
              </div>
            </div>

            {/* SafeRoute AI Predictive Model */}
            <div className="p-6 rounded-2xl bg-dark-900/80 border border-emerald-500/30 shadow-glow-emerald">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                SafeRoute AI Platform
              </span>
              <h3 className="text-xl font-bold text-white mt-1 mb-4">
                The Predictive Prevention Loop
              </h3>
              <div className="space-y-4 text-xs font-mono text-slate-300">
                <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-900/40 text-emerald-300">
                  1. Multi-signal Data Ingestion (Hotspots + Weather + Road Type)
                </div>
                <div className="text-center text-emerald-500">↓</div>
                <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-900/40 text-emerald-300">
                  2. AI Risk Prediction & Danger Zone Mapping
                </div>
                <div className="text-center text-emerald-500">↓</div>
                <div className="p-3 bg-emerald-950/20 rounded-lg border border-emerald-900/40 text-emerald-300">
                  3. Proactive Safer Route Recommendation (Zero Fatalities)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">
          How Our Risk Score Works
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
          SafeRoute AI combines open government accident statistics, Open-Meteo live weather radar, and scikit-learn random forest regression to compute an explainable 0–100 risk index. It is designed as a decision-support guide to help drivers assess hazards before departure.
        </p>
        <div className="mt-6">
          <button
            onClick={handleQuickDemo}
            className="px-8 py-3 bg-cyber-cyan hover:bg-cyan-300 text-dark-900 font-bold rounded-xl text-sm shadow-glow-cyan transition-all"
          >
            Launch Live Route Planner
          </button>
        </div>
      </section>
    </div>
  );
};
