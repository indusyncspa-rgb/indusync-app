import React, { useState, useEffect } from 'react';

const SAPIntegrationBridge = () => {
  const [logsSap, setLogsSap] = useState([
    { id: 'SOLPED-9042', erp: 'SAP S/4HANA PM', item: 'Manga Alta Presión', estado: 'Sincronizado (200 OK)', timestamp: '11:58:02' },
    { id: 'WORK-ORD-881', erp: 'IBM Maximo', item: 'Mantención Neumáticos CAEX', estado: 'Aprobado Autónomo', timestamp: '11:52:15' }
  ]);

  useEffect(() => {
    const handleSapLog = (e) => {
      const nuevoLog = {
        id: e.detail.id,
        erp: e.detail.erp,
        item: e.detail.item,
        estado: e.detail.estado,
        timestamp: new Date().toLocaleTimeString()
      };
      setLogsSap(prev => [nuevoLog, ...prev]);
    };

    window.addEventListener('sap-log', handleSapLog);
    return () => window.removeEventListener('sap-log', handleSapLog);
  }, []);

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
          🔗 Capa de Integración No Invasiva (SAP S/4HANA & Oracle REST Bridge)
        </h3>
        <span style={{ backgroundColor: '#064e3b', color: '#34d399', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
          API RESTful / Webhooks Activos
        </span>
      </div>
      <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '14px' }}>
        Interoperabilidad bidireccional en tiempo real sin modificar los sistemas legacy de la minera.
      </p>
      <div style={{ backgroundColor: '#0b1120', borderRadius: '6px', padding: '10px', fontFamily: 'monospace', fontSize: '11px', maxHeight: '160px', overflowY: 'auto' }}>
        {logsSap.map((log, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', padding: '6px 0', color: '#cbd5e1' }}>
            <span><strong style={{ color: '#38bdf8' }}>[{log.erp}]</strong> {log.id} - {log.item}</span>
            <span style={{ color: '#22c55e' }}>{log.estado} ({log.timestamp})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SAPIntegrationBridge;