import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { BarChart3, TrendingDown, Shield, AlertTriangle, CloudRain, MapPin } from 'lucide-react';
import { ApiService } from '../services/api';

const PIE_COLORS = ['#3B82F6', '#00F0FF', '#EF4444', '#F59E0B'];

export const SafetyInsightsPage: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    ApiService.getInsightsSummary().then((res) => setData(res));
  }, []);

  if (!data) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-cyber-cyan text-sm">
        Loading Safety Intelligence...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <span className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-widest">
          Macro Safety Intelligence
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Predictive Risk & Accident Mitigation Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Aggregated trend modeling across registered highway corridors & blackspot database.
        </p>
      </div>

      {/* Top 3 KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400 mb-1">Total Highway Trips Evaluated</div>
          <div className="text-3xl font-extrabold font-mono text-white">
            {data.total_journeys_analyzed.toLocaleString()}
          </div>
          <div className="text-[11px] text-cyber-cyan mt-1">Real-time telemetry & OSRM queries</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400 mb-1">Estimated Crashes Averted</div>
          <div className="text-3xl font-extrabold font-mono text-emerald-400">
            {data.preventable_crashes_avoided_est}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">Via proactive safer alternative routes</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400 mb-1">Safer Alternative Route Adoption</div>
          <div className="text-3xl font-extrabold font-mono text-cyber-cyan">
            {data.safer_routes_accepted_pct}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">High user compliance to AI warnings</div>
        </div>
      </div>

      {/* Recharts Data Visualization Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Risk & Prevention Trends */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyber-cyan" /> Monthly Averted Crashes Trend
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthly_trend}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d111a',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="avoided_incidents" fill="#10B981" radius={[4, 4, 0, 0]} name="Averted Crashes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-center">
            Correlation of safer routing recommendations to collision reductions.
          </p>
        </div>

        {/* Hazard Contributing Factors Pie Chart */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-cyber-blue" /> Primary Hazard Contributing Factors
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.weather_impact_distribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="share"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                  fontSize={10}
                >
                  {data.weather_impact_distribution.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d111a',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 text-center">
            Distribution of environmental and structural triggers across historical accident reports.
          </p>
        </div>
      </div>
    </div>
  );
};
