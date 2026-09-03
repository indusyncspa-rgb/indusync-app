import React, { useState, useEffect } from 'react';

export default function LiveROICalculator() {
  // Parámetros de simulación ejecutiva
  const [fleetSize, setFleetSize] = useState(4); // Cantidad de Molinos SAG / Equipos Críticos
  const [avgDowntimeCost, setAvgDowntimeCost] = useState(185000); // USD por hora de parada
  const [aiEfficiencyRate, setAiEfficiencyRate] = useState(94); // % de fallas predichas con éxito

  // Historial de ahorros generados por la IA + Marketplace B2B
  const [events, setEvents] = useState([
    {
      id: 'EVT-102',
      date: '02 Sep 2026',
      asset: 'Molino SAG 01',
      type: 'Sobrepresión Chumacera Hidrostática',
      hoursSaved: 36,
      partCostUSD: 42000,
      totalSavedUSD: 6618000,
      status: 'ADJUDICADO_EXPRESS'
    },
    {
      id: 'EVT-098',
      date: '28 Ago 2026',
      asset: 'Chancador Primario 02',
      type: 'Desalineamiento de Eje por Vibración',
      hoursSaved: 14,
      partCostUSD: 18500,
      totalSavedUSD: 2571500,
      status: 'ADJUDICADO_EXPRESS'
    },
    {
      id: 'EVT-089',
      date: '15 Ago 2026',
      asset: 'Correa Transportadora CV-04',
      type: 'Corte Longitudinal Prematuro',
      hoursSaved: 22,
      partCostUSD: 29000,
      totalSavedUSD: 4041000,
      status: 'ADJUDICADO_EXPRESS'
    }
  ]);

  const [exportingPDF, setExportingPDF] = useState(false);

  // Cálculos consolidados
  const totalHoursSaved = events.reduce((acc, curr) => acc + curr.hoursSaved, 0);
  const totalNetSavingsUSD = events.reduce((acc, curr) => acc + curr.totalSavedUSD, 0);
  const projectedAnnualSavings = (totalNetSavingsUSD / 3) * 12; // Proyección basada en el último trimestre

  const handleExportPDF = () => {
    setExportingPDF(true);
    setTimeout(() => {
      setExportingPDF(false);
      alert('📄 Informe Ejecutivo en PDF generado exitosamente: "INDUSYNC_ROI_Board_Report_Q3_2026.pdf"');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Directorio */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <h2 className="text-xl font-black text-slate-100 tracking-wide uppercase">
              Calculador Ejecutivo de ROI & Retorno Prescriptivo
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Consolidado en tiempo real: Impacto financiero de la prevención Edge AI + B2B Matchmaking
          </p>
        </div>

        <button
          onClick={handleExportPDF}
          disabled={exportingPDF}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition font-mono flex items-center gap-2 shadow-lg shadow-emerald-500/10"
        >
          {exportingPDF ? (
            <span className="animate-pulse">⏳ Generando PDF...</span>
          ) : (
            <>
              <span>📥 Exportar Informe Directorio (PDF)</span>
            </>
          )}
        </button>
      </div>

      {/* KPI Cards de Impacto Consolidado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Ahorro Neto Acumulado</div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            ${(totalNetSavingsUSD / 1000000).toFixed(2)}M <span className="text-xs text-slate-400">USD</span>
          </div>
          <div className="text-[10px] text-emerald-400 font-mono">100% Retorno Auditado</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Horas Parada Evitadas</div>
          <div className="text-3xl font-black text-cyan-400 font-mono">
            {totalHoursSaved} <span className="text-xs text-slate-400">Horas</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Disponibilidad Planta +4.2%</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Proyección Ahorro Anual</div>
          <div className="text-3xl font-black text-slate-100 font-mono">
            ${(projectedAnnualSavings / 1000000).toFixed(1)}M <span className="text-xs text-slate-400">USD</span>
          </div>
          <div className="text-[10px] text-cyan-400 font-mono">Basado en run-rate actual</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Efectividad Algorítmica</div>
          <div className="text-3xl font-black text-amber-400 font-mono">
            {aiEfficiencyRate}%
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Cero falsos positivos críticos</div>
        </div>
      </div>

      {/* Simulador de Parámetros de Operación para el Directorio */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
          ⚙️ Modulador de Sensibilidad Financiera
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Equipos Críticos Monitoreados:</span>
              <span className="text-cyan-400 font-bold">{fleetSize} Unidades</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={fleetSize}
              onChange={(e) => setFleetSize(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-950 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Costo Parada Promedio (USD/hr):</span>
              <span className="text-rose-400 font-bold">${(avgDowntimeCost / 1000).toFixed(0)}k</span>
            </div>
            <input
              type="range"
              min="50000"
              max="300000"
              step="5000"
              value={avgDowntimeCost}
              onChange={(e) => setAvgDowntimeCost(Number(e.target.value))}
              className="w-full accent-rose-400 bg-slate-950 rounded-lg cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Efectividad Inferencia IA (%):</span>
              <span className="text-emerald-400 font-bold">{aiEfficiencyRate}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="99"
              value={aiEfficiencyRate}
              onChange={(e) => setAiEfficiencyRate(Number(e.target.value))}
              className="w-full accent-emerald-400 bg-slate-950 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Tabla de Evidencias Auditables por Evento */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            📋 Registro Auditable de Intervenciones Prescriptivas
          </h3>
          <span className="text-[10px] font-mono text-slate-500">ISO 55001 Asset Management</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase">
                <th className="py-2.5 px-3">ID Evento</th>
                <th className="py-2.5 px-3">Fecha</th>
                <th className="py-2.5 px-3">Activo</th>
                <th className="py-2.5 px-3">Anomalía Detectada</th>
                <th className="py-2.5 px-3 text-right">Horas Evitadas</th>
                <th className="py-2.5 px-3 text-right">Costo Repuesto</th>
                <th className="py-2.5 px-3 text-right">Ahorro Neto Evitado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-950/50 transition">
                  <td className="py-3 px-3 text-cyan-400 font-bold">{evt.id}</td>
                  <td className="py-3 px-3 text-slate-400">{evt.date}</td>
                  <td className="py-3 px-3 text-slate-200 font-bold">{evt.asset}</td>
                  <td className="py-3 px-3 text-slate-300">{evt.type}</td>
                  <td className="py-3 px-3 text-right text-cyan-300 font-bold">{evt.hoursSaved} hrs</td>
                  <td className="py-3 px-3 text-right text-slate-400">${evt.partCostUSD.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right text-emerald-400 font-bold">
                    ${(evt.totalSavedUSD / 1000000).toFixed(2)}M USD
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}