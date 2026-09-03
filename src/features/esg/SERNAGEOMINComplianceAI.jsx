import React from 'react';

export default function SERNAGEOMINComplianceAI() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2">
            📑 SERNAGEOMIN Audit & Safety Compliance
          </h2>
          <p className="text-xs text-slate-400">Verificación automatizada de normativas de seguridad minera y reglamentos.</p>
        </div>
        <span className="text-xs font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800 px-3 py-1 rounded">
          Cumplimiento: 99.4%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase font-mono">Índice de Frecuencia Afectación</h4>
          <p className="text-2xl font-bold text-emerald-400 font-mono">0.12</p>
          <p className="text-[11px] text-slate-400">Debajo del límite máximo regulatorio nacional.</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase font-mono">Reporte de Auditoría Digital</h4>
          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 font-mono text-xs rounded transition">
            📄 Generar Reporte Oficial PDF
          </button>
        </div>
      </div>
    </div>
  );
}