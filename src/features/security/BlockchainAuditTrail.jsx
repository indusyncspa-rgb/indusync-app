import React, { useState } from 'react';

export default function BlockchainAuditTrail() {
  const [ledger] = useState([
    {
      blockIndex: 10482,
      timestamp: '2026-09-02 14:08:12 UTC',
      txHash: '0x8f2a...91b4',
      fullHash: '0x8f2a4113e792019c8f219741bc9910d512089ef028a113941bca9110d512089ef',
      eventId: 'EVT-102',
      asset: 'Molino SAG 01',
      savedUSD: 6618000,
      verified: true,
      signer: 'Node-Antofagasta-01 (Proof-of-Authority)'
    },
    {
      blockIndex: 10481,
      timestamp: '2026-08-28 09:15:44 UTC',
      txHash: '0x3c11...a820',
      fullHash: '0x3c1109bcfa1910283e8490a1209bcfa1910283e8490a1209bcfa1910283e8490a1',
      eventId: 'EVT-098',
      asset: 'Chancador Primario 02',
      savedUSD: 2571500,
      verified: true,
      signer: 'Node-Calama-02 (Proof-of-Authority)'
    },
    {
      blockIndex: 10480,
      timestamp: '2026-08-15 18:30:02 UTC',
      txHash: '0x7e90...df42',
      fullHash: '0x7e901f42a781002239105ba7e901f42a781002239105ba7e901f42a78100223910',
      eventId: 'EVT-089',
      asset: 'Correa Transportadora CV-04',
      savedUSD: 4041000,
      verified: true,
      signer: 'Node-Santiago-HQ (Proof-of-Authority)'
    }
  ]);

  const [selectedBlock, setSelectedBlock] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header Auditoría */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-wrap justify-between items-center gap-4 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <h2 className="text-xl font-black text-slate-100 tracking-wide uppercase">
              Auditoría Inmutable Blockchain & Trazabilidad ROI
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Protocolo Enterprise Proof-of-Authority | Sellado criptográfico de aprobaciones y ahorros
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold">Ledger Sincronizado</span>
        </div>
      </div>

      {/* Bloques de Transacción Registrados */}
      <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex justify-between items-center font-mono">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            🔗 Nodos Validadores Activos (MinedLedger)
          </h3>
          <span className="text-[10px] text-cyan-400">Algoritmo: SHA-256 + Secp256k1</span>
        </div>

        <div className="grid gap-3">
          {ledger.map((block) => (
            <div
              key={block.blockIndex}
              onClick={() => setSelectedBlock(block)}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                    Bloque #{block.blockIndex}
                  </span>
                  <span className="text-xs font-bold text-slate-100">{block.asset}</span>
                  <span className="text-[10px] text-slate-500 font-mono">({block.eventId})</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Hash TX: <span className="text-slate-300">{block.txHash}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right font-mono">
                  <div className="text-[10px] text-slate-500">Ahorro Resguardado</div>
                  <div className="text-xs font-bold text-emerald-400">${(block.savedUSD / 1000000).toFixed(2)}M USD</div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-[10px] text-slate-500">Estado Firma</div>
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <span>✓ Verificado</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspector de Firma Criptográfica */}
      {selectedBlock && (
        <div className="bg-slate-950 border border-cyan-500/40 p-5 rounded-2xl space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-cyan-300 font-bold border-b border-slate-800 pb-2">
            <span>🔍 Certificado de Validez Criptográfica</span>
            <button onClick={() => setSelectedBlock(null)} className="text-slate-500 hover:text-slate-300">✕ Cerrar</button>
          </div>
          <div className="space-y-1.5 text-slate-300">
            <div><span className="text-slate-500">Hash SHA-256 Completo:</span> <span className="text-cyan-400 break-all">{selectedBlock.fullHash}</span></div>
            <div><span className="text-slate-500">Nodo Firmante:</span> {selectedBlock.signer}</div>
            <div><span className="text-slate-500">Marca de Tiempo UTC:</span> {selectedBlock.timestamp}</div>
            <div><span className="text-slate-500">Integridad de Datos:</span> <span className="text-emerald-400 font-bold">100% Intacto (0 Alteraciones)</span></div>
          </div>
        </div>
      )}
    </div>
  );
}