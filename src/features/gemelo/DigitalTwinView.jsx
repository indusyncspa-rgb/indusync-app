import React, { useState } from 'react';

export default function DigitalTwinView() {
  const [spi, setSpi] = useState(115);
  const [tph, setTph] = useState(4200);
  const [resultado, setResultado] = useState(null);
  const [simulando, setSimulando] = useState(false);

  const ejecutarSimulacion = async () => {
    setSimulando(true);
    try {
      const res = await fetch('/api/digital-twin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spi, tph })
      });
      const data = await res.json();
      setResultado(data.simulacion);
    } catch (e) {
      alert('Error en simulación');
    } finally {
      setSimulando(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-purple-500/30 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-purple-400">🌐 Gemelo Digital & Simulador de Proceso Mina-Planta</h2>
          <p className="text-xs text-slate-400">Predicción de Métricas Operacionales según Dureza del Mineral (SPI) y Tasa de Alimentación</p>
        </div>
        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-mono font-bold">
          Digital Twin Engine v2.4
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Panel de Variables */}
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 space-y-4">
          <h3 className="text-sm font-bold text-slate-200">Parámetros de Entrada del Yacimiento</h3>
          
          <div>
            <label className="text-xs text-slate-400 block mb-1">Dureza Mineral (Índice SPI): <strong className="text-purple-400">{spi} min</strong></label>
            <input 
              type="range" min="80" max="150" value={spi} 
              onChange={(e) => setSpi(e.target.value)}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Alimentación Planta: <strong className="text-purple-400">{tph} TPH</strong></label>
            <input 
              type="range" min="3000" max="5000" step="50" value={tph} 
              onChange={(e) => setTph(e.target.value)}
              className="w-full accent-purple-500 cursor-pointer"
            />
          </div>

          <button
            onClick={ejecutarSimulacion}
            disabled={simulando}
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 font-bold text-xs rounded transition text-white shadow-lg"
          >
            {simulando ? 'Calculando física del circuito...' : '🚀 Ejecutar Simulación en Gemelo Digital'}
          </button>
        </div>

        {/* Output de Resultados */}
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-200 mb-2">Proyección Predictiva de Salida</h3>
          
          {resultado ? (
            <div className="space-y-3">
              <div className="p-3 bg-slate-900 rounded border border-slate-700 flex justify-between items-center">
                <span className="text-xs text-slate-400">Recuperación Cobre Fino:</span>
                <strong className="text-emerald-400 text-lg">{resultado.recuperacionCuPct}%</strong>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-700 flex justify-between items-center">
                <span className="text-xs text-slate-400">Consumo Específico Energía:</span>
                <strong className="text-amber-400 text-lg">{resultado.consumoKwhTon} kWh/t</strong>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">Cuello de Botella Detectado:</span>
                <strong className="text-cyan-300 text-xs font-mono">{resultado.cuelloBotellaDetectado || resultado.cuelloBotella}</strong>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-slate-500 italic">
              Ajusta los parámetros y presiona "Ejecutar Simulación" para ver el comportamiento del Gemelo Digital.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

