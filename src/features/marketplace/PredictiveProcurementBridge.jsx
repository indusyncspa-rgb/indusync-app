import React, { useState, useEffect } from 'react';

export default function PredictiveProcurementBridge() {
  // Simulador de evento prescriptivo generado por la IA del Gemelo Digital
  const [activeAlert, setActiveAlert] = useState({
    id: 'ALT-SAG-2026-09',
    component: 'Chumacera Hidrostática Lado Descarga (Molino SAG 01)',
    timeToFailureHours: 68, // Horas antes de la parada catastrófica
    partNumber: 'SKF-7829-HD-MINE',
    estimatedDowntimeCostPerHour: 185000, // USD/hora
    status: 'MATCHING_SUPPLIERS' // MATCHING_SUPPLIERS | ADJUDICATED | IN_TRANSIT | DELIVERED
  });

  // Postulaciones de proveedores en tiempo real (< 15 minutos)
  const [supplierBids, setSupplierBids] = useState([
    {
      id: 'BID-01',
      supplier: 'SKF Mining Logistics Chile',
      rating: 4.9,
      priceUSD: 42000,
      deliveryTimeHours: 18,
      stockLocation: 'Bodega Calama (A 120 km)',
      expressShipping: true,
      verifiedOEM: true
    },
    {
      id: 'BID-02',
      supplier: 'Industrial Parts Antofagasta SpA',
      rating: 4.7,
      priceUSD: 38500,
      deliveryTimeHours: 24,
      stockLocation: 'Bodega Antofagasta',
      expressShipping: true,
      verifiedOEM: true
    },
    {
      id: 'BID-03',
      supplier: 'Global Mine Components Inc',
      rating: 4.5,
      priceUSD: 35000,
      deliveryTimeHours: 52,
      stockLocation: 'Bodega Santiago',
      expressShipping: false,
      verifiedOEM: false
    }
  ]);

  const [selectedBid, setSelectedBid] = useState(null);
  const [savingsCalculated, setSavingsCalculated] = useState(null);

  // Selección y adjudicación automatizada
  const adjudicarRepuesto = (bid) => {
    setSelectedBid(bid);
    setActiveAlert((prev) => ({ ...prev, status: 'IN_TRANSIT' }));

    // Cálculo estadístico de Ahorro Neto para la minera
    // Ahorro = (Horas de parada no programada evitadas * Costo por hora) - Costo Repuesto
    const estimatedDowntimeHoursSaved = 36; // Estimación promedio de horas sin repuesto
    const totalDowntimeLossAvoided = estimatedDowntimeHoursSaved * activeAlert.estimatedDowntimeCostPerHour;
    const netSavings = totalDowntimeLossAvoided - bid.priceUSD;

    setSavingsCalculated({
      hoursSaved: estimatedDowntimeHoursSaved,
      lossAvoidedUSD: totalDowntimeLossAvoided,
      netSavingsUSD: netSavings,
      timeBeforeShutdown: activeAlert.timeToFailureHours - bid.deliveryTimeHours
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner de Impacto Económico */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/40 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800">
            Pipeline: Predicción IA ➔ Match Express ➔ Logística JIT
          </span>
          <h2 className="text-xl font-black text-slate-100 mt-2">
            Licatación Autónoma de Repuestos Críticos
          </h2>
          <p className="text-xs text-slate-400 max-w-xl">
            La alerta del sensor activa el requerimiento en el Marketplace B2B. Los proveedores adjudican e inician despacho express antes de detener el equipo.
          </p>
        </div>

        {savingsCalculated && (
          <div className="bg-emerald-950/60 border border-emerald-500/50 p-4 rounded-xl text-right space-y-0.5">
            <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Ahorro Retorno ROI Calculado</div>
            <div className="text-2xl font-black font-mono text-emerald-300">
              ${(savingsCalculated.netSavingsUSD / 1000000).toFixed(2)}M USD
            </div>
            <div className="text-[10px] text-slate-300 font-mono">
              Repuesto llega {savingsCalculated.timeBeforeShutdown} hrs antes de la parada
            </div>
          </div>
        )}
      </div>

      {/* Tarjeta de Falla Predicha por el Gemelo */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <h3 className="text-sm font-bold text-slate-100">{activeAlert.component}</h3>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Part Number Requerido: <span className="text-cyan-300 font-bold">{activeAlert.partNumber}</span>
            </p>
          </div>

          <div className="flex gap-3 text-xs font-mono">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 block">TIEMPO HASTA FALLA</span>
              <span className="text-rose-400 font-bold text-sm">{activeAlert.timeToFailureHours} Horas</span>
            </div>
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 block">COSTO PARADA NO PROG.</span>
              <span className="text-amber-400 font-bold text-sm">${(activeAlert.estimatedDowntimeCostPerHour / 1000).toFixed(0)}k USD/hr</span>
            </div>
          </div>
        </div>

        {/* Tabla Match de Ofertas de Proveedores */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
              ⚡ Ofertas de Proveedores B2B en Tiempo Real (Match Express)
            </h4>
            <span className="text-[10px] text-emerald-400 font-mono">3 Proveedores disponibles con Stock</span>
          </div>

          <div className="grid gap-3">
            {supplierBids.map((bid) => {
              const isSelected = selectedBid?.id === bid.id;
              const arrivesInTime = bid.deliveryTimeHours < activeAlert.timeToFailureHours;

              return (
                <div
                  key={bid.id}
                  className={`p-4 rounded-xl border transition flex flex-col md:flex-row justify-between items-center gap-4 ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500/80 ring-1 ring-emerald-500/50'
                      : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1 w-full md:w-auto">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-xs">{bid.supplier}</span>
                      {bid.verifiedOEM && (
                        <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[9px] px-1.5 py-0.5 rounded font-mono">
                          OEM VERIFICADO
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-3 font-mono">
                      <span>📍 {bid.stockLocation}</span>
                      <span>★ {bid.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right font-mono">
                      <div className="text-xs text-slate-400">Tiempo Entrega:</div>
                      <div className={`text-xs font-bold ${arrivesInTime ? 'text-emerald-400' : 'text-rose-400'}`}>
                        🚚 {bid.deliveryTimeHours} Horas {arrivesInTime ? '(A tiempo)' : '(Riesgo)'}
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xs text-slate-400">Valor Valorizado:</div>
                      <div className="text-sm font-black text-slate-100">${bid.priceUSD.toLocaleString()} USD</div>
                    </div>

                    <button
                      onClick={() => adjudicarRepuesto(bid)}
                      disabled={isSelected}
                      className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 cursor-default'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                      }`}
                    >
                      {isSelected ? '✓ Adjudicado' : 'Adjudicar & Despachar'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Integración Marketplace de Excedentes (Bucle Circular) */}
      <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl flex flex-wrap justify-between items-center gap-4">
        <div>
          <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            ♻️ Publicación Automática en Marketplace de Excedentes
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            El componente retirado se clasifica mediante IA para venta inmediata de chatarra/reacondicionamiento a proveedores autorizados.
          </p>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-xl text-xs font-mono transition">
          Publicar Componente Usado →
        </button>
      </div>
    </div>
  );
}