import React, { useState } from 'react';

export default function FieldInspectionMobile() {
  const [equipoEscaneado, setEquipoEscaneado] = useState(null);
  const [observacion, setObservacion] = useState('');
  const [estadoGeneral, setEstadoGeneral] = useState('operativo');
  const [sincronizado, setSincronizado] = useState(true);

  const simularEscaneoQR = () => {
    setEquipoEscaneado({
      codigo: 'SAG-MILL-01',
      nombre: 'Molino SAG Principal 40 ft',
      area: 'Planta Concentradora - Molienda',
      ultimoMantenimiento: '2026-08-15'
    });
  };

  const guardarInspeccion = () => {
    if (!equipoEscaneado) return alert('Primero escanee el código QR del equipo');
    setSincronizado(false);
    setTimeout(() => {
      setSincronizado(true);
      alert('Inspección registrada y sincronizada con el Gateway y SAP PM');
      setEquipoEscaneado(null);
      setObservacion('');
    }, 1200);
  };

  return (
    <div className="p-4 bg-slate-900 text-white rounded-xl border border-cyan-500/30 space-y-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">📱</span>
          <div>
            <h3 className="text-sm font-bold text-cyan-400">Inspección de Terreno Offline (PWA)</h3>
            <p className="text-[10px] text-slate-400">Modo Operador Rajo / Subterránea</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
          sincronizado ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
        }`}>
          {sincronizado ? '● Sync OK' : '🔄 Guardando local...'}
        </span>
      </div>

      {/* Botón Escáner QR */}
      {!equipoEscaneado ? (
        <div className="p-8 border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl text-center space-y-3 bg-slate-950/50">
          <div className="text-3xl">📷</div>
          <p className="text-xs text-slate-300">Apunte la cámara al código QR del equipo o componente</p>
          <button
            onClick={simularEscaneoQR}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-xs font-bold text-white shadow-lg"
          >
            Simular Escaneo QR Tag Equipment
          </button>
        </div>
      ) : (
        <div className="p-4 bg-slate-800 rounded-lg border border-cyan-500/40 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                {equipoEscaneado.codigo}
              </span>
              <h4 className="text-sm font-bold text-white mt-1">{equipoEscaneado.nombre}</h4>
              <p className="text-xs text-slate-400">{equipoEscaneado.area}</p>
            </div>
            <button onClick={() => setEquipoEscaneado(null)} className="text-xs text-slate-400 hover:text-white">✕</button>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-700">
            <label className="text-xs text-slate-300 block">Condición Visual Detectada:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'operativo', label: '✅ Normal' },
                { id: 'alerta', label: '⚠️ Alerta' },
                { id: 'critico', label: '🚨 Crítico' }
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setEstadoGeneral(st.id)}
                  className={`p-2 rounded text-xs font-bold ${
                    estadoGeneral === st.id ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <label className="text-xs text-slate-300 block pt-2">Observación / Hallazgo de Campo:</label>
            <textarea
              rows={2}
              value={observacion}
              onChange={(e) => setObservacion(e.target.value)}
              placeholder="Ej: Fuga menor de aceite hidráulico en rodillo de apoyo. Se requiere revisión en próximo turno."
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
            />

            <button
              onClick={guardarInspeccion}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-xs rounded-lg transition shadow-lg text-white"
            >
              💾 Enviar Inspección a SAP PM & Gateway
            </button>
          </div>
        </div>
      )}
    </div>
  );
}