import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RouteOption, HotspotAlert } from '../types';
import { AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';

// Custom pulsing danger icon
const createHotspotIcon = (severity: string) => {
  const isCritical = severity === 'CRITICAL';
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div class="relative flex items-center justify-center w-8 h-8">
        <div class="absolute w-8 h-8 rounded-full ${isCritical ? 'bg-red-500/40 animate-ping' : 'bg-amber-500/40 animate-ping'}"></div>
        <div class="relative flex items-center justify-center w-6 h-6 rounded-full ${isCritical ? 'bg-red-600' : 'bg-amber-500'} text-white shadow-lg border-2 border-dark-900 font-bold text-xs">
          !
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const createStartEndIcon = (isStart: boolean) => {
  return L.divIcon({
    className: 'custom-start-end-icon',
    html: `
      <div class="flex items-center justify-center w-7 h-7 rounded-full ${isStart ? 'bg-cyber-cyan' : 'bg-emerald-500'} text-dark-900 font-extrabold text-xs shadow-glow-cyan border-2 border-white">
        ${isStart ? 'A' : 'B'}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });
};

// Auto center map on route bounds
const MapBoundsAdjuster: React.FC<{ coords: [number, number][] }> = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }
  }, [coords, map]);
  return null;
};

interface RiskMapProps {
  activeRoute: RouteOption;
  secondaryRoute?: RouteOption;
  onSelectHotspot?: (hotspot: HotspotAlert) => void;
}

export const RiskMap: React.FC<RiskMapProps> = ({
  activeRoute,
  secondaryRoute,
  onSelectHotspot
}) => {
  const center: [number, number] = activeRoute.geometry[0] || [21.1458, 79.0882];
  const startCoord = activeRoute.geometry[0];
  const endCoord = activeRoute.geometry[activeRoute.geometry.length - 1];

  return (
    <div className="w-full h-full min-h-[480px] rounded-2xl overflow-hidden relative border border-slate-800 shadow-2xl">
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* Dark Mode Tile Layer from CartoDB */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a> &copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <MapBoundsAdjuster coords={activeRoute.geometry} />

        {/* Secondary inactive route polyline if available */}
        {secondaryRoute && (
          <Polyline
            positions={secondaryRoute.geometry}
            pathOptions={{
              color: '#4B5563',
              weight: 4,
              opacity: 0.6,
              dashArray: '8, 8'
            }}
          />
        )}

        {/* Active Route polyline with risk glow */}
        <Polyline
          positions={activeRoute.geometry}
          pathOptions={{
            color: activeRoute.risk_color,
            weight: 6,
            opacity: 0.95
          }}
        />

        {/* Start Marker */}
        {startCoord && (
          <Marker position={startCoord} icon={createStartEndIcon(true)}>
            <Popup>
              <div className="p-1">
                <div className="font-bold text-cyber-cyan text-sm flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Journey Start Point
                </div>
                <div className="text-xs text-slate-300 mt-1">Origin Point</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {endCoord && (
          <Marker position={endCoord} icon={createStartEndIcon(false)}>
            <Popup>
              <div className="p-1">
                <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Journey Destination
                </div>
                <div className="text-xs text-slate-300 mt-1">Safe arrival zone</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Accident Hotspots with Pulse Markers */}
        {activeRoute.hotspots.map((hs) => (
          <Marker
            key={hs.id}
            position={[hs.lat, hs.lon]}
            icon={createHotspotIcon(hs.severity)}
            eventHandlers={{
              click: () => onSelectHotspot && onSelectHotspot(hs)
            }}
          >
            <Popup>
              <div className="p-2 max-w-[260px]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                  <AlertTriangle className="w-4 h-4" /> {hs.severity} Risk Hotspot
                </div>
                <h4 className="font-semibold text-white text-sm leading-tight">{hs.name}</h4>
                <div className="mt-2 text-xs text-slate-300 space-y-1 bg-slate-900/80 p-2 rounded border border-slate-800">
                  <div><span className="text-slate-400">Past Incidents:</span> <b className="text-red-400">{hs.historical_incidents} collisions</b></div>
                  <div><span className="text-slate-400">Peak Hazard:</span> {hs.high_risk_hours}</div>
                  <div><span className="text-slate-400">Cause:</span> {hs.primary_cause}</div>
                </div>
                <p className="text-[11px] text-emerald-300 font-medium mt-2">
                  Action: {hs.advice}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Map HUD overlay */}
      <div className="absolute top-4 left-4 z-[1000] glass-panel p-3 rounded-xl pointer-events-auto border border-white/10 flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: activeRoute.risk_color }}
        />
        <div>
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            {activeRoute.title}
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-0.5">
            <span>{activeRoute.distance_km} km</span>
            <span>•</span>
            <span>{Math.floor(activeRoute.duration_min / 60)}h {Math.round(activeRoute.duration_min % 60)}m</span>
            <span>•</span>
            <span style={{ color: activeRoute.risk_color }} className="font-semibold">
              Risk: {activeRoute.risk_score}/100 ({activeRoute.risk_level})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
