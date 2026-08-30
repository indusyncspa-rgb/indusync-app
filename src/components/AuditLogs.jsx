import React from 'react';
import { useSystem } from '../context/SystemContext';

export default function AuditLogs() {
  const { historial } = useSystem();

  return (
    <footer style={{ backgroundColor: '#1e293b', padding: '15px 20px', borderRadius: '12px', border: '1px solid #334155' }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#94a3b8', textTransform: 'uppercase' }}>Logs de Operación & Trazabilidad (Blockchain-Ready)</h3>
      <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', maxHeight: '80px', overflowY: 'auto' }}>
        {historial.map((h, i) => (
          <p key={i} style={{ margin: '3px 0', fontSize: '11px', fontFamily: 'monospace', color: '#38bdf8' }}>
            [{h.hora}] ➔ {h.evento}
          </p>
        ))}
      </div>
    </footer>
  );
}