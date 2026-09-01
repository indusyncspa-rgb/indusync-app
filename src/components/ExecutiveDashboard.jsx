import React, { useState, useEffect } from 'react';

export const ExecutiveDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/csuite')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(() => {
        // Fallback demo local
        setData({
          resumenEstrategico: { produccionDiariaToneladasCu: 14520, cumplimientoMetaMesPct: 102.4, ebitdaEstimadoDiarioUsd: 4850000, precioCobreLbUsd: 4.38 },
          indicadoresESG: { huellaCarbonoTCO2e: 1.12, reciclajeAguaPct: 88.6, energiaRenovablePct: 94.0 },
          seguridadPersonas: { trifrAccidentabilidad: 0.42, diasSinAccidentesGraves: 412, dotacionTotalFaena: 3840 }
        });
      });
  }, []);

  if (!data) return <div className="p-4 text-slate-400">Cargando métricas C-Suite & ESG...</div>;

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-amber-500/30 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-amber-400">📈 Directorio C-Suite & Panel ESG</h2>
          <p className="text-xs text-slate-400">Consolidado Corporativo Operacional y de Sostenibilidad</p>
        </div>
        <span className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-full text-xs font-mono">
          Cobre: US$ {data.resumenEstrategico.precioCobreLbUsd} / lb
        </span>
      </div>

      {/* KPI Financieros / Producción */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800/90 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400">EBITDA Diaria Estimada</p>
          <p className="text-2xl font-black text-emerald-400 mt-1">
            US$ {(data.resumenEstrategico.ebitdaEstimadoDiarioUsd / 1000000).toFixed(2)}M
          </p>
          <span className="text-xs text-emerald-500">↑ 4.2% vs Plan Mensual</span>
        </div>

        <div className="p-4 bg-slate-800/90 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400">Producción Día (Cobre Fino)</p>
          <p className="text-2xl font-black text-white mt-1">
            {data.resumenEstrategico.produccionDiariaToneladasCu.toLocaleString()} Ton
          </p>
          <span className="text-xs text-cyan-400">{data.resumenEstrategico.cumplimientoMetaMesPct}% Meta Alcanzada</span>
        </div>

        <div className="p-4 bg-slate-800/90 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400">Días sin Accidentes CPT</p>
          <p className="text-2xl font-black text-amber-400 mt-1">
            {data.seguridadPersonas.diasSinAccidentesGraves} Días
          </p>
          <span className="text-xs text-slate-400">TRIFR: {data.seguridadPersonas.trifrAccidentabilidad} (Meta &lt; 0.50)</span>
        </div>
      </div>

      {/* Panel ESG & Sustentabilidad */}
      <div className="p-4 bg-slate-950 rounded-lg border border-emerald-500/20">
        <h3 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
          🌱 Sostenibilidad ESG (Scope 1 & 2)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <span className="text-xs text-slate-400">Huella de Carbono</span>
            <p className="text-xl font-bold text-white mt-1">{data.indicadoresESG.huellaCarbonoTCO2e} <span className="text-xs text-slate-400">tCO2/tCu</span></p>
            <span className="text-[10px] text-emerald-400">Meta cumplida (&lt; 1.25)</span>
          </div>

          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <span className="text-xs text-slate-400">Recirculación de Agua</span>
            <p className="text-xl font-bold text-cyan-400 mt-1">{data.indicadoresESG.reciclajeAguaPct}%</p>
            <span className="text-[10px] text-slate-400">Matriz Hídrica Desalada/Reciclada</span>
          </div>

          <div className="p-3 bg-slate-900 rounded border border-slate-800">
            <span className="text-xs text-slate-400">Energía Renovable</span>
            <p className="text-xl font-bold text-amber-400 mt-1">{data.indicadoresESG.energiaRenovablePct}%</p>
            <span className="text-[10px] text-slate-400">Contrato PPA Solar / Eólico</span>
          </div>
        </div>
      </div>
    </div>
  );
};