import React from 'react';
import { generateDossierPDF } from '../../utils/pdfGenerator';

export default function Header() {
  const handleDownloadDossier = (e) => {
    e.preventDefault();
    e.stopPropagation();
    generateDossierPDF();
  };

  return (
    <div className="flex items-center gap-3">
      {/* LOGO & TÍTULO */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-black shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          🛡️
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-black tracking-wider text-slate-100 flex items-center gap-1.5">
              INDUSYNC<sup>®</sup> Meta-OS
            </h1>
            <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded">
              v2.4.0 OT
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
            SOFTWARE IA INDUSTRIAL PARA LA ALTA MINERÍA
          </p>
        </div>
      </div>

      {/* BOTÓN DESCARGAR DOSSIER (CONECTADO AL PDF) */}
      <button
        type="button"
        onClick={handleDownloadDossier}
        className="ml-2 bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
        title="Descargar Dossier Ejecutivo en PDF"
      >
        📄 Descargar Dossier
      </button>
    </div>
  );
}