import React from 'react';

const fallbackFinance = {
  ebitdaEstimadoMusd: 26.76,
  cashCostC1: 1.26,
  opexAcumuladoMusd: 142.8,
  ahorroIAacumuladoUsd: 1425000,
  estadoAcueducto: 'ÓPTIMO (100%)',
  ingresosTotalesMusd: 310.5,
  costoProcesamientoTon: 14.20
};

export default function FinanceDashboard(props) {
  // Extrae la data con triple capa de protección
  const safeData = props?.data ?? props ?? fallbackFinance;

  const ebitda = safeData?.ebitdaEstimadoMusd ?? fallbackFinance.ebitdaEstimadoMusd;
  const cashCost = safeData?.cashCostC1 ?? fallbackFinance.cashCostC1;
  const opex = safeData?.opexAcumuladoMusd ?? fallbackFinance.opexAcumuladoMusd;
  const ahorroIA = safeData?.ahorroIAacumuladoUsd ?? fallbackFinance.ahorroIAacumuladoUsd;
  const estadoAcueducto = safeData?.estadoAcueducto ?? fallbackFinance.estadoAcueducto;

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div>
          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[10px] font-mono font-bold">
            FINANZAS CORPORATIVAS C-SUITE
          </span>
          <h2 className="text-2xl font-black text-white mt-1">Dashboard Financiero ROI</h2>
          <p className="text-xs text-slate-400">Impacto económico en P&L, reducción de OPEX y margen EBITDA.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="text-xs font-mono font-bold text-slate-200">
            Estado Acueducto: <span className="text-emerald-400">{estadoAcueducto}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Impacto EBITDA Adicional</p>
          <p className="text-2xl font-black text-emerald-400 font-mono mt-2">+${ebitda}M USD</p>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono">↑ +8.4% margen operacional</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Ahorro Directo por IA</p>
          <p className="text-2xl font-black text-cyan-400 font-mono mt-2">
            ${(ahorroIA / 1000).toFixed(0)}k USD
          </p>
          <p className="text-[11px] text-cyan-400 mt-1 font-mono">Fallas P0 evadidas</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">OPEX YTD Acumulado</p>
          <p className="text-2xl font-black text-white font-mono mt-2">${opex}M USD</p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">3.1% bajo presupuesto</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Cash Cost C1</p>
          <p className="text-2xl font-black text-purple-400 font-mono mt-2">${cashCost} USD/lb</p>
          <p className="text-[11px] text-purple-400 mt-1 font-mono">Molienda SAG optimizada</p>
        </div>
      </div>
    </div>
  );
}