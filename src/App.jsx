import React, { useState, useEffect } from 'react';
import ExecutiveDashboard from './features/csuite/ExecutiveDashboard';
import FinanceDashboard from './features/csuite/FinanceDashboard';
import WaterManagement from './features/esg/WaterManagement';
import AutoRescueP0 from './features/operator/AutoRescueP0';

// Estado Enterprise Multivariable con más de 30 métricas industriales y operacionales
const FULL_ENTERPRISE_STATE = {
  // Mercado & Commodities en vivo
  precioCobreLbUsd: 3.90,
  precioOroOzUsd: 2480.5,
  precioMolibdenoKgUsd: 42.10,
  
  // Planta Concentradora & Mina
  produccionDiariaTon: 82500,
  metaProduccionTon: 80000,
  eficienciaEnergetica: 94.2,
  disponibilidadFlota: 91.8,
  caexOperativos: 38,
  caexTotales: 42,
  toneladasMolidasHora: 3450,
  leyCabezaCu: 0.78,
  recuperacionPlantaPct: 89.2,
  
  // Métricas Financieras C-Suite & ROI
  cashCostC1: 1.26,
  ebitdaEstimadoMusd: 26.76,
  opexAcumuladoMusd: 142.8,
  capexProyectadoMusd: 85.0,
  ahorroIAacumuladoUsd: 1425000,
  ingresosTotalesMusd: 310.5,
  costoProcesamientoTon: 14.20,
  
  // Gobernanza ESG, Agua & Relaves (GISTM)
  estadoAcueducto: 'ÓPTIMO (100% OPERATIVO)',
  recuperacionAguaPct: 88.4,
  consumoEspecificoM3Ton: 0.42,
  nivelEmbalsePct: 91.2,
  flujoDesaladoraLps: 1250,
  presionTuberiaBar: 18.5,
  calidadPh: 7.8,
  emisionesCo2Ton: 0.82,
  estabilidadRelavesIndex: 99.4,
  
  // Infraestructura OT, SCADA & IA
  nodosScadaActivos: 1420,
  latenciaScadaMs: 12,
  versionAlgoritmoIA: 'v4.2-LSTM-ZeroTrust',
  alertasActivasP0: 0,
  alertasActivasP1: 2,
  ultimaInfeccionPrevenida: 'Hace 4 min (Firewall OT)'
};

export default function App() {
  const [activeTab, setActiveTab] = useState('executive');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [faena, setFaena] = useState('Cordillera Alta - Sector Norte');
  const [opState, setOpState] = useState(FULL_ENTERPRISE_STATE);
  const [timeString, setTimeString] = useState(new Date().toLocaleTimeString());

  // Reloj de telemetría y pequeñas variaciones dinámicas en tiempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeString(new Date().toLocaleTimeString());
      setOpState((prev) => ({
        ...prev,
        latenciaScadaMs: Math.floor(10 + Math.random() * 5),
        toneladasMolidasHora: Math.floor(3420 + Math.random() * 60),
        precioCobreLbUsd: +(3.89 + Math.random() * 0.03).toFixed(2),
      }));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Estructura jerárquica del Menú Navegador
  const navigationSections = [
    {
      title: 'ESTRATEGIA & C-SUITE',
      items: [
        { id: 'executive', label: 'Dashboard Ejecutivo', icon: '📊', description: 'Vista consolidada P&L' },
        { id: 'finanzas', label: 'Finanzas & ROI', icon: '💰', description: 'EBITDA y reducción OPEX' },
      ],
    },
    {
      title: 'OPERACIONES OT & PLANTA',
      items: [
        { id: 'p0', label: 'Auto-Rescue P0', icon: '🚨', badge: 'IA LIVE', description: 'Gemelo digital de mitigación' },
        { id: 'flota', label: 'Despacho CAEX', icon: '🚜', badge: 'PRÓXIMO', description: 'Optimización de camiones' },
      ],
    },
    {
      title: 'SOSTENIBILIDAD & ESG',
      items: [
        { id: 'agua', label: 'Recursos Hídricos', icon: '💧', description: 'Acueducto & Desaladora' },
        { id: 'relaves', label: 'Monitoreo Relaves', icon: '🛡️', badge: 'GISTM', description: 'Geotecnia & Sensores' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#070a11] text-slate-100 font-sans flex flex-col md:flex-row selection:bg-cyan-500 selection:text-slate-950">
      
      {/* BARRA LATERAL ENTERPRISE (SIDEBAR) */}
      <aside className={`${isSidebarOpen ? 'w-full md:w-72' : 'w-20'} bg-slate-900/90 border-r border-slate-800/80 p-4 flex flex-col justify-between transition-all duration-300 z-40 backdrop-blur-2xl`}>
        <div>
          {/* Logo y Encabezado de Marca */}
          <div className="flex items-center justify-between px-2 py-3 mb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20 ring-1 ring-white/20">
                ⚡
              </div>
              {isSidebarOpen && (
                <div>
                  <h1 className="font-black text-white text-base tracking-wider leading-none">INDUSYNC®</h1>
                  <p className="text-[9px] font-mono text-cyan-400 tracking-widest uppercase mt-1">Enterprise OS v4.2</p>
                </div>
              )}
            </div>
          </div>

          {/* Selector de Faena Minera */}
          {isSidebarOpen && (
            <div className="mb-6 px-2">
              <label className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Unidad Operativa Active</label>
              <select 
                value={faena}
                onChange={(e) => setFaena(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-medium focus:outline-none focus:border-cyan-500"
              >
                <option value="Cordillera Alta - Sector Norte">Faena Cordillera Alta (Cu-Mo)</option>
                <option value="Salar Sur - Planta Lixiviación">Planta Lixiviación Salar Sur</option>
                <option value="Puerto Coloso - Impulsión">Terminal Marítimo & Desaladora</option>
              </select>
            </div>
          )}

          {/* Grupos de Navegación */}
          <div className="space-y-6">
            {navigationSections.map((section, idx) => (
              <div key={idx} className="space-y-1">
                {isSidebarOpen && (
                  <p className="px-3 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {section.title}
                  </p>
                )}
                {section.items.map((item) => {
                  const isActive = activeTab === item.id;
                  const isDisabled = item.badge === 'PRÓXIMO';
                  return (
                    <button
                      key={item.id}
                      disabled={isDisabled}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-medium ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-transparent text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                          : isDisabled
                          ? 'opacity-40 cursor-not-allowed text-slate-600'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-base flex-shrink-0">{item.icon}</span>
                        {isSidebarOpen && (
                          <div className="text-left truncate">
                            <p className="leading-tight truncate">{item.label}</p>
                            <p className="text-[10px] text-slate-500 truncate font-normal">{item.description}</p>
                          </div>
                        )}
                      </div>
                      {isSidebarOpen && item.badge && (
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold flex-shrink-0 ${
                          item.badge === 'IA LIVE' ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse' :
                          item.badge === 'GISTM' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                          'bg-slate-800 text-slate-500'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Status SCADA & Estado de Red (Footer Sidebar) */}
        {isSidebarOpen && (
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 font-mono text-[10px] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">SCADA Telemetría:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  {opState.nodosScadaActivos} NODOS
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Latencia Red OT:</span>
                <span className="text-cyan-400">{opState.latenciaScadaMs} ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Seguridad Enclave:</span>
                <span className="text-purple-400">IEC 62443 PASSED</span>
              </div>
            </div>

            <p className="text-[9px] text-slate-600 font-mono text-center">
              INDUSYNC System Time: {timeString}
            </p>
          </div>
        )}
      </aside>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* HEADER SUPERIOR CON TICKER DE COMMODITIES */}
        <header className="bg-slate-900/60 border-b border-slate-800/80 px-6 py-3.5 flex flex-wrap justify-between items-center gap-4 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-slate-400 hover:text-white text-xs bg-slate-800/80 hover:bg-slate-700 p-2 rounded-lg border border-slate-700 transition cursor-pointer hidden md:flex items-center gap-1.5 font-mono"
            >
              <span>{isSidebarOpen ? '◀' : '▶'}</span>
              <span>{isSidebarOpen ? 'Colapsar' : 'Expandir'}</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                  PLATAFORMA EN TIEMPO REAL
                </span>
                <span className="text-xs text-slate-400 font-mono">• {faena}</span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight mt-0.5">
                Centro de Control Autónomo & Optimización Minera
              </h2>
            </div>
          </div>

          {/* Ticker de Precios de Mercado en Vivo */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-4 bg-slate-950/90 px-4 py-2 rounded-xl border border-slate-800/80 font-mono text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">Cu (LME)</span>
                <span className="text-emerald-400 font-bold">${opState.precioCobreLbUsd} USD/lb</span>
              </div>
              <div className="w-px h-6 bg-slate-800" />
              <div>
                <span className="text-[10px] text-slate-500 block">Au (Spot)</span>
                <span className="text-amber-400 font-bold">${opState.precioOroOzUsd} USD/oz</span>
              </div>
              <div className="w-px h-6 bg-slate-800" />
              <div>
                <span className="text-[10px] text-slate-500 block">Mo (FeMo)</span>
                <span className="text-slate-300 font-bold">${opState.precioMolibdenoKgUsd} USD/kg</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-xl font-mono text-xs font-bold">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              Zero-Trust Active
            </div>
          </div>
        </header>

        {/* ÁREA CENTRAL DINÁMICA DE MÓDULOS */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeTab === 'executive' && <ExecutiveDashboard data={opState} />}
          {activeTab === 'p0' && <AutoRescueP0 data={opState} />}
          {activeTab === 'finanzas' && <FinanceDashboard data={opState} />}
          {activeTab === 'agua' && <WaterManagement data={opState} />}
        </main>

        {/* PIE DE PÁGINA */}
        <footer className="border-t border-slate-800/80 px-8 py-4 bg-slate-950/60 backdrop-blur-md flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500 font-mono">
          <p>INDUSYNC® Enterprise OS • Sistema Operacional Autónomo para Alta Minería</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400">IEC 62443 Compliance</span>
            <span>•</span>
            <span className="text-slate-400">GISTM Water & Tailings</span>
            <span>•</span>
            <span className="text-cyan-400 font-bold">v4.2.0 PROD</span>
          </div>
        </footer>

      </div>

    </div>
  );
}