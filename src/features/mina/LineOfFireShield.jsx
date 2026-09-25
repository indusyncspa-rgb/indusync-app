import React, { useState, useEffect, useRef } from 'react';

export default function LineOfFireShield({ isOnline = true }) {
  // Estado de Invasión de Perímetro
  const [isInvasion, setIsInvasion] = useState(false);
  const [interlockActive, setInterlockActive] = useState(false);
  const [audioAlertActive, setAudioAlertActive] = useState(false);
  const [offlineEventBuffer, setOfflineEventBuffer] = useState(() => {
    try {
      const saved = localStorage.getItem('indusync_offline_line_of_fire_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Métricas de Procesamiento Edge Local (Offline)
  const [fps, setFps] = useState(60);
  const [inferenceLatency, setInferenceLatency] = useState(12); // 12ms local TensorRT

  // Alerta Sonora Sintetizada Local (Hardware Speaker / Web Speech API)
  const triggerLocalAcousticAlert = (textMessage) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancelar previos
      const utterance = new SpeechSynthesisUtterance(textMessage);
      utterance.lang = 'es-CL';
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Disparo de Emergencia / Invasión
  const handleSimulateInvasion = () => {
    const newInvasionState = !isInvasion;
    setIsInvasion(newInvasionState);

    const timestamp = new Date().toLocaleTimeString('es-CL');

    if (newInvasionState) {
      setInterlockActive(true);
      setAudioAlertActive(true);

      // 🔊 Disparo de Parlante Físico en Terreno
      triggerLocalAcousticAlert(
        "¡ALERTA CRÍTICA! Invasión de Línea de Fuego detectada en Pala 01. Abandone la zona de riesgo inmediatamente."
      );

      // 💾 Log Local Inmutable (Búfer Off-Grid)
      const eventLog = {
        id: `EVT-LOF-${Date.now()}`,
        timestamp,
        equipment: 'Pala de Extracción Bucyrus 495HR',
        zone: 'Perímetro Giratorio / Capó Trasero',
        actionTaken: 'TRIP_OPC_UA_HYDRAULIC_VALVE',
        syncStatus: isOnline ? 'CLOUD_SYNCED' : 'STORED_IN_EDGE_BUFFER'
      };

      const updatedBuffer = [eventLog, ...offlineEventBuffer.slice(0, 9)];
      setOfflineEventBuffer(updatedBuffer);
      try {
        localStorage.setItem('indusync_offline_line_of_fire_logs', JSON.stringify(updatedBuffer));
      } catch (e) {
        console.warn('Búfer local completo');
      }
    } else {
      setInterlockActive(false);
      setAudioAlertActive(false);
      triggerLocalAcousticAlert("Zona de riesgo normalizada. Perímetro seguro.");
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ENCABEZADO Y ESTADO OFF-GRID */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            ⚡ MODO EDGE OFF-GRID (100% AUTÓNOMO)
          </span>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
            🛡️ Shield IA: Perímetro Digital & Línea de Fuego
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Sistema de interlock cibernético-físico autónomo en sitio. Inferencia de visión por computadora en Edge (<span className="text-cyan-400 font-mono font-bold">{inferenceLatency}ms</span>) sin dependencia de internet o nube.
          </p>
        </div>

        {/* METRICAS DEL EDGE NODE LOCAL */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Procesamiento Local Edge</span>
            <div className="text-lg font-black text-cyan-400 font-mono mt-0.5">NVIDIA Jetson / TensorRT</div>
            <span className="text-[10px] text-slate-500">Cero Latencia Cloud</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Interlock OPC UA OT</span>
            <div className={`text-lg font-black font-mono mt-0.5 ${interlockActive ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
              {interlockActive ? 'BLOQUEO ACTIVO (TRIPPED)' : 'SISTEMA ARMED'}
            </div>
            <span className="text-[10px] text-slate-500">Relé Físico Válvula Hidráulica</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Sirena / Parlante Campo</span>
            <div className={`text-lg font-black font-mono mt-0.5 ${audioAlertActive ? 'text-amber-400' : 'text-slate-400'}`}>
              {audioAlertActive ? '🔊 EMITIENDO ALERTA' : '🔇 MUTE (STANDBY)'}
            </div>
            <span className="text-[10px] text-slate-500">Disuasión Acústica 110dB</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Búfer de Eventos Off-Grid</span>
            <div className="text-lg font-black text-purple-400 font-mono mt-0.5">{offlineEventBuffer.length} Eventos</div>
            <span className="text-[10px] text-slate-500">Resguardo Local SQLite/LevelDB</span>
          </div>
        </div>
      </div>

      {/* PANEL DE SIMULACIÓN VISUAL EN TIEMPO REAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MONITOR FEED VIDEO CON DERECHO DE VISUALIZACIÓN BARRICADA DIGITAL */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800 pb-3">
            <span className="text-slate-300 font-bold flex items-center gap-2">
              📹 CÁMARA RUGGERIZADA IP69K — PALA DE EXTRACCIÓN 01 (BAHÍA MANTENCIÓN)
            </span>
            <span className="text-cyan-400 font-mono">{fps} FPS | Res: 1080p @ Edge</span>
          </div>

          {/* SIMULADOR DE FEED DE VIDEO */}
          <div className={`relative h-80 rounded-xl overflow-hidden border-2 transition-all duration-300 flex items-center justify-center ${
            isInvasion 
              ? 'border-rose-600 bg-rose-950/30 ring-4 ring-rose-600/40' 
              : 'border-cyan-500/40 bg-slate-900/80'
          }`}>
            {/* MARCA DE AGUA LÍNEA DE FUEGO */}
            <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

            {/* ZONA DE PERÍMETRO DIBUJADA EN PANTALLA */}
            <div className={`absolute w-3/4 h-3/4 border-2 border-dashed rounded-xl transition-all duration-300 flex flex-col justify-between p-4 ${
              isInvasion ? 'border-rose-500 bg-rose-500/10 animate-pulse' : 'border-amber-400/60 bg-amber-400/5'
            }`}>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded w-fit ${
                isInvasion ? 'bg-rose-600 text-white' : 'bg-amber-400/20 text-amber-300'
              }`}>
                {isInvasion ? '🚨 DANGER: LÍNEA DE FUEGO VIOLADA' : '⚠️ ZONA DE EXCLUSIÓN INTERLOCK LOTO'}
              </span>

              {/* SILUETA/INDICADOR DE OPERADOR */}
              <div className="flex justify-center items-center">
                {isInvasion ? (
                  <div className="bg-rose-600/90 text-white font-mono text-xs font-bold px-4 py-2 rounded-xl border border-rose-400 animate-bounce flex items-center gap-2 shadow-2xl">
                    <span className="text-xl">👷‍♂️</span> ¡INTRUSO EN LÍNEA DE FUEGO DE PALA!
                  </div>
                ) : (
                  <div className="text-slate-500 font-mono text-xs flex items-center gap-2">
                    <span>🟢 ÁREA DE INTERVENCIÓN DESPEJADA</span>
                  </div>
                )}
              </div>

              <div className="text-right text-[10px] font-mono text-slate-400">
                LOTO VALIDATED: {isInvasion ? 'NO (VIOLATION)' : 'YES (ZERO ENERGY)'}
              </div>
            </div>

            {/* BOTÓN INTERACTIVO DE SIMULACIÓN DE INVASIÓN */}
            <button
              type="button"
              onClick={handleSimulateInvasion}
              className={`absolute bottom-4 right-4 px-5 py-2.5 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all duration-300 shadow-xl cursor-pointer ${
                isInvasion
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/50'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/50 animate-pulse'
              }`}
            >
              {isInvasion ? '✅ Restablecer Zona Segura' : '🚨 Simular Invasión de Trabajador'}
            </button>
          </div>
        </div>

        {/* CONTROLES OT Y BÚFER DE AUDITORÍA LOCAL */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider">
              ⚙️ Estado Interlock OT (PLC / OPC UA)
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Solenoide Hidráulico:</span>
                <span className={`font-bold ${interlockActive ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {interlockActive ? 'TRIPPED (DISPARADO)' : 'OPEN (NORMAL)'}
                </span>
              </div>

              <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Verificación LOTO:</span>
                <span className="text-cyan-400 font-bold">DIGITAL BLOCK ACTIVE</span>
              </div>

              <div className="flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400">Respuesta Local:</span>
                <span className="text-emerald-400 font-bold">&lt; 15 ms (Inmediato)</span>
              </div>
            </div>
          </div>

          {/* HISTORIAL LOCAL OFF-GRID */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
            <h3 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider flex justify-between items-center">
              <span>💾 Registro Local Off-Grid</span>
              <span className="text-[10px] text-purple-400 font-normal">Autónomo</span>
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {offlineEventBuffer.length === 0 ? (
                <div className="p-3 text-center text-slate-500 text-xs font-mono">
                  Sin eventos de intrusión registrados localmente.
                </div>
              ) : (
                offlineEventBuffer.map((evt) => (
                  <div key={evt.id} className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono space-y-1">
                    <div className="flex justify-between text-rose-400 font-bold">
                      <span>{evt.timestamp}</span>
                      <span>INVASIÓN DETECTADA</span>
                    </div>
                    <div className="text-slate-400 text-[10px]">{evt.equipment}</div>
                    <div className="text-emerald-400 text-[9px] font-bold">{evt.actionTaken}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}