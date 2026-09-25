import React, { useState } from 'react';

export default function ZeroTrustMilitarySecurity({ isOnline = true }) {
  const [verifying, setVerifying] = useState(false);
  const [complianceStatus, setComplianceStatus] = useState('ALL_SYSTEMS_SECURE');
  const [lastCheckTime, setLastCheckTime] = useState(new Date().toLocaleTimeString('es-CL'));

  // Simulación de Auditoría Dinámica de Ciberseguridad
  const handleRunSecurityAudit = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setLastCheckTime(new Date().toLocaleTimeString('es-CL'));
      setComplianceStatus('VERIFIED_IEC_ISO_NIST');
    }, 1200);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* HEADER DE MISION CRÍTICA */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            ISOLATED CYBER-OT DIODE ACTIVE
          </span>
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
            🛡️ Architecture & Cybersecurity Shield: Purdue ISA-95
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Aislamiento criptográfico estricto desacoplado en 3 capas. Acreditación simultánea para la C-Suite, IT Corporativo y Redes Operacionales OT de Faena.
          </p>
        </div>

        {/* METRICAS CLAVE DE SEGURIDAD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Capa 4: C-Suite</span>
            <div className="text-base font-black text-amber-400 font-mono mt-0.5">NIST CSF 2.0</div>
            <span className="text-[10px] text-slate-500">Governance & Risk Framework</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Capa 3: Cloud & IT</span>
            <div className="text-base font-black text-emerald-400 font-mono mt-0.5">ISO 27001 / 27017</div>
            <span className="text-[10px] text-slate-500">AES-256 + Supabase Vault</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Capa 0-2: Planta & OT</span>
            <div className="text-base font-black text-cyan-400 font-mono mt-0.5">IEC 62443-3-3 / 4-2</div>
            <span className="text-[10px] text-slate-500">Edge OPC UA Zero-Trust</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Firmado Criptográfico</span>
            <div className="text-base font-black text-purple-400 font-mono mt-0.5">RSA-4096 / TLS 1.3</div>
            <span className="text-[10px] text-slate-500">Audit Logs Inmutables</span>
          </div>
        </div>
      </div>

      {/* DETALLE DE LAS 3 CAPAS EN MODELO PURDUE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CAPA 1: NIST CSF */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 relative">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800">
              C-SUITE • GOVIERNO
            </span>
            <span className="text-lg">🏛️</span>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-200">NIST Cybersecurity Framework</h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Evaluación estratégica continua para el Directorio y la Vicepresidencia HSEC.
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2 bg-slate-950 rounded-lg flex justify-between">
              <span className="text-slate-400">Identify & Protect:</span>
              <span className="text-amber-400 font-bold">100% Compliant</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-lg flex justify-between">
              <span className="text-slate-400">Detect & Respond:</span>
              <span className="text-emerald-400 font-bold">Automated IA</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-lg flex justify-between">
              <span className="text-slate-400">Continuidad ISO 22301:</span>
              <span className="text-cyan-400 font-bold">DEFCON-1 Ready</span>
            </div>
          </div>
        </div>

        {/* CAPA 2: ISO 27001 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 relative">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
              IT CORPORATIVO • NUBE
            </span>
            <span className="text-lg">☁️</span>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-200">ISO 27001 / ISO 27017 Cloud</h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Gobernanza de datos financieros, usuarios C-Suite y telemetría historizada en Supabase.
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2 bg-slate-950 rounded-lg flex justify-between">
              <span className="text-slate-400">Cifrado de Base de Datos:</span>
              <span className="text-emerald-400 font-bold">AES-256-GCM</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-lg flex justify-between">
              <span className="text-slate-400">Control de Accesos:</span>
              <span className="text-emerald-400 font-bold">Zero-Trust Gate</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-lg flex justify-between">
              <span className="text-slate-400">Auditoría DB Supabase:</span>
              <span className="text-purple-400 font-bold">audit_logs Active</span>
            </div>
          </div>
        </div>

        {/* CAPA 3: IEC 62443 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 relative">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
              RED OT • PALAS & PLANTA
            </span>
            <span className="text-lg">⚡</span>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-200">IEC 62443-3-3 Industrial OT</h3>
            <p className="text-[11px] text-slate-400 mt-1">
              Blindaje directo del conector Edge OPC UA instalado en la red de control de la mina.
            </p>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2 bg-slate-950 rounded-lg flex justify-between">
              <span className="text-slate-400">Diodo Unidireccional OT:</span>
              <span className="text-cyan-400 font-bold">ENFORCED</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-lg flex justify-between">
              <span className="text-slate-400">Aislamiento Repositorio:</span>
              <span className="text-emerald-400 font-bold">indusync-connector</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-lg flex justify-between">
              <span className="text-slate-400">Interlock Físico LOTO:</span>
              <span className="text-cyan-400 font-bold">HARDWARE TRIP READY</span>
            </div>
          </div>
        </div>

      </div>

      {/* PANEL INTERACTIVO DE COMPROBACIÓN DE BLINDAJE CIBERNÉTICO */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs">
        <div className="space-y-1">
          <div className="text-slate-200 font-bold flex items-center gap-2">
            <span>🛡️ ESTADO DE VINCULACIÓN ZERO-TRUST:</span>
            <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              AUDITED & CERTIFIED
            </span>
          </div>
          <p className="text-[10px] text-slate-500">
            Última verificación de integrity token: <span className="text-slate-300">{lastCheckTime}</span> | Cero vulnerabilidades encontradas.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunSecurityAudit}
          disabled={verifying}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-black uppercase tracking-wider rounded-xl transition shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer disabled:opacity-50"
        >
          {verifying ? '⏳ Ejecutando Test Tripartito...' : '🔍 Simular Test Ciberseguridad OT'}
        </button>
      </div>
    </div>
  );
}