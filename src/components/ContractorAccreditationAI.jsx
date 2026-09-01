import React, { useState } from 'react';

const ContractorAccreditationAI = () => {
  const [procesando, setProcesando] = useState(false);
  const [acreditados, setAcreditados] = useState(false);

  const [contratistas, setContratistas] = useState([
    { id: 'CONT-88', empresa: 'Servicios Hidráulicos del Norte', trabajadores: 12, estado: 'PENDIENTE DOCS', paseGarita: 'BLOQUEADO' },
    { id: 'CONT-92', empresa: 'Mantenimiento Eléctrico E-Tech', trabajadores: 8, estado: 'VERIFICADO', paseGarita: 'AUTORIZADO' },
    { id: 'CONT-104', empresa: 'Transportes TransMineria Ltd', trabajadores: 15, estado: 'REVISIÓN IA', paseGarita: 'EN EVALUACIÓN' }
  ]);

  const validarDocumentacionIA = () => {
    setProcesando(true);
    setTimeout(() => {
      setContratistas(prev =>
        prev.map(c => ({
          ...c,
          estado: 'VALIDADO 100%',
          paseGarita: 'AUTORIZADO (QR)'
        }))
      );
      setProcesando(false);
      setAcreditados(true);
    }, 1600);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #a855f7', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#c084fc', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            🪪 OCR & Validación de Acreditación de Contratistas con IA
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Escaneo automático de exámenes médicos, inducciones y licencias para autorización inmediata en garita.
          </p>
        </div>
        <button
          onClick={validarDocumentacionIA}
          disabled={procesando}
          style={{
            backgroundColor: procesando ? '#475569' : '#9333ea',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: procesando ? 'not-allowed' : 'pointer'
          }}
        >
          {procesando ? '🔍 Escaneando Vínculos LPT y Licencias...' : '⚡ Procesar Carpetas de Acreditación'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {contratistas.map(item => (
          <div key={item.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#c084fc', fontWeight: 'bold', fontSize: '11px' }}>{item.id}</span>
              <span style={{
                backgroundColor: item.paseGarita.includes('AUTORIZADO') ? '#065f46' : '#7f1d1d',
                color: item.paseGarita.includes('AUTORIZADO') ? '#34d399' : '#fca5a5',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {item.paseGarita}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '12px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{item.empresa}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Dotación: <strong>{item.trabajadores} pers.</strong></span>
              <span>Estado: <strong style={{ color: '#e9d5ff' }}>{item.estado}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {acreditados && (
        <div style={{ backgroundColor: '#090d16', border: '1px solid #a855f7', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#e9d5ff', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>⏱️ <strong>Tiempo de Espera en Garita:</strong> Reducido de 45 min a 1.2 segundos</span>
          <span>✅ <strong>Cumplimiento Normativo Ley Subcontratación:</strong> 100% Verificado</span>
        </div>
      )}
    </div>
  );
};

export default ContractorAccreditationAI;