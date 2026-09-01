import React, { useState } from 'react';
import { MineOperationsTelemetry } from './components/MineOperations';
import { BiometricAccreditation } from './components/BiometricAccreditation';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { PredictiveMaintenance } from './components/PredictiveMaintenance';
import { CyberAndCircularView } from './components/CyberAndCircularView';
import { AdvancedOperationsView } from './components/AdvancedOperationsView';
import { FinancialAndWaterView } from './components/FinancialAndWaterView';

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
      alert('Error al descargar reporte oficial');
    } finally {
      setDescargandoReporte(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Header Corporativo */}
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
          📄 {descargandoReporte ? 'Generando Audit...' : 'Exportar Auditoría SERNAGEOMIN & CMF'}
        </button>
      </header>

      {/* Navegador por Pestañas */}
      <nav className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3">
        {[
          { id: 'csuite', label: '📊 C-Suite & ESG' },
          { id: 'scada', label: '⚡ SCADA & Telemetría' },
          { id: 'biometria', label: '🪪 Acreditación Biometría' },
          { id: 'sap', label: '⚙️ SAP PM Predictive' },
          { id: 'cyber', label: '🛡️ Cyber-OT & B2B Circular' },
          { id: 'ahs', label: '🤖 Despacho AHS & Relaves' },
          { id: 'siam', label: '💧 SIAM Agua & Cash Cost' }
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

      {/* Renderizado Dinámico */}
      <main className="space-y-6">
        {pestañaActiva === 'csuite' && <ExecutiveDashboard />}
        {pestañaActiva === 'scada' && <MineOperationsTelemetry />}
        {pestañaActiva === 'biometria' && <BiometricAccreditation />}
        {pestañaActiva === 'sap' && <PredictiveMaintenance />}
        {pestañaActiva === 'cyber' && <CyberAndCircularView />}
        {pestañaActiva === 'ahs' && <AdvancedOperationsView />}
        {pestañaActiva === 'siam' && <FinancialAndWaterView />}
      </main>
    </div>
  );
}