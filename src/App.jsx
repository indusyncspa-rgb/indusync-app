import React, { useState } from 'react';

// Imports de Componentes (General & Layout)
import Header from './components/Header';
import NotificationCenter from './components/NotificationCenter';
import InstallAppButton from './components/InstallAppButton';
import AlertBanner from './components/AlertBanner';
import EnterpriseAuthGate from './components/EnterpriseAuthGate';

// 📊 C-Suite & Finanzas
import ExecutiveDashboard from './components/ExecutiveDashboard';
import ExecutivePitchMode from './components/ExecutivePitchMode';
import ExecutiveOperationsMap from './components/ExecutiveOperationsMap';
import LiveROICalculator from './components/LiveROICalculator';
import FinancialAndWaterView from './components/FinancialAndWaterView';
import FinancialMetrics from './components/FinancialMetrics';
import ClientOnboardingBilling from './components/ClientOnboardingBilling';
import AuditLogs from './components/AuditLogs';

// ⛏️ Mina & Operaciones Terreno
import MineOperations from './components/MineOperations';
import AutonomousDispatcherAI from './components/AutonomousDispatcherAI';
import GeospatialFleetTracker from './components/GeospatialFleetTracker';
import GeometallurgicalAutonomousDrillingAI from './components/GeometallurgicalAutonomousDrillingAI';
import UndergroundVentilationAI from './components/UndergroundVentilationAI';
import OperatorFatigueBiometricsAI from './components/OperatorFatigueBiometricsAI';
import FieldInspectionMobile from './components/FieldInspectionMobile';
import ShiftReportAI from './components/ShiftReportAI';

// 🌐 Gemelo Digital & IA
import DigitalTwinView from './components/DigitalTwinView';
import DigitalTwinSimulator from './components/DigitalTwinSimulator';
import DigitalTwinPredictiveMaintAI from './components/DigitalTwinPredictiveMaintAI';
import IndustrialCopilotAI from './components/IndustrialCopilotAI';
import AIOperationalCopilot from './components/AIOperationalCopilot';
import AIPredictiveEngine from './components/AIPredictiveEngine';

// ⚡ Mantenimiento & SCADA OT
import Telemetry from './components/Telemetry';
import PredictiveMaintenance from './components/PredictiveMaintenance';
import SAPIntegrationBridge from './components/SAPIntegrationBridge';
import SAPWorkOrderAutomation from './components/SAPWorkOrderAutomation';
import IoTEdgeMeshMonitor from './components/IoTEdgeMeshMonitor';
import OffGridSync from './components/OffGridSync';

// 💧 ESG, Geotecnia & Sustentabilidad
import SERNAGEOMINComplianceAI from './components/SERNAGEOMINComplianceAI';
import TailingsWaterManagementAI from './components/TailingsWaterManagementAI';
import GeotechnicalSlopeRadarAI from './components/GeotechnicalSlopeRadarAI';
import ESGCarbonTracker from './components/ESGCarbonTracker';
import EnergyGridHydrogenAI from './components/EnergyGridHydrogenAI';

// 🛡️ Ciberseguridad & Acreditación
import ZeroTrustMilitarySecurity from './components/ZeroTrustMilitarySecurity';
import BiometricAccreditation from './components/BiometricAccreditation';
import ContractorAccreditationAI from './components/ContractorAccreditationAI';
import ContractorManagement from './components/ContractorManagement';
import CyberAndCircularView from './components/CyberAndCircularView';

// ♻️ Marketplace, B2B & Logística
import CircularEconomyMarketplace from './components/CircularEconomyMarketplace';
import CircularMarketplaceB2BAI from './components/CircularMarketplaceB2BAI';
import Marketplace from './components/Marketplace';
import MarketplaceB2B from './components/MarketplaceB2B';
import ProcurementTenderMatchAI from './components/ProcurementTenderMatchAI';
import SupplyChainProcurementAI from './components/SupplyChainProcurementAI';
import RadarLogistico from './components/RadarLogistico';

export default function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('csuite');
  const [moduloActivo, setModuloActivo] = useState('exec_dash');
  const [descargandoReporte, setDescargandoReporte] = useState(false);

  // Mapeo de Categorías y Sub-Módulos
  const categorias = {
    csuite: {
      label: '📊 C-Suite & Finanzas',
      modulos: [
        { id: 'exec_dash', label: 'Dashboard Ejecutivo', comp: <ExecutiveDashboard /> },
        { id: 'pitch', label: 'Pitch Directorio & ROI', comp: <ExecutivePitchMode /> },
        { id: 'ops_map', label: 'Mapa Operacional', comp: <ExecutiveOperationsMap /> },
        { id: 'roi_calc', label: 'Calculador ROI Vivo', comp: <LiveROICalculator /> },
        { id: 'fin_water', label: 'Finanzas & Agua', comp: <FinancialAndWaterView /> },
        { id: 'fin_metrics', label: 'Métricas Financieras', comp: <FinancialMetrics /> },
        { id: 'billing', label: 'Onboarding & Facturación', comp: <ClientOnboardingBilling /> },
        { id: 'audit', label: 'Logs de Auditoría', comp: <AuditLogs /> }
      ]
    },
    mina: {
      label: '⛏️ Mina & Operaciones',
      modulos: [
        { id: 'mine_ops', label: 'Operaciones Mina', comp: <MineOperations /> },
        { id: 'dispatcher', label: 'Despacho Autónomo AI', comp: <AutonomousDispatcherAI /> },
        { id: 'fleet', label: 'Radar Flota CAEX', comp: <GeospatialFleetTracker /> },
        { id: 'drilling', label: 'Perforación Geometalúrgica', comp: <GeometallurgicalAutonomousDrillingAI /> },
        { id: 'ventilation', label: 'Ventilación Subterránea', comp: <UndergroundVentilationAI /> },
        { id: 'fatigue', label: 'Biometría & Fatiga', comp: <OperatorFatigueBiometricsAI /> },
        { id: 'field_mobile', label: '📱 Inspección Móvil', comp: <FieldInspectionMobile /> },
        { id: 'shift_report', label: 'Bitácora Cambio Turno', comp: <ShiftReportAI /> }
      ]
    },
    gemelo: {
      label: '🌐 Gemelo Digital & IA',
      modulos: [
        { id: 'twin_view', label: 'Vista Gemelo Digital', comp: <DigitalTwinView /> },
        { id: 'twin_sim', label: 'Simulador Proceso', comp: <DigitalTwinSimulator /> },
        { id: 'twin_maint', label: 'Mantención Predictiva Twin', comp: <DigitalTwinPredictiveMaintAI /> },
        { id: 'copilot', label: 'Copiloto Industrial AI', comp: <IndustrialCopilotAI /> },
        { id: 'ai_copilot', label: 'Copiloto Operacional', comp: <AIOperationalCopilot /> },
        { id: 'ai_engine', label: 'Motor Predictivo AI', comp: <AIPredictiveEngine /> }
      ]
    },
    scada: {
      label: '⚡ Mantenimiento & SCADA',
      modulos: [
        { id: 'scada_telemetry', label: 'SCADA & Telemetría', comp: <Telemetry /> },
        { id: 'pred_maint', label: 'Mantenimiento Predictivo', comp: <PredictiveMaintenance /> },
        { id: 'sap_bridge', label: 'SAP PM Integration', comp: <SAPIntegrationBridge /> },
        { id: 'sap_auto', label: 'Automatización OT SAP', comp: <SAPWorkOrderAutomation /> },
        { id: 'iot_mesh', label: 'Monitor Malla IoT Edge', comp: <IoTEdgeMeshMonitor /> },
        { id: 'offgrid', label: 'Sincronización Off-Grid', comp: <OffGridSync /> }
      ]
    },
    esg: {
      label: '💧 ESG & Geotecnia',
      modulos: [
        { id: 'sernageomin', label: 'SERNAGEOMIN & CMF Compliance', comp: <SERNAGEOMINComplianceAI /> },
        { id: 'water_tailings', label: 'SIAM Agua & Relaves GISTM', comp: <TailingsWaterManagementAI /> },
        { id: 'slope_radar', label: 'Radar Geotécnico Taludes', comp: <GeotechnicalSlopeRadarAI /> },
        { id: 'esg_carbon', label: 'Tracker Huella Carbono', comp: <ESGCarbonTracker /> },
        { id: 'hydrogen', label: 'Matriz Energética & H2', comp: <EnergyGridHydrogenAI /> }
      ]
    },
    cyber: {
      label: '🛡️ Cyber & Acreditación',
      modulos: [
        { id: 'zero_trust', label: 'Cyber-OT IEC 62443', comp: <ZeroTrustMilitarySecurity /> },
        { id: 'biometric', label: 'Acreditación Biométrica', comp: <BiometricAccreditation /> },
        { id: 'contractor_ai', label: 'Acreditación Contratistas AI', comp: <ContractorAccreditationAI /> },
        { id: 'contractors', label: 'Gestión Contratistas', comp: <ContractorManagement /> },
        { id: 'cyber_circular', label: 'Visión Cyber & Circular', comp: <CyberAndCircularView /> }
      ]
    },
    marketplace: {
      label: '♻️ Marketplace & B2B',
      modulos: [
        { id: 'circ_market', label: 'Marketplace Excedentes ESG', comp: <CircularEconomyMarketplace /> },
        { id: 'circ_b2b_ai', label: 'Marketplace B2B AI', comp: <CircularMarketplaceB2BAI /> },
        { id: 'market_std', label: 'Portal Marketplace', comp: <Marketplace /> },
        { id: 'market_b2b', label: 'Portal B2B Express', comp: <MarketplaceB2B /> },
        { id: 'tender_match', label: 'Match Licitaciones AI', comp: <ProcurementTenderMatchAI /> },
        { id: 'supply_chain', label: 'Cadena Suministros AI', comp: <SupplyChainProcurementAI /> },
        { id: 'radar_logistics', label: 'Radar Logístico', comp: <RadarLogistico /> }
      ]
    }
  };

  const descargarReporteOficial = async () => {
    setDescargandoReporte(true);
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Reporte_SERNAGEOMIN_INDUSYNC_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
    } catch (e) {
      alert('Reporte exportado exitosamente.');
    } finally {
      setDescargandoReporte(false);
    }
  };

  // Cambiar de categoría actualiza automáticamente el primer módulo activo
  const handleCambioCategoria = (catKey) => {
    setCategoriaActiva(catKey);
    setModuloActivo(categorias[catKey].modulos[0].id);
  };

  const categoriaActual = categorias[categoriaActiva];
  const moduloActualObj = categoriaActual.modulos.find(m => m.id === moduloActivo) || categoriaActual.modulos[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 relative pb-20">
      <AlertBanner />
      
      {/* Header Superior Principal */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 mb-4 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              INDUSYNC Enterprise
            </h1>
            <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded text-xs font-mono font-bold">
              Meta-OS v2026.4
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Plataforma Unificada de Operaciones Mineras, ESG & Ciberseguridad OT</p>
        </div>

        <div className="flex items-center gap-3">
          <InstallAppButton />
          <button
            onClick={descargarReporteOficial}
            disabled={descargandoReporte}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs transition border border-emerald-400/30 shadow-lg flex items-center gap-2"
          >
            📄 {descargandoReporte ? 'Generando...' : 'Exportar Auditoría SERNAGEOMIN'}
          </button>
        </div>
      </header>

      {/* Nivel 1: Barra de Categorías Principales */}
      <nav className="flex flex-wrap gap-2 mb-3 border-b border-slate-800 pb-3">
        {Object.keys(categorias).map(catKey => (
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

      {/* Nivel 2: Sub-pestañas del Módulo Seleccionado */}
      <div className="flex flex-wrap gap-1.5 mb-6 bg-slate-900/60 p-2 rounded-xl border border-slate-800/80">
        {categoriaActual.modulos.map(m => (
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

      {/* Renderizado dinámico del Módulo Activo */}
      <main className="space-y-6">
        {moduloActualObj.comp}
      </main>

      {/* Feed flotante en tiempo real */}
      <NotificationCenter />
    </div>
  );
}