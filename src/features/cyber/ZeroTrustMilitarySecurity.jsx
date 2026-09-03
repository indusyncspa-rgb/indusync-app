import React, { useState } from 'react';

export default function ZeroTrustMilitarySecurity() {
  const [threatLevel, setThreatLevel] = useState('VERDE');

  const eventosSeguridad = [
    { id: 'SEC-901', origen: 'IP 192.168.4.12 (Subestación 3)', tipo: 'Intento de Acceso No Autorizado', accion: 'Bloqueado Automáticamente', tiempo: 'Hace 4 min' },
    { id: 'SEC-902', origen: 'Módulo IoT Edge CAEX-108', tipo: 'Firma de Firmware Inválida', accion: 'Aislamiento de Red OT', tiempo: 'Hace 18 min' },
    { id: 'SEC-903', origen: 'Usuario j.perez@contratista.cl', tipo: 'Intento Escalado Privilegios', accion: 'Token Revocado', tiempo: 'Hace 1 hora' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2">
            🛡️ Seguridad OT/IT Zero-Trust (IEC 62443)
          </h2>
          <p className="text-xs text-slate-400">Protección perimetral militar y aislamiento dinámico de micro-segmentos OT.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400">Nivel de Amenaza:</span>
          <span className={`px-3 py-1 font-mono font-bold text-xs rounded border ${
            threatLevel === 'VERDE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
          }`}>
            DEFCON 5 / {threatLevel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400">DISPOSITIVOS OT AUTENTICADOS</span>
          <h3 className="text-2xl font-bold text-cyan-400 mt-1">1,420 / 1,420</h3>
          <span className="text-[10px] text-emerald-400">✓ Certificados mTLS Activos</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400">INTENTOS DE INTRUSION (24h)</span>
          <h3 className="text-2xl font-bold text-emerald-400 mt-1">142 Bloqueados</h3>
          <span className="text-[10px] text-emerald-400">✓ 0 Brechas Detectadas</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
          <span className="text-slate-400">ESTADO ENCRIPTACION</span>
          <h3 className="text-2xl font-bold text-slate-200 mt-1">AES-256 GCM</h3>
          <span className="text-[10px] text-cyan-400">Túneles IPSec Activos</span>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
          Logs de Eventos y Mitigación en Tiempo Real
        </h3>
        <div className="space-y-2 font-mono text-xs">
          {eventosSeguridad.map(ev => (
            <div key={ev.id} className="bg-slate-950/80 border border-slate-800 p-3 rounded-lg flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="text-rose-400 font-bold">{ev.id}</span>
                <span className="text-slate-300">{ev.origen}</span>
                <span className="text-slate-500">({ev.tipo})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">{ev.accion}</span>
                <span className="text-slate-500 text-[10px]">{ev.tiempo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}