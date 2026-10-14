// src/features/esg/SERNAGEOMINAuditorView.jsx
import React, { useState } from 'react';

export default function SERNAGEOMINAuditorView() {
  const [faenaStatus, setFaenaStatus] = useState('AUDITED_SAFE');
  const [isExporting, setIsExporting] = useState(false);
  const [complianceScore, setComplianceScore] = useState(98.4);

  const [blackBoxEvents, setBlackBoxEvents] = useState([
    {
      id: 'EVT-2026-0981',
      timestamp: '2026-10-13 22:45:12.102',
      equipo: 'Chancador Primario No. 1',
      tipo: 'Activación Interlock Volumétrico',
      latencia: '12ms',
      bloqueoFisico: 'Apron Feeder Detenido (Relé SIL-3)',
      estadoSernageomin: 'RESPALDADO - CAJA NEGRA EDGE',
      hash: '0x8f9a2b...c41e'
    },
    {
      id: 'EVT-2026-0980',
      timestamp: '2026-10-13 18:20:05.410',
      equipo: 'Pala Extracción 01 - Bahía Mantenimiento',
      tipo: 'Detección Línea de Fuego / Hombre en Riesgo',
      latencia: '11ms',
      bloqueoFisico: 'Sirena Disuasiva 110dB + Bloqueo Hidráulico',
      estadoSernageomin: 'RESPALDADO - CAJA NEGRA EDGE',
      hash: '0x3d2e1f...a90b'
    }
  ]);

  const handleGenerarDossier = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('📄 Dossier de Evidencia Cierre SERNAGEOMIN (DS 132) generado y exportado con éxito.');
    }, 1500);
  };

  return (
    <div className="p-6 bg-slate-950 min-h-screen text-slate-100 font-sans space-y-6">
      {/* HEADER INSTITUCIONAL / SERNAGEOMIN COMPLIANCE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/90 p-6 rounded-2xl border border-cyan-500/30 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl border border-cyan-500/30 text-3xl">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-wider text-white">RESPALDO AUDITOR SERNAGEOMIN & CERO FATALIDAD</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/40 font-bold">
                REGLAMENTO DS 132
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Caja Negra Ciber-Física Inalterable & Certificación de Barreras Duras de Borde (Edge AI)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleGenerarDossier}
            disabled={isExporting}
            className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2"
          >
            {isExporting ? '⏳ Generando Dossier...' : '📄 Generar Dossier Fiscalización'}
          </button>
        </div>
      </div>

      {/* COMPARATIVA DE GOBERNANZA: PAPEL VS BARRICADA CIBER-FÍSICA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PARADIGMA OBSOLETO (PAPEL) */}
        <div className="bg-slate-900/60 border border-rose-500/30 rounded-2xl p-5 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-rose-500/20 text-rose-400 text-[10px] font-mono font-bold px-3 py-1 rounded-bl-xl border-l border-b border-rose-500/30">
            RIESGO PENAL & SUSPENSIÓN
          </div>
          <h3 className="text-sm font-bold text-rose-400 font-mono flex items-center gap-2">
            <span>📋 CONTROL TRADICIONAL (Acreditación Manual)</span>
          </h3>
          <ul className="space-y-2.5 font-mono text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">❌</span>
              <span><strong>Permisos de Trabajo (PT):</strong> Matrices de papel incapaces de detener mecánicamente un equipo en milisegundos.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">❌</span>
              <span><strong>Acreditación Estática:</strong> Controles visuales propensos a error humano en líneas de fuego de alta energía.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">❌</span>
              <span><strong>Impacto Directivo:</strong> Paralización total por SERNAGEOMIN ante incidentes graves ($2M–$5M USD/día).</span>
            </li>
          </ul>
        </div>

        {/* PARADIGMA INDUSYNC (BARRICADA DE BORDE) */}
        <div className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-5 space-y-4 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold px-3 py-1 rounded-bl-xl border-l border-b border-emerald-500/30">
            GARANTÍA CERO FATALIDAD
          </div>
          <h3 className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-2">
            <span>🛡️ BARRICADA CIBER-FÍSICA INDUSYNC®</span>
          </h3>
          <ul className="space-y-2.5 font-mono text-xs text-slate-200">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✅</span>
              <span><strong>Interlock Volumétrico Autonomous:</strong> Corte mecánico directo vía relé SIL-3 en menos de 15ms.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✅</span>
              <span><strong>Caja Negra Criptográfica:</strong> Resguardo local inalterable que respalda la gestión legal del Directorio.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">✅</span>
              <span><strong>Continuidad Operativa ESG:</strong> Protección matemática del EBITDA y de la vida de los trabajadores.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* TABLA CAJA NEGRA EDGE / REGISTRO DE FISCALIZACIÓN */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <span>📼 CAJA NEGRA EDGE: REGISTRO INALTERABLE DE EVENTOS CRÍTICOS</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">Trazabilidad oficial exigible ante peritajes de fiscalización e inspección de faena</p>
          </div>
          <div className="text-right font-mono text-xs">
            <span className="text-slate-400">COBERTURA DS 132: </span>
            <span className="text-emerald-400 font-bold">{complianceScore}%</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/50">
                <th className="p-3">ID EVENTO</th>
                <th className="p-3">TIMESTAMP EDGE</th>
                <th className="p-3">EQUIPO / ZONA</th>
                <th className="p-3">INTERVENCIÓN AUTÓNOMA</th>
                <th className="p-3">LATENCIA</th>
                <th className="p-3">ESTADO AUDITORIA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {blackBoxEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3 font-bold text-cyan-400">{evt.id}</td>
                  <td className="p-3 text-slate-300">{evt.timestamp}</td>
                  <td className="p-3 font-semibold text-slate-200">{evt.equipo}</td>
                  <td className="p-3 text-slate-300">{evt.bloqueoFisico}</td>
                  <td className="p-3 text-emerald-400 font-bold">{evt.latencia}</td>
                  <td className="p-3">
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded text-[10px] font-bold border border-emerald-500/30">
                      {evt.estadoSernageomin}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}