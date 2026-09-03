import React, { useState, useEffect } from 'react';

export default function Telemetry() {
  const [vibracion, setVibracion] = useState(2.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setVibracion(prev => Number((prev + (Math.random() * 0.4 - 0.2)).toFixed(2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2">
            ⚡ SCADA Telemetría OT en Tiempo Real
          </h2>
          <p className="text-xs text-slate-400">Captura remota de sensores OPC-UA y Modbus TCP.</p>
        </div>
        <span className="text-xs font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800 px-3 py-1 rounded">
          Sincronizado vía MQTT
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl font-mono">
          <p className="text-xs text-slate-400">VIBRACION SAG-01</p>
          <h3 className="text-3xl font-bold text-cyan-400 mt-2">{vibracion} <span className="text-xs font-normal text-slate-400">mm/s</span></h3>
          <p className="text-[10px] text-emerald-400 mt-1">✓ Dentro de umbral de ISO 10816</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl font-mono">
          <p className="text-xs text-slate-400">PRESION HIDRAULICA</p>
          <h3 className="text-3xl font-bold text-emerald-400 mt-2">185.4 <span className="text-xs font-normal text-slate-400">BAR</span></h3>
          <p className="text-[10px] text-emerald-400 mt-1">✓ Sistema estable</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl font-mono">
          <p className="text-xs text-slate-400">FLUJO DE AGUA RECIRCULADA</p>
          <h3 className="text-3xl font-bold text-cyan-400 mt-2">1,240 <span className="text-xs font-normal text-slate-400">L/s</span></h3>
          <p className="text-[10px] text-cyan-400 mt-1">✓ Eficiencia H2O: 92%</p>
        </div>
      </div>
    </div>
  );
}