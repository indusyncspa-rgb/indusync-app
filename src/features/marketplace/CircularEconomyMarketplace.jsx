import React from 'react';

export default function CircularEconomyMarketplace() {
  const ofertas = [
    { id: 'OFF-101', item: 'Chatarra de Acero CAEX Structural', cantidad: '120 Toneladas', ubicacion: 'Mina Norte', valor: '$48,000 USD' },
    { id: 'OFF-102', item: 'Neumáticos Gigantes 59/80R63 (Reciclaje)', cantidad: '14 Unidades', ubicacion: 'Patio Mantención', valor: '$12,500 USD' },
    { id: 'OFF-103', item: 'Aceite Industrial Usado Filtrado', cantidad: '8,000 Litros', ubicacion: 'Planta Concentradora', valor: '$6,400 USD' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-xl flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-cyan-400 font-mono flex items-center gap-2">
            ♻️ Marketplace Economía Circular & Excedentes ESG
          </h2>
          <p className="text-xs text-slate-400">Comercialización B2B de residuos industriales, insumos y subproductos.</p>
        </div>
        <span className="text-xs font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800 px-3 py-1 rounded">
          Impacto Carbono: -420t CO2e
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ofertas.map(off => (
          <div key={off.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-cyan-400 font-bold">{off.id}</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{off.ubicacion}</span>
              </div>
              <h4 className="font-bold text-slate-100 text-sm mb-1">{off.item}</h4>
              <p className="text-slate-400">Volumen: <strong className="text-slate-200">{off.cantidad}</strong></p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <span className="text-emerald-400 font-bold text-sm">{off.valor}</span>
              <button className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded text-[11px] transition">
                Pujar / Ofertar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}