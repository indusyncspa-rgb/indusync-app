import React from 'react';

// Datos de respaldo si el contexto de datos aún no ha cargado
const defaultWaterMetrics = {
  estadoAcueducto: 'ÓPTIMO (100% OPERATIVO)',
  recuperacionAguaPct: 88.4,
  consumoEspecificoM3Ton: 0.42,
  nivelEmbalsePct: 91.2,
  flujoDesaladoraLps: 1250,
  presionTuberiaBar: 18.5,
  calidadPh: 7.8,
};

export default function WaterManagement({ data }) {
  // Blindaje contra undefined
  const metrics = data ?? defaultWaterMetrics;

  const estadoAcueducto = metrics?.estadoAcueducto ?? defaultWaterMetrics.estadoAcueducto;
  const recuperacion = metrics?.recuperacionAguaPct ?? defaultWaterMetrics.recuperacionAguaPct;
  const consumo = metrics?.consumoEspecificoM3Ton ?? defaultWaterMetrics.consumoEspecificoM3Ton;
  const embalse = metrics?.nivelEmbalsePct ?? defaultWaterMetrics.nivelEmbalsePct;
  const desaladora = metrics?.flujoDesaladoraLps ?? defaultWaterMetrics.flujoDesaladoraLps;
  const presion = metrics?.presionTuberiaBar ?? defaultWaterMetrics.presionTuberiaBar;

  return (
    <div className="space-y-6 font-sans">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-xl">
        <div>
          <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded text-[10px] font-mono font-bold">
            MONITOREO HÍDRICO & ESG
          </span>
          <h2 className="text-2xl font-black text-white mt-1">Gestión de Agua & Acueducto Impulsión</h2>
          <p className="text-xs text-slate-400">Control en tiempo real de planta desaladora, bombas de alta presión y recirculación de agua clara.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
          <span className="text-xs font-mono font-bold text-slate-200">
            Acueducto: <span className="text-cyan-400">{estadoAcueducto}</span>
          </span>
        </div>
      </div>

      {/* Tarjetas de Métricas de Agua */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Recirculación Agua Clara</p>
          <p className="text-2xl font-black text-emerald-400 font-mono mt-2">{recuperacion}%</p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">Meta SERNAGEOMIN: &gt;85%</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Consumo Específico</p>
          <p className="text-2xl font-black text-white font-mono mt-2">
            {consumo} <span className="text-xs text-slate-500 font-normal">m³/ton</span>
          </p>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono">↓ -12% vs promedio industrial</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Flujo Desaladora</p>
          <p className="text-2xl font-black text-cyan-400 font-mono mt-2">
            {desaladora.toLocaleString()} <span className="text-xs text-slate-500 font-normal">L/s</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">Impulsión a 3,100 msnm</p>
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400 font-medium">Nivel Embalse Recirculado</p>
          <p className="text-2xl font-black text-purple-400 font-mono mt-2">{embalse}%</p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">Presión: {presion} bar</p>
        </div>
      </div>
    </div>
  );
}