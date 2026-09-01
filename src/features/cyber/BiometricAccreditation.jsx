import React, { useState } from 'react';

export default function BiometricAccreditation() {
  const [rut, setRut] = useState('');
  const [estado, setEstado] = useState(null);

  const verificarAcreditacion = (e) => {
    e.preventDefault();
    if (!rut) return;
    setEstado('verificando');
    setTimeout(() => {
      setEstado('aprobado');
    }, 1000);
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 max-w-xl mx-auto text-slate-100">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <span className="text-2xl">🪪</span>
        <div>
          <h3 className="text-base font-bold text-cyan-400">Control de Acceso & Acreditación Biométrica</h3>
          <p className="text-xs text-slate-400">Verificación de Contratistas e Ingrese a Faena</p>
        </div>
      </div>

      <form onSubmit={verificarAcreditacion} className="space-y-3">
        <div>
          <label className="text-xs text-slate-300 block mb-1">RUT Operador / Contratista:</label>
          <input
            type="text"
            placeholder="12.345.678-9"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded text-xs text-white focus:border-cyan-400 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 font-bold text-xs rounded transition text-white"
        >
          🔍 Validar Acreditación Biométrica
        </button>
      </form>

      {estado === 'verificando' && (
        <div className="p-3 bg-slate-950 rounded text-xs text-cyan-400 animate-pulse text-center">
          Consultando registros de seguridad y exámenes médicos...
        </div>
      )}

      {estado === 'aprobado' && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-xs space-y-1">
          <p className="font-bold text-emerald-400">✅ Acreditación Vigente & Autorizada</p>
          <p className="text-slate-300">Exámenes Ocupacionales: Al día</p>
          <p className="text-slate-300">Inducción DAS Sernageomin: Válida hasta Nov 2026</p>
        </div>
      )}
    </div>
  );
}

