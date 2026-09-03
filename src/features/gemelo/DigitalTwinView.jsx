import React, { useState } from 'react';

export default function DigitalTwinView() {
  const [nodoSeleccionado, setNodoSeleccionado] = useState('Chancador Primario');

  const nodos = [
    { id: 'Chancador Primario', kpi: 'Rendimiento: 92%', temp: '68°C', estado: 'Normal', riesgo: 'Bajo' },
    { id: 'Correa Transportadora 01', kpi: 'Velocidad: 4.2 m/s', temp: '42°C', estado: 'Normal', riesgo: 'Bajo' },
    { id: 'Molino SAG 01', kpi: 'Carga: 84%', temp: '85°C', estado: 'Alerta Vibración', riesgo: 'Medio' },
    { id: 'Celda Flotación A', kpi: 'pH: 10.4', temp: '24°C', estado: 'Optimo', riesgo: 'Bajo' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2">
            🌐 Gemelo Digital: Planta Concentradora
          </h2>
          <p className="text-xs text-slate-400">Modelo tridimensional sincronizado en milisegundos con sensores de planta.</p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">Render 3D en Vivo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Simulado 3D */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-6 min-h-[320px] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative z-10 flex justify-between items-center">
            <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded border border-slate-800">
              Vista Activa: <strong className="text-cyan-400">{nodoSeleccionado}</strong>
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
              FPS: 60 | Latencia: 8ms
            </span>
          </div>

          <div className="relative z-10 my-auto text-center py-12">
            <div className="inline-block p-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-4xl mb-3 animate-pulse">
              ⚙️
            </div>
            <p className="text-xs font-mono text-slate-400">Renderizado esquemático interactivo del componente industrial</p>
          </div>

          <div className="relative z-10 flex gap-2 overflow-x-auto pb-1">
            {nodos.map(n => (
              <button
                key={n.id}
                onClick={() => setNodoSeleccionado(n.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap transition border ${
                  nodoSeleccionado === n.id
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {n.id}
              </button>
            ))}
          </div>
        </div>

        {/* Telemetría del Nodo Seleccionado */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-2">
            Diagnóstico Predictivo
          </h3>
          {nodos.filter(n => n.id === nodoSeleccionado).map(n => (
            <div key={n.id} className="space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Métrica Principal:</span>
                <span className="text-emerald-400 font-bold">{n.kpi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Temperatura Operativa:</span>
                <span className="text-cyan-400 font-bold">{n.temp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estado Diagnóstico:</span>
                <span className="text-amber-400 font-bold">{n.estado}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Nivel de Riesgo IA:</span>
                <span className="text-slate-200">{n.riesgo}</span>
              </div>
              <button className="w-full mt-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-xs transition">
                Simular Falla / Stress Test
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}