import React, { useState } from 'react';

export default function MineOperations() {
  const [tonelaje, setTonelaje] = useState(142800);
  const [eficiencia, setEficiencia] = useState(94.2);

  const pits = [
    { id: 'PIT-NORTH-01', ley: '0.82% Cu', camionActivos: 18, estado: 'OPTIMO', produccion: '4,200 t/h' },
    { id: 'PIT-SOUTH-04', ley: '0.65% Cu', camionActivos: 12, estado: 'PRECAUCION', produccion: '2,800 t/h' },
    { id: 'PIT-EAST-02', ley: '0.91% Cu', camionActivos: 14, estado: 'OPTIMO', produccion: '3,950 t/h' },
  ];

  return (
    <div className="space-y-6">
      {/* Tarjetas de Métricas Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs text-slate-400 font-mono">TONELAJE TOTAL HOY</p>
          <h3 className="text-2xl font-bold text-cyan-400 font-mono mt-1">
            {tonelaje.toLocaleString()} <span className="text-xs font-normal text-slate-400">t</span>
          </h3>
          <span className="text-[10px] text-emerald-400 font-mono">▲ +5.4% vs meta diaria</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs text-slate-400 font-mono">OEE GLOBAL MINA</p>
          <h3 className="text-2xl font-bold text-emerald-400 font-mono mt-1">{eficiencia}%</h3>
          <span className="text-[10px] text-emerald-400 font-mono">⚡ Disponibilidad 98.1%</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs text-slate-400 font-mono">FLOTA CAEX ACTIVA</p>
          <h3 className="text-2xl font-bold text-slate-100 font-mono mt-1">44 / 48</h3>
          <span className="text-[10px] text-amber-400 font-mono">⚠ 4 en Mantenimiento PM</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <p className="text-xs text-slate-400 font-mono">LEY PROMEDIO CHANCADO</p>
          <h3 className="text-2xl font-bold text-cyan-400 font-mono mt-1">0.78% Cu</h3>
          <span className="text-[10px] text-cyan-400 font-mono">🎯 Objetivo Mezcla Cumplido</span>
        </div>
      </div>

      {/* Monitor de Pits de Extracción */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <span>⛏️</span> Frentes de Extracción Activos
          </h3>
          <button 
            onClick={() => setTonelaje(prev => prev + 250)}
            className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded text-xs transition font-mono"
          >
            + Simular Carga Extracción
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pits.map((pit) => (
            <div key={pit.id} className="bg-slate-950/70 border border-slate-800/80 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-slate-200">{pit.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                  pit.estado === 'OPTIMO' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {pit.estado}
                </span>
              </div>
              <div className="text-xs text-slate-400 justify-between flex">
                <span>Ley Mineral:</span> <strong className="text-cyan-400 font-mono">{pit.ley}</strong>
              </div>
              <div className="text-xs text-slate-400 justify-between flex">
                <span>Camiones Asignados:</span> <strong className="text-slate-200 font-mono">{pit.camionActivos} CAEX</strong>
              </div>
              <div className="text-xs text-slate-400 justify-between flex">
                <span>Ritmo Producción:</span> <strong className="text-emerald-400 font-mono">{pit.produccion}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}