import React, { useState, lazy, Suspense, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

// Componentes Comunes
import Header from './components/common/Header';
import NotificationCenter from './components/common/NotificationCenter';
import InstallAppButton from './components/common/InstallAppButton';
import AlertBanner from './components/common/AlertBanner';

// Carga nativa de todos los componentes en src/features/ vía Vite Glob
const featureModules = import.meta.glob('./features/**/*.jsx');

// Helper resiliente que soporta export default y export nombrados
const createLazyComponent = (path) => {
  const importer = featureModules[path];
  if (!importer) {
    return () => (
      <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
        <p className="text-xs text-slate-400">Archivo <span className="font-mono text-cyan-400">{path}</span> no encontrado.</p>
      </div>
    );
  }
  return lazy(async () => {
    try {
      const mod = await importer();
      const Component = mod.default || Object.values(mod).find((v) => typeof v === 'function');
      return { default: Component || (() => null) };
    } catch (err) {
      console.error(`Error cargando ${path}:`, err);
      return {
        default: () => (
          <div className="p-6 bg-red-950/20 border border-red-800 rounded-xl text-center">
            <p className="text-xs text-red-400">Error al cargar el componente.</p>
          </div>
        )
      };
    }
  });
};

const modules = {
  // C-Suite
  exec_dash: createLazyComponent('./features/csuite/ExecutiveDashboard.jsx'),
  pitch: createLazyComponent('./features/csuite/ExecutivePitchMode.jsx'),
  ops_map: createLazyComponent('./features/csuite/ExecutiveOperationsMap.jsx'),
  roi_calc: createLazyComponent('./features/csuite/LiveROICalculator.jsx'),
  fin_water: createLazyComponent('./features/csuite/FinancialAndWaterView.jsx'),
  fin_metrics: createLazyComponent('./features/csuite/FinancialMetrics.jsx'),
  billing: createLazyComponent('./features/csuite/ClientOnboardingBilling.jsx'),
  audit: createLazyComponent('./features/csuite/AuditLogs.jsx'),

  // Mina & Operaciones
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
  scada_telemetry: createLazyComponent('./features/scada/Telemetry.jsx'),
  pred_maint: createLazyComponent('./features/scada/PredictiveMaintenance.jsx'),
  sap_bridge: createLazyComponent('./features/scada/SAPIntegrationBridge.jsx'),
  sap_auto: createLazyComponent('./features/scada/SAPWorkOrderAutomation.jsx'),
  iot_mesh: createLazyComponent('./features/scada/IoTEdgeMeshMonitor.jsx'),
  offgrid: createLazyComponent('./features/scada/OffGridSync.jsx'),

  // ESG & Geotecnia
  sernageomin: createLazyComponent('./features/esg/SERNAGEOMINComplianceAI.jsx'),
  water_tailings: createLazyComponent('./features/esg/TailingsWaterManagementAI.jsx'),
  slope_radar: createLazyComponent('./features/esg/GeotechnicalSlopeRadarAI.jsx'),
  esg_carbon: createLazyComponent('./features/esg/ESGCarbonTracker.jsx'),
  hydrogen: createLazyComponent('./features/esg/EnergyGridHydrogenAI.jsx'),

  // Cyber & Seguridad
  zero_trust: createLazyComponent('./features/cyber/ZeroTrustMilitarySecurity.jsx'),
  biometric: createLazyComponent('./features/cyber/BiometricAccreditation.jsx'),
  contractor_ai: createLazyComponent('./features/cyber/ContractorAccreditationAI.jsx'),
  contractors: createLazyComponent('./features/cyber/ContractorManagement.jsx'),
  cyber_circular: createLazyComponent('./features/cyber/CyberAndCircularView.jsx'),

  // Marketplace & Logística
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
      { id: 'exec_dash', label: 'Dashboard Ejecutivo' },
      { id: 'pitch', label: 'Pitch Directorio' },
      { id: 'ops_map', label: 'Mapa Operacional' },
      { id: 'roi_calc', label: 'Calculador ROI' },
      { id: 'fin_water', label: 'Finanzas & Agua' },
      { id: 'fin_metrics', label: 'Métricas Financieras' },
      { id: 'billing', label: 'Onboarding & Facturación' },
      { id: 'audit', label: 'Logs de Auditoría' }
    ]
  },
  mina: {
    label: '⛏️ Mina & Operaciones',
    modulos: [
      { id: 'mine_ops', label: 'Operaciones Mina' },
      { id: 'dispatcher', label: 'Despacho Autónomo' },
      { id: 'fleet', label: 'Radar Flota CAEX' },
      { id: 'drilling', label: 'Perforación Geometalúrgica' },
      { id: 'ventilation', label: 'Ventilación Subterránea' },
      { id: 'fatigue', label: 'Biometría & Fatiga' },
      { id: 'field_mobile', label: '📱 Inspección Móvil' },
      { id: 'shift_report', label: 'Bitácora Cambio Turno' }
    ]
  },
  gemelo: {
    label: '🌐 Gemelo Digital & IA',
    modulos: [
      { id: 'twin_view', label: 'Vista Gemelo Digital' },
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
      { id: 'scada_telemetry', label: 'SCADA Telemetría' },
      { id: 'pred_maint', label: 'Mantenimiento Predictivo' },
      { id: 'sap_bridge', label: 'SAP PM Integration' },
      { id: 'sap_auto', label: 'Automatización OT' },
      { id: 'iot_mesh', label: 'Monitor Malla IoT' },
      { id: 'offgrid', label: 'Sincronización Off-Grid' }
    ]
  },
  esg: {
    label: '💧 ESG & Geotecnia',
    modulos: [
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
      { id: 'zero_trust', label: 'Cyber-OT IEC 62443' },
      { id: 'biometric', label: 'Acreditación Biométrica' },
      { id: 'contractor_ai', label: 'Acreditación Contratistas' },
      { id: 'contractors', label: 'Gestión Contratistas' },
      { id: 'cyber_circular', label: 'Visión Cyber & Circular' }
    ]
  },
  marketplace: {
    label: '♻️ Marketplace & B2B',
    modulos: [
      { id: 'circ_market', label: 'Excedentes ESG' },
      { id: 'circ_b2b_ai', label: 'Marketplace B2B AI' },
      { id: 'market_std', label: 'Portal Marketplace' },
      { id: 'market_b2b', label: 'Portal B2B' },
      { id: 'tender_match', label: 'Licitaciones AI' },
      { id: 'supply_chain', label: 'Cadena Suministros' },
      { id: 'radar_logistics', label: 'Radar Logístico' }
    ]
  }
};

export default function App() {
  const { user, hasPermission, switchRole, ROLES } = useAuth();

  const categoriasVisibles = Object.keys(categorias).filter(catKey => hasPermission(catKey));

  const [categoriaActiva, setCategoriaActiva] = useState(categoriasVisibles[0] || 'csuite');
  const [moduloActivo, setModuloActivo] = useState(categorias[categoriasVisibles[0]]?.modulos[0]?.id || 'exec_dash');

  // Ajusta la categoría activa dinámicamente si el rol seleccionado cambia sus permisos
  useEffect(() => {
    if (!categoriasVisibles.includes(categoriaActiva) && categoriasVisibles.length > 0) {
      const nuevaCat = categoriasVisibles[0];
      setCategoriaActiva(nuevaCat);
      setModuloActivo(categorias[nuevaCat].modulos[0].id);
    }
  }, [user.role, categoriasVisibles, categoriaActiva]);

  const handleCambioCategoria = (catKey) => {
    setCategoriaActiva(catKey);
    setModuloActivo(categorias[catKey].modulos[0].id);
  };

  const ComponenteModulo = modules[moduloActivo];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 relative pb-20">
      <AlertBanner />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 mb-4 gap-4">
        <Header />
        <div className="flex items-center gap-3">
          {/* Selector de Simulación de Rol (Dev Toolbar) */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Rol:</span>
            <select 
              value={user.role} 
              onChange={(e) => switchRole(e.target.value)}
              className="bg-slate-950 text-cyan-400 font-mono font-bold px-2 py-0.5 rounded border border-slate-700 outline-none cursor-pointer"
            >
              {Object.values(ROLES).map(r => (
                <option key={r} value={r}>{r.toUpperCase()}</option>
              ))}
            </select>
          </div>
          <InstallAppButton />
        </div>
      </header>

      {/* Categorías Principales Filtradas por Rol */}
      <nav className="flex flex-wrap gap-2 mb-3 border-b border-slate-800 pb-3">
        {categoriasVisibles.map(catKey => (
          <button
            key={catKey}
            onClick={() => handleCambioCategoria(catKey)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              categoriaActiva === catKey
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {categorias[catKey].label}
          </button>
        ))}
      </nav>

      {/* Sub-Módulos de la Categoría Activa */}
      {categorias[categoriaActiva] && (
        <div className="flex flex-wrap gap-1.5 mb-6 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
          {categorias[categoriaActiva].modulos.map(m => (
            <button
              key={m.id}
              onClick={() => setModuloActivo(m.id)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                moduloActivo === m.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* Módulo Activo con Carga Suspendida */}
      <main className="space-y-6">
        <Suspense fallback={
          <div className="p-12 text-center bg-slate-900/40 rounded-xl border border-slate-800">
            <span className="text-cyan-400 font-mono text-xs animate-pulse">⚡ Cargando módulo operativo...</span>
          </div>
        }>
          {ComponenteModulo ? <ComponenteModulo /> : (
            <div className="p-12 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400 text-xs">
              Selecciona un módulo válido.
            </div>
          )}
        </Suspense>
      </main>

      <NotificationCenter />
    </div>
  );
}