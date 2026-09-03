import React, { useState } from 'react';

export default function DigitalTwinCanvas() {
  const [selectedNode, setSelectedNode] = useState('Chancador Primario');

  const nodes = [
    { id: 'chancador', name: 'Chancador Primario', status: 'Óptimo', load: '88%', x: '15%', y: '40%' },
    { id: 'sag', name: 'Molino SAG 01', status: 'Estable', load: '94%', x: '45%', y: '35%' },
    { id: 'espesador', name: 'Espesador de Relaves', status: 'Alerta', load: '99%', x: '75%', y: '50%' }
  ];

  return (
    <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-md font-bold text-slate-100">🌐 Gemelo Digital — Vista Topológica</h3>
          <p className="text-xs text-slate-400">Diagrama P&ID simplificado en tiempo real</p>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
          Nodo Activo: {selectedNode}
        </span>
      </div>

      {/* Canvas SVG Interactivo */}
      <div className="relative h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-2 pointer-events-none">
          <line x1="20%" y1="50%" x2="45%" y2="45%" strokeDasharray="4" className="animate-pulse" />
          <line x1="50%" y1="45%" x2="75%" y2="55%" strokeDasharray="4" className="animate-pulse" />
        </svg>

        {nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => setSelectedNode(node.name)}
            style={{ left: node.x, top: node.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-xl border text-left transition transform hover:scale-105 ${
              selectedNode === node.name
                ? 'bg-cyan-950/80 border-cyan-400 ring-2 ring-cyan-500/30'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${node.status === 'Alerta' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
              <span className="text-xs font-bold text-slate-200">{node.name}</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">Carga OT: {node.load}</div>
          </button>
        ))}
      </div>
    </div>
  );
}