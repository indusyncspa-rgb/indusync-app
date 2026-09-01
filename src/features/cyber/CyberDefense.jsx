import React, { useState, useEffect } from 'react';
import { telemetryService } from '../../services/telemetryService';

export default function CyberDefense() {
  const [data, setData] = useState(() => telemetryService.getCurrentData());

  useEffect(() => {
    const unsubscribe = telemetryService.subscribe((newData) => {
      setData(newData);
    });
    return () => unsubscribe();
  }, []);

  const cyber = data?.cyber || {
    threatLevel: 'DEFCON 3 - Elevado',
    blockedAttacksToday: 1420,
    activeAnomalies: 2,
    otFirewallStatus: 'Protegido',
    scadaIntegrity: 99.8,
    recentLogs: []
  };

  const recentLogs = cyber.recentLogs || [];

  return (
    <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-2">
        <div>
          <h2 className="text-xl font-bold text-red-400 flex items-center gap-2">
            🛡️ Centro de Defensa Ciber-OT & Redes SCADA
          </h2>
          <p className="text-xs text-slate-400">Protección perimetral de PLC, Sensores IoT e Infraestructura Critica</p>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded-full text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          {cyber.threatLevel}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Ataques Bloqueados (24h)</span>
          <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">{cyber.blockedAttacksToday}</div>
        </div>
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Anomalías Activas</span>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">{cyber.activeAnomalies} Eventos</div>
        </div>
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Firewall OT / Modbus</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">{cyber.otFirewallStatus}</div>
        </div>
        <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400">Integridad Protocolo SCADA</span>
          <div className="text-2xl font-bold text-purple-400 font-mono mt-1">{cyber.scadaIntegrity}%</div>
        </div>
      </div>

      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
        <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
          📡 Log de Eventos de Seguridad en Tiempo Real
        </h3>
        <div className="space-y-2 font-mono text-xs">
          {recentLogs.map((log, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/60 p-2.5 rounded border border-slate-800/80 gap-1">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">{log.time}</span>
                <span className="text-cyan-400 font-bold">[{log.source}]</span>
                <span className="text-slate-200">{log.event}</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                log.severity === 'Alta' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                log.severity === 'Media' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {log.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}