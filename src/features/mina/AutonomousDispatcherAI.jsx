import React, { useState } from 'react';

export default function AutonomousDispatcherAI() {
  const [autoOptimize, setAutoOptimize] = useState(true);

  const recomendaciones = [
    { id: 1, origen: 'PIT-NORTH-01', destino: 'CHANCADOR-01', caex: 'CAEX-104', impacto: '-3.2 min espera' },
    { id: 2, origen: 'PIT-SOUTH-04', destino: 'STOCKPILE-02', caex: 'CAEX-112', impacto: '+18t/h rendimiento' },
    { id: 3, origen: 'PIT-EAST-02', destino: 'CHANCADOR-02', caex: 'CAEX-109', impacto: 'Ahorro 4.1L diésel' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2">
            🤖 Motor IA de Despacho Autónomo
          </h2>
          <p className="text-xs text-slate-400">Algoritmo genético de ruteo de bajo consumo y cero cuellos de botella.</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800">
          <span className="text-xs text-slate-300">Modo Auto-Piloto IA:</span>
          <button
            onClick={() => setAutoOptimize(!autoOptimize)}
            className={`px-3 py-1 text-xs font-mono rounded font-bold transition ${
              autoOptimize ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}
          >
            {autoOptimize ? 'ACTIVO' : 'PAUSADO'}
          </button>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Optimizaciones de Riego y Ruteo en Tiempo Real
        </h3>
        <div className="space-y-2">
          {recomendaciones.map((rec) => (
            <div key={rec.id} className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
                  {rec.caex}
                </span>
                <span className="text-slate-400">{rec.origen} ➔ {rec.destino}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-400">{rec.impacto}</span>
                <button className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px]">
                  Reasignar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}