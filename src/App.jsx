import React, { useState } from 'react';
import ExecutiveDashboard from './features/csuite/ExecutiveDashboard';
import FinanceDashboard from './features/csuite/FinanceDashboard';
import WaterManagement from './features/esg/WaterManagement';
import AutoRescueP0 from './features/operator/AutoRescueP0';

// Dataset operacional global de INDUSYNC Meta-OS
const initialData = {
  precioCobreLbUsd: 3.90,
  produccionDiariaTon: 82500,
  eficienciaEnergetica: 94.2,
  disponibilidadFlota: 91.8,
  cashCostC1: 1.26,
  ebitdaEstimadoMusd: 26.76,
  opexAcumuladoMusd: 142.8,
  ahorroIAacumuladoUsd: 1425000,
  estadoAcueducto: 'ÓPTIMO (100%)',
  recuperacionAguaPct: 88.4,
  consumoEspecificoM3Ton: 0.42,
  flujoDesaladoraLps: 1250,
  presionTuberiaBar: 18.5
};

export default function App() {
  const [role, setRole] = useState('ADMIN');
  const [mainTab, setMainTab] = useState('csuite');
  const [subTab, setSubTab] = useState('pitch');
  const [autoRescueActive, setAutoRescueActive] = useState(false);

  // Parámetros interactivos del Calculador de ROI
  const [procesamientoMTon, setProcesamientoMTon] = useState(30);
  const [precioCobreLp, setPrecioCobreLp] = useState(3.9);

  // Cálculos en tiempo real
  const ahorroEnergia = (procesamientoMTon * 0.85).toFixed(2);
  const reduccionCashCost = (procesamientoMTon * 0.042).toFixed(2);
  const valorTotalEbitda = (parseFloat(ahorroEnergia) + parseFloat(reduccionCashCost)).toFixed(2);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans p-4 md:p-6 space-y-4">
      {/* 1. ALERTA P0: BANNER ROJO SUPERIOR */}
      <div className="bg-[#2a080c] border border-red-800/80 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase">
              ALERTA P0: DETENCIÓN INMINENTE
            </span>
          </div>
          <h2 className="text-sm font-bold text-red-100 flex items-center gap-2">
            <span>⚠️</span> Chancador Secundario #3 - Temperatura de Rodamiento &gt; 115°C
          </h2>
          <p className="text-xs font-mono text-red-300">
            Pérdida estimada si no se interviene: <span className="font-bold text-white">$140,000 USD / hora</span>
          </p>
        </div>
        <button
          onClick={() => {
            setAutoRescueActive(true);
            setMainTab('scada');
            setSubTab('p0');
          }}
          className="bg-[#00e599] hover:bg-[#00c785] text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition shadow-lg shadow-emerald-500/20 whitespace-nowrap"
        >
          <span>🚀</span> Activar Auto-Rescue INDUSYNC®
        </button>
      </div>

      {/* 2. BARRA DE CABECERA PRINCIPAL */}
      <div className="bg-[#0d1424] border border-slate-800/80 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4 shadow-lg">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-950/80 border border-cyan-500/60 rounded-xl flex items-center justify-center font-bold text-cyan-400 text-xl shadow-lg shadow-cyan-500/20">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-lg font-black text-white tracking-wider">INDUSYNC</h1>
                <span className="text-[10px] font-bold text-cyan-400 font-mono bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">® Meta-OS</span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 tracking-wider">SOFTWARE IA INDUSTRIAL PARA LA ALTA MINERÍA</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap ml-0 lg:ml-4">
            <button 
              onClick={() => alert("Descargando INDUSYNC® Mobile App...")}
              className="bg-[#00e599] hover:bg-[#00c785] text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition"
            >
              <span>📱</span> Descargar App
            </button>
            <button 
              onClick={() => alert("Modo Técnico / Dev Activado")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition border border-slate-700"
            >
              <span>⚙️</span> Modo Técnico / Dev
            </button>
            <button 
              onClick={() => alert("Generando Dossier Ejecutivo PDF...")}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition shadow-md shadow-cyan-600/20"
            >
              <span>📄</span> Descargar Dossier
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-xs">
            <span className="text-slate-400">Rol:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-transparent text-cyan-400 font-bold focus:outline-none cursor-pointer uppercase"
            >
              <option value="ADMIN" className="bg-slate-900 text-white">ADMIN</option>
              <option value="VP OPERACIONES" className="bg-slate-900 text-white">VP OPERACIONES</option>
              <option value="SUPERINTENDENTE OT" className="bg-slate-900 text-white">SUPERINTENDENTE OT</option>
              <option value="OPERADOR SCADA" className="bg-slate-900 text-white">OPERADOR SCADA</option>
            </select>
          </div>

          <button 
            onClick={() => alert("Descargando App...")}
            className="bg-[#00e599] hover:bg-[#00c785] text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition"
          >
            <span>📱</span> Descargar App
          </button>
        </div>
      </div>

      {/* 3. TABS PRINCIPALES (HORIZONTALES) */}
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {[
          { id: 'csuite', label: '📊 C-Suite & Finanzas' },
          { id: 'mina', label: '⛏️ Mina & Operaciones' },
          { id: 'gemelo', label: '🌐 Gemelo Digital & IA' },
          { id: 'scada', label: '⚡ Mantenimiento & SCADA' },
          { id: 'esg', label: '💧 ESG & Geotecnia' },
          { id: 'cyber', label: '🛡️ Cyber & Acreditación' },
          { id: 'b2b', label: '♻️ Marketplace & B2B' },
        ].map((tab) => {
          const isActive = mainTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setMainTab(tab.id);
                if (tab.id === 'csuite') setSubTab('pitch');
                setAutoRescueActive(false);
              }}
              className={`px-4 py-2 rounded-xl transition cursor-pointer font-bold ${
                isActive
                  ? 'bg-[#0c233c] text-cyan-400 border border-cyan-500/80 shadow-lg shadow-cyan-500/10'
                  : 'bg-[#0d1424] text-slate-400 border border-slate-800/80 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. SUB-TABS SECUNDARIOS (PARA C-SUITE & FINANZAS) */}
      {mainTab === 'csuite' && (
        <div className="bg-[#0d1424] border border-slate-800/80 rounded-2xl p-2 flex flex-wrap gap-1.5 text-xs">
          {[
            { id: 'dashboard', label: 'Dashboard Ejecutivo' },
            { id: 'pitch', label: 'Pitch Directorio' },
            { id: 'mapa', label: 'Mapa Operacional' },
            { id: 'roi', label: 'Calculador ROI' },
            { id: 'finanzas_agua', label: 'Finanzas & Agua' },
            { id: 'metricas', label: 'Métricas Financieras' },
            { id: 'facturacion', label: 'Onboarding & Facturación' },
            { id: 'logs', label: 'Logs de Auditoría' },
          ].map((sub) => {
            const isSubActive = subTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => setSubTab(sub.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                  isSubActive
                    ? 'bg-[#00e599] text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}

      {/* 5. ÁREA DE CONTENIDO */}
      <main className="space-y-6">
        {/* VIEW: PITCH DIRECTORIO / CALCULADOR DE ROI */}
        {mainTab === 'csuite' && (subTab === 'pitch' || subTab === 'roi') && (
          <div className="bg-[#09101d] border border-slate-800/90 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <span>💰</span> Calculador de ROI & Valor para el Directorio
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Proyección de Impacto Financiero y Reducción de Cash Cost C1 con INDUSYNC Meta-OS
                </p>
              </div>
              <span className="px-3.5 py-1 bg-emerald-950/80 text-[#00e599] border border-emerald-800/60 rounded-full font-mono text-xs font-bold">
                Executive ROI Engine
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controles y Sliders */}
              <div className="lg:col-span-5 bg-[#0d1424] border border-slate-800 p-6 rounded-2xl space-y-6">
                <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
                  Parámetros Operacionales Faena
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Procesamiento Anual:</span>
                    <span className="text-[#00e599] font-bold font-mono">{procesamientoMTon} MTon/año</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="1"
                    value={procesamientoMTon}
                    onChange={(e) => setProcesamientoMTon(parseFloat(e.target.value))}
                    className="w-full accent-[#00e599] bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Precio Cobre Largo Plazo:</span>
                    <span className="text-[#00e599] font-bold font-mono">US$ {precioCobreLp.toFixed(1)}/lb</span>
                  </div>
                  <input
                    type="range"
                    min="2.5"
                    max="5.5"
                    step="0.1"
                    value={precioCobreLp}
                    onChange={(e) => setPrecioCobreLp(parseFloat(e.target.value))}
                    className="w-full accent-[#00e599] bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Tarjetas de Métricas de Retorno */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#0d1424] border border-slate-800 p-5 rounded-2xl">
                    <p className="text-xs text-slate-400">Ahorro Energético Molienda</p>
                    <p className="text-2xl font-black text-[#00e599] font-mono mt-2">${ahorroEnergia} M USD</p>
                    <p className="text-[11px] text-slate-400 mt-1">Eficiencia 4.2% kWh/t</p>
                  </div>

                  <div className="bg-[#0d1424] border border-slate-800 p-5 rounded-2xl">
                    <p className="text-xs text-slate-400">Reducción Cash Cost C1</p>
                    <p className="text-2xl font-black text-cyan-400 font-mono mt-2">${reduccionCashCost} M USD</p>
                    <p className="text-[11px] text-slate-400 mt-1">-US$ 0.042/lb en faena</p>
                  </div>
                </div>

                <div className="bg-[#0d1424] border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">VALOR RETORNO TOTAL ANUAL (EBITDA +)</p>
                  <p className="text-3xl md:text-4xl font-black text-[#00e599] font-mono mt-3">${valorTotalEbitda} M USD / año</p>
                  
                  <div className="mt-4 flex justify-end">
                    <span className="inline-flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800 text-[11px] font-mono text-cyan-400">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                      Realtime Event Stream (5)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: DASHBOARD EJECUTIVO */}
        {mainTab === 'csuite' && subTab === 'dashboard' && (
          <ExecutiveDashboard data={initialData} />
        )}

        {/* VIEW: FINANZAS & AGUA / METRICAS */}
        {mainTab === 'csuite' && (subTab === 'finanzas_agua' || subTab === 'metricas') && (
          <FinanceDashboard data={initialData} />
        )}

        {/* VIEW: ESG & GEOTECNIA / MAPA OPERACIONAL */}
        {(mainTab === 'esg' || (mainTab === 'csuite' && subTab === 'mapa')) && (
          <WaterManagement data={initialData} />
        )}

        {/* VIEW: AUTO-RESCUE P0 / MANTENIMIENTO & SCADA */}
        {(mainTab === 'scada' || mainTab === 'mina' || autoRescueActive) && (
          <AutoRescueP0 data={initialData} />
        )}

        {/* VIEW FALLBACK PARA CYBER, GEMELO DIGITAL Y B2B */}
        {(mainTab === 'cyber' || mainTab === 'b2b' || mainTab === 'gemelo' || (mainTab === 'csuite' && (subTab === 'facturacion' || subTab === 'logs'))) && (
          <div className="bg-[#0d1424] border border-slate-800 rounded-2xl p-10 text-center space-y-4 font-mono shadow-xl">
            <span className="text-4xl">🛡️</span>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Módulo {subTab.toUpperCase() || mainTab.toUpperCase()} Enclave Activo</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Conexión Zero-Trust establecida. Telemetría de tiempo real y canal de auditoría sincronizados con el nodo principal.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}