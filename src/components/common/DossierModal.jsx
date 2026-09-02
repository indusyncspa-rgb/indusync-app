import React, { useState } from 'react';

export default function DossierModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('executive'); // 'executive' | 'internal'

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Cabecera del Modal */}
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-950/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                DOCUMENTACIÓN OFICIAL INDUSYNC®
              </span>
              <span className="text-xs text-slate-400 font-mono">v2.4.0 • Clasificación: Confidencial</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">Dossier Técnico & Ejecutivo Meta-OS</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              📄 Exportar / Imprimir PDF
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition"
            >
              ✕ Cerrar
            </button>
          </div>
        </div>

        {/* Tabs Selector */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('executive')}
            className={`px-4 py-2.5 rounded-t-lg text-xs font-bold transition flex items-center gap-2 border-t border-x ${
              activeTab === 'executive'
                ? 'bg-slate-900 text-cyan-400 border-slate-800 border-b-slate-900'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            🏛️ Dossier Ejecutivo Corporativo (Board & C-Suite Whitepaper)
          </button>
          <button
            onClick={() => setActiveTab('internal')}
            className={`px-4 py-2.5 rounded-t-lg text-xs font-bold transition flex items-center gap-2 border-t border-x ${
              activeTab === 'internal'
                ? 'bg-slate-900 text-emerald-400 border-slate-800 border-b-slate-900'
                : 'text-slate-400 hover:text-slate-200 border-transparent'
            }`}
          >
            ⚙️ Dossier Técnico Interno (Core Architecture & Engineering)
          </button>
        </div>

        {/* Contenido Imprimible */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-300 text-sm leading-relaxed print:text-black print:bg-white print:p-0">
          
          {/* ================= DOSSIER EJECUTIVO ================= */}
          {activeTab === 'executive' && (
            <div className="space-y-8">
              
              {/* Portada Resumen */}
              <div className="bg-gradient-to-r from-cyan-950/40 to-slate-900 p-6 rounded-xl border border-cyan-500/30">
                <p className="text-cyan-400 font-mono text-xs font-bold uppercase tracking-wider">Propuesta de Valor Estratégica</p>
                <h3 className="text-2xl font-extrabold text-white mt-1">INDUSYNC® Meta-OS: Sistema Operativo de Inteligencia Artificial Autónoma para la Alta Minería</h3>
                <p className="mt-2 text-slate-300 text-sm">
                  INDUSYNC Meta-OS unifica telemetría SCADA/OT, gemelo digital preventivo y despacho autónomo multivariable en una sola plataforma de comando en tiempo real. Diseñado para maximizar el EBITDA operacional y garantizar cero detenciones catastróficas P0.
                </p>
              </div>

              {/* KPIs de Retorno Financiero */}
              <div>
                <h4 className="text-base font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
                  <span>💰</span> Impacto en P&L y Cash Cost C1
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">Retorno Anual Estimado (EBITDA+)</p>
                    <p className="text-2xl font-black text-emerald-400 font-mono mt-1">+$26.76 M USD/año</p>
                    <p className="text-[11px] text-slate-500 mt-1">Basado en planta de 30 MTon/año</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">Reducción Cash Cost C1</p>
                    <p className="text-2xl font-black text-cyan-400 font-mono mt-1">-US$ 0.042 / lb</p>
                    <p className="text-[11px] text-slate-500 mt-1">Optimización de energía & reactivos</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400">Prevención Falla Crítica P0</p>
                    <p className="text-2xl font-black text-purple-400 font-mono mt-1">100% Cobertura</p>
                    <p className="text-[11px] text-slate-500 mt-1">Auto-Rescue protocol activo</p>
                  </div>
                </div>
              </div>

              {/* Módulos Clave para Directorio */}
              <div>
                <h4 className="text-base font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
                  <span>🎯</span> Pilares de Transformación Operacional
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <p className="font-bold text-cyan-400 text-sm">1. Auto-Rescue & Prevención P0</p>
                    <p className="mt-1 text-slate-400">Intervención autónoma de seguridad ante picos térmicos o de vibración en Chancado/Molienda. Evita pérdidas estimadas en +$140,000 USD/hora por detención no programada.</p>
                  </div>
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <p className="font-bold text-emerald-400 text-sm">2. Despacho Autónomo por IA</p>
                    <p className="mt-1 text-slate-400">Optimización estocástica de flota CAEX que reduce tiempos de espera en pala hasta un 18% y disminuye consumo de diésel en 4.2 kWh/t equivalentes.</p>
                  </div>
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <p className="font-bold text-yellow-400 text-sm">3. Gobernanza ESG & SERNAGEOMIN</p>
                    <p className="mt-1 text-slate-400">Cumplimiento en tiempo real de normativas de depósitos de relaves (GISTM), radar geotécnico de taludes y monitoreo automatizado de huella hídrica y de carbono.</p>
                  </div>
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <p className="font-bold text-purple-400 text-sm">4. Ciberseguridad OT Zero-Trust</p>
                    <p className="mt-1 text-slate-400">Protección militar estandarizada bajo norma IEC 62443. Aislamiento de enclaves industriales y encriptación de telemetría de extremo a extremo.</p>
                  </div>
                </div>
              </div>

              {/* Roadmap de Implementación */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-3">🚀 Plan de Pilotaje e Integración en Faena (4 Semanas)</h4>
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400">
                  <li><strong className="text-slate-200">Semana 1: Integración No Invasiva:</strong> Conexión vía OPC-UA / MQTT Bridge a historiadores existentes (OSIsoft PI, Wonderware, SAP PM).</li>
                  <li><strong className="text-slate-200">Semana 2: Calibración del Gemelo Digital:</strong> Carga de datos históricos y ajuste del motor predictivo con algoritmos geometalúrgicos de faena.</li>
                  <li><strong className="text-slate-200">Semana 3: Pilotaje en Modo Sombra (Shadow Mode):</strong> Validación de alertas P0 y recomendaciones de despacho en paralelo con sala de control actual.</li>
                  <li><strong className="text-slate-200">Semana 4: Puesta en Marcha & Entrega C-Suite:</strong> Habilitación de control asistido y dashboards ejecutivos en tiempo real.</li>
                </ol>
              </div>

            </div>
          )}

          {/* ================= DOSSIER TÉCNICO INTERNO ================= */}
          {activeTab === 'internal' && (
            <div className="space-y-8 font-mono text-xs">
              
              <div className="bg-slate-950 p-6 rounded-xl border border-emerald-500/30">
                <p className="text-emerald-400 font-bold uppercase tracking-wider">Especificación Técnica de Ingeniería Interna</p>
                <h3 className="text-xl font-bold text-white mt-1 font-sans">INDUSYNC® Architecture & Technical Blueprint</h3>
                <p className="mt-2 text-slate-400 font-sans text-xs">
                  Documento confidencial para el equipo de desarrollo, arquitectura cloud/edge y ciberseguridad industrial.
                </p>
              </div>

              {/* Arquitectura de Frontend & Lazy Loading */}
              <div>
                <h4 className="text-sm font-bold text-emerald-400 border-b border-slate-800 pb-2 mb-3">
                  1. Arquitectura de Micro-Frontends & Vite Glob Module Federation
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li><strong className="text-white">Carga Perezosa Dinámica:</strong> Implementación mediante <code className="text-cyan-400 bg-slate-950 px-1 py-0.5 rounded">import.meta.glob('./features/**/*.jsx')</code> con Suspense boundary por módulo.</li>
                  <li><strong className="text-white">Aislamiento de Módulos (Sandbox):</strong> Envoltura con <code className="text-cyan-400 bg-slate-950 px-1 py-0.5 rounded">createLazyComponent</code> que intercepta fallos de sintaxis o renderizado para evitar la caída global del DOM.</li>
                  <li><strong className="text-white">Gestión de Estado global:</strong> React Context API unificado (`AuthContext`) con fallback defensivo contra estados <code className="text-amber-400">undefined</code> durante la inicialización.</li>
                </ul>
              </div>

              {/* Telemetría OT y Pipeline de Datos */}
              <div>
                <h4 className="text-sm font-bold text-emerald-400 border-b border-slate-800 pb-2 mb-3">
                  2. Telemetría Edge Mesh & Streaming de Alta Frecuencia
                </h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p><span className="text-cyan-400">Protocolos Soportados:</span> OPC-UA, Modbus TCP, MQTT-SN, Profinet, CAN Bus (J1939 para flota CAEX).</p>
                  <p><span className="text-cyan-400">Latencia Objetivo:</span> &lt; 50ms para alertas P0 en transmisores de temperatura/vibración de Chancador Secundario.</p>
                  <p><span className="text-cyan-400">Modo Off-Grid:</span> Sincronización diferida mediante IndexedDB local y protocolo de consistencia Starlink Mesh Sync.</p>
                </div>
              </div>

              {/* Motores de IA e Inferencia */}
              <div>
                <h4 className="text-sm font-bold text-emerald-400 border-b border-slate-800 pb-2 mb-3">
                  3. Algoritmos de IA & Inferencia en Borde
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <p className="font-bold text-cyan-400">Auto-Rescue Engine</p>
                    <p className="text-[11px] text-slate-400 mt-1">Clasificador supervisado Random Forest + LSTM para detección temprana de anomalías en rodillos y lubricación SAG.</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <p className="font-bold text-cyan-400">Autonomous Fleet Dispatcher</p>
                    <p className="text-[11px] text-slate-400 mt-1">Optimización mediante Aprendizaje por Refuerzo (Deep Q-Learning) para asignación estocástica de camiones en ruta mina-botadero-chancado.</p>
                  </div>
                </div>
              </div>

              {/* Ciberseguridad OT */}
              <div>
                <h4 className="text-sm font-bold text-emerald-400 border-b border-slate-800 pb-2 mb-3">
                  4. Estándar de Seguridad IEC 62443 / Zero-Trust
                </h4>
                <p className="text-slate-300">
                  Encriptación AES-256 en tránsito y reposo. Tokenización JWT con rotación dinámica de claves de enlace OT/IT. Rol-Based Access Control (RBAC) con separación estricta de permisos entre la capa ejecutiva (C-Suite) y la capa de control operativo (SCADA OT).
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Pie de página del modal */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-xs text-slate-500 font-mono">
          <span>INDUSYNC Corp. © 2026 • Todos los derechos reservados.</span>
          <span>Antofagasta • Chile</span>
        </div>

      </div>
    </div>
  );
}