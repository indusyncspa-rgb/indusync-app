import React, { useState, useEffect } from 'react';

export default function NotificationCenter() {
  const [eventos, setEventos] = useState([
    { id: 1, tipo: 'critico', modulo: 'SIAM Relaves', msj: 'Piezómetro P-14A: Presión dentro de rango (140.2 kPa)', hora: '11:10' },
    { id: 2, tipo: 'exito', modulo: 'Marketplace', msj: 'Nueva oferta recibida por $12,500 USD en Chatarra Ferrosa', hora: '11:05' },
    { id: 3, tipo: 'advertencia', modulo: 'Gemelo Digital', msj: 'SPI incrementó a 128 min en Fase 4 — Ajustando velocidad SAG', hora: '10:52' }
  ]);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    // Simulación de WebSocket / Supabase Realtime Event Stream
    const interval = setInterval(() => {
      const nuevosMsjs = [
        { tipo: 'exito', modulo: 'SAP PM', msj: 'Orden de Trabajo #49021 generada automáticamente en SAP S/4HANA' },
        { tipo: 'advertencia', modulo: 'Telemetría', msj: 'Vibración en Chancador Secundario CS-02 superó umbral 4.5 mm/s' },
        { tipo: 'critico', modulo: 'Cyber-OT', msj: 'Escaneo IEC 62443 completado: Cero vulnerabilidades en PLC Planta' }
      ];
      const random = nuevosMsjs[Math.floor(Math.random() * nuevosMsjs.length)];
      const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setEventos(prev => [
        { id: Date.now(), ...random, hora: horaActual },
        ...prev.slice(0, 4)
      ]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setMostrar(!mostrar)}
        className="px-4 py-2.5 bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 rounded-full font-bold text-xs shadow-2xl flex items-center gap-2 backdrop-blur-md"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
        </span>
        📡 Realtime Event Stream ({eventos.length})
      </button>

      {mostrar && (
        <div className="absolute bottom-12 right-0 w-80 md:w-96 bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-xl shadow-2xl p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-200">Eventos de Faena en Vivo</span>
            <button onClick={() => setMostrar(false)} className="text-xs text-slate-400 hover:text-white">✕</button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {eventos.map(ev => (
              <div 
                key={ev.id} 
                className={`p-2.5 rounded border text-xs flex flex-col space-y-1 ${
                  ev.tipo === 'critico' 
                    ? 'bg-rose-950/40 border-rose-800/60 text-rose-200' 
                    : ev.tipo === 'advertencia' 
                    ? 'bg-amber-950/40 border-amber-800/60 text-amber-200' 
                    : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                }`}
              >
                <div className="flex justify-between items-center font-mono text-[10px] opacity-80">
                  <span className="font-bold uppercase">[{ev.modulo}]</span>
                  <span>{ev.hora}</span>
                </div>
                <span>{ev.msj}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
