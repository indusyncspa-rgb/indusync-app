import React, { useState } from 'react';

export const BiometricAccreditation = () => {
  const [rutIngresado, setRutIngresado] = useState('');
  const [resultado, setResultado] = useState(null);
  const [escaneando, setEscaneando] = useState(false);

  const simularEscaneoBiometria = () => {
    setEscaneando(true);
    setResultado(null);
    
    setTimeout(() => {
      setEscaneando(false);
      setResultado({
        rut: rutIngresado || '16.890.123-K',
        nombre: 'Juan Carlos Pérez',
        empresa: 'Komatsu Reman',
        cargo: 'Mecánico AHS Fleet',
        estado: 'APROBADO',
        coincidenciaFacial: '99.4%',
        examenes: 'Vigentes hasta Nov 2026',
        pasaFaena: true
      });
    }, 2000);
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-indigo-500/30">
      <h2 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
        👤 Control Biométrico & Acreditación de Contratistas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lado Izquierdo: Lector Biométrico / Scanner */}
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700 flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full border-4 border-dashed border-indigo-500/50 flex items-center justify-center relative overflow-hidden mb-4 bg-slate-950">
            {escaneando ? (
              <div className="absolute inset-0 bg-indigo-500/20 animate-pulse flex items-center justify-center">
                <span className="text-xs text-indigo-300 font-mono">ESCANEO FACIAL EN PROCESO...</span>
              </div>
            ) : (
              <span className="text-5xl">📷</span>
            )}
          </div>

          <input 
            type="text"
            placeholder="Ingrese RUT (Ej: 16.890.123-K)"
            value={rutIngresado}
            onChange={(e) => setRutIngresado(e.target.value)}
            className="w-full max-w-xs px-3 py-2 bg-slate-900 border border-slate-700 rounded text-center text-sm mb-3 focus:outline-none focus:border-indigo-500"
          />

          <button
            onClick={simularEscaneoBiometria}
            disabled={escaneando}
            className="w-full max-w-xs py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-semibold transition text-sm"
          >
            {escaneando ? 'Validando Biometría...' : '🔍 Escanear Rostro / Validar RUT'}
          </button>
        </div>

        {/* Lado Derecho: Estado de Verificación */}
        <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Resultado de Validación en Garita</h3>

          {!resultado && !escaneando && (
            <p className="text-slate-500 text-sm italic">Esperando lectura biométrica o ingreso de RUT...</p>
          )}

          {resultado && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xs text-emerald-400 font-bold uppercase">Acceso Autorizado</p>
                  <p className="text-lg font-bold">{resultado.nombre}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono font-bold">
                  {resultado.coincidenciaFacial} Match
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-300">
                <p><strong>RUT:</strong> {resultado.rut}</p>
                <p><strong>Empresa:</strong> {resultado.empresa}</p>
                <p><strong>Cargo:</strong> {resultado.cargo}</p>
                <p><strong>Salud Ocupacional:</strong> <span className="text-emerald-400">{resultado.examenes}</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};