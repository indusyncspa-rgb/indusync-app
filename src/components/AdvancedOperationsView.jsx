import React, { useState, useEffect } from 'react';

export const AdvancedOperationsView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/operations-advanced')
      .then(r => r.json())
      .then(d => setData(d));
  }, []);

  if (!data) return <div className="p-4 text-cyan-400">Cargando Motores Operacionales Avanzados...</div>;

  return (
    <div className="space-y-6">
      {/* DESPACHO AHS */}
      <div className="p-6 bg-slate-900 text-white rounded-xl border border-cyan-500/30">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">🤖 Algoritmo de Despacho Dinámico AHS</h2>
            <p className="text-xs text-slate-400">Optimización de Ciclos de Transportabilidad y Carga en Mina</p>
          </div>
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-mono font-bold">
            Eficiencia: {data.algoritmoDespacho.eficienciaCicloPct}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.algoritmoDespacho.flotaAsignada.map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-800 rounded border border-slate-700">
              <span className="text-xs font-mono font-bold text-cyan-400">{item.equipo_id}</span>
              <p className="text-xs text-slate-300 mt-1">Origen: {item.pala_asignada}</p>
              <p className="text-xs text-slate-300">Destino: {item.destino_botadero}</p>
              <p className="text-xs font-bold text-amber-400 mt-1">Carga: {item.carga_toneladas} Ton</p>
            </div>
          ))}
        </div>
      </div>

      {/* RELAVES GISTM */}
      <div className="p-6 bg-slate-900 text-white rounded-xl border border-emerald-500/30">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-emerald-400">🏔️ Monitoreo de Depósito de Relaves (GISTM)</h2>
            <p className="text-xs text-slate-400">Estabilidad Estructural, Piezometría y Aceleración Sísmica en Vivo</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono font-bold">
            {data.relavesGISTM.estandarNormativo}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.relavesGISTM.sensoresPiezometricos.map((sensor, idx) => (
            <div key={idx} className="p-4 bg-slate-800 rounded border border-slate-700 flex justify-between items-center">
              <div>
                <strong className="text-sm text-slate-100">{sensor.sensor_piezometro_id}</strong>
                <p className="text-xs text-slate-400 mt-1">Presión de Poros: <span className="text-slate-200">{sensor.presion_poros_kpa} kPa</span></p>
                <p className="text-xs text-slate-400">Nivel Freático: <span className="text-slate-200">{sensor.nivel_freatico_mts} m</span></p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-bold">
                {sensor.estado_muro}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};