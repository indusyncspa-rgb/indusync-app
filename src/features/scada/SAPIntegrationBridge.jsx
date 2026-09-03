import React from 'react';

export default function SAPIntegrationBridge() {
  const ordenesSAP = [
    { ot: 'OT-883921', equipo: 'MOLINO-SAG-01', tipo: 'PM02 Preventivo', prioridad: 'Alta', estado: 'Sincronizado SAP' },
    { ot: 'OT-883925', equipo: 'CAEX-104', tipo: 'PM01 Correctivo', prioridad: 'Crítica', estado: 'Pendiente Aprobación' },
    { ot: 'OT-883929', equipo: 'BOMBA-RELAVES-02', tipo: 'PM03 Inspección', prioridad: 'Media', estado: 'Sincronizado SAP' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2">
            🔄 Conector Automático SAP PM & OT
          </h2>
          <p className="text-xs text-slate-400">Puente bidireccional de Órdenes de Trabajo e Inventario de Repuestos.</p>
        </div>
        <button className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded text-xs font-mono transition">
          Forzar Sync SAP S/4HANA
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
          Órdenes de Trabajo Generadas Automáticamente por IA
        </h3>
        <div className="space-y-2 font-mono text-xs">
          {ordenesSAP.map(o => (
            <div key={o.ot} className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-bold">{o.ot}</span>
                <span className="text-slate-200">{o.equipo}</span>
                <span className="text-slate-500">({o.tipo})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[10px] ${o.prioridad === 'Crítica' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
                  {o.prioridad}
                </span>
                <span className="text-emerald-400">{o.estado}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}