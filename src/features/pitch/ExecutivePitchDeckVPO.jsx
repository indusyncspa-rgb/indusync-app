import React, { useState } from 'react';

export default function ExecutivePitchDeckVPO() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 'SLIDE-01',
      kpiBadge: 'ARQUITECTURA DE CONTROL & INFERENCIA EDGE AI',
      title: 'Bucle Cerrado Prescriptivo Sub-20ms sobre DCS/SCADA',
      description: 'Optimizando el rendimiento específico (kWh/t) y eliminando el riesgo de embancamiento en tiempo real.',
      content: (
        <div className="grid md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-cyan-400 font-bold uppercase text-[11px] tracking-wider">
              ⚡ Capa de Inferencia Local (Zero-Cloud Latency)
            </h4>
            <ul className="space-y-2 text-slate-300 list-disc pl-4 leading-relaxed">
              <li><strong>Motor On-Premise:</strong> Inferencia ejecutada en servidores Edge en la misma subestación de control OT.</li>
              <li><strong>Integración Multimarca:</strong> Conexión nativa vía OPC-UA / Modbus TCP a DCS Honeywell Experion, ABB Ability, Emerson DeltaV y Rockwell.</li>
              <li><strong>Control Prescriptivo Autónomo:</strong> Inyección dinámica de setpoints (m³/h de agua, RPM y tph) directamente en las pautas de control del Molino SAG.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-emerald-400 font-bold uppercase text-[11px] tracking-wider">
              📈 Impacto Directo en KPIs Metalúrgicos
            </h4>
            <div className="space-y-2.5">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Throughput (tph):</span>
                <span className="text-emerald-400 font-bold">+3.5% Incremento Neto</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Consumo Específico (kWh/t):</span>
                <span className="text-cyan-400 font-bold">-4.8% Reducción Energética</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">Disponibilidad Física (DF):</span>
                <span className="text-emerald-400 font-bold">96.8% (vs 92.1% Baseline)</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'SLIDE-02',
      kpiBadge: 'CADENA DE SUMINISTRO & LICITACIONES B2B JIT',
      title: 'De la Predicción de Falla al Despacho de Repuestos en Minutos',
      description: 'Asegurando componentes críticos antes de la parada programada con el ecosistema de licitaciones B2B.',
      content: (
        <div className="space-y-4 font-mono text-xs">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-rose-400 font-bold text-xs">1. Detección Temprana (Edge)</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                La IA detecta fisura de revestimiento o desgaste anómalo en chumaceras 72 horas antes del fallo catastrófico.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold text-xs">2. Licitación Express & Match B2B</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Apertura automática de licitación express o asignación directa JIT. Notificación a más de 500+ proveedores homologados.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold text-xs">3. Despacho JIT & Inyección SAP</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Adjudicación por algoritmo de menor SLA/precio. Generación de SolPed y Reserva en SAP PM en menos de 15 min.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/30 flex justify-between items-center flex-wrap gap-2">
            <div>
              <span className="text-cyan-300 font-bold text-xs block">Grandes Licitaciones MRO & Obras Mayores</span>
              <span className="text-slate-400 text-[11px]">
                Gestión transparente de bases, preguntas/respuestas, calificación técnica con scoring IA y adjudicación respaldada en Blockchain.
              </span>
            </div>
            <span className="bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-lg text-[10px] font-bold">
              Cero Corrupción / 100% Transparente
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'SLIDE-03',
      kpiBadge: 'ARQUITECTURA RESILIENTE EN TERRENO',
      title: 'Operación Off-Grid, Seguridad OT & Trazabilidad Criptográfica',
      description: 'Diseñado bajo estándar ISA/IEC 62443 para redes industriales aisladas y subterráneas.',
      content: (
        <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-purple-400 font-bold text-xs">📱 Modo Off-Grid Total (PWA)</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Mantenedores e inspectores registran mediciones y pautas en mina subterránea sin cobertura. Motor IndexedDB local sincroniza cambios al detectar red 5G privada/Wi-Fi.
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-amber-400 font-bold text-xs">🛡️ Ciberseguridad OT (Purdue Model)</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Cumplimiento estricto de segmentación Nivel 2/3. La IA opera tras un Unidirectional Data Diode / Firewall industrial evitando cualquier vector de ataque externo.
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-emerald-400 font-bold text-xs">📄 Certificación Blockchain (SHA-256)</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Sello inmutable en cada orden de compra, pauta de mantenimiento y cálculo de ahorro financiero para auditorías ISO 55001 y SOX.
            </p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-cyan-400 font-bold text-xs">🤖 Copiloto LLM de Campo (Local)</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Modelo de lenguaje cuantizado (7B) entrenado con manuales OEM de la planta para responder consultas técnicas de mantenedores por voz o texto en 300 ms.
            </p>
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
          <div className="bg-cyan-500 text-slate-950 font-black px-3 py-1 rounded-xl text-xs font-mono uppercase tracking-wider">
            VPO Briefing
          </div>
          <h2 className="text-sm font-bold text-slate-100 font-mono tracking-wide">
            PLATAFORMA INTEGRAL DE INTELIGENCIA PRESCRIPTIVA
          </h2>
        </div>
        <div className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-3 py-1 rounded-full font-bold">
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
                activeSlide === idx ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-800'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))}
          disabled={activeSlide === slides.length - 1}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition shadow-lg shadow-cyan-500/20"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}