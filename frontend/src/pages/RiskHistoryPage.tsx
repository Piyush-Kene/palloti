import React from 'react';
import { useNavigate } from 'react-router-dom';
import { History, ArrowRight, Shield, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const RiskHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  const historyItems = [
    {
      id: 1,
      origin: "Nagpur, Maharashtra",
      destination: "Pune, Maharashtra",
      date: "Today, 19:45",
      distance: "720 km",
      fastRisk: 74,
      saferRisk: 34,
      status: "Safer Route Chosen"
    },
    {
      id: 2,
      origin: "Mumbai, Maharashtra",
      destination: "Pune, Maharashtra",
      date: "Yesterday, 14:10",
      distance: "148 km",
      fastRisk: 42,
      saferRisk: 38,
      status: "Direct Route Completed"
    },
    {
      id: 3,
      origin: "Nagpur, Maharashtra",
      destination: "Amravati, Maharashtra",
      date: "11 Sep 2026, 21:30",
      distance: "155 km",
      fastRisk: 58,
      saferRisk: 31,
      status: "Safer Bypass Taken"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-widest">
            Telemetry Archive
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">Journey Risk History</h1>
          <p className="text-xs text-slate-400 mt-1">
            Revisit past evaluated journeys and re-run safety analysis.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {historyItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate('/plan-route?demo=true')}
            className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyber-cyan/40 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="text-base font-bold text-white flex items-center gap-2">
                {item.origin} <ArrowRight className="w-4 h-4 text-cyber-cyan" /> {item.destination}
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.date}</span>
                <span>•</span>
                <span>{item.distance}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-400">Predicted Hazards</div>
                <div className="text-xs font-mono font-bold">
                  <span className="text-red-400">Risk {item.fastRisk}</span>
                  <span className="text-slate-500 mx-1.5">➔</span>
                  <span className="text-emerald-400">Risk {item.saferRisk}</span>
                </div>
              </div>

              <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5" /> {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
