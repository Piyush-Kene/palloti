import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Truck,
  Shield,
  Search,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ApiService } from '../services/api';
import { RouteAnalysisResponse, RouteOption, HotspotAlert } from '../types';
import { RiskGauge } from '../components/RiskGauge';
import { RiskMap } from '../components/RiskMap';
import { RouteComparison } from '../components/RouteComparison';
import { RouteSegments } from '../components/RouteSegments';
import { WeatherCard } from '../components/WeatherCard';
import { DEMO_NAGPUR_PUNE_DATA } from '../utils/demoData';

const LOADING_STEPS = [
  "Querying road infrastructure geometry...",
  "Cross-referencing historical collision blackspots...",
  "Analyzing Open-Meteo precipitation & surface friction...",
  "Executing Scikit-Learn Random Forest risk engine...",
  "Synthesizing Safer Alternative Expressway bypass..."
];

export const PlanRoutePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [origin, setOrigin] = useState(searchParams.get('from') || 'Nagpur');
  const [destination, setDestination] = useState(searchParams.get('to') || 'Pune');
  const [departureTime, setDepartureTime] = useState('2026-09-13T20:00');
  const [vehicleType, setVehicleType] = useState('car');
  const [isDemoMode, setIsDemoMode] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<RouteAnalysisResponse | null>(DEMO_NAGPUR_PUNE_DATA);
  const [activeRouteId, setActiveRouteId] = useState<string>(DEMO_NAGPUR_PUNE_DATA.primary_route.route_id);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotAlert | null>(null);

  // Auto run demo analysis if directed with ?demo=true
  useEffect(() => {
    if (searchParams.get('demo') === 'true') {
      triggerAnalysis();
    }
  }, [searchParams]);

  const triggerAnalysis = async () => {
    setLoading(true);
    setLoadingStepIndex(0);

    // Cinematic step-by-step progress simulation
    const interval = setInterval(() => {
      setLoadingStepIndex((prev) => {
        if (prev < LOADING_STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 600);

    try {
      const data = await ApiService.analyzeRoute({
        origin,
        destination,
        departure_time: departureTime,
        vehicle_type: vehicleType,
        force_demo: isDemoMode
      });

      setTimeout(() => {
        clearInterval(interval);
        setAnalysisResult(data);
        setActiveRouteId(data.primary_route.route_id);
        setLoading(false);
      }, 3000);
    } catch (err) {
      clearInterval(interval);
      setAnalysisResult(DEMO_NAGPUR_PUNE_DATA);
      setLoading(false);
    }
  };

  const activeRoute: RouteOption =
    analysisResult?.safer_alternative_route?.route_id === activeRouteId
      ? analysisResult.safer_alternative_route
      : analysisResult?.primary_route || DEMO_NAGPUR_PUNE_DATA.primary_route;

  const secondaryRoute: RouteOption | undefined =
    analysisResult?.safer_alternative_route?.route_id === activeRouteId
      ? analysisResult?.primary_route
      : analysisResult?.safer_alternative_route;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner with Demo Mode status */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 glass-panel rounded-2xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyber-cyan/15 text-cyber-cyan">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white">Intelligent Road-Risk Engine</h1>
            <p className="text-xs text-slate-400">
              Evaluates blackspots, rain, visibility & road type for safer travel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setOrigin('Nagpur');
              setDestination('Pune');
              setIsDemoMode(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-dark-800 hover:bg-slate-700/60 border border-slate-700 text-xs font-mono text-cyber-cyan flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" /> Demo Quick-fill (Nagpur ➔ Pune)
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-900 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-mono">
              {isDemoMode ? 'Demo Mode (Offline Safe)' : 'Live API Active'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Route Inputs & Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Search className="w-4 h-4 text-cyber-cyan" /> Journey Parameters
            </h2>

            {/* Origin & Destination Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  From (Origin)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="Enter starting city or junction"
                    className="w-full pl-9 pr-3 py-2.5 bg-dark-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
                  />
                  <MapPin className="w-4 h-4 text-cyber-cyan absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  To (Destination)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination location"
                    className="w-full pl-9 pr-3 py-2.5 bg-dark-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                  <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* Travel Time & Vehicle Select */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Departure Time
                </label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full px-3 py-2 bg-dark-900/90 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-900/90 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyber-cyan"
                >
                  <option value="car">Car / Sedan / SUV</option>
                  <option value="two_wheeler">Motorcycle / Scooter</option>
                  <option value="commercial_truck">Heavy Freight Truck</option>
                </select>
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={triggerAnalysis}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-blue text-dark-900 font-extrabold text-xs uppercase tracking-wider shadow-glow-cyan hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span>Executing AI Risk Engine...</span>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Analyze Route Safety</span>
                </>
              )}
            </button>
          </div>

          {/* Risk Gauge & Sub-Score Card */}
          {analysisResult && (
            <div className="glass-panel rounded-2xl p-5 border border-white/10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-4 border-b border-slate-800">
                <RiskGauge
                  score={activeRoute.risk_score}
                  level={activeRoute.risk_level}
                  color={activeRoute.risk_color}
                  size={160}
                />

                <div className="w-full sm:w-1/2 space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Accident Frequency</span>
                      <span className="font-mono font-bold text-white">
                        {activeRoute.sub_scores.accident_risk}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${activeRoute.sub_scores.accident_risk}%`,
                          backgroundColor: activeRoute.sub_scores.accident_risk > 60 ? '#EF4444' : '#10B981'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Weather Impact</span>
                      <span className="font-mono font-bold text-white">
                        {activeRoute.sub_scores.weather_risk}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${activeRoute.sub_scores.weather_risk}%`,
                          backgroundColor: activeRoute.sub_scores.weather_risk > 60 ? '#EF4444' : '#10B981'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Road Infrastructure</span>
                      <span className="font-mono font-bold text-white">
                        {activeRoute.sub_scores.road_risk}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${activeRoute.sub_scores.road_risk}%`,
                          backgroundColor: '#3B82F6'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Traffic & Night Density</span>
                      <span className="font-mono font-bold text-white">
                        {activeRoute.sub_scores.traffic_risk}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${activeRoute.sub_scores.traffic_risk}%`,
                          backgroundColor: '#F59E0B'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Explainable AI Factors */}
              <div className="mt-4 pt-2">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Key Risk Drivers
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeRoute.primary_factors.map((factor, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Route Comparison Card */}
          {analysisResult && (
            <RouteComparison
              primaryRoute={analysisResult.primary_route}
              saferRoute={analysisResult.safer_alternative_route}
              activeRouteId={activeRouteId}
              onSelectRoute={(id) => setActiveRouteId(id)}
            />
          )}
        </div>

        {/* Right Column: Interactive Map & Segment/Weather Intelligence (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loading Overlay */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel-glow rounded-2xl p-8 text-center space-y-4 border border-cyber-cyan/40"
              >
                <div className="w-16 h-16 rounded-full border-4 border-cyber-cyan border-t-transparent animate-spin mx-auto shadow-glow-cyan" />
                <h3 className="text-lg font-bold text-white">
                  Synthesizing Road Risk Intelligence
                </h3>
                <p className="text-xs font-mono text-cyber-cyan">
                  {LOADING_STEPS[loadingStepIndex]}
                </p>
                <div className="w-48 h-1 bg-dark-800 rounded-full mx-auto overflow-hidden">
                  <div
                    className="h-full bg-cyber-cyan transition-all duration-300"
                    style={{ width: `${((loadingStepIndex + 1) / LOADING_STEPS.length) * 100}%` }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Centerpiece Leaflet Map */}
          {analysisResult && (
            <div className="h-[460px]">
              <RiskMap
                activeRoute={activeRoute}
                secondaryRoute={secondaryRoute}
                onSelectHotspot={(hs) => setSelectedHotspot(hs)}
              />
            </div>
          )}

          {/* Weather Intel */}
          {analysisResult && (
            <WeatherCard weather={analysisResult.weather_summary} />
          )}

          {/* Segment Hazards Accordion */}
          {analysisResult && (
            <RouteSegments segments={activeRoute.segments} />
          )}
        </div>
      </div>
    </div>
  );
};
