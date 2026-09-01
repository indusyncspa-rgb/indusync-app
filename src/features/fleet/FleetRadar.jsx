import React, { useState, useEffect } from 'react';
import { telemetryService } from '../../services/telemetryService';

export default function FleetRadar() {
  const [telemetry, setTelemetry] = useState(() => telemetryService.getCurrentData());

  useEffect(() => {
    const unsubscribe = telemetryService.subscribe((data) => {
      setTelemetry(data);
    });
    return () => unsubscribe();
  }, []);

  const fleet = telemetry?.fleet || [];

  const getFatigueBadge = (risk) => {
    switch (risk) {
      case 'Alto':
        return <span className="bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded text-xs font-bold animate-pulse">ALERTA</span>;
      case 'Medio':
        return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded text-xs">PRECAUCIÓN</span>;
      default:
        return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded text-xs">NORMAL</span>;
    }
  };

  return (
    <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            🚛 Radar & Monitoreo de Flota CAEX
          </h2>
          <p className="text-xs text-slate-400">Control biométrico, velocidad y estado GPS en faena</p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Camiones monitoreados: <span className="text-white font-bold">{fleet.length}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/40">
              <th className="p-3">Unidad</th>
              <th className="p-3">Operador</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Ubicación</th>
              <th className="p-3">Velocidad</th>
              <th className="p-3">Combustible</th>
              <th className="p-3">Riesgo Fatiga</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50 font-mono">
            {fleet.map((truck) => (
              <tr key={truck.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-bold text-cyan-400">{truck.id}</td>
                <td className="p-3 text-slate-200 font-sans">{truck.driver}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full border ${
                    truck.status === 'En Tránsito' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                    truck.status === 'Cargando' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                    truck.status === 'Descargando' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {truck.status}
                  </span>
                </td>
                <td className="p-3 text-slate-300 font-sans text-xs">{truck.location}</td>
                <td className="p-3 text-slate-200">{truck.speed} <span className="text-slate-500 text-xs">km/h</span></td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full ${truck.fuel < 40 ? 'bg-red-500' : 'bg-emerald-400'}`} 
                        style={{ width: `${truck.fuel}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{truck.fuel}%</span>
                  </div>
                </td>
                <td className="p-3">{getFatigueBadge(truck.fatigueRisk)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}