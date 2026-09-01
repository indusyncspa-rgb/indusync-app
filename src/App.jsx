import React, { useState, useEffect } from 'react';

// ====================================================
// ZONA 1: ALMACÉN COMPLETO DE IMPORTS
// ====================================================
import EnterpriseAuthGate from './components/EnterpriseAuthGate';
import Header from './components/Header';
import AlertBanner from './components/AlertBanner';
import ProcurementTenderMatchAI from './components/ProcurementTenderMatchAI';
import ContractorAccreditationAI from './components/ContractorAccreditationAI';
import ZeroTrustMilitarySecurity from './components/ZeroTrustMilitarySecurity';

import ExecutiveOperationsMap from './components/ExecutiveOperationsMap';
import GeometallurgicalAutonomousDrillingAI from './components/GeometallurgicalAutonomousDrillingAI';
import AutonomousDispatcherAI from './components/AutonomousDispatcherAI';
import OperatorFatigueBiometricsAI from './components/OperatorFatigueBiometricsAI';
import UndergroundVentilationAI from './components/UndergroundVentilationAI';
import GeotechnicalSlopeRadarAI from './components/GeotechnicalSlopeRadarAI';
import SERNAGEOMINComplianceAI from './components/SERNAGEOMINComplianceAI';
import IoTEdgeMeshMonitor from './components/IoTEdgeMeshMonitor';

import DigitalTwinPredictiveMaintAI from './components/DigitalTwinPredictiveMaintAI';
import SAPWorkOrderAutomation from './components/SAPWorkOrderAutomation';
import TailingsWaterManagementAI from './components/TailingsWaterManagementAI';
import ShiftReportAI from './components/ShiftReportAI';

import SupplyChainProcurementAI from './components/SupplyChainProcurementAI';
import CircularMarketplaceB2BAI from './components/CircularMarketplaceB2BAI';
import EnergyGridHydrogenAI from './components/EnergyGridHydrogenAI';

import AIOperationalCopilot from './components/AIOperationalCopilot';
import ClientOnboardingBilling from './components/ClientOnboardingBilling';
import LiveROICalculator from './components/LiveROICalculator';
import ESGCarbonTracker from './components/ESGCarbonTracker';

export default function App() {
  const [pestañaActiva, setPestañaActiva] = useState('PITCH');

  // Fuerza el scroll al inicio al cambiar de pestaña
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pestañaActiva]);

  const estiloBoton = (activa, colorActivo) => ({
    backgroundColor: activa ? colorActivo : '#1e293b',
    color: activa ? '#ffffff' : '#94a3b8',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '11px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  });

  return (
    <EnterpriseAuthGate>
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#f8fafc', padding: '16px', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header General */}
      <Header />

      {/* BARRA DE NAVEGACIÓN REORDENADA POR CICLO MINERO END-TO-END */}
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        padding: '8px 12px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setPestañaActiva('PITCH')}
            style={estiloBoton(pestañaActiva === 'PITCH', '#38bdf8')}
          >
            🚀 Modo Pitch Ejecutivo (Full)
          </button>
          
          <button
            onClick={() => setPestañaActiva('ETAPA1_LICITACIONES')}
            style={estiloBoton(pestañaActiva === 'ETAPA1_LICITACIONES', '#10b981')}
          >
            1. 📝 Licitaciones & Acceso Biométrico
          </button>

          <button
            onClick={() => setPestañaActiva('ETAPA2_MINA')}
            style={estiloBoton(pestañaActiva === 'ETAPA2_MINA', '#0d9488')}
          >
            2. ⛏️ Operaciones Mina & Seguridad
          </button>

          <button
            onClick={() => setPestañaActiva('ETAPA3_PLANTA')}
            style={estiloBoton(pestañaActiva === 'ETAPA3_PLANTA', '#d97706')}
          >
            3. 🏭 Planta & Mantenimiento SAP
          </button>

          <button
            onClick={() => setPestañaActiva('ETAPA4_LOGISTICA')}
            style={estiloBoton(pestañaActiva === 'ETAPA4_LOGISTICA', '#eab308')}
          >
            4. 📦 Logística & B2B Circular
          </button>

          <button
            onClick={() => setPestañaActiva('ETAPA5_CONTROL')}
            style={estiloBoton(pestañaActiva === 'ETAPA5_CONTROL', '#0284c7')}
          >
            5. 💎 Centro Control Ejecutivo & ESG
          </button>
        </div>

        <span style={{ color: '#38bdf8', fontSize: '10px', fontWeight: 'bold', border: '1px solid #38bdf8', padding: '3px 8px', borderRadius: '4px' }}>
          ENV: ENTERPRISE v2026.4
        </span>
      </div>

      {/* ====================================================
          ZONA 2: RENDERIZADO DINÁMICO POR CICLO MINERO
         ==================================================== */}
      
      {/* MODO PITCH CONTINUO (RECORRIDO COMPLETO MUESTRA A MUESTRA) */}
      {pestañaActiva === 'PITCH' && (
        <>
          <ProcurementTenderMatchAI />
          <ContractorAccreditationAI />
          <ZeroTrustMilitarySecurity />
          <ExecutiveOperationsMap />
          <GeometallurgicalAutonomousDrillingAI />
          <AutonomousDispatcherAI />
          <OperatorFatigueBiometricsAI />
          <UndergroundVentilationAI />
          <GeotechnicalSlopeRadarAI />
          <SERNAGEOMINComplianceAI />
          <IoTEdgeMeshMonitor />
          <AlertBanner />
          <DigitalTwinPredictiveMaintAI />
          <SAPWorkOrderAutomation />
          <TailingsWaterManagementAI />
          <ShiftReportAI />
          <SupplyChainProcurementAI />
          <CircularMarketplaceB2BAI />
          <EnergyGridHydrogenAI />
          <AIOperationalCopilot />
          <ClientOnboardingBilling />
          <LiveROICalculator />
          <ESGCarbonTracker />
        </>
      )}

      {/* ETAPA 1: LICITACIONES, ACCESO & ACREDITACIÓN */}
      {pestañaActiva === 'ETAPA1_LICITACIONES' && (
        <>
          <ProcurementTenderMatchAI />
          <ContractorAccreditationAI />
          <ZeroTrustMilitarySecurity />
        </>
      )}

      {/* ETAPA 2: OPERACIONES MINA, DISPATCH & SEGURIDAD HSEC */}
      {pestañaActiva === 'ETAPA2_MINA' && (
        <>
          <ExecutiveOperationsMap />
          <GeometallurgicalAutonomousDrillingAI />
          <AutonomousDispatcherAI />
          <OperatorFatigueBiometricsAI />
          <UndergroundVentilationAI />
          <GeotechnicalSlopeRadarAI />
          <SERNAGEOMINComplianceAI />
          <IoTEdgeMeshMonitor />
          <AlertBanner />
        </>
      )}

      {/* ETAPA 3: PLANTA CONCENTRADORA, MANTENIMIENTO & RELAVES */}
      {pestañaActiva === 'ETAPA3_PLANTA' && (
        <>
          <DigitalTwinPredictiveMaintAI />
          <SAPWorkOrderAutomation />
          <TailingsWaterManagementAI />
          <ShiftReportAI />
        </>
      )}

      {/* ETAPA 4: LOGÍSTICA, CADENA DE SUMINISTRO & MARKETPLACE CIRCULAR */}
      {pestañaActiva === 'ETAPA4_LOGISTICA' && (
        <>
          <SupplyChainProcurementAI />
          <CircularMarketplaceB2BAI />
          <EnergyGridHydrogenAI />
        </>
      )}

      {/* ETAPA 5: CENTRO DE CONTROL EJECUTIVO, ROI & ESG */}
      {pestañaActiva === 'ETAPA5_CONTROL' && (
        <>
          <AIOperationalCopilot />
          <ClientOnboardingBilling />
          <LiveROICalculator />
          <ESGCarbonTracker />
        </>
      )}

    </div>
    </EnterpriseAuthGate>
  );
}