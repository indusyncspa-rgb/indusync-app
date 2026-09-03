import React from 'react';

export default function ContractorAccreditationAI() {
  const contratistas = [
    { empresa: 'TechMine Services', dotacion: 45, cumplimiento: '100%', pase: 'ACTIVO', riesgo: 'Bajo' },
    { empresa: 'Ingeniería & Montajes S.A.', dotacion: 112, cumplimiento: '98.2%', pase: 'ACTIVO', riesgo: 'Bajo' },
    { empresa: 'Logística del Norte', dotacion: 28, cumplimiento: '84.0%', pase: 'RESTRINGIDO', riesgo: 'Medio' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2">
            🪪 Acreditación & Control de Contratistas con IA
          </h2>
          <p className="text-xs text-slate-400">Validación documental instantánea, exámenes médicos y pases de acceso Biométricos.</p>
        </div>
        <button className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded text-xs transition font-mono">
          + Acreditar Nuevo Personal
        </button>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4 font-mono">
          Empresas Contratistas Acreditadas en Faena
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3">Empresa</th>
                <th className="p-3">Dotación en Faena</th>
                <th className="p-3">Doc. Auditable IA</th>
                <th className="p-3">Pase Acceso</th>
                <th className="p-3">Riesgo Safety</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {contratistas.map((c, i) => (
                <tr key={i} className="hover:bg-slate-850/50 transition">
                  <td className="p-3 font-bold text-slate-200">{c.empresa}</td>
                  <td className="p-3 text-cyan-400">{c.dotacion} personas</td>
                  <td className="p-3 text-emerald-400">{c.cumplimiento}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      c.pase === 'ACTIVO' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {c.pase}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{c.riesgo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}