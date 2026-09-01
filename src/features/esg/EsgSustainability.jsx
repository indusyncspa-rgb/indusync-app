import React, { useState, useEffect } from 'react';
import { telemetryService } from '../../services/telemetryService';

export default function EsgSustainability() {
  const [data, setData] = useState(() => telemetryService.getCurrentData());

  useEffect(() => {
    const unsubscribe = telemetryService.subscribe((newData) => {
      setData(newData);
    });
    return () => unsubscribe();
  }, []);

  const esg = data?.esg || {
    carbonFootprint: 1.12,
    waterRecyclingRate: 84.5,
    renewableEnergyShare: 92.0,
    solarGenerationMW: 45.8,
    tailingsDepositStatus: 'Estable (Sensor Inclinométrico Ok)'
  };

  return (
    <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            🌱 Panel ESG & Monitoreo Ambiental
          </h2>
          <p className="text-xs text-slate-400">Indicadores de Huella de Carbono, Reciclaje de Agua y Matriz Energética</p>
        </div>
        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono">
          Matriz Verde 2026
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Huella Carbono / Ton Cu</span>
          <div className="text-2xl font-bold text-emerald-300 font-mono mt-1">
            {esg.carbonFootprint} <span className="text-xs text-slate-500">tCO2e</span>
          </div>
          <p className="text-[10px] text-emerald-400 mt-1">↓ 14% respecto al mes anterior</p>
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Reciclaje de Agua Industrial</span>
          <div className="text-2xl font-bold text-cyan-300 font-mono mt-1">
            {esg.waterRecyclingRate}%
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
            <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${esg.waterRecyclingRate}%` }}></div>
          </div>
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Generación Solar en Sitio</span>
          <div className="text-2xl font-bold text-amber-300 font-mono mt-1">
            {esg.solarGenerationMW} <span className="text-xs text-slate-500">MW</span>
          </div>
          <p className="text-[10px] text-amber-400 mt-1">Parque Fotovoltaico Activo</p>
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Energía Renovable en Red</span>
          <div className="text-2xl font-bold text-purple-300 font-mono mt-1">
            {esg.renewableEnergyShare}%
          </div>
          <p className="text-[10px] text-purple-400 mt-1">Contrato PPA 100% Verde</p>
        </div>
      </div>

      <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <span className="text-xs text-slate-400 font-semibold">Estado Depósito de Relaves:</span>
          <p className="text-sm font-bold text-slate-200 mt-0.5">{esg.tailingsDepositStatus}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-emerald-400 font-mono font-bold">Cumplimiento Normativo ESG: 100%</span>
        </div>
      </div>
    </div>
  );
}