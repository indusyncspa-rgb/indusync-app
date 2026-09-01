import React, { useState, useEffect } from 'react';

export const FinancialAndWaterView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/financial-water')
      .then(r => r.json())
      .then(d => setData(d));
  }, []);

  if (!data) return <div className="p-4 text-cyan-400">Cargando Sistema Hídrico & Finanzas C1...</div>;

  return (
    <div className="space-y-6">
      {/* SECCION 1: IMPULSION AGUA DESALADA */}
      <div className="p-6 bg-slate-900 text-white rounded-xl border border-cyan-500/30">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">💧 Telemetría Sistema Impulsión Agua Desalada (SIAM)</h2>
            <p className="text-xs text-slate-400">Monitoreo Presión en Tubería Alta Cordillera & Algoritmo de Detección de Fugas</p>
          </div>
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-mono font-bold">
            {data.telemetriaAgua.estadoAcueducto}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.telemetriaAgua.estaciones.map((est, idx) => (
            <div key={idx} className="p-3 bg-slate-800 rounded border border-slate-700">
              <strong className="text-sm text-slate-100">{est.estacion_bombeo}</strong>
              <div className="mt-2 text-xs space-y-1 text-slate-300">
                <p>Caudal: <strong className="text-cyan-400">{est.caudal_lps} L/s</strong></p>
                <p>Presión: <strong className="text-slate-200">{est.presion_bar} Bar</strong></p>
                <p>Estado Fuga: <span className="text-emerald-400">{est.fuga_detectada ? '⚠️ ALERTA' : '✓ NORMAL'}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCION 2: SIMULADOR CASH COST C1 */}
      <div className="p-6 bg-slate-900 text-white rounded-xl border border-amber-500/30">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-amber-400">💵 Cash Cost (C1) & Control de Margen Financiero</h2>
            <p className="text-xs text-slate-400">Cálculo de Costo de Producción por Libra de Cobre Fino Procesado</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono font-bold">
            Margen EBITDA: {data.financieroC1.margenEbitdaPct}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-800 rounded border border-slate-700 text-center">
            <span className="text-xs text-slate-400">Cash Cost (C1) Actual</span>
            <p className="text-3xl font-black text-emerald-400 mt-1">US$ {data.financieroC1.cashCostActualUsdLb} <span className="text-sm text-slate-400">/ lb</span></p>
            <span className="text-[10px] text-emerald-500">Bajo la Meta (US$ {data.financieroC1.targetC1UsdLb})</span>
          </div>

          <div className="p-4 bg-slate-800 rounded border border-slate-700 text-center">
            <span className="text-xs text-slate-400">Costo Energía PPA</span>
            <p className="text-2xl font-bold text-white mt-2">US$ {data.financieroC1.sensibilidad.energiaUsdMwh} / MWh</p>
            <span className="text-[10px] text-slate-400">Contrato Renovable Vigente</span>
          </div>

          <div className="p-4 bg-slate-800 rounded border border-slate-700 text-center">
            <span className="text-xs text-slate-400">Tipo de Cambio Mercado</span>
            <p className="text-2xl font-bold text-amber-400 mt-2">$ {data.financieroC1.sensibilidad.dolarClp} CLP/USD</p>
            <span className="text-[10px] text-slate-400">Cobertura FX Activa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

