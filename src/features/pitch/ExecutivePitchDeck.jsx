import React, { useState } from 'react';

export default function ExecutivePitchDeck() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 'SLIDE-01',
      kpiBadge: 'VISIÓN ESTRATÉGICA C-SUITE',
      title: 'INDUSYNC Meta-OS: Inteligencia Prescriptiva en Tiempo Real',
      description: 'Maximizando el EBITDA operativo mediante el control autónomo del proceso y la digitalización integral de la cadena MRO.',
      content: (
        <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-cyan-400 font-bold uppercase text-[11px] tracking-wider">
              💎 Generación de Valor Financiero
            </h4>
            <ul className="space-y-2 text-slate-300 list-disc pl-4 leading-relaxed">
              <li><strong>Retorno de Inversión (ROI):</strong> Payback proyectado en menos de 4 meses de operación continua.</li>
              <li><strong>Incremento de Margen:</strong> Aumento directo del throughput sin inversión adicional en CAPEX masivo.</li>
              <li><strong>Reducción de Riesgo MRO:</strong> Eliminación de paradas no programadas mediante alertas prescriptivas.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-emerald-400 font-bold uppercase text-[11px] tracking-wider">
              📊 Métricas Clave de Desempeño
            </h4>
            <div className="space-y-2.5">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Aumento de Producción:</span>
                <span className="text-emerald-400 font-bold">+3.5% Throughput Neto</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Eficiencia Energética:</span>
                <span className="text-cyan-400 font-bold">-4.8% kWh/t Rendimiento</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Disponibilidad de Planta:</span>
                <span className="text-emerald-400 font-bold">96.8% Métrico</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'SLIDE-02',
      kpiBadge: 'ARQUITECTURA DE CONTROL EDGE AI',
      title: 'Bucle Cerrado Prescriptivo Sub-20ms sobre DCS/SCADA',
      description: 'Inferencia local ultrarrápida para optimización continua sin latencia de la nube.',
      content: (
        <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-cyan-400 font-bold uppercase text-[11px] tracking-wider">
              ⚡ Capa de Inferencia Local
            </h4>
            <ul className="space-y-2 text-slate-300 list-disc pl-4 leading-relaxed">
              <li><strong>Motor On-Premise:</strong> Algoritmos prescriptivos ejecutados en nodos Edge dedicados.</li>
              <li><strong>Conectividad OT:</strong> Integración directa con DCS Honeywell, ABB, Emerson y Rockwell vía OPC-UA.</li>
              <li><strong>Ajuste Autónomo:</strong> Inyección directa de setpoints en variables críticas del proceso.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-emerald-400 font-bold uppercase text-[11px] tracking-wider">
              🛡️ Resiliencia & Latencia
            </h4>
            <div className="space-y-2.5">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Latencia de Respuesta:</span>
                <span className="text-cyan-400 font-bold">Menor a 20 ms</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Autonomía Offline:</span>
                <span className="text-emerald-400 font-bold">100% Funcional sin Internet</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Estándar Ciberseguridad:</span>
                <span className="text-emerald-400 font-bold">ISA/IEC 62443</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'SLIDE-03',
      kpiBadge: 'MARKETPLACE B2B & MRO',
      title: 'Integración Automatizada de la Cadena de Suministro',
      description: 'Conectando la alerta de falla con la licitación y despacho JIT de repuestos críticos.',
      content: (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold text-xs">1. Detección Prescriptiva</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Anticipación de fallas en componentes críticos con 72 horas de ventaja.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold text-xs">2. Licitación Express B2B</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Apertura automática de requerimientos hacia red de proveedores validados.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold text-xs">3. Integración SAP PM</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Generación automática de SolPed y reserva de inventario en menos de 15 minutos.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 flex justify-between items-center flex-wrap gap-2">
            <div>
              <span className="text-cyan-300 font-bold text-xs block">Trazabilidad Criptográfica Blockchain</span>
              <span className="text-slate-400 text-[11px]">
                Auditoría inmutable para cada adjudicación, contrato y ahorro financiero generado.
              </span>
            </div>
            <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-lg text-[10px] font-bold">
              Certificación SOX / ISO 55001
            </span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 max-w-6xl mx-auto shadow-2xl">
      {/* Header Deck */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 text-slate-950 font-black px-3 py-1 rounded-xl text-xs font-mono uppercase tracking-wider">
            Executive Briefing
          </div>
          <h2 className="text-sm font-bold text-slate-100 font-mono tracking-wide">
            PITCH DE DIRECTORIO & C-SUITE
          </h2>
        </div>
        <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full font-bold">
          {slides[activeSlide].kpiBadge}
        </div>
      </div>

      {/* Slide Body */}
      <div className="space-y-4 min-h-[300px]">
        <div>
          <h3 className="text-2xl font-black text-slate-100 tracking-tight">
            {slides[activeSlide].title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            {slides[activeSlide].description}
          </p>
        </div>

        {slides[activeSlide].content}
      </div>

      {/* Slide Navigation Controls */}
      <div className="flex justify-between items-center border-t border-slate-800 pt-4 font-mono">
        <button
          onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
          disabled={activeSlide === 0}
          className="bg-slate-950 hover:bg-slate-800 disabled:opacity-30 text-slate-300 px-5 py-2.5 rounded-xl text-xs transition border border-slate-800"
        >
          ← Anterior
        </button>

        <div className="flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === idx ? 'w-8 bg-emerald-400' : 'w-2.5 bg-slate-800'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))}
          disabled={activeSlide === slides.length - 1}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}