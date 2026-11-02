import React, { useState } from 'react';

export default function SalfaSafetyCompliance() {
  const [conductores, setConductores] = useState([
    { id: 'OP-882', nombre: 'Carlos Soto M.', turno: '12x12 (Faena Escondida)', horasManejo: '7.5 hrs', microsuenos: 0, estado: 'ÓPTIMO', scorePrevencion: 99.2 },
    { id: 'OP-914', nombre: 'Esteban Valenzuela R.', turno: '7x7 (Ruta Calama)', horasManejo: '11.2 hrs', microsuenos: 2, estado: 'ALERTA FATIGA', scorePrevencion: 74.5 },
    { id: 'OP-703', nombre: 'Mauricio Pizarro L.', turno: 'Turno Noche', horasManejo: '4.0 hrs', microsuenos: 0, estado: 'ÓPTIMO', scorePrevencion: 98.0 }
  ]);

  const [simulandoBiometria, setSimulandoBiometria] = useState(null);

  const handleValidarBiometria = (id) => {
    setSimulandoBiometria(id);
    setTimeout(() => {
      setConductores(prev => prev.map(c => 
        c.id === id ? { ...c, estado: 'BLOQUEO PREVENTIVO (DMS)', scorePrevencion: 45.0 } : c
      ));
      setSimulandoBiometria(null);
    }, 1500);
  };

  return (
    <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl font-sans text-slate-100 space-y-6">
      
      {/* CABECERA */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            🏛️ SALFA <span className="text-cyan-400">COMPLIANCE & PREVENCIÓN (SERNAGEOMIN READY)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Monitoreo Biométrico de Fatiga a Bordo & Control de Jornada de Conducción</p>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-800/50 px-4 py-2 rounded-xl flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          <span className="text-xs font-mono font-bold text-emerald-300">MATRIZ DE RIESGO: CONTROLADA</span>
        </div>
      </div>

      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">Conductores en Ruta</span>
          <div className="text-2xl font-black text-white font-mono mt-1">42 Activos</div>
          <span className="text-[10px] text-emerald-400">0% incidentes críticos hoy</span>
        </div>
        <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">Alertas Cámara DMS (Fatiga)</span>
          <div className="text-2xl font-black text-amber-400 font-mono mt-1">2 Intercepciones</div>
          <span className="text-[10px] text-amber-400">Bloqueo preventivo aplicado</span>
        </div>
        <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl">
          <span className="text-xs text-slate-400">Cumplimiento Legal (Sernageomin)</span>
          <div className="text-2xl font-black text-cyan-400 font-mono mt-1">100% Auditable</div>
          <span className="text-[10px] text-slate-500">Reportes inmutables en PDF</span>
        </div>
      </div>

      {/* TABLA DE CONDUCTORES Y BIOMETRÍA */}
      <div className="bg-slate-950/50 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
        <div className="p-4 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider flex justify-between items-center">
          <span>Telemetría de Conductores & Cámaras DMS en Tiempo Real</span>
          <span className="text-[10px] text-cyan-400 font-mono">ESTÁNDAR EXPERTO PREVENCIÓN DE RIESGOS</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {conductores.map((c) => {
            const isProcesando = simulandoBiometria === c.id;
            const isBloqueado = c.estado.includes('BLOQUEO');

            return (
              <div key={c.id} className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-900/40 transition">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-200">{c.nombre}</span>
                    <span className="text-xs text-slate-500 font-mono">({c.id})</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isBloqueado ? 'bg-rose-600 text-white shadow-[0_0_10px_rgba(225,29,72,0.5)] animate-pulse' :
                      c.estado === 'ÓPTIMO' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                      'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                    }`}>
                      {c.estado}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Turno: <span className="text-slate-300">{c.turno}</span> | Horas al volante: <span className="text-cyan-400 font-mono font-bold">{c.horasManejo}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Micro-sueños DMS: <strong className={c.microsuenos > 0 ? 'text-rose-400' : 'text-emerald-400'}>{c.microsuenos}</strong></div>
                    <div className="text-[10px] text-slate-500 font-mono">Score Prevención: {c.scorePrevencion}%</div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleValidarBiometria(c.id)}
                      disabled={isProcesando || isBloqueado}
                      className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition ${
                        isBloqueado ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
                        isProcesando ? 'bg-amber-600 text-white animate-pulse' :
                        'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {isProcesando ? 'Analizando...' : isBloqueado ? '🔒 Motor Bloqueado' : '👁️ Test Biométrico DMS'}
                    </button>

                    <button 
                      onClick={() => alert(`Generando Acta de Cumplimiento Sernageomin para ${c.nombre} con sello de tiempo inmutable...`)}
                      className="bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 px-3 py-2 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5"
                    >
                      📄 Acta Legal
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}