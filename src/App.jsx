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
  <div className="p-8 bg-slate-900/60 border border-slate-800 rounded-2xl text-center space-y-3 my-4">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1" aria-hidden="true">
      ⚠️
    </div>
    <h4 className="text-sm font-bold text-slate-200">Módulo en Preparación</h4>
    <p className="text-xs text-slate-400 max-w-md mx-auto">
      Ruta objetivo: <span className="font-mono text-cyan-400">{path}</span>
    </p>
    {error && (
      <p className="text-[11px] font-mono text-rose-400/80 bg-rose-950/30 p-2 rounded max-w-lg mx-auto border border-rose-900/40">
        {error.toString()}
      </p>
    )}
  </div>
);

const createLazyComponent = (path) => {
  const importer = featureModules[path];
  if (!importer) {
    return () => <ModuleFallback path={path} error="Archivo no encontrado en src/features/" />;
  }
  return lazy(async () => {
    try {
      const mod = await importer();
      const Component = mod.default || Object.values(mod).find((v) => typeof v === 'function');
      return { default: Component || (() => <ModuleFallback path={path} error="No se encontró un export React válido." />) };
    } catch (err) {
      console.error(`Error cargando ${path}:`, err);
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
      { id: 'vpo_pitch', label: '🎯 Pitch VPO (Operaciones)' },
      { id: 'exec_pitch', label: '🚀 Executive Pitch B2B' },
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
      { id: 'scada_analytics', label: '📈 Telemetría Real-Time' },
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

/* ==========================================================================
   COMPONENTES DE SEGURIDAD MILITAR & ZERO TRUST
   ========================================================================== */

// Marca de Agua Dinámica para Fuga de Pantallas / Screenshots
const SecurityWatermark = ({ userRole }) => (
  <div className="pointer-events-none fixed inset-0 z-[9999] flex flex-wrap items-center justify-around opacity-[0.03] select-none overflow-hidden font-mono text-[10px] text-cyan-400">
    {Array.from({ length: 16 }).map((_, i) => (
      <div key={i} className="transform -rotate-12 whitespace-nowrap p-8">
        PROPIEDAD INDUSTRIAL RESERVADA — INDUSYNC SpA (INAPI 1508687) — ROLE: {userRole?.toUpperCase()} — DEFCON-RESTRICTED
      </div>
    ))}
  </div>
);

// Portal táctico de acceso blindado (Zero-Trust Gatekeeper)
const MilitaryAccessGate = ({ onAuthenticate }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clave táctica predeterminada de alta seguridad (Modificable según tu backend)
    if (pin === '191508' || pin === '2026') {
      onAuthenticate(true);
    } else {
      setError(true);
      setAttempts((prev) => prev + 1);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-slate-950 flex items-center justify-center p-4 font-mono text-slate-100">
      <div className="max-w-md w-full bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden space-y-6">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-cyan-500 animate-pulse" />
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-2xl mb-2">
            🛡️
          </div>
          <h2 className="text-sm font-black tracking-widest uppercase text-slate-100">
            ACCESO ACCREDITADO ZERO-TRUST
          </h2>
          <p className="text-[11px] text-slate-400">
            PROPIEDAD INDUSTRIAL CLASIFICADA — INDUSYNC SpA
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] text-slate-400 uppercase tracking-wider mb-1">
              Ingrese PIN de Seguridad / Credencial OT:
            </label>
            <input
              type="password"
              value={pin}
              maxLength={8}
              onChange={(e) => {
                setError(false);
                setPin(e.target.value);
              }}
              placeholder="••••••"
              className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-500 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest text-cyan-300 outline-none transition"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-rose-300 text-xs text-center animate-shake">
              ⚠️ Credencial Inválida. Intento {attempts}/5 registrado en Audit Log.
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition shadow-lg shadow-cyan-500/20"
          >
            Verificar Identificación Militar
          </button>
        </form>

        <div className="border-t border-slate-800 pt-4 text-center text-[10px] text-slate-500 space-y-1">
          <p>Reg. INAPI Chile N° 1508687 — Clases NCL 9 & 42</p>
          <p className="text-slate-600">Monitoreo activo de ciberseguridad IEC 62443</p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const authContext = useAuth() || {};
  const user = authContext.user || { role: 'csuite' };
  const hasPermission = authContext.hasPermission || (() => true);
  const switchRole = authContext.switchRole || (() => {});
  const ROLES = authContext.ROLES || { CSUITE: 'csuite', OPERATOR: 'operator', ADMIN: 'admin' };

  // ESTADO DE SEGURIDAD BLINDADA
  const [isAuthenticatedGate, setIsAuthenticatedGate] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Bloqueo de inspección en el navegador (Anti-DevTools & Anti-Copy)
  useEffect(() => {
    if (!isAuthenticatedGate) return;

    // Deshabilitar menú contextual (Clic Derecho)
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Bloquear atajos de consola de desarrollador
    const handleKeyDownSecurity = (e) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
      if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
        (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83))
      ) {
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

  // Auto-Bloqueo por Inactividad (Timeout Cero Confianza: 10 minutos)
  const resetInactivityTimer = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  useEffect(() => {
    if (!isAuthenticatedGate) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach((evt) => window.addEventListener(evt, resetInactivityTimer));

    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 10 * 60 * 1000) {
        setIsAuthenticatedGate(false); // Re-bloquear pantalla por inactividad
      }
    }, 10000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, resetInactivityTimer));
      clearInterval(interval);
    };
  }, [isAuthenticatedGate, lastActivity, resetInactivityTimer]);

  // Memoización para evitar cálculos en cada render
  const categoriasVisibles = useMemo(
    () => Object.keys(categorias).filter((catKey) => hasPermission(catKey)),
    [hasPermission]
  );

  const [sidebarColapsado, setSidebarColapsado] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState(categoriasVisibles[0] || 'csuite');
  const [moduloActivo, setModuloActivo] = useState(
    categorias[categoriasVisibles[0]]?.modulos[0]?.id || 'exec_dash'
  );

  const [cmdPaletteAbierto, setCmdPaletteAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  const [favoritos, setFavoritos] = useState(() => {
    try {
      const saved = localStorage.getItem('app_fav_modules');
      return saved ? JSON.parse(saved) : ['exec_dash', 'vpo_pitch', 'mine_ops'];
    } catch {
      return ['exec_dash', 'vpo_pitch', 'mine_ops'];
    }
  });

  // Estado de Red y Sincronización PWA Off-Grid
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [pendingSyncQueue, setPendingSyncQueue] = useState(0);

  const [fallaCritica, setFallaCritica] = useState(false);
  const [logSimulacion, setLogSimulacion] = useState([]);

  // Monitoreo continuo de red y auto-sincronización
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (pendingSyncQueue > 0) {
        const timestamp = new Date().toLocaleTimeString('es-CL');
        setLogSimulacion((prev) => [
          `🔄 [${timestamp}] SINCRONIZACIÓN AUTOMÁTICA: ${pendingSyncQueue} paquetes locales subidos con éxito a SAP PM / Cloud.`,
          ...prev.slice(0, 4)
        ]);
        setPendingSyncQueue(0);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      const timestamp = new Date().toLocaleTimeString('es-CL');
      setLogSimulacion((prev) => [
        `📡 [${timestamp}] MODO OFF-GRID ACTIVO: Red no disponible. Almacenando operaciones localmente en búfer cifrado.`,
        ...prev.slice(0, 4)
      ]);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingSyncQueue]);

  // Atajo de teclado global: Ctrl + K o Cmd + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdPaletteAbierto((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCmdPaletteAbierto(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Función de disparo de emergencia + Autogeneración de OT en SAP PM
  const toggleFallaCritica = () => {
    const nuevoEstado = !fallaCritica;
    setFallaCritica(nuevoEstado);
    const timestamp = new Date().toLocaleTimeString('es-CL');

    if (nuevoEstado) {
      const entradaLog = `🚨 [${timestamp}] ALERTA CRÍTICA DEFCON-1: Sobrepresión Hidráulica en Molino SAG (345 PSI). Bloqueo preventivo OT.`;
      setLogSimulacion((prev) => [entradaLog, ...prev.slice(0, 4)]);

      try {
        const storedOts = localStorage.getItem('indusync_sap_ots');
        const otsActuales = storedOts ? JSON.parse(storedOts) : [];
        const otEmergencia = {
          id: `OT-SAP-${Math.floor(100000 + Math.random() * 900000)}`,
          equipoId: 'EQUIP-SAG-01',
          tipoOt: 'PM03',
          prioridad: '1',
          descripcion: `🚨 AUTO-GEN [DEFCON-1]: Disparo automático SCADA por Sobrepresión Hidráulica (345 PSI) en Molino SAG 01.`,
          fechaCreacion: timestamp,
          estado: navigator.onLine ? 'SYNC_SAP_SUCCESS' : 'PENDING_OFFGRID',
          codigoRespuestaSAP: navigator.onLine ? 'SAP_200_OK' : 'LOCAL_BUFFERED'
        };

        localStorage.setItem('indusync_sap_ots', JSON.stringify([otEmergencia, ...otsActuales]));
      } catch (err) {
        console.error('Error guardando OT automática:', err);
      }

      if (!isOnline) {
        setPendingSyncQueue((prev) => prev + 1);
      }
    } else {
      const entradaLog = `✅ [${timestamp}] RESTAURADO: Telemetría OT restablecida. Sincronización SCADA-SAP PM al 100%.`;
      setLogSimulacion((prev) => [entradaLog, ...prev.slice(0, 4)]);
    }
  };

  const simularOperacionOffline = () => {
    setPendingSyncQueue((prev) => prev + 1);
    const timestamp = new Date().toLocaleTimeString('es-CL');
    setLogSimulacion((prev) => [
      `💾 [${timestamp}] REGISTRO LOCAL: Inspección guardada offline. Pendientes de envío: ${pendingSyncQueue + 1}`,
      ...prev.slice(0, 4)
    ]);
  };

  useEffect(() => {
    try {
      localStorage.setItem('app_fav_modules', JSON.stringify(favoritos));
    } catch (err) {
      console.warn('LocalStorage no disponible para guardar favoritos');
    }
  }, [favoritos]);

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

  const todosLosModulosAccesibles = useMemo(() => {
    return categoriasVisibles.flatMap((catKey) =>
      (categorias[catKey]?.modulos || []).map((mod) => ({
        ...mod,
        catKey,
        catLabel: categorias[catKey].label
      }))
    );
  }, [categoriasVisibles]);

  const modulosFiltrados = useMemo(() => {
    if (!busqueda.trim()) return todosLosModulosAccesibles;
    const query = busqueda.toLowerCase();
    return todosLosModulosAccesibles.filter(
      (m) =>
        m.label.toLowerCase().includes(query) ||
        m.id.toLowerCase().includes(query) ||
        m.catLabel.toLowerCase().includes(query)
    );
  }, [busqueda, todosLosModulosAccesibles]);

  const ComponenteModulo = modules[moduloActivo];

  // SI NO ESTÁ AUTENTICADO EN EL GATEWAY MILITAR, MOSTRAR BARRERA ZERO-TRUST
  if (!isAuthenticatedGate) {
    return <MilitaryAccessGate onAuthenticate={setIsAuthenticatedGate} />;
  }

  return (
    <div
      className={`min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col transition-colors duration-500 relative ${
        fallaCritica ? 'ring-8 ring-rose-600/50' : ''
      }`}
    >
      {/* CAPA DE MARCA DE AGUA ANTI-FILTRACIONES */}
      <SecurityWatermark userRole={user?.role} />

      <AlertBanner />

      {/* BANNER MODO OFF-GRID / PERDIDA DE RED */}
      {!isOnline && (
        <div className="bg-amber-500/10 border-b border-amber-500/40 px-6 py-2 flex items-center justify-between text-xs font-mono text-amber-300 z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>
              <strong>MODO OFF-GRID ACTIVO:</strong> Sin conexión a la red industrial. Datos resguardados localmente.
            </span>
          </div>
          <span className="bg-amber-950 px-2 py-0.5 rounded text-[10px] border border-amber-800">
            {pendingSyncQueue} transacciones pendientes
          </span>
        </div>
      )}

      {/* BANNER TÁCTICO DE EMERGENCIA DEFCON-1 */}
      {fallaCritica && (
        <div className="bg-rose-950/90 border-b border-rose-600/80 px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4 animate-pulse shadow-2xl z-50">
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">⚠️</span>
            <div>
              <h2 className="text-xs font-black tracking-widest uppercase text-rose-300">
                PROTOCOLO DE EMERGENCIA TÁCTICA DEFCON-1 OT (ISO 22301)
              </h2>
              <p className="text-xs text-rose-200">
                Anomalía crítica en Molienda Principal. Intervención prescriptiva requerida.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleFallaCritica}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl uppercase tracking-wider transition shadow-lg"
          >
            Restablecer Telemetría
          </button>
        </div>
      )}

      {/* HEADER PRINCIPAL */}
      <header className="bg-slate-900/90 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSidebarColapsado(!sidebarColapsado)}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition"
            aria-label={sidebarColapsado ? 'Expandir menú' : 'Colapsar menú'}
            title="Colapsar / Expandir Menú"
          >
            ☰
          </button>
          <Header />
        </div>

        {/* Buscador Rápido Command Palette & Controles */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCmdPaletteAbierto(true)}
            className="hidden sm:flex items-center gap-3 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 transition"
          >
            <span>🔍 Buscar módulo...</span>
            <kbd className="bg-slate-800 text-slate-300 text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700">
              Ctrl K
            </kbd>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <label htmlFor="role-select" className="text-slate-400 font-medium">
              Rol:
            </label>
            <select
              id="role-select"
              value={user?.role || 'csuite'}
              onChange={(e) => switchRole(e.target.value)}
              className="bg-slate-900 text-cyan-400 font-mono font-bold px-2 py-0.5 rounded border border-slate-700 outline-none cursor-pointer"
            >
              {Object.values(ROLES).map((r) => (
                <option key={r} value={r}>
                  {(r || '').toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setIsAuthenticatedGate(false)}
            title="Bloquear sesión inmediatamente"
            className="px-2.5 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800 text-rose-300 rounded-lg text-xs font-mono transition flex items-center gap-1"
          >
            🔒 Bloquear
          </button>

          <InstallAppButton />
        </div>
      </header>

      {/* ESTRUCTURA PRINCIPAL: SIDEBAR + CONTENIDO */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR LATERAL */}
        <aside
          className={`${
            sidebarColapsado ? 'w-16' : 'w-64'
          } bg-slate-900/50 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between shrink-0`}
        >
          <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            {/* Categorías */}
            <div className="space-y-1">
              {!sidebarColapsado && (
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
                  Categorías
                </div>
              )}
              {categoriasVisibles.map((catKey) => {
                const esActiva = categoriaActiva === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => handleCambioCategoria(catKey)}
                    title={categorias[catKey]?.label}
                    className={`w-full flex items-center ${
                      sidebarColapsado ? 'justify-center px-0' : 'px-3'
                    } py-2 rounded-lg text-xs font-semibold transition ${
                      esActiva
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span className="truncate">
                      {sidebarColapsado ? categorias[catKey]?.label.slice(0, 2) : categorias[catKey]?.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sub-módulos de la categoría activa */}
            {!sidebarColapsado && categorias[categoriaActiva] && (
              <div className="pt-3 border-t border-slate-800 space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
                  Sub-Módulos
                </div>
                {categorias[categoriaActiva].modulos.map((m) => {
                  const esActivo = moduloActivo === m.id;
                  const esFav = favoritos.includes(m.id);
                  return (
                    <div
                      key={m.id}
                      onClick={() => setModuloActivo(m.id)}
                      className={`group flex items-center justify-between px-3 py-1.5 rounded-lg text-xs cursor-pointer transition ${
                        esActivo
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setModuloActivo(m.id)}
                    >
                      <span className="truncate">{m.label}</span>
                      <button
                        type="button"
                        onClick={(e) => toggleFavorito(e, m.id)}
                        aria-label={esFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                        className={`text-[10px] ${
                          esFav ? 'text-amber-300' : 'opacity-0 group-hover:opacity-100 text-slate-500'
                        }`}
                      >
                        ★
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer de Telemetría Rápida */}
          {!sidebarColapsado && (
            <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[10px] font-mono text-slate-500 space-y-1">
              <div className="flex justify-between items-center">
                <span>Enlace Red:</span>
                <span className={`font-bold flex items-center gap-1 ${isOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
                  {isOnline ? 'ONLINE' : 'OFF-GRID'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Pendientes Sincro:</span>
                <span className="text-cyan-400 font-bold">{pendingSyncQueue}</span>
              </div>
            </div>
          )}
        </aside>

        {/* ÁREA DE CONTENIDO */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* BARRA DE FAVORITOS & CONTROLES TÁCTICOS */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-amber-400 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap">
                ★ Favoritos:
              </span>
              {favoritos.map((favId) => {
                const modInfo = todosLosModulosAccesibles.find((m) => m.id === favId);
                if (!modInfo) return null;
                const esActivo = moduloActivo === favId;
                return (
                  <button
                    key={favId}
                    type="button"
                    onClick={() => {
                      setCategoriaActiva(modInfo.catKey);
                      setModuloActivo(favId);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition whitespace-nowrap ${
                      esActivo
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {modInfo.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={simularOperacionOffline}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                title="Simula un registro operado localmente sin conexión"
              >
                💾 Simular Inspección Terreno
              </button>

              <button
                type="button"
                onClick={toggleFallaCritica}
                className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition border ${
                  fallaCritica
                    ? 'bg-rose-600 text-white border-rose-400 animate-bounce'
                    : 'bg-rose-950/40 text-rose-400 border-rose-800/80 hover:bg-rose-900/60'
                }`}
              >
                {fallaCritica ? '🚨 Falla Activa' : '🚨 Simular Falla Crítica'}
              </button>
            </div>
          </div>

          {/* RENDERIZADO DEL MÓDULO */}
          <Suspense
            fallback={
              <div className="p-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-cyan-400 font-mono text-xs animate-pulse">
                  ⚡ Cargando sub-sistema industrial [{moduloActivo}]...
                </span>
              </div>
            }
          >
            {ComponenteModulo ? (
              <ComponenteModulo />
            ) : (
              <div className="p-12 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-slate-400 text-xs">
                Selecciona un módulo válido.
              </div>
            )}
          </Suspense>

          {/* AUDITORÍA OT EN VIVO */}
          {logSimulacion.length > 0 && (
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                📜 Registro de Contingencias & Sincronización OT (ISO 22301)
              </h4>
              <div className="space-y-1 font-mono text-[11px]">
                {logSimulacion.map((log, index) => (
                  <div key={index} className="text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-800/60">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER CORPORATIVO */}
          <footer className="border-t border-slate-800/80 pt-5 pb-2 mt-8 flex flex-col md:flex-row justify-between items-start md:items-center text-[11px] font-mono gap-4 text-slate-500">
            <div className="space-y-1.5">
              <p className="font-bold text-slate-400">
                INDUSYNC® Meta-OS — Titular: Indusync SpA (Reg. INAPI Chile N° 1508687).
              </p>
              <p className="text-slate-500/80 max-w-2xl">
                Compañía forjada en honor a toda una vida de trabajo, dedicación y legado en Chuquicamata (Jubilación con honores, Escala 19).
              </p>
            </div>
            <div className="text-left md:text-right space-y-1">
              <p>Clases NCL 9 & 42</p>
              <p className="text-cyan-600/60">Software SaaS con IA para Alta Minería</p>
            </div>
          </footer>
        </main>
      </div>

      {/* COMMAND PALETTE MODAL (`Ctrl + K`) */}
      {cmdPaletteAbierto && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden space-y-3 p-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <input
                type="text"
                autoFocus
                placeholder="Escribe para buscar cualquier módulo (ej: VPO, Licitaciones, CAEX, SAP)..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm outline-none font-mono"
              />
              <kbd className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                ESC
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-1">
              {modulosFiltrados.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setCategoriaActiva(m.catKey);
                    setModuloActivo(m.id);
                    setCmdPaletteAbierto(false);
                    setBusqueda('');
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 text-left transition text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-200">{m.label}</div>
                    <div className="text-[10px] text-slate-500">{m.catLabel}</div>
                  </div>
                  <span className="text-cyan-400 font-mono text-[10px]">Abrir →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <NotificationCenter />
    </div>
  );
}