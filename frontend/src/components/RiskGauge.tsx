import React from 'react';
import { motion } from 'framer-motion';

interface RiskGaugeProps {
  score: number;
  level: string;
  color?: string;
  size?: number;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score,
  level,
  color = '#EF4444',
  size = 190
}) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  // Calculate dash offset based on score (0 to 100)
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1E2638"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Risk Arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0px 0px 8px ${color})`
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-extrabold tracking-tight font-mono"
            style={{ color }}
          >
            {score}
          </motion.div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
            {level} RISK
          </span>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 mt-2 tracking-wide uppercase font-medium">
        Predicted Route Risk
      </p>
    </div>
  );
};
