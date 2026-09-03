import React, { useState } from 'react';

export default function GeospatialFleetTracker() {
  const [camiones] = useState([
    { id: 'CAEX-101', vel: '28 km/h', carga: '290 t', combustible: '82%', estado: 'En Ruta', driver: 'Autónomo Level 4' },
    { id: 'CAEX-102', vel: '0 km/h', carga: '0 t', combustible: '91%', estado: 'En Carguío', driver: 'M. González' },
    { id: 'CAEX-103', vel: '34 km/h', carga: '310 t', combustible: '45%', estado: 'En Ruta', driver: 'Autónomo Level 4' },
    { id: 'CAEX-104', vel: '12 km/h', carga: '295 t', combustible: '68%', estado: 'En Acolchado', driver: 'R. Tapia' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            📡 Radar Geospatial & Telemetría Tele-Operada
          </h3>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800 px-3 py-1 rounded">
            GPS RTK Precisión Centimétrica
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Unidad</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Velocidad</th>
                <th className="p-3">Payload</th>
                <th className="p-3">Combustible</th>
                <th className="p-3">Operador</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {camiones.map((c) => (
                <tr key={c.id} className="hover:bg-slate-850/50 transition">
                  <td className="p-3 font-bold text-cyan-400">{c.id}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                      {c.estado}
                    </span>
                  </td>
                  <td className="p-3 text-slate-200">{c.vel}</td>
                  <td className="p-3 text-emerald-400">{c.carga}</td>
                  <td className="p-3 text-slate-300">{c.combustible}</td>
                  <td className="p-3 text-slate-400">{c.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}