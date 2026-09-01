import React, { useState, useEffect } from 'react';
import { telemetryService } from '../../services/telemetryService';

export default function Telemetry() {
  const [metrics, setMetrics] = useState(() => telemetryService.getCurrentData());

  useEffect(() => {
    const unsubscribe = telemetryService.subscribe((newData) => {
      setMetrics(newData);
    });
    return () => unsubscribe();
  }, []);

  const pressure = metrics?.pressure ?? 142.5;
  const temperature = metrics?.temperature ?? 68.2;
  const flowRate = metrics?.flowRate ?? 310.0;
  const networkLatency = metrics?.networkLatency ?? 12;
  const fleetCount = metrics?.fleet?.length ?? 0;

  return (
    <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold text-cyan-400">⚡ Telemetría SCADA & IoT Edge</h2>
          <p className="text-xs text-slate-400">Lecturas en tiempo real mediante capa Pub/Sub</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          EN VIVO ({networkLatency}ms)
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 font-medium">Presión Hidráulica</span>
          <div className="text-2xl font-bold text-cyan-300 font-mono mt-1">
            {pressure} <span className="text-xs text-slate-500">PSI</span>
          </div>
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 font-medium">Temperatura Motor</span>
          <div className="text-2xl font-bold text-amber-300 font-mono mt-1">
            {temperature} <span className="text-xs text-slate-500">°C</span>
          </div>
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 font-medium">Flujo de Pulpa</span>
          <div className="text-2xl font-bold text-emerald-300 font-mono mt-1">
            {flowRate} <span className="text-xs text-slate-500">L/s</span>
          </div>
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 font-medium">Flota CAEX Activa</span>
          <div className="text-2xl font-bold text-purple-300 font-mono mt-1">
            {fleetCount} <span className="text-xs text-slate-500">Unidades</span>
          </div>
        </div>
      </div>
    </div>
  );
}