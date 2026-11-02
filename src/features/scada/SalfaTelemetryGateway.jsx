import React from 'react';

export default function SalfaTelemetryGateway() {
  return (
    <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl font-sans text-slate-100 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
          📡 SALFA <span className="text-cyan-400">TELEMETRY GATEWAY</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Monitor de Ingesta Híbrida y Salud de Nodos Edge (Dead-Man Switch)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Capa Base */}
        <div className="bg-slate-950/50 p-5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capa Base (API/Webhook)</h3>
          </div>
          <p className="text-2xl font-black text-slate-200 font-mono mt-2">1,240 <span className="text-xs text-slate-500">Unidades</span></p>
          <p className="text-[10px] text-slate-500 mt-1">MIGPS / Drivetech • Latencia 500ms+</p>
        </div>

        {/* Capa Activa */}
        <div className="bg-slate-950/50 p-5 rounded-xl border border-cyan-900/50 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-wider">Capa Activa (Caja Negra)</h3>
          </div>
          <p className="text-2xl font-black text-cyan-300 font-mono mt-2">315 <span className="text-xs text-cyan-900">Nodos Edge</span></p>
          <p className="text-[10px] text-cyan-600 mt-1">Socket Directo • Latencia Sub-50ms</p>
        </div>

        {/* Nodos Offline / Buffer */}
        <div className="bg-slate-950/50 p-5 rounded-xl border border-amber-900/50">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wider">Buffer Flash (Zona Sombra)</h3>
          </div>
          <p className="text-2xl font-black text-amber-400 font-mono mt-2">12 <span className="text-xs text-amber-900">Desconectados</span></p>
          <p className="text-[10px] text-amber-600 mt-1">Almacenando telemetría localmente</p>
        </div>
      </div>

      {/* Terminal de Eventos Log */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[10px] h-48 overflow-y-auto space-y-2">
        <div className="text-slate-500 mb-2 border-b border-slate-800 pb-1">LIVE INGESTION LOG (ÚLTIMOS EVENTOS)</div>
        <div className="text-slate-300"><span className="text-cyan-500">[19:42:01]</span> NODE_S4092: Cambio de red detectado (LTE-M -{">"} Satélite).</div>
        <div className="text-slate-300"><span className="text-amber-500">[19:41:55]</span> NODE_S3100: Entrando a zona sin cobertura. Buffer Flash iniciado.</div>
        <div className="text-slate-300"><span className="text-blue-500">[19:41:40]</span> WEBHOOK_MIGPS: Batch de 450 posiciones procesado con éxito.</div>
        <div className="text-slate-300"><span className="text-emerald-500">[19:41:15]</span> NODE_S4105: Telemetría normal. Voltaje 13.8V.</div>
      </div>
    </div>
  );
}