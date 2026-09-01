import React, { useState, useEffect } from 'react';

export const CyberAndCircularView = () => {
  const [itemsMarket, setItemsMarket] = useState([]);
  const [socData, setSocData] = useState(null);

  useEffect(() => {
    fetch('/api/circular-b2b').then(r => r.json()).then(d => setItemsMarket(d.items || []));
    fetch('/api/cyber-soc').then(r => r.json()).then(d => setSocData(d));
  }, []);

  return (
    <div className="space-y-6">
      {/* SECCION 1: SOC Cyber-OT IEC 62443 */}
      <div className="p-6 bg-slate-900 text-white rounded-xl border border-red-500/30">
        <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl font-bold text-red-400 flex items-center gap-2">
              🛡️ Cyber-OT SOC Monitor (NIST SP 800-82 / IEC 62443)
            </h2>
            <p className="text-xs text-slate-400">Protección Perimetral SCADA, DCS y Redes de Control Industrial</p>
          </div>
          <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/40 rounded-full text-xs font-mono animate-pulse">
            {socData ? socData.nivelSeguridad : 'INICIALIZANDO SOC...'}
          </span>
        </div>

        {socData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-800 rounded border border-slate-700">
              <p className="text-xs text-slate-400">Tráfico de Red OT</p>
              <p className="text-xl font-extrabold text-cyan-400 mt-1">{socData.paquetesAnalizadosPorSegundo} p/s</p>
              <span className="text-[10px] text-slate-400">Protocolos: {socData.protocolosMonitoreados.join(', ')}</span>
            </div>

            <div className="p-3 bg-slate-800 rounded border border-slate-700">
              <p className="text-xs text-slate-400">Estado Firewall Industrial</p>
              <p className="text-sm font-bold text-emerald-400 mt-2">{socData.firewallOTStatus}</p>
            </div>

            <div className="p-3 bg-slate-800 rounded border border-slate-700">
              <p className="text-xs text-slate-400">Amenazas Intrusivas Bloqueadas (24h)</p>
              <p className="text-xl font-extrabold text-amber-400 mt-1">{socData.amenazasBloqueadas24h} Intentos</p>
              <span className="text-[10px] text-emerald-400">Zero Trust Network Access (ZTNA)</span>
            </div>
          </div>
        )}
      </div>

      {/* SECCION 2: Marketplace B2B Economía Circular */}
      <div className="p-6 bg-slate-900 text-white rounded-xl border border-emerald-500/30">
        <h2 className="text-xl font-bold text-emerald-400 mb-2 flex items-center gap-2">
          ♻️ B2B Circular Economy & Waste Marketplace
        </h2>
        <p className="text-xs text-slate-400 mb-4">Intercambio de Insumos, Repuestos y Créditos Ambientales entre Compañías Mineras</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {itemsMarket.map(item => (
            <div key={item.id} className="p-4 bg-slate-800/90 rounded-lg border border-slate-700 flex justify-between items-center">
              <div>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] rounded font-mono font-bold uppercase">{item.categoria}</span>
                <h3 className="text-sm font-bold text-white mt-1">{item.titulo}</h3>
                <p className="text-xs text-slate-400">Oferente: <strong className="text-slate-200">{item.empresa_oferente}</strong></p>
                <p className="text-xs text-emerald-400 mt-1">🌱 Ahorro Estimado: {item.ahorro_co2_ton} tCO2e</p>
              </div>

              <div className="text-right">
                <p className="text-lg font-black text-amber-400">US$ {item.precio_usd}</p>
                <span className="text-xs text-slate-400">{item.cantidad_disponible} {item.unidad_medida}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};