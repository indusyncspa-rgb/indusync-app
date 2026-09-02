import React, { useState } from 'react';
import DossierModal from './DossierModal';

export default function Header() {
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-900 border border-cyan-500/40 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/10">
          🛡️
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-wider">INDUSYNC<sup>®</sup> Meta-OS</h1>
            <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded text-[10px] font-mono font-bold">
              v2.4.0 OT
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <p className="text-xs text-slate-400 font-mono">
              SOFTWARE IA INDUSTRIAL PARA LA ALTA MINERÍA
            </p>
            <button
              onClick={() => setIsDossierOpen(true)}
              className="px-2.5 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/50 rounded text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              📄 Descargar Dossier
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Dossier Ejecutivo & Técnico */}
      <DossierModal isOpen={isDossierOpen} onClose={() => setIsDossierOpen(false)} />
    </>
  );
}