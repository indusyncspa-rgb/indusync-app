import React, { useState } from 'react';

export default function ExecutivePitchMode() {
  const [tonelajeAnual, setTonelajeAnual] = useState(15); // Millones de Toneladas
  const [precioCobre, setPrecioCobre] = useState(4.10); // USD/lb

  // Cálculos de impacto financiero
  const ahorroEnergia = (tonelajeAnual * 0.85).toFixed(2); // MUSD por optimización SAG
  const reduccionCashCost = (0.042 * tonelajeAnual).toFixed(2); // Reducción de Cash Cost C1
  const roiAnual = (parseFloat(ahorroEnergia) + parseFloat(reduccionCashCost)).toFixed(2);

  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-emerald-500/30 space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-emerald-400">💰 Calculador de ROI & Valor para el Directorio</h2>
          <p className="text-xs text-slate-400">Proyección de Impacto Financiero y Reducción de Cash Cost C1 con INDUSYNC Meta-OS</p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono font-bold">
          Executive ROI Engine
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders de Entrada */}
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 space-y-4">
          <h3 className="text-sm font-bold text-slate-200">Parámetros Operacionales Faena</h3>

          <div>
            <label className="text-xs text-slate-400 block mb-1">
              Procesamiento Anual: <strong className="text-emerald-400">{tonelajeAnual} MTon/año</strong>
            </label>
            <input 
              type="range" min="5" max="50" step="1" value={tonelajeAnual} 
              onChange={(e) => setTonelajeAnual(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">
              Precio Cobre Largo Plazo: <strong className="text-emerald-400">US$ {precioCobre}/lb</strong>
            </label>
            <input 
              type="range" min="3.00" max="6.00" step="0.10" value={precioCobre} 
              onChange={(e) => setPrecioCobre(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Métricas de Retorno */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex flex-col justify-center">
            <span className="text-xs text-slate-400">Ahorro Energético Molienda</span>
            <span className="text-2xl font-black text-emerald-400 mt-1">${ahorroEnergia} M USD</span>
            <span className="text-[10px] text-slate-500 mt-1">Eficiencia 4.2% kWh/t</span>
          </div>

          <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 flex flex-col justify-center">
            <span className="text-xs text-slate-400">Reducción Cash Cost C1</span>
            <span className="text-2xl font-black text-cyan-400 mt-1">${reduccionCashCost} M USD</span>
            <span className="text-[10px] text-slate-500 mt-1">-US$ 0.042/lb en faena</span>
          </div>

          <div className="col-span-2 p-4 bg-gradient-to-r from-emerald-950 to-slate-900 rounded-lg border border-emerald-500/50 flex justify-between items-center">
            <div>
              <span className="text-xs text-emerald-300 font-bold block">VALOR RETORNO TOTAL ANUAL (EBITDA +)</span>
              <span className="text-3xl font-black text-emerald-400">${roiAnual} M USD / año</span>
            </div>
            <button 
              onClick={() => alert(`Informe enviado a Directorio. Valor generado: $${roiAnual}M USD`)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold transition shadow"
            >
              📊 Generar Pitch PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}