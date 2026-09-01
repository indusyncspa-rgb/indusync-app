import React, { useState } from 'react';

const ContractorManagement = () => {
  const [contratistas, setContratistas] = useState([
    { id: 'CTR-881', empresa: 'Servicios Hidráulicos Norte', acreditacion: '100% Aprobada', vigencia: '2027-03-15', paseFaena: 'Activo', scoreSeguridad: '99/100' },
    { id: 'CTR-904', empresa: 'Transportes Pesados Cordillera', acreditacion: 'Pendiente Doc. Mutual', vigencia: '2026-09-01', paseFaena: 'Restringido', scoreSeguridad: '92/100' }
  ]);

  const aprobarAcreditacion = (id) => {
    setContratistas(prev => prev.map(c => c.id === id ? { ...c, acreditacion: '100% Aprobada', paseFaena: 'Activo' } : c));
  };

  return (
    <div style={{ backgroundColor: '#131b29', border: '1px solid #1f2d40', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
        <h3 style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 'bold', margin: 0 }}>
          🛡️ Módulo 2: Homologación & Acreditación de Contratistas en Faena
        </h3>
        <span style={{ backgroundColor: '#0284c7', color: '#e0f2fe', fontSize: '10px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
          Cumplimiento SERNAGEOMIN & Pases de Ingreso
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {contratistas.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#0b1120', padding: '12px', borderRadius: '6px', border: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <span style={{ color: '#38bdf8', fontSize: '11px', fontWeight: 'bold' }}>[{item.id}] {item.empresa}</span>
              <h4 style={{ color: '#f8fafc', fontSize: '13px', margin: '3px 0' }}>Score Seguridad: <span style={{ color: '#34d399' }}>{item.scoreSeguridad}</span> | Vencimiento: {item.vigencia}</h4>
              <span style={{ color: '#94a3b8', fontSize: '11px' }}>Estado Acreditación: <strong style={{ color: item.paseFaena === 'Activo' ? '#34d399' : '#f59e0b' }}>{item.acreditacion}</strong></span>
            </div>
            <button 
              onClick={() => aprobarAcreditacion(item.id)}
              disabled={item.paseFaena === 'Activo'}
              style={{ backgroundColor: item.paseFaena === 'Activo' ? '#1e293b' : '#0284c7', color: item.paseFaena === 'Activo' ? '#64748b' : '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: item.paseFaena === 'Activo' ? 'default' : 'pointer' }}>
              {item.paseFaena === 'Activo' ? '✅ Pase Vigente' : '⚡ Validar & Acreditar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractorManagement;