// src/features/mina/ChancadoraInterlockView.jsx
import React, { useState, useEffect } from 'react';

export default function ChancadoraInterlockView() {
  const [status, setStatus] = useState('NORMAL'); // 'NORMAL' | 'WARNING' | 'TRIPPED'
  const [latency, setLatency] = useState(12); // ms
  const [volumeIntrusion, setVolumeIntrusion] = useState(0); // %
  const [interlockActive, setInterlockActive] = useState(true);
  const [sensorFPS, setSensorFPS] = useState(60);
  const [logs, setLogs] = useState([
    { id: 1, time: '22:50:01', msg: 'Sistema Interlock Volumétrico Chancador Primario OK (Latency: 11ms)', type: 'info' },
    { id: 2, time: '22:50:15', msg: 'Malla Digital Edge AI Calibrada - Garganta Chancador No. 1', type: 'info' }
  ]);

  // Simulación de fluctuaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Simular pequeñas variaciones de latencia de cómputo en Borde
      setLatency(Math.floor(Math.random() * 6) + 10); // 10ms - 15ms
      setSensorFPS(Math.floor(Math.random() * 3) + 59);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Simular evento de intrusión / caída de sobretamaño en Garganta
  const triggerIntrusionSim = (type) => {
    if (type === 'INTRUSION') {
      setStatus('TRIPPED');
      setVolumeIntrusion(88);
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        msg: '🚨 ALERTA CRÍTICA: Intrusión Humana / Cuerpo Extraño en Garganta de Chancado. INTERLOCK OPC UA ACTIVADO (<14ms). Corte de energía Apron Feeder.',
        type: 'danger'
      };
      setLogs((prev) => [newLog, ...prev]);
    } else if (type === 'OVERSIZE') {
      setStatus('WARNING');
      setVolumeIntrusion(45);
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        msg: '⚠️ ADVERTENCIA: Roca Sobretamaño / Colpa detectada por Malla Volumétrica 3D. Ajustando velocidad de alimentación.',
        type: 'warning'
      };
      setLogs((prev) => [newLog, ...prev]);
    } else {
      setStatus('NORMAL');
      setVolumeIntrusion(0);
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        msg: '✅ Estado normal restablecido. Interlock rearmado y Malla de Seguridad Activa.',
        type: 'info'
      };
      setLogs((prev) => [newLog, ...prev]);
    }
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-slate-100 font-sans space-y-6">
      {/* HEADER EXECUTIVO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 text-2xl">⚡</span>
            <div>
              <h1 className="text-xl font-bold tracking-wider text-white">CHANCADORA PRIMARIA - INTERLOCK VOLUMÉTRICO EDGE</h1>
              <p className="text-xs text-slate-400 font-mono">Boca de Chancado No. 1 | Control de Riesgo Fatal & Bloqueo Autónomo</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right font-mono">
            <div className="text-xs text-slate-400">LATENCIA EDGE</div>
            <div className="text-lg font-bold text-cyan-400">{latency} ms</div>
          </div>

          <div className={`px-4 py-2 rounded-xl text-xs font-bold font-mono border flex items-center gap-2 ${
            status === 'NORMAL' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
            status === 'WARNING' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
            'bg-rose-500/20 text-rose-400 border-rose-500/50 animate-pulse'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${
              status === 'NORMAL' ? 'bg-emerald-400' :
              status === 'WARNING' ? 'bg-amber-400' : 'bg-rose-500 animate-ping'
            }`} />
            <span>{status === 'NORMAL' ? 'LÍNEA DE FUEGO SEGURA' : status === 'WARNING' ? 'ALERTA DE VOLUMEN' : 'INTERLOCK TRIPPED - DETENCIÓN CERO'}</span>
          </div>
        </div>
      </div>

      {/* DASHBOARD GRID SIMULATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* PANEL VISUAL DE CHANCADOR Y MALLA HOLOGRÁFICA */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
          {/* Malla Volumétrica visual */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/20 to-slate-950 pointer-events-none" />
          
          <div className="flex justify-between items-center z-10 font-mono text-xs">
            <span className="text-slate-400 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
              📷 CAMERA EDGE AI #01 - LÍNEA DE FUEGO
            </span>
            <span className="text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-lg border border-cyan-800">
              FPS: {sensorFPS} | RESOLUTION: 4K 120FPS
            </span>
          </div>

          {/* SIMULACIÓN VISUAL DEL CHANCADOR EN VIVO */}
          <div className="my-8 relative flex flex-col items-center justify-center border-2 border-dashed border-cyan-500/30 rounded-2xl p-8 bg-slate-950/50 backdrop-blur-sm">
            <div className={`w-48 h-32 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
              status === 'TRIPPED' ? 'border-rose-500 bg-rose-950/30 shadow-[0_0_50px_rgba(244,63,94,0.3)]' :
              status === 'WARNING' ? 'border-amber-500 bg-amber-950/20' :
              'border-cyan-500/50 bg-cyan-950/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
            }`}>
              <span className="text-4xl mb-2">{status === 'TRIPPED' ? '🚨' : status === 'WARNING' ? '🧱' : '⚙️'}</span>
              <span className="text-xs font-mono font-bold tracking-widest text-slate-300">
                {status === 'TRIPPED' ? 'EQUIPO BLOQUEADO' : 'GARGANTA CHANCADOR'}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono mt-1">
                VOLUMEN INTRUSIÓN: {volumeIntrusion}%
              </span>
            </div>

            {/* Malla de exclusión holográfica */}
            <div className="mt-4 text-center font-mono text-xs text-slate-400">
              [ MALLA DIGITAL 3D DE EXCLUSIÓN ACTIVA EN ABERTURA DE CHANCADO ]
            </div>
          </div>

          {/* CONTROLES DE SIMULACIÓN PARA REUNIÓN COMERCIAL */}
          <div className="z-10 bg-slate-950/90 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-slate-300 font-bold">🧪 SIMULAR PRUEBA EN VIVO:</span>
            <div className="flex gap-2">
              <button
                onClick={() => triggerIntrusionSim('INTRUSION')}
                className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-rose-900/30"
              >
                🚨 Simular Intrusión Humana
              </button>
              <button
                onClick={() => triggerIntrusionSim('OVERSIZE')}
                className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-all"
              >
                🧱 Simular Sobretamaño Colpa
              </button>
              <button
                onClick={() => triggerIntrusionSim('RESET')}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all"
              >
                ✅ Rearmar Sistema
              </button>
            </div>
          </div>
        </div>

        {/* METRICAS Y LOGS HARDWARE DE INTERLOCK */}
        <div className="space-y-6">
          {/* HARDWARE INTERLOCK STATE */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center justify-between">
              <span>🔒 ESTADO INTERLOCK HARDWARE</span>
              <span className="text-xs text-cyan-400">OPC UA / MODBUS</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Alimentador Apron Feeder:</span>
                <span className={`font-bold ${status === 'TRIPPED' ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {status === 'TRIPPED' ? 'CORTADO (TRIPPED)' : 'EN OPERACIÓN'}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Tiempo Respuesta Ciber-Físico:</span>
                <span className="font-bold text-cyan-400">&lt; 15 Milisegundos</span>
              </div>

              <div className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Protocolo Seguridad OT:</span>
                <span className="font-bold text-purple-400">IEC 62443 / SIL-3</span>
              </div>
            </div>
          </div>

          {/* LOGS DE EVENTOS EN TIEMPO REAL */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-slate-200 font-mono">📋 REGISTRO INALTERABLE EDGE</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto font-mono text-[11px] pr-1">
              {logs.map((log) => (
                <div key={log.id} className={`p-2.5 rounded-lg border ${
                  log.type === 'danger' ? 'bg-rose-950/40 text-rose-300 border-rose-800/50' :
                  log.type === 'warning' ? 'bg-amber-950/30 text-amber-300 border-amber-800/40' :
                  'bg-slate-950 text-slate-300 border-slate-800'
                }`}>
                  <div className="text-[10px] text-slate-500 font-bold">{log.time}</div>
                  <div>{log.msg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}