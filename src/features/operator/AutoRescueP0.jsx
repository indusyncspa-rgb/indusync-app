import React, { useState, useEffect } from 'react';

export default function AutoRescueP0() {
  // Estado de los sensores en tiempo real
  const [status, setStatus] = useState('NORMAL'); // 'NORMAL' | 'ANOMALY_P0' | 'AUTO_RESCUE' | 'STABILIZED'
  const [telemetry, setTelemetry] = useState({
    sagTemp: 68.4,
    sagVib: 2.1,
    sagRpm: 9.8,
    sagLoad: 18.2,
    chancadorTemp: 52.1,
    chancadorVib: 1.8,
    correaTension: 94.5,
  });

  const [logs, setLogs] = useState([
    { id: 1, time: '22:10:04', type: 'INFO', msg: 'Sistema de telemetría SCADA operando con 1,420 nodos en banda ultra-ancha.' },
    { id: 2, time: '22:12:30', type: 'OK', msg: 'Modelo Predictivo LSTM calibrado: Probabilidad de falla P0 en 24h < 0.02%.' }
  ]);

  const [rescuedSavings, setRescuedSavings] = useState(0);

  // Simulación de fluctuaciones normales de sensores
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => {
        if (status === 'ANOMALY_P0') {
          return {
            sagTemp: Math.min(138.5, prev.sagTemp + (Math.random() * 4 + 2)),
            sagVib: Math.min(14.8, prev.sagVib + (Math.random() * 0.8 + 0.4)),
            sagRpm: prev.sagRpm,
            sagLoad: Math.min(24.5, prev.sagLoad + 0.3),
            chancadorTemp: Math.min(98.2, prev.chancadorTemp + 1.2),
            chancadorVib: Math.min(8.5, prev.chancadorVib + 0.3),
            correaTension: Math.min(115.0, prev.correaTension + 0.8),
          };
        } else if (status === 'AUTO_RESCUE') {
          return {
            sagTemp: Math.max(72.0, prev.sagTemp - (Math.random() * 5 + 3)),
            sagVib: Math.max(2.4, prev.sagVib - (Math.random() * 0.9 + 0.4)),
            sagRpm: 5.2, // Reducción de velocidad automática
            sagLoad: 11.0, // Alivio de carga
            chancadorTemp: Math.max(58.0, prev.chancadorTemp - 2.1),
            chancadorVib: Math.max(2.0, prev.chancadorVib - 0.4),
            correaTension: 92.0,
          };
        } else {
          // Normal jitter
          return {
            sagTemp: +(68.0 + Math.random() * 2.5).toFixed(1),
            sagVib: +(2.0 + Math.random() * 0.4).toFixed(1),
            sagRpm: 9.8,
            sagLoad: +(18.0 + Math.random() * 0.5).toFixed(1),
            chancadorTemp: +(52.0 + Math.random() * 1.5).toFixed(1),
            chancadorVib: +(1.8 + Math.random() * 0.3).toFixed(1),
            correaTension: +(94.0 + Math.random() * 1.0).toFixed(1),
          };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  // Disparar Simulación de Anomaly P0
  const triggerP0Event = () => {
    setStatus('ANOMALY_P0');
    const newLog = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      type: 'CRITICAL',
      msg: '🚨 ALERTA CRÍTICA P0: Pico térmico (>120°C) y vibración anómala detectada en Descanso Principal Molino SAG 01.'
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // Disparar Auto-Rescue por IA
  const executeAutoRescue = () => {
    setStatus('AUTO_RESCUE');
    setRescuedSavings((prev) => prev + 142500);

    const steps = [
      { delay: 500, msg: '⚡ [Paso 1/4] IA Intercepta control SCADA: Reducción de RPM de Molino SAG a 5.2 (Bypass de Carga Activo).' },
      { delay: 1500, msg: '❄️ [Paso 2/4] Activación de circuito auxiliar de lubricación helitransportado e inyección de nitrógeno.' },
      { delay: 2500, msg: '🔄 [Paso 3/4] Re-enrutamiento de alimentación de mineral hacia Stockpile de Reserva.' },
      { delay: 3500, msg: '✅ [Paso 4/4] Contención exitosa. Parámetros estabilizados sin detención no programada.' }
    ];

    steps.forEach(({ delay, msg }) => {
      setTimeout(() => {
        setLogs((prev) => [
          { id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), type: 'SUCCESS', msg },
          ...prev
        ]);
      }, delay);
    });

    setTimeout(() => {
      setStatus('STABILIZED');
    }, 4500);
  };

  // Resetear
  const resetSimulation = () => {
    setStatus('NORMAL');
    setLogs((prev) => [
      { id: Date.now(), time: new Date().toLocaleTimeString(), type: 'INFO', msg: 'Sistema restablecido a parámetros nominales.' },
      ...prev
    ]);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Cabecera del Módulo */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-red-500/20 text-red-400 border border-red-500/40 rounded text-[10px] font-mono font-bold">
              PROTECCIÓN OT IEC 62443 ACTIVE
            </span>
            <span className="text-xs text-slate-400 font-mono">Respuesta Autónoma &lt; 120ms</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">Gemelo Digital: Protocolo Auto-Rescue P0</h2>
          <p className="text-xs text-slate-400">Intervención autónoma por Inteligencia Artificial para evitar colapsos mecánicos P0.</p>
        </div>

        {/* Métrica de Dinero Salvado */}
        <div className="bg-slate-950 px-5 py-3 rounded-xl border border-emerald-500/30 flex items-center gap-4">
          <div className="text-3xl">🛡️</div>
          <div>
            <p className="text-[10px] text-slate-400 font-mono uppercase">Pérdida Catastrófica Evitada</p>
            <p className="text-2xl font-black text-emerald-400 font-mono">
              ${rescuedSavings.toLocaleString()} <span className="text-xs text-emerald-500/80 font-normal">USD</span>
            </p>
          </div>
        </div>
      </div>

      {/* Consola de Control de Simulación */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-300 font-bold font-mono">PANEL DE CONTROL DEL GEMELO DIGITAL:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={triggerP0Event}
            disabled={status === 'ANOMALY_P0' || status === 'AUTO_RESCUE'}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl transition shadow-lg shadow-red-600/20 flex items-center gap-2 cursor-pointer"
          >
            🚨 SIMULAR FALLA CRÍTICA P0 (MOLINO SAG)
          </button>

          <button
            onClick={executeAutoRescue}
            disabled={status !== 'ANOMALY_P0'}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 disabled:opacity-30 text-slate-950 font-black text-xs rounded-xl transition shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
          >
            ⚡ ACTIVAR AUTO-RESCUE AUTÓNOMO (IA)
          </button>

          <button
            onClick={resetSimulation}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            🔄 Restablecer Sensores
          </button>
        </div>
      </div>

      {/* Grid de Sensores de Equipos Críticos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Molino SAG 01 */}
        <div className={`p-5 rounded-2xl border transition-all duration-300 ${
          status === 'ANOMALY_P0'
            ? 'bg-red-950/30 border-red-500/80 shadow-2xl shadow-red-500/20 animate-pulse'
            : status === 'AUTO_RESCUE'
            ? 'bg-cyan-950/30 border-cyan-500/80 shadow-2xl shadow-cyan-500/20'
            : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400">EQUIPO CRÍTICO 01</span>
              <h3 className="text-base font-bold text-white">Molino SAG 01 (38' x 21')</h3>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              status === 'ANOMALY_P0' ? 'bg-red-500 text-white animate-bounce' :
              status === 'AUTO_RESCUE' ? 'bg-cyan-500 text-slate-950' :
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}>
              {status === 'ANOMALY_P0' ? '🚨 P0 CRITICAL' : status === 'AUTO_RESCUE' ? '⚡ RESCUING' : 'ONLINE'}
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Temp. Descanso Trunnion</span>
                <span className={telemetry.sagTemp > 100 ? 'text-red-400 font-bold' : 'text-slate-200'}>
                  {telemetry.sagTemp}°C
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    telemetry.sagTemp > 100 ? 'bg-red-500' : telemetry.sagTemp > 85 ? 'bg-amber-400' : 'bg-cyan-400'
                  }`}
                  style={{ width: `${Math.min(100, (telemetry.sagTemp / 140) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Vibración RMS</span>
                <span className={telemetry.sagVib > 8 ? 'text-red-400 font-bold' : 'text-slate-200'}>
                  {telemetry.sagVib} mm/s
                </span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    telemetry.sagVib > 8 ? 'bg-red-500' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.min(100, (telemetry.sagVib / 15) * 100)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <p className="text-slate-500">Velocidad RPM</p>
                <p className="text-white font-bold">{telemetry.sagRpm} RPM</p>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <p className="text-slate-500">Potencia (MW)</p>
                <p className="text-white font-bold">{telemetry.sagLoad} MW</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chancador Secundario CS-02 */}
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400">EQUIPO CRÍTICO 02</span>
              <h3 className="text-base font-bold text-white">Chancador Secundario CS-02</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              ONLINE
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Temp. Aceite Excéntrica</span>
                <span className="text-slate-200">{telemetry.chancadorTemp}°C</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, (telemetry.chancadorTemp / 110) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Vibración Chasis</span>
                <span className="text-slate-200">{telemetry.chancadorVib} mm/s</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, (telemetry.chancadorVib / 10) * 100)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <p className="text-slate-500">Presión Hidráulica</p>
                <p className="text-white font-bold">2,450 PSI</p>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <p className="text-slate-500">Apertura CSS</p>
                <p className="text-white font-bold">38 mm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Correa Transportadora CV-04 */}
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-mono text-slate-400">EQUIPO CRÍTICO 03</span>
              <h3 className="text-base font-bold text-white">Correa Principal CV-04</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              ONLINE
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Tensión Banda Polín</span>
                <span className="text-slate-200">{telemetry.correaTension}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-cyan-400 transition-all duration-500"
                  style={{ width: `${Math.min(100, telemetry.correaTension)}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] mt-8">
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <p className="text-slate-500">Flujo Mineral</p>
                <p className="text-white font-bold">4,120 TPH</p>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-800">
                <p className="text-slate-500">Alineación Cintas</p>
                <p className="text-emerald-400 font-bold">99.8% OK</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bitácora de Eventos de la IA en Vivo */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 font-mono">
          <span>📜</span> BITÁCORA DE INTERVENCIONES IA Y EVENTOS SCADA
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto font-mono text-xs pr-2">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-2.5 rounded-lg border flex items-start gap-3 ${
                log.type === 'CRITICAL'
                  ? 'bg-red-950/40 border-red-800/80 text-red-300'
                  : log.type === 'SUCCESS'
                  ? 'bg-cyan-950/40 border-cyan-800/80 text-cyan-300'
                  : log.type === 'OK'
                  ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <span className="text-[10px] text-slate-500 font-bold">{log.time}</span>
              <p className="flex-1">{log.msg}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}