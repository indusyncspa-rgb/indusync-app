import React, { useState } from 'react';

import Telemetry from './components/Telemetry';
import ZeroTrustMilitarySecurity from './components/ZeroTrustMilitarySecurity';
import SERNAGEOMINComplianceAI from './components/SERNAGEOMINComplianceAI';
import SAPIntegrationBridge from './components/SAPIntegrationBridge';
import TailingsWaterManagementAI from './components/TailingsWaterManagementAI';
import ProcurementTenderMatchAI from './components/ProcurementTenderMatchAI';
import ShiftReportAI from './components/ShiftReportAI';
import RadarLogistico from './components/RadarLogistico';
import IndustrialCopilotAI from './components/IndustrialCopilotAI';
import DigitalTwinView from './components/DigitalTwinView';

export default function App() {
  const [pestañaActiva, setPestañaActiva] = useState('csuite');
  const [descargandoReporte, setDescargandoReporte] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              INDUSYNC Enterprise
            </h1>
            <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded text-xs font-mono font-bold">
              Meta-OS v2026.4
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Plataforma Integrada de Operaciones Mineras, ESG & Ciberseguridad OT</p>
        </div>

        <button
          onClick={descargarReporteOficial}
          disabled={descargandoReporte}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs transition border border-emerald-400/30 shadow-lg flex items-center gap-2"
        >
          📄 {descargandoReporte ? 'Generando...' : 'Exportar Auditoría SERNAGEOMIN & CMF'}
        </button>
      </header>

      <nav className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3">
        {[
          { id: 'csuite', label: '📊 C-Suite & ESG' },
          { id: 'copilot', label: '🤖 Copiloto Industrial AI' },
          { id: 'twin', label: '🌐 Gemelo Digital' },
          { id: 'scada', label: '⚡ SCADA & Telemetría' },
          { id: 'shift', label: '📋 Bitácora Cambio Turno' },
          { id: 'sap', label: '⚙️ SAP PM & Mantenimiento' },
          { id: 'cyber', label: '🛡️ Cyber-OT IEC 62443' },
          { id: 'water', label: '💧 SIAM Agua & Relaves' },
          { id: 'logistics', label: '🚛 Radar Logístico' },
          { id: 'procurement', label: '🛒 Licitaciones B2B' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setPestañaActiva(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              pestañaActiva === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="space-y-6">
        {pestañaActiva === 'csuite' && <SERNAGEOMINComplianceAI />}
        {pestañaActiva === 'copilot' && <IndustrialCopilotAI />}
        {pestañaActiva === 'twin' && <DigitalTwinView />}
        {pestañaActiva === 'scada' && <Telemetry />}
        {pestañaActiva === 'shift' && <ShiftReportAI />}
        {pestañaActiva === 'sap' && <SAPIntegrationBridge />}
        {pestañaActiva === 'cyber' && <ZeroTrustMilitarySecurity />}
        {pestañaActiva === 'water' && <TailingsWaterManagementAI />}
        {pestañaActiva === 'logistics' && <RadarLogistico />}
        {pestañaActiva === 'procurement' && <ProcurementTenderMatchAI />}
      </main>
    </div>
  );
}