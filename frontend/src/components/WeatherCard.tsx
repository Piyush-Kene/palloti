import React from 'react';
import { CloudRain, Wind, Eye, Thermometer, ShieldAlert, Sparkles } from 'lucide-react';
import { WeatherSummary } from '../types';

interface WeatherCardProps {
  weather: WeatherSummary;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-cyber-blue" />
          <h3 className="font-bold text-white text-base">Corridor Meteorological Intel</h3>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/10 text-cyber-cyan border border-blue-500/20 font-mono">
          {weather.source}
        </span>
      </div>

      <div className="bg-dark-900/80 p-3.5 rounded-xl border border-slate-800 mb-4 flex items-center justify-between">
        <div>
          <div className="text-xl font-bold text-white flex items-center gap-2">
            {weather.condition}
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            Dynamic friction reduction & hydroplaning risk calculated along route
          </div>
        </div>
        <div className="text-2xl font-mono font-extrabold text-cyber-cyan">
          {weather.temperature_c}°C
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-dark-800/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <CloudRain className="w-3.5 h-3.5 text-cyber-blue" /> Precipitation
          </div>
          <div className="text-base font-bold font-mono text-white">
            {weather.precipitation_mm} mm
          </div>
          <div className="text-[10px] text-amber-400 mt-0.5">Elevated Skidding</div>
        </div>

        <div className="bg-dark-800/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Eye className="w-3.5 h-3.5 text-cyber-cyan" /> Visibility
          </div>
          <div className="text-base font-bold font-mono text-white">
            {weather.visibility_km} km
          </div>
          <div className="text-[10px] text-amber-400 mt-0.5">Mist/Fog Warning</div>
        </div>

        <div className="bg-dark-800/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Wind className="w-3.5 h-3.5 text-slate-300" /> Crosswind
          </div>
          <div className="text-base font-bold font-mono text-white">
            {weather.wind_speed_kmh} km/h
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Moderate Gusts</div>
        </div>

        <div className="bg-dark-800/60 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Thermometer className="w-3.5 h-3.5 text-emerald-400" /> Humidity
          </div>
          <div className="text-base font-bold font-mono text-white">
            {weather.humidity_pct}%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">High Vapor Saturation</div>
        </div>
      </div>
    </div>
  );
};
