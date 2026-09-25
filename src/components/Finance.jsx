import React, { useState } from 'react';

export default function Finance() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-800">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">
        💧 Sistema Hídrico & Finanzas C1
      </h2>
      <p className="text-slate-400 mb-6">
        Monitoreo en tiempo real de consumo de agua de mar desalada, recirculación en tranque de relaves y Cash Cost C1.
      </p>

      {/* Grid de Indicadores Financieros e Hídricos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400">CASH COST C1 OPTIMIZADO</p>
          <p className="text-3xl font-extrabold text-emerald-400">$1.26 <span className="text-sm font-normal text-slate-400">USD/lb</span></p>
          <span className="text-xs text-emerald-500">↓ -$0.042/lb ahorrado por IA</span>
        </div>

        <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400">RECIRCULACIÓN AGUA RELAVES</p>
          <p className="text-3xl font-extrabold text-cyan-400">88.4%</p>
          <span className="text-xs text-cyan-500">↑ Meta ESG Cumplida</span>
        </div>

        <div className="p-4 bg-slate-800/60 rounded-lg border border-slate-700">
          <p className="text-xs text-slate-400">IMPULSIÓN AGUA DESALADA</p>
          <p className="text-3xl font-extrabold text-blue-400">1,420 <span className="text-sm font-normal text-slate-400">L/s</span></p>
          <span className="text-xs text-slate-400">Presión Estabilidad: Óptima</span>
        </div>
      </div>
    </div>
  );
}