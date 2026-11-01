import React, { useState, lazy, Suspense, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

// Componentes Comunes
import Header from './components/common/Header';
import NotificationCenter from './components/common/NotificationCenter';
import InstallAppButton from './components/common/InstallAppButton';
import AlertBanner from './components/common/AlertBanner';

// Carga perezosa de módulos (Vite)
const featureModules = import.meta.glob('./features/**/*.jsx');

const ModuleFallback = ({ path, error }) => (
  <div className="p-8 bg-slate-900/80 border border-cyan-500/30 rounded-2xl text-center space-y-3 my-4 backdrop-blur-md">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-1" aria-hidden="true">
      🛡️
    </div>
    <h4 className="text-sm font-bold text-slate-200 tracking-wider uppercase">INDUSYNC® Meta-OS • Sub-Sistema Industrial Activo</h4>
    <p className="text-xs text-slate-400 max-w-md mx-auto">
      Ruta de despliegue OT: <span className="font-mono text-cyan-400">{path}</span>
    </p>
    {error && (
      <p className="text-[11px] font-mono text-rose-400/80 bg-rose-950/40 p-2 rounded max-w-lg mx-auto border border-rose-900/40">
        {error.toString()}
      </p>
    )}
  </div>
);

const createLazyComponent = (path) => {
  const importer = featureModules[path];
  if (!importer) {
    return () => <ModuleFallback path={path} error="Módulo en fase de síntesis autónoma." />;
  }
  return lazy(async () => {
    try {
      const mod = await importer();
      const Component = mod.default || Object.values(mod).find((v) => typeof v === 'function' || (typeof v === 'object' && v?.$$typeof));
      return { default: Component || (() => <ModuleFallback path={path} error="Estructura de exportación no válida." />) };
    } catch (err) {
      console.error(`Error sincronizando ${path}:`, err);
      return {
        default: () => <ModuleFallback path={path} error={err?.message || err} />
      };
    }
  });
};

const modules = {
  // C-Suite & Pitches
  exec_dash: createLazyComponent('./features/csuite/ExecutiveDashboard.jsx'),
  pitch: createLazyComponent('./features/csuite/ExecutivePitchMode.jsx'),
  vpo_pitch: createLazyComponent('./features/pitch/ExecutivePitchDeckVPO.jsx'),
  exec_pitch: createLazyComponent('./features/pitch/ExecutivePitchDeck.jsx'),
  ops_map: createLazyComponent('./features/csuite/ExecutiveOperationsMap.jsx'),
  roi_calc: createLazyComponent('./features/csuite/LiveROICalculator.jsx'),
  fin_water: createLazyComponent('./features/csuite/FinancialAndWaterView.jsx'),
  fin_metrics: createLazyComponent('./features/csuite/FinancialMetrics.jsx'),
  billing: createLazyComponent('./features/csuite/ClientOnboardingBilling.jsx'),
  audit: createLazyComponent('./features/csuite/AuditLogs.jsx'),

  // Mina & Operaciones
  chancadora_interlock: createLazyComponent('./features/mina/ChancadoraInterlockView.jsx'),
  line_of_fire: createLazyComponent('./features/mina/LineOfFireShield.jsx'),
  mine_ops: createLazyComponent('./features/mina/MineOperations.jsx'),
  dispatcher: createLazyComponent('./features/mina/AutonomousDispatcherAI.jsx'),
  fleet: createLazyComponent('./features/mina/GeospatialFleetTracker.jsx'),
  drilling: createLazyComponent('./features/mina/GeometallurgicalAutonomousDrillingAI.jsx'),
  ventilation: createLazyComponent('./features/mina/UndergroundVentilationAI.jsx'),
  fatigue: createLazyComponent('./features/mina/OperatorFatigueBiometricsAI.jsx'),
  field_mobile: createLazyComponent('./features/mina/FieldInspectionMobile.jsx'),
  shift_report: createLazyComponent('./features/mina/ShiftReportAI.jsx'),

  // Gemelo Digital
  twin_view: createLazyComponent('./features/gemelo/DigitalTwinView.jsx'),
  twin_sim: createLazyComponent('./features/gemelo/DigitalTwinSimulator.jsx'),
  twin_maint: createLazyComponent('./features/gemelo/DigitalTwinPredictiveMaintAI.jsx'),
  copilot: createLazyComponent('./features/gemelo/IndustrialCopilotAI.jsx'),
  ai_copilot: createLazyComponent('./features/gemelo/AIOperationalCopilot.jsx'),
  ai_engine: createLazyComponent('./features/gemelo/AIPredictiveEngine.jsx'),

  // SCADA & Mantenimiento
  scada_analytics: createLazyComponent('./features/scada/ScadaAnalyticsChart.jsx'),
  scada_telemetry: createLazyComponent('./features/scada/Telemetry.jsx'),
  pred_maint: createLazyComponent('./features/scada/PredictiveMaintenance.jsx'),
  sap_bridge: createLazyComponent('./features/scada/SAPIntegrationBridge.jsx'),
  sap_auto: createLazyComponent('./features/scada/SAPWorkOrderAutomation.jsx'),
  iot_mesh: createLazyComponent('./features/scada/IoTEdgeMeshMonitor.jsx'),
  offgrid: createLazyComponent('./features/scada/OffGridSync.jsx'),

  // ESG & Geotecnia
  sernageomin_auditor: createLazyComponent('./features/esg/SERNAGEOMINAuditorView.jsx'),
  sernageomin: createLazyComponent('./features/esg/SERNAGEOMINComplianceAI.jsx'),
  water_tailings: createLazyComponent('./features/esg/TailingsWaterManagementAI.jsx'),
  slope_radar: createLazyComponent('./features/esg/GeotechnicalSlopeRadarAI.jsx'),
  esg_carbon: createLazyComponent('./features/esg/ESGCarbonTracker.jsx'),
  hydrogen: createLazyComponent('./features/esg/EnergyGridHydrogenAI.jsx'),

  // Cyber & Seguridad
  military_security: createLazyComponent('./features/cyber/MilitarySecurityCoreView.jsx'),
  zero_trust: createLazyComponent('./features/cyber/ZeroTrustMilitarySecurity.jsx'),
  biometric: createLazyComponent('./features/cyber/BiometricAccreditation.jsx'),
  contractor_ai: createLazyComponent('./features/cyber/ContractorAccreditationAI.jsx'),
  contractors: createLazyComponent('./features/cyber/ContractorManagement.jsx'),
  cyber_circular: createLazyComponent('./features/cyber/CyberAndCircularView.jsx'),

  // Marketplace & Logística
  salfa_hub: createLazyComponent('./features/marketplace/SalfaSupplyHub.jsx'),
  salfa_fleet: createLazyComponent('./features/marketplace/SalfaFleetSecurity.jsx'),
  circ_market: createLazyComponent('./features/marketplace/CircularEconomyMarketplace.jsx'),
  circ_b2b_ai: createLazyComponent('./features/marketplace/CircularMarketplaceB2BAI.jsx'),
  market_std: createLazyComponent('./features/marketplace/Marketplace.jsx'),
  market_b2b: createLazyComponent('./features/marketplace/MarketplaceB2B.jsx'),
  tender_match: createLazyComponent('./features/marketplace/ProcurementTenderMatchAI.jsx'),
  supply_chain: createLazyComponent('./features/marketplace/SupplyChainProcurementAI.jsx'),
  radar_logistics: createLazyComponent('./features/marketplace/RadarLogistico.jsx')
};

const categorias = {
  csuite: {
    label: '📊 C-Suite & Finanzas',
    modulos: [
      { id: 'exec_dash', label: 'Dashboard Ejecutivo (US$ 230M ROI)' },
      { id: 'vpo_pitch', label: '🎯 Pitch VPO (Operaciones)' },
      { id: 'exec_pitch', label: '🚀 Executive Pitch B2B' },
      { id: 'pitch', label: 'Pitch Directorio' },
      { id: 'ops_map', label: 'Mapa Operacional' },
      { id: 'roi_calc', label: 'Calculador ROI Dinámico' },
      { id: 'fin_water', label: 'Finanzas & Agua' },
      { id: 'fin_metrics', label: 'Métricas Financieras (C1)' },
      { id: 'billing', label: 'Onboarding & Facturación' },
      { id: 'audit', label: 'Logs de Auditoría OT' }
    ]
  },
  mina: {
    label: '⛏️ Mina & Operaciones',
    modulos: [
      { id: 'chancadora_interlock', label: '⚡ Chancador Interlock Edge (menor a 15ms)' },
      { id: 'line_of_fire', label: '🛡️ Shield IA: Línea de Fuego' },
      { id: 'mine_ops', label: 'Operaciones Mina' },
      { id: 'dispatcher', label: 'Despacho Autónomo' },
      { id: 'fleet', label: 'Radar Flota CAEX' },
      { id: 'drilling', label: 'Perforación Geometalúrgica' },
      { id: 'ventilation', label: 'Ventilación Subterránea (CFM)' },
      { id: 'fatigue', label: 'Biometría & Fatiga' },
      { id: 'field_mobile', label: '📱 Inspección Móvil' },
      { id: 'shift_report', label: 'Bitácora Cambio Turno' }
    ]
  },
  gemelo: {
    label: '🌐 Gemelo Digital & IA',
    modulos: [
      { id: 'twin_view', label: 'Vista Gemelo Digital (60 FPS)' },
      { id: 'twin_sim', label: 'Simulador Proceso' },
      { id: 'twin_maint', label: 'Mantención Predictiva' },
      { id: 'copilot', label: 'Copiloto Industrial' },
      { id: 'ai_copilot', label: 'Copiloto Operacional' },
      { id: 'ai_engine', label: 'Motor Predictivo' }
    ]
  },
  scada: {
    label: '⚡ Mantenimiento & SCADA',
    modulos: [
      { id: 'scada_analytics', label: '📈 Telemetría Real-Time' },
      { id: 'scada_telemetry', label: 'SCADA Telemetría' },
      { id: 'pred_maint', label: 'Mantenimiento Predictivo' },
      { id: 'sap_bridge', label: 'SAP PM Integration' },
      { id: 'sap_auto', label: 'Automatización OT' },
      { id: 'iot_mesh', label: 'Monitor Malla IoT' },
      { id: 'offgrid', label: 'Sincronización Off-Grid (Delta-Sync)' }
    ]
  },
  esg: {
    label: '💧 ESG & Geotecnia',
    modulos: [
      { id: 'sernageomin_auditor', label: '🏛️ SERNAGEOMIN & Cero Fatalidad (DS 132)' },
      { id: 'sernageomin', label: 'SERNAGEOMIN Compliance' },
      { id: 'water_tailings', label: 'Agua & Relaves GISTM' },
      { id: 'slope_radar', label: 'Radar Taludes' },
      { id: 'esg_carbon', label: 'Huella Carbono' },
      { id: 'hydrogen', label: 'Matriz Energética' }
    ]
  },
  cyber: {
    label: '🛡️ Cyber & Acreditación',
    modulos: [
      { id: 'military_security', label: '🔒 Ciberseguridad Grado Militar' },
      { id: 'zero_trust', label: 'Cyber-OT IEC 62443 / NIST' },
      { id: 'biometric', label: 'Acreditación Biométrica' },
      { id: 'contractor_ai', label: 'Acreditación Contratistas (73.5%)' },
      { id: 'contractors', label: 'Gestión Contratistas' },
      { id: 'cyber_circular', label: 'Visión Cyber & Circular' }
    ]
  },
  marketplace: {
    label: '♻️ Marketplace & B2B',
    modulos: [
      { id: 'salfa_hub', label: 'Salfa OS: Supply Hub (VL02N)' },
      { id: 'salfa_fleet', label: 'Salfa OS: Fleet Security' },
      { id: 'circ_market', label: 'Excedentes ESG (120t Chatarra)' },
      { id: 'circ_b2b_ai', label: 'Marketplace B2B AI' },
      { id: 'market_std', label: 'Portal Marketplace' },
      { id: 'market_b2b', label: 'Portal B2B' },
      { id: 'tender_match', label: 'Licitaciones Exprés AI' },
      { id: 'supply_chain', label: 'Cadena Suministros' },
      { id: 'radar_logistics', label: 'Radar Logístico' }
    ]
  }
};

const SecurityWatermark = ({ userRole }) => (
  <div className="pointer-events-none fixed inset-0 z-[9999] flex flex-wrap items-center justify-around opacity-[0.025] select-none overflow-hidden font-mono text-[10px] text-cyan-400">
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="transform -rotate-12 whitespace-nowrap p-8">
        INDUSYNC® META-OS SUPREME — PROPIEDAD INDUSTRIAL (INAPI 1508687) — SOBERANÍA INDUSTRIAL OT — ROL: {userRole?.toUpperCase()}
      </div>
    ))}
  </div>
);

// Muro de Acceso Zero-Trust Militar (Soporta 20MINERIA26 para Meta-OS y SALFA2026 para SalfaOS)
const MilitaryAccessGate = ({ onAuthenticate }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPin = pin.trim();
    if (cleanPin === 'SALFA2026') {
      onAuthenticate({ tenant: 'SALFA_RENT', role: 'csuite' });
    } else if (cleanPin === '20MINERIA26' || cleanPin === 'INDUSYNC2026') {
      onAuthenticate({ tenant: 'INDUSYNC_CORE', role: 'csuite' });
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-950 flex items-center justify-center p-4 font-mono text-slate-100">
      <div className="max-w-lg w-full bg-slate-900/90 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden space-y-6">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500 animate-pulse" />
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-3xl mb-1 shadow-lg">
            🛡️
          </div>
          <h1 className="text-sm font-black tracking-[0.25em] uppercase text-slate-100">
            INDUSYNC META-OS v2.4.0 OT
          </h1>
          <p className="text-[10px] text-cyan-400 tracking-wider uppercase font-bold">
            SISTEMA OPERATIVO SOBERANO • CIBERSEGURIDAD OT & SERNAGEOMIN
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 font-sans font-semibold">
              Credencial de Alta Gerencia (Usa SALFA2026 o 20MINERIA26):
            </label>
            <input
              type="password"
              value={pin}
              maxLength={16}
              onChange={(e) => {
                setError(false);
                setPin(e.target.value);
              }}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest text-cyan-300 outline-none transition shadow-inner"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 text-xs text-center animate-bounce">
              ⚠️ Credencial Inválida. Intento {attempts} registrado en Audit Log (IEC 62443).
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition shadow-[0_0_20px_rgba(6,182,212,0.4)]"
          >
            Autorizar Ingreso al Sistema
          </button>
        </form>

        <div className="border-t border-slate-800/80 pt-4 text-center space-y-2">
          <p className="text-[11px] text-slate-300 italic font-sans leading-relaxed">
            "En honor al legado e integridad de mi padre, y en memoria de cada minero que entregó su vida en faena."
          </p>
          <div className="pt-2 text-[9px] text-slate-500 font-mono">
            Indusync SpA — Reg. INAPI Chile N° 1508687 • Normativa DS 132 & IEC 62443
          </div>
        </div>
      </div>
    </div>
  );
};

// UNIVERSO AISLADO SALFA OS
const SalfaTenantView = ({ onLogout }) => {
  const [salfaView, setSalfaView] = useState('logistics');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-red-600 selection:text-white">
      <header className="bg-slate-900/95 border-b border-slate-800 px-6 py-4 flex items-center justify-between backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3">
             <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-red-950 px-3.5 py-2 rounded-xl border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] flex items-center gap-2">
               <span className="text-white font-black tracking-wider text-sm">Salfa<span className="text-red-500">Rent</span></span>
             </div>
             <div className="hidden sm:block">
               <span className="text-xs text-slate-300 font-mono tracking-wider font-bold block">LOGÍSTICA B2B & FLEET SHIELD</span>
               <span className="text-[10px] text-cyan-400 font-mono">Powered by INDUSYNC® AI Industrial</span>
             </div>
           </div>
           
           <div className="hidden md:flex bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1 shadow-inner">
             <button 
               onClick={() => setSalfaView('logistics')}
               className={`px-5 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${salfaView === 'logistics' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow' : 'text-slate-400 hover:text-slate-200'}`}
             >
               📦 Supply Hub (SAP)
             </button>
             <button 
               onClick={() => setSalfaView('security')}
               className={`px-5 py-2 rounded-lg text-xs font-bold transition ${salfaView === 'security' ? 'bg-red-500/20 text-red-300 border border-red-500/40 shadow' : 'text-slate-400 hover:text-slate-200'}`}
             >
               🛡️ Fleet Security (Antirobo)
             </button>
           </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>TENANT: SALFA_RENT</span>
          </div>
          <button 
            onClick={onLogout} 
            className="text-xs px-3.5 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-800/80 text-red-300 rounded-lg font-mono transition shadow"
          >
            🔒 Salir
          </button>
        </div>
      </header>
      
      <main className="flex-1 p-6 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950">
         <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 font-mono">
              <div className="w-10 h-10 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
              <p className="text-xs text-red-400 tracking-wider">ESTABLECIENDO ENTORNO SEGURO SALFAOS...</p>
            </div>
         }>
            {salfaView === 'logistics' 
              ? React.createElement(createLazyComponent('./features/marketplace/SalfaSupplyHub.jsx'))
              : React.createElement(createLazyComponent('./features/marketplace/SalfaFleetSecurity.jsx'))
            }
         </Suspense>
      </main>
    </div>
  );
};

export default function App() {
  const [authSession, setAuthSession] = useState(null);
  const authContext = useAuth() || {};
  
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const forceTenant = urlParams ? urlParams.get('tenant') : null;

  // Si no hay sesión iniciada, mostramos el Muro de Acceso Militar
  if (!authSession && !forceTenant) {
    return <MilitaryAccessGate onAuthenticate={setAuthSession} />;
  }

  const activeTenant = authSession?.tenant || forceTenant || 'INDUSYNC_CORE';

  if (activeTenant === 'SALFA_RENT' || forceTenant === 'salfa') {
    return <SalfaTenantView onLogout={() => setAuthSession(null)} />;
  }

  const user = { role: 'csuite', tenant: activeTenant };
  const hasPermission = authContext.hasPermission || (() => true);
  const switchRole = authContext.switchRole || (() => {});
  const ROLES = authContext.ROLES || { CSUITE: 'csuite', OPERATOR: 'operator', ADMIN: 'admin' };

  const [sidebarColapsado, setSidebarColapsado] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState('csuite');
  const [moduloActivo, setModuloActivo] = useState('exec_dash');

  const [cmdPaletteAbierto, setCmdPaletteAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const [favoritos, setFavoritos] = useState(() => {
    try {
      const saved = localStorage.getItem('app_fav_modules_supreme');
      return saved ? JSON.parse(saved) : ['exec_dash', 'chancadora_interlock', 'sernageomin_auditor'];
    } catch {
      return ['exec_dash', 'chancadora_interlock', 'sernageomin_auditor'];
    }
  });

  const [fallaCritica, setFallaCritica] = useState(false);
  const [modalSernageominAbierto, setModalSernageominAbierto] = useState(false);

  const categoriasVisibles = useMemo(
    () => Object.keys(categorias).filter((catKey) => hasPermission(catKey)),
    [hasPermission]
  );

  const toggleFallaCritica = () => {
    setFallaCritica(!fallaCritica);
  };

  const handleCambioCategoria = (catKey) => {
    setCategoriaActiva(catKey);
    if (categorias[catKey]?.modulos[0]?.id) {
      setModuloActivo(categorias[catKey].modulos[0].id);
    }
  };

  const toggleFavorito = (e, modId) => {
    e.stopPropagation();
    setFavoritos((prev) =>
      prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]
    );
  };

  const ComponenteModulo = modules[moduloActivo] || (() => <ModuleFallback path={moduloActivo} error="Submódulo no asignado." />);

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col transition-colors duration-500 relative ${fallaCritica ? 'ring-8 ring-rose-600/60' : ''}`}>
      <SecurityWatermark userRole={user?.role} />
      <AlertBanner />

      {/* HEADER PRINCIPAL */}
      <header className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarColapsado(!sidebarColapsado)}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
          >
            ☰
          </button>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-black tracking-wider text-sm">INDUSYNC®</span>
            <span className="bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
              v2.4.0 OT
            </span>
          </div>
          <Header />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleFallaCritica}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 border ${
              fallaCritica ? 'bg-rose-600 text-white border-rose-400 animate-pulse' : 'bg-slate-950 hover:bg-rose-950/40 text-rose-400 border-rose-900/60'
            }`}
          >
            <span>⚡ Interlock Edge</span>
          </button>

          <button
            type="button"
            onClick={() => setModalSernageominAbierto(true)}
            className="px-3 py-1.5 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/60 text-cyan-300 rounded-lg text-xs font-mono font-bold transition"
          >
            <span>🏛️ Dossier SERNAGEOMIN</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthSession(null)}
            className="px-2.5 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 rounded-lg text-xs font-mono transition"
          >
            🔒 Bloquear
          </button>

          <InstallAppButton />
        </div>
      </header>

      {/* ESTRUCTURA PRINCIPAL */}
      <div className="flex flex-1 overflow-hidden">
        <aside className={`${sidebarColapsado ? 'w-16' : 'w-64'} bg-slate-900/50 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between shrink-0`}>
          <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="space-y-1">
              {!sidebarColapsado && <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">Categorías Siderúrgicas</div>}
              {categoriasVisibles.map((catKey) => {
                const esActiva = categoriaActiva === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => handleCambioCategoria(catKey)}
                    className={`w-full flex items-center ${sidebarColapsado ? 'justify-center px-0' : 'px-3'} py-2 rounded-lg text-xs font-semibold transition ${
                      esActiva ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate">{sidebarColapsado ? categorias[catKey]?.label.slice(0, 2) : categorias[catKey]?.label}</span>
                  </button>
                );
              })}
            </div>

            {!sidebarColapsado && categorias[categoriaActiva] && (
              <div className="pt-3 border-t border-slate-800 space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">Sub-Módulos OT</div>
                {categorias[categoriaActiva].modulos.map((m) => {
                  const esActivo = moduloActivo === m.id;
                  const esFav = favoritos.includes(m.id);
                  return (
                    <div
                      key={m.id}
                      onClick={() => setModuloActivo(m.id)}
                      className={`group flex items-center justify-between px-3 py-1.5 rounded-lg text-xs cursor-pointer transition ${
                        esActivo ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="truncate">{m.label}</span>
                      <button
                        type="button"
                        onClick={(e) => toggleFavorito(e, m.id)}
                        className={`text-[10px] ${esFav ? 'text-amber-300' : 'opacity-0 group-hover:opacity-100 text-slate-500'}`}
                      >
                        ★
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950">
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 font-mono">
              <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
              <p className="text-xs text-cyan-400 tracking-wider">SINCRONIZANDO SUB-SISTEMA INDUSTRIAL OT...</p>
            </div>
          }>
            <ComponenteModulo />
          </Suspense>
        </main>
      </div>
    </div>
  );
}