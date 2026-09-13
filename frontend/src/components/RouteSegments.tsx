import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, AlertCircle, Droplets, Eye, ShieldAlert, Navigation } from 'lucide-react';
import { SegmentRisk } from '../types';

interface RouteSegmentsProps {
  segments: SegmentRisk[];
  onSelectSegment?: (segment: SegmentRisk) => void;
}

export const RouteSegments: React.FC<RouteSegmentsProps> = ({
  segments,
  onSelectSegment
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-cyber-cyan" />
          <h3 className="font-bold text-white text-base">Journey Risk by Segment</h3>
        </div>
        <span className="text-xs text-slate-400">
          5 Analyzed Sectors
        </span>
      </div>

      <div className="space-y-3">
        {segments.map((seg) => {
          const isExpanded = expandedId === seg.segment_id;
          return (
            <div
              key={seg.segment_id}
              className={`rounded-xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-dark-800 border-slate-700'
                  : 'bg-dark-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Header Row */}
              <div
                onClick={() => {
                  toggleExpand(seg.segment_id);
                  if (onSelectSegment) onSelectSegment(seg);
                }}
                className="p-3.5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: seg.risk_color }}
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-tight">
                      {seg.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>{seg.distance_km} km</span>
                      <span>•</span>
                      <span>{seg.duration_min} mins</span>
                      <span>•</span>
                      <span className="font-medium" style={{ color: seg.risk_color }}>
                        {seg.risk_level} Risk ({seg.risk_score})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Collapsible Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 pt-1 border-t border-slate-800/80 text-xs"
                  >
                    <div className="grid grid-cols-3 gap-2 my-2 py-2 bg-dark-900/80 rounded-lg p-2.5 border border-slate-800">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Droplets className="w-3.5 h-3.5 text-cyber-blue" />
                        <div>
                          <div className="text-[10px] text-slate-500">Rainfall</div>
                          <div className="font-semibold">{seg.rainfall_mm} mm</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Eye className="w-3.5 h-3.5 text-cyber-cyan" />
                        <div>
                          <div className="text-[10px] text-slate-500">Visibility</div>
                          <div className="font-semibold">{seg.visibility_km} km</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-300">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                        <div>
                          <div className="text-[10px] text-slate-500">Recorded Collisions</div>
                          <div className="font-semibold">{seg.accident_count}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1.5">
                      <div className="text-slate-300">
                        <span className="text-slate-400 font-medium">Primary Factor: </span>
                        {seg.primary_risk_factor}
                      </div>
                      <div className="text-emerald-400 font-medium flex items-start gap-1">
                        <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        <span>Driver Advisory: {seg.advice}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
