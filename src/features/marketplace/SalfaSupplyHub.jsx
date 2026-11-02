import React, { useState } from 'react';

export default function SalfaSupplyHub() {
  const [bids] = useState([
    { id: 1, provider: 'Repuestos Express SpA', time: '2 Horas', price: 45000, score: 98.4, cumplimiento: '99.1% a tiempo', estadoIA: 'Prioridad Alta (Recomendado)' },
    { id: 2, provider: 'Comercializadora Norte Ltda', time: '4 Horas', price: 42500, score: 82.0, cumplimiento: '78.5% a tiempo (Retrasos habituales)', estadoIA: 'Riesgo Moderado de Retraso' }
  ]);

  const [procesando, setProcesando] = useState(null);
  const [adjudicado, setAdjudicado] = useState(null);
  const [estadoRPA, setEstadoRPA] = useState('');

  const handleAdjudicar = (id, proveedorNombre) => {
    setProcesando(id);
    setEstadoRPA('🔗 Conectando con API SAP PM (IW32)...');

    setTimeout(() => {
      setEstadoRPA('📑 Generando Nota de Pedido y MIGO automático...');
    }, 1000);

    setTimeout(() => {
      setEstadoRPA(`🧾 Emitiendo Pre-Factura Electrónica vía API SII para ${proveedorNombre}...`);
    }, 2200);

    setTimeout(() => {
      setProcesando(null);
      setAdjudicado(id);
      setEstadoRPA('✅ RPA Financiero Ejecutado: Orden adjudicada y documentada en SII y SAP.');
    }, 3500);
  };

  return (
    <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl font-sans text-slate-100 space-y-6">
      
      {/* CABECERA & MÉTRICA LOGÍSTICA */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            SALFA <span className="text-cyan-400">SUPPLY HUB (B2B MARKETPLACE)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Licitación dinámica integrada con SAP ZMM_CAM_UBI_MAT, RPA SII y Scoring Predictivo</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-emerald-950/40 border border-emerald-800/50 px-4 py-2 rounded-xl">
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Ahorro Licitaciones (Mes)</div>
            <div className="text-sm font-black font-mono text-emerald-300">$14.820.000 CLP</div>
          </div>
          <div className="bg-cyan-950/40 border border-cyan-800/50 px-4 py-2 rounded-xl">
            <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Eficiencia Adquisición</div>
            <div className="text-sm font-black font-mono text-cyan-300">↓ 34.2% Reducción</div>
          </div>
        </div>
      </div>

      {/* FEEDBACK DEL RPA FINANCIERO */}
      {procesando !== null && (
        <div className="bg-cyan-950/40 border border-cyan-800/60 p-3 rounded-xl text-xs text-cyan-300 flex items-center gap-3 animate-pulse font-mono shadow-lg">
          <span>⚡ [RPA SII & SAP]:</span>
          <span>{estadoRPA}</span>
        </div>
      )}

      {/* PANEL SAP Y LICITACIÓN */}
      <div className="bg-slate-950/50 border border-slate-800 p-6 rounded-xl space-y-4 shadow-inner">
        <div className="flex justify-between items-center border-b border-slate-800/50 pb-4">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-900/50 text-emerald-400 border border-emerald-800 px-2 py-1 rounded text-xs font-bold">
              OT SAP: IW32-800965
            </span>
            <span className="text-sm font-bold text-slate-300">
              Código de Material SAP: <span className="text-white">750010</span>
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-2">
            ESTADO: {adjudicado ? <span className="text-emerald-400 font-bold">CERRADO (RPA & MIGO OK)</span> : <span className="text-amber-400 font-bold">OPEN (PUJANDO)</span>}
          </span>
        </div>

        <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
          📍 Ubicación Física en Bodega (ZMM_CAM_UBI_MAT): 
          <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-500/30">
            P102-01-05 (Rack Principal Calama)
          </span>
        </div>

        <div className="pt-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
            <span>🤖</span> Ofertas Activas & Scoring Predictivo de Proveedores (Machine Learning)
          </h3>
          
          {bids.map((bid) => {
            const isProcesando = procesando === bid.id;
            const isAdjudicado = adjudicado === bid.id;
            const otroAdjudicado = adjudicado !== null && adjudicado !== bid.id;

            return (
              <div 
                key={bid.id} 
                className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl border transition-all duration-300 gap-4 ${
                  isAdjudicado ? 'bg-emerald-950/30 border-emerald-500/50' : 
                  otroAdjudicado ? 'bg-slate-950/50 border-slate-800 opacity-40 grayscale' : 
                  'bg-slate-900 border-slate-700 hover:border-cyan-500/50'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`font-bold text-sm ${isAdjudicado ? 'text-emerald-400' : 'text-slate-200'}`}>{bid.provider}</p>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      bid.score > 90 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}>
                      Supply Scoring IA: {bid.score}%
                    </span>
                    <span className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
                      {bid.estadoIA}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    ⏱️ Tiempo estimado: <span className="text-emerald-400 font-bold">{bid.time}</span> | Historial: <span className="text-slate-300">{bid.cumplimiento}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <span className={`text-xl font-black font-mono ${isAdjudicado ? 'text-emerald-500' : 'text-cyan-400'}`}>
                    ${bid.price.toLocaleString('es-CL')} <span className="text-xs text-slate-500 font-normal">CLP</span>
                  </span>
                  
                  <button 
                    onClick={() => handleAdjudicar(bid.id, bid.provider)}
                    disabled={procesando !== null || adjudicado !== null}
                    className={`w-52 font-bold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition flex justify-center items-center gap-2 ${
                      isAdjudicado ? 'bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' :
                      isProcesando ? 'bg-amber-600 text-white animate-pulse' :
                      otroAdjudicado ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
                      'bg-cyan-600 hover:bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    }`}
                  >
                    {isAdjudicado ? '✅ ADJUDICADO & RPA OK' : 
                     isProcesando ? 'Ejecutando RPA SII...' : 
                     'Adjudicar & Emitir Pre-Factura'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}