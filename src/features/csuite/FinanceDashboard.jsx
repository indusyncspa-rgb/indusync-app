import React from 'react';

// Dataset de respaldo si no hay datos en el estado global
const fallbackFinanceData = {
  ebitdaEstimadoMusd: 26.76,
  cashCostC1: 1.26,
  opexAcumuladoMusd: 142.8,
  ahorroIAacumuladoUsd: 1425000,
  estadoAcueducto: 'ÓPTIMO (100%)',
  ingresosTotalesMusd: 310.5,
  costoProcesamientoTon: 14.20
};

export default function FinanceDashboard(props) {
  // Blindaje absoluto: extrae data sin importar cómo la envíe el componente padre
  const rawData = props?.data ?? props;
  const metrics = (rawData && typeof rawData === 'object' && !Array.isArray(rawData)) 
    ? rawData 
    : fallbackFinanceData;

  // Extracción segura con coalescencia nula
  const ebitda = metrics?.ebitdaEstimadoMusd ?? fallbackFinanceData.ebitdaEstimadoMusd;
  const cashCost = metrics?.cashCostC1 ?? fallbackFinanceData.cashCostC1;
  const opex = metrics?.opexAcumuladoMusd ?? fallbackFinanceData.opexAcumuladoMusd;
  const ahorroIA = metrics?.ahorroIAacumuladoUsd ?? fallbackFinanceData.ahorroIAacumuladoUsd;
  const ingresos = metrics?.ingresosTotalesMusd ?? fallbackFinanceData.ingresosTotalesMusd;
  const costoProc = metrics?.costoProcesamientoTon ?? fallbackFinanceData.costoProcesamientoTon;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Cabecera Principal */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div>
          <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[10px] font-mono font-bold">
            FINANZAS CORPORATIVAS & RETORNO DE INVERSIÓN
          </span>
          <h2 className="text-2xl font-black text-white mt-1">Dashboard Financiero C-Suite</h2>
          <p className="text-xs text-slate-400">Impacto económico en P&L, reducción de OPEX y margen EBITDA.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="text-xs font-mono font-bold text-slate-200">
            Cash Cost C1: <span className="text-emerald-400">${cashCost} USD/lb</span>
          </span>
        </div>
      </div>

      {/* Grid de Tarjetas de Finanzas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Impacto EBITDA Adicional</p>
          <p className="text-2xl font-black text-emerald-400 font-mono mt-2">
            +${ebitda} <span className="text-xs text-slate-500 font-normal">MUSD</span>
          </p>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono">↑ +8.4% margen operacional</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Ahorro Directo por IA</p>
          <p className="text-2xl font-black text-cyan-400 font-mono mt-2">
            ${(ahorroIA / 1000).toFixed(0)}k <span className="text-xs text-slate-500 font-normal">USD</span>
          </p>
          <p className="text-[11px] text-cyan-400 mt-1 font-mono">Fallas P0 evadidas</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">OPEX YTD Acumulado</p>
          <p className="text-2xl font-black text-white font-mono mt-2">
            ${opex} <span className="text-xs text-slate-500 font-normal">MUSD</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">3.1% bajo presupuesto</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Costo Procesamiento</p>
          <p className="text-2xl font-black text-purple-400 font-mono mt-2">
            ${costoProc} <span className="text-xs text-slate-500 font-normal">USD/ton</span>
          </p>
          <p className="text-[11px] text-purple-400 mt-1 font-mono">Molienda SAG optimizada</p>
        </div>

      </div>

      {/* Resumen P&L Resumido */}
      <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-4 font-mono">📊 ESTADO DE RESULTADOS SIMULADO (YTD)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <p className="text-slate-500">Ingresos Totales por Venta Cu</p>
            <p className="text-lg font-bold text-white mt-1">${ingresos} MUSD</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <p className="text-slate-500">Margen Bruto Operacional</p>
            <p className="text-lg font-bold text-emerald-400 mt-1">54.1%</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <p className="text-slate-500">Payback de Software INDUSYNC</p>
            <p className="text-lg font-bold text-cyan-400 mt-1">&lt; 1.4 Meses</p>
          </div>
        </div>
      </div>

    </div>
  );
}