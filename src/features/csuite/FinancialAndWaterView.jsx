import React from 'react';

export default function FinancialAndWaterView() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              💧 Sistema Hídrico & Finanzas C1 (Alta Minería)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Monitoreo y optimización en tiempo real de recursos hídricos, recirculación de relaves y Cash Cost C1.
            </p>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-3 py-1 rounded-full">
            ● IA OPTIMIZADORA ACTIVA
          </span>
        </div>

        {/* MÉTROCAS PRINCIPALES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Cash Cost C1</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">$1.26 <span className="text-xs font-normal text-slate-400">USD/lb</span></div>
            <span className="text-[10px] text-emerald-500 font-bold">↓ -$0.042/lb optimizado por IA</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Recirculación Tranque Relaves</span>
            <div className="text-2xl font-black text-cyan-400 mt-1">88.4%</div>
            <span className="text-[10px] text-cyan-500 font-bold">↑ Cumplimiento Normativa GISTM</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Impulsión Agua Desalada</span>
            <div className="text-2xl font-black text-blue-400 mt-1">1,420 <span className="text-xs font-normal text-slate-400">L/s</span></div>
            <span className="text-[10px] text-slate-400">Presión Red: Estabilidad Óptima</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Ahorro Energético Bombeo</span>
            <div className="text-2xl font-black text-amber-400 mt-1">$184,200 <span className="text-xs font-normal text-slate-400">USD/mes</span></div>
            <span className="text-[10px] text-amber-500 font-bold">Variación de Frecuencia Inteligente</span>
          </div>
        </div>
      </div>

      {/* DETALLE OPERATIVO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-slate-200">Balance Hídrico General de Planta</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
              <span className="text-slate-400">Agua de Fresco / Desalada:</span>
              <span className="font-mono text-slate-200 font-bold">320 L/s</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
              <span className="text-slate-400">Agua Recuperada en Flotación:</span>
              <span className="font-mono text-cyan-400 font-bold font-mono">1,100 L/s</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
              <span className="text-slate-400">Pérdida por Evaporación Tranque:</span>
              <span className="font-mono text-amber-400 font-bold">42 L/s (-12% vs histórico)</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
          <h3 className="text-sm font-bold text-slate-200">Estructura del Cash Cost C1</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
              <span className="text-slate-400">Mina & Mantenimiento Flota CAEX:</span>
              <span className="font-mono text-slate-200">$0.48 USD/lb</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
              <span className="text-slate-400">Planta Concentradora & Molienda:</span>
              <span className="font-mono text-slate-200">$0.52 USD/lb</span>
            </div>
            <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
              <span className="text-slate-400">Impulsión Hídrica & Suministros:</span>
              <span className="font-mono text-emerald-400 font-bold">$0.26 USD/lb (Optimizado)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}