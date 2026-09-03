import React from 'react';

export default function ProcurementTenderMatchAI() {
  const licitaciones = [
    { id: 'LIC-2026-04', titulo: 'Suministro y Mantención Malla Sensores IoT', coincidencia: '96% Match', presupuesto: '$180,000 USD', proveedores: 4 },
    { id: 'LIC-2026-09', titulo: 'Servicio de Filtrado y Recuperación H2O', coincidencia: '91% Match', presupuesto: '$450,000 USD', proveedores: 7 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2">
            🤝 Matchmaking IA de Licitaciones & Suministros
          </h2>
          <p className="text-xs text-slate-400">Calificación inteligente de proveedores y adjudicación predictiva de RFP/RFQ.</p>
        </div>
        <button className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded text-xs font-mono transition">
          + Publicar Nueva Licitación
        </button>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {licitaciones.map(lic => (
          <div key={lic.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-cyan-400 font-bold">{lic.id}</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded font-bold">
                  {lic.coincidencia}
                </span>
              </div>
              <h4 className="text-slate-200 font-bold">{lic.titulo}</h4>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <span className="text-slate-500 text-[10px] block">PRESUPUESTO</span>
                <span className="text-emerald-400 font-bold">{lic.presupuesto}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">OFERTANTES</span>
                <span className="text-slate-200 font-bold">{lic.proveedores} Empresas</span>
              </div>
              <button className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded transition">
                Evaluar con IA
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}