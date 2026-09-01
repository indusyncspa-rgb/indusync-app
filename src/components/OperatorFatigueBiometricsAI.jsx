import React, { useState } from 'react';

const OperatorFatigueBiometricsAI = () => {
  const [escaneando, setEscaneando] = useState(false);
  const [intervencionEjecutada, setIntervencionEjecutada] = useState(false);

  const [operadores, setOperadores] = useState([
    { id: 'OP-4082', operador: 'Carlos Mendoza (CAEX-101)', parpadeo: '18 p/min', estres: 'Alto (112 BPM)', fatiga: '88% (CRÍTICO)', estado: 'MICROSUEÑO DETECTADO' },
    { id: 'OP-3011', operador: 'Patricio Silva (Pala 04)', parpadeo: '12 p/min', estres: 'Normal (74 BPM)', fatiga: '14%', estado: 'ALERTA OK' },
    { id: 'OP-5120', operador: 'Loreto Vargas (CAEX-108)', parpadeo: '14 p/min', estres: 'Normal (81 BPM)', fatiga: '22%', estado: 'ALERTA OK' }
  ]);

  const ejecutarIntervencionCabina = () => {
    setEscaneando(true);
    setTimeout(() => {
      setOperadores(prev =>
        prev.map(op => op.id === 'OP-4082' ? { ...op, fatiga: 'DETENIDO EN ZONA SEGURA', estado: 'RELEVO ASIGNADO EN DISPATCH' } : op)
      );
      setEscaneando(false);
      setIntervencionEjecutada(true);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', border: '1px solid #f43f5e', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        <div>
          <h3 style={{ color: '#fb7185', fontSize: '16px', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            👁️ Biometría & Prevención de Fatiga/Somnolencia en Cabina (IA Vision)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>
            Detección milimétrica de parpadeo, microsueños y fatiga para detener accidentes antes de que ocurran.
          </p>
        </div>
        <button
          onClick={ejecutarIntervencionCabina}
          disabled={escaneando}
          style={{
            backgroundColor: escaneando ? '#475569' : '#e11d48',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '11px',
            cursor: escaneando ? 'not-allowed' : 'pointer'
          }}
        >
          {escaneando ? '⚡ Enviando Alarma Háptica a Cabina...' : '🚨 Intervenir Cabina & Asignar Relevo'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        {operadores.map(op => (
          <div key={op.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: '#fb7185', fontWeight: 'bold', fontSize: '11px' }}>{op.id}</span>
              <span style={{
                backgroundColor: op.estado.includes('RELEVO') || op.estado.includes('OK') ? '#065f46' : '#7f1d1d',
                color: op.estado.includes('RELEVO') || op.estado.includes('OK') ? '#34d399' : '#fca5a5',
                fontSize: '9px',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {op.estado}
              </span>
            </div>
            <p style={{ color: '#f8fafc', fontSize: '11px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{op.operador}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '10px' }}>
              <span>Fatiga: <strong style={{ color: '#fb7185' }}>{op.fatiga}</strong></span>
              <span>Pulso: <strong style={{ color: '#f8fafc' }}>{op.estres}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {intervencionEjecutada && (
        <div style={{ backgroundColor: '#4c0519', border: '1px solid #f43f5e', padding: '10px 14px', borderRadius: '6px', fontSize: '11px', color: '#fecdd3', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
          <span>🛑 <strong>Acción Autónoma de Seguridad:</strong> Frenado progresivo y alarma háptica activada en CAEX-101</span>
          <span>🦺 <strong>Protocolo Cero Daño:</strong> Relevo de operador notificado en consola de Dispatch</span>
        </div>
      )}
    </div>
  );
};

export default OperatorFatigueBiometricsAI;