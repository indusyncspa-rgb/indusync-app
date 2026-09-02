import React, { useState } from 'react';
import ExecutiveDashboard from './features/csuite/ExecutiveDashboard';
import FinanceDashboard from './features/csuite/FinanceDashboard';
import WaterManagement from './features/esg/WaterManagement';
import AutoRescueP0 from './features/operator/AutoRescueP0';

// Estado global por defecto blindado contra valores undefined
const initialOperationalData = {
  precioCobreLbUsd: 3.90,
  produccionDiariaTon: 82500,
  eficienciaEnergetica: 94.2,
  disponibilidadFlota: 91.8,
  cashCostC1: 1.26,
  ebitdaEstimadoMusd: 26.76,
  opexAcumuladoMusd: 142.8,
  ahorroIAacumuladoUsd: 1425000,
  estadoAcueducto: 'ÓPTIMO (100%)',
  recuperacionAguaPct: 88.4,
  consumoEspecificoM3Ton: 0.42,
  flujoDesaladoraLps: 1250,
  presionTuberiaBar: 18.5
};

export default function App() {
  const [activeTab, setActiveTab] = useState('executive');
  const [opData, setOpData] = useState(initialOperationalData);

  // Garantizar que opData nunca sea nulo o undefined
  const safeData = opData ?? initialOperationalData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Barra de Navegación Principal */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-cyan-500/20 border border-cyan-500/50 rounded-xl flex items-center justify-center font-bold text-cyan-400">
              ⚡
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-wider">INDUSYNC® MINING</h1>
              <p className="text-[10px] text-cyan-400 font-mono">PLATAFORMA OPERACIONAL IA ZERO-TRUST</p>
            </div>
          </div>

          {/* Menú de Pestañas */}
          <nav className="flex flex-wrap justify-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('executive')}
              className={`px-3 py-1.5 rounded-lg transition font-bold cursor-pointer ${
                activeTab === 'executive' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              📊 Executive C-Suite
            </button>
            <button
              onClick={() => setActiveTab('p0')}
              className={`px-3 py-1.5 rounded-lg transition font-bold cursor-pointer ${
                activeTab === 'p0' ? 'bg-red-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              🚨 Auto-Rescue P0
            </button>
            <button
              onClick={() => setActiveTab('finanzas')}
              className={`px-3 py-1.5 rounded-lg transition font-bold cursor-pointer ${
                activeTab === 'finanzas' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              💰 Finanzas ROI
            </button>
            <button
              onClick={() => setActiveTab('agua')}
              className={`px-3 py-1.5 rounded-lg transition font-bold cursor-pointer ${
                activeTab === 'agua' ? 'bg-blue-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              💧 Gestión Agua
            </button>
          </nav>
        </div>
      </header>

      {/* Contenido Dinámico según la Pestaña */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {activeTab === 'executive' && <ExecutiveDashboard data={safeData} />}
        {activeTab === 'p0' && <AutoRescueP0 />}
        {activeTab === 'finanzas' && <FinanceDashboard data={safeData} />}
        {activeTab === 'agua' && <WaterManagement data={safeData} />}
      </main>

      {/* Pie de Página */}
      <footer className="border-t border-slate-800 p-4 text-center text-xs text-slate-500 font-mono">
        INDUSYNC Enterprise OS v4.2.0 • Sistema Operacional Autónomo para Alta Minería
      </footer>
    </div>
  );
}