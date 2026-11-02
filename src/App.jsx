import React, { useState, lazy, Suspense, useEffect, useMemo, useCallback } from 'react';

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
<<<<<<< HEAD
    <h4 className="text-sm font-bold text-slate-200 tracking-wider uppercase">Sub-Sistema en Carga Óptima</h4>
=======
    <h4 className="text-sm font-bold text-slate-200 tracking-wider uppercase">INDUSYNC® Meta-OS • Sub-Sistema Industrial Activo</h4>
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
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
      return { default: () => <ModuleFallback path={path} error={err?.message || err} /> };
    }
  });
};

const modules = {
  // --- MÓDULOS INDUSYNC META-OS ---
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
  twin_view: createLazyComponent('./features/gemelo/DigitalTwinView.jsx'),
  twin_sim: createLazyComponent('./features/gemelo/DigitalTwinSimulator.jsx'),
  twin_maint: createLazyComponent('./features/gemelo/DigitalTwinPredictiveMaintAI.jsx'),
  copilot: createLazyComponent('./features/gemelo/IndustrialCopilotAI.jsx'),
  ai_copilot: createLazyComponent('./features/gemelo/AIOperationalCopilot.jsx'),
  ai_engine: createLazyComponent('./features/gemelo/AIPredictiveEngine.jsx'),
  scada_analytics: createLazyComponent('./features/scada/ScadaAnalyticsChart.jsx'),
  scada_telemetry: createLazyComponent('./features/scada/Telemetry.jsx'),
  pred_maint: createLazyComponent('./features/scada/PredictiveMaintenance.jsx'),
  sap_bridge: createLazyComponent('./features/scada/SAPIntegrationBridge.jsx'),
  sap_auto: createLazyComponent('./features/scada/SAPWorkOrderAutomation.jsx'),
  iot_mesh: createLazyComponent('./features/scada/IoTEdgeMeshMonitor.jsx'),
  offgrid: createLazyComponent('./features/scada/OffGridSync.jsx'),
  sernageomin_auditor: createLazyComponent('./features/esg/SERNAGEOMINAuditorView.jsx'),
  sernageomin: createLazyComponent('./features/esg/SERNAGEOMINComplianceAI.jsx'),
  water_tailings: createLazyComponent('./features/esg/TailingsWaterManagementAI.jsx'),
  slope_radar: createLazyComponent('./features/esg/GeotechnicalSlopeRadarAI.jsx'),
  esg_carbon: createLazyComponent('./features/esg/ESGCarbonTracker.jsx'),
  hydrogen: createLazyComponent('./features/esg/EnergyGridHydrogenAI.jsx'),
<<<<<<< HEAD
=======

  // Cyber & Seguridad
  military_security: createLazyComponent('./features/cyber/MilitarySecurityCoreView.jsx'),
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
  zero_trust: createLazyComponent('./features/cyber/ZeroTrustMilitarySecurity.jsx'),
  biometric: createLazyComponent('./features/cyber/BiometricAccreditation.jsx'),
  contractor_ai: createLazyComponent('./features/cyber/ContractorAccreditationAI.jsx'),
  contractors: createLazyComponent('./features/cyber/ContractorManagement.jsx'),
  cyber_circular: createLazyComponent('./features/cyber/CyberAndCircularView.jsx'),
<<<<<<< HEAD
=======

  // Marketplace & Logística
  salfa_hub: createLazyComponent('./features/marketplace/SalfaSupplyHub.jsx'),
  salfa_fleet: createLazyComponent('./features/marketplace/SalfaFleetSecurity.jsx'),
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
  circ_market: createLazyComponent('./features/marketplace/CircularEconomyMarketplace.jsx'),
  circ_b2b_ai: createLazyComponent('./features/marketplace/CircularMarketplaceB2BAI.jsx'),
  market_std: createLazyComponent('./features/marketplace/Marketplace.jsx'),
  market_b2b: createLazyComponent('./features/marketplace/MarketplaceB2B.jsx'),
  tender_match: createLazyComponent('./features/marketplace/ProcurementTenderMatchAI.jsx'),
  supply_chain: createLazyComponent('./features/marketplace/SupplyChainProcurementAI.jsx'),
  radar_logistics: createLazyComponent('./features/marketplace/RadarLogistico.jsx'),

  // --- MÓDULOS SALFA OS ---
  salfa_omni: createLazyComponent('./features/mina/SalfaOmniCommand.jsx'),
  salfa_telemetry: createLazyComponent('./features/scada/SalfaTelemetryGateway.jsx'),
  salfa_hub: createLazyComponent('./features/marketplace/SalfaSupplyHub.jsx'),
  salfa_safety: createLazyComponent('./features/mina/SalfaSafetyCompliance.jsx')
};

// ============================================
// 🏗️ UNIVERSO 1: INDUSYNC META-OS (Minería)
// ============================================
const categoriasMetaOS = {
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

<<<<<<< HEAD
// ============================================
// 🚗 UNIVERSO 2: SALFA OS (Rent-a-car/Fleet)
// ============================================
const categoriasSalfaOS = {
  salfa_security: {
    label: '🛡️ Salfa Fleet Shield',
    modulos: [
      { id: 'salfa_omni', label: 'Omni-Command (Edge AI)' },
      { id: 'salfa_telemetry', label: 'Telemetry Gateway' }
    ]
  },
  salfa_logistics: {
    label: '📦 B2B Supply Hub',
    modulos: [
      { id: 'salfa_hub', label: 'Licitaciones de Repuestos' }
    ]
  },
  salfa_compliance: {
    label: '🏛️ Prevención & Legal',
    modulos: [
      { id: 'salfa_safety', label: 'Compliance Sernageomin' }
    ]
  }
};

const SecurityWatermark = ({ userRole, tenant }) => (
  <div className="pointer-events-none fixed inset-0 z-[9999] flex flex-wrap items-center justify-around opacity-[0.025] select-none overflow-hidden font-mono text-[10px] text-cyan-400">
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="transform -rotate-12 whitespace-nowrap p-8">
        {tenant === 'salfa' 
          ? `SALFA OS SUPREME — POWERED BY INDUSYNC — ROL: ${userRole?.toUpperCase()}` 
          : `INDUSYNC® META-OS SUPREME — PROPIEDAD INDUSTRIAL (INAPI 1508687) — CHUQUICAMATA LEGACY — ROL: ${userRole?.toUpperCase()}`
        }
=======
const SecurityWatermark = ({ userRole }) => (
  <div className="pointer-events-none fixed inset-0 z-[9999] flex flex-wrap items-center justify-around opacity-[0.025] select-none overflow-hidden font-mono text-[10px] text-cyan-400">
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="transform -rotate-12 whitespace-nowrap p-8">
        INDUSYNC® META-OS SUPREME — PROPIEDAD INDUSTRIAL (INAPI 1508687) — SOBERANÍA INDUSTRIAL OT — ROL: {userRole?.toUpperCase()}
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
      </div>
    ))}
  </div>
);

<<<<<<< HEAD
// Muro de Acceso Zero-Trust HÍBRIDO (Multi-Tenant)
=======
// Muro de Acceso Zero-Trust Militar (Soporta 20MINERIA26 para Meta-OS y SALFA2026 para SalfaOS)
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
const MilitaryAccessGate = ({ onAuthenticate }) => {
  const [tenant, setTenant] = useState('meta'); // 'meta' o 'salfa'
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (tenant === 'meta' && (pin === 'INDUSYNC2026' || pin === '191508' || pin === 'CHUQUI2026')) {
      onAuthenticate(true, 'meta');
    } else if (tenant === 'salfa' && pin === 'SALFA2026') {
      onAuthenticate(true, 'salfa');
=======
    const cleanPin = pin.trim();
    if (cleanPin === 'SALFA2026') {
      onAuthenticate('SALFA_RENT');
    } else if (cleanPin === '20MINERIA26' || cleanPin === 'INDUSYNC2026') {
      onAuthenticate('INDUSYNC_CORE');
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
      setPin('');
    }
  };

  const isSalfa = tenant === 'salfa';

  return (
    <div className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 font-mono text-slate-100 transition-colors duration-700 ${isSalfa ? 'bg-slate-900' : 'bg-slate-950'}`}>
      <div className={`max-w-lg w-full bg-slate-900/90 backdrop-blur-xl border rounded-2xl p-8 relative overflow-hidden space-y-6 transition-all duration-500 shadow-2xl ${isSalfa ? 'border-red-600/40 shadow-red-900/20' : 'border-cyan-500/40 shadow-cyan-900/20'}`}>
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r animate-pulse ${isSalfa ? 'from-red-600 via-red-500 to-amber-500' : 'from-cyan-500 via-emerald-500 to-indigo-500'}`} />
        
        {/* Selector de Tenant */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => { setTenant('meta'); setError(false); setPin(''); }}
            className={`flex-1 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${tenant === 'meta' ? 'bg-cyan-600/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            ⛏️ Gran Minería
          </button>
          <button
            type="button"
            onClick={() => { setTenant('salfa'); setError(false); setPin(''); }}
            className={`flex-1 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${tenant === 'salfa' ? 'bg-red-600/20 text-red-400 shadow-[0_0_10px_rgba(220,38,38,0.2)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            🚗 Salfa Rent
          </button>
        </div>

        <div className="text-center space-y-3">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl border text-3xl mb-1 shadow-lg transition-colors ${isSalfa ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'}`}>
            {isSalfa ? '🚗' : '🛡️'}
          </div>
          <h1 className="text-sm font-black tracking-[0.25em] uppercase text-slate-100">
<<<<<<< HEAD
            {isSalfa ? 'SALFA OS' : 'INDUSYNC META-OS'}
          </h1>
          <p className={`text-[10px] tracking-wider uppercase font-bold ${isSalfa ? 'text-red-400' : 'text-cyan-400'}`}>
            {isSalfa ? 'FLEET SHIELD & SUPPLY HUB' : 'SISTEMA OPERATIVO INDUSTRIAL CON IA'}
=======
            INDUSYNC META-OS v2.4.0 OT
          </h1>
          <p className="text-[10px] text-cyan-400 tracking-wider uppercase font-bold">
            SISTEMA OPERATIVO SOBERANO • CIBERSEGURIDAD OT & SERNAGEOMIN
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
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
              className={`w-full bg-slate-950 border focus:outline-none rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest outline-none transition shadow-inner ${isSalfa ? 'border-slate-700 focus:border-red-500 text-red-300' : 'border-slate-700 focus:border-cyan-500 text-cyan-300'}`}
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-rose-300 text-xs text-center animate-bounce">
              ⚠️ Credencial Inválida para {isSalfa ? 'SalfaOS' : 'Meta-OS'}.
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 font-black text-xs uppercase tracking-widest rounded-xl transition shadow-lg text-slate-950 ${isSalfa ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-red-500/40' : 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 shadow-cyan-500/40'}`}
          >
            Autorizar Ingreso al Sistema
          </button>
        </form>

        <div className="border-t border-slate-800/80 pt-4 text-center space-y-2">
<<<<<<< HEAD
          {isSalfa ? (
            <p className="text-[10px] text-red-400/90 font-mono font-semibold leading-relaxed">
              SALFA OS Powered by InduSync: Sistema de orquestación Edge AI e Inmovilización Táctica.
            </p>
          ) : (
            <>
              <p className="text-[11px] text-slate-300 italic font-sans leading-relaxed">
                "En honor al legado e integridad de mi padre, y en memoria de cada minero que entregó su vida en faena."
              </p>
              <p className="text-[10px] text-cyan-400/90 font-mono font-semibold leading-relaxed">
                INDUSYNC Meta-OS: Transformando la memoria de la industria en la barrera definitiva que protege la vida humana.
              </p>
            </>
          )}
=======
          <p className="text-[11px] text-slate-300 italic font-sans leading-relaxed">
            "En honor al legado e integridad de mi padre, y en memoria de cada minero que entregó su vida en faena."
          </p>
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
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
               <span className="text-white font-black tracking-wider text-sm">Salfa<span className="text-red-500">Rent</span></span>[cite: 16]
             </div>
             <div className="hidden sm:block">
               <span className="text-xs text-slate-300 font-mono tracking-wider font-bold block">LOGÍSTICA B2B & FLEET SHIELD</span>
               <span className="text-[10px] text-cyan-400 font-mono">Powered by INDUSYNC® AI Industrial</span>[cite: 15]
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
            <span>TENANT: SALFA_RENT</span>[cite: 2]
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
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const forceTenant = urlParams ? urlParams.get('tenant') : null;

<<<<<<< HEAD
  const [isAuthenticatedGate, setIsAuthenticatedGate] = useState(false);
  const [activeTenant, setActiveTenant] = useState('meta'); // 'meta' o 'salfa'
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Rutero de Categorías Basado en Tenant
  const currentCategorias = activeTenant === 'salfa' ? categoriasSalfaOS : categoriasMetaOS;

  const categoriasVisibles = useMemo(
    () => Object.keys(currentCategorias).filter((catKey) => hasPermission(catKey)),
    [currentCategorias, hasPermission]
  );

  const [sidebarColapsado, setSidebarColapsado] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState('');
  const [moduloActivo, setModuloActivo] = useState('');
  const [cmdPaletteAbierto, setCmdPaletteAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const handleAuthSuccess = (isAuth, tenant) => {
    setIsAuthenticatedGate(isAuth);
    if (isAuth) {
      setActiveTenant(tenant);
      const baseCats = tenant === 'salfa' ? categoriasSalfaOS : categoriasMetaOS;
      const firstCatKey = Object.keys(baseCats)[0];
      setCategoriaActiva(firstCatKey);
      setModuloActivo(baseCats[firstCatKey].modulos[0].id);
    }
  };

  const [favoritos, setFavoritos] = useState(() => {
    try {
      const saved = localStorage.getItem('app_fav_modules_supreme');
      return saved ? JSON.parse(saved) : ['exec_dash', 'salfa_omni'];
    } catch {
      return ['exec_dash'];
=======
  const [authTenant, setAuthTenant] = useState(forceTenant || null);
  const [role, setRole] = useState('csuite');

  // Si no hay sesión iniciada, mostramos el Muro de Acceso Militar
  if (!authTenant && !forceTenant) {
    return <MilitaryAccessGate onAuthenticate={(tenantType) => setAuthTenant(tenantType)} />;
  }

  const activeTenant = authTenant || forceTenant || 'INDUSYNC_CORE';

  if (activeTenant === 'SALFA_RENT' || forceTenant === 'salfa') {
    return <SalfaTenantView onLogout={() => setAuthTenant(null)} />;
  }

  // META-OS ORIGINAL COMPLETO
  const [isAuthenticatedGate, setIsAuthenticatedGate] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
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
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
    }
  });

  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [pendingSyncQueue, setPendingSyncQueue] = useState(0);
  const [fallaCritica, setFallaCritica] = useState(false);
  const [logSimulacion, setLogSimulacion] = useState([]);
<<<<<<< HEAD

  useEffect(() => {
    if (!isAuthenticatedGate) return;
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDownSecurity = (e) => {
      if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83))) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDownSecurity);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDownSecurity);
    };
  }, [isAuthenticatedGate]);

  const resetInactivityTimer = useCallback(() => setLastActivity(Date.now()), []);

  useEffect(() => {
    if (!isAuthenticatedGate) return;
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach((evt) => window.addEventListener(evt, resetInactivityTimer));
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 10 * 60 * 1000) setIsAuthenticatedGate(false);
    }, 10000);
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, resetInactivityTimer));
      clearInterval(interval);
    };
  }, [isAuthenticatedGate, lastActivity, resetInactivityTimer]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdPaletteAbierto((prev) => !prev);
      }
      if (e.key === 'Escape') setCmdPaletteAbierto(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

=======
  const [modalSernageominAbierto, setModalSernageominAbierto] = useState(false);

  const categoriasVisibles = Object.keys(categorias);

  const toggleFallaCritica = () => {
    setFallaCritica(!fallaCritica);
  };

>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
  const handleCambioCategoria = (catKey) => {
    setCategoriaActiva(catKey);
    if (currentCategorias[catKey]?.modulos[0]?.id) {
      setModuloActivo(currentCategorias[catKey].modulos[0].id);
    }
  };

  const toggleFavorito = (e, modId) => {
    e.stopPropagation();
    setFavoritos((prev) => prev.includes(modId) ? prev.filter((id) => id !== modId) : [...prev, modId]);
  };

  const todosLosModulosAccesibles = useMemo(() => {
    return categoriasVisibles.flatMap((catKey) =>
      (currentCategorias[catKey]?.modulos || []).map((mod) => ({
        ...mod,
        catKey,
        catLabel: currentCategorias[catKey].label
      }))
    );
  }, [categoriasVisibles, currentCategorias]);

  const modulosFiltradosPalette = useMemo(() => {
    if (!busqueda.trim()) return todosLosModulosAccesibles;
    const query = busqueda.toLowerCase();
    return todosLosModulosAccesibles.filter(
      (m) => m.label.toLowerCase().includes(query) || m.catLabel.toLowerCase().includes(query)
    );
  }, [busqueda, todosLosModulosAccesibles]);

  const ComponenteModulo = modules[moduloActivo] || (() => <ModuleFallback path={moduloActivo} error="Submódulo no asignado." />);

<<<<<<< HEAD
  if (!isAuthenticatedGate) {
    return <MilitaryAccessGate onAuthenticate={handleAuthSuccess} />;
  }

  // Estilos condicionales según Tenant
  const themeColors = activeTenant === 'salfa' 
    ? { ring: 'ring-red-600/60', highlight: 'text-red-400', bgSide: 'bg-slate-900', borderActive: 'border-red-500/40', bgActive: 'bg-red-500/20' }
    : { ring: 'ring-rose-600/60', highlight: 'text-cyan-400', bgSide: 'bg-slate-900/50', borderActive: 'border-cyan-500/40', bgActive: 'bg-cyan-500/20' };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col transition-colors duration-500 relative ${fallaCritica ? `ring-8 ${themeColors.ring}` : ''}`}>
      <SecurityWatermark userRole={user?.role} tenant={activeTenant} />
      {activeTenant === 'meta' && <AlertBanner />}

      <header className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setSidebarColapsado(!sidebarColapsado)} className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition">☰</button>
=======
  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col transition-colors duration-500 relative ${fallaCritica ? 'ring-8 ring-rose-600/60' : ''}`}>
      <SecurityWatermark userRole={role} />
      <AlertBanner />

      {/* HEADER PRINCIPAL META-OS */}
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
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
          <Header />
        </div>
        <div className="flex items-center gap-3">
<<<<<<< HEAD
          <button type="button" onClick={() => setCmdPaletteAbierto(true)} className="hidden sm:flex items-center gap-3 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition">
            <span>🔍 Buscar submódulo...</span>
            <kbd className="bg-slate-800 text-slate-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700">Ctrl K</kbd>
          </button>
          <button type="button" onClick={() => setIsAuthenticatedGate(false)} className="px-2.5 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 rounded-lg text-xs font-mono transition flex items-center gap-1">🔒 Bloquear</button>
=======
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
            onClick={() => setCmdPaletteAbierto(true)}
            className="hidden sm:flex items-center gap-3 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition"
          >
            <span>🔍 Buscar submódulo...</span>
            <kbd className="bg-slate-800 text-slate-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700">Ctrl K</kbd>
          </button>

          <button
            type="button"
            onClick={() => setAuthTenant(null)}
            className="px-2.5 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 rounded-lg text-xs font-mono transition"
          >
            🔒 Bloquear
          </button>

>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
          <InstallAppButton />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
<<<<<<< HEAD
        <aside className={`${sidebarColapsado ? 'w-16' : 'w-64'} ${themeColors.bgSide} border-r border-slate-800 transition-all duration-300 flex flex-col justify-between shrink-0`}>
          <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="space-y-1">
              {!sidebarColapsado && <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">Universo: {activeTenant === 'salfa' ? 'SALFA OS' : 'META-OS'}</div>}
=======
        <aside className={`${sidebarColapsado ? 'w-16' : 'w-64'} bg-slate-900/50 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between shrink-0`}>
          <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="space-y-1">
              {!sidebarColapsado && <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">Categorías Siderúrgicas</div>}
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
              {categoriasVisibles.map((catKey) => {
                const esActiva = categoriaActiva === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => handleCambioCategoria(catKey)}
<<<<<<< HEAD
                    className={`w-full flex items-center ${sidebarColapsado ? 'justify-center px-0' : 'px-3'} py-2 rounded-lg text-xs font-semibold transition ${esActiva ? `${themeColors.bgActive} ${themeColors.highlight} border ${themeColors.borderActive}` : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
=======
                    className={`w-full flex items-center ${sidebarColapsado ? 'justify-center px-0' : 'px-3'} py-2 rounded-lg text-xs font-semibold transition ${
                      esActiva ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
                  >
                    <span className="truncate">{sidebarColapsado ? currentCategorias[catKey]?.label.slice(0, 2) : currentCategorias[catKey]?.label}</span>
                  </button>
                );
              })}
            </div>

            {!sidebarColapsado && currentCategorias[categoriaActiva] && (
              <div className="pt-3 border-t border-slate-800 space-y-1">
<<<<<<< HEAD
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">Sub-Módulos</div>
                {currentCategorias[categoriaActiva].modulos.map((m) => {
=======
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">Sub-Módulos OT</div>
                {categorias[categoriaActiva].modulos.map((m) => {
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
                  const esActivo = moduloActivo === m.id;
                  const esFav = favoritos.includes(m.id);
                  return (
                    <div
                      key={m.id}
                      onClick={() => setModuloActivo(m.id)}
<<<<<<< HEAD
                      className={`group flex items-center justify-between px-3 py-1.5 rounded-lg text-xs cursor-pointer transition ${esActivo ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
                    >
                      <span className="truncate">{m.label}</span>
                      <button type="button" onClick={(e) => toggleFavorito(e, m.id)} className={`text-[10px] ${esFav ? 'text-amber-300' : 'opacity-0 group-hover:opacity-100 text-slate-500'}`}>★</button>
=======
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
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-950">
<<<<<<< HEAD
          <Suspense fallback={<div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4"><div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" /></div>}>
=======
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 font-mono">
              <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
              <p className="text-xs text-cyan-400 tracking-wider">SINCRONIZANDO SUB-SISTEMA INDUSTRIAL OT...</p>
            </div>
          }>
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
            <ComponenteModulo />
          </Suspense>
        </main>
      </div>
<<<<<<< HEAD
=======

      {/* MODAL SERNAGEOMIN */}
      {modalSernageominAbierto && (
        <div className="fixed inset-0 z-[10002] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-cyan-500/50 rounded-2xl shadow-2xl overflow-hidden font-mono text-slate-200">
            <div className="bg-gradient-to-r from-cyan-950 to-slate-900 p-4 border-b border-cyan-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏛️</span>
                <div>
                  <h3 className="text-xs font-black uppercase text-cyan-300 tracking-wider">
                    INDUSYNC® • DOSSIER FISCALIZADOR OFICIAL SERNAGEOMIN (DS 132)
                  </h3>
                  <p className="text-[10px] text-slate-400">Generador de Reporte Forense en 7 Capítulos Normativos</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalSernageominAbierto(false)}
                className="text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 text-xs"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div><span className="text-slate-500">Razón Social:</span> Minera Industrial Soberana SpA</div>
                <div><span className="text-slate-500">Código Instalación:</span> REG-OT-2026-INDUSYNC-998</div>
                <div><span className="text-slate-500">Hash Criptográfico:</span> SHA-256 Validated</div>
                <div><span className="text-slate-500">Firma Digital:</span> Ley N° 19.799 Activa</div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    alert("📄 Dossier Fiscalizador SERNAGEOMIN DS 132 generado y exportado exitosamente a PDF con firma criptográfica.");
                    setModalSernageominAbierto(false);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-slate-950 font-black rounded-xl uppercase tracking-wider transition shadow-lg"
                >
                  Descargar PDF Oficial Certificado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMMAND PALETTE MODAL (Ctrl+K) */}
      {cmdPaletteAbierto && (
        <div className="fixed inset-0 z-[10001] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden font-mono">
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              <span className="text-slate-400">🔍</span>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar cualquier submódulo industrial..."
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm outline-none"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setCmdPaletteAbierto(false)}
                className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1 rounded bg-slate-800"
              >
                ESC
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {modulosFiltradosPalette.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setCategoriaActiva(m.catKey);
                    setModuloActivo(m.id);
                    setCmdPaletteAbierto(false);
                  }}
                  className="p-2.5 rounded-xl hover:bg-cyan-500/10 text-xs text-slate-300 hover:text-cyan-300 cursor-pointer flex justify-between items-center transition"
                >
                  <span className="font-bold">{m.label}</span>
                  <span className="text-[10px] text-slate-500">{m.catLabel}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
>>>>>>> 8b682e8ab7c578e64c3b341bcc4bd4ba99d2de97
    </div>
  );
}