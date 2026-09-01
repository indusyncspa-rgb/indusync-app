import React, { useState } from 'react';
import Telemetry from '@/features/scada/Telemetry';
import FleetRadar from '@/features/fleet/FleetRadar';
import CyberDefense from '@/features/cyber/CyberDefense';
import EsgSustainability from '@/features/esg/EsgSustainability';
import ExecutiveConsole from '@/features/csuite/ExecutiveConsole';

export default function App() {
  const [activeTab, setActiveTab] = useState('executive');

  const tabs = [
    { id: 'executive', label: '📊 C-Suite Exec', color: 'text-amber-400' },
    { id: 'scada', label: '⚡ Telemetría SCADA', color: 'text-cyan-400' },
    { id: 'fleet', label: '🚛 Flota CAEX', color: 'text-blue-400' },
    { id: 'cyber', label: '🛡️ Ciberseguridad OT', color: 'text-red-400' },
    { id: 'esg', label: '🌱 Panel ESG', color: 'text-emerald-400' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Superior */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-cyan-500/20">
            IS
          </div>
          <div>
            <h1 className="font-bold text-base text-white tracking-wide">INDUSYNC Meta-OS</h1>
            <p className="text-[10px] text-slate-400">Plataforma Operativa Minera e Industrial</p>
          </div>
        </div>

        {/* Tabs de navegación móvil y desktop */}
        <nav className="flex flex-wrap justify-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <span className={activeTab === tab.id ? tab.color : ''}>{tab.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Contenido Dinámico */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-6">
        {activeTab === 'executive' && <ExecutiveConsole />}
        {activeTab === 'scada' && <Telemetry />}
        {activeTab === 'fleet' && <FleetRadar />}
        {activeTab === 'cyber' && <CyberDefense />}
        {activeTab === 'esg' && <EsgSustainability />}
      </main>

      {/* Footer Industrial */}
      <footer className="border-t border-slate-900 bg-slate-950 p-4 text-center text-xs text-slate-500 font-mono">
        INDUSYNC v2.4.0 • Antofagasta, Chile • Estado del Sistema: 100% Operativo
      </footer>
    </div>
  );
}