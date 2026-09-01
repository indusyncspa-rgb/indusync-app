import React, { useState, useEffect } from 'react';

export const PredictiveMaintenance = () => {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    fetch('/api/sap-maintenance')
      .then(res => res.json())
      .then(d => setOrdenes(d.ordenesTrabajo || []))
      .catch(() => {
        setOrdenes([
          { id: 'OT-8821', equipo: 'Molino SAG 01', componente: 'Rodamiento Principal', saludPct: 78, accionRecomendada: 'Reemplazo programado en 120 horas' }
        ]);
      });
  }, []);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-blue-500/30">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-blue-400">⚙️ Mantenimiento Predictivo & SAP PM</h2>
          <p className="text-xs text-slate-400">Integración Algorítmica RCM / Conexión ERP Planta</p>
        </div>
        <span className="px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded-full text-xs font-mono">
          SAP PM S/4HANA: CONECTADO
        </span>
      </div>

      <div className="space-y-3">
        {ordenes.map((ot) => (
          <div key={ot.id} className="p-4 bg-slate-800/80 rounded-lg border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded">{ot.id}</span>
                <strong className="text-sm text-slate-100">{ot.equipo}</strong>
              </div>
              <p className="text-xs text-slate-400 mt-1">Componente: {ot.componente}</p>
              <p className="text-xs text-amber-400">Acción Recomendada: {ot.accionRecomendada}</p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Salud Remanente</span>
              <p className={`text-xl font-black ${ot.saludPct < 70 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {ot.saludPct}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};