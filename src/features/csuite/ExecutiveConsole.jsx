import React, { useState, useEffect } from 'react';
import { telemetryService } from '../../services/telemetryService';

export default function ExecutiveConsole() {
  const [data, setData] = useState(() => telemetryService.getCurrentData());

  useEffect(() => {
    const unsubscribe = telemetryService.subscribe((newData) => {
      setData(newData);
    });
    return () => unsubscribe();
  }, []);

  const cs = data?.csuite || {
    copperPriceLb: 4.35,
    dailyProductionTons: 12450,
    targetProductionTons: 13000,
    costPerTonUSD: 1.82,
    operatingMarginPercent: 41.5,
    ebitdaForecastMillion: 18.4
  };

  const dailyProd = cs.dailyProductionTons ? cs.dailyProductionTons.toLocaleString() : '12,450';
  const targetProd = cs.targetProductionTons ? cs.targetProductionTons.toLocaleString() : '13,000';

  return (
    <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            📊 Consola Ejecutiva C-Suite & KPI Estratégicos
          </h2>
          <p className="text-xs text-slate-400">Visión Financiera, Producción Diaria y Mercado en Vivo</p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Actualizado en vivo
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl border-l-4 border-l-amber-500">
          <span className="text-xs text-slate-400">Precio Cobre (COMEX)</span>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
            USD ${cs.copperPriceLb} <span className="text-xs text-slate-500">/ lb</span>
          </div>
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl border-l-4 border-l-cyan-500">
          <span className="text-xs text-slate-400">Producción del Día</span>
          <div className="text-2xl font-bold text-cyan-300 font-mono mt-1">
            {dailyProd} <span className="text-xs text-slate-500">Ton</span>
          </div>
          <span className="text-[10px] text-slate-400">Meta: {targetProd} Ton</span>
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl border-l-4 border-l-emerald-500">
          <span className="text-xs text-slate-400">Costo C1 / Tonelada</span>
          <div className="text-2xl font-bold text-emerald-300 font-mono mt-1">
            USD ${cs.costPerTonUSD}
          </div>
        </div>

        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl border-l-4 border-l-purple-500">
          <span className="text-xs text-slate-400">EBITDA Proyectado (Mes)</span>
          <div className="text-2xl font-bold text-purple-300 font-mono mt-1">
            ${cs.ebitdaForecastMillion}M <span className="text-xs text-slate-500">USD</span>
          </div>
        </div>
      </div>
    </div>
  );
}