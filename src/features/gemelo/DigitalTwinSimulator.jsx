import React, { useState, useEffect, useRef } from 'react';

export default function DigitalTwinSimulator() {
  // Estado de Telemetría en Tiempo Real (Milisegundos)
  const [telemetry, setTelemetry] = useState({
    tonnage: 4250,      // tph (Toneladas por hora)
    sagSpeed: 9.4,      // RPM
    bearingPressure: 142.5, // Bar
    vibration: 2.1,     // mm/s RMS
    powerKW: 24800,     // kW
    p80Size: 152,       // micrones (Granulometría)
    waterFlow: 3100,    // m3/h
  });

  const [aiAutopilot, setAiAutopilot] = useState(true);
  const [latencyMs, setLatencyMs] = useState(8);
  const [interventions, setInterventions] = useState([]);
  const [status, setStatus] = useState('NOMINAL'); // NOMINAL | WARNING | CRITICAL

  // Bucle de Alta Frecuencia (Edge AI Pipeline)
  useEffect(() => {
    const interval = setInterval(() => {
      const startTime = performance.now();

      setTelemetry((prev) => {
        // Variación estocástica de sensores
        const noiseVib = (Math.random() - 0.48) * 0.15;
        const noisePress = (Math.random() - 0.48) * 0.8;
        
        let newVib = Math.max(0.5, prev.vibration + noiseVib);
        let newPress = Math.max(100, prev.bearingPressure + noisePress);
        let newTonnage = prev.tonnage;
        let newWater = prev.waterFlow;
        let newSpeed = prev.sagSpeed;

        // Evaluación Prescriptiva IA en < 15ms
        let currentStatus = 'NOMINAL';
        if (newPress > 150 || newVib > 3.2) {
          currentStatus = 'CRITICAL';
        } else if (newPress > 145 || newVib > 2.6) {
          currentStatus = 'WARNING';
        }

        // Acciones Autónomas de la IA
        if (aiAutopilot && currentStatus !== 'NOMINAL') {
          // Ajuste fino para evitar Embancamiento
          newWater = Math.min(3600, prev.waterFlow + 45);
          newSpeed = Math.max(8.2, prev.sagSpeed - 0.1);
          newTonnage = Math.max(3800, prev.tonnage - 30);

          const timeStr = new Date().toLocaleTimeString('es-CL');
          setInterventions((logs) => [
            `⚡ [${timeStr}] AI INFER_12ms: Inyección de Agua (+45 m³/h) y reducción RPM (${newSpeed.toFixed(1)}) por alza de presión.`,
            ...logs.slice(0, 3)
          ]);
        }

        const endTime = performance.now();
        setLatencyMs(Math.round((endTime - startTime) * 10) / 10 + 4);
        setStatus(currentStatus);

        return {
          ...prev,
          vibration: parseFloat(newVib.toFixed(2)),
          bearingPressure: parseFloat(newPress.toFixed(1)),
          tonnage: Math.round(newTonnage),
          waterFlow: Math.round(newWater),
          sagSpeed: parseFloat(newSpeed.toFixed(1)),
          powerKW: Math.round(newTonnage * 5.82 + newSpeed * 120),
        };
      });
    }, 150); // Actualización streaming a 150ms

    return () => clearInterval(interval);
  }, [aiAutopilot]);

  return (
    <div className="space-y-6">
      {/* Header del Gemelo Digital */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-slate-100 tracking-wide uppercase">
              Gemelo Digital: Molino SAG 01
            </h2>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest ${
              status === 'NOMINAL' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
              status === 'WARNING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
              'bg-rose-500/20 text-rose-400 border border-rose-500/50 animate-pulse'
            }`}>
              {status}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Procesamiento en el Borde | Motor Neuronal Prescriptivo ultra-rápido
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400">
            Latencia Inferencia: <span className="text-cyan-400 font-bold">{latencyMs} ms</span>
          </div>
          <button
            onClick={() => setAiAutopilot(!aiAutopilot)}
            className={`px-4 py-2 rounded-xl font-bold uppercase transition flex items-center gap-2 text-xs ${
              aiAutopilot
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${aiAutopilot ? 'bg-slate-950 animate-ping' : 'bg-slate-600'}`} />
            {aiAutopilot ? 'Piloto IA Activo' : 'Control Manual'}
          </button>
        </div>
      </div>

      {/* Grid de Sensores e Indicadores Clave */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Tratamiento (Throughput)</div>
          <div className="text-2xl font-black text-cyan-400 font-mono">{telemetry.tonnage} <span className="text-xs font-normal text-slate-400">tph</span></div>
          <div className="text-[10px] text-emerald-400">Target óptimo: 4,300 tph</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Velocidad Molino</div>
          <div className="text-2xl font-black text-slate-100 font-mono">{telemetry.sagSpeed} <span className="text-xs font-normal text-slate-400">RPM</span></div>
          <div className="text-[10px] text-slate-400">76.2% Velocidad Crítica</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Presión de Descanso</div>
          <div className={`text-2xl font-black font-mono ${telemetry.bearingPressure > 145 ? 'text-rose-400' : 'text-slate-100'}`}>
            {telemetry.bearingPressure} <span className="text-xs font-normal text-slate-400">Bar</span>
          </div>
          <div className="text-[10px] text-slate-400">Límite crítico: 152 Bar</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Vibración Estructural</div>
          <div className={`text-2xl font-black font-mono ${telemetry.vibration > 2.5 ? 'text-amber-400' : 'text-slate-100'}`}>
            {telemetry.vibration} <span className="text-xs font-normal text-slate-400">mm/s</span>
          </div>
          <div className="text-[10px] text-slate-400">Monitoreo piezoeléctrico</div>
        </div>
      </div>

      {/* Visualización Esquemática 2D/3D del Gemelo */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
            Render Dinámico de Carga y Flujo de Inyección
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            Consumo Específico: <strong className="text-cyan-400">{(telemetry.powerKW / telemetry.tonnage).toFixed(2)} kWh/t</strong>
          </span>
        </div>

        {/* Simulación Gráfica de Molino Rotatorio */}
        <div className="h-48 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-center relative overflow-hidden">
          <div className={`w-36 h-36 rounded-full border-4 ${
            status === 'CRITICAL' ? 'border-rose-500 animate-spin' :
            status === 'WARNING' ? 'border-amber-400 animate-spin' : 'border-cyan-500/80 animate-spin'
          } border-dashed flex items-center justify-center transition-all duration-300`}
          style={{ animationDuration: `${12 / telemetry.sagSpeed}s` }}
          >
            <div className="w-20 h-20 rounded-full bg-slate-900/90 border border-slate-700 flex flex-col items-center justify-center text-[10px] font-mono text-cyan-300">
              <span>{telemetry.p80Size} µm</span>
              <span className="text-[8px] text-slate-500">P80 Salida</span>
            </div>
          </div>

          <div className="absolute left-6 top-6 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono space-y-1">
            <div className="text-slate-400">Inyección Agua: <span className="text-cyan-300 font-bold">{telemetry.waterFlow} m³/h</span></div>
            <div className="text-slate-400">Potencia MW: <span className="text-emerald-400 font-bold">{(telemetry.powerKW / 1000).toFixed(2)} MW</span></div>
          </div>
        </div>
      </div>

      {/* Bitácora de Decisiones Prescriptivas Autónomas */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2">
        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
          🤖 Log de Intervenciones Prescriptivas IA (Sub-20ms)
        </h4>
        <div className="space-y-1.5 font-mono text-[11px]">
          {interventions.length === 0 ? (
            <div className="text-slate-500 italic p-2 bg-slate-950 rounded-lg">
              Operación nominal. No se requieren correcciones prescriptivas.
            </div>
          ) : (
            interventions.map((log, idx) => (
              <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-cyan-900/30 text-cyan-300">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}