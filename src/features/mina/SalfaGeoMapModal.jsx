import React, { useState } from 'react';

export default function SalfaGeoMapModal({ patente, onClose }) {
  const [protocoloActivo, setProtocoloActivo] = useState(false);
  const [estadoProtocolo, setEstadoProtocolo] = useState('En espera de orden táctica...');

  const ejecutarPanicoTactico = () => {
    setProtocoloActivo(true);
    setEstadoProtocolo('📡 Conectando con Cuadrante Policial & Central Faena...');

    setTimeout(() => {
      setEstadoProtocolo('📤 Ráfaga SMS y Coordenadas GPS Encriptadas enviadas a Carabineros.');
    }, 1200);

    setTimeout(() => {
      setEstadoProtocolo('🚨 ¡Baliza Virtual y Bocina Codificada Activadas en el Vehículo!');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[10002] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="max-w-3xl w-full bg-slate-900 border border-red-500/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(239,68,68,0.2)] space-y-6">
        
        {/* Cabecera del Mapa */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-bold px-2 py-0.5 rounded uppercase animate-pulse">
              🚨 Alerta de Desvío Clandestino (Zona Roja)
            </span>
            <h3 className="text-lg font-black text-white mt-1">Geolocalización Satelital & Pánico Táctico: <span className="text-red-400">{patente}</span></h3>
          </div>
          <button 
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition"
          >
            ✕ Cerrar Radar
          </button>
        </div>

        {/* Simulación Gráfica de Mapa de Calor (Zona Roja Calama / San Pedro) */}
        <div className="relative h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
          
          {/* Cuadrícula de Radar de Fondo */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* Simulación de Rutas y Desvío */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>[RADAR GPS: -22.4563, -68.9281]</span>
              <span>ESTADO: SEÑAL SATELITAL HÍBRIDA ACTIVA</span>
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-3/4 h-1 bg-cyan-500/40 rounded rotate-12" />
              <div className="absolute w-1/2 h-1 bg-red-600 rounded -rotate-45 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              
              <div className="absolute top-10 left-16 bg-slate-900 border border-cyan-500 text-cyan-400 px-2 py-1 rounded text-[9px]">
                📍 Ruta Autorizada Faena
              </div>
              <div className="absolute bottom-12 right-20 bg-red-950 border border-red-600 text-red-300 px-2 py-1 rounded text-[9px] font-bold animate-bounce">
                ⚠️ Destino Clandestino Detectado: Camino Chinchu / San Pedro
              </div>

              <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-ping" />
              <div className="absolute w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                🚗
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800">
              <span>Desvío desde ruta principal: <strong className="text-red-400">4.2 km</strong></span>
              <span>Velocidad en ruta no autorizada: <strong className="text-amber-400">65 km/h</strong></span>
            </div>
          </div>
        </div>

        {/* Feedback del Protocolo de Pánico */}
        {protocoloActivo && (
          <div className="bg-red-950/40 border border-red-800/60 p-3 rounded-xl text-xs text-red-300 flex items-center gap-3 animate-pulse font-mono">
            <span>🛡️</span>
            <span>{estadoProtocolo}</span>
          </div>
        )}

        {/* Acciones Tácticas del Mapa */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
          <p className="text-[11px] text-slate-400">
            Protocolo de Autonomía Edge: Emisión de coordenadas inmutables en tiempo real.
          </p>
          <button 
            onClick={ejecutarPanicoTactico}
            disabled={protocoloActivo}
            className={`font-black px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-lg ${
              protocoloActivo ? 'bg-emerald-600 text-white cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.5)]'
            }`}
          >
            {protocoloActivo ? '✅ PROTOCOLO TÁCTICO EJECUTADO' : '🚨 EJECUTAR PROTOCOLO PÁNICO MULLTI-CANAL'}
          </button>
        </div>

      </div>
    </div>
  );
}