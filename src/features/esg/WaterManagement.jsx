import React from 'react';

const fallbackWater = {
  estadoAcueducto: 'ÓPTIMO (100% OPERATIVO)',
  recuperacionAguaPct: 88.4,
  consumoEspecificoM3Ton: 0.42,
  flujoDesaladoraLps: 1250,
  presionTuberiaBar: 18.5,
};

export default function WaterManagement(props) {
  const safeData = props?.data ?? props ?? fallbackWater;

  const estadoAcueducto = safeData?.estadoAcueducto ?? fallbackWater.estadoAcueducto;
  const recuperacion = safeData?.recuperacionAguaPct ?? fallbackWater.recuperacionAguaPct;
  const consumo = safeData?.consumoEspecificoM3Ton ?? fallbackWater.consumoEspecificoM3Ton;
  const desaladora = safeData?.flujoDesaladoraLps ?? fallbackWater.flujoDesaladoraLps;

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div>
          <span className="px-2.5 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/40 rounded text-[10px] font-mono font-bold">
            MONITOREO HÍDRICO & ESG
          </span>
          <h2 className="text-2xl font-black text-white mt-1">Gestión de Agua & Acueducto</h2>
          <p className="text-xs text-slate-400">Control de desaladora, impulsión de alta presión y recirculación.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping" />
          <span className="text-xs font-mono font-bold text-slate-200">
            Acueducto: <span className="text-blue-400">{estadoAcueducto}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Recirculación Agua Clara</p>
          <p className="text-2xl font-black text-emerald-400 font-mono mt-2">{recuperacion}%</p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">Meta SERNAGEOMIN &gt;85%</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Consumo Específico</p>
          <p className="text-2xl font-black text-white font-mono mt-2">{consumo} m³/ton</p>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono">↓ -12% vs estándar</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Flujo Desaladora</p>
          <p className="text-2xl font-black text-cyan-400 font-mono mt-2">{desaladora} L/s</p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">Impulsión a 3,100 msnm</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Eficiencia Global Hídrica</p>
          <p className="text-2xl font-black text-blue-400 font-mono mt-2">96.8%</p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">Operación en norma</p>
        </div>
      </div>
    </div>
  );
}